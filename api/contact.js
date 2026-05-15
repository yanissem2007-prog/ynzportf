// Vercel Serverless Function — POST /api/contact
// Validates contact form submissions, enforces rate limiting, and forwards
// the message via Resend (if RESEND_API_KEY is set) — otherwise logs the
// payload for local dev / preview environments.

const buckets = new Map(); // ip -> { count, resetAt }

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string') return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function rateLimit(ip) {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now > b.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { ok: true, remaining: RATE_MAX - 1 };
  }
  if (b.count >= RATE_MAX) {
    return { ok: false, retryAfter: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count += 1;
  return { ok: true, remaining: RATE_MAX - b.count };
}

function validate(body) {
  const errors = {};
  const { name, email, message, website } = body || {};

  // Honeypot: any value submitted means it's a bot
  if (website && String(website).trim().length > 0) {
    return { spam: true };
  }

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  } else if (name.length > 80) {
    errors.name = 'Name is too long';
  }

  if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
    errors.email = 'Valid email is required';
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (message.length > 4000) {
    errors.message = 'Message is too long';
  }

  return { errors, valid: Object.keys(errors).length === 0 };
}

async function sendViaResend({ name, email, message }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || 'ynsscgd9@gmail.com';
  const from = process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>';
  if (!key) return { skipped: true };

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `Portfolio contact — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Email provider error (${res.status}): ${detail.slice(0, 200)}`);
  }
  return { sent: true };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const ip = getIp(req);
  const rl = rateLimit(ip);
  if (!rl.ok) {
    res.setHeader('Retry-After', String(rl.retryAfter));
    return res.status(429).json({ ok: false, error: 'rate_limited', retryAfter: rl.retryAfter });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const v = validate(body);
  if (v.spam) {
    // Pretend success so bots don't iterate
    return res.status(200).json({ ok: true });
  }
  if (!v.valid) {
    return res.status(400).json({ ok: false, error: 'validation', fields: v.errors });
  }

  const { name, email, message } = body;

  try {
    const result = await sendViaResend({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    if (result.skipped) {
      // No provider configured — accept and log
      console.log('[contact] (no provider configured)', { name, email, len: message.length });
      return res.status(200).json({ ok: true, mode: 'logged' });
    }
    return res.status(200).json({ ok: true, mode: 'sent' });
  } catch (err) {
    console.error('[contact] send failed', err);
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }
}

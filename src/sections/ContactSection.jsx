import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, ArrowUpRight, Github, Linkedin, Instagram,
  Copy, Check, Send, Loader2, AlertCircle, ShieldCheck
} from 'lucide-react';
import { contact } from '../data';

const initialForm = { name: '', email: '', message: '', website: '' };

export default function ContactSection() {
  const [hovered, setHovered] = useState(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverErr, setServerErr] = useState(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const update = (key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors(er => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim() || form.name.trim().length < 2) next.name = 'Name must be at least 2 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Valid email is required';
    if (!form.message.trim() || form.message.trim().length < 10) next.message = 'Message must be at least 10 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    setServerErr(null);
    if (!validate()) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 429) {
        setStatus('error');
        setServerErr('Too many messages. Please wait a moment and try again.');
        return;
      }
      if (!res.ok || !data.ok) {
        if (data?.fields) setErrors(data.fields);
        setStatus('error');
        setServerErr(data?.error === 'send_failed'
          ? "Couldn't deliver right now. Email me directly while I look into it."
          : 'Please fix the highlighted fields.');
        return;
      }
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
      setServerErr('Network error. Check your connection and try again.');
    }
  };

  const links = [
    { id: 'linkedin',  label: 'LinkedIn',  value: 'yanis-semmar',      href: contact.linkedin,  icon: Linkedin,  external: true },
    { id: 'github',    label: 'GitHub',    value: '@yanissem2007-prog',href: contact.github,    icon: Github,    external: true },
    { id: 'instagram', label: 'Instagram', value: '@yanis__sem',       href: contact.instagram, icon: Instagram, external: true },
  ];

  return (
    <section id="contact" className="py-32 md:py-40 bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gold/4 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-ice/4 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-gold/60 tracking-widest">06 / CONTACT</span>
          <span className="flex-1 h-px bg-white/5" />
          <span className="font-mono text-xs text-silver/30 tracking-widest hidden md:inline">LET'S BUILD</span>
        </motion.div>

        <div className="mb-20">
          {["LET'S BUILD", "SOMETHING", "UNFORGETTABLE"].map((line, i) => (
            <motion.h2
              key={line}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`font-display text-[14vw] md:text-[10vw] lg:text-[8vw] leading-[0.92] tracking-tight ${
                i === 0 ? 'text-pearl' : i === 1 ? 'text-gold/70' : 'text-silver/15'
              }`}
            >
              {line}
            </motion.h2>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative p-6 md:p-10 border border-white/10 bg-charcoal/40 backdrop-blur-xl"
            noValidate
          >
            <div className="flex items-center justify-between mb-8">
              <p className="font-mono text-[10px] text-gold/60 tracking-widest">// SECURE MESSAGE PIPELINE</p>
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-emerald-300/70 tracking-widest">
                <ShieldCheck size={11} /> VALIDATED · RATE-LIMITED
              </span>
            </div>

            {/* Honeypot — hidden from users */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={update('website')}
              className="absolute left-[-9999px] opacity-0 pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Name"
                error={errors.name}
                disabled={status === 'sending' || status === 'success'}
              >
                <input
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Your name"
                  className="w-full bg-transparent font-body text-base text-pearl placeholder:text-silver/25 outline-none py-2"
                  required
                />
              </Field>
              <Field
                label="Email"
                error={errors.email}
                disabled={status === 'sending' || status === 'success'}
              >
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@company.com"
                  className="w-full bg-transparent font-body text-base text-pearl placeholder:text-silver/25 outline-none py-2"
                  required
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field
                label="Message"
                error={errors.message}
                disabled={status === 'sending' || status === 'success'}
              >
                <textarea
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell me about your project, role, or idea…"
                  rows={5}
                  className="w-full bg-transparent font-body text-base text-pearl placeholder:text-silver/25 outline-none py-2 resize-none"
                  required
                />
              </Field>
              <p className="font-mono text-[10px] text-silver/30 tracking-widest mt-2">
                {form.message.length} / 4000
              </p>
            </div>

            <AnimatePresence>
              {serverErr && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 flex items-center gap-2 border border-red-400/30 bg-red-500/5 px-3 py-2"
                >
                  <AlertCircle size={14} className="text-red-300" />
                  <span className="font-mono text-[11px] text-red-200/80">{serverErr}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <p className="font-mono text-[10px] text-silver/35 tracking-widest">
                POST · /api/contact · 24h reply
              </p>

              <motion.button
                type="submit"
                whileHover={{ y: status === 'idle' ? -2 : 0 }}
                disabled={status === 'sending' || status === 'success'}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-pearl text-void font-body text-sm font-medium tracking-wide disabled:opacity-70 transition-colors duration-500"
                data-hover
              >
                <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <AnimatePresence mode="wait" initial={false}>
                  {status === 'sending' && (
                    <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative inline-flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin" /> Sending…
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative inline-flex items-center gap-2">
                      <Check size={14} /> Message Sent
                    </motion.span>
                  )}
                  {(status === 'idle' || status === 'error') && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative inline-flex items-center gap-2">
                      <Send size={14} /> Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 flex items-center gap-2 border border-emerald-400/30 bg-emerald-500/5 px-3 py-2"
                >
                  <Check size={14} className="text-emerald-300" />
                  <span className="font-mono text-[11px] text-emerald-200/80">
                    Your message landed. I'll reply within 24 hours.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Right: contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Email block */}
            <div className="group relative p-5 border border-white/10 hover:border-gold/30 bg-charcoal/30 backdrop-blur-sm transition-all duration-500">
              <p className="font-mono text-[10px] text-gold/60 tracking-widest mb-2">DIRECT EMAIL</p>
              <div className="flex items-center justify-between gap-4">
                <a href={`mailto:${contact.email}`} className="font-body text-sm md:text-base text-pearl hover:text-gold transition-colors break-all" data-hover>
                  {contact.email}
                </a>
                <button
                  onClick={copyEmail}
                  aria-label="Copy email"
                  className="flex-shrink-0 w-9 h-9 border border-white/10 hover:border-gold/50 flex items-center justify-center transition-colors"
                  data-hover
                >
                  {copied
                    ? <Check size={14} className="text-gold" />
                    : <Copy size={14} className="text-silver/60" />}
                </button>
              </div>
            </div>

            {/* Channels */}
            <div className="space-y-0">
              {links.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel="noreferrer"
                    onMouseEnter={() => setHovered(link.id)}
                    onMouseLeave={() => setHovered(null)}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.6 }}
                    className="group relative flex items-center justify-between py-5 border-b border-white/8 hover:border-gold/30 transition-colors duration-500 overflow-hidden"
                    data-hover
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                    <div className="flex items-center gap-4 relative">
                      <div className="w-10 h-10 border border-white/10 group-hover:border-gold/40 flex items-center justify-center transition-colors">
                        <Icon size={14} className="text-gold/60 group-hover:text-gold transition-colors" />
                      </div>
                      <div>
                        <p className="font-mono text-[9px] text-silver/30 tracking-widest mb-0.5">{link.label.toUpperCase()}</p>
                        <p className="font-body text-sm text-pearl/80 group-hover:text-pearl transition-colors">{link.value}</p>
                      </div>
                    </div>
                    <motion.div animate={{ rotate: hovered === link.id ? -45 : 0 }} transition={{ duration: 0.35 }} className="relative">
                      <ArrowUpRight size={18} className="text-silver/25 group-hover:text-gold transition-colors" />
                    </motion.div>
                  </motion.a>
                );
              })}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3 pt-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-mono text-[10px] text-silver/40 tracking-widest">AVAILABLE · ALGIERS · GMT+1</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, disabled, children }) {
  return (
    <label className={`block group ${disabled ? 'opacity-60 pointer-events-none' : ''}`}>
      <span className="font-mono text-[10px] text-silver/40 group-focus-within:text-gold tracking-widest uppercase">{label}</span>
      <div className={`border-b transition-colors ${error ? 'border-red-400/60' : 'border-white/15 group-focus-within:border-gold/60'}`}>
        {children}
      </div>
      {error && (
        <p className="mt-1 font-mono text-[10px] text-red-300/80 tracking-wide">{error}</p>
      )}
    </label>
  );
}

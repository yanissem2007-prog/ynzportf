import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Strategy', value: 'Swing', sub: 'Medium-term holds' },
  { label: 'Focus', value: 'Risk', sub: 'Always managed' },
  { label: 'Mindset', value: 'Long', sub: 'Term vision' },
];

export default function TradingSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw a subtle chart-like decoration
    const w = canvas.width;
    const h = canvas.height;

    const points = [];
    let y = h * 0.6;
    for (let x = 0; x <= w; x += w / 40) {
      y += (Math.random() - 0.47) * (h * 0.06);
      y = Math.max(h * 0.2, Math.min(h * 0.85, y));
      points.push({ x, y });
    }

    ctx.strokeStyle = 'rgba(201, 169, 110, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.stroke();

    // Fill under line
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(201,169,110,0.04)');
    grad.addColorStop(1, 'rgba(201,169,110,0)');
    ctx.fillStyle = grad;
    ctx.fill();
  }, []);

  return (
    <section className="py-32 md:py-40 bg-void relative overflow-hidden">
      {/* Dark ambient */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/0 via-charcoal/20 to-obsidian/0 pointer-events-none" />

      {/* Canvas chart bg */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-gold/40" />
              <span className="font-mono text-xs text-gold/50 tracking-widest uppercase">
                Beyond Code
              </span>
            </div>

            <h2 className="font-display text-6xl md:text-8xl text-pearl leading-none mb-2">
              THE
            </h2>
            <h2 className="font-display text-6xl md:text-8xl text-gold/50 leading-none mb-2">
              TRADER
            </h2>
            <h2 className="font-display text-6xl md:text-8xl text-silver/15 leading-none mb-12">
              MINDSET
            </h2>

            <div className="space-y-5">
              <p className="font-body text-base md:text-lg text-silver/60 leading-relaxed italic font-serif">
                "Development taught me how to build. Trading taught me how to think."
              </p>
              <p className="font-body text-sm text-silver/35 leading-relaxed max-w-md">
                I value structure, patience, discipline and long-term vision — in both code
                and markets. Swing trading isn't just a hobby; it's a framework for
                making better decisions under uncertainty.
              </p>
            </div>

            {/* Principles */}
            <div className="grid grid-cols-2 gap-3 mt-10">
              {['Discipline', 'Patience', 'Structure', 'Long-Term Vision'].map(p => (
                <div key={p} className="border border-white/5 px-4 py-3 hover:border-gold/20 transition-colors duration-500 cursor-default" data-hover>
                  <span className="font-mono text-xs text-silver/40 tracking-widest">{p.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats + visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="space-y-1 mb-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }}
                  className="flex items-center justify-between py-5 border-b border-white/5"
                >
                  <span className="font-mono text-xs text-silver/30 tracking-widest uppercase">
                    {s.label}
                  </span>
                  <div className="text-right">
                    <p className="font-display text-2xl text-pearl">{s.value}</p>
                    <p className="font-mono text-[9px] text-gold/40 tracking-widest">{s.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Cinematic quote block */}
            <div className="border border-gold/15 bg-gold/2 p-6 relative">
              <div className="absolute top-4 left-4 w-4 h-px bg-gold/40" />
              <div className="absolute top-4 left-4 h-4 w-px bg-gold/40" />
              <p className="font-display text-3xl text-pearl/80 leading-tight mb-2">
                BUILDING WITH
              </p>
              <p className="font-display text-3xl text-gold leading-tight">
                LONG-TERM VISION
              </p>
              <p className="font-body text-xs text-silver/30 mt-4 leading-relaxed">
                Every project, every trade — approached with the same deliberate mindset.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

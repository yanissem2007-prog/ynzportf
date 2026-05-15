import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Server, Database, Shield, Gauge, Sparkles } from 'lucide-react';
import { stats } from '../data';

const pillars = [
  { icon: Code2,   label: 'Frontend Craft',     desc: 'Type-safe React, motion-first thinking, design-grade interfaces.' },
  { icon: Server,  label: 'Backend Architecture', desc: 'Node, REST APIs, validation, secure handlers, edge functions.' },
  { icon: Database,label: 'Data & Schema',      desc: 'Postgres + Prisma. Migrations, indexes, query performance.' },
  { icon: Shield,  label: 'Auth & Security',    desc: 'JWT/OAuth, RBAC, rate limiting, input sanitization, CSP.' },
  { icon: Gauge,   label: 'Performance',        desc: 'Core Web Vitals 95+. Caching, code-split, image budgets.' },
  { icon: Sparkles,label: 'Product Sense',      desc: 'I ship features, not tickets. UX, motion, copy — all part of the job.' },
];

function CountUp({ value, label, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [n, setN] = useState(0);

  const isNumeric = /^\d/.test(value);
  const target = isNumeric ? parseInt(value, 10) : 0;
  const suffix = isNumeric ? value.replace(/^\d+/, '') : '';

  useEffect(() => {
    if (!inView || !isNumeric) return;
    let raf;
    const start = performance.now();
    const dur = 1400;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, isNumeric]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-6 md:p-8 border border-white/8 hover:border-gold/30 bg-charcoal/30 backdrop-blur-sm transition-all duration-500 overflow-hidden"
    >
      <span className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-gold to-transparent group-hover:w-full transition-all duration-700" />
      <p className="font-display text-5xl md:text-6xl text-pearl group-hover:text-gold transition-colors duration-500 leading-none tracking-tight">
        {isNumeric ? n : value}{suffix}
      </p>
      <p className="font-mono text-[10px] text-silver/40 tracking-widest mt-3 uppercase">{label}</p>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="py-32 md:py-40 bg-void relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/3 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-ice/4 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="font-mono text-xs text-gold/60 tracking-widest">02 / ABOUT</span>
          <span className="flex-1 h-px bg-white/5" />
          <span className="font-mono text-xs text-silver/30 tracking-widest hidden md:inline">FULL STACK MINDSET</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <h2 className="font-display text-6xl md:text-8xl lg:text-9xl text-pearl leading-[0.9] tracking-tight">I SHIP</h2>
            <h2 className="font-display text-6xl md:text-8xl lg:text-9xl text-gold/70 leading-[0.9] tracking-tight">FULL STACK</h2>
            <h2 className="font-display text-6xl md:text-8xl lg:text-9xl text-silver/15 leading-[0.9] tracking-tight">PRODUCTS</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.9 }}
            className="lg:col-span-5 lg:pt-6"
          >
            <p className="font-body text-base md:text-lg text-silver/65 leading-relaxed mb-5">
              I'm <span className="text-pearl">Yanis</span>, a full-stack web developer
              who treats the whole pipeline as one craft — typed UI, secure APIs,
              relational data, motion, and the tooling that ships it.
            </p>
            <p className="font-body text-sm md:text-base text-silver/45 leading-relaxed">
              I love the parts most people split between teams. I'll design the
              component, write the API route, model the table, and tune the query —
              <span className="text-gold/80"> end to end ownership</span>.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <span className="w-12 h-px bg-gold/50" />
              <span className="font-mono text-[10px] text-gold/60 tracking-widest">BASED IN ALGIERS · WORKING WORLDWIDE</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {stats.map((s, i) => (
            <CountUp key={s.label} value={s.value} label={s.label} delay={i * 0.08} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-7 md:p-8 bg-void hover:bg-charcoal/40 transition-all duration-500 cursor-default overflow-hidden"
                data-hover
              >
                <span className="absolute top-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-700" />
                <Icon size={20} className="text-gold/60 group-hover:text-gold group-hover:scale-110 transition-all duration-500" strokeWidth={1.4} />
                <p className="font-body text-base font-medium text-pearl/85 mt-5 group-hover:text-pearl transition-colors">{p.label}</p>
                <p className="font-body text-sm text-silver/40 mt-2 leading-relaxed group-hover:text-silver/60 transition-colors">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

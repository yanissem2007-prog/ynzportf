import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ArrowUpRight, Github, Sparkles, Users, Briefcase, FileText,
  MessageCircle, Zap, Bell, Shield, Cpu, Server, Database, Cloud
} from 'lucide-react';
import { work, contact } from '../data';

const FEATURE_ICONS = {
  Users, Briefcase, Sparkles, FileText, MessageCircle, Zap, Bell, Shield,
};

const STACK_GROUPS = [
  { key: 'frontend', label: 'Frontend', icon: Cpu,      accent: '#c9a96e' },
  { key: 'backend',  label: 'Backend',  icon: Server,   accent: '#9bb39c' },
  { key: 'data',     label: 'Data',     icon: Database, accent: '#a8b5c4' },
  { key: 'infra',    label: 'Infra',    icon: Cloud,    accent: '#e4a17c' },
];

export default function WorkCaseStudy({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="work-case"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] bg-void/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl mx-auto my-8 md:my-12 bg-obsidian border border-white/10 shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close case study"
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 flex items-center justify-center border border-white/10 bg-void/70 backdrop-blur hover:border-gold/50 hover:text-gold transition-colors text-silver/70"
              data-hover
            >
              <X size={16} />
            </button>

            {/* Hero strip */}
            <header className="relative overflow-hidden border-b border-white/5">
              <div aria-hidden className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-gold/15 blur-[140px]"
                  animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute -bottom-20 -right-20 w-[420px] h-[420px] rounded-full bg-ice/10 blur-[130px]"
                  animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <div className="relative px-6 md:px-12 lg:px-16 py-12 md:py-16">
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="font-mono text-[10px] tracking-widest text-gold bg-gold/10 border border-gold/30 px-2.5 py-1">
                    CASE STUDY
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-emerald-200/80 border border-emerald-400/25 bg-emerald-500/5 px-2.5 py-1">
                    {work.status.toUpperCase()}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-silver/50 border border-white/10 px-2.5 py-1">
                    FLAGSHIP
                  </span>
                </div>

                <h1 className="font-display text-[18vw] sm:text-[14vw] md:text-[10vw] leading-[0.85] tracking-tighter">
                  <span className="bg-gradient-to-br from-pearl via-pearl to-gold bg-clip-text text-transparent">
                    WORK
                  </span>
                </h1>
                <p className="font-body text-lg md:text-2xl text-silver/70 max-w-3xl mt-6 leading-snug">
                  {work.tagline}.
                </p>
                <p className="font-body text-sm md:text-base text-silver/45 max-w-2xl mt-4 leading-relaxed">
                  {work.intro}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-8">
                  <a
                    href={work.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 border border-silver/20 hover:border-gold/60 font-body text-sm text-silver/80 hover:text-pearl tracking-wide transition-all duration-500"
                    data-hover
                  >
                    <Github size={14} /> GitHub
                  </a>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 border border-silver/20 hover:border-gold/60 font-body text-sm text-silver/80 hover:text-pearl tracking-wide transition-all duration-500"
                    data-hover
                  >
                    LinkedIn <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </header>

            {/* Problem / Solution / Vision */}
            <section className="px-6 md:px-12 lg:px-16 py-16 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-white/5">
              {[
                { tag: 'THE PROBLEM',  title: 'Fragmented tools',     body: work.problem,  accent: '#e4572e' },
                { tag: 'THE SOLUTION', title: 'One workspace',        body: work.solution, accent: '#c9a96e' },
                { tag: 'THE VISION',   title: 'Next-gen professional',body: work.vision,   accent: '#9bb39c' },
              ].map((b, i) => (
                <motion.div
                  key={b.tag}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, root: null }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative p-6 md:p-7 border border-white/10 bg-charcoal/30 backdrop-blur-sm overflow-hidden"
                >
                  <span
                    className="absolute top-0 left-0 h-px w-full"
                    style={{ background: `linear-gradient(90deg, ${b.accent}, transparent)` }}
                  />
                  <p className="font-mono text-[10px] tracking-widest mb-2" style={{ color: `${b.accent}cc` }}>
                    {b.tag}
                  </p>
                  <p className="font-display text-2xl text-pearl tracking-tight mb-3">{b.title}</p>
                  <p className="font-body text-sm text-silver/55 leading-relaxed">{b.body}</p>
                </motion.div>
              ))}
            </section>

            {/* Features */}
            <section className="px-6 md:px-12 lg:px-16 py-16 border-b border-white/5">
              <div className="flex items-center gap-4 mb-12">
                <span className="font-mono text-xs text-gold/60 tracking-widest">01 / FEATURES</span>
                <span className="flex-1 h-px bg-white/5" />
                <span className="font-mono text-xs text-silver/30 tracking-widest hidden md:inline">{work.features.length} CORE MODULES</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
                {work.features.map((f, i) => {
                  const Icon = FEATURE_ICONS[f.icon] || Sparkles;
                  return (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.6 }}
                      className="group relative p-6 bg-obsidian hover:bg-charcoal/40 transition-colors duration-500 overflow-hidden"
                    >
                      <span className="absolute top-0 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-700" />
                      <Icon size={18} className="text-gold/60 group-hover:text-gold group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
                      <p className="font-body text-sm font-medium text-pearl/90 mt-4 group-hover:text-pearl transition-colors">
                        {f.title}
                      </p>
                      <p className="font-body text-xs text-silver/40 mt-2 leading-relaxed group-hover:text-silver/60 transition-colors">
                        {f.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Pillars */}
            <section className="px-6 md:px-12 lg:px-16 py-16 border-b border-white/5">
              <div className="flex items-center gap-4 mb-12">
                <span className="font-mono text-xs text-gold/60 tracking-widest">02 / DESIGN PRINCIPLES</span>
                <span className="flex-1 h-px bg-white/5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {work.pillars.map((p, i) => (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.6 }}
                    className="p-5 border border-white/8 bg-charcoal/20"
                  >
                    <p className="font-display text-xl text-pearl tracking-tight">{p.label}</p>
                    <p className="font-body text-sm text-silver/50 mt-2 leading-relaxed">{p.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Stack */}
            <section className="px-6 md:px-12 lg:px-16 py-16 border-b border-white/5">
              <div className="flex items-center gap-4 mb-12">
                <span className="font-mono text-xs text-gold/60 tracking-widest">03 / TECH STACK</span>
                <span className="flex-1 h-px bg-white/5" />
                <span className="font-mono text-xs text-silver/30 tracking-widest hidden md:inline">FULL STACK ARCHITECTURE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STACK_GROUPS.map((g, i) => {
                  const Icon = g.icon;
                  const items = work.stack[g.key] || [];
                  return (
                    <motion.div
                      key={g.key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.6 }}
                      className="p-6 border border-white/8 bg-charcoal/20 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <span
                          className="w-8 h-8 flex items-center justify-center border"
                          style={{ borderColor: g.accent }}
                        >
                          <Icon size={14} style={{ color: g.accent }} />
                        </span>
                        <div>
                          <p className="font-mono text-[10px] text-gold/60 tracking-widest">// {g.label.toUpperCase()}</p>
                          <p className="font-display text-xl text-pearl tracking-tight">{g.label}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] tracking-widest text-silver/65 border border-white/10 px-2.5 py-1 hover:border-gold/30 transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Inspirations */}
            <section className="px-6 md:px-12 lg:px-16 py-16 border-b border-white/5">
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-xs text-gold/60 tracking-widest">04 / INSPIRATION</span>
                <span className="flex-1 h-px bg-white/5" />
              </div>
              <p className="font-body text-sm text-silver/50 leading-relaxed max-w-2xl mb-6">
                Drawing from the products that shaped modern software — networking, conversation,
                community and craft.
              </p>
              <div className="flex flex-wrap gap-2">
                {work.inspirations.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-[10px] tracking-widest text-pearl/70 border border-white/10 px-3 py-1.5 hover:border-gold/40 transition-colors"
                  >
                    {tool.toUpperCase()}
                  </span>
                ))}
              </div>
            </section>

            {/* Footer CTA */}
            <footer className="px-6 md:px-12 lg:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="font-mono text-[10px] text-gold/60 tracking-widest">// WHAT'S NEXT</p>
                <p className="font-display text-2xl md:text-3xl text-pearl tracking-tight mt-1">
                  Launching 2026.
                </p>
                <p className="font-body text-sm text-silver/45 mt-2 max-w-md leading-relaxed">
                  Follow along on LinkedIn or GitHub — early access, build logs and design drops.
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-pearl text-void font-body text-sm font-medium tracking-wide hover:bg-gold transition-colors duration-500"
                  data-hover
                >
                  Follow on LinkedIn <ArrowUpRight size={14} />
                </a>
                <a
                  href={work.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-silver/20 hover:border-gold/60 font-body text-sm text-silver/80 hover:text-pearl tracking-wide transition-all duration-500"
                  data-hover
                >
                  <Github size={14} /> Star on GitHub
                </a>
              </div>
            </footer>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

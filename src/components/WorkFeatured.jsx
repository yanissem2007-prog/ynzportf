import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Github, Linkedin, Star, Cpu, Database, Server } from 'lucide-react';
import { work, contact } from '../data';

export default function WorkFeatured({ onOpen }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty('--glow-x', `${x}%`);
      el.style.setProperty('--glow-y', `${y}%`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="mb-20"
    >
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold/70 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
        </span>
        <span className="font-mono text-[10px] text-gold tracking-[0.3em]">{work.flag}</span>
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        style={{ '--glow-x': '50%', '--glow-y': '50%' }}
        className="group relative overflow-hidden border border-white/10 hover:border-gold/40 transition-all duration-700 bg-obsidian"
      >
        {/* Pointer-following glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(201,169,110,0.18), transparent 50%)',
          }}
        />

        {/* Animated gradient frame */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -inset-[1px] opacity-40"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, rgba(201,169,110,0.4) 60deg, transparent 120deg, transparent 240deg, rgba(168,181,196,0.3) 300deg, transparent 360deg)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-[1px] bg-obsidian" />
        </div>

        {/* Grid pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Aurora blobs */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-32 -left-20 w-[480px] h-[480px] rounded-full bg-gold/12 blur-[140px]"
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-24 -right-20 w-[420px] h-[420px] rounded-full bg-ice/10 blur-[120px]"
            animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Content */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 lg:p-16">
          {/* Left */}
          <div className="lg:col-span-7">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="font-mono text-[10px] tracking-widest text-gold bg-gold/10 border border-gold/30 px-2.5 py-1 flex items-center gap-1.5">
                <Star size={10} className="fill-gold" /> FEATURED PROJECT
              </span>
              <span className="font-mono text-[10px] tracking-widest text-emerald-200/80 border border-emerald-400/25 bg-emerald-500/5 px-2.5 py-1">
                {work.status.toUpperCase()}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-silver/50 border border-white/10 px-2.5 py-1">
                FULL STACK
              </span>
            </div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[20vw] sm:text-[16vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] tracking-tighter"
            >
              <span className="bg-gradient-to-br from-pearl via-pearl to-gold bg-clip-text text-transparent">
                WORK
              </span>
            </motion.h2>

            <p className="font-body text-lg md:text-xl text-silver/70 leading-relaxed max-w-xl mt-6">
              {work.tagline}.
            </p>
            <p className="font-body text-sm md:text-base text-silver/45 leading-relaxed max-w-xl mt-4">
              {work.intro}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mt-10">
              <button
                onClick={onOpen}
                className="group/btn relative overflow-hidden inline-flex items-center gap-2 px-6 py-3.5 bg-pearl text-void font-body text-sm font-medium tracking-wide transition-colors duration-500"
                data-hover
              >
                <span className="absolute inset-0 bg-gold translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                <Sparkles size={14} className="relative" />
                <span className="relative">Read Case Study</span>
                <ArrowUpRight size={14} className="relative transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>

              <a
                href={work.links.repo}
                target="_blank"
                rel="noreferrer"
                className="group/btn inline-flex items-center gap-2 px-6 py-3.5 border border-silver/20 hover:border-gold/60 font-body text-sm text-silver/80 hover:text-pearl tracking-wide transition-all duration-500"
                data-hover
              >
                <Github size={14} />
                Source on GitHub
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-11 h-11 flex items-center justify-center border border-silver/15 hover:border-gold/60 transition-colors"
                data-hover
              >
                <Linkedin size={15} className="text-silver/70 hover:text-gold transition-colors" />
              </a>
            </div>
          </div>

          {/* Right — visual showcase */}
          <div className="lg:col-span-5 lg:pl-6">
            <div className="relative h-full min-h-[280px] flex flex-col gap-3">
              {/* Browser frame mock */}
              <div className="relative border border-white/10 bg-void/80 backdrop-blur-md overflow-hidden flex-1">
                <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400/50" />
                    <span className="w-2 h-2 rounded-full bg-yellow-400/50" />
                    <span className="w-2 h-2 rounded-full bg-green-400/50" />
                  </div>
                  <span className="font-mono text-[9px] text-silver/35 tracking-widest">work.dev</span>
                  <span className="w-12" />
                </div>

                <div className="p-4 space-y-2.5">
                  {/* Skeleton "feed" rows */}
                  <SkeletonRow w="80%" delay={0} />
                  <SkeletonRow w="60%" delay={0.15} />
                  <SkeletonRow w="92%" delay={0.3} />
                  <div className="h-px bg-white/5 my-2" />
                  <SkeletonRow w="70%" delay={0.45} />
                  <SkeletonRow w="55%" delay={0.6} />
                  <SkeletonRow w="85%" delay={0.75} />
                </div>

                {/* Status badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-gold/70 tracking-widest">COMING SOON</span>
                  <span className="font-mono text-[9px] text-silver/30 tracking-widest">v0.1 · 2026</span>
                </div>
              </div>

              {/* Stack badges */}
              <div className="grid grid-cols-3 gap-2">
                <StackBadge icon={Cpu}      label="Next.js · TS" />
                <StackBadge icon={Server}   label="Node · Socket" />
                <StackBadge icon={Database} label="MongoDB" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="relative border-t border-white/8 px-8 md:px-12 lg:px-16 py-4 flex flex-wrap items-center justify-between gap-3 bg-void/40 backdrop-blur-sm">
          <div className="flex flex-wrap gap-2">
            {['Real-time', 'AI Assistant', 'Communities', 'Recruitment', 'CV Builder', 'OAuth'].map((t) => (
              <span key={t} className="font-mono text-[9px] tracking-widest text-silver/45 border border-white/8 px-2 py-1">
                {t.toUpperCase()}
              </span>
            ))}
          </div>
          <button
            onClick={onOpen}
            className="font-mono text-[10px] text-gold/80 hover:text-gold tracking-widest flex items-center gap-1.5 group/link"
            data-hover
          >
            EXPLORE FEATURES
            <ArrowUpRight size={12} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SkeletonRow({ w, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0.2, scaleX: 0.6 }}
      animate={{ opacity: [0.2, 0.6, 0.2], scaleX: [0.6, 1, 0.6] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay }}
      className="h-2 origin-left bg-gradient-to-r from-gold/30 via-silver/15 to-transparent"
      style={{ width: w }}
    />
  );
}

function StackBadge({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 border border-white/10 bg-void/60 backdrop-blur-sm px-2.5 py-2">
      <Icon size={12} className="text-gold/70 flex-shrink-0" />
      <span className="font-mono text-[9px] text-silver/60 tracking-widest truncate">{label}</span>
    </div>
  );
}

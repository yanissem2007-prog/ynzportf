import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Sparkles } from 'lucide-react';
import { roles, contact } from '../data';
import { useIsMobile } from '../hooks/useIsMobile';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const lineVariant = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function HeroSection() {
  const heroRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const el = heroRef.current;
    if (!el) return;
    let raf = 0;
    let pending = null;
    const onMove = (e) => {
      pending = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const { clientX, clientY } = pending;
        const { width, height, left, top } = el.getBoundingClientRect();
        const x = (clientX - left - width / 2) / width;
        const y = (clientY - top - height / 2) / height;
        el.style.setProperty('--mx', `${x * 24}px`);
        el.style.setProperty('--my', `${y * 24}px`);
        raf = 0;
      });
    };
    el.addEventListener('mousemove', onMove);
    return () => {
      el.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-void"
      style={{ '--mx': '0px', '--my': '0px' }}
    >
      {/* Aurora background — animated on desktop, static on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        {isMobile ? (
          <>
            <div className="absolute top-1/4 -left-10 w-72 h-72 rounded-full bg-gold/10 blur-[80px]" />
            <div className="absolute bottom-1/4 -right-10 w-64 h-64 rounded-full bg-ice/8 blur-[70px]" />
          </>
        ) : (
          <>
            <motion.div
              className="absolute top-1/4 -left-20 w-[520px] h-[520px] rounded-full bg-gold/8 blur-[140px]"
              animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-10 w-[460px] h-[460px] rounded-full bg-ice/6 blur-[120px]"
              animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-2/3 left-1/2 w-[380px] h-[380px] rounded-full bg-accent/8 blur-[110px]"
              animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
      </div>

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Floating orbs — desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold/40"
              style={{ top: `${15 + i * 12}%`, left: `${10 + i * 14}%` }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 w-full">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold/60 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
          </span>
          <span className="font-mono text-[11px] text-gold/80 tracking-[0.3em] uppercase">
            Available for Frontend Projects · 2026
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          {/* Left: Typography */}
          <div className="lg:col-span-8">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <div className="overflow-hidden mb-1">
                <motion.h1
                  variants={lineVariant}
                  className="font-display text-[22vw] sm:text-[18vw] md:text-[15vw] lg:text-[13vw] leading-[0.82] text-pearl tracking-tight"
                  style={{ transform: 'translate3d(calc(var(--mx) * -0.4), calc(var(--my) * -0.3), 0)' }}
                >
                  YANIS
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  variants={lineVariant}
                  className="flex items-baseline gap-3 flex-wrap mt-3"
                >
                  <span className="font-display text-[6vw] sm:text-[5vw] md:text-4xl lg:text-5xl leading-tight text-silver/40 tracking-widest">
                    I'M A
                  </span>
                  <span className="relative inline-block min-w-[260px] md:min-w-[480px]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={roles[roleIndex]}
                        initial={{ y: 30, opacity: 0, filter: 'blur(8px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: -30, opacity: 0, filter: 'blur(8px)' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block font-display text-[6vw] sm:text-[5vw] md:text-4xl lg:text-5xl leading-tight text-gold tracking-widest"
                      >
                        {roles[roleIndex].toUpperCase()}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Desc */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.9 }}
              className="mt-10 max-w-xl font-body text-base md:text-lg text-silver/55 leading-relaxed"
            >
              Full Stack Web Developer building <span className="text-pearl">production-grade applications</span> end-to-end —
              type-safe React on the front, secure Node APIs and Postgres on the back,
              motion-rich and unmistakably premium.
            </motion.p>

            {/* CTAs + socials */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.7 }}
              className="flex flex-wrap items-center gap-4 mt-10"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="group relative overflow-hidden px-7 py-3.5 bg-pearl text-void font-body text-sm font-medium tracking-wide transition-colors duration-500"
                data-hover
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  <Sparkles size={14} className="opacity-70" />
                  View My Work
                </span>
                <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="group relative px-7 py-3.5 border border-silver/20 hover:border-gold/60 font-body text-sm text-silver/80 hover:text-pearl tracking-wide transition-all duration-500"
                data-hover
              >
                <span className="inline-flex items-center gap-2">
                  Let's Talk
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </button>

              {/* Social icons */}
              <div className="flex items-center gap-2 ml-1">
                <SocialIcon href={contact.linkedin} icon={Linkedin} label="LinkedIn" />
                <SocialIcon href={contact.github} icon={Github} label="GitHub" />
              </div>
            </motion.div>
          </div>

          {/* Right: Visual card */}
          <div className="lg:col-span-4 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
              style={{ transform: 'translate3d(calc(var(--mx) * 0.3), calc(var(--my) * 0.3), 0)' }}
            >
              <div className="relative aspect-[3/4] border border-white/8 overflow-hidden bg-charcoal/40 backdrop-blur-sm">
                {/* Code window header */}
                <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                  </div>
                  <span className="font-mono text-[9px] text-silver/30 tracking-widest">portfolio.tsx</span>
                </div>

                {/* Code lines */}
                <div className="p-5 font-mono text-[11px] leading-loose space-y-1">
                  <Line><span className="text-rose-300/70">const</span> <span className="text-gold/90">yanis</span> <span className="text-silver/40">=</span> <span className="text-silver/40">{'{'}</span></Line>
                  <Line delay={0.1}>  <span className="text-ice/80">role</span><span className="text-silver/40">:</span> <span className="text-emerald-300/70">'Full Stack Dev'</span><span className="text-silver/40">,</span></Line>
                  <Line delay={0.2}>  <span className="text-ice/80">frontend</span><span className="text-silver/40">:</span> <span className="text-silver/40">[</span><span className="text-emerald-300/70">'React'</span><span className="text-silver/40">,</span> <span className="text-emerald-300/70">'Next'</span><span className="text-silver/40">],</span></Line>
                  <Line delay={0.3}>  <span className="text-ice/80">backend</span><span className="text-silver/40">:</span> <span className="text-silver/40">[</span><span className="text-emerald-300/70">'Node'</span><span className="text-silver/40">,</span> <span className="text-emerald-300/70">'Prisma'</span><span className="text-silver/40">],</span></Line>
                  <Line delay={0.4}>  <span className="text-ice/80">db</span><span className="text-silver/40">:</span> <span className="text-emerald-300/70">'PostgreSQL'</span><span className="text-silver/40">,</span></Line>
                  <Line delay={0.5}>  <span className="text-ice/80">deploy</span><span className="text-silver/40">:</span> <span className="text-emerald-300/70">'Vercel'</span><span className="text-silver/40">,</span></Line>
                  <Line delay={0.6}>  <span className="text-ice/80">passion</span><span className="text-silver/40">:</span> <span className="text-amber-200/80">Infinity</span></Line>
                  <Line delay={0.7}><span className="text-silver/40">{'}'}</span></Line>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent pointer-events-none" />

                {/* Corner */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-gold/60 tracking-widest">EST. 2022</span>
                  <span className="font-mono text-[9px] text-silver/30 tracking-widest">ALGIERS · DZ</span>
                </div>
              </div>

              {/* Floating tags */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-5 top-12 bg-void/90 backdrop-blur border border-white/10 px-3 py-2"
              >
                <p className="font-mono text-[9px] text-gold/70 tracking-widest">REACT · TS</p>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="absolute -right-4 bottom-20 bg-void/90 backdrop-blur border border-gold/30 px-3 py-2"
              >
                <p className="font-mono text-[9px] text-gold/80 tracking-widest">MOTION</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
        aria-label="Scroll down"
        data-hover
      >
        <span className="font-mono text-[9px] text-silver/40 tracking-widest group-hover:text-gold/80 transition-colors">SCROLL</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={14} className="text-gold/50 group-hover:text-gold transition-colors" />
        </motion.div>
      </motion.button>

      {/* Right edge label */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6">
        <span className="font-mono text-[9px] text-silver/25 tracking-widest [writing-mode:vertical-rl]">
          FRONTEND · UI / UX · MOTION DESIGN
        </span>
      </div>
    </section>
  );
}

function Line({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 + delay, duration: 0.4 }}
      className="whitespace-nowrap"
    >
      {children}
    </motion.div>
  );
}

function SocialIcon({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group relative w-11 h-11 flex items-center justify-center border border-silver/15 hover:border-gold/60 transition-all duration-500 overflow-hidden"
      data-hover
    >
      <span className="absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      <Icon size={16} className="relative text-silver/70 group-hover:text-gold transition-colors" />
    </a>
  );
}

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import heroCodeImage from '../assets/hero-code.png';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } }
};

const lineVariant = {
  hidden: { y: '110%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = el.getBoundingClientRect();
      const x = (clientX - left - width / 2) / width;
      const y = (clientY - top - height / 2) / height;
      el.style.setProperty('--mx', `${x * 20}px`);
      el.style.setProperty('--my', `${y * 20}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-void"
      style={{ '--mx': '0px', '--my': '0px' }}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-gold/4 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-ice/3 blur-[100px]" />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

          {/* Left: Typography */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Tag line */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 4.2, duration: 0.7 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-8 h-px bg-gold/60" />
              <span className="font-mono text-xs text-gold/70 tracking-widest uppercase">
                Portfolio 2025
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ transitionDelay: '4s' }}
            >
              <div className="overflow-hidden mb-1">
                <motion.h1
                  variants={lineVariant}
                  className="font-display text-[22vw] sm:text-[18vw] md:text-[15vw] lg:text-[13vw] leading-[0.85] text-pearl tracking-tight"
                >
                  YANIS
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  variants={lineVariant}
                  className="font-display text-[6vw] sm:text-[5vw] md:text-4xl lg:text-5xl leading-tight text-silver/50 tracking-widest mt-2"
                >
                  JUNIOR FULL STACK
                </motion.p>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  variants={lineVariant}
                  className="font-display text-[6vw] sm:text-[5vw] md:text-4xl lg:text-5xl leading-tight text-gold/70 tracking-widest"
                >
                  DEVELOPER
                </motion.p>
              </div>
            </motion.div>

            {/* Desc */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 4.8 }}
              className="mt-8 max-w-md font-body text-sm md:text-base text-silver/50 leading-relaxed"
            >
              18-year-old developer blending code, motion, creativity and digital identity
              into immersive modern experiences.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.1, duration: 0.7 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <button
                onClick={scrollToWork}
                className="group relative overflow-hidden px-8 py-3.5 bg-pearl text-void font-body text-sm font-medium tracking-wide hover:bg-gold transition-colors duration-500"
              >
                <span className="relative z-10">View My Work</span>
              </button>
              <button
                onClick={scrollToContact}
                className="group px-8 py-3.5 border border-silver/20 hover:border-gold/60 font-body text-sm text-silver/70 hover:text-pearl tracking-wide transition-all duration-500"
              >
                Contact Me
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </button>
            </motion.div>
          </div>

          {/* Right: Photo + stats */}
          <div className="lg:col-span-5 xl:col-span-4 mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] photo-placeholder border border-white/5 overflow-hidden"
                style={{ transform: 'translate(calc(var(--mx) * 0.3), calc(var(--my) * 0.3))' }}
              >
                <img
                  src={heroCodeImage}
                  alt="Code editor screenshot showcasing a contact form implementation"
                  className="absolute inset-0 h-full w-full object-cover object-left-top scale-[1.42] brightness-90 contrast-125 saturate-[0.75]"
                  draggable="false"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-void/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent mix-blend-screen" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-mono text-[10px] text-gold/60 tracking-widest">
                    YANIS / 18 / ALGIERS
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 5.2, duration: 0.7 }}
                className="absolute -left-6 top-1/4 bg-charcoal border border-white/8 px-4 py-3 hidden lg:block"
              >
                <p className="font-mono text-[10px] text-gold/60 tracking-widest">STACK</p>
                <p className="font-display text-xl text-pearl mt-0.5">REACT</p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5.4, duration: 0.7 }}
                className="absolute -bottom-6 -left-4 md:-left-8 flex gap-px hidden sm:flex"
              >
                {[['10+', 'Projects'], ['2+', 'Years Dev'], ['18', 'Years Old']].map(([val, label]) => (
                  <div key={label} className="bg-charcoal/90 backdrop-blur border border-white/6 px-4 py-3">
                    <p className="font-display text-2xl text-gold">{val}</p>
                    <p className="font-mono text-[9px] text-silver/40 tracking-widest mt-0.5">{label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-gold/40" />
        </motion.div>
        <span className="font-mono text-[9px] text-silver/30 tracking-widest rotate-90 origin-center hidden md:block">
          SCROLL
        </span>
      </motion.div>

      {/* Right edge label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.6, duration: 0.8 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6"
      >
        <span className="font-mono text-[9px] text-silver/20 tracking-widest [writing-mode:vertical-rl]">
          FULL STACK DEVELOPER — SWING TRADER
        </span>
      </motion.div>
    </section>
  );
}

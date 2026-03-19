import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const traits = [
  { icon: '⬡', label: 'Full Stack Development', desc: 'React, Node.js, databases and APIs.' },
  { icon: '◈', label: 'UI Focus', desc: 'Every pixel intentional, every interaction fluid.' },
  { icon: '◎', label: 'Motion & Interaction', desc: 'Animation as language, not decoration.' },
  { icon: '◇', label: 'Swing Trading Mindset', desc: 'Discipline, patience and long-term vision.' },
  { icon: '◉', label: 'Creative Problem Solving', desc: 'Code is craft — built with identity.' },
];

export default function AboutSection() {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section id="about" className="py-32 md:py-40 bg-void relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gold/3 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="font-mono text-xs text-gold/50 tracking-widest">02 / ABOUT</span>
          <span className="flex-1 h-px bg-white/5" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="aspect-[4/5] photo-placeholder border border-white/5 overflow-hidden">
                {/* Replace with: <img src="/src/assets/about-photo.jpg" className="w-full h-full object-cover" /> */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="font-display text-7xl text-white/5">Y</span>
                  <span className="font-mono text-xs text-white/10 tracking-widest">ABOUT PHOTO</span>
                  <span className="font-mono text-[10px] text-white/5">about-photo.jpg</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
              </div>

              {/* Decorative corner elements */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t border-l border-gold/30" />
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b border-r border-gold/30" />

              {/* Floating label */}
              <div className="absolute -right-4 top-12 bg-charcoal border border-white/8 px-4 py-3 hidden lg:block">
                <p className="font-display text-lg text-pearl">ALGIERS</p>
                <p className="font-mono text-[9px] text-silver/40 tracking-widest">ALGERIA</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display text-6xl md:text-8xl text-pearl leading-tight mb-2">
                WHO
              </h2>
              <h2 className="font-display text-6xl md:text-8xl text-gold/60 leading-tight mb-10">
                I AM
              </h2>

              <p className="font-body text-base md:text-lg text-silver/60 leading-relaxed max-w-xl mb-6">
                I'm Yanis, an 18-year-old junior full stack developer with a strong passion for
                modern interfaces, digital creativity and clean user experiences.
              </p>
              <p className="font-body text-base text-silver/40 leading-relaxed max-w-xl mb-12">
                Alongside development, I'm deeply into swing trading — building a strategic mindset
                focused on structure, discipline and long-term vision. I build projects where
                visual impact, precise motion and solid architecture converge.
              </p>
            </motion.div>

            {/* Traits */}
            <div className="space-y-0">
              {traits.map((trait, i) => (
                <motion.div
                  key={trait.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-start gap-4 py-4 border-b border-white/5 hover:border-gold/20 transition-colors duration-500 cursor-default"
                  data-hover
                >
                  <span className="text-gold/50 mt-0.5 text-lg flex-shrink-0">{trait.icon}</span>
                  <div className="flex-1 flex items-start justify-between gap-4">
                    <span className="font-body text-sm font-medium text-pearl/80 group-hover:text-pearl transition-colors">
                      {trait.label}
                    </span>
                    <span className="font-body text-xs text-silver/30 group-hover:text-silver/50 transition-colors text-right max-w-[180px]">
                      {trait.desc}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

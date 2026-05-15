import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Server, Database, Wrench } from 'lucide-react';
import { skillStacks, toolBadges } from '../data';

const ICONS = {
  Frontend: Layers,
  Backend: Server,
  Database: Database,
  'DevOps & Tools': Wrench,
};

function SkillRow({ skill, accent, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-body text-sm text-pearl/80 group-hover:text-pearl transition-colors">{skill.name}</span>
        <span className="font-mono text-[10px] text-silver/40 tracking-widest">{skill.level}%</span>
      </div>
      <div className="h-[2px] bg-white/5 relative overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: index * 0.05 + 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0 origin-left"
          style={{
            width: `${skill.level}%`,
            background: `linear-gradient(90deg, ${accent}cc, ${accent}55)`,
            boxShadow: `0 0 12px ${accent}40`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = skillStacks[activeIdx];

  return (
    <section id="skills" className="py-32 md:py-40 bg-carbon relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-gold/3 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-ice/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="font-mono text-xs text-gold/60 tracking-widest">04 / STACK</span>
          <span className="flex-1 h-px bg-white/5" />
          <span className="font-mono text-xs text-silver/30 tracking-widest hidden md:inline">FULL STACK ARSENAL</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-7"
          >
            <h2 className="font-display text-6xl md:text-8xl lg:text-9xl text-pearl leading-[0.9] tracking-tight">END</h2>
            <h2 className="font-display text-6xl md:text-8xl lg:text-9xl text-gold/70 leading-[0.9] tracking-tight">TO END</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.9 }}
            className="lg:col-span-5 lg:pt-10"
          >
            <p className="font-body text-sm md:text-base text-silver/55 leading-relaxed">
              I own the whole pipeline — from a typed React component to the Postgres schema
              behind it. Strong fundamentals, deep React + Node, motion-first thinking, and
              a designer's eye for hierarchy.
            </p>
          </motion.div>
        </div>

        {/* Stack tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          {skillStacks.map((s, i) => {
            const Icon = ICONS[s.label] || Layers;
            const isActive = i === activeIdx;
            return (
              <button
                key={s.label}
                onClick={() => setActiveIdx(i)}
                className={`relative p-4 border text-left transition-all duration-500 group overflow-hidden ${
                  isActive
                    ? 'border-gold/50 bg-gold/5'
                    : 'border-white/8 bg-charcoal/30 hover:border-gold/25'
                }`}
                data-hover
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <span
                    className="w-7 h-7 flex items-center justify-center border transition-colors"
                    style={{ borderColor: isActive ? s.accent : 'rgba(255,255,255,0.1)' }}
                  >
                    <Icon size={13} style={{ color: isActive ? s.accent : '#c0c0c060' }} />
                  </span>
                  <p className="font-mono text-[10px] text-silver/40 tracking-widest">0{i + 1}</p>
                </div>
                <p className={`font-body text-sm tracking-wide transition-colors ${isActive ? 'text-pearl' : 'text-silver/70'}`}>
                  {s.label}
                </p>
                <span
                  className="absolute bottom-0 left-0 h-px transition-all duration-500"
                  style={{
                    width: isActive ? '100%' : '0%',
                    background: s.accent,
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Active stack panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="relative p-7 md:p-8 border border-white/10 bg-charcoal/30 backdrop-blur-sm overflow-hidden">
              <span
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-30"
                style={{ background: active.accent }}
              />
              <p className="font-mono text-[10px] text-gold/60 tracking-widest mb-2 relative">// {active.label.toUpperCase()}</p>
              <h3 className="font-display text-4xl md:text-5xl text-pearl tracking-tight relative">{active.label}</h3>
              <p className="font-body text-sm text-silver/55 mt-3 leading-relaxed relative">{active.blurb}</p>
            </div>
            <div className="p-7 md:p-8 border border-white/10 bg-charcoal/20 backdrop-blur-sm space-y-5">
              {active.items.map((skill, i) => (
                <SkillRow key={skill.name} skill={skill} accent={active.accent} index={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tool ecosystem */}
        <div className="mt-20">
          <p className="font-mono text-[10px] text-gold/50 tracking-widest mb-6">// ECOSYSTEM</p>
          <div className="flex flex-wrap gap-2">
            {toolBadges.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.025, duration: 0.5 }}
                whileHover={{ y: -2, borderColor: 'rgba(201,169,110,0.6)', color: '#e8e4dc' }}
                className="font-mono text-[10px] tracking-widest text-silver/45 border border-white/8 px-3.5 py-2 cursor-default transition-colors"
                data-hover
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

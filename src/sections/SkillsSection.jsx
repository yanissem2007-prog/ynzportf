import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data';

function SkillBar({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.6 }}
      className="group py-4 border-b border-white/5 hover:border-gold/15 transition-colors duration-500"
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-body text-sm font-medium text-pearl/80 group-hover:text-pearl transition-colors">
          {skill.name}
        </span>
        <span className="font-mono text-xs text-gold/40 group-hover:text-gold/70 transition-colors">
          {skill.level}%
        </span>
      </div>
      <div className="h-px bg-white/5 relative overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06 + 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/60 to-gold/30"
          style={{ width: `${skill.level}%`, transformOrigin: 'left' }}
        />
      </div>
    </motion.div>
  );
}

const toolBadges = [
  'React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GSAP',
  'Node.js', 'MongoDB', 'Git', 'GitHub', 'Figma',
  'VS Code', 'Vercel', 'Netlify', 'JavaScript ES6+', 'TypeScript basics'
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 md:py-40 bg-carbon relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-gold/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="font-mono text-xs text-gold/50 tracking-widest">04 / SKILLS</span>
          <span className="flex-1 h-px bg-white/5" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left heading */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <h2 className="font-display text-6xl md:text-7xl text-pearl leading-tight mb-2">
                MY
              </h2>
              <h2 className="font-display text-6xl md:text-7xl text-gold/50 leading-tight mb-10">
                STACK
              </h2>
              <p className="font-body text-sm text-silver/40 leading-relaxed max-w-xs">
                A growing toolkit built through real projects, obsessive learning and a deep
                appreciation for clean code and great interfaces.
              </p>

              {/* Tool badges */}
              <div className="flex flex-wrap gap-2 mt-10">
                {toolBadges.map(tool => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ borderColor: 'rgba(201,169,110,0.4)', color: '#e8e4dc' }}
                    className="font-mono text-[9px] tracking-widest text-silver/30 border border-white/5 px-3 py-1.5 transition-colors duration-300 cursor-default"
                    data-hover
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Skill bars */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

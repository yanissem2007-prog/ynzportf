import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data';

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative cursor-default"
      data-hover
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10] photo-placeholder border border-white/5 mb-5">
        {/* Replace with actual project images */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[6rem] leading-none"
            style={{ color: project.color + '08' }}>
            {project.index}
          </span>
        </div>
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ background: `linear-gradient(135deg, ${project.color}08 0%, transparent 70%)` }}
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: 'rgba(5,5,5,0.7)' }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border border-gold/60 rounded-full flex items-center justify-center">
              <ArrowUpRight size={18} className="text-gold" />
            </div>
            <span className="font-mono text-[10px] text-gold/60 tracking-widest">VIEW PROJECT</span>
          </div>
        </motion.div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="font-mono text-[9px] tracking-widest text-silver/40 bg-void/60 backdrop-blur-sm px-2 py-1 border border-white/5">
            {project.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-xs text-gold/40 mb-1">{project.index}</p>
          <h3 className="font-display text-2xl md:text-3xl text-pearl group-hover:text-gold transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-body text-xs text-silver/40 mt-2 leading-relaxed max-w-xs">
            {project.description}
          </p>
        </div>
        <motion.div
          animate={{ rotate: hovered ? -45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight size={20} className="text-silver/20 group-hover:text-gold transition-colors duration-300 mt-2 flex-shrink-0" />
        </motion.div>
      </div>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {project.stack.map(tech => (
          <span key={tech} className="font-mono text-[9px] text-silver/30 border border-white/5 px-2 py-0.5 tracking-wide">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="work" className="py-32 md:py-40 bg-obsidian relative">
      {/* Ambient */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-ice/3 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs text-gold/50 tracking-widest">03 / WORK</span>
              <span className="w-12 h-px bg-white/8" />
            </div>
            <h2 className="font-display text-6xl md:text-8xl text-pearl leading-tight">
              SELECTED
            </h2>
            <h2 className="font-display text-6xl md:text-8xl text-silver/20 leading-tight">
              WORK
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden md:block font-body text-sm text-silver/30 max-w-xs text-right leading-relaxed"
          >
            A curated selection of projects reflecting my approach to modern digital experiences.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

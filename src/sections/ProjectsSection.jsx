import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github, Star, Server, Cpu, Database } from 'lucide-react';
import { projects, projectCategories } from '../data';
import WorkFeatured from '../components/WorkFeatured';
import WorkCaseStudy from '../components/WorkCaseStudy';

function ProjectFallback({ project }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: `radial-gradient(circle at 30% 30%, ${project.color}33, transparent 60%), linear-gradient(135deg, #0a0a0a, #111111)`,
      }}
    >
      <div className="text-center px-6">
        <p className="font-mono text-[10px] text-silver/40 tracking-widest mb-2">{project.tag?.toUpperCase()}</p>
        <p className="font-display text-4xl md:text-5xl text-pearl/90 tracking-tight">{project.title}</p>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, featured }) {
  const [hovered, setHovered] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const host = (() => { try { return new URL(project.live).hostname; } catch { return ''; } })();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.06, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative ${featured ? 'lg:col-span-2' : ''}`}
    >
      <a
        href={project.live}
        target="_blank"
        rel="noreferrer"
        aria-label={`Visit ${project.title}`}
        className="block"
        data-hover
      >
        <div className={`relative overflow-hidden border border-white/8 group-hover:border-gold/30 transition-colors duration-500 bg-void ${
          featured ? 'aspect-[16/9]' : 'aspect-[16/10]'
        }`}>
          {!imgFailed ? (
            <img
              src={project.image}
              alt={`${project.title} preview`}
              onError={() => setImgFailed(true)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <ProjectFallback project={project} />
          )}

          <div
            className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-700"
            style={{ background: `linear-gradient(135deg, ${project.color}22 0%, transparent 50%, #00000080 100%)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-void/75 backdrop-blur-sm"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ scale: hovered ? 1 : 0.9, y: hovered ? 0 : 10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center bg-gold/10">
                <ArrowUpRight size={22} className="text-gold" />
              </div>
              <span className="font-mono text-[10px] text-gold tracking-widest">VIEW LIVE</span>
            </motion.div>
          </motion.div>

          {/* Top badges */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            <div className="flex gap-2 flex-wrap">
              <span className="font-mono text-[9px] tracking-widest text-pearl/80 bg-void/70 backdrop-blur-sm px-2 py-1 border border-white/10">
                {project.tag}
              </span>
              <span className="font-mono text-[9px] tracking-widest text-gold/90 bg-void/70 backdrop-blur-sm px-2 py-1 border border-gold/30">
                {project.category.toUpperCase()}
              </span>
            </div>
            {featured && (
              <span className="font-mono text-[9px] tracking-widest text-gold bg-void/70 backdrop-blur-sm px-2 py-1 border border-gold/30 flex items-center gap-1">
                <Star size={9} className="fill-gold" /> FEATURED
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <span className="font-display text-3xl text-pearl/30">{project.index}</span>
            <span className="font-mono text-[9px] text-pearl/40 tracking-widest hidden group-hover:inline-flex items-center gap-1">
              <ExternalLink size={10} /> {host}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-6 flex items-start justify-between gap-6">
          <div className="flex-1">
            <h3 className="font-display text-3xl md:text-4xl text-pearl group-hover:text-gold transition-colors duration-300 tracking-tight">
              {project.title}
            </h3>
            <p className="font-body text-sm text-silver/50 mt-3 leading-relaxed max-w-lg">
              {project.description}
            </p>
          </div>
          <motion.div animate={{ rotate: hovered ? -45 : 0, x: hovered ? 4 : 0 }} transition={{ duration: 0.4 }}>
            <ArrowUpRight size={22} className="text-silver/25 group-hover:text-gold transition-colors duration-300 mt-2" />
          </motion.div>
        </div>

        {/* Architecture line */}
        {project.architecture && (
          <p className="mt-3 font-mono text-[10px] text-silver/35 tracking-wide flex items-center gap-2">
            <Cpu size={11} className="text-gold/50" />
            {project.architecture}
          </p>
        )}

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.stack.map((tech) => (
            <span key={tech} className="font-mono text-[10px] text-silver/55 border border-white/10 group-hover:border-gold/20 px-2.5 py-1 tracking-widest transition-colors">
              {tech}
            </span>
          ))}
        </div>

        {/* Backend badges */}
        {project.backend?.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <Server size={11} className="text-emerald-300/50" />
            {project.backend.map((b) => (
              <span key={b} className="font-mono text-[10px] text-emerald-200/60 border border-emerald-400/15 px-2 py-0.5 tracking-widest">
                {b}
              </span>
            ))}
          </div>
        )}
      </a>

      {/* Action buttons */}
      <div className="flex items-center gap-2 mt-5">
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] text-pearl/80 hover:text-gold border border-white/10 hover:border-gold/40 px-3 py-1.5 tracking-widest transition-colors"
          data-hover
        >
          <ExternalLink size={11} /> LIVE DEMO
        </a>
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] text-silver/60 hover:text-gold border border-white/10 hover:border-gold/40 px-3 py-1.5 tracking-widest transition-colors"
          data-hover
        >
          <Github size={11} /> SOURCE
        </a>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState('All');
  const [caseOpen, setCaseOpen] = useState(false);

  const filtered = useMemo(
    () => filter === 'All' ? projects : projects.filter(p => p.category === filter),
    [filter]
  );

  const openCase = () => {
    setCaseOpen(true);
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      window.history.replaceState(null, '', '#work');
    }
  };
  const closeCase = () => {
    setCaseOpen(false);
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      window.history.replaceState(null, '', '#projects');
    }
  };

  useEffect(() => {
    const sync = () => setCaseOpen(window.location.hash === '#work');
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  return (
    <section id="projects" className="py-32 md:py-40 bg-obsidian relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-ice/4 blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/4 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section opener */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-gold/60 tracking-widest">03 / SELECTED WORK</span>
            <span className="w-12 h-px bg-white/8" />
          </div>
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl text-pearl leading-[0.9] tracking-tight">SHIPPED</h2>
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl text-gold/70 leading-[0.9] tracking-tight">PROJECTS</h2>
        </motion.div>

        {/* FLAGSHIP — WORK */}
        <WorkFeatured onOpen={openCase} />

        {/* Sub-header for the rest */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 pt-8 border-t border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-[10px] text-gold/50 tracking-widest mb-2">// MORE WORK</p>
            <p className="font-display text-3xl md:text-4xl text-pearl tracking-tight">Recent client &amp; product builds</p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-body text-sm text-silver/40 max-w-sm md:text-right leading-relaxed"
          >
            <span className="text-pearl/80">Production-grade builds</span> spanning marketing
            sites, full-stack platforms and motion-rich identity systems.
          </motion.p>
        </div>

        {/* Filter chips */}
        <LayoutGroup>
          <div className="flex flex-wrap items-center gap-2 mb-14">
            {projectCategories.map((cat) => {
              const active = cat === filter;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`relative font-mono text-[11px] tracking-widest px-4 py-2 border transition-colors ${
                    active
                      ? 'text-void border-gold'
                      : 'text-silver/55 border-white/10 hover:border-gold/40 hover:text-pearl'
                  }`}
                  data-hover
                >
                  {active && (
                    <motion.span
                      layoutId="filterPill"
                      className="absolute inset-0 bg-gold -z-0"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat.toUpperCase()}</span>
                </button>
              );
            })}
            <div className="ml-auto hidden md:flex items-center gap-2 font-mono text-[10px] text-silver/30 tracking-widest">
              <Database size={11} className="text-gold/50" /> {filtered.length} PROJECTS
            </div>
          </div>
        </LayoutGroup>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                featured={!!project.featured}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 flex justify-center"
        >
          <a
            href="https://github.com/yanissem2007-prog"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 font-mono text-xs text-silver/50 hover:text-gold tracking-widest transition-colors"
            data-hover
          >
            <span className="w-12 h-px bg-silver/30 group-hover:bg-gold transition-colors" />
            EXPLORE FULL CATALOG ON GITHUB
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>

      <WorkCaseStudy open={caseOpen} onClose={closeCase} />
    </section>
  );
}

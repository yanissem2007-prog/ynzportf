import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { contact } from '../data';

const navLinks = [
  { label: 'Home',     href: 'hero',     num: '01' },
  { label: 'About',    href: 'about',    num: '02' },
  { label: 'Work',     href: 'projects', num: '03' },
  { label: 'Skills',   href: 'skills',   num: '04' },
  { label: 'Journey',  href: 'journey',  num: '05' },
  { label: 'Contact',  href: 'contact',  num: '06' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => document.getElementById(l.href)).filter(Boolean);
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] }
    );
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 bg-void/80 backdrop-blur-xl border-b border-white/5' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="group flex items-center gap-3" aria-label="Home">
            <span className="w-8 h-8 border border-gold/40 flex items-center justify-center rounded-sm group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
              <span className="font-display text-gold text-base leading-none">Y</span>
            </span>
            <span className="font-display text-pearl tracking-[0.25em] text-sm hidden sm:block">
              YANIS
            </span>
          </button>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = activeId === link.href;
              return (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="group relative flex items-center gap-1.5"
                  data-hover
                >
                  <span className={`font-mono text-[10px] transition-colors ${active ? 'text-gold' : 'text-gold/40 group-hover:text-gold/70'}`}>
                    {link.num}
                  </span>
                  <span className={`font-body text-sm tracking-wide transition-colors duration-300 ${
                    active ? 'text-pearl' : 'text-silver/55 group-hover:text-pearl'
                  }`}>
                    {link.label}
                  </span>
                  <span className={`absolute -bottom-1.5 left-0 right-0 h-px bg-gold origin-left transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="group w-9 h-9 flex items-center justify-center border border-white/10 hover:border-gold/50 transition-colors"
              data-hover
            >
              <Linkedin size={14} className="text-silver/60 group-hover:text-gold transition-colors" />
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="group w-9 h-9 flex items-center justify-center border border-white/10 hover:border-gold/50 transition-colors"
              data-hover
            >
              <Github size={14} className="text-silver/60 group-hover:text-gold transition-colors" />
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="group relative overflow-hidden ml-2 px-5 py-2 border border-gold/30 hover:border-gold/80 transition-all duration-500"
              data-hover
            >
              <span className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-all duration-500" />
              <span className="font-mono text-xs text-gold tracking-widest uppercase relative">
                Hire Me
              </span>
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 group"
            aria-label="Menu"
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="block w-6 h-px bg-pearl origin-center transition-all" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} className="block w-4 h-px bg-pearl/60" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block w-6 h-px bg-pearl origin-center" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-obsidian/97 backdrop-blur-xl flex flex-col"
          >
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gold/4 blur-3xl" />
            <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-ice/4 blur-3xl" />

            <div className="flex flex-col justify-center h-full px-8 pt-20">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollTo(link.href)}
                  className="group flex items-center gap-4 py-4 border-b border-white/5 text-left"
                >
                  <span className="font-mono text-xs text-gold/40">{link.num}</span>
                  <span className="font-display text-[10vw] text-pearl/80 group-hover:text-gold transition-colors leading-tight">
                    {link.label}
                  </span>
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 mt-10"
              >
                <a href={contact.linkedin} target="_blank" rel="noreferrer"
                  className="font-mono text-xs text-silver/40 hover:text-gold transition-colors tracking-widest">
                  LINKEDIN ↗
                </a>
                <a href={contact.github} target="_blank" rel="noreferrer"
                  className="font-mono text-xs text-silver/40 hover:text-gold transition-colors tracking-widest">
                  GITHUB ↗
                </a>
                <a href={`mailto:${contact.email}`}
                  className="font-mono text-xs text-silver/40 hover:text-gold transition-colors tracking-widest">
                  EMAIL ↗
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

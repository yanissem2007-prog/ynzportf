import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contact } from '../data';

const navLinks = [
  { label: 'Home', href: '#hero', num: '01' },
  { label: 'About', href: '#about', num: '02' },
  { label: 'Work', href: '#projects', num: '03' },
  { label: 'Skills', href: '#skills', num: '04' },
  { label: 'Contact', href: '#contact', num: '05' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.9, duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'py-4 bg-void/90 backdrop-blur-md border-b border-white/5' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <button
            onClick={() => scrollTo('#hero')}
            className="group flex items-center gap-3"
          >
            <span className="w-7 h-7 border border-gold/40 flex items-center justify-center rounded-sm group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
              <span className="font-display text-gold text-sm leading-none">
                Y
              </span>
            </span>
            <span className="font-display text-pearl tracking-widest text-sm hidden sm:block">
              YANIS
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="group relative flex items-center gap-1.5"
              >
                <span className="font-mono text-[10px] text-gold/40 group-hover:text-gold/70 transition-colors">
                  {link.num}
                </span>
                <span className="font-body text-sm text-silver/60 group-hover:text-pearl transition-colors duration-300 tracking-wide">
                  {link.label}
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => scrollTo('#contact')}
              className="group relative overflow-hidden px-5 py-2 border border-gold/30 hover:border-gold/80 transition-all duration-500"
            >
              <span className="absolute inset-0 bg-gold/0 group-hover:bg-gold/8 transition-all duration-500" />
              <span className="font-mono text-xs text-gold tracking-widest uppercase relative">
                Let's Connect
              </span>
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 group"
            aria-label="Menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-6 h-px bg-pearl origin-center transition-all"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              className="block w-4 h-px bg-pearl/60"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-6 h-px bg-pearl origin-center"
            />
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
            className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-xl flex flex-col"
          >
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gold/3 blur-3xl" />

            <div className="flex flex-col justify-center h-full px-8 pt-20">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollTo(link.href)}
                  className="group flex items-center gap-4 py-5 border-b border-white/5 text-left"
                >
                  <span className="font-mono text-xs text-gold/40">{link.num}</span>
                  <span className="font-display text-[11vw] text-pearl/80 group-hover:text-pearl transition-colors leading-tight">
                    {link.label}
                  </span>
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-6 mt-10"
              >
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-silver/40 hover:text-gold transition-colors tracking-widest"
                >
                  INSTAGRAM
                </a>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-silver/40 hover:text-gold transition-colors tracking-widest"
                >
                  GITHUB
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

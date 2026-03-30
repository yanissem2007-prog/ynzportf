import React from 'react';
import { motion } from 'framer-motion';
import { contact } from '../data';

const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { label: 'GitHub', href: contact.github },
  { label: 'Instagram', href: contact.instagram },
  { label: `mailto:${contact.email}`, href: `mailto:${contact.email}`, display: 'Email' },
];

export default function Footer() {
  const scrollTo = (href) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-void border-t border-white/5 overflow-hidden">
      {/* Ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-gold/3 blur-[120px] pointer-events-none" />

      {/* Top area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-display text-5xl md:text-6xl text-pearl mb-3">YANIS</h3>
              <p className="font-body text-sm text-silver/35 leading-relaxed max-w-xs">
                Junior Full Stack Developer & Swing Trader building modern digital experiences
                from Algiers.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <span className="w-2 h-2 rounded-full bg-green-400/60 animate-pulse" />
                <span className="font-mono text-xs text-silver/30 tracking-widest">
                  AVAILABLE FOR WORK
                </span>
              </div>
            </motion.div>
          </div>

          {/* Nav links */}
          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              <p className="font-mono text-[10px] text-gold/40 tracking-widest mb-5">NAVIGATION</p>
              <div className="space-y-3">
                {footerLinks.map(link => (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="block font-body text-sm text-silver/40 hover:text-pearl transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Socials */}
          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <p className="font-mono text-[10px] text-gold/40 tracking-widest mb-5">CONNECT</p>
              <div className="space-y-3">
                <a href={contact.github} target="_blank" rel="noreferrer"
                  className="group flex items-center justify-between border-b border-white/5 pb-3 hover:border-gold/20 transition-colors duration-300"
                  data-hover>
                  <span className="font-body text-sm text-silver/40 group-hover:text-pearl transition-colors">GitHub</span>
                  <span className="font-mono text-[10px] text-silver/20 group-hover:text-gold/50 transition-colors">↗</span>
                </a>
                <a href={contact.instagram} target="_blank" rel="noreferrer"
                  className="group flex items-center justify-between border-b border-white/5 pb-3 hover:border-gold/20 transition-colors duration-300"
                  data-hover>
                  <span className="font-body text-sm text-silver/40 group-hover:text-pearl transition-colors">Instagram</span>
                  <span className="font-mono text-[10px] text-silver/20 group-hover:text-gold/50 transition-colors">↗</span>
                </a>
                <a href={`mailto:${contact.email}`}
                  className="group flex items-center justify-between border-b border-white/5 pb-3 hover:border-gold/20 transition-colors duration-300"
                  data-hover>
                  <span className="font-body text-sm text-silver/40 group-hover:text-pearl transition-colors">{contact.email}</span>
                  <span className="font-mono text-[10px] text-silver/20 group-hover:text-gold/50 transition-colors">✉</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Big name editorial footer */}
        <div className="border-t border-white/5 pt-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-mono text-[10px] text-silver/20 tracking-widest"
            >
              © 2025 YANIS — ALL RIGHTS RESERVED
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center gap-6"
            >
              <span className="font-mono text-[10px] text-silver/15 tracking-widest">
                DESIGNED & BUILT BY YANIS
              </span>
              <span className="font-mono text-[10px] text-gold/20 tracking-widest">
                ALGIERS, DZ
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Massive editorial Y at bottom */}
      <div className="overflow-hidden pointer-events-none select-none" aria-hidden>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[40vw] leading-none text-white/[0.015] text-center -mb-[15vw]"
        >
          YANIS
        </motion.div>
      </div>
    </footer>
  );
}

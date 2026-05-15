import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, Instagram, ArrowUpRight } from 'lucide-react';
import { contact } from '../data';

const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { label: 'LinkedIn', href: contact.linkedin, icon: Linkedin },
  { label: 'GitHub', href: contact.github, icon: Github },
  { label: 'Instagram', href: contact.instagram, icon: Instagram },
  { label: 'Email', href: `mailto:${contact.email}`, icon: Mail },
];

export default function Footer() {
  const scrollTo = (href) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-void border-t border-white/5 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-gold/4 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-display text-5xl md:text-6xl text-pearl mb-3 tracking-tight">YANIS</h3>
              <p className="font-body text-sm text-silver/40 leading-relaxed max-w-xs">
                Frontend Developer crafting cinematic, performant web experiences
                from Algiers, Algeria.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="font-mono text-[10px] text-silver/40 tracking-widest">
                  AVAILABLE FOR WORK · 2026
                </span>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              <p className="font-mono text-[10px] text-gold/50 tracking-widest mb-5">NAVIGATION</p>
              <div className="space-y-3">
                {footerLinks.map(link => (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="block font-body text-sm text-silver/45 hover:text-pearl transition-colors duration-300"
                    data-hover
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <p className="font-mono text-[10px] text-gold/50 tracking-widest mb-5">CONNECT</p>
              <div className="space-y-2">
                {socials.map(s => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.label === 'Email' ? undefined : '_blank'}
                      rel="noreferrer"
                      className="group flex items-center justify-between border-b border-white/5 py-2.5 hover:border-gold/25 transition-colors duration-300"
                      data-hover
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={14} className="text-gold/50 group-hover:text-gold transition-colors" />
                        <span className="font-body text-sm text-silver/50 group-hover:text-pearl transition-colors">{s.label}</span>
                      </span>
                      <ArrowUpRight size={13} className="text-silver/20 group-hover:text-gold transition-colors" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-mono text-[10px] text-silver/25 tracking-widest"
            >
              © 2026 YANIS SEMMAR — DESIGNED & BUILT WITH REACT
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center gap-6"
            >
              <span className="font-mono text-[10px] text-silver/20 tracking-widest">
                v3.0 · 2026 EDITION
              </span>
              <span className="font-mono text-[10px] text-gold/30 tracking-widest">
                ALGIERS · DZ
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden pointer-events-none select-none" aria-hidden>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[40vw] leading-none text-white/[0.02] text-center -mb-[15vw] tracking-tighter"
        >
          YANIS
        </motion.div>
      </div>
    </footer>
  );
}

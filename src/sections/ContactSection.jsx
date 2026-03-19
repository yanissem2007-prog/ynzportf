import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ArrowUpRight, Github, Instagram } from 'lucide-react';
import { contact } from '../data';

export default function ContactSection() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const links = [
    { id: 'email', label: 'Email Me', value: contact.email, href: `mailto:${contact.email}`, icon: Mail },
    { id: 'phone', label: 'Call Me', value: contact.phone, href: `tel:${contact.phone}`, icon: Phone },
    { id: 'github', label: 'GitHub', value: '@yanissem2007-prog', href: contact.github, icon: Github },
    { id: 'instagram', label: 'Instagram', value: '@yanis__sem', href: contact.instagram, icon: Instagram },
  ];

  return (
    <section id="contact" className="py-32 md:py-40 bg-obsidian relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gold/4 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="font-mono text-xs text-gold/50 tracking-widest">05 / CONTACT</span>
          <span className="flex-1 h-px bg-white/5" />
        </motion.div>

        {/* Big title */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[14vw] md:text-[10vw] lg:text-[8vw] leading-none text-pearl"
          >
            LET'S BUILD
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[14vw] md:text-[10vw] lg:text-[8vw] leading-none text-gold/60"
          >
            SOMETHING
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[14vw] md:text-[10vw] lg:text-[8vw] leading-none text-silver/15"
          >
            STRONG
          </motion.h2>
        </div>

        {/* Contact links */}
        <div className="space-y-0">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.id}
                href={link.href}
                target={link.id === 'github' || link.id === 'instagram' ? '_blank' : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onHoverStart={() => setHoveredLink(link.id)}
                onHoverEnd={() => setHoveredLink(null)}
                className="group flex items-center justify-between py-6 border-b border-white/5 hover:border-gold/20 transition-all duration-500"
                data-hover
              >
                <div className="flex items-center gap-5">
                  <Icon
                    size={16}
                    className="text-gold/40 group-hover:text-gold transition-colors duration-300"
                  />
                  <div>
                    <p className="font-mono text-[10px] text-silver/30 tracking-widest mb-1">
                      {link.label.toUpperCase()}
                    </p>
                    <p className="font-body text-sm md:text-base text-pearl/60 group-hover:text-pearl transition-colors duration-300">
                      {link.value}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: hoveredLink === link.id ? -45 : 0, x: hoveredLink === link.id ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight size={20} className="text-silver/20 group-hover:text-gold transition-colors duration-300" />
                </motion.div>
              </motion.a>
            );
          })}
        </div>

        {/* Bottom CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-16 pt-10 border-t border-white/5"
        >
          <p className="font-body text-sm text-silver/30 max-w-xs leading-relaxed">
            Open for freelance projects, collaborations, and creative opportunities.
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="group relative overflow-hidden px-8 py-4 bg-pearl text-void font-body text-sm font-medium tracking-wide hover:bg-gold transition-colors duration-500"
            data-hover
          >
            Get In Touch →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

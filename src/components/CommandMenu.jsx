import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ArrowRight, Home, User, Briefcase, Layers,
  GitCommit, MessageSquare, Linkedin, Github, Mail, Copy
} from 'lucide-react';
import { contact } from '../data';

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const actions = useMemo(() => [
    { id: 'home',     group: 'Navigate', label: 'Home',     icon: Home,          shortcut: 'G H', run: () => scrollTo('hero') },
    { id: 'about',    group: 'Navigate', label: 'About',    icon: User,          shortcut: 'G A', run: () => scrollTo('about') },
    { id: 'projects', group: 'Navigate', label: 'Projects', icon: Briefcase,     shortcut: 'G P', run: () => scrollTo('projects') },
    { id: 'skills',   group: 'Navigate', label: 'Skills',   icon: Layers,        shortcut: 'G S', run: () => scrollTo('skills') },
    { id: 'journey',  group: 'Navigate', label: 'Journey',  icon: GitCommit,     shortcut: 'G J', run: () => scrollTo('journey') },
    { id: 'contact',  group: 'Navigate', label: 'Contact',  icon: MessageSquare, shortcut: 'G C', run: () => scrollTo('contact') },
    { id: 'linkedin', group: 'Social',   label: 'Open LinkedIn', icon: Linkedin, run: () => window.open(contact.linkedin, '_blank') },
    { id: 'github',   group: 'Social',   label: 'Open GitHub',   icon: Github,   run: () => window.open(contact.github, '_blank') },
    { id: 'email',    group: 'Social',   label: 'Email Yanis',   icon: Mail,     run: () => (window.location.href = `mailto:${contact.email}`) },
    { id: 'copy',     group: 'Quick',    label: 'Copy email address', icon: Copy, run: async () => { await navigator.clipboard.writeText(contact.email); } },
  ], []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(a => a.label.toLowerCase().includes(q) || a.id.includes(q));
  }, [query, actions]);

  function scrollTo(id) {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  useEffect(() => {
    const onKey = (e) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
        return;
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => { setActive(0); }, [query]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(a => Math.min(results.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(a => Math.max(0, a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      results[active]?.run();
      setOpen(false);
    }
  };

  // Group results
  const grouped = results.reduce((acc, item) => {
    (acc[item.group] = acc[item.group] || []).push(item);
    return acc;
  }, {});

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-3.5 py-2.5 border border-white/10 bg-void/70 backdrop-blur-md hover:border-gold/40 transition-colors group"
        data-hover
      >
        <Search size={13} className="text-silver/50 group-hover:text-gold transition-colors" />
        <span className="font-mono text-[10px] text-silver/50 tracking-widest">QUICK NAV</span>
        <kbd className="font-mono text-[9px] text-gold/70 border border-gold/30 px-1.5 py-0.5">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-void/70 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-obsidian/95 border border-white/10 backdrop-blur-xl shadow-2xl"
              role="dialog"
              aria-label="Command menu"
            >
              <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3">
                <Search size={14} className="text-gold/60" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search sections, links, actions…"
                  className="flex-1 bg-transparent font-body text-sm text-pearl placeholder:text-silver/30 outline-none"
                />
                <kbd className="font-mono text-[9px] text-silver/40 border border-white/10 px-1.5 py-0.5">ESC</kbd>
              </div>

              <div className="max-h-[55vh] overflow-y-auto py-2">
                {results.length === 0 && (
                  <p className="px-4 py-8 text-center font-mono text-[11px] text-silver/30 tracking-widest">NO RESULTS</p>
                )}
                {Object.entries(grouped).map(([group, items]) => (
                  <div key={group} className="pb-1">
                    <p className="px-4 pt-3 pb-1.5 font-mono text-[9px] text-gold/50 tracking-widest">{group.toUpperCase()}</p>
                    {items.map((item) => {
                      const idx = results.indexOf(item);
                      const isActive = idx === active;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => { item.run(); setOpen(false); }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors ${
                            isActive ? 'bg-gold/10' : 'hover:bg-white/[0.03]'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <Icon size={14} className={isActive ? 'text-gold' : 'text-silver/60'} />
                            <span className={`font-body text-sm ${isActive ? 'text-pearl' : 'text-silver/70'}`}>
                              {item.label}
                            </span>
                          </span>
                          <span className="flex items-center gap-2">
                            {item.shortcut && (
                              <kbd className="font-mono text-[9px] text-silver/35 border border-white/10 px-1.5 py-0.5">{item.shortcut}</kbd>
                            )}
                            {isActive && <ArrowRight size={12} className="text-gold" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/8 px-4 py-2.5">
                <span className="font-mono text-[9px] text-silver/35 tracking-widest">↑↓ NAVIGATE · ↵ SELECT</span>
                <span className="font-mono text-[9px] text-gold/50 tracking-widest">YANIS · ⌘K</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

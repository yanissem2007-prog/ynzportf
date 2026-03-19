import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import TradingSection from './sections/TradingSection';
import StorySection from './sections/StorySection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  return (
    <>
      {/* Grain overlay */}
      <div className="grain" aria-hidden />

      {/* Custom cursor — desktop only */}
      {!isMobile && <CustomCursor />}

      {/* Loader */}
      <Loader onComplete={() => setLoaded(true)} />

      {/* Main content */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar />
            <main>
              <HeroSection />
              <MarqueeSection />
              <AboutSection />
              <ProjectsSection />
              <MarqueeSectionSmall />
              <SkillsSection />
              <TradingSection />
              <StorySection />
              <ContactSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Small inline marquee between sections
function MarqueeSectionSmall() {
  const items = ['REACT', 'TAILWIND', 'FRAMER MOTION', 'NODE.JS', 'FULL STACK', 'UI/UX', 'GSAP', 'VITE'];
  const doubled = [...items, ...items];
  return (
    <div className="py-8 bg-void border-y border-white/4 overflow-hidden">
      <div className="flex gap-0 whitespace-nowrap animate-marquee-left" style={{ animationDuration: '20s' }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-4 font-mono text-[10px] tracking-widest text-silver/15">
            {item}
            <span className="text-gold/15">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

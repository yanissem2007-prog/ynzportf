import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function StorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative py-0 min-h-[70vh] md:min-h-screen flex items-center overflow-hidden bg-charcoal"
    >
      {/* Parallax image background */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 photo-placeholder"
      >
        {/* Replace with: <img src="/src/assets/story-photo.jpg" className="w-full h-full object-cover" /> */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs text-white/5 tracking-widest">STORY PHOTO / story-photo.jpg</span>
        </div>
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-void/95 via-void/70 to-void/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-void/30" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="w-8 h-px bg-gold/50" />
            <span className="font-mono text-xs text-gold/50 tracking-widest">IDENTITY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-7xl xl:text-8xl text-pearl leading-tight mb-6"
          >
            MORE THAN
            <br />
            <span className="text-gold">CODE</span> —
            <br />
            A VISUAL
            <br />
            IDENTITY
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="font-body text-base text-silver/50 leading-relaxed max-w-md mb-10"
          >
            Young, driven, creative, and building with ambition. Every line of code is
            a reflection of a larger vision — a digital identity in constant motion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            {['Creative', 'Driven', 'Ambitious', 'Digital-Native'].map(tag => (
              <span key={tag} className="font-mono text-[10px] text-gold/50 border border-gold/20 px-3 py-1.5 tracking-widest">
                {tag.toUpperCase()}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

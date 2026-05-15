import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { journey } from '../data';

function JourneyItem({ item, index, total }) {
  const isLast = index === total - 1;
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr] gap-6 md:gap-10 pb-12 md:pb-16"
    >
      {/* Year */}
      <div className="relative">
        <p className="font-display text-3xl md:text-5xl text-gold/80 leading-none">{item.year}</p>
      </div>

      {/* Connector */}
      <div className="relative">
        {/* Vertical line */}
        {!isLast && (
          <span className="absolute left-[-32px] md:left-[-44px] top-3 w-px h-[calc(100%+1rem)] bg-gradient-to-b from-gold/40 via-white/8 to-transparent" />
        )}
        {/* Dot */}
        <span className="absolute left-[-37px] md:left-[-50px] top-2 w-3 h-3 rounded-full bg-void border border-gold flex items-center justify-center">
          <span className="w-1 h-1 rounded-full bg-gold" />
        </span>

        <div className="group p-5 md:p-6 border border-white/8 hover:border-gold/30 bg-charcoal/30 backdrop-blur-sm transition-all duration-500">
          <p className="font-display text-xl md:text-2xl text-pearl tracking-tight">
            {item.label}
          </p>
          <p className="font-body text-sm text-silver/50 mt-2 leading-relaxed group-hover:text-silver/70 transition-colors">
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function JourneySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <section
      id="journey"
      ref={ref}
      className="py-32 md:py-40 bg-void relative overflow-hidden"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/4 blur-[200px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="font-mono text-xs text-gold/60 tracking-widest">05 / JOURNEY</span>
          <span className="flex-1 h-px bg-white/5" />
          <span className="font-mono text-xs text-silver/30 tracking-widest hidden md:inline">FRONTEND GROWTH</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left big text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
          >
            <h2 className="font-display text-6xl md:text-8xl text-pearl leading-[0.9] tracking-tight">
              FROM
            </h2>
            <h2 className="font-display text-6xl md:text-8xl text-gold/70 leading-[0.9] tracking-tight">
              FIRST LINE
            </h2>
            <h2 className="font-display text-6xl md:text-8xl text-silver/15 leading-[0.9] tracking-tight">
              TO CRAFT
            </h2>
            <p className="font-body text-sm md:text-base text-silver/50 leading-relaxed max-w-md mt-8">
              Four years of relentless iteration. Every project sharpened a different muscle —
              composition, motion, performance, taste. The journey is the work.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="lg:col-span-7">
            {journey.map((item, i) => (
              <JourneyItem key={item.year} item={item} index={i} total={journey.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

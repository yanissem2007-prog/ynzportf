import React from 'react';
import { motion } from 'framer-motion';
import { marqueeItems } from '../data';

function MarqueeTrack({ items, direction = 'left', speed = 25, accent = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden flex">
      <div
        className={`flex gap-0 whitespace-nowrap ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-6 px-6 font-display ${
              accent
                ? 'text-4xl md:text-5xl text-gold/80'
                : 'text-3xl md:text-4xl text-pearl/20'
            }`}
          >
            {item}
            <span className={`text-base ${accent ? 'text-gold/30' : 'text-silver/10'}`}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  return (
    <section className="py-12 bg-carbon border-y border-white/5 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-4"
      >
        <MarqueeTrack items={marqueeItems} direction="left" speed={30} accent={false} />
        <MarqueeTrack items={marqueeItems.slice(3).concat(marqueeItems.slice(0, 3))} direction="right" speed={25} accent={true} />
      </motion.div>
    </section>
  );
}

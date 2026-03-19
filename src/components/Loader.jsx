import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // phase 0: counting, 1: reveal name, 2: exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 900);
    const t2 = setTimeout(() => setPhase(2), 2800);
    const t3 = setTimeout(() => onComplete(), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const letters = ['Y', 'A', 'N', 'I', 'S'];

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] bg-void flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: phase === 1 ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            style={{
              background: 'radial-gradient(ellipse 80vw 60vh at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)'
            }}
          />

          {/* Horizontal lines cinematic */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
            style={{ transformOrigin: 'center' }}
          />

          {/* Counter */}
          <AnimatePresence>
            {phase === 0 && (
              <motion.div
                key="counter"
                className="absolute top-[20%] right-[10%]"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <CounterNumber />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main title */}
          <div className="relative flex items-center justify-center">
            {phase === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.08 }}
                className="font-display text-[25vw] leading-none tracking-widest text-pearl select-none"
              >
                YANIS
              </motion.div>
            ) : (
              <div className="flex items-end gap-0 overflow-hidden">
                {letters.map((letter, i) => (
                  <motion.span
                    key={letter + i}
                    className="font-display text-[18vw] md:text-[15vw] leading-none text-pearl select-none"
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                      duration: 0.9,
                      delay: i * 0.06,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            )}
          </div>

          {/* Subtitle */}
          <AnimatePresence>
            {phase === 1 && (
              <motion.div
                className="absolute bottom-[15%] left-0 right-0 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <span className="font-mono text-xs tracking-widest3 text-gold/60 uppercase">
                  Junior Full Stack Developer
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thin borders top/bottom cinematic bars */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gold/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
            style={{ transformOrigin: 'left' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold/20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
            style={{ transformOrigin: 'right' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CounterNumber() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let n = 0;
    const interval = setInterval(() => {
      n += Math.floor(Math.random() * 15) + 5;
      if (n >= 100) { setCount(100); clearInterval(interval); }
      else setCount(n);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-gold/40 text-sm tracking-widest">
      {String(count).padStart(3, '0')}
    </span>
  );
}

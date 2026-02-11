'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FuturisticBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate random dots
  const dots = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0a]">
      {/* Animated Gradient Orbs (More Visible Light) */}
      <motion.div 
        className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] lg:w-[40vw] lg:h-[40vw] bg-purple-900/20 rounded-full blur-[120px]"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] lg:w-[40vw] lg:h-[40vw] bg-emerald-900/20 rounded-full blur-[120px]"
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div 
        className="absolute top-[30%] left-[30%] w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw] lg:w-[30vw] lg:h-[30vw] bg-indigo-900/10 rounded-full blur-[100px]"
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -40, 40, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Moving Dots (Restored Movement but Subtle) */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute bg-white rounded-full opacity-20"
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.x}%`,
            top: `${dot.y}%`,
          }}
          animate={{
            y: [0, -150, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "linear",
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Layers, Users, Zap, Layout, Maximize } from 'lucide-react';

export default function Values() {
  const values = [
    { text: 'BUILD SKILLS THAT LAST', icon: <Layers className="text-white" /> },
    { text: 'LEARNING THAT FITS YOUR TEAMS', icon: <Users className="text-white" /> },
    { text: 'DESIGNED FOR REAL IMPACT', icon: <Zap className="text-white" /> },
    { text: 'SIMPLE. MODERN. EFFECTIVE.', icon: <Layout className="text-white" /> },
    { text: 'LEARNING THAT WORKS AT SCALE', icon: <Maximize className="text-white" /> },
  ];

  return (
    <section className="py-24 2xl:py-32 relative overflow-hidden">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 2xl:mb-24"
        >
          <h2 className="text-3xl md:text-5xl 2xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">Our Values</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 2xl:gap-20 items-center">
          {/* Values List */}
          <div className="space-y-6 2xl:space-y-8">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-6 p-4 2xl:p-6 rounded-2xl hover:bg-white/5 transition-colors group"
              >
                <div className="flex-shrink-0 w-12 h-12 2xl:w-16 2xl:h-16 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-cyan-900/30 transition-colors border border-white/5 group-hover:border-cyan-500/30">
                  {item.icon}
                </div>
                <h3 className="text-lg 2xl:text-2xl font-bold tracking-wider">{item.text}</h3>
              </motion.div>
            ))}
          </div>

          {/* Images Composition */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] 2xl:h-[600px] w-full"
          >
             {/* Main Image - Top Left */}
             <div className="absolute top-0 left-0 w-[85%] h-[85%] z-20">
                 <img 
                   src="/our_values.png" 
                   alt="Our Values" 
                   className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                 />
             </div>
             
             {/* Secondary Image - Bottom Right */}
             <div className="absolute bottom-0 right-0 w-[60%] h-[50%] z-10">
                 <img 
                   src="/our_value.png" 
                   alt="Our Value" 
                   className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                 />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

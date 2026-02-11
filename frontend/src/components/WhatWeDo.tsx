'use client';

import { motion } from 'framer-motion';

export default function WhatWeDo({ dict }: { dict: any }) {
  const items = dict.items;

  return (
    <section className="py-8 lg:py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-900/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 lg:mb-16 2xl:mb-24 mt-6">
           <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-emerald-600">{dict.title}</h2>
           <p className="text-white max-w-2xl 2xl:max-w-4xl mx-auto text-lg 2xl:text-xl">
             {dict.subtitle}
           </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 2xl:gap-24 items-center">
            {/* List */}
            <div className="space-y-6 2xl:space-y-8">
                {items.map((item: string, index: number) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-5 2xl:p-6 border-b border-white/20 hover:border-cyan-400 hover:bg-white/5 transition-all rounded-lg"
                    >
                        <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                        <p className="text-xl 2xl:text-2xl text-white font-medium">{item}</p>
                    </motion.div>
                ))}
            </div>

           {/* Image Section */}
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative w-full flex items-center justify-center"
           >
             <img 
                src="/site.png" 
                alt="What We Do" 
                className="w-full h-auto object-contain max-h-[600px] 2xl:max-h-[800px]"
             />
           </motion.div>
        </div>
      </div>
    </section>
  );
}

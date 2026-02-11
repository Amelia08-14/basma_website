'use client';

import { motion } from 'framer-motion';

export default function Experience({ dict }: { dict: any }) {
  const features = dict.features;

  return (
    <section className="py-24 2xl:py-32 relative overflow-hidden">
       <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 2xl:mb-32">
           <h2 className="text-3xl md:text-5xl 2xl:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">{dict.title}</h2>
           <p className="text-gray-400 max-w-2xl 2xl:max-w-4xl mx-auto text-lg 2xl:text-xl leading-relaxed tracking-wider">
                {dict.subtitle}
           </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-8">
             {features.map((feature: string, index: number) => (
                 <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: index * 0.1 }}
                     className="p-6 2xl:p-8 rounded-xl bg-gradient-to-r from-emerald-900/20 to-purple-900/20 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center min-h-[120px] 2xl:min-h-[160px]"
                 >
                     <span className="font-semibold text-lg 2xl:text-2xl text-white text-center">{feature}</span>
                 </motion.div>
             ))}
         </div>
      </div>
    </section>
  );
}

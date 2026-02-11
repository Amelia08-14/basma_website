'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonials({ dict }: { dict: any }) {
  const testimonials = dict.items;

  return (
    <section id="expertise" className="py-24 relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-900/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 relative z-10">
        <h2 className="text-3xl md:text-4xl font-medium leading-relaxed text-white">
            {dict.title_prefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400 font-bold">{dict.title_highlight}</span> {dict.title_suffix}
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item: any, index: number) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 flex flex-col justify-between min-h-[280px]"
                >
                    {/* Decorative Quote Icon */}
                    <div className="absolute -top-4 right-8 w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <Quote className="w-4 h-4 text-white fill-white" />
                    </div>

                    <p className="text-lg text-gray-200 font-light leading-relaxed mb-8 relative z-10">
                        "{item.text}"
                    </p>
                    
                    <div className="relative z-10 border-t border-white/10 pt-6">
                        <p className="font-bold text-white text-lg mb-1">{item.author}</p>
                        <p className="text-emerald-400 text-sm font-medium tracking-wide">{item.industry}</p>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/0 via-white/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
            ))}
        </div>

        <div className="flex justify-center gap-3 mt-16">
            {[1, 2, 3, 4, 5].map((star, i) => (
                <motion.div
                    key={star}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                >
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}

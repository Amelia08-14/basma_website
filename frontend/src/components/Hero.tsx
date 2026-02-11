'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero({ dict, lang }: { dict: any, lang: string }) {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 2xl:gap-20 items-center mb-16">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="z-10"
            >
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-emerald-600"
                dangerouslySetInnerHTML={{ __html: dict.title }}
              />
              <p className="text-lg 2xl:text-xl text-gray-300 mb-8 max-w-lg 2xl:max-w-2xl">
                {dict.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link 
                  href={`/${lang}/solutions`}
                  className="inline-flex items-center justify-center px-8 py-3 2xl:px-10 2xl:py-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-white font-medium w-full sm:w-auto 2xl:text-lg"
                >
                  {dict.cta}
                </Link>
              </div>
            </motion.div>

            {/* Hero Image / 3D Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 flex justify-center lg:justify-end"
            >
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-emerald-500/20 rounded-full blur-[80px] opacity-40" />
                  <img 
                    src="/robot.png" 
                    alt="Basma Robot" 
                    className="relative z-10 w-full h-auto object-contain max-h-[400px] lg:max-h-[500px] 2xl:max-h-[650px] drop-shadow-2xl"
                  />
            </motion.div>
        </div>
        
        {/* Journey Section - Explicitly stacked below */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full mt-12"
        >
            <div className="max-w-6xl mx-auto border border-gray-200/50 rounded-3xl bg-white/70 backdrop-blur-xl relative overflow-hidden shadow-xl">
                 <div className="grid md:grid-cols-2 items-center h-full min-h-[220px]">
                    <div className="p-6 md:p-8">
                        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">{dict.journey_title}</h2>
                        <p className="text-gray-600 text-sm md:text-base font-medium">
                            {dict.journey_desc}
                        </p>
                    </div>
                    <div className="relative h-full w-full flex items-center justify-center p-4">
                        <img 
                            src="/learning.png" 
                            alt="Learning Journey" 
                            className="w-full h-full object-contain max-h-[250px]"
                        />
                    </div>
                 </div>
            </div>
        </motion.div>
      </div>

    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Target, Rocket, Zap } from 'lucide-react';
import Link from 'next/link';

export default function About({ dict }: { dict: any }) {
  const cards = [
    {
      icon: <Target className="w-8 h-8 text-purple-600" />,
      title: dict.cards.positioning.title,
      description: dict.cards.positioning.desc
    },
    {
      icon: <Rocket className="w-8 h-8 text-emerald-500" />,
      title: dict.cards.mission.title,
      description: dict.cards.mission.desc
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-400" />,
      title: dict.cards.visual.title,
      description: dict.cards.visual.desc
    }
  ];

  return (
    <section id="impact" className="pt-16 lg:pt-24 2xl:pt-32 pb-6 relative">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 2xl:mb-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="relative inline-block">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
                    <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-emerald-600">{dict.title}</h2>
                    <p className="text-white max-w-4xl 2xl:max-w-5xl mx-auto text-lg 2xl:text-xl leading-relaxed">
                        {dict.description}
                    </p>
                </div>
            </motion.div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative p-8 rounded-3xl border border-gray-200 bg-white/60 hover:bg-white/80 transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                {card.icon}
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{card.title}</h3>
                <p className="text-gray-500 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Discover Basma CTA */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center mb-0"
        >
            <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-emerald-600 rounded-full hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
            >
                {dict.discover_btn}
            </button>
        </motion.div>
      </div>
    </section>
  );
}

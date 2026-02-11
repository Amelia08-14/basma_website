'use client';

import { motion } from 'framer-motion';

export default function Metrics() {
  const metrics = [
    { value: '40 - 60 %', label: 'FASTER LEARNING CYCLES', color: 'border-emerald-500' },
    { value: '30 - 50 %', label: 'LOWER TRAINING COSTS OVER TIME', color: 'border-emerald-400' },
    { value: '25 - 60 %', label: 'HIGHER KNOWLEDGE RETENTION', color: 'border-emerald-300' },
    { value: '70%', label: 'PREFERRED BY 70% OF LEARNERS COMPARED TO TRADITIONAL TRAINING', color: 'border-purple-600' },
  ];

  return (
    <section className="py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">Why Modern Learning Matters</h2>
          <p className="text-gray-400">
            Organizations that invest in modern learning see faster skills development and better performance.
          </p>
        </div>

        <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">Impact Metrics</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className={`w-40 h-40 rounded-full border-4 ${metric.color} flex items-center justify-center mb-6 relative`}>
                {/* Decorative ring segment */}
                <div className={`absolute inset-0 rounded-full border-4 border-white/20`} />
                <div className={`absolute top-0 left-0 w-full h-full border-t-4 ${metric.color} rounded-full animate-spin duration-[3000ms]`} />
                
                <span className={`text-2xl font-bold ${metric.value.includes('70') ? 'text-purple-400' : 'text-emerald-400'}`}>
                  {metric.value}
                </span>
              </div>
              <p className="text-center text-sm font-semibold tracking-wider text-gray-300 max-w-[200px]">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

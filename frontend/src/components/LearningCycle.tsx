'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function LearningCycle({ dict }: { dict: any }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { 
        id: '01', 
        title: dict.steps['01'].title, 
        desc: dict.steps['01'].desc, 
        color: 'from-blue-400 to-cyan-400',
        bg: 'bg-blue-50',
        border: 'border-blue-200'
    },
    { 
        id: '02', 
        title: dict.steps['02'].title, 
        desc: dict.steps['02'].desc, 
        color: 'from-purple-400 to-pink-400',
        bg: 'bg-purple-50',
        border: 'border-purple-200'
    },
    { 
        id: '03', 
        title: dict.steps['03'].title, 
        desc: dict.steps['03'].desc, 
        color: 'from-amber-400 to-orange-400',
        bg: 'bg-amber-50',
        border: 'border-amber-200'
    },
    { 
        id: '04', 
        title: dict.steps['04'].title, 
        desc: dict.steps['04'].desc, 
        color: 'from-emerald-400 to-green-400',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200'
    },
    { 
        id: '05', 
        title: dict.steps['05'].title, 
        desc: dict.steps['05'].desc, 
        color: 'from-rose-400 to-red-400',
        bg: 'bg-rose-50',
        border: 'border-rose-200'
    },
  ];

  return (
    <section id="methodology" className="py-24 2xl:py-32 relative">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-24 2xl:mb-32">
           <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-emerald-600">{dict.title}</h2>
           <p className="text-white 2xl:text-xl">{dict.subtitle}</p>
        </div>

        {/* Horizontal Snake Journey Map */}
        <div className="relative mt-20 hidden lg:block h-[500px] 2xl:h-[650px] max-w-[1200px] 2xl:max-w-[1400px] mx-auto">
            {/* Horizontal Snake SVG Path */}
            <svg className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-visible" viewBox="0 0 1500 500" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="gradientSnakeHoriz" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.4" /> {/* Pastel Purple */}
                        <stop offset="50%" stopColor="#34D399" stopOpacity="0.4" /> {/* Pastel Emerald */}
                        <stop offset="100%" stopColor="#F472B6" stopOpacity="0.4" /> {/* Pastel Pink */}
                    </linearGradient>
                </defs>
                <path 
                    d="M 0 250 Q 150 100, 300 250 Q 450 400, 600 250 Q 750 100, 900 250 Q 1050 400, 1200 250 Q 1350 100, 1500 250"
                    fill="none" 
                    stroke="url(#gradientSnakeHoriz)" 
                    strokeWidth="3"
                    strokeDasharray="8 8"
                    strokeLinecap="round"
                    className="w-full"
                />
            </svg>

            <div className="relative z-10 w-full h-full">
                {steps.map((step, index) => {
                    const isTop = index % 2 === 0; 
                    const leftPos = `${10 + (index * 20)}%`;
                    const topPos = isTop ? '35%' : '65%'; // Peaks at 175/500=35%, Troughs at 325/500=65%
                    
                    return (
                        <motion.div 
                            key={index}
                            className="absolute"
                            style={{ 
                                left: leftPos, 
                                top: topPos, 
                            }}
                            initial={{ opacity: 0, y: isTop ? -20 : 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }} 
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Anchor Point (Badge Center) */}
                            <div className="relative">
                                {/* Badge - Centered on Curve */}
                                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border-2 ${step.border} flex items-center justify-center shadow-md z-20`}>
                                    <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-br ${step.color}`}>{step.id}</span>
                                </div>

                                {/* Card Content - Positioned Relative to Badge */}
                                <div className={`absolute left-1/2 -translate-x-1/2 w-[250px] ${isTop ? 'bottom-0 mb-10' : 'top-0 mt-10'}`}>
                                    <div className={`p-6 rounded-2xl border ${step.border} ${step.bg} backdrop-blur-md hover:scale-105 transition-transform duration-300 text-center relative shadow-sm`}>
                                        {/* Connector Line */}
                                        <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b ${step.color} opacity-50 ${isTop ? '-bottom-10 h-10' : '-top-10 h-10'}`} />
                                        
                                        <h3 className={`text-xl font-bold mb-2 text-gray-900`}>
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 text-xs leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>

        {/* Mobile Vertical List */}
        <div className="lg:hidden space-y-6 mt-12">
            {steps.map((step, index) => (
                <div key={index} className={`p-6 rounded-2xl border ${step.border} ${step.bg} backdrop-blur-md shadow-sm`}>
                    <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br ${step.color} mb-2`}>{step.id} {step.title}</div>
                    <p className="text-gray-600">{step.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}

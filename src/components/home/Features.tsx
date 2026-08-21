'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trees, Truck, ShieldCheck } from 'lucide-react';

const DARK_FEATURES = [
  {
    icon: Sparkles,
    title: 'Bespoke Dimensions',
    description:
      'Customize table length, width, timber species, edge chamfers, and seating capacity from 6 to 18 guests.',
  },
  {
    icon: Trees,
    title: 'Old-Growth Hardwoods',
    description:
      '100% solid kiln-dried American Walnut, White Oak, and quarter-sawn Ash selected for continuous grain flow.',
  },
  {
    icon: ShieldCheck,
    title: 'Master Blind Joinery',
    description:
      'Precision mortise-and-tenon structure finished with heat- and wine-resilient botanical hardwax oils.',
  },
  {
    icon: Truck,
    title: 'White-Glove Placement',
    description:
      'Complimentary dining room placement, leveling, solid pedestal bolting, and packaging removal.',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-[#121110] text-[#FDFBF7] relative overflow-hidden border-t border-stone-800">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-lime-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-stone-900 border border-stone-800 text-[#124903] text-xs font-semibold uppercase tracking-widest rounded-full"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>How We Build Our Tables</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight"
          >
            Built by hand. Built to last{' '}
            <span className="text-[#124903] italic font-light">for your whole family.</span>
          </motion.h2>
        </div>

        {/* Grid of 4 Dark Cards (Matching inspo video 4-card layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DARK_FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-8 bg-[#1C1918] rounded-3xl border border-stone-800/80 shadow-xl hover:border-[#84cc16]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Glowing Icon Badge (Matching inspo video green icon box) */}
                  <div className="w-12 h-12 rounded-2xl bg-[#84cc16]/10 text-[#84cc16] flex items-center justify-center mb-6 group-hover:bg-[#84cc16] group-hover:text-stone-950 transition-colors duration-300">
                    <Icon className="w-6 h-6 stroke-1.5" />
                  </div>

                  <h3 className="font-serif text-xl font-medium text-white mb-3 group-hover:text-[#84cc16] transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-stone-400 font-sans leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500 font-mono">
                  <span>SPEC / 0{index + 1}</span>
                  <span className="text-[#84cc16] opacity-0 group-hover:opacity-100 transition-opacity">
                    Active →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

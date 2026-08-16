'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Compass,
  Ruler,
  CheckCircle2,
  ArrowUpRight,
  Award,
  Users,
} from 'lucide-react';
import Link from 'next/link';

interface FeatureItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  tag: string;
}

const features: FeatureItem[] = [
  {
    id: 'craftsmanship',
    icon: Award,
    title: 'Master Joinery',
    description:
      'Every dining table is hand-crafted using time-honored mortise and tenon joinery in kiln-dried solid hardwood — built to be passed down through generations.',
    tag: 'Solid Hardwood',
  },
  {
    id: 'stonework',
    icon: Layers,
    title: 'Stone & Marble Tops',
    description:
      'Honed travertine, Nero Marquina, and book-matched marble slabs transform each dining surface into an architectural statement piece.',
    tag: 'Natural Stone',
  },
  {
    id: 'seating',
    icon: Users,
    title: 'Grand Seating Scales',
    description:
      'From intimate 4-seater round tables to 18-seater banquet masterpieces — every dimension is engineered for comfort, proportion, and presence.',
    tag: 'Tailored Seating',
  },
  {
    id: 'bespoke',
    icon: Ruler,
    title: 'Bespoke Commission',
    description:
      'Design your ideal dining table — choose wood species, finish, leg profile, top shape, and seating count. Crafted exclusively for your dining space.',
    tag: 'Custom Made',
  },
];

export default function IconFeatures() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-[#1A1A1A] text-white py-24 px-6 sm:px-10 flex flex-col justify-center items-center select-none overflow-hidden transition-colors duration-700">
      {/* Background ambient warm lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#859F3C]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#859F3C]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Main Headline with Brand Primary Capsule */}
        <div className="text-center mb-16 sm:mb-20 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl md:text-[54px] font-serif font-normal tracking-tight leading-[1.18] text-white">
            The art of the{' '}
            <span className="inline-flex items-center gap-1.5 px-5 py-1 rounded-full bg-[#859F3C] text-white font-serif font-bold tracking-tight text-3xl sm:text-5xl md:text-[50px] shadow-[0_0_24px_rgba(133,159,60,0.45)] my-1 align-middle">
              dining table.
            </span>
          </h2>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isHovered = activeCard === feature.id;

            return (
              <div
                key={feature.id}
                onMouseEnter={() => setActiveCard(feature.id)}
                onMouseLeave={() => setActiveCard(null)}
                className={`group relative rounded-3xl p-7 flex flex-col justify-between min-h-[340px] transition-all duration-500 border ${
                  isHovered
                    ? 'bg-[#222222] border-[#859F3C]/70 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(133,159,60,0.2)] -translate-y-2'
                    : 'bg-[#141414] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Top Section: Brand Primary Icon Box & Tag */}
                <div className="flex items-start justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-[#859F3C] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(133,159,60,0.35)] transition-transform duration-300 group-hover:scale-105">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-300 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    {feature.tag}
                  </span>
                </div>

                {/* Bottom Section: Title & Description */}
                <div className="mt-8 flex flex-col gap-2.5">
                  <h3 className="text-xl font-bold font-serif tracking-tight text-white group-hover:text-[#859F3C] transition-colors flex items-center justify-between">
                    <span>{feature.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#859F3C]" />
                  </h3>
                  <p className="text-sm font-normal text-stone-400 leading-relaxed font-sans">
                    {feature.description}
                  </p>
                </div>

                {/* Interactive bottom bar */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1.5 text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#859F3C]" />
                    Lifetime Guarantee
                  </span>
                  <span className="font-mono text-[#859F3C] font-semibold">0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Atelier Concierge Strip */}
        <div className="w-full mt-12 p-6 rounded-3xl bg-[#141414] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#859F3C]/20 border border-[#859F3C]/40 flex items-center justify-center text-[#859F3C]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-serif">
                Commission Your Dining Table Today
              </div>
              <div className="text-xs text-stone-400 font-sans">
                Speak with our master craftsmen to design a dining table built exclusively for your home
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href="/contact"
              className="flex-1 md:flex-initial px-5 py-2.5 rounded-full bg-[#859F3C] hover:bg-[#738b32] text-white text-xs font-bold transition-all hover:shadow-[0_0_20px_rgba(133,159,60,0.45)] text-center"
            >
              Start a Bespoke Order
            </Link>
            <Link
              href="/shop"
              className="flex-1 md:flex-initial px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all border border-white/10 text-center"
            >
              Browse Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { Play, Sparkles, ArrowDownRight, Layers, Users, Zap } from 'lucide-react';
import Image from 'next/image';

interface SapforceHeroProps {
  onOpenHowItWorks?: () => void;
  onScrollToFeatures?: () => void;
}

export default function SapforceHero({
  onOpenHowItWorks,
  onScrollToFeatures,
}: SapforceHeroProps) {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-10 max-w-7xl mx-auto select-none">
      {/* Background Organic Topographic Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden -z-10">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 200 C 300 100, 600 350, 1000 200 C 1200 120, 1400 300, 1600 250"
            stroke="#dbe3eb"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M-50 400 C 350 300, 700 550, 1100 380 C 1300 280, 1500 480, 1650 420"
            stroke="#d4ded2"
            strokeWidth="1.5"
          />
          <path
            d="M-80 650 C 400 550, 800 800, 1200 620 C 1400 500, 1550 720, 1700 650"
            stroke="#e2e8f0"
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />
          <path
            d="M200 850 C 500 700, 900 880, 1300 750"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Top Giant Brand Headline */}
      <div className="w-full text-center relative z-0 mt-4 md:mt-8">
        <h1
          className="font-sans font-black tracking-[-0.05em] text-[clamp(4.5rem,14.5vw,13.5rem)] leading-[0.85] text-[#121417] uppercase tracking-tighter"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          SAPFORCE.
        </h1>
      </div>

      {/* Middle & Lower Hero Content Area (Positioned Around Center 3D Orb) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-end relative z-10 mt-auto pt-16 sm:pt-24">
        {/* Left Column: User Stack & Product Tagline */}
        <div className="flex flex-col gap-8 max-w-sm">
          {/* Avatar Cluster + 2M+ Counter */}
          <div className="flex items-center gap-3.5 bg-white/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-stone-200/60 shadow-sm w-fit">
            <div className="flex -space-x-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-full ring-2 ring-white bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                JD
              </div>
              <div className="w-9 h-9 rounded-full ring-2 ring-white bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                AL
              </div>
              <div className="w-9 h-9 rounded-full ring-2 ring-white bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                MK
              </div>
            </div>
            <div>
              <div className="font-extrabold text-stone-900 text-lg leading-tight tracking-tight">
                2M+
              </div>
              <div className="text-[11.5px] font-medium text-stone-500 tracking-tight">
                World active user
              </div>
            </div>
          </div>

          {/* Tagline Card */}
          <div className="relative group">
            <p className="text-stone-800 font-semibold text-lg sm:text-[21px] leading-snug tracking-tight">
              The design software that keeps your flow with AI tools and built-in
              graphics
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-stone-500">
              <span className="w-2 h-2 rounded-full bg-[#99ff00]" />
              <span>Next-Gen Vector Canvas & AI Workflow</span>
            </div>
          </div>
        </div>

        {/* Right Column: Feature Index Markers & Glowing "How It Works" Pill Button */}
        <div className="flex flex-col items-start md:items-end justify-between gap-10">
          {/* Metadata Index List */}
          <div className="flex flex-col items-start md:items-end gap-1.5 text-stone-500 font-medium text-sm tracking-tight">
            <div className="flex items-center gap-2 hover:text-stone-950 transition-colors">
              <span className="text-stone-800 font-medium">Web based</span>
              <span className="text-stone-400 font-mono text-xs">/01</span>
            </div>
            <div className="flex items-center gap-2 hover:text-stone-950 transition-colors">
              <span className="text-stone-800 font-medium">Collaborative</span>
              <span className="text-stone-400 font-mono text-xs">/02</span>
            </div>
            <div className="flex items-center gap-2 hover:text-stone-950 transition-colors">
              <span className="text-stone-800 font-medium">Real-time</span>
              <span className="text-stone-400 font-mono text-xs">/03</span>
            </div>
          </div>

          {/* Glowing Neon "How it works?" Action Button (from video) */}
          <button
            onClick={onOpenHowItWorks}
            className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#9ef01a] text-stone-950 font-bold text-sm sm:text-base tracking-tight shadow-[0_4px_24px_rgba(158,240,26,0.55)] hover:shadow-[0_6px_32px_rgba(158,240,26,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {/* Play triangle */}
            <span className="w-6 h-6 rounded-full bg-stone-950 text-[#9ef01a] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Play className="w-3 h-3 fill-[#9ef01a] ml-0.5" />
            </span>
            <span>How it works?</span>

            {/* Pulsing ring indicator */}
            <span className="absolute -inset-1 rounded-full bg-[#9ef01a]/30 animate-ping pointer-events-none -z-10 opacity-75" />
          </button>
        </div>
      </div>
    </div>
  );
}

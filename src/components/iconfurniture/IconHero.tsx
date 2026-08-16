'use client';

import React from 'react';
import { Sparkles, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface IconHeroProps {
  onOpenAtelier?: () => void;
  onScrollToFeatures?: () => void;
}

export default function IconHero({
  onOpenAtelier,
  onScrollToFeatures,
}: IconHeroProps) {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-10 max-w-7xl mx-auto select-none">
      {/* Background Organic Topographic Design Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden -z-10">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 200 C 300 120, 600 340, 1000 210 C 1200 130, 1400 310, 1600 250"
            stroke="#e6d5c3"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M-50 420 C 350 310, 700 560, 1100 390 C 1300 290, 1500 490, 1650 430"
            stroke="#ddb892"
            strokeWidth="1.5"
          />
          <path
            d="M-80 660 C 400 560, 800 810, 1200 630 C 1400 510, 1550 730, 1700 660"
            stroke="#e6ccb2"
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      {/* Top Giant Brand Headline */}
      <div className="w-full text-center relative z-0 mt-4 md:mt-8">
        <h1
          className="font-serif font-black tracking-[-0.04em] text-[clamp(4.2rem,13.5vw,12.5rem)] leading-[0.88] text-[#1a1714] uppercase"
        >
          ICON FURNITURE.
        </h1>
      </div>

      {/* Middle & Lower Hero Content (Framed around center 3D luxury orb) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-end relative z-10 mt-auto pt-16 sm:pt-24">
        {/* Left Column: Client Heritage & Architectural Tagline */}
        <div className="flex flex-col gap-5 max-w-md">
          {/* Avatar Cluster + 15k+ Counter */}
          <div className="flex items-center gap-3.5 bg-white/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-stone-200/70 shadow-xs w-fit">
            <div className="flex -space-x-2.5 overflow-hidden">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-white bg-[#9a6b43] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                MK
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-white bg-[#292524] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                AL
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-white bg-[#d4a373] text-stone-900 flex items-center justify-center text-xs font-bold shadow-xs">
                SR
              </div>
            </div>
            <div>
              <div className="font-extrabold text-stone-900 text-base sm:text-lg leading-tight tracking-tight flex items-center gap-1.5">
                <span>15k+</span>
                <span className="flex text-amber-500 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </span>
              </div>
              <div className="text-[11px] sm:text-[11.5px] font-medium text-stone-500 tracking-tight">
                Editorial Living Spaces Crafted
              </div>
            </div>
          </div>

          {/* Tagline - Hidden on small screens to prevent distracting overlap with 3D model */}
          <div className="relative hidden md:block">
            <p className="text-stone-900 font-serif font-normal text-xl sm:text-[23px] leading-snug tracking-tight">
              Architectural modern living curated from sustainable solid woods,
              tactile bouclé fabrics, and honed Italian stonework.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-stone-500">
              <span className="w-2 h-2 rounded-full bg-[#9a6b43]" />
              <span>Bespoke Atelier • Mortise & Tenon Joinery</span>
            </div>
          </div>
        </div>

        {/* Right Column: Metadata Index Markers & Glowing CTA Button */}
        <div className="flex flex-col items-start md:items-end justify-between gap-6 sm:gap-10">
          {/* Metadata Index List - Hidden on mobile */}
          <div className="hidden md:flex flex-col items-start md:items-end gap-1.5 text-stone-500 font-medium text-sm tracking-tight">
            <div className="flex items-center gap-2 hover:text-stone-950 transition-colors">
              <span className="text-stone-800 font-medium">Handcrafted Solid Wood</span>
              <span className="text-[#9a6b43] font-mono text-xs">/01</span>
            </div>
            <div className="flex items-center gap-2 hover:text-stone-950 transition-colors">
              <span className="text-stone-800 font-medium">Honed Travertine & Marble</span>
              <span className="text-[#9a6b43] font-mono text-xs">/02</span>
            </div>
            <div className="flex items-center gap-2 hover:text-stone-950 transition-colors">
              <span className="text-stone-800 font-medium">Bespoke 3D Atelier</span>
              <span className="text-[#9a6b43] font-mono text-xs">/03</span>
            </div>
          </div>

          {/* Glowing Amber/Gold Luxury Pill CTA Button */}
          <Link
            href="/shop"
            className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#d4a373] hover:bg-[#c28e58] text-stone-950 font-bold text-sm sm:text-base tracking-tight shadow-[0_4px_24px_rgba(212,163,115,0.6)] hover:shadow-[0_6px_32px_rgba(212,163,115,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {/* Arrow Icon */}
            <span className="w-6 h-6 rounded-full bg-stone-950 text-[#d4a373] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-110">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span>Our Cataloge</span>

            {/* Pulsing aura */}
            <span className="absolute -inset-1 rounded-full bg-[#d4a373]/30 animate-ping pointer-events-none -z-10 opacity-75" />
          </Link>
        </div>
      </div>
    </div>
  );
}

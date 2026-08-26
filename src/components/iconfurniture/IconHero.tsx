'use client';

import React, { useState, useEffect } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface IconHeroProps {
  onOpenAtelier?: () => void;
  onScrollToFeatures?: () => void;
}

export default function IconHero({
  onOpenAtelier,
  onScrollToFeatures,
}: IconHeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // High-End Parallax: Logo scales down from 1.0 to 0.24 and glides seamlessly up toward the navbar
  const scrollRatio = Math.min(1, Math.max(0, scrollY / 320));
  // Smooth cubic in-out easing for organic deceleration
  const easeProgress =
    scrollRatio < 0.5
      ? 4 * scrollRatio * scrollRatio * scrollRatio
      : 1 - Math.pow(-2 * scrollRatio + 2, 3) / 2;

  const logoScale = Math.max(0.24, 1 - easeProgress * 0.74);
  const logoTranslateY = -easeProgress * 235;
  // Cross-fades seamlessly into the navbar logo at the docking threshold (scrollRatio > 0.80)
  const logoOpacity =
    scrollRatio >= 0.8
      ? Math.max(0, 1 - (scrollRatio - 0.8) / 0.2)
      : 1;

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col justify-between pt-24 sm:pt-28 pb-32 sm:pb-12 px-5 sm:px-10 max-w-7xl mx-auto select-none">
      {/* Background Organic Topographic Design Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden -z-10">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 200 C 300 120, 600 340, 1000 210 C 1200 130, 1400 310, 1600 250"
            stroke="#869e32"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            strokeOpacity="0.4"
          />
          <path
            d="M-50 420 C 350 310, 700 560, 1100 390 C 1300 290, 1500 490, 1650 430"
            stroke="#869e32"
            strokeWidth="1.5"
            strokeOpacity="0.3"
          />
          <path
            d="M-80 660 C 400 560, 800 810, 1200 630 C 1400 510, 1550 730, 1700 660"
            stroke="#869e32"
            strokeWidth="1.2"
            strokeDasharray="6 6"
            strokeOpacity="0.25"
          />
        </svg>
      </div>

      {/* ─── Giant Brand Logo Behind 3D Furniture (Smoothly shrinks and docks into navbar on scroll) ─── */}
      <div
        className="w-full flex flex-col items-center justify-center text-center relative z-0 mt-1 sm:mt-6 pointer-events-none will-change-transform origin-top"
        style={{
          transform: `translateY(${logoTranslateY}px) scale(${logoScale})`,
          opacity: logoOpacity,
          transition: 'transform 0.08s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.12s ease-out',
        }}
      >
        <div className="relative w-[86vw] max-w-[820px] aspect-[3.2/1] flex items-center justify-center">
          <Image
            src="/assets/iconfurniture-logo.png"
            alt="Icon Furniture"
            fill
            priority
            className="object-contain drop-shadow-sm select-none"
          />
        </div>
      </div>

      {/* ─── Middle & Lower Hero Content (Framed around center 3D luxury centerpiece) ─── */}
      <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-5 sm:gap-8 items-center md:items-end relative z-20 mt-auto pt-8 sm:pt-24">
        {/* Left Column / Mobile Top: Client Heritage & Architectural Tagline */}
        <div className="flex flex-col items-center md:items-start gap-4 sm:gap-5 max-w-md w-full pointer-events-auto text-center md:text-left">
          {/* Avatar Cluster + 15k+ Counter Pill */}
          <div className="flex items-center gap-3.5 bg-white/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-stone-200/80 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_30px_-5px_rgba(134,158,50,0.15)] transition-all duration-300">
            <div className="flex -space-x-2.5 overflow-hidden shrink-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-white bg-[#869e32] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                MK
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-white bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                AL
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-white bg-[#869e32] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                SR
              </div>
            </div>
            <div className="text-left">
              <div className="font-extrabold text-[#1A1A1A] text-sm sm:text-base leading-tight tracking-tight flex items-center gap-1.5">
                <span>21k+</span>
                <span className="flex text-[#869e32] text-xs">
                  <Star className="w-3.5 h-3.5 fill-[#869e32]" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#869e32] bg-[#869e32]/10 px-1.5 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
              <div className="text-[11px] sm:text-[11.5px] font-medium text-stone-500 tracking-tight">
                Dining Tables Crafted
              </div>
            </div>
          </div>

          {/* Tagline - Desktop Full Statement */}
          <div className="relative hidden md:block">
            <p className="text-[#1A1A1A] font-serif font-normal text-xl sm:text-[23px] leading-snug tracking-tight">
              Handmade luxury dining tables crafted from solid wood and natural marble stone. Built strong to last for generations in your home.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-stone-500">
              <span className="w-2 h-2 rounded-full bg-[#869e32]" />
              <span>Custom Made to Order • 100% Solid Natural Wood</span>
            </div>
          </div>
        </div>

        {/* Right Column / Mobile Bottom: Metadata Index Markers & Glowing CTA Button */}
        <div className="flex flex-col items-center md:items-end justify-between gap-4 sm:gap-8 w-full md:w-auto pointer-events-auto">
          {/* Metadata Index List - Hidden on mobile */}
          <div className="hidden md:flex flex-col items-end gap-1.5 text-stone-500 font-medium text-sm tracking-tight">
            <div className="flex items-center gap-2 hover:text-[#1A1A1A] transition-colors">
              <span className="text-[#1A1A1A] font-medium">Handcrafted Solid Wood</span>
              <span className="text-[#869e32] font-mono text-xs font-semibold">/01</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#1A1A1A] transition-colors">
              <span className="text-[#1A1A1A] font-medium">Epoxy & Solid Wood</span>
              <span className="text-[#869e32] font-mono text-xs font-semibold">/02</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[#1A1A1A] transition-colors">
              <span className="text-[#1A1A1A] font-medium">Custom Sizes & Colors</span>
              <span className="text-[#869e32] font-mono text-xs font-semibold">/03</span>
            </div>
          </div>

          {/* Glowing Brand Primary Luxury Pill CTA Button */}
          <Link
            href="/shop"
            className="group relative w-full sm:w-auto max-w-[320px] sm:max-w-none inline-flex items-center justify-center gap-3.5 px-7 py-3.5 sm:py-4 rounded-full bg-[#869e32] hover:bg-[#738827] text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_8px_28px_rgba(134,158,50,0.38)] hover:shadow-[0_12px_36px_rgba(134,158,50,0.52)] hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 cursor-pointer ring-4 ring-[#869e32]/20"
          >
            {/* Arrow Icon in Onyx Disc */}
            <span className="w-7 h-7 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:translate-x-1 shrink-0">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span className="truncate">View Dining Tables</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          
          // Show button once scrolled past 320px
          setIsVisible(scrollY > 320);

          // Calculate reading/scroll percentage (0 to 100)
          if (docHeight > 0) {
            const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
            setScrollProgress(progress);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ultra-Smooth, High-End Cubic Scroll-To-Top Animation
  const scrollToTop = () => {
    const startPosition = window.scrollY;
    if (startPosition === 0) return;

    const startTime = performance.now();
    // Dynamically calculate pleasant duration between 650ms and 950ms based on distance
    const duration = Math.min(950, Math.max(650, Math.sqrt(startPosition) * 16));

    // Refined quintic-cubic ease-out for a silky luxury glide
    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3.5);

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeOutCubic(progress);

      window.scrollTo(0, startPosition * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  // SVG Circle Progress calculation (radius = 20, circumference ≈ 125.66)
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-24 right-4 sm:bottom-8 sm:right-8 z-40 pointer-events-auto"
        >
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white/90 backdrop-blur-xl border border-stone-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_36px_rgba(134,158,50,0.3)] text-[#1A1A1A] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-92 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#869e32]"
          >
            {/* SVG Circular Scroll Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
              viewBox="0 0 48 48"
            >
              {/* Background Track Circle */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-stone-200/70"
                strokeWidth="2.2"
                fill="transparent"
              />
              {/* Animated Progress Indicator Circle */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-[#869e32] transition-all duration-150 ease-out"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Icon & Hover Lift Animation */}
            <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.4] text-[#1A1A1A] group-hover:text-[#869e32] transition-colors" />
            </div>

            {/* Subtle Aura / Ping on Hover */}
            <span className="absolute -inset-1 rounded-full bg-[#869e32]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xs" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import SapforceNavbar from './SapforceNavbar';
import SapforceHero from './SapforceHero';
import Sapforce3DOrb from './Sapforce3DOrb';
import SapforceFeatures from './SapforceFeatures';
import SapforceDemoModal from './SapforceDemoModal';

export default function SapforceExperience() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Calculate progress between 0 and 1 over the first viewport scroll
      const progress = Math.min(Math.max(scrollY / windowHeight, 0), 1);
      setScrollProgress(progress);
      setIsDark(progress > 0.45);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`relative min-h-[200vh] w-full transition-colors duration-700 ease-out font-sans ${
        isDark ? 'bg-[#0d0f12]' : 'bg-[#f4f6f8]'
      }`}
    >
      {/* 1. Floating Interactive Navbar */}
      <SapforceNavbar isDark={isDark} />

      {/* 2. Fixed Interactive 3D WebGL Orb Centerpiece */}
      <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center">
        <div className="w-full h-full max-w-5xl max-h-[800px] flex items-center justify-center">
          <Sapforce3DOrb
            scrollProgress={scrollProgress}
            interactive={true}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* 3. Hero Section (Light Mode) */}
      <section className="relative z-20 min-h-screen flex flex-col justify-between">
        <SapforceHero
          onOpenHowItWorks={() => setIsDemoModalOpen(true)}
          onScrollToFeatures={scrollToFeatures}
        />
      </section>

      {/* 4. Feature Showcase Section (Dark Mode) */}
      <div ref={featuresRef} className="relative z-20">
        <SapforceFeatures />
      </div>

      {/* 5. Interactive Demo Modal ("How it works?") */}
      <SapforceDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import IconNavbar from './IconNavbar';
import IconHero from './IconHero';
import Icon3DFurniture from './Icon3DFurniture';
import IconFeatures from './IconFeatures';
import IconAtelierModal from './IconAtelierModal';
import IconCatalogShowcase from './IconCatalogShowcase';
import Footer from '@/components/layout/Footer';

export default function IconExperience() {
  const [isDark, setIsDark] = useState(false);
  const [isAtelierModalOpen, setIsAtelierModalOpen] = useState(false);
  const isDarkRef = useRef(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight || 800;
          const shouldBeDark = scrollY > windowHeight * 0.45 && scrollY < windowHeight * 2.2;

          // Only trigger React state update if the boolean value actually changed
          if (shouldBeDark !== isDarkRef.current) {
            isDarkRef.current = shouldBeDark;
            setIsDark(shouldBeDark);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`relative min-h-[250vh] w-full transition-colors duration-700 ease-out ${
        isDark ? 'bg-[#1A1A1A]' : 'bg-[#fdfcf7]'
      }`}
    >
      {/* 1. Floating Interactive Luxury Navbar */}
      <IconNavbar isDark={isDark} />

      {/* 2. Fixed Interactive 3D WebGL Furniture Centerpiece */}
      <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center">
        <div className="w-full h-full max-w-5xl max-h-[800px] flex items-center justify-center">
          <Icon3DFurniture
            interactive={true}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* 3. Hero Section (Luxury Ivory Mode) */}
      <section className="relative z-20 min-h-screen flex flex-col justify-between">
        <IconHero
          onOpenAtelier={() => setIsAtelierModalOpen(true)}
          onScrollToFeatures={scrollToFeatures}
        />
      </section>

      {/* 4. Feature Showcase Section (Dark Atelier Carbon Mode) */}
      <div ref={featuresRef} className="relative z-20">
        <IconFeatures />
      </div>

      {/* 5. Flagship Collection Catalog Grid */}
      <IconCatalogShowcase />

      {/* 6. Brand Footer */}
      <div className="relative z-20">
        <Footer />
      </div>

      {/* 7. Interactive Atelier Modal */}
      <IconAtelierModal
        isOpen={isAtelierModalOpen}
        onClose={() => setIsAtelierModalOpen(false)}
      />
    </div>
  );
}

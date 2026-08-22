'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  Play,
  Pause,
  Compass,
  Eye,
  X,
} from 'lucide-react';
import { Product, ProductImageAngle } from '@/types';
import IconImage from '@/components/common/IconImage';

interface ProductGalleryRailProps {
  product: Product;
}

export default function ProductGalleryRail({ product }: ProductGalleryRailProps) {
  // Normalize and aggregate distinct photo angles (primary image + all added angles)
  const angles: ProductImageAngle[] = React.useMemo(() => {
    const angleList: ProductImageAngle[] = [];
    const seenUrls = new Set<string>();

    const addAngle = (url?: string, label?: string) => {
      if (!url || typeof url !== 'string' || seenUrls.has(url)) return;
      seenUrls.add(url);
      angleList.push({
        label: label || `Perspective Angle 0${angleList.length + 1}`,
        url,
      });
    };

    // 1. Primary photo always comes first
    if (product.image_url) {
      addAngle(product.image_url, 'Primary Silhouette');
    }

    // 2. Extra angle photos added by admin (product.images)
    if (Array.isArray(product.images) && product.images.length > 0) {
      const angleLabels = [
        'Architectural Profile',
        'Surface & Timber Grain',
        'Tenon Joint & Leg Detail',
        'Top View Perspective',
        'Dining Room Setting',
        'Sculptural Base Angle',
        'Hand-Finished Edge',
        'Interior Living Ambience',
      ];
      product.images.forEach((url, idx) => {
        if (!seenUrls.has(url)) {
          const label = angleLabels[angleList.length - 1] || `Angle 0${angleList.length + 1}`;
          addAngle(url, label);
        }
      });
    }

    // 3. Fallback to product.gallery if present and extra photos weren't already added
    if (Array.isArray(product.gallery) && product.gallery.length > 0) {
      product.gallery.forEach((g, idx) => {
        const url = typeof g === 'string' ? g : g?.url;
        const label = typeof g === 'object' && g?.label ? g.label : undefined;
        addAngle(url, label);
      });
    }

    // 4. If still empty, use fallback
    if (angleList.length === 0) {
      return [{ label: 'Primary Silhouette', url: product.image_url || '/collections/if001.jpg' }];
    }

    return angleList;
  }, [product]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isPlayingTour, setIsPlayingTour] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Zoom / Magnifier state
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const activeAngle = angles[activeIndex] || angles[0];

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % angles.length);
  }, [angles.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + angles.length) % angles.length);
  }, [angles.length]);

  const selectAngle = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Auto-Tour 360 rotation timer
  useEffect(() => {
    if (!isPlayingTour) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3200);
    return () => clearInterval(timer);
  }, [isPlayingTour, handleNext]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!railRef.current) return;
    const activeThumb = railRef.current.children[activeIndex] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeIndex]);

  // Keyboard navigation for Fullscreen Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
        setIsPlayingTour(false);
      }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Handle Zoom Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const { left, top, width, height } = stageRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(((e.clientX - left) / width) * 100, 0), 100);
    const y = Math.min(Math.max(((e.clientY - top) / height) * 100, 0), 100);
    setZoomPos({ x, y });
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.97,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' as const },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.97,
      transition: { duration: 0.28, ease: 'easeIn' as const },
    }),
  };

  return (
    <div className="space-y-4 select-none">
      {/* ─── 1. Main Architectural Stage ─────────────────────────── */}
      <div
        ref={stageRef}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
        className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-b from-stone-100 to-stone-200/70 border border-stone-200/90 shadow-lg group cursor-crosshair"
      >
        {/* Animated Image View */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative w-full h-full"
          >
            <IconImage
              src={activeAngle.url}
              alt={`${product.name} - ${activeAngle.label}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* High-Resolution Magnifier Lens Overlay */}
        {isZooming && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-200"
            style={{
              backgroundImage: `url(${activeAngle.url})`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundSize: '240%',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Subtle Crosshair Guide */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-mono flex items-center gap-1.5 border border-white/15">
              <Eye className="w-3 h-3 text-[#869e32]" />
              <span>2.4x Macro Texture Zoom</span>
            </div>
          </div>
        )}

        {/* Top Badges Strip */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          {/* Status Pills */}
          <div className="flex items-center gap-2">
            {product.featured && (
              <span className="px-3.5 py-1 bg-[#1A1A1A] text-white text-[10px] uppercase font-bold tracking-widest rounded-full shadow-md">
                Featured Heirloom
              </span>
            )}
            {product.in_stock ? (
              <span className="px-3.5 py-1 bg-[#869e32] text-white text-[10px] uppercase font-bold tracking-widest rounded-full shadow-md">
                In Stock
              </span>
            ) : (
              <span className="px-3.5 py-1 bg-[#1A1A1A]/85 text-amber-200 text-[10px] uppercase font-bold tracking-widest rounded-full shadow-md">
                Made to Order
              </span>
            )}
          </div>

          {/* Interactive Tool Actions */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* 360° Auto-Tour Button */}
            <button
              onClick={() => setIsPlayingTour(!isPlayingTour)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                isPlayingTour
                  ? 'bg-[#869e32] text-white ring-2 ring-[#869e32]/40 animate-pulse'
                  : 'bg-white/85 hover:bg-white text-stone-800 backdrop-blur-md border border-stone-200/80 hover:text-[#869e32]'
              }`}
              title="Auto-Tour 360° Angles"
            >
              {isPlayingTour ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono">Tour Active</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono">360° Tour</span>
                </>
              )}
            </button>

            {/* Fullscreen Lightbox Button */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-2 rounded-full bg-white/85 hover:bg-white text-stone-800 backdrop-blur-md border border-stone-200/80 shadow-md hover:text-[#869e32] transition-all cursor-pointer"
              title="Fullscreen Editorial Lightbox"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating Left / Right Stage Chevrons */}
        <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <button
            onClick={handlePrev}
            className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1A1A1A] hover:text-[#869e32] shadow-lg border border-stone-200/70 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Previous perspective"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1A1A1A] hover:text-[#869e32] shadow-lg border border-stone-200/70 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Next perspective"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Angle Label Badge */}
        <div className="absolute bottom-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1A]/80 backdrop-blur-md text-white border border-white/15 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#869e32] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-300">
              Angle {activeIndex + 1}/{angles.length}
            </span>
            <span className="text-stone-400">•</span>
            <span className="text-xs font-serif italic text-white font-medium">
              {activeAngle.label}
            </span>
          </div>

          {/* Quick Compass Indicator */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-stone-700 text-[10px] font-mono border border-stone-200/80">
            <Compass className="w-3 h-3 text-[#869e32]" />
            <span>Multi-Angle Studio System</span>
          </div>
        </div>
      </div>

      {/* ─── 2. Smart Luxury Angle Rail (Thumbnail Track) ────────── */}
      <div className="relative">
        <div
          ref={railRef}
          className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 px-1 scrollbar-none snap-x"
        >
          {angles.map((angle, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={`${angle.label}-${idx}`}
                onClick={() => selectAngle(idx)}
                className={`relative group shrink-0 w-24 sm:w-28 aspect-4/3 rounded-2xl overflow-hidden border-2 transition-all duration-300 snap-center cursor-pointer ${
                  isActive
                    ? 'border-[#869e32] ring-4 ring-[#869e32]/20 shadow-md scale-102 bg-white'
                    : 'border-stone-200/80 hover:border-stone-400 bg-stone-100 opacity-70 hover:opacity-100'
                }`}
              >
                <IconImage
                  src={angle.url}
                  alt={angle.label}
                  fill
                  className="object-cover"
                  sizes="120px"
                />

                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Perspective Number Tag */}
                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white font-mono text-[9px] font-bold">
                  0{idx + 1}
                </div>

                {/* Active Indicator Dot */}
                {isActive && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#869e32] shadow-[0_0_8px_#869e32]" />
                )}

                {/* Angle Name on Thumbnail */}
                <div className="absolute bottom-1 inset-x-1 text-center">
                  <span className="text-[10px] text-white font-sans truncate block px-1 drop-shadow-xs">
                    {angle.label.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Rail Progress Track */}
        <div className="w-full h-1 bg-stone-200 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-full bg-[#869e32] rounded-full"
            initial={false}
            animate={{
              width: `${((activeIndex + 1) / angles.length) * 100}%`,
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* ─── 3. Fullscreen Editorial Lightbox Modal ───────────────── */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Top Lightbox Header */}
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#869e32] animate-pulse shadow-[0_0_10px_#869e32]" />
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-white font-medium">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-400 font-sans">
                    Perspective {activeIndex + 1} of {angles.length} • {activeAngle.label}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central High-Res Stage */}
            <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full max-w-5xl max-h-[75vh]"
                >
                  <IconImage
                    src={activeAngle.url}
                    alt={activeAngle.label}
                    fill
                    priority
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Lightbox Prev / Next Controls */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110 cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110 cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Lightbox Filmstrip Rail */}
            <div className="flex items-center justify-center gap-3 overflow-x-auto pt-4 border-t border-white/10">
              {angles.map((angle, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={`lb-${angle.label}-${idx}`}
                    onClick={() => selectAngle(idx)}
                    className={`relative shrink-0 w-20 sm:w-24 aspect-4/3 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#869e32] ring-2 ring-[#869e32]/40 scale-105'
                        : 'border-white/20 opacity-50 hover:opacity-90'
                    }`}
                  >
                    <IconImage
                      src={angle.url}
                      alt={angle.label}
                      fill
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

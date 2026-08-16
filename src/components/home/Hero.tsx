'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Sparkles, ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#FDFBF7] pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-between">
      {/* Background Soft Ambient Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-linear-to-tr from-amber-100/40 via-stone-200/50 to-emerald-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* 1. GIANT HEADLINE (as seen in inspo video: SAPFORCE.) */}
      <div className="relative w-full text-center z-10 pt-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-black text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] tracking-tighter text-stone-900 leading-none select-none uppercase"
        >
          Icon<span className="text-[#9A6B43]">furniture.</span>
        </motion.h1>
      </div>

      {/* 2. CENTRAL HERO SHOWCASE WITH ORBITAL 3D ELEMENTS */}
      <div className="relative max-w-7xl mx-auto w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN WIDGETS */}
          <div className="lg:col-span-3 space-y-8 flex flex-col justify-between z-20 order-2 lg:order-1">
            {/* Left Upper: Social Proof Avatar Stack */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-stone-200/80 shadow-lg max-w-xs space-y-2"
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Client"
                    width={32}
                    height={32}
                    className="inline-block rounded-full ring-2 ring-white object-cover"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Client"
                    width={32}
                    height={32}
                    className="inline-block rounded-full ring-2 ring-white object-cover"
                  />
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                    alt="Client"
                    width={32}
                    height={32}
                    className="inline-block rounded-full ring-2 ring-white object-cover"
                  />
                </div>
                <div className="flex items-center text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-serif text-lg font-bold text-stone-900 leading-tight">10k+ Homes</p>
                <p className="text-[11px] text-stone-500 font-sans">Curated worldwide active client sanctuaries</p>
              </div>
            </motion.div>

            {/* Left Lower: Descriptive Paragraph Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-3 max-w-xs"
            >
              <p className="text-stone-700 text-sm font-sans leading-relaxed font-normal">
                The architectural design software & heirloom craftsmanship that keeps your living spaces in effortless balance with AI tools and natural material graphics.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9A6B43] hover:underline"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* CENTER COLUMN: SCULPTURAL 3D HERO VISUAL & FLOATING RINGS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex justify-center items-center order-1 lg:order-2 my-6 lg:my-0"
          >
            {/* Animated Glowing Orbital Rings (matching inspo 3D ring aesthetic) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full border-2 border-dashed border-[#9A6B43]/30 pointer-events-none -z-10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] rounded-full border border-lime-400/40 pointer-events-none -z-10"
            />

            {/* Central Sculptural Furniture Piece Card */}
            <div className="relative w-full max-w-md aspect-4/5 rounded-3xl overflow-hidden shadow-2xl bg-stone-900 border-4 border-white/80 group">
              <Image
                src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=90"
                alt="Iconfurniture Aura Velvet Lounge Armchair"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-transparent" />
              
              {/* Overlay Glass Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#9A6B43] font-bold block">
                    Flagship Release
                  </span>
                  <h3 className="font-serif text-sm font-semibold text-stone-900">
                    Aura Velvet Lounge Armchair
                  </h3>
                  <p className="text-[11px] text-stone-500 font-sans">Italian Cotton & White Oak</p>
                </div>
                <span className="font-serif text-sm font-bold text-stone-900">$1,250</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN WIDGETS */}
          <div className="lg:col-span-3 space-y-8 flex flex-col justify-between items-start lg:items-end z-20 order-3">
            {/* Right Upper: Index List /01, /02, /03 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-stone-200/80 shadow-lg w-full max-w-xs space-y-3 text-right"
            >
              <div className="flex justify-between items-center pb-2 border-b border-stone-100 text-xs text-stone-600 font-sans">
                <span className="font-medium">Solid White Oak</span>
                <span className="font-mono text-[#9A6B43] font-semibold">/01</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-stone-100 text-xs text-stone-600 font-sans">
                <span className="font-medium">Bouclé & Velvet</span>
                <span className="font-mono text-[#9A6B43] font-semibold">/02</span>
              </div>
              <div className="flex justify-between items-center text-xs text-stone-600 font-sans">
                <span className="font-medium">Honed Travertine</span>
                <span className="font-mono text-[#9A6B43] font-semibold">/03</span>
              </div>
            </motion.div>

            {/* Right Lower: Interactive Floating Circular Action Button (as seen in inspo video) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-full max-w-xs flex justify-end"
            >
              <Link
                href="#story"
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#84cc16] hover:bg-[#a3e635] text-stone-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="w-7 h-7 rounded-full bg-stone-950 text-[#84cc16] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </span>
                <span>How it works?</span>
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

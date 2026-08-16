'use client';

import React, { useState } from 'react';
import { X, Play, Sparkles, Layers, Box, CheckCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface IconAtelierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IconAtelierModal({
  isOpen,
  onClose,
}: IconAtelierModalProps) {
  const [selectedWood, setSelectedWood] = useState('walnut');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#141210] border border-white/15 p-6 sm:p-8 shadow-2xl text-white overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4a373]/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#d4a373] text-stone-950 flex items-center justify-center font-black text-sm shadow-[0_0_12px_rgba(212,163,115,0.5)]">
              <Play className="w-4 h-4 fill-stone-950 ml-0.5" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">Icon Furniture Atelier</h3>
              <p className="text-xs text-stone-400">
                Generational woodwork, Italian travertine, and bespoke tailoring
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Atelier Preview Body */}
        <div className="mt-6 space-y-6">
          <div className="relative aspect-video rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-8 text-center group">
            <div className="w-16 h-16 rounded-full bg-[#d4a373] text-stone-950 flex items-center justify-center shadow-[0_0_24px_rgba(212,163,115,0.6)] group-hover:scale-110 transition-transform cursor-pointer">
              <Play className="w-7 h-7 fill-stone-950 ml-1" />
            </div>
            <p className="mt-4 font-serif text-base font-semibold text-stone-100">
              The Atelier Craftsmanship Documentary
            </p>
            <span className="text-xs text-stone-400 font-sans">
              Discover how our master woodworkers sculpt solid American Walnut and Italian stone
            </span>
          </div>

          {/* 3 Craftsmanship Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#d4a373] font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>01. Sustainable Wood</span>
              </div>
              <h4 className="font-serif font-semibold text-sm text-white">FSC-Certified Timbers</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-sans">
                Air-dried solid white oak and walnut hand-matched for continuous grain flow.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#d4a373] font-bold text-xs">
                <Layers className="w-4 h-4" />
                <span>02. Mortise & Tenon</span>
              </div>
              <h4 className="font-serif font-semibold text-sm text-white">Generational Joinery</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-sans">
                Interlocking solid wood joints engineered to endure for decades.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#d4a373] font-bold text-xs">
                <Box className="w-4 h-4" />
                <span>03. Tailored Finishes</span>
              </div>
              <h4 className="font-serif font-semibold text-sm text-white">Natural Hardwax Oils</h4>
              <p className="text-xs text-stone-400 leading-relaxed font-sans">
                VOC-free botanical wax oils that preserve the raw tactile touch of wood.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <ShieldCheck className="w-4 h-4 text-[#d4a373]" />
            <span>White Glove In-Home Delivery & Setup Included</span>
          </div>
          <Link
            href="/shop"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#d4a373] text-stone-950 font-bold text-xs hover:bg-[#c28e58] hover:shadow-[0_0_16px_rgba(212,163,115,0.5)] transition-all"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}

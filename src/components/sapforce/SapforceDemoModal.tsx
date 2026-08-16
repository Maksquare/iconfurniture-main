'use client';

import React from 'react';
import { X, Play, Sparkles, Layers, Cpu, CheckCircle } from 'lucide-react';

interface SapforceDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SapforceDemoModal({
  isOpen,
  onClose,
}: SapforceDemoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#111317] border border-white/15 p-6 sm:p-8 shadow-2xl text-white overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#9ef01a]/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-[#9ef01a] text-stone-950 flex items-center justify-center font-black text-sm shadow-[0_0_12px_rgba(158,240,26,0.5)]">
              <Play className="w-4 h-4 fill-stone-950 ml-0.5" />
            </span>
            <div>
              <h3 className="font-bold text-lg text-white">How SAPFORCE Works</h3>
              <p className="text-xs text-stone-400">
                Next-generation collaborative 3D & vector design workflow
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

        {/* Video / Interactive Feature Preview Body */}
        <div className="mt-6 space-y-6">
          <div className="relative aspect-video rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-8 text-center group">
            <div className="w-16 h-16 rounded-full bg-[#9ef01a] text-stone-950 flex items-center justify-center shadow-[0_0_24px_rgba(158,240,26,0.6)] group-hover:scale-110 transition-transform cursor-pointer">
              <Play className="w-7 h-7 fill-stone-950 ml-1" />
            </div>
            <p className="mt-4 text-sm font-semibold text-stone-200">
              Interactive Product Walkthrough
            </p>
            <span className="text-xs text-stone-400">
              Watch how AI generative tools speed up wireframing by 10x
            </span>
          </div>

          {/* 3 Key Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#9ef01a] font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Step 01</span>
              </div>
              <h4 className="font-semibold text-sm text-white">Prompt & Generate</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Describe your interface in natural language or choose from pre-made templates.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#9ef01a] font-bold text-xs">
                <Layers className="w-4 h-4" />
                <span>Step 02</span>
              </div>
              <h4 className="font-semibold text-sm text-white">Direct 3D & Vector</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Manipulate materials, lighting, typography, and vectors in real-time.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[#9ef01a] font-bold text-xs">
                <Cpu className="w-4 h-4" />
                <span>Step 03</span>
              </div>
              <h4 className="font-semibold text-sm text-white">Multiplayer Sync</h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Instant collaborative presence with granular permissions and code export.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <CheckCircle className="w-4 h-4 text-[#9ef01a]" />
            <span>No credit card required • 14-day free trial</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#9ef01a] text-stone-950 font-bold text-xs hover:shadow-[0_0_16px_rgba(158,240,26,0.5)] transition-all"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
}

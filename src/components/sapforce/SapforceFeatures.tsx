'use client';

import React, { useState } from 'react';
import {
  Users,
  FileText,
  LayoutGrid,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  Sliders,
  Copy,
  RefreshCw,
  ArrowUpRight,
} from 'lucide-react';

interface FeatureItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  tag: string;
}

const features: FeatureItem[] = [
  {
    id: 'collaboration',
    icon: Users,
    title: 'Realtime Collaboration',
    description:
      'Work with your team in real-time and set individual permissions.',
    tag: 'Multiplayer 2.0',
  },
  {
    id: 'text-gen',
    icon: FileText,
    title: 'Text Generator',
    description: 'Generate placeholder texts for your interfaces.',
    tag: 'LLM Powered',
  },
  {
    id: 'templates',
    icon: LayoutGrid,
    title: 'Templates Library',
    description:
      'A repository of scenes, templates, and objects ready to use.',
    tag: '1,400+ Ready Kits',
  },
  {
    id: 'avatar-gen',
    icon: ImageIcon,
    title: 'Avatar Generator',
    description:
      'Instantly create user avatars for contact lists, testimonials, etc.',
    tag: 'High-Res Synthetics',
  },
];

export default function SapforceFeatures() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  return (
    <section className="relative w-full min-h-screen bg-[#0d0f12] text-white py-24 px-6 sm:px-10 flex flex-col justify-center items-center select-none overflow-hidden transition-colors duration-700">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#9ef01a]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Main Headline with Neon Lime Capsule */}
        <div className="text-center mb-16 sm:mb-20 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl md:text-[54px] font-black tracking-tight leading-[1.15] text-white">
            All the must haves of a{' '}
            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#9ef01a] text-stone-950 font-black tracking-tight text-3xl sm:text-5xl md:text-[50px] shadow-[0_0_24px_rgba(158,240,26,0.4)] my-1 align-middle">
              design app.
            </span>
          </h2>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isHovered = activeCard === feature.id;

            return (
              <div
                key={feature.id}
                onMouseEnter={() => setActiveCard(feature.id)}
                onMouseLeave={() => setActiveCard(null)}
                className={`group relative rounded-3xl p-7 flex flex-col justify-between min-h-[340px] transition-all duration-500 border ${
                  isHovered
                    ? 'bg-[#181a1f] border-[#9ef01a]/50 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(158,240,26,0.15)] -translate-y-2'
                    : 'bg-[#131519] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Top Section: Lime Icon Box & Tag */}
                <div className="flex items-start justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-[#9ef01a] text-stone-950 flex items-center justify-center shadow-[0_4px_16px_rgba(158,240,26,0.35)] transition-transform duration-300 group-hover:scale-105">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    {feature.tag}
                  </span>
                </div>

                {/* Bottom Section: Title & Description */}
                <div className="mt-8 flex flex-col gap-2.5">
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#9ef01a] transition-colors flex items-center justify-between">
                    <span>{feature.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#9ef01a]" />
                  </h3>
                  <p className="text-sm font-normal text-stone-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Interactive bottom bar shine */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1.5 text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9ef01a]" />
                    Ready out of box
                  </span>
                  <span className="font-mono text-stone-500">0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Interactive Playground Strip */}
        <div className="w-full mt-12 p-6 rounded-3xl bg-[#14161b] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#9ef01a]/20 border border-[#9ef01a]/40 flex items-center justify-center text-[#9ef01a]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Interactive Smart Studio Engine
              </div>
              <div className="text-xs text-stone-400">
                Experience ultra-low latency canvas rendering with built-in neural assets
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                setCopiedText(true);
                setTimeout(() => setCopiedText(false), 2000);
              }}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-stone-200 transition-colors flex items-center justify-center gap-2 border border-white/5"
            >
              <Copy className="w-3.5 h-3.5 text-[#9ef01a]" />
              <span>{copiedText ? 'Copied Prompt!' : 'Copy AI Prompt'}</span>
            </button>
            <button className="flex-1 md:flex-initial px-5 py-2.5 rounded-full bg-[#9ef01a] text-stone-950 text-xs font-bold transition-all hover:shadow-[0_0_20px_rgba(158,240,26,0.5)]">
              Launch Studio Canvas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

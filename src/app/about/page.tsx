'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  TreePine,
  Layers,
  Star,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import {
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
  TikTokIcon,
  OFFICIAL_CONTACTS,
} from '@/components/common/ProductContactChannels';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'materials' | 'craft' | 'sustainability'>('philosophy');

  const pillars = [
    {
      icon: Compass,
      number: '01',
      title: 'Architectural Geometry',
      desc: 'Every silhouette begins with structural discipline. We balance bold geometric mass with gentle organic curves to anchor living spaces with quiet authority.',
      material: 'Proportion & Negative Space',
    },
    {
      icon: Layers,
      number: '02',
      title: 'Living Tactility',
      desc: 'We work exclusively with unadulterated natural materials—solid American walnut, French looped bouclé, honed Roman travertine, and brushed solid brass.',
      material: 'Natural Grain & Honed Stone',
    },
    {
      icon: ShieldCheck,
      number: '03',
      title: 'Mortise & Tenon Joinery',
      desc: 'Constructed by master woodworkers using centuries-old blind joinery without artificial fasteners. Engineered to breathe, expand, and age gracefully across decades.',
      material: '10-Year Joinery Guarantee',
    },
    {
      icon: TreePine,
      number: '04',
      title: 'Conscious Permanence',
      desc: 'We reject transient, fast-furniture cycles. Sourced from certified renewable European and North American forestry estates with zero waste manufacturing.',
      material: 'FSC-Certified Hardwoods',
    },
  ];

  const processSteps = [
    {
      step: '01',
      phase: 'Lumber & Quarry Selection',
      desc: 'Each tree slab and travertine block is individually inspected for grain continuity, moisture stability, and unique tactile character before entering our drying kilns.',
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=85',
    },
    {
      step: '02',
      phase: 'Sculptural Milling',
      desc: 'Primary forms are cut using high-precision 5-axis tooling, followed immediately by artisan hand-planing to achieve seamless compound radiuses.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=85',
    },
    {
      step: '03',
      phase: 'Artisan Hand Joinery',
      desc: 'Mortise-and-tenon joints are hand-fitted, glued with natural non-toxic resins, and clamped with bespoke jigs to guarantee seamless structural integrity.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=85',
    },
    {
      step: '04',
      phase: 'Organic Oil & Waxing',
      desc: 'Triple-hand-buffed with organic linseed and beeswax finishes that nourish the wood fibers and cultivate a deep, luminous heirloom patina over time.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85',
    },
  ];

  const stats = [
    { value: '15k+', label: 'Bespoke Living Spaces Crafted' },
    { value: '100%', label: 'Solid Certified Hardwood' },
    { value: '10-Yr', label: 'Master Joinery Warranty' },
    { value: '1:1', label: 'Dedicated Atelier Concierge' },
  ];

  return (
    <div className="bg-[#FDFBF7] text-stone-900 min-h-screen">
      
      {/* ─── 1. Editorial Hero Header ─────────────────────────────── */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
        {/* Ambient Blur Gradient */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#d4a373]/12 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            {/* Monograph Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200/80 shadow-xs text-xs font-bold uppercase tracking-widest text-[#9A6B43]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Atelier Monograph & Heritage</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-stone-900 tracking-tight leading-[1.08]"
            >
              Sculpted For Permanence. <br />
              <span className="italic font-normal text-[#9A6B43]">Designed For The Senses.</span>
            </motion.h1>

            {/* Intro Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-stone-600 text-base sm:text-lg font-sans leading-relaxed max-w-2xl mx-auto"
            >
              Icon Furniture was established on a singular premise: that the objects in our homes should instill quiet clarity, celebrate natural materiality, and outlive the ephemeral trends of modern mass production.
            </motion.p>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#9A6B43] text-white text-xs uppercase tracking-widest font-semibold shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 text-xs uppercase tracking-widest font-semibold border border-stone-200/80 shadow-xs hover:border-[#9A6B43] transition-all duration-300"
              >
                <span>Private Consultation</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. Editorial Dual-Image & Manifesto Story ────────────── */}
      <section className="py-16 sm:py-24 border-y border-stone-200/70 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Asymmetric Gallery Showcase */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-6 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-3/4 rounded-3xl overflow-hidden shadow-xl bg-stone-200 border border-stone-200/60 group"
              >
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85"
                  alt="Bouclé Armchair Craftsmanship"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white text-xs font-serif italic">Artisanal bouclé stitching</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative aspect-3/4 rounded-3xl overflow-hidden shadow-xl bg-stone-200 border border-stone-200/60 mt-8 sm:mt-12 group"
              >
                <Image
                  src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=900&q=85"
                  alt="Architectural Material Details"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white text-xs font-serif italic">Honed Roman travertine</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Narrative & Manifesto */}
            <div className="lg:col-span-6 space-y-6 lg:pl-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#9A6B43]">
                Our Architectural Philosophy
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 leading-tight">
                Where Pure Architectural Form Meets Tactile Warmth.
              </h2>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
                Every piece in our catalog is engineered like a micro-architectural pavilion. We look at the interplay of gravity, proportion, and shadow before selecting the wood grain that completes its narrative.
              </p>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
                We believe that true luxury is tactile. It is felt when resting your palm against the hand-sculpted curve of an armrest, or running your fingers over the cool, natural veining of unpolished travertine stone.
              </p>

              {/* Editorial Quote Card */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3 relative overflow-hidden">
                <div className="w-1.5 h-full bg-[#9A6B43] absolute left-0 top-0" />
                <p className="font-serif italic text-stone-800 text-sm sm:text-base leading-relaxed">
                  &ldquo;We don&apos;t design objects to merely occupy space. We sculpt permanent heirlooms that anchor moments of restful pause and human connection.&rdquo;
                </p>
                <div className="flex items-center justify-between text-xs text-[#9A6B43] font-bold uppercase tracking-wider pt-2 border-t border-stone-100">
                  <span>Julian Vance</span>
                  <span className="text-stone-400 font-sans font-medium">Head of Atelier Design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Four Core Pillars ─────────────────────────────────── */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-[#9A6B43]">
            Uncompromising Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900">
            The Four Tenets of Icon Craft
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-sans max-w-xl mx-auto leading-relaxed">
            Four guiding principles that govern every sketch, joint, fabric swatch, and bespoke commission we accept.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-white p-8 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-[#9A6B43]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#F4EFE6] text-[#9A6B43] flex items-center justify-center group-hover:bg-[#9A6B43] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6 stroke-1.5" />
                    </div>
                    <span className="font-mono text-xs text-stone-400 font-bold">
                      /{pillar.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-stone-900 group-hover:text-[#9A6B43] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-[11px] font-semibold text-[#9A6B43] uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{pillar.material}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── 4. The 4-Phase Craftsmanship Journey ─────────────────── */}
      <section className="py-20 sm:py-28 bg-[#171513] text-white border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#d4a373]">
              The Atelier Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
              From Raw Timber Slab to Living Heirloom
            </h2>
            <p className="text-stone-400 text-sm sm:text-base font-sans leading-relaxed">
              Every curve is shaped by hand. Every mortise joint is measured to sub-millimeter tolerances. Take a look inside our meticulous four-phase production lifecycle.
            </p>
          </div>

          {/* Process Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="space-y-4 group"
              >
                {/* Image card */}
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-900 border border-white/10 shadow-lg">
                  <Image
                    src={item.image}
                    alt={item.phase}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs text-[#d4a373] font-mono text-xs font-bold border border-white/10">
                    Phase {item.step}
                  </div>
                </div>

                <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#d4a373] transition-colors">
                  {item.phase}
                </h3>

                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. Atelier Key Metrics ───────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F2EDE4] border-y border-stone-300/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-stone-300/80">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="pt-6 sm:pt-0 sm:px-6 space-y-2"
              >
                <div className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-stone-600 uppercase tracking-wider font-sans">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Direct Concierge Channels & Final CTA ─────────────── */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#1C1917] via-[#24211e] to-[#12100e] text-white border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4a373]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#d4a373]">
                Collaborate With Our Designers
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
                Ready to Commission Your Next Statement Piece?
              </h2>
              <p className="text-stone-300 text-sm sm:text-base font-sans leading-relaxed max-w-2xl">
                Whether you are an architect detailing a full residence or an individual collector seeking custom wood stains and proportions, our master concierge is available across all direct channels.
              </p>

              {/* Instant Social Channels Strip */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href={OFFICIAL_CONTACTS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white transition-all"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                  <span>{OFFICIAL_CONTACTS.instagram.handle}</span>
                </a>
                <a
                  href={OFFICIAL_CONTACTS.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white transition-all"
                >
                  <FacebookIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>{OFFICIAL_CONTACTS.facebook.handle}</span>
                </a>
                <a
                  href={OFFICIAL_CONTACTS.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white transition-all"
                >
                  <TelegramIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>{OFFICIAL_CONTACTS.telegram.handle}</span>
                </a>
                <a
                  href={OFFICIAL_CONTACTS.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white transition-all"
                >
                  <TikTokIcon className="w-3.5 h-3.5 text-white" />
                  <span>{OFFICIAL_CONTACTS.tiktok.handle}</span>
                </a>
                <a
                  href={OFFICIAL_CONTACTS.phonePrimary.tel}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4a373] hover:bg-[#c28e58] text-stone-950 font-bold text-xs transition-all shadow-md"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{OFFICIAL_CONTACTS.phonePrimary.display}</span>
                </a>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                href="/shop"
                className="w-full text-center px-6 py-4 rounded-2xl bg-white text-stone-900 font-bold text-xs uppercase tracking-widest hover:bg-[#d4a373] hover:text-stone-950 transition-all shadow-lg"
              >
                Browse Living Collection →
              </Link>
              <Link
                href="/contact"
                className="w-full text-center px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs uppercase tracking-widest transition-all"
              >
                Inquire With Atelier
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

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
  Award,
} from 'lucide-react';
import {
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
  TikTokIcon,
  OFFICIAL_CONTACTS,
} from '@/components/common/ProductContactChannels';
import IconImage from '@/components/common/IconImage';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'materials' | 'craft' | 'sustainability'>('philosophy');

  const pillars = [
    {
      icon: Compass,
      number: '01',
      title: 'Architectural Scale & Proportion',
      desc: 'Every dining table begins with structural discipline. We calculate optimal legroom clearance, overhang ratios, and spatial balance for 6 to 18 seated guests.',
      material: 'Ergonomic Clearance & Flow',
    },
    {
      icon: Layers,
      number: '02',
      title: 'Continuous Wood Grain',
      desc: 'We work exclusively with unadulterated natural materials—solid American walnut slabs, quarter-sawn white oak, and hand-honed Roman travertine monoliths.',
      material: 'Old-Growth Kiln-Dried Hardwoods',
    },
    {
      icon: ShieldCheck,
      number: '03',
      title: 'Sub-Millimeter Table Joinery',
      desc: 'Constructed by master woodcrafters using centuries-old blind mortise-and-tenon and butterfly joints. Engineered to breathe, expand, and age gracefully across decades.',
      material: 'Generational Joinery Guarantee',
    },
    {
      icon: TreePine,
      number: '04',
      title: 'Spill & Heat Resilience',
      desc: 'Finished with multi-coat organic botanical hardwax oils that protect against wine and dining spills while celebrating the natural tactile warmth of solid timber.',
      material: 'Zero-VOC Botanical Hardwax',
    },
  ];

  const processSteps = [
    {
      step: '01',
      phase: 'Lumber & Quarry Selection',
      desc: 'Each tree slab and travertine block is individually inspected for grain continuity, moisture stability, and unique tactile character before entering our drying kilns.',
      image: '/collections/if018.jpg',
    },
    {
      step: '02',
      phase: 'Sculptural Milling',
      desc: 'Primary forms are cut using high-precision 5-axis tooling, followed immediately by artisan hand-planing to achieve seamless compound radiuses.',
      image: '/collections/if006.jpg',
    },
    {
      step: '03',
      phase: 'Artisan Hand Joinery',
      desc: 'Mortise-and-tenon joints are hand-fitted, glued with natural non-toxic resins, and clamped with bespoke jigs to guarantee seamless structural integrity.',
      image: '/collections/if031.jpg',
    },
    {
      step: '04',
      phase: 'Organic Oil & Waxing',
      desc: 'Triple-hand-buffed with organic linseed and beeswax finishes that nourish the wood fibers and cultivate a deep, luminous heirloom patina over time.',
      image: '/collections/if007.jpg',
    },
  ];

  const stats = [
    { value: '15k+', label: 'Bespoke Living Spaces Crafted' },
    { value: '100%', label: 'Solid Certified Hardwood' },
    { value: '10-Yr', label: 'Master Joinery Warranty' },
    { value: '1:1', label: 'Dedicated Atelier Concierge' },
  ];

  return (
    <div className="bg-[#FDFCF7] text-[#1A1A1A] min-h-screen">
      
      {/* ─── 1. Editorial Hero Header ─────────────────────────────── */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
        {/* Ambient Blur Gradient */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#869e32]/12 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            {/* Official Brand Logo + Monograph Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-3 flex-wrap"
            >
              <div className="bg-white px-4 py-1.5 rounded-full border border-stone-200/80 shadow-2xs">
                <Image
                  src="/assets/iconfurniture-logo.png"
                  alt="Icon Furniture"
                  width={120}
                  height={32}
                  className="h-6 w-auto object-contain"
                  priority
                />
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200/80 shadow-2xs text-xs font-bold uppercase tracking-widest text-[#869e32]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Atelier Monograph & Heritage</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#1A1A1A] tracking-tight leading-[1.08]"
            >
              Sculpted For Permanence. <br />
              <span className="italic font-normal text-[#869e32]">Designed For The Senses.</span>
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
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#869e32] text-white text-xs uppercase tracking-widest font-semibold shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 text-xs uppercase tracking-widest font-semibold border border-stone-200/80 shadow-xs hover:border-[#869e32] transition-all duration-300"
              >
                <span>Private Consultation</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. Founder & Visionary Spotlight (High-End Editorial Showcase) ─── */}
      <section className="py-20 sm:py-28 bg-[#1A1A1A] text-white border-y border-white/10 relative overflow-hidden">
        {/* Ambient Radial Lighting */}
        <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-[#869e32]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-[#869e32]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Founder's Framed High-End Editorial Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              {/* Outer Luxury Architectural Glow Frame */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-br from-white/20 via-white/5 to-white/15 border border-white/20 shadow-2xl backdrop-blur-md">
                
                {/* Inner Image Container with High-Res Founder Portrait */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-950 shadow-inner group">
                  <Image
                    src="/about/Founder.jpg"
                    alt="Founder of Icon Furniture"
                    fill
                    priority
                    className="object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                  {/* Floating Luxury Founder Hallmark Badge */}
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-[#869e32]">
                        Founder & Creative Director
                      </div>
                      <div className="font-serif text-base font-semibold text-white">
                        Icon Furniture Design House
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#869e32] text-white flex items-center justify-center shadow-[0_0_16px_rgba(18, 73, 3,0.6)]">
                      <Sparkles className="w-4 h-4 stroke-[2]" />
                    </div>
                  </div>
                </div>

                {/* Subtle Geometric Corner Accents */}
                <span className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#869e32]" />
                <span className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#869e32]" />
                <span className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#869e32]" />
                <span className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#869e32]" />
              </div>

              {/* Floating Quality Badge Behind/Side */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hidden sm:flex absolute -bottom-6 -left-6 bg-[#869e32] text-white px-5 py-3 rounded-2xl shadow-xl border border-white/20 items-center gap-3"
              >
                <Award className="w-6 h-6 text-white shrink-0" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-white/90">Ethically Handcrafted</div>
                  <div className="text-xs font-bold text-white">Master Artisanal Standard</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Founder's Story, Vision & Manifesto */}
            <div className="lg:col-span-7 space-y-6 lg:pl-4">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-widest text-[#869e32]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Visionary Monograph</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                  &ldquo;The Dining Table is the Hearth, <br />
                  <span className="italic text-[#869e32]">Where Families Truly Gather.&rdquo;</span>
                </h2>
              </div>

              <p className="text-stone-300 text-sm sm:text-base font-sans leading-relaxed">
                When Icon Furniture was founded, our mission was simple: to focus 100% on making the best luxury dining tables—the centerpiece of your home where family gatherings, meals, and memories happen.
              </p>

              <p className="text-stone-300 text-sm sm:text-base font-sans leading-relaxed">
                Every dining table made in our workshop is crafted from solid natural woods and natural stone with safe, durable finishes designed to last for generations.
              </p>

              {/* Founder's 3 Core Commitments */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 hover:border-[#869e32]/60 transition-colors">
                  <div className="text-xs font-bold text-[#869e32] font-mono">01. Precision</div>
                  <div className="font-serif text-sm font-semibold text-white">Sub-Millimeter Joinery</div>
                  <div className="text-[11px] text-stone-400 font-sans">Mortise-and-tenon table joinery engineered for generational structural stability.</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 hover:border-[#869e32]/60 transition-colors">
                  <div className="text-xs font-bold text-[#869e32] font-mono">02. Purity</div>
                  <div className="font-serif text-sm font-semibold text-white">100% Solid Hardwood</div>
                  <div className="text-[11px] text-stone-400 font-sans">Certified renewable timber slabs finished with stain- & heat-resilient wax.</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 hover:border-[#869e32]/60 transition-colors">
                  <div className="text-xs font-bold text-[#869e32] font-mono">03. Customization</div>
                  <div className="font-serif text-sm font-semibold text-white">Bespoke Dimensions</div>
                  <div className="text-[11px] text-stone-400 font-sans">6 to 18 seater lengths, custom timber species, and edge chamfers.</div>
                </div>
              </div>

              {/* Founder Signature & Contact Link */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="font-serif font-bold text-lg text-white">Icon Furniture Founder & Atelier</div>
                  <div className="text-xs text-stone-400 font-sans">Addis Ababa, Ethiopia • Available via Telegram & Direct Concierge</div>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#869e32] hover:bg-[#0e3802] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-xl hover:scale-102"
                >
                  <span>Private Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. Editorial Dual-Image & Manifesto Story ────────────── */}
      <section className="py-16 sm:py-24 border-y border-stone-200/70 bg-[#f7f6f0]">
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
                <IconImage
                  src="/collections/if011.jpg"
                  alt="Solid Wood Dining Table Craftsmanship"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white text-xs font-serif italic">Handcrafted solid wood joinery</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative aspect-3/4 rounded-3xl overflow-hidden shadow-xl bg-stone-200 border border-stone-200/60 mt-8 sm:mt-12 group"
              >
                <IconImage
                  src="/collections/if035.jpg"
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
              <span className="text-xs uppercase tracking-widest font-bold text-[#869e32]">
                Our Architectural Philosophy
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] leading-tight">
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
                <div className="w-1.5 h-full bg-[#869e32] absolute left-0 top-0" />
                <p className="font-serif italic text-stone-800 text-sm sm:text-base leading-relaxed">
                  &ldquo;We don&apos;t design objects to merely occupy space. We sculpt permanent heirlooms that anchor moments of restful pause and human connection.&rdquo;
                </p>
                <div className="flex items-center justify-between text-xs text-[#869e32] font-bold uppercase tracking-wider pt-2 border-t border-stone-100">
                  <span>Icon Furniture Atelier</span>
                  <span className="text-stone-400 font-sans font-medium">Head of Design Guild</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Four Core Pillars ─────────────────────────────────── */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-[#869e32]">
            Uncompromising Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A]">
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
                className="group bg-white p-8 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-[#869e32]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#869e32]/10 text-[#869e32] flex items-center justify-center group-hover:bg-[#869e32] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6 stroke-1.5" />
                    </div>
                    <span className="font-mono text-xs text-stone-400 font-bold">
                      /{pillar.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#1A1A1A] group-hover:text-[#869e32] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-[11px] font-semibold text-[#869e32] uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{pillar.material}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── 5. The 4-Phase Craftsmanship Journey ─────────────────── */}
      <section className="py-20 sm:py-28 bg-[#1A1A1A] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#869e32]">
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
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs text-[#869e32] font-mono text-xs font-bold border border-white/10">
                    Phase {item.step}
                  </div>
                </div>

                <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#869e32] transition-colors">
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

      {/* ─── 6. Atelier Key Metrics ───────────────────────────────── */}
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
                <div className="font-serif text-4xl sm:text-5xl font-bold text-[#1A1A1A] tracking-tight">
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

      {/* ─── 7. Direct Concierge Channels & Final CTA ─────────────── */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#1A1A1A] via-[#222222] to-[#141414] text-white border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#869e32]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#869e32]">
                Talk to Our Team
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
                Ready to Order Your Custom Dining Table?
              </h2>
              <p className="text-stone-300 text-sm sm:text-base font-sans leading-relaxed max-w-2xl">
                Whether you need a dining table for your home or a large custom table for a special project, our team is ready to assist you directly by phone, Telegram, or message.
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
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#869e32] hover:bg-[#0e3802] text-white font-bold text-xs transition-all shadow-md"
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
                className="w-full text-center px-6 py-4 rounded-2xl bg-[#869e32] hover:bg-[#0e3802] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg"
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

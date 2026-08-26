'use client';

import React from 'react';
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
  Phone,
  CheckCircle2,
  Award,
  HeartHandshake,
  DollarSign,
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
  const pillars = [
    {
      icon: Compass,
      number: '01',
      title: 'Specialized Table Ergonomics',
      desc: 'By focusing exclusively on dining tables, we have perfected legroom clearance, elbow spacing, and structural balance for 4 to 18 seated guests.',
      material: 'Engineered For Real Living',
    },
    {
      icon: Layers,
      number: '02',
      title: '100% Solid Wood & Resin Craft',
      desc: 'We use genuine solid hardwoods—kiln-dried walnut, oak, and rich mahogany paired with crystal-clear resin epoxy. No weak particle boards or hollow veneers.',
      material: 'Real Solid Timber & Epoxy',
    },
    {
      icon: DollarSign,
      number: '03',
      title: 'Direct-Workshop Affordability',
      desc: 'By designing and building directly in our own workshop, we eliminate distributor margins and retail markups—delivering high-end luxury at honest, accessible prices.',
      material: 'Zero Middleman Markups',
    },
    {
      icon: TreePine,
      number: '04',
      title: 'Spill & Daily Life Resilience',
      desc: 'Every tabletop is treated with food-safe botanical sealants and scratch-resistant finishes that handle hot plates, wine spills, and active family life with ease.',
      material: 'Family-Safe Protective Finish',
    },
  ];

  const processSteps = [
    {
      step: '01',
      phase: 'Slab & Timber Selection',
      desc: 'Each solid wood slab is inspected for natural grain character, structural density, and moisture stability before shaping.',
      image: '/collections/if018.jpg',
    },
    {
      step: '02',
      phase: 'Precision Shaping & Epoxy Cast',
      desc: 'Live edges are sculpted with precision, and clear or tinted epoxy is poured seamlessly to lock in natural wood beauty forever.',
      image: '/collections/if006.jpg',
    },
    {
      step: '03',
      phase: 'Artisan Joinery & Framing',
      desc: 'Master woodworkers reinforce every leg and joint using reinforced mortise-and-tenon connections engineered to withstand decades of daily use.',
      image: '/collections/if031.jpg',
    },
    {
      step: '04',
      phase: 'Protective Finishing & Buffing',
      desc: 'Hand-buffed with durable, eco-friendly sealants that enrich the natural wood warmth and protect against daily dining spills.',
      image: '/collections/if007.jpg',
    },
  ];

  const stats = [
    { value: '21k+', label: 'Dining Tables Crafted' },
    { value: '3+ Yrs', label: 'Years of Dedicated Experience' },
    { value: '100%', label: 'Solid Wood & Quality Resin' },
    { value: 'Direct', label: 'Affordable Workshop Pricing' },
  ];

  return (
    <div className="bg-[#FDFCF7] text-[#1A1A1A] min-h-screen">
      
      {/* ─── 1. Editorial Hero Header ─────────────────────────────── */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
        {/* Ambient Blur Gradient */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#869e32]/12 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            {/* Official Brand Logo + Purpose Badge */}
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
                <span>Our Singular Specialization</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#1A1A1A] tracking-tight leading-[1.08]"
            >
              Crafted For Generations. <br />
              <span className="italic font-normal text-[#869e32]">Priced For Real Living.</span>
            </motion.h1>

            {/* Intro Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-stone-600 text-base sm:text-lg font-sans leading-relaxed max-w-2xl mx-auto"
            >
              At Icon Furniture, we made a deliberate commitment: to specialize exclusively in dining tables. By focusing 100% on this central piece of the home, we design and craft new, high-quality, and timeless dining tables that are truly affordable for every family.
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
                <span>Explore Dining Tables</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 text-xs uppercase tracking-widest font-semibold border border-stone-200/80 shadow-xs hover:border-[#869e32] transition-all duration-300"
              >
                <span>Custom Order Inquiry</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. The Specialization Manifesto (Atelier Craft Showcase) ─── */}
      <section className="py-20 sm:py-28 bg-[#1A1A1A] text-white border-y border-white/10 relative overflow-hidden">
        {/* Ambient Radial Lighting */}
        <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-[#869e32]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-[#869e32]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Master Table Craft Visual Showcase (Replaced CEO Photo) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              {/* Outer Luxury Architectural Glow Frame */}
              <div className="relative rounded-3xl p-3 bg-gradient-to-br from-white/20 via-white/5 to-white/15 border border-white/20 shadow-2xl backdrop-blur-md">
                
                {/* Inner Image Container with Real Master Dining Table Showcase */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-950 shadow-inner group">
                  <Image
                    src="/collections/if011.jpg"
                    alt="Icon Furniture Master Dining Table Craft"
                    fill
                    priority
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Floating Luxury Workshop Hallmark Badge */}
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-[#869e32]">
                        100% Dedicated Craft
                      </div>
                      <div className="font-serif text-base font-semibold text-white">
                        Specialized Dining Table Workshop
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

              {/* Floating Value Proposition Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hidden sm:flex absolute -bottom-6 -left-6 bg-[#869e32] text-white px-5 py-3 rounded-2xl shadow-xl border border-white/20 items-center gap-3"
              >
                <HeartHandshake className="w-6 h-6 text-white shrink-0" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-white/90">Direct From Workshop</div>
                  <div className="text-xs font-bold text-white">Affordable Heirloom Luxury</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: The Specialization Story & Vision */}
            <div className="lg:col-span-7 space-y-6 lg:pl-4">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-widest text-[#869e32]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Why Dining Tables?</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                  &ldquo;The Dining Table is the Heart, <br />
                  <span className="italic text-[#869e32]">Where Life and Memories Unfold.&rdquo;</span>
                </h2>
              </div>

              <p className="text-stone-300 text-sm sm:text-base font-sans leading-relaxed">
                Most furniture brands try to build everything—sofas, beds, cabinets, and decor. At Icon Furniture, we chose the opposite path: we pour all of our energy, creativity, and craftsmanship into **mastering the dining table**.
              </p>

              <p className="text-stone-300 text-sm sm:text-base font-sans leading-relaxed">
                We believe everyone deserves a dining table that is durable, stylish, and timeless—without having to pay inflated retail prices. By building directly in our workshop, we deliver solid wood and epoxy tables that last generations at prices that make sense for real families.
              </p>

              {/* 3 Core Specialization Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 hover:border-[#869e32]/60 transition-colors">
                  <div className="text-xs font-bold text-[#869e32] font-mono">01. Focused Craft</div>
                  <div className="font-serif text-sm font-semibold text-white">100% Dining Tables</div>
                  <div className="text-[11px] text-stone-400 font-sans">Every joinery angle, edge chamfer, and leg clearance is optimized for dining comfort.</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 hover:border-[#869e32]/60 transition-colors">
                  <div className="text-xs font-bold text-[#869e32] font-mono">02. Solid Quality</div>
                  <div className="font-serif text-sm font-semibold text-white">Real Wood & Epoxy</div>
                  <div className="text-[11px] text-stone-400 font-sans">Kiln-dried hardwoods and food-safe resin finishes built to resist scratches and heat.</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 hover:border-[#869e32]/60 transition-colors">
                  <div className="text-xs font-bold text-[#869e32] font-mono">03. Real Value</div>
                  <div className="font-serif text-sm font-semibold text-white">Honest Pricing</div>
                  <div className="text-[11px] text-stone-400 font-sans">Direct from the workshop floor to your dining room with zero retail markups.</div>
                </div>
              </div>

              {/* Action Link Strip */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="font-serif font-bold text-lg text-white">Icon Furniture Workshop Guild</div>
                  <div className="text-xs text-stone-400 font-sans">Bole Bulbula, Addis Ababa • Direct Orders & Custom Commissions</div>
                </div>

                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#869e32] hover:bg-[#738827] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-xl hover:scale-102"
                >
                  <span>View Dining Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. Design Philosophy & Gallery Showcase ─────────────── */}
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
                  src="/collections/if018.jpg"
                  alt="Solid Wood Dining Table Craftsmanship"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white text-xs font-serif italic">Handcrafted solid natural timber</span>
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
                  alt="Epoxy & Wood River Table Details"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white text-xs font-serif italic">Seamless crystal-clear resin epoxy</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Narrative & Manifesto */}
            <div className="lg:col-span-6 space-y-6 lg:pl-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#869e32]">
                Timeless Modern Design
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] leading-tight">
                New, Elegant Designs Built For Real Everyday Family Living.
              </h2>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
                We believe great design shouldn&apos;t be delicate or out of reach. Our tables are designed to look breathtaking on day one, and grow even more charming after thousands of shared family breakfasts, dinner parties, and late-night talks.
              </p>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
                By combining solid hardwoods, epoxy resin rivers, and modern geometric leg profiles, we craft timeless tables that elevate any dining space without ever going out of style.
              </p>

              {/* Editorial Quote Card */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3 relative overflow-hidden">
                <div className="w-1.5 h-full bg-[#869e32] absolute left-0 top-0" />
                <p className="font-serif italic text-stone-800 text-sm sm:text-base leading-relaxed">
                  &ldquo;A great dining table doesn&apos;t just fill a room — it creates a welcoming reason for families to sit together, connect, and celebrate life.&rdquo;
                </p>
                <div className="flex items-center justify-between text-xs text-[#869e32] font-bold uppercase tracking-wider pt-2 border-t border-stone-100">
                  <span>Icon Furniture Workshop</span>
                  <span className="text-stone-400 font-sans font-medium">Addis Ababa Atelier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Four Core Pillars of Icon Dining Tables ───────────── */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest font-bold text-[#869e32]">
            Our Uncompromising Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A]">
            The 4 Pillars of Icon Dining Tables
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-sans max-w-xl mx-auto leading-relaxed">
            Every table we design and build follows four core principles: ergonomic comfort, authentic materials, honest pricing, and daily durability.
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
              The Production Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
              From Raw Timber to Your Family Dining Room
            </h2>
            <p className="text-stone-400 text-sm sm:text-base font-sans leading-relaxed">
              Every table is hand-shaped, sanded, and finished inside our local workshop. Take a look at how we build dining tables designed to last for generations.
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

      {/* ─── 6. Key Metrics ───────────────────────────────────────── */}
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

      {/* ─── 7. Direct Channels & Final CTA ───────────────────────── */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-[#1A1A1A] via-[#222222] to-[#141414] text-white border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#869e32]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-[#869e32]">
                Talk Directly With Our Workshop
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
                Find Your Family&apos;s Forever Dining Table
              </h2>
              <p className="text-stone-300 text-sm sm:text-base font-sans leading-relaxed max-w-2xl">
                Whether you want to pick from our ready dining table collections or custom-order a table built to your exact room dimensions, our workshop team is here to help you directly by phone, Telegram, or message.
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
                className="w-full text-center px-6 py-4 rounded-2xl bg-[#869e32] hover:bg-[#738827] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg"
              >
                Browse Dining Tables →
              </Link>
              <Link
                href="/contact"
                className="w-full text-center px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs uppercase tracking-widest transition-all"
              >
                Request Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

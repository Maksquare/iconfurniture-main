'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import IconImage from '@/components/common/IconImage';

export default function BrandStory() {
  return (
    <section id="story" className="py-20 bg-[#F7F6F0] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Gallery grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-lg bg-stone-300 border border-stone-200/60"
            >
              <IconImage
                src="/collections/if011.jpg"
                alt="Bouclé Craftsmanship Detail"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-lg bg-stone-300 border border-stone-200/60 mt-8"
            >
              <IconImage
                src="/collections/if014.jpg"
                alt="Architectural Material Details"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </motion.div>
          </div>

          {/* Story text */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#859F3C]">
              Design Atelier & Philosophy
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] leading-tight">
              Where Architectural Forms Meet Tactical Warmth.
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
              Founded on the belief that environment dictates quiet clarity, Icon Furniture blends architectural minimalism with the welcoming tactile warmth of solid hardwoods, honed travertine, and rich artisanal fabrics.
            </p>

            <blockquote className="p-4 border-l-2 border-[#859F3C] bg-white/70 italic font-serif text-stone-800 text-sm rounded-r-xl">
              &ldquo;We don&apos;t design objects to fill spaces; we sculpt heirlooms that define moments of restful pause.&rdquo;
              <cite className="block not-italic font-sans text-xs text-[#859F3C] font-semibold mt-2 uppercase tracking-wider">
                — Icon Furniture Atelier Guild
              </cite>
            </blockquote>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1A1A1A] hover:text-[#859F3C] group"
              >
                <span>Read Full Design Monograph</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

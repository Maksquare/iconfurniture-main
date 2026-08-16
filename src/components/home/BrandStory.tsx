'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function BrandStory() {
  return (
    <section id="story" className="py-20 bg-[#F7F4EE] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Gallery grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-3/4 rounded-xl overflow-hidden shadow-lg bg-stone-300"
            >
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=85"
                alt="Bouclé Craftsmanship Detail"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-3/4 rounded-xl overflow-hidden shadow-lg bg-stone-300 mt-8"
            >
              <Image
                src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=85"
                alt="Architectural Material Details"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Story text */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#9A6B43]">
              Design Atelier & Philosophy
            </span>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 leading-tight">
              Where Architectural Forms Meet Tactical Warmth.
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
              Founded on the belief that environment dictates quiet clarity, Iconfurniture blends architectural minimalism with the welcoming tactile warmth of natural oak, honed stone, and rich bouclé fabrics.
            </p>

            <blockquote className="p-4 border-l-2 border-[#9A6B43] bg-white/60 italic font-serif text-stone-800 text-sm">
              &ldquo;We don&apos;t design objects to fill spaces; we sculpt heirlooms that define moments of restful pause.&rdquo;
              <cite className="block not-italic font-sans text-xs text-[#9A6B43] font-semibold mt-2 uppercase tracking-wider">
                — Julian Vance, Design Director
              </cite>
            </blockquote>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#1C1917] hover:text-[#9A6B43] group"
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

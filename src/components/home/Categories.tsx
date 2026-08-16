'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import IconImage from '@/components/common/IconImage';

const CATEGORY_CARDS = [
  {
    title: 'Seating & Loungers',
    slug: 'seating',
    itemCount: '18 Designs',
    image: '/collections/if001.jpg',
  },
  {
    title: 'Dining & Coffee Tables',
    slug: 'tables',
    itemCount: '12 Designs',
    image: '/collections/if005.jpg',
  },
  {
    title: 'Credenzas & Storage',
    slug: 'storage',
    itemCount: '9 Designs',
    image: '/collections/if017.jpg',
  },
  {
    title: 'Architectural Lighting & Decor',
    slug: 'lighting',
    itemCount: '15 Designs',
    image: '/collections/if013.jpg',
  },
];

export default function Categories() {
  return (
    <section className="py-16 bg-[#F7F6F0] border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#859F3C]">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] mt-1">
              Explore by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#1A1A1A] hover:text-[#859F3C] transition-colors group"
          >
            <span>View All Products</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_CARDS.map((cat, idx) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                href={`/shop?category=${cat.slug}`}
                className="group relative block aspect-[3/4] rounded-2xl overflow-hidden bg-stone-200 border border-stone-200/60 shadow-xs hover:shadow-xl transition-all duration-300"
              >
                <IconImage
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/85" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div className="flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#859F3C] font-semibold">
                      {cat.itemCount}
                    </span>
                    <h3 className="font-serif text-xl font-medium mt-1 group-hover:text-[#859F3C] transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

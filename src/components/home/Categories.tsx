'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const CATEGORY_CARDS = [
  {
    title: 'Seating & Loungers',
    slug: 'seating',
    itemCount: '18 Designs',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=85',
  },
  {
    title: 'Dining & Coffee Tables',
    slug: 'tables',
    itemCount: '12 Designs',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=85',
  },
  {
    title: 'Credenzas & Storage',
    slug: 'storage',
    itemCount: '9 Designs',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=85',
  },
  {
    title: 'Architectural Lighting',
    slug: 'lighting',
    itemCount: '15 Designs',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=85',
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
              Explore By Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-4 md:mt-0 text-xs font-semibold uppercase tracking-widest text-[#1A1A1A] hover:text-[#859F3C] inline-flex items-center gap-1 group"
          >
            View All Categories
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORY_CARDS.map((cat, index) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/shop?category=${cat.slug}`}
                className="group relative block aspect-3/4 rounded-xl overflow-hidden shadow-md bg-stone-300"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/20 to-transparent transition-opacity group-hover:opacity-90" />
                
                <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end text-white">
                  <span className="text-[11px] uppercase tracking-widest text-stone-300 mb-1 font-medium">
                    {cat.itemCount}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-white flex items-center justify-between">
                    <span>{cat.title}</span>
                    <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </span>
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

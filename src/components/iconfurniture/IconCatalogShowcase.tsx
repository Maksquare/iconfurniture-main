'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import ProductContactChannels from '@/components/common/ProductContactChannels';

export default function IconCatalogShowcase() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <section className="relative w-full bg-[#f7f6f0] text-[#1A1A1A] py-24 px-6 sm:px-10 select-none z-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-stone-300/80">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#859F3C] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Editorial Pieces</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1A1A1A]">
              The Flagship Collection
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#1A1A1A] hover:text-[#859F3C] transition-colors group"
          >
            <span>Explore Entire Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Featured Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col justify-between bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
            >
              <div>
                {/* Product Image Container */}
                <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-stone-100 mb-4">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-stone-800 shadow-xs">
                    {product.category?.name || 'Heirloom'}
                  </span>
                </div>

                {/* Product Details */}
                <div>
                  <Link
                    href={`/shop/${product.slug}`}
                    className="font-serif font-semibold text-lg text-[#1A1A1A] hover:text-[#859F3C] transition-colors line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {product.materials}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="font-serif text-lg font-bold text-[#1A1A1A]">
                    ${product.price.toLocaleString()}
                  </span>

                  <Link
                    href={`/shop/${product.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-50 hover:bg-[#859F3C] text-stone-800 hover:text-white transition-all text-xs font-semibold shadow-xs group/btn border border-stone-200/60"
                  >
                    <span>View Piece</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>

                {/* Direct Social / Phone Inquiry Bar */}
                <ProductContactChannels productName={product.name} variant="compact" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

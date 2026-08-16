'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, ArrowLeft, Mail, Check } from 'lucide-react';
import { Product } from '@/types';
import ProductGalleryRail from '@/components/shop/ProductGalleryRail';
import ProductGrid from '@/components/shop/ProductGrid';
import ProductContactChannels from '@/components/common/ProductContactChannels';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

const FINISHES = ['Natural White Oak', 'Smoked Walnut', 'Black Ash', 'Custom Stained'];

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedFinish, setSelectedFinish] = useState(FINISHES[0]);
  const [inquirySent, setInquirySent] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'shipping' | 'care'>('specs');

  const handleInquire = () => {
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 3000);
  };

  return (
    <div className="py-12 bg-[#FDFCF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-600 hover:text-[#859F3C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Furniture Catalog
          </Link>
        </div>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Smart Multi-Angle Gallery Rail */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-4"
          >
            <ProductGalleryRail product={product} />

            {/* Social & Contact Channels Card under image for quick access */}
            <ProductContactChannels productName={product.name} variant="detailed" />
          </motion.div>

          {/* Product Purchasing Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              {product.category && (
                <span className="text-xs uppercase tracking-widest font-semibold text-[#859F3C] block mb-2">
                  {product.category.name}
                </span>
              )}
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] leading-tight">
                {product.name}
              </h1>
              <p className="font-serif text-2xl font-semibold text-[#1A1A1A] mt-3">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <p className="text-stone-600 text-sm leading-relaxed font-sans border-t border-b border-stone-200/80 py-4">
              {product.description}
            </p>

            {/* Finish Options */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] block">
                Select Finish / Timber: <span className="text-[#859F3C]">{selectedFinish}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FINISHES.map((finish) => (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(finish)}
                    className={`p-3 text-xs font-medium rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedFinish === finish
                        ? 'border-[#859F3C] bg-[#859F3C]/10 text-[#1A1A1A] font-semibold'
                        : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>

            {/* Consultation / Bespoke Inquiry Action */}
            <div className="space-y-4 pt-2">
              <button
                onClick={handleInquire}
                className={`w-full py-4 px-6 rounded-2xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer ${
                  inquirySent
                    ? 'bg-[#859F3C] text-white'
                    : 'bg-[#1A1A1A] hover:bg-[#859F3C] text-white'
                }`}
              >
                {inquirySent ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Inquiry Request Sent • Atelier Will Contact You</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>Inquire About This Piece • Bespoke Order</span>
                  </>
                )}
              </button>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#859F3C]" />
                  <span>White-Glove In-Home Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#859F3C]" />
                  <span>10-Year Craftsmanship Warranty</span>
                </div>
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="border border-stone-200 rounded-2xl bg-white overflow-hidden">
              <div className="flex border-b border-stone-200">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`flex-1 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'border-[#859F3C] text-[#859F3C] bg-[#859F3C]/10'
                      : 'border-transparent text-stone-600 hover:text-[#1A1A1A]'
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`flex-1 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'shipping'
                      ? 'border-[#859F3C] text-[#859F3C] bg-[#859F3C]/10'
                      : 'border-transparent text-stone-600 hover:text-[#1A1A1A]'
                  }`}
                >
                  Delivery & Assembly
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`flex-1 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'care'
                      ? 'border-[#859F3C] text-[#859F3C] bg-[#859F3C]/10'
                      : 'border-transparent text-stone-600 hover:text-[#1A1A1A]'
                  }`}
                >
                  Care & Maintenance
                </button>
              </div>

              <div className="p-5 text-xs text-stone-600 leading-relaxed font-sans">
                {activeTab === 'specs' && (
                  <div className="space-y-2">
                    <p>
                      <strong className="text-[#1A1A1A]">Dimensions:</strong> {product.dimensions || 'W 34" x D 32" x H 30"'}
                    </p>
                    <p>
                      <strong className="text-[#1A1A1A]">Materials:</strong> {product.materials || 'Solid White Oak & Italian Velvet'}
                    </p>
                    <p>
                      <strong className="text-[#1A1A1A]">Origin:</strong> Handcrafted in Addis Ababa Atelier
                    </p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <p>
                    Includes white-glove inside delivery, room placement, full assembly of hardware, and eco-friendly packing material removal. Scheduled at your convenience.
                  </p>
                )}
                {activeTab === 'care' && (
                  <p>
                    Dust regularly with a dry micro-fiber cloth. Maintain natural wood finish by applying natural beeswax every 12 months. Avoid harsh liquid solvent sprays.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-stone-200 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#859F3C]">
                Complementary Pieces
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A] mt-1">
                You May Also Appreciate
              </h2>
            </div>
            <ProductGrid products={relatedProducts.slice(0, 3)} />
          </div>
        )}
      </div>
    </div>
  );
}

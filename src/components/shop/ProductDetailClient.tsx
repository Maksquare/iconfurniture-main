'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, ArrowLeft, Mail, Check } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/lib/store';
import ProductGalleryRail from '@/components/shop/ProductGalleryRail';
import ProductGrid from '@/components/shop/ProductGrid';
import ProductContactChannels from '@/components/common/ProductContactChannels';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product: initialProduct,
  relatedProducts: initialRelated,
}: ProductDetailClientProps) {
  const { products } = useStore();

  // Ensure user always starts at the very top of the product page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [initialProduct.slug]);

  // Prefer fresh reactive product from store if available
  const product = useMemo(() => {
    const fresh = products.find(
      (p) => p.id === initialProduct.id || p.slug === initialProduct.slug
    );
    return fresh || initialProduct;
  }, [products, initialProduct]);

  const relatedProducts = useMemo(() => {
    if (products.length > 0) {
      return products.filter((p) => p.id !== product.id && p.slug !== product.slug);
    }
    return initialRelated;
  }, [products, product, initialRelated]);

  const [inquirySent, setInquirySent] = useState(false);

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
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-600 hover:text-[#869e32] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dining Table Catalog
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
                <span className="text-xs uppercase tracking-widest font-semibold text-[#869e32] block mb-2">
                  {product.category.name}
                </span>
              )}
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] leading-tight">
                {product.name}
              </h1>
              <p className="font-serif text-2xl font-semibold text-[#1A1A1A] mt-3 flex items-baseline gap-2">
                <span>{product.price.toLocaleString()}</span>
                <span className="text-sm font-mono font-bold text-[#869e32]">ETB</span>
              </p>
            </div>

            {/* Product Description */}
            <div className="space-y-4 border-t border-b border-stone-200/80 py-5">
              <p className="text-stone-600 text-sm leading-relaxed font-sans">
                {product.description}
              </p>

              {/* ─── High-End Luxury Materials Showcase Plinth ─── */}
              <div className="bg-stone-50/80 rounded-2xl p-4 border border-stone-200/90 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#869e32]">
                    Master Artisanal Specifications
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 bg-white px-2 py-0.5 rounded-full border border-stone-200/70">
                    Premium Standard
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Maleda Foam Luxury Card with Authentic Logo */}
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-2xs flex items-center gap-3.5 group hover:border-[#869e32]/40 transition-colors">
                    <div className="w-13 h-13 rounded-xl bg-[#041f76] border border-[#062991]/50 p-1.5 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                      <Image
                        src="/assets/maleda-foam-logo.svg"
                        alt="Maleda Super HD Foam"
                        width={44}
                        height={44}
                        className="w-full h-full object-contain drop-shadow-xs"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1A1A1A]">
                        Maleda Super HD Foam
                      </div>
                      <div className="text-[11px] text-stone-500 font-sans">
                        High-density orthopedic resilience & shape memory
                      </div>
                    </div>
                  </div>

                  {/* Imported & Waterproof Fabric Card */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200/80 shadow-2xs flex items-center gap-3 group hover:border-[#869e32]/40 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-[#869e32]/10 border border-[#869e32]/20 flex items-center justify-center shrink-0 text-[#869e32]">
                      <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1A1A1A]">
                        Imported Water-Proof Fabric
                      </div>
                      <div className="text-[11px] text-stone-500 font-sans">
                        Hydrophobic spill-resistant luxury weave
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── Free Delivery Strip to Key Locations ─── */}
              <div className="rounded-2xl p-4 bg-gradient-to-r from-[#869e32]/10 via-[#869e32]/5 to-white border border-[#869e32]/30 space-y-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A]">
                    <Truck className="w-4 h-4 text-[#869e32]" />
                    <span>Free Direct Delivery & Assembly</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#869e32] px-2.5 py-0.5 rounded-full shadow-2xs">
                    100% Free Shipping
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-medium text-stone-800 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#869e32]" />
                    <span>Addis Ababa / አዲስ አበባ</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-medium text-stone-800 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#869e32]" />
                    <span>Dukem / ዱከም</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-medium text-stone-800 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#869e32]" />
                    <span>Debrezeyit / ደብረዘይት</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Bespoke Table Sizing & Seating Note */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Custom Sizing & Seating
                </span>
                <span className="text-[11px] font-semibold text-[#869e32]">
                  Made To Order
                </span>
              </div>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Available in custom lengths from intimate 4-seater settings to grand 18-seater banquet scales. Handcrafted to fit your exact dining room dimensions.
              </p>
            </div>

            {/* Consultation / Bespoke Inquiry Action */}
            <div className="space-y-4 pt-2">
              <button
                onClick={handleInquire}
                className={`w-full py-4 px-6 rounded-2xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer ${
                  inquirySent
                    ? 'bg-[#869e32] text-white'
                    : 'bg-[#1A1A1A] hover:bg-[#869e32] text-white'
                }`}
              >
                {inquirySent ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Request Sent • Our Team Will Contact You Shortly</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>Inquire About This Dining Table • Bespoke Order</span>
                  </>
                )}
              </button>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-200 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#869e32]" />
                  <span>Free White-Glove Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#869e32]" />
                  <span>We use Maleda HD Foam</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-stone-200 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#869e32]">
                Complementary Dining Designs
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A] mt-1">
                Explore Additional Dining Tables
              </h2>
            </div>
            <ProductGrid products={relatedProducts.slice(0, 3)} />
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import IconImage from '@/components/common/IconImage';
import ProductContactChannels from '@/components/common/ProductContactChannels';

interface ProductCardProps {
  product: Product;
  searchTerm?: string;
  viewMode?: 'grid' | 'list';
}

/** Highlights occurrences of `term` within `text` with brand primary mark */
function HighlightText({ text, term }: { text: string; term?: string }) {
  if (!term || !term.trim()) return <>{text}</>;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === term.toLowerCase() ? (
          <mark
            key={i}
            className="bg-[#124903]/25 text-[#0b2e02] rounded px-0.5 not-italic font-semibold"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function ProductCard({ product, searchTerm, viewMode = 'grid' }: ProductCardProps) {
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-row gap-0"
      >
        {/* Image - fixed width */}
        <Link
          href={`/shop/${product.slug}`}
          className="relative w-40 sm:w-52 shrink-0 bg-stone-100 overflow-hidden"
        >
          <IconImage
            src={product.image_url}
            alt={product.name}
            fill
            sizes="208px"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {product.featured && (
              <span className="px-2 py-0.5 bg-[#1A1A1A]/90 text-white text-[10px] uppercase font-bold tracking-widest rounded-full backdrop-blur-xs">
                Featured
              </span>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 justify-between">
          <div className="space-y-1">
            {product.category && (
              <span className="text-[10px] uppercase tracking-widest text-[#124903] font-bold block">
                {product.category.name}
              </span>
            )}
            <Link href={`/shop/${product.slug}`} className="group-hover:text-[#124903] transition-colors block">
              <h3 className="font-serif text-lg font-medium text-stone-900 leading-snug">
                <HighlightText text={product.name} term={searchTerm} />
              </h3>
            </Link>
            <p className="text-xs text-stone-500 leading-relaxed font-sans line-clamp-2">
              <HighlightText text={product.description || ''} term={searchTerm} />
            </p>
            {product.materials && (
              <p className="text-[10px] text-stone-400 font-sans pt-0.5">
                Materials: <HighlightText text={product.materials} term={searchTerm} />
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-stone-100">
            <span className="font-serif text-xl font-semibold text-stone-900">
              {product.price.toLocaleString()} <span className="text-xs font-mono font-bold text-[#124903]">ETB</span>
            </span>
            <div className="flex items-center gap-2">
              <ProductContactChannels productName={product.name} variant="compact" />
              <Link
                href={`/shop/${product.slug}`}
                className="text-xs uppercase tracking-wider font-semibold py-1.5 px-3.5 rounded-full bg-stone-50 text-stone-700 hover:text-white hover:bg-[#124903] transition-all inline-flex items-center gap-1 group/btn border border-stone-200/60"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full p-4"
    >
      {/* Image */}
      <div>
        <Link href={`/shop/${product.slug}`} className="relative aspect-4/3 rounded-2xl bg-stone-100 overflow-hidden block mb-4">
          <IconImage
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {product.featured && (
              <span className="px-2.5 py-1 bg-[#1A1A1A]/90 text-white text-[10px] uppercase font-bold tracking-widest rounded-full backdrop-blur-xs">
                Featured
              </span>
            )}
            {!product.in_stock && (
              <span className="px-2.5 py-1 bg-[#124903] text-white text-[10px] uppercase font-bold tracking-widest rounded-full">
                Bespoke
              </span>
            )}
          </div>
        </Link>

        {/* Info */}
        <div>
          {product.category && (
            <span className="text-[10px] uppercase tracking-widest text-[#124903] font-bold block mb-1">
              {product.category.name}
            </span>
          )}
          <Link href={`/shop/${product.slug}`} className="group-hover:text-[#124903] transition-colors">
            <h3 className="font-serif text-lg font-medium text-stone-900 leading-snug line-clamp-1">
              <HighlightText text={product.name} term={searchTerm} />
            </h3>
          </Link>
          <p className="text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed font-sans">
            <HighlightText text={product.description || ''} term={searchTerm} />
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <span className="font-serif text-lg font-semibold text-stone-900">
            {product.price.toLocaleString()} <span className="text-xs font-mono font-bold text-[#124903]">ETB</span>
          </span>
          <Link
            href={`/shop/${product.slug}`}
            className="text-xs uppercase tracking-wider font-semibold py-1.5 px-3.5 rounded-full bg-stone-50 text-stone-700 hover:text-white hover:bg-[#124903] transition-all inline-flex items-center gap-1 group/btn border border-stone-200/60"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <ProductContactChannels productName={product.name} variant="compact" />
      </div>
    </motion.div>
  );
}

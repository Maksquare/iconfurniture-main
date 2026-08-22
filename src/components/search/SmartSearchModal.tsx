'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { Product } from '@/types';

interface SmartSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SUGGESTIONS = [
  'American Walnut',
  'Roman Travertine',
  'White Oak',
  'Round Gathering',
  '8-Seater Banquet',
  'Live Edge',
  'Fluted Pedestal',
];

export default function SmartSearchModal({ isOpen, onClose }: SmartSearchModalProps) {
  const router = useRouter();
  const { products, categories } = useStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard navigation (Escape, Arrow Up/Down, Enter)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Intelligent Multi-Field Relevance Search
  const searchResults = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return [];

    const terms = cleanQuery.split(/\s+/).filter(Boolean);

    return products
      .map((product) => {
        let score = 0;
        const name = (product.name || '').toLowerCase();
        const desc = (product.description || '').toLowerCase();
        const materials = (product.materials || '').toLowerCase();
        const categoryName = (product.category?.name || '').toLowerCase();
        const dimensions = (product.dimensions || '').toLowerCase();

        // Exact match
        if (name === cleanQuery) score += 100;
        if (name.startsWith(cleanQuery)) score += 60;
        if (name.includes(cleanQuery)) score += 40;
        if (categoryName.includes(cleanQuery)) score += 30;
        if (materials.includes(cleanQuery)) score += 25;
        if (desc.includes(cleanQuery)) score += 15;
        if (dimensions.includes(cleanQuery)) score += 10;

        // Multi-term match
        for (const term of terms) {
          if (name.includes(term)) score += 15;
          if (materials.includes(term)) score += 10;
          if (categoryName.includes(term)) score += 10;
          if (desc.includes(term)) score += 5;
        }

        return { product, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.product);
  }, [products, query]);

  // Matching Categories
  const matchingCategories = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return [];
    return categories.filter((cat) => cat.name.toLowerCase().includes(cleanQuery));
  }, [categories, query]);

  // Featured tables to display when query is empty
  const featuredProducts = useMemo(() => {
    return products.slice(0, 3);
  }, [products]);

  // Handle navigate to product
  const handleSelectProduct = (slug: string) => {
    onClose();
    router.push(`/shop/${slug}`);
  };

  // Keyboard navigation within results
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    const listLength = searchResults.length;
    if (listLength === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % listLength);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + listLength) % listLength);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = searchResults[selectedIndex];
      if (target) {
        handleSelectProduct(target.slug);
      }
    }
  };

  // Helper to highlight search keywords
  const highlightMatch = (text: string, searchStr: string) => {
    if (!searchStr.trim()) return text;
    const regex = new RegExp(`(${searchStr.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-[#869e32]/25 text-[#425211] font-semibold not-italic px-0.5 rounded">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex flex-col items-center justify-start pt-12 sm:pt-20 px-4 pb-8 overflow-y-auto">
          {/* Dark Glassmorphic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0E0E0E]/85 backdrop-blur-2xl"
          />

          {/* Luxury Search Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative z-10 w-full max-w-3xl bg-white border border-stone-200/80 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[82vh]"
          >
            {/* Top Accent Line */}
            <div className="h-1 bg-gradient-to-r from-[#869e32] via-[#a2bf3d] to-[#869e32]" />

            {/* Search Input Bar */}
            <div className="p-4 sm:p-6 border-b border-stone-100 bg-white sticky top-0 z-20">
              <div className="relative flex items-center gap-3.5 bg-stone-50/80 border border-stone-200/80 focus-within:border-[#869e32] focus-within:ring-4 focus-within:ring-[#869e32]/10 focus-within:bg-white rounded-2xl px-4 py-3.5 transition-all shadow-inner">
                <Search className="w-5 h-5 text-[#869e32] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type anything (e.g. 'walnut', 'travertine', 'round table', 'oak')..."
                  className="w-full bg-transparent text-stone-900 text-sm sm:text-base font-sans placeholder:text-stone-400 focus:outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />

                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      inputRef.current?.focus();
                    }}
                    className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="text-xs font-mono font-semibold text-stone-400 hover:text-stone-700 px-2 py-1 rounded-lg bg-stone-200/60 hover:bg-stone-200 transition-colors"
                >
                  ESC
                </button>
              </div>

              {/* Live Count or Quick Suggestions */}
              <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
                {query.trim() ? (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-800">
                      {searchResults.length} {searchResults.length === 1 ? 'Table' : 'Tables'} Found
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-stone-400">Instant Live Matching</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#869e32]" />
                    <span className="font-medium text-stone-400">Trending Atelier Searches:</span>
                  </div>
                )}

                {!query.trim() && (
                  <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                    {POPULAR_SUGGESTIONS.slice(0, 4).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-[#869e32]/10 hover:text-[#869e32] text-[11px] font-medium text-stone-600 transition-all cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Scrollable Results Viewport */}
            <div ref={listRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* 1. When User Is Searching (Query > 0) */}
              {query.trim() ? (
                searchResults.length > 0 ? (
                  <div className="space-y-2.5">
                    {/* Matching Categories Pill Row */}
                    {matchingCategories.length > 0 && (
                      <div className="mb-3 flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                          Categories:
                        </span>
                        {matchingCategories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/shop?category=${cat.id}`}
                            onClick={onClose}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-[#869e32]/10 text-[#869e32] rounded-full text-xs font-semibold hover:bg-[#869e32] hover:text-white transition-colors"
                          >
                            <span>{cat.name}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Instant Matching Product Cards */}
                    {searchResults.map((product, idx) => {
                      const isSelected = selectedIndex === idx;
                      const imageSrc =
                        product.images && product.images.length > 0
                          ? product.images[0]
                          : '/assets/chair_olive_front.png';

                      return (
                        <div
                          key={product.id}
                          onClick={() => handleSelectProduct(product.slug)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`group flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#869e32]/8 border-[#869e32] shadow-md scale-[1.01]'
                              : 'bg-stone-50/60 hover:bg-stone-100/80 border-stone-200/60'
                          }`}
                        >
                          {/* Product Thumbnail */}
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white border border-stone-200/80 overflow-hidden shrink-0 shadow-xs">
                            <Image
                              src={imageSrc}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-108 transition-transform duration-500"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {product.category?.name && (
                                <span className="text-[10px] uppercase font-bold tracking-widest text-[#869e32]">
                                  {highlightMatch(product.category.name, query)}
                                </span>
                              )}
                              <span className="text-stone-300">•</span>
                              <span className="text-[10px] font-mono text-stone-500 uppercase">
                                {product.in_stock ? 'In Stock' : 'Bespoke Order'}
                              </span>
                            </div>

                            <h3 className="font-serif text-base sm:text-lg font-medium text-[#1A1A1A] group-hover:text-[#869e32] transition-colors truncate">
                              {highlightMatch(product.name, query)}
                            </h3>

                            {product.materials && (
                              <p className="text-xs text-stone-500 truncate mt-0.5 font-sans">
                                {highlightMatch(product.materials, query)}
                              </p>
                            )}
                          </div>

                          {/* Price & Direct Link Button */}
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <div className="text-right">
                              <div className="font-serif text-base sm:text-lg font-semibold text-[#1A1A1A]">
                                {product.price.toLocaleString()}{' '}
                                <span className="text-xs font-mono font-bold text-[#869e32]">
                                  ETB
                                </span>
                              </div>
                            </div>

                            <span
                              className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-xl transition-all ${
                                isSelected
                                  ? 'bg-[#869e32] text-white shadow-xs'
                                  : 'bg-white text-stone-700 border border-stone-200/80 group-hover:bg-[#869e32] group-hover:text-white'
                              }`}
                            >
                              <span>View Table</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* No Results Empty State */
                  <div className="py-12 px-4 text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                      <Search className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-stone-800 font-medium">
                        No dining tables found matching &ldquo;{query}&rdquo;
                      </h4>
                      <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                        Try searching by wood type (walnut, oak, ash), stone (travertine), or style (round, banquet).
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
                      {POPULAR_SUGGESTIONS.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-[#869e32] hover:text-white text-xs font-medium text-stone-700 transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                /* 2. Default Initial State (Featured Tables & Quick Navigation) */
                <div className="space-y-6">
                  {/* Curated Flagship Tables */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#869e32]" />
                        <span className="text-[11px] uppercase font-bold tracking-widest text-stone-400">
                          Curated Masterpieces
                        </span>
                      </div>
                      <Link
                        href="/shop"
                        onClick={onClose}
                        className="text-xs font-semibold text-[#869e32] hover:underline inline-flex items-center gap-1"
                      >
                        <span>View Entire Collection</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {featuredProducts.map((product) => {
                        const imageSrc =
                          product.images && product.images.length > 0
                            ? product.images[0]
                            : '/assets/chair_olive_front.png';

                        return (
                          <div
                            key={product.id}
                            onClick={() => handleSelectProduct(product.slug)}
                            className="group p-3 rounded-2xl bg-stone-50 hover:bg-stone-100/90 border border-stone-200/70 transition-all cursor-pointer flex flex-col justify-between"
                          >
                            <div className="relative aspect-[4/3] w-full rounded-xl bg-white overflow-hidden mb-2.5 border border-stone-200/50">
                              <Image
                                src={imageSrc}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div>
                              <span className="text-[9px] uppercase font-bold tracking-widest text-[#869e32] block">
                                {product.category?.name || 'Dining Table'}
                              </span>
                              <h4 className="font-serif text-sm font-medium text-stone-900 truncate mt-0.5 group-hover:text-[#869e32] transition-colors">
                                {product.name}
                              </h4>
                              <p className="text-xs font-mono font-semibold text-stone-700 mt-1">
                                {product.price.toLocaleString()} ETB
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Browse Categories */}
                  <div className="pt-4 border-t border-stone-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Layers className="w-3.5 h-3.5 text-stone-400" />
                      <span className="text-[11px] uppercase font-bold tracking-widest text-stone-400">
                        Explore by Category
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/shop?category=${cat.id}`}
                          onClick={onClose}
                          className="p-3 rounded-xl bg-stone-50 hover:bg-[#869e32]/10 hover:border-[#869e32]/40 border border-stone-200/60 transition-all flex items-center justify-between group"
                        >
                          <span className="text-xs font-medium text-stone-700 group-hover:text-[#869e32] transition-colors">
                            {cat.name}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#869e32] transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Quick Shortcuts */}
            <div className="px-5 py-3.5 bg-stone-50 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded font-mono text-[10px]">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded font-mono text-[10px]">
                    ↓
                  </kbd>
                  <span>Navigate</span>
                </span>
                <span className="text-stone-300">•</span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded font-mono text-[10px]">
                    ↵ Enter
                  </kbd>
                  <span>View Table</span>
                </span>
              </div>

              <Link
                href="/shop"
                onClick={onClose}
                className="font-semibold text-[#869e32] hover:underline"
              >
                All Tables ({products.length})
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

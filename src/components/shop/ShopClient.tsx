'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ProductGrid from '@/components/shop/ProductGrid';
import { Category, Product } from '@/types';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Phone,
  X,
  Loader2,
  LayoutGrid,
  LayoutList,
} from 'lucide-react';
import {
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
  TikTokIcon,
  OFFICIAL_CONTACTS,
} from '@/components/common/ProductContactChannels';

interface ShopClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function ShopClient({ initialProducts, categories }: ShopClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [searchInput, setSearchInput] = useState<string>(searchParams.get('q') || '');
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');
  const [isSearching, setIsSearching] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  const handleSearchInput = useCallback((value: string) => {
    setSearchInput(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (value.trim()) {
      setIsSearching(true);
      debounceTimer.current = setTimeout(() => {
        setSearchTerm(value);
        setIsSearching(false);
        // Sync URL
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set('q', value); else params.delete('q');
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }, 350);
    } else {
      setSearchTerm('');
      setIsSearching(false);
      const params = new URLSearchParams(searchParams.toString());
      params.delete('q');
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname, router, searchParams]);

  // Category change syncs URL
  const handleCategoryChange = useCallback((slug: string) => {
    setSelectedCategory(slug);
    const params = new URLSearchParams(searchParams.toString());
    if (slug !== 'all') params.set('category', slug); else params.delete('category');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const clearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    inputRef.current?.focus();
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        if (selectedCategory !== 'all') {
          const matchedCategory = categories.find((c) => c.slug === selectedCategory);
          if (matchedCategory && product.category_id !== matchedCategory.id) return false;
        }
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const nameMatch = product.name.toLowerCase().includes(term);
          const descMatch = product.description?.toLowerCase().includes(term);
          const matMatch = product.materials?.toLowerCase().includes(term);
          if (!nameMatch && !descMatch && !matMatch) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [initialProducts, categories, selectedCategory, searchTerm, sortBy]);

  // Suggestions: top 5 matches from names only, while typing
  const suggestions = useMemo(() => {
    if (!searchInput.trim() || searchInput.length < 2) return [];
    const term = searchInput.toLowerCase();
    return initialProducts
      .filter((p) => p.name.toLowerCase().includes(term))
      .slice(0, 5);
  }, [searchInput, initialProducts]);

  const [showSuggestions, setShowSuggestions] = useState(false);
  useEffect(() => {
    setShowSuggestions(searchFocused && suggestions.length > 0 && searchInput.length >= 2);
  }, [searchFocused, suggestions, searchInput]);

  return (
    <div className="py-12 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Luxury Editorial Header */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#f7f4ee] to-[#f2ede4] border border-stone-200/80 shadow-xs overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4a373]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200/80 text-xs font-bold uppercase tracking-widest text-[#9A6B43] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisanal Heirloom Collection</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-stone-900 leading-tight">
              The Flagship Living Catalog
            </h1>
            <p className="text-stone-600 text-sm sm:text-base font-sans leading-relaxed">
              Explore sculptural seating, solid American walnut tables, and architectural stonework designed for timeless contemporary interiors.
            </p>
            {/* Concierge Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs font-medium text-stone-700">
              <span className="text-stone-500 font-bold uppercase tracking-wider text-[11px]">Instant Concierge:</span>
              <a href={OFFICIAL_CONTACTS.instagram.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200/80 hover:border-[#d4a373] hover:text-[#9a6b43] transition-all shadow-2xs">
                <InstagramIcon className="w-3.5 h-3.5 text-pink-600" /><span>{OFFICIAL_CONTACTS.instagram.handle}</span>
              </a>
              <a href={OFFICIAL_CONTACTS.facebook.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200/80 hover:border-[#d4a373] hover:text-[#9a6b43] transition-all shadow-2xs">
                <FacebookIcon className="w-3.5 h-3.5 text-blue-600" /><span>{OFFICIAL_CONTACTS.facebook.handle}</span>
              </a>
              <a href={OFFICIAL_CONTACTS.telegram.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200/80 hover:border-[#d4a373] hover:text-[#9a6b43] transition-all shadow-2xs">
                <TelegramIcon className="w-3.5 h-3.5 text-sky-500" /><span>{OFFICIAL_CONTACTS.telegram.handle}</span>
              </a>
              <a href={OFFICIAL_CONTACTS.tiktok.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200/80 hover:border-[#d4a373] hover:text-[#9a6b43] transition-all shadow-2xs">
                <TikTokIcon className="w-3.5 h-3.5 text-stone-900" /><span>{OFFICIAL_CONTACTS.tiktok.handle}</span>
              </a>
              <a href={OFFICIAL_CONTACTS.phonePrimary.tel}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 text-white hover:bg-[#9a6b43] transition-all shadow-2xs">
                <Phone className="w-3 h-3 text-[#d4a373]" /><span>{OFFICIAL_CONTACTS.phonePrimary.display}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-[#1C1917] text-white shadow-md'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/60'
              }`}
            >
              All Pieces ({initialProducts.length})
            </button>
            {categories.map((cat) => {
              const count = initialProducts.filter((p) => p.category_id === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-5 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-300 ${
                    selectedCategory === cat.slug
                      ? 'bg-[#1C1917] text-white shadow-md'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border border-stone-200/60'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Search + Sort + View */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-stone-100">

            {/* Search Input with Suggestions */}
            <div className="relative w-full sm:w-96">
              <div className={`relative flex items-center transition-all duration-300 ${
                searchFocused
                  ? 'ring-2 ring-[#d4a373]/50 rounded-2xl'
                  : ''
              }`}>
                {isSearching ? (
                  <Loader2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A6B43] animate-spin" />
                ) : (
                  <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                    searchFocused ? 'text-[#9A6B43]' : 'text-stone-400'
                  }`} />
                )}
                <input
                  ref={inputRef}
                  type="text"
                  value={searchInput}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                  placeholder="Search by piece, wood, fabric or style..."
                  aria-label="Search furniture catalog"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-stone-50 border border-stone-200/80 rounded-2xl focus:outline-none focus:border-[#9A6B43] placeholder:text-stone-400 transition-all"
                />
                {searchInput && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-stone-200 hover:bg-stone-300 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3 text-stone-600" />
                  </button>
                )}
              </div>

              {/* Autocomplete Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-stone-200/80 shadow-xl z-50 overflow-hidden">
                  <div className="px-3 py-2 border-b border-stone-100">
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Suggestions</span>
                  </div>
                  {suggestions.map((product) => {
                    const highlighted = product.name.replace(
                      new RegExp(`(${searchInput.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'),
                      '|||$1|||'
                    ).split('|||');
                    return (
                      <button
                        key={product.id}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          handleSearchInput(product.name);
                          setShowSuggestions(false);
                          setSearchFocused(false);
                        }}
                        className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-stone-50 transition-colors group"
                      >
                        <Search className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="text-sm text-stone-800 leading-tight">
                          {highlighted.map((part, i) =>
                            part.toLowerCase() === searchInput.toLowerCase() ? (
                              <mark key={i} className="bg-[#d4a373]/30 text-[#7a5230] rounded px-0.5 font-semibold not-italic">
                                {part}
                              </mark>
                            ) : (
                              <span key={i}>{part}</span>
                            )
                          )}
                        </span>
                        {product.category && (
                          <span className="ml-auto text-[10px] uppercase tracking-wider text-stone-400 font-medium shrink-0">
                            {product.category.name}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Controls: Sort + View Mode */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-stone-500 shrink-0" />
                <label htmlFor="sort" className="text-xs text-stone-600 font-sans whitespace-nowrap">Sort:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="py-2 px-3.5 bg-stone-50 border border-stone-200/80 rounded-2xl text-xs font-medium text-stone-800 focus:outline-none focus:border-[#9A6B43] cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                  <option value="name">A → Z</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-stone-50 border border-stone-200/80 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-[#1C1917] text-white' : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  title="List view"
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === 'list' ? 'bg-[#1C1917] text-white' : 'text-stone-500 hover:text-stone-700'
                  }`}
                >
                  <LayoutList className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Bar */}
        <div className="flex items-center justify-between text-xs text-stone-500 font-sans px-1">
          <div className="flex items-center gap-2">
            {isSearching ? (
              <span className="flex items-center gap-1.5 text-[#9A6B43]">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Searching…
              </span>
            ) : (
              <span>
                Showing <strong className="text-stone-900">{filteredProducts.length}</strong> of {initialProducts.length} curated pieces
                {searchTerm && (
                  <span className="ml-1 text-stone-400">
                    for <em className="text-stone-700 not-italic">"{searchTerm}"</em>
                  </span>
                )}
              </span>
            )}
          </div>
          {(searchTerm || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                clearSearch();
                handleCategoryChange('all');
              }}
              className="flex items-center gap-1 text-[#9A6B43] hover:underline font-medium"
            >
              <X className="w-3 h-3" /> Clear all filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          searchTerm={searchTerm}
          viewMode={viewMode}
          emptyMessage={
            searchTerm
              ? `No pieces found for "${searchTerm}"`
              : 'No furniture pieces matched your filters.'
          }
        />

        {/* Bottom Concierge Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-[#171513] text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-xl font-semibold text-[#d4a373]">
              Need Bespoke Dimensions or Material Customization?
            </h3>
            <p className="text-xs text-stone-400 font-sans">
              Our master woodworkers and fabric artisans craft custom dimensions, wood stains, and commercial grade upholstery.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-center">
            <a
              href={OFFICIAL_CONTACTS.phonePrimary.tel}
              className="px-5 py-2.5 rounded-full bg-[#d4a373] text-stone-950 text-xs font-bold transition-all hover:bg-[#c28e58] hover:shadow-[0_0_20px_rgba(212,163,115,0.4)] inline-flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {OFFICIAL_CONTACTS.phonePrimary.display}</span>
            </a>
            <a
              href={OFFICIAL_CONTACTS.phoneSecondary.tel}
              className="px-5 py-2.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20 hover:bg-white/20 transition-all inline-flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {OFFICIAL_CONTACTS.phoneSecondary.display}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

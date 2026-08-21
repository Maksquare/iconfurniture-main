'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Menu, X, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface IconNavbarProps {
  isDark?: boolean;
}

// Static quick-links shown in the search overlay before typing
const QUICK_LINKS = [
  { label: 'All Dining Tables', href: '/shop', tag: 'Catalog' },
  { label: 'Solid Hardwood Tables', href: '/shop?category=solid-hardwood', tag: 'Walnut & Oak' },
  { label: 'Stone & Marble Tables', href: '/shop?category=stone-marble', tag: 'Travertine' },
  { label: 'Round Gathering Tables', href: '/shop?category=round-gathering', tag: 'Circular' },
  { label: 'Our Films & Videos', href: '/cinema', tag: 'Watch' },
  { label: 'About Icon Furniture', href: '/about', tag: 'Our Story' },
];

// Popular search suggestions
const POPULAR_SEARCHES = [
  'walnut dining table', 'round gathering table', 'travertine marble table',
  '8-seater dining table', 'live edge table', 'extendable banquet table',
  'solid oak trestle', 'fluted pedestal table',
];

export default function IconNavbar({ isDark = false }: IconNavbarProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNavbarLogo, setShowNavbarLogo] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Smooth scroll listener for navbar logo dock handoff
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowNavbarLogo(window.scrollY > 240);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collection', href: '/shop' },
    { name: 'Cinema', href: '/cinema' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Filter popular searches while typing
  const filteredSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return POPULAR_SEARCHES.slice(0, 6);
    const term = searchQuery.toLowerCase();
    return POPULAR_SEARCHES.filter((s) => s.includes(term)).slice(0, 6);
  }, [searchQuery]);

  // Open/close helpers
  const openSearch = () => {
    setSearchOpen(true);
    setMobileMenuOpen(false);
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
    }
  };

  const handleSuggestion = (term: string) => {
    router.push(`/shop?q=${encodeURIComponent(term)}`);
    closeSearch();
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Cmd/Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchOpen ? closeSearch() : openSearch();
      }
      if (e.key === 'Escape' && searchOpen) closeSearch();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [searchOpen]);

  // Prevent body scroll when overlay open
  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [searchOpen]);

  return (
    <>
      {/* ─── Navbar ─────────────────────────────────────────────────── */}
      <header className="fixed top-5 inset-x-0 z-50 flex flex-col items-center px-4 sm:px-6 pointer-events-none">
        <nav
          className={`pointer-events-auto w-full max-w-5xl rounded-full px-6 py-3 transition-all duration-500 flex items-center justify-between shadow-lg backdrop-blur-xl ${
            isDark
              ? 'bg-[#1A1A1A]/90 border border-white/10 text-stone-200 shadow-black/40'
              : 'bg-white/90 border border-stone-200/80 text-stone-800 shadow-stone-900/5'
          }`}
        >
          {/* Brand & Left Nav */}
          <div className="flex items-center gap-5 sm:gap-7">
            {/* Docked Brand Logo from Hero on Scroll */}
            <Link
              href="/"
              className={`flex items-center gap-2.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${
                showNavbarLogo
                  ? 'opacity-100 scale-100 translate-x-0 max-w-[150px]'
                  : 'opacity-0 scale-85 -translate-x-3 max-w-0 pointer-events-none overflow-hidden'
              }`}
              aria-label="Icon Furniture Home"
            >
              <div className={`transition-all duration-300 shrink-0 ${isDark ? 'bg-white/95 px-3 py-1 rounded-xl shadow-xs' : ''}`}>
                <Image
                  src="/assets/iconfurniture-logo.png"
                  alt="Icon Furniture"
                  width={118}
                  height={32}
                  className="h-7 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6 text-[13px] font-medium tracking-wide">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors duration-200 py-1 ${
                    isDark
                      ? 'text-stone-400 hover:text-[#124903]'
                      : 'text-stone-600 hover:text-[#124903]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 text-[13px]">
            {/* Search Button — with ⌘K hint on desktop */}
            <button
              onClick={openSearch}
              aria-label="Search Collection (⌘K)"
              className={`group flex items-center gap-2 pl-3 pr-3.5 py-2 rounded-full border transition-all duration-300 ${
                isDark
                  ? 'border-white/15 text-stone-300 hover:border-[#124903]/40 hover:bg-white/5'
                  : 'border-stone-200/80 text-stone-600 hover:border-[#124903] hover:bg-stone-50'
              }`}
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:block text-xs font-medium">Search</span>
              <kbd className={`hidden lg:flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium border ${
                isDark ? 'border-white/15 text-stone-500 bg-white/5' : 'border-stone-200 text-stone-400 bg-stone-50'
              }`}>
                ⌘K
              </kbd>
            </button>

            {/* Explore Catalog CTA */}
            <Link
              href="/shop"
              className={`hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                isDark
                  ? 'bg-white text-[#1A1A1A] hover:bg-[#124903] hover:text-white hover:shadow-[0_0_16px_rgba(18, 73, 3,0.4)]'
                  : 'bg-[#1A1A1A] text-white hover:bg-[#124903]'
              }`}
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-1.5 rounded-full transition-colors ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            className={`pointer-events-auto absolute top-20 left-4 right-4 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl md:hidden border ${
              isDark
                ? 'bg-[#151412]/95 border-white/15 text-white'
                : 'bg-white/95 border-stone-200 text-stone-900'
            }`}
          >
            <div className="flex flex-col gap-4 text-sm font-medium">
              {/* Mobile Drawer Brand Logo */}
              <div className="pb-2 border-b border-stone-200/50">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <div className="bg-white/95 px-3 py-1.5 rounded-xl inline-block shadow-2xs">
                    <Image
                      src="/assets/iconfurniture-logo.png"
                      alt="Icon Furniture"
                      width={110}
                      height={30}
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                </Link>
              </div>

              {/* Mobile search entry */}
              <button
                onClick={openSearch}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left ${
                  isDark ? 'bg-white/8 text-stone-300' : 'bg-stone-50 text-stone-600'
                }`}
              >
                <Search className="w-4 h-4 text-[#124903]" />
                <span className="text-xs">Search the collection…</span>
              </button>
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left py-1 hover:text-[#124903] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <hr className={isDark ? 'border-white/10' : 'border-stone-200'} />
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-[#124903] hover:bg-[#0e3802] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Explore Entire Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ─── Full-Screen Search Overlay ─────────────────────────────── */}
      {searchOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[200] flex flex-col items-center pt-[12vh] px-4 pb-8"
          style={{ animation: 'searchOverlayIn 0.25s cubic-bezier(0.22,1,0.36,1) forwards' }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#1A1A1A]/90 backdrop-blur-xl"
            onClick={closeSearch}
          />

          {/* Search Panel */}
          <div
            className="relative z-10 w-full max-w-2xl"
            style={{ animation: 'searchPanelIn 0.3s cubic-bezier(0.22,1,0.36,1) 0.05s both' }}
          >
            {/* Search Input */}
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-2xl border border-stone-200/50">
                <Search className="w-5 h-5 text-[#124903] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search velvet armchair, walnut table, travertine lamp…"
                  className="flex-1 bg-transparent text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none"
                  autoComplete="off"
                  spellCheck={false}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors shrink-0"
                  >
                    <X className="w-3.5 h-3.5 text-stone-500" />
                  </button>
                )}
                <button
                  type="submit"
                  className="shrink-0 px-4 py-2 bg-[#1A1A1A] hover:bg-[#124903] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Results Panel */}
            <div className="mt-3 bg-white/95 backdrop-blur-sm rounded-2xl border border-stone-200/50 shadow-2xl overflow-hidden">

              {/* Popular / matching suggestions */}
              <div className="p-4 border-b border-stone-100">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#124903]" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">
                    {searchQuery ? 'Suggestions' : 'Popular Searches'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filteredSuggestions.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSuggestion(term)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-50 hover:bg-[#124903]/15 border border-stone-200/80 hover:border-[#124903]/40 text-xs text-stone-700 hover:text-[#0b2e02] transition-all cursor-pointer"
                    >
                      <Search className="w-3 h-3 text-stone-400" />
                      {searchQuery ? (
                        <>
                          {term.split(new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')).map((part, i) =>
                            part.toLowerCase() === searchQuery.toLowerCase()
                              ? <mark key={i} className="bg-[#124903]/25 text-[#0b2e02] font-semibold not-italic rounded">{part}</mark>
                              : <span key={i}>{part}</span>
                          )}
                        </>
                      ) : term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick category links */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Quick Navigation</span>
                </div>
                <div className="space-y-1">
                  {QUICK_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeSearch}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-stone-50 group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#124903] transition-colors" />
                        <span className="text-sm text-stone-700 group-hover:text-stone-900 transition-colors">{link.label}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-stone-400 group-hover:text-[#124903] transition-colors">
                        {link.tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Footer hint */}
              <div className="px-4 py-3 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-[10px] font-mono">Enter</kbd> to search</span>
                <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-stone-200 rounded text-[10px] font-mono">Esc</kbd> to close</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keyframe animations injected once */}
      <style>{`
        @keyframes searchOverlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes searchPanelIn {
          from { opacity: 0; transform: translateY(-16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
      `}</style>
    </>
  );
}

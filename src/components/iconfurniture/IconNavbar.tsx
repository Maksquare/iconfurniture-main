'use client';

import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import SmartSearchModal from '@/components/search/SmartSearchModal';

interface IconNavbarProps {
  isDark?: boolean;
}

export default function IconNavbar({ isDark = false }: IconNavbarProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showNavbarLogo, setShowNavbarLogo] = useState(false);

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

  // Open/close helpers
  const openSearch = () => {
    setSearchOpen(true);
    setMobileMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

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
                      ? 'text-stone-400 hover:text-[#869e32]'
                      : 'text-stone-600 hover:text-[#869e32]'
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
                  ? 'border-white/15 text-stone-300 hover:border-[#869e32]/40 hover:bg-white/5'
                  : 'border-stone-200/80 text-stone-600 hover:border-[#869e32] hover:bg-stone-50'
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
                  ? 'bg-white text-[#1A1A1A] hover:bg-[#869e32] hover:text-white hover:shadow-[0_0_16px_rgba(18, 73, 3,0.4)]'
                  : 'bg-[#1A1A1A] text-white hover:bg-[#869e32]'
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
                <Search className="w-4 h-4 text-[#869e32]" />
                <span className="text-xs">Search the collection…</span>
              </button>
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left py-1 hover:text-[#869e32] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <hr className={isDark ? 'border-white/10' : 'border-stone-200'} />
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-[#869e32] hover:bg-[#0e3802] text-white rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Explore Entire Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ─── Intelligent High-End Live Search Modal ─── */}
      <SmartSearchModal isOpen={searchOpen} onClose={closeSearch} />
    </>
  );
}

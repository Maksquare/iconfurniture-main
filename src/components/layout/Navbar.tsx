'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collection', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 py-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Left Pill Menu */}
        <nav className="hidden lg:flex items-center bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-stone-200/80 shadow-xs space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-200 ${
                  isActive ? 'text-[#9A6B43]' : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-3 bg-white/90 backdrop-blur-md rounded-full border border-stone-200 shadow-xs text-stone-800"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Center Brand Pill */}
        <Link
          href="/"
          className="bg-[#1C1917] text-white px-5 py-2.5 rounded-full font-serif font-bold text-sm tracking-wider uppercase shadow-md hover:bg-[#9A6B43] transition-colors"
        >
          Icon<span className="text-[#C28E58]">furniture</span>
        </Link>

        {/* Right Actions Pill Container */}
        <div className="flex items-center space-x-3">
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2.5 bg-white/80 backdrop-blur-md rounded-full border border-stone-200/80 text-stone-700 hover:text-[#9A6B43] transition-colors shadow-xs"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Action CTA Pill (Explore Catalog) */}
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#1C1917] hover:bg-[#9A6B43] text-white text-xs uppercase tracking-widest font-semibold rounded-full shadow-md transition-all duration-300 group"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Search Bar Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pointer-events-auto max-w-xl mx-auto mt-3 overflow-hidden bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200 shadow-xl"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search velvet armchair, walnut table, travertine lamp..."
                  className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-[#9A6B43]"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-[#9A6B43] transition-colors"
              >
                Search
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto lg:hidden max-w-md mx-auto mt-3 bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-stone-200 shadow-2xl space-y-4"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-widest font-semibold text-stone-800 hover:text-[#9A6B43] py-2 border-b border-stone-100"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-[#1C1917] text-white text-xs uppercase tracking-widest font-semibold rounded-xl"
              >
                Explore Catalog →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import SmartSearchModal from '@/components/search/SmartSearchModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navLinks = [
    { name: 'Collection', href: '/shop' },
    { name: 'Cinema', href: '/cinema' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 py-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Left Pill Menu */}
        <nav className="hidden lg:flex items-center bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-stone-200/80 shadow-xs space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-200 ${
                  isActive ? 'text-[#869e32]' : 'text-stone-700 hover:text-[#869e32]'
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
          className="lg:hidden p-3 bg-white/95 backdrop-blur-md rounded-full border border-stone-200 shadow-xs text-[#1A1A1A] cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Center Brand Pill with Official Logo */}
        <Link
          href="/"
          className="bg-white/95 px-4 py-2 rounded-full border border-stone-200 shadow-sm hover:shadow-md transition-all flex items-center gap-2 group"
          aria-label="Icon Furniture Home"
        >
          <Image
            src="/assets/iconfurniture-logo.png"
            alt="Icon Furniture"
            width={120}
            height={34}
            className="h-7 w-auto object-contain transition-transform group-hover:scale-103"
            priority
          />
        </Link>

        {/* Right Actions Pill Container */}
        <div className="flex items-center space-x-3">
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2.5 bg-white/90 backdrop-blur-md rounded-full border border-stone-200/80 text-stone-700 hover:text-[#869e32] hover:border-[#869e32] transition-colors shadow-xs cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Action CTA Pill (Explore Catalog) */}
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#869e32] text-white text-xs uppercase tracking-widest font-semibold rounded-full shadow-md transition-all duration-300 group"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ─── Intelligent High-End Live Search Modal ─── */}
      <SmartSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

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
              {/* Mobile Drawer Logo */}
              <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <Image
                    src="/assets/iconfurniture-logo.png"
                    alt="Icon Furniture"
                    width={110}
                    height={30}
                    className="h-6 w-auto object-contain"
                  />
                </Link>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-widest font-semibold text-stone-800 hover:text-[#869e32] py-2 border-b border-stone-100"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-[#869e32] text-white text-xs uppercase tracking-widest font-semibold rounded-xl hover:bg-[#0e3802] transition-colors"
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

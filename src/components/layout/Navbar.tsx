'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, ArrowRight } from 'lucide-react';
import SmartSearchModal from '@/components/search/SmartSearchModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <header className="fixed top-0 inset-x-0 z-50 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Left Side: Brand Logo */}
        <Link
          href="/"
          className="bg-white/95 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2 rounded-full border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-2 group shrink-0"
          aria-label="Icon Furniture Home"
        >
          <Image
            src="/assets/iconfurniture-logo.png"
            alt="Icon Furniture"
            width={120}
            height={34}
            className="h-6 sm:h-7 w-auto object-contain transition-transform group-hover:scale-103"
            priority
          />
        </Link>

        {/* Center: Desktop Editorial Nav Links with Luxury Active States */}
        <nav className="hidden lg:flex items-center bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-stone-200/80 shadow-xs gap-0.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-[#a8c44a] text-[#1A1A1A]'
                    : 'text-stone-600 hover:text-[#1A1A1A] hover:bg-stone-100/80'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions Container */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Live Search Trigger Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2.5 bg-white/90 backdrop-blur-md rounded-full border border-stone-200/80 text-stone-700 hover:text-[#869e32] hover:border-[#869e32] transition-colors shadow-xs cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Desktop Explore CTA */}
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#869e32] text-white text-xs uppercase tracking-widest font-semibold rounded-full shadow-md transition-all duration-300 group shrink-0"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ─── Intelligent High-End Live Search Modal ─── */}
      <SmartSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

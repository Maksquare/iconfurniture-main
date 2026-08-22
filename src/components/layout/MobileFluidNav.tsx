'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import SmartSearchModal from '@/components/search/SmartSearchModal';
import { OFFICIAL_CONTACTS } from '@/components/common/ProductContactChannels';

export default function MobileFluidNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  // Smart scroll handling: auto-hide on fast downward scroll, reveal on scroll up or stop
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (isOpen) return; // Don't hide if menu is open

      if (currentScrollY > lastScrollY.current + 25 && currentScrollY > 120) {
        setIsVisible(false); // scrolling down fast
      } else if (currentScrollY < lastScrollY.current - 10 || currentScrollY < 80) {
        setIsVisible(true); // scrolling up or near top
      }

      lastScrollY.current = currentScrollY;

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsVisible(true); // reveal when scrolling pauses
      }, 1200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOpen]);

  // Close nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (searchOpen) setSearchOpen(false);
        else setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collection', href: '/shop' },
    { name: 'Cinema', href: '/cinema' },
    { name: 'About', href: '/about' },
    { name: 'Contact ↗', href: '/contact' },
  ];

  return (
    <>
      {/* Search Modal */}
      <SmartSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Backdrop when menu is expanded */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[140] bg-black/65 backdrop-blur-md md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Floating Bottom Nav Container */}
      <div
        className={`fixed bottom-5 inset-x-3 sm:inset-x-4 z-[150] flex justify-center pointer-events-none md:hidden transition-all duration-300 ${
          isVisible || isOpen ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <motion.div
          layout
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 32,
          }}
          className={`pointer-events-auto bg-white/95 backdrop-blur-2xl border border-stone-200/90 shadow-[0_20px_60px_rgba(0,0,0,0.28)] overflow-hidden ${
            isOpen
              ? 'w-full max-w-[360px] rounded-[32px] p-6'
              : 'rounded-full px-4 py-2 flex items-center gap-3 shadow-xl'
          }`}
        >
          {isOpen ? (
            /* ─── Expanded State (Inspo Card) ─────────────────────── */
            <div className="w-full flex flex-col space-y-5">
              {/* Nav Links (Large Editorial Typography) */}
              <div className="flex flex-col space-y-2.5 pt-1">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + idx * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block font-serif text-3xl sm:text-4xl font-normal transition-colors tracking-tight ${
                          isActive
                            ? 'text-[#869e32]'
                            : 'text-[#1A1A1A] hover:text-[#869e32]'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick Search Bar inside Menu */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                onClick={() => {
                  setIsOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center justify-between px-4 py-3 bg-stone-50 hover:bg-[#869e32]/10 border border-stone-200/80 rounded-2xl text-xs text-stone-600 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-[#869e32]" />
                  <span className="font-medium text-stone-700">Search catalog…</span>
                </div>
                <kbd className="px-2 py-0.5 bg-white border border-stone-200 rounded text-[10px] font-mono text-stone-400">
                  Live
                </kbd>
              </motion.button>

              {/* Divider */}
              <div className="h-px bg-stone-200/80" />

              {/* Socials & Studio Info Grid */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26 }}
                className="grid grid-cols-2 gap-4 text-xs font-sans"
              >
                {/* Socials Column */}
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-2">
                    Socials
                  </span>
                  <div className="flex flex-col space-y-1 font-medium text-stone-800">
                    <a
                      href={OFFICIAL_CONTACTS.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#869e32] transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href={OFFICIAL_CONTACTS.telegram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#869e32] transition-colors"
                    >
                      Telegram
                    </a>
                    <a
                      href={OFFICIAL_CONTACTS.tiktok.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#869e32] transition-colors"
                    >
                      TikTok
                    </a>
                    <a
                      href={OFFICIAL_CONTACTS.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#869e32] transition-colors"
                    >
                      Facebook
                    </a>
                  </div>
                </div>

                {/* Studio / Atelier Column */}
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-2">
                    Atelier
                  </span>
                  <div className="flex flex-col space-y-1 text-stone-700">
                    <a
                      href={OFFICIAL_CONTACTS.phonePrimary.tel}
                      className="font-medium text-stone-900 hover:text-[#869e32] transition-colors"
                    >
                      {OFFICIAL_CONTACTS.phonePrimary.display}
                    </a>
                    <a
                      href="mailto:contact@iconfurniture.com"
                      className="text-stone-500 hover:text-[#869e32] transition-colors truncate"
                    >
                      contact@iconfurniture.com
                    </a>
                    <span className="text-stone-400 text-[11px] pt-0.5">
                      Bole, Addis Ababa
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Row: Brand Logo + Close Button */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/assets/iconfurniture-logo.png"
                      alt="Icon Furniture"
                      width={100}
                      height={26}
                      className="h-5 w-auto object-contain"
                    />
                  </div>
                </Link>

                {/* Morphing Action Button (Close) */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-2xl bg-[#869e32] text-white flex items-center justify-center shadow-md hover:bg-[#738827] active:scale-95 transition-all cursor-pointer"
                  aria-label="Close navigation"
                >
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <span className="absolute w-4 h-0.5 bg-white rotate-45 transition-transform" />
                    <span className="absolute w-4 h-0.5 bg-white -rotate-45 transition-transform" />
                  </div>
                </button>
              </div>
            </div>
          ) : (
            /* ─── Collapsed State (Bottom Floating Dock / Pill) ─────── */
            <>
              {/* Brand Logo */}
              <Link href="/" className="flex items-center pl-1 pr-1">
                <Image
                  src="/assets/iconfurniture-logo.png"
                  alt="Icon Furniture"
                  width={92}
                  height={24}
                  className="h-5 w-auto object-contain"
                />
              </Link>

              {/* Search Pill Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-[#869e32] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Search catalog"
              >
                <Search className="w-3.5 h-3.5" />
              </button>

              {/* Toggle Morph Button (Hamburger) */}
              <button
                onClick={() => setIsOpen(true)}
                className="w-10 h-8 rounded-xl bg-[#869e32] text-white flex flex-col items-center justify-center gap-1 shadow-xs hover:bg-[#738827] active:scale-95 transition-all cursor-pointer ml-0.5"
                aria-label="Open navigation"
              >
                <span className="w-4 h-0.5 bg-white rounded-full transition-transform" />
                <span className="w-4 h-0.5 bg-white rounded-full transition-transform" />
              </button>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
}

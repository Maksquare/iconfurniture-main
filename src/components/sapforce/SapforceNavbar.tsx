'use client';

import React, { useState } from 'react';
import { ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface SapforceNavbarProps {
  isDark?: boolean;
}

export default function SapforceNavbar({ isDark = false }: SapforceNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Services');

  const navLinks = ['Services', 'Pricing', 'About', 'Insights', 'Contact'];

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <nav
        className={`pointer-events-auto w-full max-w-5xl rounded-full px-6 py-3 transition-all duration-500 flex items-center justify-between shadow-lg backdrop-blur-xl ${
          isDark
            ? 'bg-[#15171a]/85 border border-white/10 text-stone-200 shadow-black/40'
            : 'bg-white/80 border border-stone-200/80 text-stone-800 shadow-stone-900/5'
        }`}
      >
        {/* Mobile Brand / Toggle */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`font-black tracking-tighter text-lg uppercase transition-colors flex items-center gap-1.5 ${
              isDark ? 'text-white' : 'text-stone-950'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#99ff00] inline-block animate-pulse shadow-[0_0_8px_#99ff00]" />
            <span>SAPFORCE</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 text-[13.5px] font-medium tracking-tight">
            {navLinks.map((item) => {
              const isActive = activeLink === item;
              return (
                <button
                  key={item}
                  onClick={() => setActiveLink(item)}
                  className={`transition-colors duration-200 relative py-1 ${
                    isActive
                      ? isDark
                        ? 'text-[#a6ff00] font-semibold'
                        : 'text-stone-950 font-semibold'
                      : isDark
                      ? 'text-stone-400 hover:text-white'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {item}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                        isDark ? 'bg-[#a6ff00]' : 'bg-stone-900'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right CTA / Auth */}
        <div className="hidden md:flex items-center gap-5 text-[13.5px]">
          <button
            className={`font-medium transition-colors ${
              isDark
                ? 'text-stone-300 hover:text-white'
                : 'text-stone-700 hover:text-stone-950'
            }`}
          >
            Login
          </button>
          <button
            className={`group inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              isDark
                ? 'bg-white text-stone-950 hover:bg-[#a6ff00] hover:shadow-[0_0_16px_rgba(166,255,0,0.4)]'
                : 'bg-stone-950 text-white hover:bg-stone-800'
            }`}
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-1.5 rounded-full transition-colors ${
            isDark ? 'text-white hover:bg-white/10' : 'text-stone-900 hover:bg-stone-100'
          }`}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`pointer-events-auto absolute top-16 left-4 right-4 rounded-2xl p-6 shadow-2xl backdrop-blur-2xl transition-all md:hidden border ${
            isDark
              ? 'bg-[#121417]/95 border-white/10 text-white'
              : 'bg-white/95 border-stone-200 text-stone-900'
          }`}
        >
          <div className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveLink(item);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-1 hover:text-[#99ff00] transition-colors"
              >
                {item}
              </button>
            ))}
            <hr className={isDark ? 'border-white/10' : 'border-stone-200'} />
            <div className="flex items-center justify-between pt-2">
              <button className="font-medium text-stone-400 hover:text-white">Login</button>
              <button
                className={`px-5 py-2.5 rounded-full font-medium flex items-center gap-1.5 ${
                  isDark ? 'bg-[#99ff00] text-stone-950 font-semibold' : 'bg-stone-950 text-white'
                }`}
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

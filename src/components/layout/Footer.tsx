'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Phone, MapPin, ExternalLink } from 'lucide-react';
import {
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
  TikTokIcon,
  OFFICIAL_CONTACTS,
} from '@/components/common/ProductContactChannels';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1C1917] text-[#FDFBF7] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-stone-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-wider text-white uppercase">
                Icon<span className="text-[#C28E58]">furniture</span>
              </span>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm font-sans">
              Sculptural forms, tactile bouclé fabrics, natural travertine, and sustainably harvested solid timber. Designed for timeless editorial living.
            </p>
            <div className="pt-2 text-xs text-stone-300 space-y-1.5 font-sans">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4a373] shrink-0" />
                <span>Addis Ababa, Ethiopia</span>
                <a
                  href={OFFICIAL_CONTACTS.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d4a373] hover:underline font-semibold flex items-center gap-0.5 ml-1"
                >
                  <span>Map</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4a373] shrink-0" />
                <a href={OFFICIAL_CONTACTS.phonePrimary.tel} className="hover:text-[#d4a373] transition-colors">
                  {OFFICIAL_CONTACTS.phonePrimary.display}
                </a>
                <span className="text-stone-500">•</span>
                <a href={OFFICIAL_CONTACTS.phoneSecondary.tel} className="hover:text-[#d4a373] transition-colors">
                  {OFFICIAL_CONTACTS.phoneSecondary.display}
                </a>
              </div>
            </div>

            {/* Social Channels Icons Strip */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href={OFFICIAL_CONTACTS.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-pink-500 text-stone-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={OFFICIAL_CONTACTS.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-[#1877F2] text-stone-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={OFFICIAL_CONTACTS.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-[#229ED9] text-stone-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs"
              >
                <TelegramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={OFFICIAL_CONTACTS.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-900 text-stone-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-serif text-sm font-medium tracking-widest uppercase text-stone-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/shop" className="hover:text-[#C28E58] transition-colors">
                  Flagship Collection
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C28E58] transition-colors">
                  About & Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C28E58] transition-colors">
                  Contact & Concierge
                </Link>
              </li>
              <li>
                <Link href="/shop?category=seating" className="hover:text-[#C28E58] transition-colors">
                  Sculptural Seating
                </Link>
              </li>
              <li>
                <Link href="/shop?category=tables" className="hover:text-[#C28E58] transition-colors">
                  Solid Timber Tables
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Care & Inquiries */}
          <div>
            <h4 className="font-serif text-sm font-medium tracking-widest uppercase text-stone-200 mb-4">
              Bespoke Service
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/contact" className="hover:text-[#C28E58] transition-colors">
                  Private Studio Consultation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C28E58] transition-colors">
                  Custom Dimension Requests
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C28E58] transition-colors">
                  Trade & Interior Architecture
                </Link>
              </li>
              <li>
                <span className="hover:text-[#C28E58] transition-colors cursor-pointer">
                  10-Year Master Joinery Warranty
                </span>
              </li>
              <li>
                <span className="hover:text-[#C28E58] transition-colors cursor-pointer">
                  White-Glove Installation
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-serif text-sm font-medium tracking-widest uppercase text-stone-200 mb-4">
              Editorial Gazette
            </h4>
            <p className="text-xs text-stone-400 mb-3 leading-relaxed">
              Receive private previews of seasonal capsule releases and design monographs.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#C28E58] bg-stone-900 p-3 rounded-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>You are now subscribed to the Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-3 py-2.5 bg-stone-900 border border-stone-700 text-xs text-white placeholder-stone-500 rounded-xs focus:outline-hidden focus:border-[#C28E58]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#9A6B43] hover:bg-[#C28E58] text-white text-xs transition-colors flex items-center justify-center rounded-xs"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Iconfurniture Design Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Terms of Service</span>
            <span className="text-stone-400 font-medium">Developed By - AME PRIME</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

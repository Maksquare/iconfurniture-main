'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Phone, MapPin, ExternalLink } from 'lucide-react';
import {
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
  TikTokIcon,
  OFFICIAL_CONTACTS,
} from '@/components/common/ProductContactChannels';

import { useStore } from '@/lib/store';

export default function Footer() {
  const { brandSettings } = useStore();
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
    <footer className="bg-[#1A1A1A] text-[#FDFBF7] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-block bg-white/95 px-4 py-2 rounded-2xl shadow-sm hover:shadow-md transition-all group"
              aria-label="Icon Furniture Home"
            >
              <Image
                src="/assets/iconfurniture-logo.png"
                alt="Icon Furniture"
                width={130}
                height={36}
                className="h-8 w-auto object-contain transition-transform group-hover:scale-103"
              />
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm font-sans">
              {brandSettings?.tagline || 'Master Handcrafted Luxury Dining Tables'}. Solid kiln-dried hardwoods and honed Italian travertine. Handcrafted in Addis Ababa.
            </p>
            <div className="pt-2 text-xs text-stone-300 space-y-1.5 font-sans">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#869e32] shrink-0" />
                <span>{brandSettings?.showroom_address || 'Addis Ababa, Ethiopia'}</span>
                <a
                  href={brandSettings?.google_maps_url || OFFICIAL_CONTACTS.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#869e32] hover:underline font-semibold flex items-center gap-0.5 ml-1"
                >
                  <span>Map</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#869e32] shrink-0" />
                <a href={`tel:${brandSettings?.phone_primary || '0911967049'}`} className="hover:text-[#869e32] transition-colors">
                  {brandSettings?.phone_primary || OFFICIAL_CONTACTS.phonePrimary.display}
                </a>
                <span className="text-stone-500">•</span>
                <a href={`tel:${brandSettings?.phone_secondary || '0910051151'}`} className="hover:text-[#869e32] transition-colors">
                  {brandSettings?.phone_secondary || OFFICIAL_CONTACTS.phoneSecondary.display}
                </a>
              </div>
            </div>

            {/* Social Channels Icons Strip */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href={brandSettings?.instagram_url || OFFICIAL_CONTACTS.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#869e32] text-stone-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={brandSettings?.facebook_url || OFFICIAL_CONTACTS.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1877F2] text-stone-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={brandSettings?.telegram_url || OFFICIAL_CONTACTS.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#229ED9] text-stone-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs"
              >
                <TelegramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={brandSettings?.tiktok_url || OFFICIAL_CONTACTS.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#869e32] text-stone-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs"
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
                <Link href="/shop" className="hover:text-[#869e32] transition-colors">
                  Flagship Collection
                </Link>
              </li>
              <li>
                <Link href="/cinema" className="hover:text-[#869e32] transition-colors">
                  Cinema & Visual Journal
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#869e32] transition-colors">
                  About & Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#869e32] transition-colors">
                  Contact & Concierge
                </Link>
              </li>
              <li>
                <Link href="/shop?category=solid-hardwood" className="hover:text-[#869e32] transition-colors">
                  Solid Hardwood Tables
                </Link>
              </li>
              <li>
                <Link href="/shop?category=stone-marble" className="hover:text-[#869e32] transition-colors">
                  Honed Stone & Marble Tables
                </Link>
              </li>
              <li>
                <Link href="/shop?category=round-gathering" className="hover:text-[#869e32] transition-colors">
                  Round Gathering Tables
                </Link>
              </li>
              <li>
                <Link href="/shop?category=extendable-grand" className="hover:text-[#869e32] transition-colors">
                  Extendable Banquet Tables
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
                <Link href="/contact" className="hover:text-[#869e32] transition-colors">
                  Private Studio Consultation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#869e32] transition-colors">
                  Custom Dimension Requests
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#869e32] transition-colors">
                  Trade & Interior Architecture
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#869e32] hover:underline transition-colors inline-flex items-center gap-1 font-semibold">
                  <span>Atelier Management Console</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <span className="hover:text-[#869e32] transition-colors cursor-pointer">
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
              <div className="flex items-center gap-2 text-xs text-[#869e32] bg-white/5 p-3 rounded-xl border border-[#869e32]/30">
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
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 text-xs text-white placeholder-stone-500 rounded-xl focus:outline-hidden focus:border-[#869e32]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#869e32] hover:bg-[#0e3802] text-white text-xs transition-colors flex items-center justify-center rounded-lg cursor-pointer"
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
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {brandSettings?.brand_name || 'Icon Furniture'}. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-stone-400">
            <Link href="/admin" className="text-stone-400 hover:text-[#869e32] transition-colors">
              Atelier Console
            </Link>
            <span className="hover:text-stone-200 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-200 transition-colors cursor-pointer">Terms of Service</span>
          </div>

          {/* Luxury Developer Hallmark Pill */}
          <a
            href="tel:0954944389"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#869e32]/60 text-stone-300 hover:text-white transition-all duration-300 shadow-xs hover:shadow-[0_0_20px_rgba(18, 73, 3,0.3)] hover:scale-102 cursor-pointer"
            title="Call Developer: 0954944389"
          >
            <span className="w-2 h-2 rounded-full bg-[#869e32] inline-block animate-pulse shadow-[0_0_8px_#869e32]" />
            <span className="text-[10.5px] uppercase tracking-wider text-stone-400 font-medium">
              Developed by
            </span>
            <span className="font-mono text-xs font-bold text-white group-hover:text-[#869e32] transition-colors">
              {brandSettings?.developer_credit || 'AME PRIME - 0954944389'}
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

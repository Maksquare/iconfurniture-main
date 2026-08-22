'use client';

import React, { useState } from 'react';
import { Phone, Check, Copy } from 'lucide-react';

interface ProductContactChannelsProps {
  productName?: string;
  variant?: 'compact' | 'detailed' | 'pill';
  className?: string;
}

// Custom SVG Icons for exact brand aesthetics
export const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const FacebookIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const TelegramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
  </svg>
);

export const TikTokIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.76 1.09-.04 2.09-.64 2.62-1.57.34-.57.48-1.24.47-1.89.03-4.95.01-9.9.01-14.85z" />
  </svg>
);

export const OFFICIAL_CONTACTS = {
  instagram: {
    handle: '@icon_furnituree',
    url: 'https://www.instagram.com/icon_furnituree?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  },
  facebook: {
    handle: 'Icon Furniture',
    url: 'https://web.facebook.com/profile.php?id=100063936008382',
  },
  telegram: {
    handle: '@join77BoleMarket',
    url: 'https://t.me/join77BoleMarket',
  },
  tiktok: {
    handle: '@iconfurniture3',
    url: 'https://www.tiktok.com/@iconfurniture3',
  },
  phonePrimary: {
    display: '0911-96-70-49',
    intl: '+251 911 967 049',
    tel: 'tel:+251911967049',
  },
  phoneSecondary: {
    display: '0910-05-11-51',
    intl: '+251 910 051 151',
    tel: 'tel:+251910051151',
  },
  mapUrl: 'https://maps.app.goo.gl/woqxA7cF31nP7J387?g_st=i&utm_campaign=ac-im',
};

export default function ProductContactChannels({
  productName = 'Curated Furniture Piece',
  variant = 'compact',
  className = '',
}: ProductContactChannelsProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const contacts = [
    {
      key: 'instagram',
      name: 'Instagram',
      handle: OFFICIAL_CONTACTS.instagram.handle,
      url: OFFICIAL_CONTACTS.instagram.url,
      icon: InstagramIcon,
      hoverBg: 'hover:bg-gradient-to-tr hover:from-amber-500 hover:to-pink-500 hover:text-white',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200/80',
      description: 'DM on Instagram',
    },
    {
      key: 'facebook',
      name: 'Facebook',
      handle: OFFICIAL_CONTACTS.facebook.handle,
      url: OFFICIAL_CONTACTS.facebook.url,
      icon: FacebookIcon,
      hoverBg: 'hover:bg-[#1877F2] hover:text-white',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/80',
      description: 'Message on Facebook',
    },
    {
      key: 'telegram',
      name: 'Telegram',
      handle: OFFICIAL_CONTACTS.telegram.handle,
      url: OFFICIAL_CONTACTS.telegram.url,
      icon: TelegramIcon,
      hoverBg: 'hover:bg-[#229ED9] hover:text-white',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200/80',
      description: 'Telegram Channel & Concierge',
    },
    {
      key: 'tiktok',
      name: 'TikTok',
      handle: OFFICIAL_CONTACTS.tiktok.handle,
      url: OFFICIAL_CONTACTS.tiktok.url,
      icon: TikTokIcon,
      hoverBg: 'hover:bg-[#1A1A1A] hover:text-white',
      badgeBg: 'bg-stone-100 text-[#1A1A1A] border-stone-300',
      description: 'Watch on TikTok',
    },
    {
      key: 'phone1',
      name: 'Phone 1',
      handle: OFFICIAL_CONTACTS.phonePrimary.display,
      url: OFFICIAL_CONTACTS.phonePrimary.tel,
      icon: Phone,
      hoverBg: 'hover:bg-[#1A1A1A] hover:text-[#869e32]',
      badgeBg: 'bg-[#869e32]/15 text-[#869e32] border-[#869e32]/30',
      description: 'Direct Call (0911-96-70-49)',
    },
    {
      key: 'phone2',
      name: 'Phone 2',
      handle: OFFICIAL_CONTACTS.phoneSecondary.display,
      url: OFFICIAL_CONTACTS.phoneSecondary.tel,
      icon: Phone,
      hoverBg: 'hover:bg-[#1A1A1A] hover:text-[#869e32]',
      badgeBg: 'bg-[#869e32]/15 text-[#869e32] border-[#869e32]/30',
      description: 'Direct Call (0910-05-11-51)',
    },
  ];

  const handleCopy = (key: string, text: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (variant === 'compact') {
    return (
      <div className={`pt-3 border-t border-stone-100 flex flex-col gap-2 ${className}`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">
            Direct Concierge:
          </span>
          {copiedKey && (
            <span className="text-[10px] font-semibold text-[#869e32] animate-in fade-in flex items-center gap-1">
              <Check className="w-3 h-3" /> Copied!
            </span>
          )}
        </div>

        {/* Social/Phone Luxury Quick Badges */}
        <div className="grid grid-cols-5 gap-1.5">
          {contacts.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.key}
                href={item.url}
                target={item.key.startsWith('phone') ? undefined : '_blank'}
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title={`${item.name}: ${item.handle}`}
                className={`group/contact flex items-center justify-center py-1.5 px-2 rounded-xl bg-stone-50 border border-stone-200/70 text-stone-700 transition-all duration-300 ${item.hoverBg} hover:scale-105 hover:shadow-xs`}
              >
                <Icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover/contact:scale-110" />
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // Detailed / Full Expanded Mode for Product Detail Pages and Showcase
  return (
    <div className={`p-5 rounded-3xl bg-[#FDFCF7] border border-stone-200/80 shadow-xs space-y-4 ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-stone-200/60">
        <div>
          <h4 className="font-serif font-semibold text-[#1A1A1A] text-sm">
            Order Inquiries &amp; Contact
          </h4>
          <p className="text-[11px] text-stone-500 font-sans">
            Connect with Icon Furniture directly across your preferred channel:
          </p>
        </div>
        <span className="w-2 h-2 rounded-full bg-[#869e32] animate-pulse" title="Team Online" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {contacts.map((item) => {
          const Icon = item.icon;
          const isCopied = copiedKey === item.key;

          return (
            <div
              key={item.key}
              className="flex items-center justify-between p-3 rounded-2xl bg-white border border-stone-200/80 hover:border-[#869e32] shadow-2xs hover:shadow-md transition-all duration-300 group"
            >
              <a
                href={item.url}
                target={item.key.startsWith('phone') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 flex-1 min-w-0"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.badgeBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-[#1A1A1A] leading-tight group-hover:text-[#869e32] transition-colors">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-stone-500 font-mono truncate">
                    {item.handle}
                  </div>
                </div>
              </a>

              <button
                onClick={(e) => handleCopy(item.key, item.handle, e)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-[#1A1A1A] hover:bg-stone-100 transition-colors ml-2 cursor-pointer"
                title="Copy Handle/Number"
              >
                {isCopied ? (
                  <Check className="w-3.5 h-3.5 text-[#869e32]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

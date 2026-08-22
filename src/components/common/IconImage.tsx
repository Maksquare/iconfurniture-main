'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface IconImageProps extends Omit<ImageProps, 'onError'> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export default function IconImage({
  src,
  alt,
  fallbackTitle = 'ICON FURNITURE',
  fallbackSubtitle = 'Dining Tables • Icon Furniture',
  className = '',
  ...props
}: IconImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative w-full h-full min-h-[140px] flex flex-col items-center justify-center bg-gradient-to-br from-[#1E1E1E] via-[#161616] to-[#0F0F0F] text-white overflow-hidden p-6 border border-white/10 select-none ${className}`}
      >
        {/* Subtle Ambient Brand Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(18, 73, 3,0.18)_0%,transparent_70%)] pointer-events-none" />

        {/* Diagonal Subtle Watermark Background Patterns */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#869e32_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Center Watermark Logo Silhouette */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-3">
          <div className="relative w-28 h-12 opacity-80 filter brightness-110">
            <Image
              src="/assets/iconfurniture-logo.png"
              alt="Icon Furniture Watermark"
              fill
              className="object-contain"
            />
          </div>

          <div className="space-y-1">
            <div className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-[#869e32]">
              {fallbackTitle}
            </div>
            <div className="font-mono text-[10px] text-stone-400 tracking-wider">
              {fallbackSubtitle}
            </div>
          </div>
        </div>

        {/* Subtle Luxury Corner Framing */}
        <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#869e32]/40" />
        <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#869e32]/40" />
        <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#869e32]/40" />
        <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#869e32]/40" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}

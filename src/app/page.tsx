import React from 'react';
import type { Metadata } from 'next';
import IconExperience from '@/components/iconfurniture/IconExperience';

export const metadata: Metadata = {
  title: 'ICON FURNITURE | Editorial Modern Living & Timeless Craftsmanship',
  description:
    'Curated upscale furniture handcrafted from sustainable solid woods, tactile fabrics, and architectural stonework. Designed to elevate modern living spaces.',
};

export default function HomePage() {
  return <IconExperience />;
}

'use client';

import React from 'react';
import { StoreProvider } from '@/lib/store';
import MobileFluidNav from '@/components/layout/MobileFluidNav';
import ScrollToTop from '@/components/common/ScrollToTop';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      {children}
      <MobileFluidNav />
      <ScrollToTop />
    </StoreProvider>
  );
}

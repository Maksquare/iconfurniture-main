'use client';

import React from 'react';
import { StoreProvider } from '@/lib/store';
import MobileFluidNav from '@/components/layout/MobileFluidNav';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      {children}
      <MobileFluidNav />
    </StoreProvider>
  );
}

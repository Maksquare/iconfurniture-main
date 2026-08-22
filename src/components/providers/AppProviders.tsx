'use client';

import React from 'react';
import { StoreProvider } from '@/lib/store';
import { CartProvider } from '@/components/cart/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';
import MobileFluidNav from '@/components/layout/MobileFluidNav';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <CartProvider>
        {children}
        <CartDrawer />
        <MobileFluidNav />
      </CartProvider>
    </StoreProvider>
  );
}

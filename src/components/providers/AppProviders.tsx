'use client';

import React from 'react';
import { StoreProvider } from '@/lib/store';
import { CartProvider } from '@/components/cart/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </StoreProvider>
  );
}

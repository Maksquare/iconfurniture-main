import React, { Suspense } from 'react';
import { getCategories, getProducts } from '@/lib/data';
import ShopClient from '@/components/shop/ShopClient';

export const revalidate = 60;

export default async function ShopPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <Suspense fallback={<div className="py-24 text-center text-stone-500 font-serif">Loading furniture collection...</div>}>
      <ShopClient initialProducts={products} categories={categories} />
    </Suspense>
  );
}

'use client';

import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { Search } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  searchTerm?: string;
  viewMode?: 'grid' | 'list';
  emptyMessage?: string;
}

export default function ProductGrid({ products, searchTerm, viewMode = 'grid', emptyMessage }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-24 flex flex-col items-center justify-center bg-white rounded-3xl border border-stone-200/80 gap-4">
        <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center">
          <Search className="w-6 h-6 text-stone-400" />
        </div>
        <div className="text-center space-y-1">
          <p className="font-serif text-xl text-stone-800">
            {emptyMessage || 'No furniture pieces found.'}
          </p>
          <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
            Try a different search term, or browse all categories to explore the full collection.
          </p>
        </div>
        {searchTerm && (
          <div className="mt-2 px-4 py-2 rounded-full bg-stone-50 border border-stone-200/80 text-xs text-stone-500">
            Searched for: <strong className="text-stone-700">"{searchTerm}"</strong>
          </div>
        )}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} searchTerm={searchTerm} viewMode="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} searchTerm={searchTerm} viewMode="grid" />
      ))}
    </div>
  );
}

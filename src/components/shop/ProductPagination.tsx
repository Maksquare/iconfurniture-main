'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
} from 'lucide-react';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (perPage: number) => void;
  className?: string;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  className = '',
}: ProductPaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers with smart ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis-start');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis-end');
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  const handlePageSelect = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div
      className={`pt-8 pb-4 border-t border-stone-200/80 flex flex-col md:flex-row items-center justify-between gap-6 select-none ${className}`}
    >
      {/* ─── 1. Left: Architectural Monograph Count ─────────────── */}
      <div className="flex items-center gap-2.5 text-xs text-stone-500 font-sans order-2 md:order-1">
        <span className="w-2 h-2 rounded-full bg-[#859F3C] animate-pulse shadow-[0_0_8px_#859F3C]" />
        <span>
          Showing <strong className="text-stone-900 font-semibold">{startItem}–{endItem}</strong> of{' '}
          <strong className="text-stone-900 font-semibold">{totalItems}</strong> bespoke pieces
        </span>
      </div>

      {/* ─── 2. Center: Luxury Floating Hallmark Capsule ────────── */}
      <div className="order-1 md:order-2 flex items-center gap-1.5 p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/90 shadow-md">
        {/* First Page */}
        <button
          onClick={() => handlePageSelect(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full text-stone-500 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-stone-100 cursor-pointer"
          title="First Page"
          aria-label="First page"
        >
          <ChevronsLeft className="w-3.5 h-3.5" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => handlePageSelect(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-stone-100 cursor-pointer"
          title="Previous Page"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers Pill Track */}
        <div className="flex items-center gap-1 px-1">
          {pages.map((p, idx) => {
            if (typeof p === 'string') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-8 h-8 flex items-center justify-center text-xs text-stone-400 font-serif"
                >
                  •••
                </span>
              );
            }

            const isCurrent = p === currentPage;
            return (
              <button
                key={`page-${p}`}
                onClick={() => handlePageSelect(p)}
                className={`relative w-9 h-9 rounded-full text-xs font-mono font-bold transition-all duration-300 flex items-center justify-center cursor-pointer ${
                  isCurrent
                    ? 'text-white'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {/* Active Indicator Spring Background */}
                {isCurrent && (
                  <motion.div
                    layoutId="activePaginationIndicator"
                    className="absolute inset-0 rounded-full bg-[#1A1A1A] shadow-md -z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  >
                    {/* Glowing Olive Accent Dot */}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#859F3C] shadow-[0_0_6px_#859F3C]" />
                  </motion.div>
                )}
                <span>0{p}</span>
              </button>
            );
          })}
        </div>

        {/* Next Page */}
        <button
          onClick={() => handlePageSelect(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-stone-100 cursor-pointer"
          title="Next Page"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => handlePageSelect(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full text-stone-500 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-stone-100 cursor-pointer"
          title="Last Page"
          aria-label="Last page"
        >
          <ChevronsRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ─── 3. Right: Items Per View Segmented Pill ─────────────── */}
      {onItemsPerPageChange && (
        <div className="flex items-center gap-2 text-xs text-stone-500 font-sans order-3">
          <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium hidden sm:inline">
            Per Page:
          </span>
          <div className="flex items-center p-1 rounded-full bg-stone-100 border border-stone-200/80">
            {[6, 12, 24].map((size) => (
              <button
                key={size}
                onClick={() => onItemsPerPageChange(size)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                  itemsPerPage === size
                    ? 'bg-[#859F3C] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

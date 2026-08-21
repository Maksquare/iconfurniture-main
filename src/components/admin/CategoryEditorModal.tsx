'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Check } from 'lucide-react';
import { Category } from '@/types';

interface CategoryEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoryData: Partial<Category>) => void;
  category?: Category | null;
}

export default function CategoryEditorModal({
  isOpen,
  onClose,
  onSave,
  category,
}: CategoryEditorModalProps) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name || '');
      setSlug(category.slug || '');
    } else {
      setName('');
      setSlug('');
    }
  }, [category, isOpen]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!category) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1A1A1A]/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10"
        >
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#124903]/15 border border-[#124903]/30 flex items-center justify-center text-[#124903]">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-lg font-bold text-stone-900">
                {category ? 'Edit Category' : 'Create New Collection'}
              </h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={handleNameChange}
                placeholder="e.g. Minimalist Trestle Tables"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#124903] text-sm text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                URL Slug
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="minimalist-trestle"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono text-xs text-stone-800 bg-stone-50"
              />
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#124903] hover:bg-[#0e3802] text-white text-xs uppercase tracking-wider font-bold shadow-md flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Category</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

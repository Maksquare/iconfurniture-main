'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  Image as ImageIcon,
  Check,
  Plus,
  Trash2,
} from 'lucide-react';
import { Product, Category } from '@/types';
import PhotoUploadDropzone from '@/components/admin/PhotoUploadDropzone';

// Pre-indexed authentic collection images
const COLLECTION_IMAGES = Array.from({ length: 59 }, (_, i) => {
  const num = String(i + 1).padStart(3, '0');
  return `/collections/if${num}.jpg`;
});

interface ProductEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Partial<Product>) => void;
  product?: Product | null;
  categories: Category[];
}

export default function ProductEditorModal({
  isOpen,
  onClose,
  onSave,
  product,
  categories,
}: ProductEditorModalProps) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState<number>(185000);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('/collections/if001.jpg');
  const [dimensions, setDimensions] = useState('260cm L × 105cm W × 76cm H');
  const [materials, setMaterials] = useState('Kiln-dried solid American walnut, satin oil finish');
  const [inStock, setInStock] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [imagePickerTarget, setImagePickerTarget] = useState<'primary' | 'gallery'>('primary');
  const [imageSourceTab, setImageSourceTab] = useState<'upload' | 'vault' | 'url'>('upload');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setSlug(product.slug || '');
      setCategoryId(product.category_id || (categories[0]?.id || ''));
      setPrice(product.price || 185000);
      setDescription(product.description || '');
      setImageUrl(product.image_url || '/collections/if001.jpg');
      setDimensions(product.dimensions || '260cm L × 105cm W × 76cm H');
      setMaterials(product.materials || 'Kiln-dried solid hardwood');
      setInStock(product.in_stock ?? true);
      setFeatured(product.featured ?? false);
      setGalleryImages(product.images || []);
    } else {
      setName('');
      setSlug('');
      setCategoryId(categories[0]?.id || '');
      setPrice(185000);
      setDescription('');
      setImageUrl('/collections/if001.jpg');
      setDimensions('260cm L × 105cm W × 76cm H');
      setMaterials('Kiln-dried solid American walnut, satin oil finish');
      setInStock(true);
      setFeatured(false);
      setGalleryImages([]);
    }
  }, [product, categories, isOpen]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!product) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleSelectImage = (img: string) => {
    if (imagePickerTarget === 'primary') {
      setImageUrl(img);
    } else {
      if (!galleryImages.includes(img)) {
        setGalleryImages([...galleryImages, img]);
      }
    }
    setShowImagePicker(false);
  };

  const handleUploadPrimaryComplete = (urls: string[]) => {
    if (urls.length > 0) setImageUrl(urls[0]);
  };

  const handleUploadGalleryComplete = (urls: string[]) => {
    const next = [...galleryImages];
    for (const u of urls) {
      if (!next.includes(u)) next.push(u);
    }
    setGalleryImages(next);
  };

  const handleRemoveGalleryImage = (img: string) => {
    setGalleryImages(galleryImages.filter((i) => i !== img));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const finalSlug = slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const selectedCategory = categories.find((c) => c.id === categoryId);
    onSave({
      name: name.trim(),
      slug: finalSlug,
      category_id: categoryId,
      category: selectedCategory,
      price: Number(price) || 0,
      description: description.trim(),
      image_url: imageUrl,
      images: galleryImages,
      dimensions: dimensions.trim(),
      materials: materials.trim(),
      in_stock: inStock,
      featured,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Full-screen scroll container — backdrop + modal inside */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Dark backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1A1A1A]/80 backdrop-blur-md"
        />

        {/* Centering wrapper */}
        <div className="flex min-h-full items-start justify-center p-4 sm:p-8">
          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-stone-200 my-6"
          >
            {/* ── HEADER ── */}
            <div className="px-6 sm:px-8 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#859F3C]/15 border border-[#859F3C]/30 flex items-center justify-center text-[#859F3C]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-stone-900">
                    {product ? 'Edit Dining Table' : 'Add New Dining Table'}
                  </h2>
                  <p className="text-xs text-stone-500 font-sans">
                    Upload photos, set dimensions, price in ETB, and seating options.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ── FORM ── */}
            <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 sm:py-8">
              {/* Two-column grid on desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* ═══════════════════════════════════
                    LEFT COLUMN — Images & Toggles
                ═══════════════════════════════════ */}
                <div className="space-y-5">

                  {/* Primary image source selector */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label className="text-xs uppercase tracking-wider font-bold text-stone-700">
                        Primary Table Photo *
                      </label>
                      <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
                        {(['upload', 'vault', 'url'] as const).map((tab) => (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => setImageSourceTab(tab)}
                            className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                              imageSourceTab === tab
                                ? 'bg-[#859F3C] text-white shadow-sm'
                                : 'text-stone-600 hover:text-stone-900'
                            }`}
                          >
                            {tab === 'upload' ? 'Device / Camera' : tab === 'vault' ? 'Vault (59)' : 'URL'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Device upload tab */}
                    {imageSourceTab === 'upload' && (
                      <PhotoUploadDropzone
                        onUploadComplete={handleUploadPrimaryComplete}
                        currentPreviewUrl={imageUrl}
                        label="Upload Dining Table Photo"
                        sublabel="Drag & drop, pick from phone or PC, or take a photo"
                      />
                    )}

                    {/* Vault tab */}
                    {imageSourceTab === 'vault' && (
                      <div className="space-y-2">
                        <div
                          className="relative w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-300"
                          style={{ aspectRatio: '4/3' }}
                        >
                          <Image src={imageUrl} alt="Preview" fill className="object-cover" unoptimized />
                        </div>
                        <button
                          type="button"
                          onClick={() => { setImagePickerTarget('primary'); setShowImagePicker(true); }}
                          className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:border-[#859F3C] bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <ImageIcon className="w-4 h-4 text-[#859F3C]" />
                          <span>Browse 59 Collection Photos</span>
                        </button>
                      </div>
                    )}

                    {/* URL tab */}
                    {imageSourceTab === 'url' && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="https://... or /collections/if001.jpg"
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-mono focus:border-[#859F3C] focus:ring-2 focus:ring-[#859F3C]/20"
                        />
                        <div
                          className="relative w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-300"
                          style={{ aspectRatio: '4/3' }}
                        >
                          <Image src={imageUrl} alt="Preview" fill className="object-cover" unoptimized />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Multi-angle gallery */}
                  <div className="pt-4 border-t border-stone-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-bold text-stone-700">
                        Extra Photos ({galleryImages.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => { setImagePickerTarget('gallery'); setShowImagePicker(true); }}
                        className="text-xs font-semibold text-[#859F3C] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add from Vault</span>
                      </button>
                    </div>

                    <PhotoUploadDropzone
                      onUploadComplete={handleUploadGalleryComplete}
                      multiple={true}
                      label="Upload Extra Angles"
                      sublabel="Grain closeups, joint details, full room views"
                    />

                    {galleryImages.length > 0 && (
                      <div className="grid grid-cols-4 gap-2 pt-1">
                        {galleryImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 border border-stone-200 group shadow-sm"
                          >
                            <Image src={img} alt="Angle" fill className="object-cover" unoptimized />
                            <button
                              type="button"
                              onClick={() => handleRemoveGalleryImage(img)}
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-red-400 hover:text-red-300 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Stock & Feature Toggles */}
                  <div className="pt-4 border-t border-stone-200 space-y-3">
                    <label className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer hover:border-[#859F3C]/40 transition-colors">
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">Ready Stock</span>
                        <span className="text-[11px] text-stone-500 font-sans">
                          If off, shown as &ldquo;Made to Order&rdquo;
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={inStock}
                        onChange={(e) => setInStock(e.target.checked)}
                        className="w-4 h-4 accent-[#859F3C] rounded cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 cursor-pointer hover:border-[#859F3C]/40 transition-colors">
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">Featured on Homepage</span>
                        <span className="text-[11px] text-stone-500 font-sans">
                          Spotlighted in the main catalog section
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="w-4 h-4 accent-[#859F3C] rounded cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                {/* ═══════════════════════════════════
                    RIGHT COLUMN — Form Fields
                ═══════════════════════════════════ */}
                <div className="space-y-5">

                  {/* Table Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                      Dining Table Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={handleNameChange}
                      placeholder="e.g. Kanso Solid Walnut Dining Table"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#859F3C] focus:ring-2 focus:ring-[#859F3C]/20 text-sm font-medium text-stone-900 transition-all"
                    />
                  </div>

                  {/* Slug & Category */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        required
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="kanso-walnut-table"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono text-xs text-stone-800 bg-stone-50 focus:border-[#859F3C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                        Category *
                      </label>
                      <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-800 bg-white focus:border-[#859F3C]"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                      Price in Ethiopian Birr (ETB) *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        required
                        min={1000}
                        step={500}
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full pl-4 pr-16 py-2.5 rounded-xl border border-stone-300 text-base font-serif font-bold text-stone-900 focus:border-[#859F3C] focus:ring-2 focus:ring-[#859F3C]/20"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#859F3C]">
                        ETB
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1 font-sans">
                      Formatted: <strong className="text-stone-900">{price.toLocaleString()} ETB</strong>
                    </p>
                  </div>

                  {/* Dimensions & Materials */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                        Dimensions
                      </label>
                      <input
                        type="text"
                        value={dimensions}
                        onChange={(e) => setDimensions(e.target.value)}
                        placeholder="280cm L × 110cm W × 76cm H"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 focus:border-[#859F3C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                        Wood &amp; Material
                      </label>
                      <input
                        type="text"
                        value={materials}
                        onChange={(e) => setMaterials(e.target.value)}
                        placeholder="Kiln-dried American walnut"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs text-stone-800 focus:border-[#859F3C]"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-stone-700 mb-1.5">
                      Description
                    </label>
                    <textarea
                      rows={6}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the table: wood type, size, shape, finish, and what makes it special..."
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#859F3C] focus:ring-2 focus:ring-[#859F3C]/20 text-xs font-sans text-stone-800 leading-relaxed resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* ── FOOTER BUTTONS ── */}
              <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#859F3C] hover:bg-[#738b32] text-white text-xs uppercase tracking-wider font-bold shadow-lg shadow-[#859F3C]/30 hover:shadow-[#859F3C]/50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Dining Table</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ── IMAGE VAULT PICKER (nested modal) ── */}
      <AnimatePresence>
        {showImagePicker && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowImagePicker(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-6 z-20 max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Collection Image Vault (59 Photos)
                  </h3>
                  <p className="text-xs text-stone-500 font-sans">
                    Select an authentic dining table photo from our collection.
                  </p>
                </div>
                <button
                  onClick={() => setShowImagePicker(false)}
                  className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {COLLECTION_IMAGES.map((img) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => handleSelectImage(img)}
                    className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      imageUrl === img
                        ? 'border-[#859F3C] ring-2 ring-[#859F3C]/40 scale-95'
                        : 'border-stone-200 hover:border-[#859F3C]'
                    }`}
                  >
                    <Image
                      src={img}
                      alt="vault"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                    <span className="absolute bottom-1 right-1 px-1 bg-black/70 text-[9px] font-mono text-white rounded">
                      {img.replace('/collections/', '')}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}

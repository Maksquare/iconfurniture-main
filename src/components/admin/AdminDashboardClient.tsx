'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Layers,
  Film,
  Crown,
  Settings,
  Image as ImageIcon,
  Plus,
  Search,
  CheckCircle2,
  Trash2,
  Edit3,
  ExternalLink,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Star,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  ArrowUpRight,
  Filter,
  Check,
  X,
  Play,
  Volume2,
  FileText,
  AlertCircle,
  Copy,
  TrendingUp,
  Award,
  LogOut,
  Lock,
  Key,
  UserPlus2,
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { Product, Category } from '@/types';
import { BrandSettings } from '@/types/admin';
import { CinemaFilm } from '@/components/cinema/CinemaPlayer';
import ProductEditorModal from '@/components/admin/ProductEditorModal';
import FilmEditorModal from '@/components/admin/FilmEditorModal';
import CategoryEditorModal from '@/components/admin/CategoryEditorModal';
import PhotoUploadDropzone from '@/components/admin/PhotoUploadDropzone';
import VideoUploadDropzone from '@/components/admin/VideoUploadDropzone';
import AdminLoginScreen from '@/components/admin/AdminLoginScreen';
import { createClient } from '@/lib/supabase/client';

type AdminTab =
  | 'overview'
  | 'products'
  | 'categories'
  | 'cinema'
  | 'settings'
  | 'media';

const COLLECTION_PHOTOS = Array.from({ length: 59 }, (_, i) => {
  const num = String(i + 1).padStart(3, '0');
  return `/collections/if${num}.jpg`;
});

const COLLECTION_VIDEOS = Array.from({ length: 10 }, (_, i) => {
  const num = String(i + 1).padStart(3, '0');
  const ext = i === 9 ? 'mp4' : 'MP4';
  return `/videos/ifvideo_${num}.${ext}`;
});

export default function AdminDashboardClient() {
  const {
    products,
    categories,
    films,
    brandSettings,
    stats,
    isLoaded,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductFeatured,
    toggleProductStock,
    addCategory,
    updateCategory,
    deleteCategory,
    addFilm,
    updateFilm,
    deleteFilm,
    updateBrandSettings,
    resetToDefaults,
    exportBackupJson,
    importBackupJson,
  } = useStore();

  const supabase = createClient();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedStockFilter, setSelectedStockFilter] = useState<'all' | 'instock' | 'bespoke'>('all');
  const [timeString, setTimeString] = useState('');

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isFilmModalOpen, setIsFilmModalOpen] = useState(false);
  const [editingFilm, setEditingFilm] = useState<CinemaFilm | null>(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Inline delete confirmation — avoids window.confirm() blocking
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const handleDeleteConfirm = (product: Product) => {
    deleteProduct(product.id);
    if (product.slug && product.slug !== product.id) {
      setTimeout(() => deleteProduct(product.slug), 50);
    }
    setPendingDeleteId(null);
    showToast(`Deleted "${product.name}" from catalog`);
  };

  // Inline category delete confirmation
  const [pendingDeleteCategoryId, setPendingDeleteCategoryId] = useState<string | null>(null);
  const handleDeleteCategoryConfirm = (cat: Category) => {
    deleteCategory(cat.id);
    setPendingDeleteCategoryId(null);
    showToast(`Deleted category ${cat.name}`);
  };

  // Video preview player inside modal
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);

  // Supabase Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('admin@iconfurniture.com');

  useEffect(() => {
    async function checkSession() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user && user.email) {
          setCurrentUserEmail(user.email);
          setIsAuthenticated(true);
          return;
        }
      } catch {
        // Fallback to local session
      }

      const localAuth = localStorage.getItem('iconfurniture_admin_authenticated') === 'true';
      const localUser = localStorage.getItem('iconfurniture_admin_user');
      if (localAuth) {
        if (localUser) setCurrentUserEmail(localUser);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user?.email) {
        setCurrentUserEmail(session.user.email);
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('iconfurniture_admin_authenticated');
      localStorage.removeItem('iconfurniture_admin_user');
      sessionStorage.removeItem('iconfurniture_admin_authenticated');
    } catch {}
    setIsAuthenticated(false);
    showToast('Logged out of Supabase Admin Console');
  };

  // Custom password configuration
  const [newPasswordInput, setNewPasswordInput] = useState('');

  // Create new admin user
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);

  // Uploaded media vault photos
  const [uploadedVaultPhotos, setUploadedVaultPhotos] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('iconfurniture_uploaded_photos');
      if (saved) setUploadedVaultPhotos(JSON.parse(saved));
    } catch (e) {
      console.warn('Failed to load uploaded photos:', e);
    }
  }, []);

  const handleVaultPhotoUpload = (newUrls: string[]) => {
    setUploadedVaultPhotos((prev) => {
      const merged = [...newUrls, ...prev.filter((u) => !newUrls.includes(u))];
      try {
        localStorage.setItem('iconfurniture_uploaded_photos', JSON.stringify(merged));
      } catch (e) {}
      return merged;
    });
    showToast(`Uploaded ${newUrls.length} photo(s) to Atelier Vault!`);
  };

  // Uploaded media vault videos
  const [uploadedVaultVideos, setUploadedVaultVideos] = useState<{ url: string; duration?: string }[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('iconfurniture_uploaded_videos');
      if (saved) setUploadedVaultVideos(JSON.parse(saved));
    } catch (e) {
      console.warn('Failed to load uploaded videos:', e);
    }
  }, []);

  const handleVaultVideoUpload = (newUrl: string, duration?: string) => {
    setUploadedVaultVideos((prev) => {
      const item = { url: newUrl, duration };
      const merged = [item, ...prev.filter((v) => v.url !== newUrl)];
      try {
        localStorage.setItem('iconfurniture_uploaded_videos', JSON.stringify(merged));
      } catch (e) {}
      return merged;
    });
    showToast('Uploaded video clip to Atelier Vault!');
  };

  // Live Addis Ababa clock
  useEffect(() => {
    const updateTime = () => {
      const eatTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Africa/Addis_Ababa',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTimeString(eatTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.materials?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategoryFilter === 'all' || p.category_id === selectedCategoryFilter;

      const matchesStock =
        selectedStockFilter === 'all'
          ? true
          : selectedStockFilter === 'instock'
          ? p.in_stock
          : !p.in_stock;

      return matchesSearch && matchesCat && matchesStock;
    });
  }, [products, searchQuery, selectedCategoryFilter, selectedStockFilter]);

  // Handle backup export
  const handleExportBackup = () => {
    const jsonStr = exportBackupJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iconfurniture-atelier-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Atelier backup exported successfully!');
  };

  // Handle backup import
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importBackupJson(content);
        if (ok) {
          showToast('Atelier configuration restored successfully!');
        } else {
          showToast('Error restoring backup. Invalid JSON file format.');
        }
      }
    };
    reader.readAsText(file);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-10 h-10 border-2 border-[#124903] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-stone-400">Verifying secure admin session...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLoginScreen
        onLoginSuccess={(email) => {
          if (email) setCurrentUserEmail(email);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-stone-100 font-sans flex flex-col selection:bg-[#124903] selection:text-white">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-100 bg-[#124903] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP LUXURY CONTROL BAR */}
      <header className="sticky top-0 z-40 bg-[#1A1A1A]/95 backdrop-blur-md border-b border-white/10 px-6 sm:px-10 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand & Console Status */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 p-1 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(18, 73, 3,0.25)] group-hover:border-[#124903]/50 transition-colors">
              <Image
                src="/assets/if-favicon.png"
                alt="ICON FURNITURE"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-base font-bold text-white tracking-wider group-hover:text-[#124903] transition-colors">
                  ICON ATELIER
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#124903]/20 text-[#124903] border border-[#124903]/40">
                  Control Console
                </span>
              </div>
              <span className="text-[11px] text-stone-400 font-sans block">
                Master Dining Table Management System
              </span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-white/10 text-xs text-stone-400">
            <div className="w-2 h-2 rounded-full bg-[#124903] animate-pulse" />
            <span className="font-mono text-stone-300">{currentUserEmail}</span>
            <span className="text-stone-600">•</span>
            <span className="text-stone-500 font-mono">EAT: {timeString}</span>
          </div>
        </div>

        {/* Action Controls & External Link */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-stone-200 text-xs font-semibold transition-all border border-white/10 inline-flex items-center gap-1.5 group"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#124903] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <button
            onClick={handleExportBackup}
            title="Download JSON Backup"
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-stone-200 text-xs font-semibold transition-all border border-white/10 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline">Export Backup</span>
          </button>

          <label
            title="Upload JSON Backup"
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-stone-200 text-xs font-semibold transition-all border border-white/10 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline">Import</span>
            <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
          </label>

          <button
            onClick={() => {
              if (
                confirm(
                  'Are you sure you want to reset all products, categories, films, and settings back to factory luxury defaults?'
                )
              ) {
                resetToDefaults();
                showToast('Reset to factory luxury defaults successfully!');
              }
            }}
            title="Reset to Defaults"
            className="p-2 rounded-full hover:bg-red-500/20 text-stone-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogout}
            title="Log Out of Admin Console"
            className="px-3.5 py-1.5 rounded-full bg-red-500/15 hover:bg-red-500/25 text-red-300 hover:text-white text-xs font-semibold transition-all border border-red-500/30 inline-flex items-center gap-1.5 cursor-pointer ml-1"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* SUB-HEADER / TAB NAVIGATION RAIL */}
      <div className="bg-[#181818] border-b border-white/10 px-6 sm:px-10 overflow-x-auto">
        <div className="flex items-center space-x-2 py-2">
          {(
            [
              { id: 'overview', label: 'Overview & Metrics', icon: TrendingUp },
              { id: 'products', label: `Dining Tables (${products.length})`, icon: Award },
              { id: 'categories', label: `Collections (${categories.length})`, icon: Layers },
              { id: 'cinema', label: `Video Chapters (${films.length})`, icon: Film },
              { id: 'settings', label: 'Brand & Site Settings', icon: Settings },
              { id: 'media', label: 'Photo & Video Vault', icon: ImageIcon },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#124903] text-white shadow-[0_0_16px_rgba(18, 73, 3,0.35)]'
                    : 'text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN DASHBOARD CONTENT BODY */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto space-y-8">
        {/* ======================================================== */}
        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {/* ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1: Dining Tables Catalog */}
              <div className="bg-[#1C1C1C] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-[#124903]/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-mono text-stone-400">
                    Dining Table Catalog
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-[#124903]/20 text-[#124903] flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    {stats.total_products}
                  </span>
                  <span className="text-xs text-[#124903] font-semibold">Masterpieces</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-stone-400">
                  <span>{stats.in_stock_count} Ready Stock</span>
                  <span className="text-[#124903]">{stats.bespoke_count} Bespoke</span>
                </div>
              </div>

              {/* Card 2: Videos */}
              <div className="bg-[#1C1C1C] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-[#124903]/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-mono text-stone-400">
                    Video Chapters
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Film className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {films.length}
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-bold">Videos</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-stone-400">
                  <span>All Uploaded Locally</span>
                  <span className="text-amber-300">4K Quality</span>
                </div>
              </div>

              {/* Card 3: Atelier Cinema Chapters */}
              <div className="bg-[#1C1C1C] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-[#124903]/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-mono text-stone-400">
                    Atelier Cinema
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Film className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    {stats.total_films}
                  </span>
                  <span className="text-xs text-purple-400 font-semibold">4K Chapters</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-stone-400">
                  <span>100% Original Ratio</span>
                  <span className="text-purple-300">10 Video Assets</span>
                </div>
              </div>

              {/* Card 4: Curated Collections */}
              <div className="bg-[#1C1C1C] border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-[#124903]/50 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-mono text-stone-400">
                    Collections Taxonomy
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    {stats.total_categories}
                  </span>
                  <span className="text-xs text-blue-400 font-semibold">Specialized</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-stone-400">
                  <span>{stats.featured_count} Flagship Highlights</span>
                  <span className="text-blue-300">Dining Tables Only</span>
                </div>
              </div>
            </div>

            {/* Quick Action Launchpad */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1C1C1C] via-[#222222] to-[#1C1C1C] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#124903]" />
                  <span>Atelier Quick Action Launchpad</span>
                </h3>
                <p className="text-xs text-stone-400 font-sans mt-1">
                  Instantly publish new dining tables, adjust brand hero copy, or log a custom client commission.
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsProductModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-full bg-[#124903] hover:bg-[#0e3802] text-white text-xs uppercase tracking-wider font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Dining Table</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 flex items-center gap-1.5 cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-stone-300" />
                  <span>Edit Brand Copy</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: DINING TABLES CATALOG */}
        {/* ======================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1A1A1A] p-6 rounded-3xl border border-white/10">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  Dining Tables Catalog ({filteredProducts.length} Pieces)
                </h2>
                <p className="text-xs text-stone-400 font-sans mt-0.5">
                  Manage specifications, prices in ETB, stock readiness, and authentic gallery images.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-full bg-[#124903] hover:bg-[#0e3802] text-white text-xs uppercase tracking-wider font-bold shadow-lg shadow-[#124903]/30 flex items-center gap-2 cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Dining Table</span>
              </button>
            </div>

            {/* Filters Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#1A1A1A] p-4 rounded-2xl border border-white/10">
              {/* Search Box */}
              <div className="sm:col-span-6 relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dining table name, timber species, marble..."
                  className="w-full pl-9 pr-4 py-2 bg-[#222222] border border-white/10 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-[#124903]"
                />
              </div>

              {/* Category Filter */}
              <div className="sm:col-span-3">
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-[#222222] border border-white/10 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-[#124903]"
                >
                  <option value="all">All Dining Categories</option>
                  {categories.map((c, idx) => (
                    <option key={`cat-opt-${c.id || c.slug || idx}`} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock Filter */}
              <div className="sm:col-span-3">
                <select
                  value={selectedStockFilter}
                  onChange={(e) => setSelectedStockFilter(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#222222] border border-white/10 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-[#124903]"
                >
                  <option value="all">All Availability</option>
                  <option value="instock">Ready Stock Only</option>
                  <option value="bespoke">Bespoke Commission Only</option>
                </select>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#222222] text-stone-400 uppercase font-mono tracking-wider border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4">Piece / Model</th>
                      <th className="px-4 py-4">Category</th>
                      <th className="px-4 py-4">Price (ETB)</th>
                      <th className="px-4 py-4">Dimensions</th>
                      <th className="px-4 py-4 text-center">Featured</th>
                      <th className="px-4 py-4 text-center">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-stone-200 font-sans">
                    {filteredProducts.map((p, pIdx) => {
                      const cat = categories.find((c) => c.id === p.category_id);
                      return (
                        <tr key={`admin-row-${p.id || p.slug || pIdx}`} className="hover:bg-white/5 transition-colors group">
                          {/* Photo & Name */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-white/10">
                                <Image
                                  src={p.image_url}
                                  alt={p.name}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                              <div>
                                <span className="font-serif font-bold text-white text-sm block">
                                  {p.name}
                                </span>
                                <span className="text-[11px] text-stone-400 font-mono">
                                  /{p.slug}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="px-4 py-4">
                            <span className="px-2.5 py-1 rounded-full bg-white/5 text-stone-300 text-[11px] border border-white/10">
                              {cat?.name || p.category?.name || 'Dining Table'}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="px-4 py-4 font-serif font-bold text-stone-100 text-sm">
                            {p.price.toLocaleString()}{' '}
                            <span className="text-[10px] font-mono text-[#124903]">ETB</span>
                          </td>

                          {/* Dimensions */}
                          <td className="px-4 py-4 text-stone-400 font-mono text-[11px]">
                            {p.dimensions || 'Custom Size'}
                          </td>

                          {/* Featured Toggle */}
                          <td className="px-4 py-4 text-center">
                            <button
                              onClick={() => {
                                toggleProductFeatured(p.id);
                                showToast(`Toggled featured status for ${p.name}`);
                              }}
                              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                                p.featured
                                  ? 'bg-[#124903] text-white shadow-[0_0_10px_rgba(18, 73, 3,0.5)]'
                                  : 'bg-white/5 text-stone-500 hover:text-stone-300'
                              }`}
                            >
                              <Star className="w-3.5 h-3.5" />
                            </button>
                          </td>

                          {/* Stock Status Toggle */}
                          <td className="px-4 py-4 text-center">
                            <button
                              onClick={() => {
                                toggleProductStock(p.id);
                                showToast(`Toggled stock status for ${p.name}`);
                              }}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                p.in_stock
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-[#124903]/20 text-[#124903] border border-[#124903]/40'
                              }`}
                            >
                              {p.in_stock ? 'In Stock' : 'Bespoke'}
                            </button>
                          </td>

                          {/* Action Buttons */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/shop/${p.slug}`}
                                target="_blank"
                                title="View on Live Shop"
                                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => {
                                  setEditingProduct(p);
                                  setIsProductModalOpen(true);
                                }}
                                title="Edit Table"
                                className="p-2 rounded-xl bg-white/5 hover:bg-[#124903] text-stone-400 hover:text-white transition-colors cursor-pointer"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              {pendingDeleteId === p.id ? (
                                // Inline confirm — avoids window.confirm() blocking
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px] text-red-400 font-semibold">Delete?</span>
                                  <button
                                    onClick={() => handleDeleteConfirm(p)}
                                    className="px-2 py-1 rounded-lg bg-red-500 text-white text-[10px] font-bold cursor-pointer hover:bg-red-600 transition-colors"
                                  >
                                    Yes
                                  </button>
                                  <button
                                    onClick={() => setPendingDeleteId(null)}
                                    className="px-2 py-1 rounded-lg bg-white/10 text-stone-300 text-[10px] font-bold cursor-pointer hover:bg-white/20 transition-colors"
                                  >
                                    No
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setPendingDeleteId(p.id)}
                                  title="Delete Table"
                                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-stone-400 hover:text-red-300 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CATEGORIES & COLLECTIONS */}
        {/* ======================================================== */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1A1A1A] p-6 rounded-3xl border border-white/10">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  Dining Table Collections ({categories.length})
                </h2>
                <p className="text-xs text-stone-400 font-sans mt-0.5">
                  Organize your dining table taxonomy for filtering and navigation menus.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingCategory(null);
                  setIsCategoryModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-full bg-[#124903] hover:bg-[#0e3802] text-white text-xs uppercase tracking-wider font-bold shadow-md flex items-center gap-2 cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4" />
                <span>Create Collection</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat, cIdx) => {
                const count = products.filter((p) => p.category_id === cat.id).length;
                return (
                  <div
                    key={`cat-card-${cat.id || cat.slug || cIdx}`}
                    className="p-6 rounded-3xl bg-[#1A1A1A] border border-white/10 flex flex-col justify-between space-y-4 hover:border-[#124903]/50 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="w-8 h-8 rounded-xl bg-[#124903]/20 text-[#124903] flex items-center justify-center">
                          <Layers className="w-4 h-4" />
                        </span>
                        <span className="text-xs font-mono text-[#124903] font-semibold">
                          {count} {count === 1 ? 'Table' : 'Tables'}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-white mt-3">{cat.name}</h3>
                      <p className="font-mono text-xs text-stone-400 mt-1">/{cat.slug}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <Link
                        href={`/shop?category=${cat.slug}`}
                        target="_blank"
                        className="text-xs font-semibold text-stone-400 hover:text-[#124903] flex items-center gap-1"
                      >
                        <span>View in Shop</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingCategory(cat);
                            setIsCategoryModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#124903] text-stone-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        {pendingDeleteCategoryId === cat.id ? (
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-red-400 font-semibold">Delete?</span>
                            <button
                              onClick={() => handleDeleteCategoryConfirm(cat)}
                              className="px-2 py-1 rounded-lg bg-red-500 text-white text-[10px] font-bold cursor-pointer hover:bg-red-600 transition-colors"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setPendingDeleteCategoryId(null)}
                              className="px-2 py-1 rounded-lg bg-white/10 text-stone-300 text-[10px] font-bold cursor-pointer hover:bg-white/20 transition-colors"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setPendingDeleteCategoryId(cat.id)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-stone-400 hover:text-red-300 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: ATELIER CINEMA FILMS */}
        {/* ======================================================== */}
        {activeTab === 'cinema' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1A1A1A] p-6 rounded-3xl border border-white/10">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  Atelier Cinema & Visual Journal ({films.length} Chapters)
                </h2>
                <p className="text-xs text-stone-400 font-sans mt-0.5">
                  Curate the cinema gallery at /cinema with custom chapter titles, durations, and video tracks.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingFilm(null);
                  setIsFilmModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-full bg-[#124903] hover:bg-[#0e3802] text-white text-xs uppercase tracking-wider font-bold shadow-md flex items-center gap-2 cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4" />
                <span>Add Film Chapter</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {films.map((film, idx) => (
                <div
                  key={`film-card-${film.id || idx}`}
                  className="rounded-3xl bg-[#1A1A1A] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#124903]/50 transition-all group"
                >
                  <div>
                    {/* Video Card Header / Preview trigger */}
                    <div className="relative aspect-16/9 bg-stone-900 overflow-hidden flex items-center justify-center">
                      <video
                        src={film.src}
                        muted
                        playsInline
                        loop
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                        onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play().catch(() => {})}
                        onMouseLeave={(e) => {
                          const v = e.currentTarget as HTMLVideoElement;
                          v.pause();
                          v.currentTime = 0;
                        }}
                      />
                      <button
                        onClick={() => setPreviewVideoUrl(film.src)}
                        className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#124903]/90 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>

                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 text-[10px] font-mono text-white">
                        {film.resolution || '4K Ultra HD'}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 text-[10px] font-mono text-white flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#124903]" />
                        <span>{film.duration}</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#124903] font-bold">
                        {film.subtitle || `Chapter ${idx + 1}`}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-white leading-snug">
                        {film.title}
                      </h3>
                      <p className="text-xs text-stone-400 font-sans line-clamp-2 leading-relaxed">
                        {film.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                    <span className="text-[11px] font-mono text-stone-500">
                      {film.src.replace('/videos/', '')}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingFilm(film);
                          setIsFilmModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-[#124903] text-stone-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete film chapter "${film.title}"?`)) {
                            deleteFilm(film.id);
                            showToast(`Deleted ${film.title}`);
                          }
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-stone-400 hover:text-red-300 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: BRAND & SITE SETTINGS */}
        {/* ======================================================== */}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-white/10">
              <h2 className="font-serif text-2xl font-bold text-white">
                Global Brand Identity & Content Controls
              </h2>
              <p className="text-xs text-stone-400 font-sans mt-0.5">
                Changes saved here update site headlines, phone numbers, announcement ribbons, and social links in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Brand Copy & Identity */}
              <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 space-y-4">
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#124903]" />
                  <span>Brand Slogan & Hero Copy</span>
                </h3>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-400 mb-1.5">
                    Official Brand Name
                  </label>
                  <input
                    type="text"
                    value={brandSettings.brand_name}
                    onChange={(e) => updateBrandSettings({ brand_name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#222222] border border-white/10 rounded-xl text-sm font-serif font-bold text-white focus:border-[#124903]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-400 mb-1.5">
                    Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={brandSettings.tagline}
                    onChange={(e) => updateBrandSettings({ tagline: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#222222] border border-white/10 rounded-xl text-xs text-stone-200 focus:border-[#124903]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-400 mb-1.5">
                    Hero Headline
                  </label>
                  <input
                    type="text"
                    value={brandSettings.hero_headline}
                    onChange={(e) => updateBrandSettings({ hero_headline: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#222222] border border-white/10 rounded-xl text-xs text-stone-200 focus:border-[#124903]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-400 mb-1.5">
                    Hero Highlight Text
                  </label>
                  <input
                    type="text"
                    value={brandSettings.hero_highlight_text}
                    onChange={(e) => updateBrandSettings({ hero_highlight_text: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#222222] border border-white/10 rounded-xl text-xs text-stone-200 focus:border-[#124903]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-400 mb-1.5">
                    Hero Craft Description
                  </label>
                  <textarea
                    rows={3}
                    value={brandSettings.hero_description}
                    onChange={(e) => updateBrandSettings({ hero_description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#222222] border border-white/10 rounded-xl text-xs text-stone-200 focus:border-[#124903] resize-none"
                  />
                </div>
              </div>

              {/* Official Contacts & Links */}
              <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 space-y-4">
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#124903]" />
                  <span>Official Workshop Contacts</span>
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-stone-400 mb-1.5">
                      Primary Phone
                    </label>
                    <input
                      type="text"
                      value={brandSettings.phone_primary}
                      onChange={(e) => updateBrandSettings({ phone_primary: e.target.value })}
                      className="w-full px-3 py-2 bg-[#222222] border border-white/10 rounded-xl font-mono text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-stone-400 mb-1.5">
                      Secondary Phone
                    </label>
                    <input
                      type="text"
                      value={brandSettings.phone_secondary}
                      onChange={(e) => updateBrandSettings({ phone_secondary: e.target.value })}
                      className="w-full px-3 py-2 bg-[#222222] border border-white/10 rounded-xl font-mono text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-400 mb-1.5">
                    Telegram Channel URL
                  </label>
                  <input
                    type="text"
                    value={brandSettings.telegram_url}
                    onChange={(e) => updateBrandSettings({ telegram_url: e.target.value })}
                    className="w-full px-3 py-2 bg-[#222222] border border-white/10 rounded-xl text-xs text-sky-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-400 mb-1.5">
                    Instagram Profile URL
                  </label>
                  <input
                    type="text"
                    value={brandSettings.instagram_url}
                    onChange={(e) => updateBrandSettings({ instagram_url: e.target.value })}
                    className="w-full px-3 py-2 bg-[#222222] border border-white/10 rounded-xl text-xs text-pink-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-400 mb-1.5">
                    TikTok Profile URL
                  </label>
                  <input
                    type="text"
                    value={brandSettings.tiktok_url}
                    onChange={(e) => updateBrandSettings({ tiktok_url: e.target.value })}
                    className="w-full px-3 py-2 bg-[#222222] border border-white/10 rounded-xl text-xs text-stone-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-400 mb-1.5">
                    Google Maps Pin URL
                  </label>
                  <input
                    type="text"
                    value={brandSettings.google_maps_url}
                    onChange={(e) => updateBrandSettings({ google_maps_url: e.target.value })}
                    className="w-full px-3 py-2 bg-[#222222] border border-white/10 rounded-xl text-xs text-stone-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-400 mb-1.5">
                    Developer Credit Text
                  </label>
                  <input
                    type="text"
                    value={brandSettings.developer_credit}
                    onChange={(e) => updateBrandSettings({ developer_credit: e.target.value })}
                    className="w-full px-3 py-2 bg-[#222222] border border-white/10 rounded-xl font-mono text-xs text-[#124903]"
                  />
                </div>
              </div>
            </div>

            {/* Announcement Banner Bar */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Top Announcement Ribbon
                  </h3>
                  <p className="text-xs text-stone-400 font-sans">
                    Display an elegant notice banner across all client pages.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={brandSettings.announcement_enabled}
                  onChange={(e) => updateBrandSettings({ announcement_enabled: e.target.checked })}
                  className="w-5 h-5 accent-[#124903] cursor-pointer"
                />
              </div>

              <input
                type="text"
                value={brandSettings.announcement_text}
                onChange={(e) => updateBrandSettings({ announcement_text: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#222222] border border-white/10 rounded-xl text-xs text-stone-200 focus:border-[#124903]"
              />
            </div>

            {/* Administrator Password & Security */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <Key className="w-4 h-4 text-[#124903]" />
                    <span>Administrator Master Security Key</span>
                  </h3>
                  <p className="text-xs text-stone-400 font-sans">
                    Change the master password used to log in to this management console.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="Enter new master password (e.g. mysecret2026)"
                  className="flex-1 w-full px-4 py-2.5 bg-[#222222] border border-white/10 rounded-xl font-mono text-xs text-white placeholder-stone-500 focus:border-[#124903]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newPasswordInput.trim() || newPasswordInput.trim().length < 4) {
                      alert('Please enter a password with at least 4 characters');
                      return;
                    }
                    localStorage.setItem('iconfurniture_custom_admin_pwd', newPasswordInput.trim());
                    showToast('Master security key updated successfully!');
                    setNewPasswordInput('');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#124903] hover:bg-[#0e3802] text-white text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap"
                >
                  Update Password
                </button>
              </div>
              <p className="text-[11px] text-stone-500 font-sans">
                Default backup master key:{' '}
                <span className="font-mono text-stone-400 font-semibold">iconfurniture2026</span>
              </p>
            </div>

            {/* Create New Admin User */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <UserPlus2 className="w-4 h-4 text-[#124903]" />
                  <span>Create New Admin Account</span>
                </h3>
                <p className="text-xs text-stone-400 font-sans mt-0.5">
                  Add a new admin user who can log in to this management console.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="newadmin@iconfurniture.com"
                  className="px-4 py-2.5 bg-[#222222] border border-white/10 rounded-xl font-mono text-xs text-white placeholder-stone-500 focus:border-[#124903] outline-none"
                />
                <input
                  type="text"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  placeholder="Choose a strong password"
                  className="px-4 py-2.5 bg-[#222222] border border-white/10 rounded-xl font-mono text-xs text-white placeholder-stone-500 focus:border-[#124903] outline-none"
                />
              </div>

              <button
                type="button"
                disabled={isCreatingAdmin}
                onClick={async () => {
                  if (!newAdminEmail.trim() || !newAdminPassword.trim()) {
                    showToast('Please fill in both email and password');
                    return;
                  }
                  if (newAdminPassword.trim().length < 6) {
                    showToast('Password must be at least 6 characters');
                    return;
                  }
                  setIsCreatingAdmin(true);
                  try {
                    const { error } = await supabase.auth.signUp({
                      email: newAdminEmail.trim(),
                      password: newAdminPassword.trim(),
                    });
                    if (error) throw error;
                    showToast(`Admin account created for ${newAdminEmail.trim()}!`);
                    setNewAdminEmail('');
                    setNewAdminPassword('');
                  } catch (err: unknown) {
                    const msg = err instanceof Error ? err.message : 'Failed to create admin';
                    showToast(`Error: ${msg}`);
                  } finally {
                    setIsCreatingAdmin(false);
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-[#124903] hover:bg-[#0e3802] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                {isCreatingAdmin ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <UserPlus2 className="w-3.5 h-3.5" />
                )}
                <span>{isCreatingAdmin ? 'Creating...' : 'Create Admin Account'}</span>
              </button>

              <p className="text-[11px] text-stone-500 font-sans">
                The new admin can log in immediately using the email and password you set above.
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: MEDIA VAULT */}
        {/* ======================================================== */}
        {activeTab === 'media' && (
          <div className="space-y-8">
            <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">
                  Atelier Media Vault &amp; Device Uploader
                </h2>
                <p className="text-xs text-stone-400 font-sans mt-0.5">
                  Upload new dining table photographs from any mobile phone, camera, or laptop directly to the server.
                </p>
              </div>
            </div>

            {/* Device Photo Upload Dropzone */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#124903]" />
                <span>Upload Photos from Any Device</span>
              </h3>
              <PhotoUploadDropzone
                onUploadComplete={handleVaultPhotoUpload}
                multiple={true}
                label="Drop Dining Table Photos Here"
                sublabel="Select from your phone's photo library, take a photo with your camera, or drag & drop high-res image files"
              />
            </div>

            {/* Device Video Upload Dropzone */}
            <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Film className="w-4 h-4 text-[#124903]" />
                <span>Upload Cinema Video Clips from Any Device</span>
              </h3>
              <VideoUploadDropzone
                onUploadComplete={handleVaultVideoUpload}
                label="Upload 4K/HD Video Clips"
                sublabel="Record video on mobile camera, browse video files, or drag & drop (MP4, MOV, WebM)"
              />
            </div>

            {/* Uploaded Videos Section (if any) */}
            {uploadedVaultVideos.length > 0 && (
              <div className="bg-[#1A1A1A] border border-[#124903]/30 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#124903]" />
                    <span>Uploaded Device Videos ({uploadedVaultVideos.length})</span>
                  </h3>
                  <span className="text-xs font-mono text-[#124903]">Saved on Server Storage</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadedVaultVideos.map((vid, idx) => (
                    <div
                      key={`uploaded-video-${vid.url}-${idx}`}
                      className="relative aspect-video rounded-2xl bg-black border border-[#124903]/40 overflow-hidden group shadow-md flex flex-col justify-between"
                    >
                      <video src={vid.url} muted playsInline className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center gap-2">
                        <span className="text-[10px] font-mono text-white truncate w-full">
                          {vid.url}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setPreviewVideoUrl(vid.url)}
                            className="px-3 py-1 bg-[#124903] text-white text-[10px] font-bold rounded-lg cursor-pointer hover:bg-[#0e3802]"
                          >
                            Preview
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(vid.url);
                              showToast(`Copied ${vid.url} to clipboard!`);
                            }}
                            className="px-3 py-1 bg-white/20 text-white text-[10px] font-bold rounded-lg cursor-pointer hover:bg-white/30"
                          >
                            Copy URL
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Uploaded Photos Section (if any) */}
            {uploadedVaultPhotos.length > 0 && (
              <div className="bg-[#1A1A1A] border border-[#124903]/30 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#124903]" />
                    <span>Uploaded Device Photos ({uploadedVaultPhotos.length})</span>
                  </h3>
                  <span className="text-xs font-mono text-[#124903]">Saved on Server &amp; Storage</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {uploadedVaultPhotos.map((photo, idx) => (
                    <div
                      key={`uploaded-photo-${photo}-${idx}`}
                      className="relative aspect-square rounded-2xl bg-stone-900 border border-[#124903]/40 overflow-hidden group shadow-md"
                    >
                      <Image
                        src={photo}
                        alt="Uploaded Photo"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center gap-1.5">
                        <span className="text-[9px] font-mono text-white truncate w-full">
                          {photo}
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(photo);
                            showToast(`Copied ${photo} to clipboard!`);
                          }}
                          className="px-2.5 py-1 bg-[#124903] text-white text-[10px] font-bold rounded cursor-pointer"
                        >
                          Copy Path
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10 Videos Stream */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Film className="w-4 h-4 text-[#124903]" />
                <span>Cinema Video Clips ({COLLECTION_VIDEOS.length})</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {COLLECTION_VIDEOS.map((vid, idx) => (
                  <div
                    key={vid}
                    className="relative aspect-video rounded-2xl bg-black border border-white/10 overflow-hidden group"
                  >
                    <video src={vid} muted playsInline loop className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                      <span className="text-[10px] font-mono text-white font-bold">Clip #{idx + 1}</span>
                      <button
                        onClick={() => setPreviewVideoUrl(vid)}
                        className="px-2.5 py-1 bg-[#124903] text-white text-[10px] font-bold rounded-lg cursor-pointer"
                      >
                        Play Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 59 Photos Grid */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#124903]" />
                <span>Authentic Dining Table Photos ({COLLECTION_PHOTOS.length})</span>
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-3">
                {COLLECTION_PHOTOS.map((photo) => (
                  <div
                    key={photo}
                    className="relative aspect-square rounded-2xl bg-stone-900 border border-white/10 overflow-hidden group"
                  >
                    <Image
                      src={photo}
                      alt="Vault Photo"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                      <span className="text-[9px] font-mono text-white truncate w-full mb-1">
                        {photo.replace('/collections/', '')}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(photo);
                          showToast(`Copied ${photo} to clipboard!`);
                        }}
                        className="px-2 py-1 bg-[#124903] text-white text-[9px] font-bold rounded cursor-pointer"
                      >
                        Copy Path
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODALS */}
      <ProductEditorModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={editingProduct}
        categories={categories}
        onSave={(data) => {
          if (editingProduct) {
            updateProduct(editingProduct.id, data);
            showToast(`Updated "${data.name}"`);
          } else {
            addProduct(data as any);
            showToast(`Published "${data.name}" to live catalog!`);
          }
        }}
      />

      <FilmEditorModal
        isOpen={isFilmModalOpen}
        onClose={() => setIsFilmModalOpen(false)}
        film={editingFilm}
        onSave={(data) => {
          if (editingFilm) {
            updateFilm(editingFilm.id, data);
            showToast(`Updated film chapter "${data.title}"`);
          } else {
            addFilm(data as any);
            showToast(`Added new film chapter "${data.title}"`);
          }
        }}
      />

      <CategoryEditorModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        category={editingCategory}
        onSave={(data) => {
          if (editingCategory) {
            updateCategory(editingCategory.id, data);
            showToast(`Updated category "${data.name}"`);
          } else {
            addCategory(data as any);
            showToast(`Created category "${data.name}"`);
          }
        }}
      />

      {/* Video Preview Modal */}
      <AnimatePresence>
        {previewVideoUrl && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewVideoUrl(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border border-white/20 z-10 shadow-2xl"
            >
              <div className="p-4 bg-[#1A1A1A] border-b border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-white">{previewVideoUrl}</span>
                <button
                  onClick={() => setPreviewVideoUrl(null)}
                  className="p-1 rounded-full text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-video w-full bg-black flex items-center justify-center">
                <video src={previewVideoUrl} controls autoPlay className="w-full h-full object-contain" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

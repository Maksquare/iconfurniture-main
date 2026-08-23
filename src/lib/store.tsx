'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, Category } from '@/types';
import { BrandSettings, DashboardStats } from '@/types/admin';
import { CinemaFilm } from '@/components/cinema/CinemaPlayer';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/mockData';
import { CINEMA_FILMS } from '@/components/cinema/CinemaClient';

const STORAGE_KEYS = {
  PRODUCTS: 'iconfurniture_store_products',
  CATEGORIES: 'iconfurniture_store_categories',
  FILMS: 'iconfurniture_store_films',
  BRAND_SETTINGS: 'iconfurniture_store_brand_settings',
  LAST_SYNC: 'iconfurniture_store_last_sync',
  DELETED_IDS: 'iconfurniture_store_deleted_ids',
};

export const DEFAULT_BRAND_SETTINGS: BrandSettings = {
  brand_name: 'ICON FURNITURE',
  tagline: 'Handmade Luxury Dining Tables',
  hero_headline: 'Dining Tables Crafted',
  hero_highlight_text: 'For Your Whole Family',
  hero_description:
    'Handmade luxury dining tables built from solid wood and natural marble stone. Built strong to last for generations in your home.',
  primary_color: '#869e32',
  secondary_color: '#1A1A1A',
  phone_primary: '0911-96-70-49',
  phone_secondary: '0910-05-11-51',
  telegram_url: 'https://t.me/join77BoleMarket',
  instagram_url: 'https://www.instagram.com/icon_furnituree?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  tiktok_url: 'https://www.tiktok.com/@iconfurniture3',
  facebook_url: 'https://web.facebook.com/profile.php?id=100063936008382',
  google_maps_url: 'https://maps.app.goo.gl/woqxA7cF31nP7J387?g_st=i&utm_campaign=ac-im',
  showroom_address: 'Bole Bulbula / ቦሌ ቡልቡላ, Addis Ababa, Ethiopia',
  announcement_enabled: true,
  announcement_text:
    'Free Delivery & Installation Across Addis Ababa • 100% Solid Natural Wood Dining Tables',
  developer_credit: 'AME PRIME - 0954944389',
  currency_symbol: 'ETB',
};

interface StoreContextType {
  products: Product[];
  categories: Category[];
  films: CinemaFilm[];
  brandSettings: BrandSettings;
  stats: DashboardStats;
  isLoaded: boolean;
  // Product actions
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductFeatured: (id: string) => void;
  toggleProductStock: (id: string) => void;
  // Category actions
  addCategory: (category: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  // Cinema actions
  addFilm: (film: Omit<CinemaFilm, 'id'>) => CinemaFilm;
  updateFilm: (id: string, film: Partial<CinemaFilm>) => void;
  deleteFilm: (id: string) => void;
  reorderFilms: (films: CinemaFilm[]) => void;
  // Settings & System actions
  updateBrandSettings: (settings: Partial<BrandSettings>) => void;
  resetToDefaults: () => void;
  exportBackupJson: () => string;
  importBackupJson: (jsonData: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [films, setFilms] = useState<CinemaFilm[]>(CINEMA_FILMS);
  const [brandSettings, setBrandSettings] = useState<BrandSettings>(DEFAULT_BRAND_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage on mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (savedCategories) setCategories(JSON.parse(savedCategories));

      const savedFilms = localStorage.getItem(STORAGE_KEYS.FILMS);
      if (savedFilms) setFilms(JSON.parse(savedFilms));

      const savedSettings = localStorage.getItem(STORAGE_KEYS.BRAND_SETTINGS);
      if (savedSettings) setBrandSettings(JSON.parse(savedSettings));
    } catch (e) {
      console.warn('Failed to load store data from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }

    // Hydrate latest data from server database asynchronously
    async function hydrateFromServer() {
      try {
        const [prodRes, catRes] = await Promise.allSettled([
          fetch('/api/products').then((r) => r.json()),
          fetch('/api/categories').then((r) => r.json()),
        ]);

        if (prodRes.status === 'fulfilled' && prodRes.value?.success && Array.isArray(prodRes.value.products)) {
          const serverProducts: Product[] = prodRes.value.products;
          if (serverProducts.length > 0) {
            // Load the set of IDs the user has deleted so we never re-add them
            let deletedIds: Set<string> = new Set();
            try {
              const raw = localStorage.getItem(STORAGE_KEYS.DELETED_IDS);
              if (raw) deletedIds = new Set(JSON.parse(raw));
            } catch {}

            setProducts((prev) => {
              // Filter out any server products the user already deleted
              const filteredServer = serverProducts.filter(
                (sp) => !deletedIds.has(sp.id) && !deletedIds.has(sp.slug)
              );
              const merged = filteredServer.map((sp) => {
                const localMatch = prev.find((lp) => lp.id === sp.id || lp.slug === sp.slug);
                if (localMatch) {
                  if ((!sp.images || sp.images.length === 0) && localMatch.images && localMatch.images.length > 0) {
                    sp.images = localMatch.images;
                  }
                  if ((!sp.gallery || sp.gallery.length === 0) && localMatch.gallery && localMatch.gallery.length > 0) {
                    sp.gallery = localMatch.gallery;
                  }
                }
                return sp;
              });
              const serverIds = new Set(merged.map((p) => p.id));
              const localCustom = prev.filter(
                (p) => !serverIds.has(p.id) && p.id.startsWith('prod-') && !deletedIds.has(p.id)
              );
              const finalMerged = [...localCustom, ...merged];
              try {
                localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(finalMerged));
              } catch {}
              return finalMerged;
            });
          }
        }

        if (catRes.status === 'fulfilled' && catRes.value?.success && Array.isArray(catRes.value.categories)) {
          const serverCategories: Category[] = catRes.value.categories;
          if (serverCategories.length > 0) {
            setCategories(serverCategories);
            try {
              localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(serverCategories));
            } catch {}
          }
        }
      } catch (err) {
        console.warn('Background database sync notice:', err);
      }
    }

    hydrateFromServer();
  }, []);

  // Listen for storage events across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.newValue) return;
      try {
        if (e.key === STORAGE_KEYS.PRODUCTS) setProducts(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEYS.CATEGORIES) setCategories(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEYS.FILMS) setFilms(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEYS.BRAND_SETTINGS) setBrandSettings(JSON.parse(e.newValue));
      } catch (err) {
        console.warn('Storage sync error:', err);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync to LocalStorage on updates
  const saveState = useCallback(
    (
      newProducts?: Product[],
      newCategories?: Category[],
      newFilms?: CinemaFilm[],
      newSettings?: BrandSettings
    ) => {
      if (!isLoaded || typeof window === 'undefined') return;
      try {
        if (newProducts) localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(newProducts));
        if (newCategories) localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(newCategories));
        if (newFilms) localStorage.setItem(STORAGE_KEYS.FILMS, JSON.stringify(newFilms));
        if (newSettings) localStorage.setItem(STORAGE_KEYS.BRAND_SETTINGS, JSON.stringify(newSettings));
        localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
      } catch (e) {
        console.error('Failed to save store state to localStorage:', e);
      }
    },
    [isLoaded]
  );

  // PRODUCT ACTIONS
  const addProduct = useCallback(
    (productData: Omit<Product, 'id'>): Product => {
      const tempId = `prod-${Date.now()}`;
      const newProduct: Product = {
        ...productData,
        id: tempId,
        created_at: new Date().toISOString(),
      };

      // 1. Instant local update
      setProducts((prev) => {
        const updated = [newProduct, ...prev];
        saveState(updated);
        return updated;
      });

      // 2. Background database persistence
      fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data?.success && data.product?.id && data.product.id !== tempId) {
            setProducts((prev) => {
              const updated = prev.map((p) => (p.id === tempId ? { ...p, id: data.product.id } : p));
              saveState(updated);
              return updated;
            });
          }
        })
        .catch((err) => {
          console.warn('Database background insert notice (persisted locally):', err);
        });

      return newProduct;
    },
    [saveState]
  );

  const updateProduct = useCallback(
    (id: string, changes: Partial<Product>) => {
      // 1. Instant local update
      setProducts((prev) => {
        const updated = prev.map((p) => (p.id === id ? { ...p, ...changes } : p));
        saveState(updated);
        return updated;
      });

      // 2. Background database update
      fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...changes }),
      }).catch((err) => {
        console.warn('Database background update notice:', err);
      });
    },
    [saveState]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      // 1. Persist deleted ID so hydrateFromServer never re-adds it
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.DELETED_IDS);
        const existing: string[] = raw ? JSON.parse(raw) : [];
        if (!existing.includes(id)) {
          localStorage.setItem(STORAGE_KEYS.DELETED_IDS, JSON.stringify([...existing, id]));
        }
      } catch {}

      // 2. Instant local update
      setProducts((prev) => {
        const updated = prev.filter((p) => p.id !== id && p.slug !== id);
        // Also record the slug in deleted IDs
        const deletedItem = prev.find((p) => p.id === id);
        if (deletedItem?.slug) {
          try {
            const raw = localStorage.getItem(STORAGE_KEYS.DELETED_IDS);
            const existing: string[] = raw ? JSON.parse(raw) : [];
            if (!existing.includes(deletedItem.slug)) {
              localStorage.setItem(
                STORAGE_KEYS.DELETED_IDS,
                JSON.stringify([...existing, deletedItem.slug])
              );
            }
          } catch {}
        }
        saveState(updated);
        return updated;
      });

      // 3. Server delete (fire-and-forget, but errors are logged)
      fetch(`/api/products?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      }).catch((err) => {
        console.warn('Database delete error:', err);
      });
    },
    [saveState]
  );

  const toggleProductFeatured = useCallback(
    (id: string) => {
      setProducts((prev) => {
        const target = prev.find((p) => p.id === id);
        const newFeatured = target ? !target.featured : false;
        const updated = prev.map((p) => (p.id === id ? { ...p, featured: newFeatured } : p));
        saveState(updated);

        // Sync to DB
        fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, featured: newFeatured }),
        }).catch(() => {});

        return updated;
      });
    },
    [saveState]
  );

  const toggleProductStock = useCallback(
    (id: string) => {
      setProducts((prev) => {
        const target = prev.find((p) => p.id === id);
        const newInStock = target ? !target.in_stock : false;
        const updated = prev.map((p) => (p.id === id ? { ...p, in_stock: newInStock } : p));
        saveState(updated);

        // Sync to DB
        fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, in_stock: newInStock }),
        }).catch(() => {});

        return updated;
      });
    },
    [saveState]
  );

  // CATEGORY ACTIONS
  const addCategory = useCallback(
    (categoryData: Omit<Category, 'id'>): Category => {
      const tempId = `cat-${Date.now()}`;
      const newCat: Category = {
        ...categoryData,
        id: tempId,
        created_at: new Date().toISOString(),
      };

      setCategories((prev) => {
        const updated = [...prev, newCat];
        saveState(undefined, updated);
        return updated;
      });

      // Sync to DB
      fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data?.success && data.category?.id && data.category.id !== tempId) {
            setCategories((prev) => {
              const updated = prev.map((c) => (c.id === tempId ? { ...c, id: data.category.id } : c));
              saveState(undefined, updated);
              return updated;
            });
          }
        })
        .catch(() => {});

      return newCat;
    },
    [saveState]
  );

  const updateCategory = useCallback(
    (id: string, changes: Partial<Category>) => {
      setCategories((prev) => {
        const updated = prev.map((c) => (c.id === id ? { ...c, ...changes } : c));
        saveState(undefined, updated);
        return updated;
      });

      fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...changes }),
      }).catch(() => {});
    },
    [saveState]
  );

  const deleteCategory = useCallback(
    (id: string) => {
      setCategories((prev) => {
        const updated = prev.filter((c) => c.id !== id);
        saveState(undefined, updated);
        return updated;
      });

      fetch(`/api/categories?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      }).catch(() => {});
    },
    [saveState]
  );

  // CINEMA ACTIONS
  const addFilm = useCallback(
    (filmData: Omit<CinemaFilm, 'id'>): CinemaFilm => {
      const newFilm: CinemaFilm = {
        ...filmData,
        id: `film-${Date.now()}`,
      };
      setFilms((prev) => {
        const updated = [...prev, newFilm];
        saveState(undefined, undefined, updated);
        return updated;
      });
      return newFilm;
    },
    [saveState]
  );

  const updateFilm = useCallback(
    (id: string, changes: Partial<CinemaFilm>) => {
      setFilms((prev) => {
        const updated = prev.map((f) => (f.id === id ? { ...f, ...changes } : f));
        saveState(undefined, undefined, updated);
        return updated;
      });
    },
    [saveState]
  );

  const deleteFilm = useCallback(
    (id: string) => {
      setFilms((prev) => {
        const updated = prev.filter((f) => f.id !== id);
        saveState(undefined, undefined, updated);
        return updated;
      });
    },
    [saveState]
  );

  const reorderFilms = useCallback(
    (reordered: CinemaFilm[]) => {
      setFilms(reordered);
      saveState(undefined, undefined, reordered);
    },
    [saveState]
  );

  // BRAND SETTINGS ACTIONS
  const updateBrandSettings = useCallback(
    (settings: Partial<BrandSettings>) => {
      setBrandSettings((prev) => {
        const updated = { ...prev, ...settings };
        saveState(undefined, undefined, undefined, updated);
        return updated;
      });
    },
    [saveState]
  );

  // RESET TO DEFAULTS
  const resetToDefaults = useCallback(() => {
    setProducts(MOCK_PRODUCTS);
    setCategories(MOCK_CATEGORIES);
    setFilms(CINEMA_FILMS);
    setBrandSettings(DEFAULT_BRAND_SETTINGS);

    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      localStorage.removeItem(STORAGE_KEYS.FILMS);
      localStorage.removeItem(STORAGE_KEYS.BRAND_SETTINGS);
      localStorage.removeItem(STORAGE_KEYS.DELETED_IDS);
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    }
  }, []);

  // EXPORT BACKUP
  const exportBackupJson = useCallback((): string => {
    const backupData = {
      version: '1.0.0',
      exported_at: new Date().toISOString(),
      products,
      categories,
      films,
      brandSettings,
    };
    return JSON.stringify(backupData, null, 2);
  }, [products, categories, films, brandSettings]);

  // IMPORT BACKUP
  const importBackupJson = useCallback(
    (jsonData: string): boolean => {
      try {
        const data = JSON.parse(jsonData);
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(data.products));
        }
        if (data.categories && Array.isArray(data.categories)) {
          setCategories(data.categories);
          localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(data.categories));
        }
        if (data.films && Array.isArray(data.films)) {
          setFilms(data.films);
          localStorage.setItem(STORAGE_KEYS.FILMS, JSON.stringify(data.films));
        }
        if (data.brandSettings) {
          setBrandSettings(data.brandSettings);
          localStorage.setItem(STORAGE_KEYS.BRAND_SETTINGS, JSON.stringify(data.brandSettings));
        }
        return true;
      } catch (err) {
        console.error('Failed to import backup JSON:', err);
        return false;
      }
    },
    []
  );

  // COMPUTED DASHBOARD STATS
  const stats: DashboardStats = {
    total_products: products.length,
    in_stock_count: products.filter((p) => p.in_stock).length,
    bespoke_count: products.filter((p) => !p.in_stock).length,
    featured_count: products.filter((p) => p.featured).length,
    total_categories: categories.length,
    total_films: films.length,
    films_count: films.length,
  };

  const value: StoreContextType = {
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
    reorderFilms,
    updateBrandSettings,
    resetToDefaults,
    exportBackupJson,
    importBackupJson,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export function useStore(): StoreContextType {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, Category } from '@/types';
import { CustomerInquiry, BrandSettings, DashboardStats } from '@/types/admin';
import { CinemaFilm } from '@/components/cinema/CinemaPlayer';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/mockData';
import { CINEMA_FILMS } from '@/components/cinema/CinemaClient';

const STORAGE_KEYS = {
  PRODUCTS: 'iconfurniture_store_products',
  CATEGORIES: 'iconfurniture_store_categories',
  FILMS: 'iconfurniture_store_films',
  INQUIRIES: 'iconfurniture_store_inquiries',
  BRAND_SETTINGS: 'iconfurniture_store_brand_settings',
  LAST_SYNC: 'iconfurniture_store_last_sync',
};

export const DEFAULT_BRAND_SETTINGS: BrandSettings = {
  brand_name: 'ICON FURNITURE',
  tagline: 'Master Handcrafted Luxury Dining Tables',
  hero_headline: 'Architectural Dining Tables',
  hero_highlight_text: 'Sculpted for Generations',
  hero_description:
    'Handcrafted kiln-dried solid hardwoods and honed Italian travertine dining tables. Custom-tailored in Addis Ababa for grand estates and modern residences.',
  primary_color: '#859F3C',
  secondary_color: '#1A1A1A',
  phone_primary: '0911-96-70-49',
  phone_secondary: '0910-05-11-51',
  telegram_url: 'https://t.me/join77BoleMarket',
  instagram_url: 'https://www.instagram.com/icon_furnituree?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  tiktok_url: 'https://www.tiktok.com/@iconfurniture3',
  facebook_url: 'https://web.facebook.com/profile.php?id=100063936008382',
  google_maps_url: 'https://maps.app.goo.gl/woqxA7cF31nP7J387?g_st=i&utm_campaign=ac-im',
  showroom_address: 'Bole Medhanialem, Addis Ababa, Ethiopia',
  announcement_enabled: true,
  announcement_text:
    'Complimentary White-Glove Dining Table Installation across Addis Ababa • Handcrafted Mortise & Tenon Joinery',
  developer_credit: 'AME PRIME - 0954944389',
  currency_symbol: 'ETB',
};

export const DEFAULT_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'inq-101',
    customer_name: 'Dawit Yohannes',
    phone: '0911-23-45-67',
    telegram: '@dawit_yoh',
    email: 'dawit.y@gmail.com',
    table_interest: 'Elysian Extendable Grand Banquet Table',
    seating_preference: '12-Seater (Extendable to 14)',
    custom_dimensions: '340cm L × 120cm W × 77cm H',
    estimated_budget_etb: 350000,
    status: 'production',
    notes: 'Selected smoked oak with brass cantilever accents. Delivery scheduled for Bole residence.',
    channel: 'website',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'inq-102',
    customer_name: 'Sara Mengistu',
    phone: '0912-88-99-00',
    telegram: '@saramengistu',
    email: 'sara.m@outlook.com',
    table_interest: 'Pavilion Round Gathering Dining Table',
    seating_preference: '8-Seater Round',
    custom_dimensions: '180cm Diameter × 76cm H',
    estimated_budget_etb: 185000,
    status: 'consultation',
    notes: 'Requested wood finish sample inspection before finalizing timber shade.',
    channel: 'telegram',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'inq-103',
    customer_name: 'Yonas Tadesse',
    phone: '0920-11-22-33',
    table_interest: 'Atelier Live-Edge Heritage Dining Table',
    seating_preference: '10-Seater Grand',
    custom_dimensions: '300cm L × 110cm W × 76cm H',
    estimated_budget_etb: 295000,
    status: 'design',
    notes: 'Solid single-slab walnut grain matching requested. CAD dimensions sent.',
    channel: 'phone',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 'inq-104',
    customer_name: 'Bethlehem Alemu',
    phone: '0913-44-55-66',
    instagram: '@bethlehem.alemu',
    table_interest: 'Vesper Nero Marquina Marble Dining Table',
    seating_preference: '8-Seater',
    custom_dimensions: '240cm L × 105cm W × 76cm H',
    estimated_budget_etb: 280000,
    status: 'new',
    notes: 'Inquired via Instagram story regarding marble vein patterns and sealing care.',
    channel: 'instagram',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'inq-105',
    customer_name: 'Dr. Henok Haile',
    phone: '0910-66-77-88',
    table_interest: 'Bespoke Grand Residence Feast Table',
    seating_preference: '16-Seater Executive Residence',
    custom_dimensions: '420cm L × 130cm W × 78cm H',
    estimated_budget_etb: 480000,
    status: 'completed',
    notes: 'Successfully installed with white-glove team at Old Airport villa. 5-star feedback received.',
    channel: 'phone',
    created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];

interface StoreContextType {
  products: Product[];
  categories: Category[];
  films: CinemaFilm[];
  inquiries: CustomerInquiry[];
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
  // Inquiry actions
  addInquiry: (inquiry: Omit<CustomerInquiry, 'id' | 'created_at' | 'updated_at'>) => CustomerInquiry;
  updateInquiryStatus: (id: string, status: CustomerInquiry['status'], notes?: string) => void;
  deleteInquiry: (id: string) => void;
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
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(DEFAULT_INQUIRIES);
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

      const savedInquiries = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (savedInquiries) setInquiries(JSON.parse(savedInquiries));

      const savedSettings = localStorage.getItem(STORAGE_KEYS.BRAND_SETTINGS);
      if (savedSettings) setBrandSettings(JSON.parse(savedSettings));
    } catch (e) {
      console.warn('Failed to load store data from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Listen for storage events across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.newValue) return;
      try {
        if (e.key === STORAGE_KEYS.PRODUCTS) setProducts(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEYS.CATEGORIES) setCategories(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEYS.FILMS) setFilms(JSON.parse(e.newValue));
        if (e.key === STORAGE_KEYS.INQUIRIES) setInquiries(JSON.parse(e.newValue));
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
      newInquiries?: CustomerInquiry[],
      newSettings?: BrandSettings
    ) => {
      if (!isLoaded || typeof window === 'undefined') return;
      try {
        if (newProducts) localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(newProducts));
        if (newCategories) localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(newCategories));
        if (newFilms) localStorage.setItem(STORAGE_KEYS.FILMS, JSON.stringify(newFilms));
        if (newInquiries) localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(newInquiries));
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
      const newProduct: Product = {
        ...productData,
        id: `prod-custom-${Date.now()}`,
        created_at: new Date().toISOString(),
      };
      setProducts((prev) => {
        const updated = [newProduct, ...prev];
        saveState(updated);
        return updated;
      });
      return newProduct;
    },
    [saveState]
  );

  const updateProduct = useCallback(
    (id: string, changes: Partial<Product>) => {
      setProducts((prev) => {
        const updated = prev.map((p) => (p.id === id ? { ...p, ...changes } : p));
        saveState(updated);
        return updated;
      });
    },
    [saveState]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      setProducts((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        saveState(updated);
        return updated;
      });
    },
    [saveState]
  );

  const toggleProductFeatured = useCallback(
    (id: string) => {
      setProducts((prev) => {
        const updated = prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p));
        saveState(updated);
        return updated;
      });
    },
    [saveState]
  );

  const toggleProductStock = useCallback(
    (id: string) => {
      setProducts((prev) => {
        const updated = prev.map((p) => (p.id === id ? { ...p, in_stock: !p.in_stock } : p));
        saveState(updated);
        return updated;
      });
    },
    [saveState]
  );

  // CATEGORY ACTIONS
  const addCategory = useCallback(
    (categoryData: Omit<Category, 'id'>): Category => {
      const newCat: Category = {
        ...categoryData,
        id: `cat-custom-${Date.now()}`,
        created_at: new Date().toISOString(),
      };
      setCategories((prev) => {
        const updated = [...prev, newCat];
        saveState(undefined, updated);
        return updated;
      });
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

  // INQUIRY ACTIONS
  const addInquiry = useCallback(
    (inquiryData: Omit<CustomerInquiry, 'id' | 'created_at' | 'updated_at'>): CustomerInquiry => {
      const now = new Date().toISOString();
      const newInq: CustomerInquiry = {
        ...inquiryData,
        id: `inq-${Date.now()}`,
        created_at: now,
        updated_at: now,
      };
      setInquiries((prev) => {
        const updated = [newInq, ...prev];
        saveState(undefined, undefined, undefined, updated);
        return updated;
      });
      return newInq;
    },
    [saveState]
  );

  const updateInquiryStatus = useCallback(
    (id: string, status: CustomerInquiry['status'], notes?: string) => {
      setInquiries((prev) => {
        const updated = prev.map((inq) =>
          inq.id === id
            ? {
                ...inq,
                status,
                notes: notes !== undefined ? notes : inq.notes,
                updated_at: new Date().toISOString(),
              }
            : inq
        );
        saveState(undefined, undefined, undefined, updated);
        return updated;
      });
    },
    [saveState]
  );

  const deleteInquiry = useCallback(
    (id: string) => {
      setInquiries((prev) => {
        const updated = prev.filter((inq) => inq.id !== id);
        saveState(undefined, undefined, undefined, updated);
        return updated;
      });
    },
    [saveState]
  );

  // BRAND SETTINGS ACTIONS
  const updateBrandSettings = useCallback(
    (changes: Partial<BrandSettings>) => {
      setBrandSettings((prev) => {
        const updated = { ...prev, ...changes };
        saveState(undefined, undefined, undefined, undefined, updated);
        return updated;
      });
    },
    [saveState]
  );

  // RESET & BACKUP ACTIONS
  const resetToDefaults = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      localStorage.removeItem(STORAGE_KEYS.FILMS);
      localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
      localStorage.removeItem(STORAGE_KEYS.BRAND_SETTINGS);
    }
    setProducts(MOCK_PRODUCTS);
    setCategories(MOCK_CATEGORIES);
    setFilms(CINEMA_FILMS);
    setInquiries(DEFAULT_INQUIRIES);
    setBrandSettings(DEFAULT_BRAND_SETTINGS);
  }, []);

  const exportBackupJson = useCallback((): string => {
    const backup = {
      version: '1.0',
      exported_at: new Date().toISOString(),
      products,
      categories,
      films,
      inquiries,
      brandSettings,
    };
    return JSON.stringify(backup, null, 2);
  }, [products, categories, films, inquiries, brandSettings]);

  const importBackupJson = useCallback(
    (jsonData: string): boolean => {
      try {
        const data = JSON.parse(jsonData);
        if (data.products) {
          setProducts(data.products);
          saveState(data.products);
        }
        if (data.categories) {
          setCategories(data.categories);
          saveState(undefined, data.categories);
        }
        if (data.films) {
          setFilms(data.films);
          saveState(undefined, undefined, data.films);
        }
        if (data.inquiries) {
          setInquiries(data.inquiries);
          saveState(undefined, undefined, undefined, data.inquiries);
        }
        if (data.brandSettings) {
          setBrandSettings(data.brandSettings);
          saveState(undefined, undefined, undefined, undefined, data.brandSettings);
        }
        return true;
      } catch (err) {
        console.error('Failed to import backup JSON:', err);
        return false;
      }
    },
    [saveState]
  );

  // COMPUTED STATS
  const stats: DashboardStats = {
    total_products: products.length,
    in_stock_count: products.filter((p) => p.in_stock).length,
    bespoke_count: products.filter((p) => !p.in_stock).length,
    featured_count: products.filter((p) => p.featured).length,
    total_categories: categories.length,
    total_films: films.length,
    total_inquiries: inquiries.length,
    active_commissions: inquiries.filter((inq) => inq.status !== 'completed' && inq.status !== 'archived').length,
    pipeline_value_etb: inquiries.reduce((sum, inq) => sum + (inq.estimated_budget_etb || 0), 0),
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        films,
        inquiries,
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
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateBrandSettings,
        resetToDefaults,
        exportBackupJson,
        importBackupJson,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

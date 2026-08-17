import { createClient } from '@/lib/supabase/server';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/mockData';
import { Category, Product } from '@/types';
import { readFile } from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'persisted_products.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'persisted_categories.json');

async function getStoredProducts(): Promise<Product[]> {
  try {
    const data = await readFile(PRODUCTS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Fallback
  }
  return MOCK_PRODUCTS;
}

async function getStoredCategories(): Promise<Category[]> {
  try {
    const data = await readFile(CATEGORIES_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Fallback
  }
  return MOCK_CATEGORIES;
}

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
      key &&
      !url.includes('your_supabase_project_url') &&
      !key.includes('your_supabase_anon_key')
  );
}

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) {
    return await getStoredCategories();
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (error || !data || data.length === 0) {
      return await getStoredCategories();
    }
    return data as Category[];
  } catch {
    return await getStoredCategories();
  }
}

export async function getProducts(options?: {
  categorySlug?: string;
  featuredOnly?: boolean;
}): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    let list = await getStoredProducts();
    const categories = await getStoredCategories();
    if (options?.featuredOnly) {
      list = list.filter((p) => p.featured);
    }
    if (options?.categorySlug && options.categorySlug !== 'all') {
      const cat = categories.find((c) => c.slug === options.categorySlug);
      if (cat) {
        list = list.filter((p) => p.category_id === cat.id);
      }
    }
    return list;
  }

  try {
    const supabase = await createClient();
    let query = supabase.from('products').select(`
      *,
      category:categories(*)
    `);

    if (options?.featuredOnly) {
      query = query.eq('featured', true);
    }

    if (options?.categorySlug && options.categorySlug !== 'all') {
      const { data: catData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', options.categorySlug)
        .single();

      if (catData) {
        query = query.eq('category_id', catData.id);
      }
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      let list = await getStoredProducts();
      const categories = await getStoredCategories();
      if (options?.featuredOnly) {
        list = list.filter((p) => p.featured);
      }
      if (options?.categorySlug && options.categorySlug !== 'all') {
        const cat = categories.find((c) => c.slug === options.categorySlug);
        if (cat) {
          list = list.filter((p) => p.category_id === cat.id);
        }
      }
      return list;
    }

    const stored = await getStoredProducts();
    const storedMap = new Map(stored.map((p) => [p.slug, p]));
    const enriched = (data as Product[]).map((p) => {
      const match = storedMap.get(p.slug) || stored.find((s) => s.id === p.id);
      if (match) {
        if ((!p.images || p.images.length === 0) && match.images && match.images.length > 0) {
          p.images = match.images;
        }
        if ((!p.gallery || p.gallery.length === 0) && match.gallery && match.gallery.length > 0) {
          p.gallery = match.gallery;
        }
      }
      return p;
    });

    return enriched;
  } catch {
    let list = await getStoredProducts();
    const categories = await getStoredCategories();
    if (options?.featuredOnly) {
      list = list.filter((p) => p.featured);
    }
    if (options?.categorySlug && options.categorySlug !== 'all') {
      const cat = categories.find((c) => c.slug === options.categorySlug);
      if (cat) {
        list = list.filter((p) => p.category_id === cat.id);
      }
    }
    return list;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    const products = await getStoredProducts();
    const found = products.find((p) => p.slug === slug || p.id === slug);
    return found || null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('slug', slug)
      .single();

    if (error || !data) {
      const products = await getStoredProducts();
      return products.find((p) => p.slug === slug || p.id === slug) || null;
    }

    const product = data as Product;
    const stored = await getStoredProducts();
    const match = stored.find((p) => p.slug === slug || p.id === product.id);
    if (match) {
      if ((!product.images || product.images.length === 0) && match.images && match.images.length > 0) {
        product.images = match.images;
      }
      if ((!product.gallery || product.gallery.length === 0) && match.gallery && match.gallery.length > 0) {
        product.gallery = match.gallery;
      }
    }

    return product;
  } catch {
    const products = await getStoredProducts();
    return products.find((p) => p.slug === slug || p.id === slug) || null;
  }
}

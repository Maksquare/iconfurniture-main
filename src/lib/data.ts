import { createClient } from '@/lib/supabase/server';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/mockData';
import { Category, Product } from '@/types';

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
    return MOCK_CATEGORIES;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (error || !data || data.length === 0) {
      return MOCK_CATEGORIES;
    }
    return data as Category[];
  } catch (err) {
    console.warn('Falling back to mock categories:', err);
    return MOCK_CATEGORIES;
  }
}

export async function getProducts(options?: {
  categorySlug?: string;
  featuredOnly?: boolean;
}): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    let list = [...MOCK_PRODUCTS];
    if (options?.featuredOnly) {
      list = list.filter((p) => p.featured);
    }
    if (options?.categorySlug && options.categorySlug !== 'all') {
      const cat = MOCK_CATEGORIES.find((c) => c.slug === options.categorySlug);
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
      return MOCK_PRODUCTS;
    }
    return data as Product[];
  } catch (err) {
    console.warn('Falling back to mock products:', err);
    return MOCK_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    const found = MOCK_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
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
      // Fallback search in mock data if slug not found in DB
      return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
    }
    return data as Product;
  } catch (err) {
    console.warn('Falling back to mock product lookup:', err);
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
  }
}

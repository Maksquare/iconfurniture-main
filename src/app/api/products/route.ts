import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mockData';
import { Product } from '@/types';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'persisted_products.json');

async function getStoredProducts(): Promise<Product[]> {
  try {
    const data = await readFile(PRODUCTS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // File doesn't exist yet, return initial mock products
  }
  return MOCK_PRODUCTS;
}

async function saveStoredProducts(products: Product[]): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write persisted products file:', err);
  }
}

// GET: Fetch all products (Supabase -> Local JSON -> Mock)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get('category');
    const featuredOnly = searchParams.get('featured') === 'true';

    // 1. Try Supabase
    try {
      const supabase = await createClient();
      let query = supabase.from('products').select(`*, category:categories(*)`);

      if (featuredOnly) {
        query = query.eq('featured', true);
      }

      if (categorySlug && categorySlug !== 'all') {
        const { data: catData } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', categorySlug)
          .single();

        if (catData) {
          query = query.eq('category_id', catData.id);
        }
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, source: 'supabase', products: data });
      }
    } catch {
      // Supabase unavailable, fallback to file storage
    }

    // 2. Fallback to Local Persistent File Storage
    let list = await getStoredProducts();

    if (featuredOnly) {
      list = list.filter((p) => p.featured);
    }
    if (categorySlug && categorySlug !== 'all') {
      const cat = MOCK_CATEGORIES.find((c) => c.slug === categorySlug);
      if (cat) {
        list = list.filter((p) => p.category_id === cat.id);
      }
    }

    return NextResponse.json({ success: true, source: 'filesystem', products: list });
  } catch (err) {
    console.error('Error fetching products:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products', products: MOCK_PRODUCTS },
      { status: 500 }
    );
  }
}

// POST: Add new product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      slug,
      description = '',
      price = 0,
      category_id,
      category,
      image_url,
      images = [],
      dimensions = '',
      materials = '',
      in_stock = true,
      featured = false,
    } = body;

    if (!name || !image_url) {
      return NextResponse.json(
        { success: false, error: 'Product name and primary image are required' },
        { status: 400 }
      );
    }

    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const now = new Date().toISOString();
    const newProduct: Product = {
      id: body.id || `prod-${Date.now()}`,
      name,
      slug: finalSlug,
      description,
      price: Number(price),
      category_id: category_id || (category?.id || 'c1'),
      category: category || MOCK_CATEGORIES.find((c) => c.id === category_id),
      image_url,
      images,
      dimensions,
      materials,
      in_stock: Boolean(in_stock),
      featured: Boolean(featured),
      created_at: now,
    };

    // 1. Try writing to Supabase Database
    try {
      const supabase = await createClient();
      const dbPayload = {
        name: newProduct.name,
        slug: newProduct.slug,
        description: newProduct.description,
        price: newProduct.price,
        category_id: newProduct.category_id.startsWith('c') ? null : newProduct.category_id,
        image_url: newProduct.image_url,
        in_stock: newProduct.in_stock,
        featured: newProduct.featured,
        dimensions: newProduct.dimensions,
        materials: newProduct.materials,
      };

      const { data, error } = await supabase.from('products').insert(dbPayload).select().single();
      if (!error && data) {
        newProduct.id = data.id;
      }
    } catch {
      // Supabase optional
    }

    // 2. Persist to local JSON database storage
    const currentProducts = await getStoredProducts();
    const updatedProducts = [newProduct, ...currentProducts.filter((p) => p.id !== newProduct.id && p.slug !== newProduct.slug)];
    await saveStoredProducts(updatedProducts);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (err: unknown) {
    console.error('Error creating product:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Failed to save product' },
      { status: 500 }
    );
  }
}

// PUT: Update existing product
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...changes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 });
    }

    // 1. Try updating Supabase
    try {
      const supabase = await createClient();
      const dbChanges: Record<string, unknown> = {};
      if (changes.name !== undefined) dbChanges.name = changes.name;
      if (changes.slug !== undefined) dbChanges.slug = changes.slug;
      if (changes.description !== undefined) dbChanges.description = changes.description;
      if (changes.price !== undefined) dbChanges.price = Number(changes.price);
      if (changes.image_url !== undefined) dbChanges.image_url = changes.image_url;
      if (changes.in_stock !== undefined) dbChanges.in_stock = Boolean(changes.in_stock);
      if (changes.featured !== undefined) dbChanges.featured = Boolean(changes.featured);
      if (changes.dimensions !== undefined) dbChanges.dimensions = changes.dimensions;
      if (changes.materials !== undefined) dbChanges.materials = changes.materials;

      await supabase.from('products').update(dbChanges).eq('id', id);
    } catch {
      // Supabase optional
    }

    // 2. Update local JSON storage
    const currentProducts = await getStoredProducts();
    const updatedProducts = currentProducts.map((p) => (p.id === id ? { ...p, ...changes } : p));
    await saveStoredProducts(updatedProducts);

    return NextResponse.json({ success: true, id, changes });
  } catch (err: unknown) {
    console.error('Error updating product:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE: Delete product by ID
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 });
    }

    // 1. Try deleting from Supabase
    try {
      const supabase = await createClient();
      await supabase.from('products').delete().eq('id', id);
    } catch {
      // Supabase optional
    }

    // 2. Update local JSON storage
    const currentProducts = await getStoredProducts();
    const updatedProducts = currentProducts.filter((p) => p.id !== id);
    await saveStoredProducts(updatedProducts);

    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    console.error('Error deleting product:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Failed to delete product' },
      { status: 500 }
    );
  }
}

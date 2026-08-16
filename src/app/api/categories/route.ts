import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { MOCK_CATEGORIES } from '@/lib/mockData';
import { Category } from '@/types';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const CATEGORIES_FILE = path.join(DATA_DIR, 'persisted_categories.json');

async function getStoredCategories(): Promise<Category[]> {
  try {
    const data = await readFile(CATEGORIES_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Return mock categories if file doesn't exist
  }
  return MOCK_CATEGORIES;
}

async function saveStoredCategories(categories: Category[]): Promise<void> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write persisted categories file:', err);
  }
}

// GET: Fetch all categories
export async function GET() {
  try {
    // 1. Try Supabase
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.from('categories').select('*').order('name');
      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, source: 'supabase', categories: data });
      }
    } catch {
      // Fallback
    }

    // 2. Fallback to file storage
    const categories = await getStoredCategories();
    return NextResponse.json({ success: true, source: 'filesystem', categories });
  } catch (err) {
    console.error('Error fetching categories:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories', categories: MOCK_CATEGORIES },
      { status: 500 }
    );
  }
}

// POST: Add new category
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: 'Category name is required' }, { status: 400 });
    }

    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newCategory: Category = {
      id: body.id || `cat-${Date.now()}`,
      name,
      slug: finalSlug,
      created_at: new Date().toISOString(),
    };

    // 1. Try Supabase
    try {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('categories')
        .insert({ name: newCategory.name, slug: newCategory.slug })
        .select()
        .single();

      if (!error && data) {
        newCategory.id = data.id;
      }
    } catch {
      // Supabase optional
    }

    // 2. File storage
    const current = await getStoredCategories();
    const updated = [...current.filter((c) => c.id !== newCategory.id), newCategory];
    await saveStoredCategories(updated);

    return NextResponse.json({ success: true, category: newCategory });
  } catch (err: unknown) {
    console.error('Error creating category:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Failed to save category' },
      { status: 500 }
    );
  }
}

// PUT: Update category
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...changes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Category ID is required' }, { status: 400 });
    }

    // 1. Try Supabase
    try {
      const supabase = await createClient();
      await supabase.from('categories').update(changes).eq('id', id);
    } catch {
      // Supabase optional
    }

    // 2. File storage
    const current = await getStoredCategories();
    const updated = current.map((c) => (c.id === id ? { ...c, ...changes } : c));
    await saveStoredCategories(updated);

    return NextResponse.json({ success: true, id, changes });
  } catch (err: unknown) {
    console.error('Error updating category:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE: Delete category
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Category ID is required' }, { status: 400 });
    }

    // 1. Try Supabase
    try {
      const supabase = await createClient();
      await supabase.from('categories').delete().eq('id', id);
    } catch {
      // Supabase optional
    }

    // 2. File storage
    const current = await getStoredCategories();
    const updated = current.filter((c) => c.id !== id);
    await saveStoredCategories(updated);

    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    console.error('Error deleting category:', err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Failed to delete category' },
      { status: 500 }
    );
  }
}

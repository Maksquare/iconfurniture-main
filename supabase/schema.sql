-- ==============================================================================
-- ICON FURNITURE — Complete Supabase Database Schema & Setup Script
-- Paste this entire script into your Supabase Dashboard -> SQL Editor and click "Run"
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. PRODUCTS TABLE (Dining Tables)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    image_url TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    in_stock BOOLEAN DEFAULT true NOT NULL,
    featured BOOLEAN DEFAULT false NOT NULL,
    dimensions TEXT DEFAULT '',
    materials TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- If table already existed without `images` column, ensure it is added safely:
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'products' 
        AND column_name = 'images'
    ) THEN
        ALTER TABLE public.products ADD COLUMN images TEXT[] DEFAULT '{}';
    END IF;
END $$;

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
    total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
    shipping_address JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE RESTRICT NOT NULL,
    quantity INTEGER DEFAULT 1 CHECK (quantity > 0) NOT NULL,
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- CATEGORIES: Full Read/Write access
DROP POLICY IF EXISTS "Allow public read access for categories" ON public.categories;
CREATE POLICY "Allow public read access for categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert for categories" ON public.categories;
CREATE POLICY "Allow public insert for categories" ON public.categories FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update for categories" ON public.categories;
CREATE POLICY "Allow public update for categories" ON public.categories FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete for categories" ON public.categories;
CREATE POLICY "Allow public delete for categories" ON public.categories FOR DELETE USING (true);

-- PRODUCTS: Full Read/Write access
DROP POLICY IF EXISTS "Allow public read access for products" ON public.products;
CREATE POLICY "Allow public read access for products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert for products" ON public.products;
CREATE POLICY "Allow public insert for products" ON public.products FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update for products" ON public.products;
CREATE POLICY "Allow public update for products" ON public.products FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete for products" ON public.products;
CREATE POLICY "Allow public delete for products" ON public.products FOR DELETE USING (true);

-- ORDERS: Read & Create access
DROP POLICY IF EXISTS "Allow public insert for orders" ON public.orders;
CREATE POLICY "Allow public insert for orders" ON public.orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read access for orders" ON public.orders;
CREATE POLICY "Allow public read access for orders" ON public.orders FOR SELECT USING (true);

-- ORDER ITEMS: Read & Create access
DROP POLICY IF EXISTS "Allow public insert for order items" ON public.order_items;
CREATE POLICY "Allow public insert for order items" ON public.order_items FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read access for order items" ON public.order_items;
CREATE POLICY "Allow public read access for order items" ON public.order_items FOR SELECT USING (true);

-- ==============================================================================
-- 7. INITIAL SEED DATA (Populates default dining table collections & products)
-- ==============================================================================

-- Insert Categories
INSERT INTO public.categories (name, slug)
VALUES
    ('Solid Hardwood Tables', 'solid-hardwood'),
    ('Stone & Marble Tables', 'stone-marble'),
    ('Round & Gathering Tables', 'round-gathering'),
    ('Sculptural Pedestal Tables', 'sculptural-pedestal'),
    ('Extendable & Grand Tables', 'extendable-grand')
ON CONFLICT (slug) DO NOTHING;

-- Insert Flagship Dining Tables
INSERT INTO public.products (name, slug, description, price, category_id, image_url, images, in_stock, featured, dimensions, materials)
SELECT
    'Kanso Organic Walnut Dining Table',
    'kanso-organic-walnut-dining-table',
    'Mastercrafted from sustainably sourced solid American Walnut. The Kanso dining centerpiece highlights continuous timber grain movement, softened organic bevel edges, and precision joinery.',
    185000,
    (SELECT id FROM public.categories WHERE slug = 'solid-hardwood' LIMIT 1),
    '/collections/if001.jpg',
    ARRAY['/collections/if002.jpg', '/collections/if003.jpg', '/collections/if004.jpg'],
    true,
    true,
    '260cm L x 105cm W x 76cm H | 8-Seater',
    '100% Solid Kiln-Dried American Walnut, Natural Botanical Oil Finish'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'kanso-organic-walnut-dining-table');

INSERT INTO public.products (name, slug, description, price, category_id, image_url, images, in_stock, featured, dimensions, materials)
SELECT
    'Pavilion Round Gathering Dining Table',
    'pavilion-round-gathering-dining-table',
    'An intimate circular dining table designed to bring family together. Features a radial sunburst timber layout atop an architectural fluted conical pedestal base.',
    165000,
    (SELECT id FROM public.categories WHERE slug = 'round-gathering' LIMIT 1),
    '/collections/if005.jpg',
    ARRAY['/collections/if006.jpg', '/collections/if007.jpg', '/collections/if008.jpg'],
    true,
    true,
    '160cm Diameter x 76cm H | 6-8 Seater',
    'Solid White Oak, Precision Turned Pedestal Core, Natural Matte Finish'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'pavilion-round-gathering-dining-table');

INSERT INTO public.products (name, slug, description, price, category_id, image_url, images, in_stock, featured, dimensions, materials)
SELECT
    'Lumina Travertine & Smoked Oak Dining Table',
    'lumina-travertine-smoked-oak-dining-table',
    'Monumental dining architecture blending a hand-honed porous Italian Travertine stone tabletop with heavy smoked solid oak trestle supports and brushed brass accents.',
    245000,
    (SELECT id FROM public.categories WHERE slug = 'stone-marble' LIMIT 1),
    '/collections/if009.jpg',
    ARRAY['/collections/if010.jpg', '/collections/if011.jpg', '/collections/if012.jpg'],
    true,
    true,
    '280cm L x 110cm W x 76cm H | 10-Seater',
    'Hand-Honed Italian Travertine Slab, Solid Smoked Oak, Solid Brass Accents'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'lumina-travertine-smoked-oak-dining-table');

INSERT INTO public.products (name, slug, description, price, category_id, image_url, images, in_stock, featured, dimensions, materials)
SELECT
    'Vesper Nero Marquina Marble Table',
    'vesper-nero-marquina-marble-table',
    'Deep midnight Nero Marquina marble with stark white natural lightning veins, paired with architectural twin fluted oak pillar columns.',
    280000,
    (SELECT id FROM public.categories WHERE slug = 'stone-marble' LIMIT 1),
    '/collections/if013.jpg',
    ARRAY['/collections/if014.jpg', '/collections/if015.jpg', '/collections/if016.jpg'],
    true,
    true,
    '240cm L x 105cm W x 76cm H | 8-Seater',
    'Solid Nero Marquina Marble Slab (Beveled Edge), Kiln-Dried Solid Hardwood'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'vesper-nero-marquina-marble-table');

INSERT INTO public.products (name, slug, description, price, category_id, image_url, images, in_stock, featured, dimensions, materials)
SELECT
    'Elysian Extendable Grand Banquet Table',
    'elysian-extendable-grand-banquet-table',
    'A transformative dining table with smooth hidden central extension leaves. Expands effortlessly from an intimate 8-seat configuration to a magnificent 14-seat banquet table.',
    310000,
    (SELECT id FROM public.categories WHERE slug = 'extendable-grand' LIMIT 1),
    '/collections/if017.jpg',
    ARRAY['/collections/if018.jpg', '/collections/if019.jpg', '/collections/if020.jpg'],
    true,
    true,
    '240cm to 340cm L x 115cm W x 77cm H | 8 to 14 Seater',
    'Solid White Oak with Smoked Grain, German Engineered Aluminum Extension Rails'
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'elysian-extendable-grand-banquet-table');

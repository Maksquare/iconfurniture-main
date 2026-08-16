-- Seed Data for Iconfurniture Supabase Database

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Seating', 'seating'),
  ('c2000000-0000-0000-0000-000000000002', 'Tables', 'tables'),
  ('c3000000-0000-0000-0000-000000000003', 'Storage & Shelving', 'storage'),
  ('c4000000-0000-0000-0000-000000000004', 'Lighting', 'lighting')
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Products
INSERT INTO public.products (id, name, slug, description, price, category_id, image_url, in_stock, featured, dimensions, materials) VALUES
  (
    'p1000000-0000-0000-0000-000000000001',
    'Aura Velvet Accent Armchair',
    'aura-velvet-accent-armchair',
    'Sculptural accent chair featuring plush velvet upholstery over a solid oak frame. Ergonomically contoured for effortless lounge comfort with timeless editorial warmth.',
    1250.00,
    'c1000000-0000-0000-0000-000000000001',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85',
    true,
    true,
    'W 34" x D 32" x H 30" | Seat H 17"',
    'Solid White Oak, Italian Cotton Velvet, High-Density Foam'
  ),
  (
    'p2000000-0000-0000-0000-000000000002',
    'Kanso Organic Walnut Dining Table',
    'kanso-organic-walnut-dining-table',
    'Crafted from sustainably sourced solid American Walnut, the Kanso table highlights natural wood grain movement with rounded bevel edges and soft tapered legs.',
    2890.00,
    'c2000000-0000-0000-0000-000000000002',
    'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
    true,
    true,
    'L 84" x W 38" x H 30"',
    '100% Solid American Walnut, Matte Hardwax Oil Finish'
  ),
  (
    'p3000000-0000-0000-0000-000000000003',
    'Mirei Bouclé Modular Sofa',
    'mirei-boucle-modular-sofa',
    'Extravagant cloud-like seating upholstered in soft ivory tactile bouclé fabric. Deep proportions designed for relaxed formal hosting or quiet evenings.',
    3450.00,
    'c1000000-0000-0000-0000-000000000001',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
    true,
    true,
    'W 108" x D 42" x H 28" | Seat H 16.5"',
    'Textured Wool-Blend Bouclé, Feather & Down Fill, Kiln-Dried Hardwood'
  ),
  (
    'p4000000-0000-0000-0000-000000000004',
    'Lumina Travertine Floor Lamp',
    'lumina-travertine-floor-lamp',
    'Architectural monolith floor light anchored by a carved natural travertine stone base with brushed warm brass hardware and hand-loomed linen shade.',
    780.00,
    'c4000000-0000-0000-0000-000000000004',
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
    true,
    false,
    'Base Dia 12" x H 64" | Shade Dia 18"',
    'Honed Italian Travertine, Antique Brass, Natural Linen'
  ),
  (
    'p5000000-0000-0000-0000-000000000005',
    'Solstice Credenza Sideboard',
    'solstice-credenza-sideboard',
    'Mid-century minimalist sideboard featuring fluted tambour oak sliding doors, brass hardware details, and integrated cable management for media or dining storage.',
    2150.00,
    'c3000000-0000-0000-0000-000000000003',
    'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
    true,
    true,
    'W 72" x D 19" x H 31"',
    'Oak Veneer, Solid Oak Tambour, Soft-Close Brass Hinges'
  ),
  (
    'p6000000-0000-0000-0000-000000000006',
    'Brutalist Smoked Glass Coffee Table',
    'brutalist-smoked-glass-coffee-table',
    'Thick tempered smoked glass resting atop twin sculptural cast-concrete pedestal blocks. A bold center fixture for contemporary living rooms.',
    1420.00,
    'c2000000-0000-0000-0000-000000000002',
    'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85',
    true,
    false,
    'L 52" x W 32" x H 14"',
    '12mm Tempered Smoked Glass, Sealed Architectural Concrete Base'
  )
ON CONFLICT (slug) DO NOTHING;

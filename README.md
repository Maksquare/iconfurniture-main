# Iconfurniture — Upscale Furniture E-Commerce Platform

An editorial luxury furniture e-commerce platform built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Motion**, and **Supabase (SSR)**.

![Iconfurniture Preview](https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85)

---

## 🚀 Core Tech Stack

- **Framework**: Next.js (App Router, TypeScript, React 19)
- **Styling**: Tailwind CSS with custom warm-neutral editorial design system
- **Animations**: `motion` (Framer Motion v12) for smooth entrance & micro-interactions
- **Database & Auth**: Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- **Icons**: Lucide React

---

## 🛠️ Project Structure

```text
iconfurniture/
├── .env.local                  # Environment credentials placeholder
├── .env.example                # Example environment variables setup
├── README.md                   # Documentation & setup guide
├── supabase/
│   ├── schema.sql              # Database schema tables & RLS policies
│   └── seed.sql                # Seed data for categories & furniture items
└── src/
    ├── app/
    │   ├── layout.tsx          # Root layout with fonts, Navbar, Footer, CartProvider
    │   ├── page.tsx            # Homepage with Motion hero & featured catalog
    │   ├── globals.css         # Global styles & design system tokens
    │   └── shop/
    │       ├── page.tsx        # Shop catalog with search, category tabs & sorting
    │       └── [slug]/
    │           └── page.tsx    # Dynamic product detail page & specifications
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx      # Editorial header with responsive search & cart badge
    │   │   └── Footer.tsx      # Brand story footer & Gazette subscription form
    │   ├── cart/
    │   │   ├── CartContext.tsx # React Context for cart state management & persistence
    │   │   └── CartDrawer.tsx  # Motion-animated slide-over cart panel
    │   ├── home/
    │   │   ├── Hero.tsx        # Motion animated hero banner
    │   │   ├── Categories.tsx  # Featured category cards
    │   │   ├── BrandStory.tsx  # Editorial design philosophy
    │   │   └── Features.tsx    # Value props (Craftsmanship, Delivery, Warranty)
    │   └── shop/
    │       ├── ProductCard.tsx # Animated product card with quick-add
    │       ├── ProductGrid.tsx # Responsive catalog grid
    │       └── ShopClient.tsx  # Client-side filtering & sorting engine
    ├── lib/
    │   ├── supabase/
    │   │   ├── client.ts       # Browser Supabase client (@supabase/ssr)
    │   │   ├── server.ts       # Server Supabase client (@supabase/ssr)
    │   │   └── middleware.ts   # Auth session refresh middleware
    │   ├── data.ts             # Hybrid data access layer (Supabase + Mock fallback)
    │   └── mockData.ts         # High-resolution sample furniture database
    ├── middleware.ts           # Next.js middleware for Supabase session management
    └── types/
        ├── database.types.ts   # Supabase DB definitions
        └── index.ts            # Domain types (Product, Category, CartItem)
```

---

## ⚡ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase Credentials

1. Create a free project at [Supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

3. Update `.env.local` with your project URL and Anon API key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
```

> **Note**: If Supabase environment variables are left as placeholders, the application will automatically run in **Mock Data Fallback Mode**, presenting the full catalog without errors.

---

## 🗄️ Supabase Database Migration & Seeding

### Method A: Via Supabase Dashboard (SQL Editor)

1. Open your Supabase Dashboard -> **SQL Editor**.
2. Run the contents of `supabase/schema.sql` to create tables (`categories`, `products`, `orders`, `order_items`) and set Row-Level Security (RLS) policies.
3. Run the contents of `supabase/seed.sql` to populate sample categories and luxury furniture products.

### Method B: Via Supabase CLI

```bash
npx supabase db reset
```

---

## 💻 Running Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore **Iconfurniture**.

---

## 🛠️ Verification & Build Commands

- Build production bundle: `npm run build`
- Run linting: `npm run lint`

---

Developed By - **AME PRIME**

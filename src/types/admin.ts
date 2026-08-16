import { Category, Product } from '@/types';
import { CinemaFilm } from '@/components/cinema/CinemaPlayer';

export type InquiryStatus =
  | 'new'
  | 'consultation'
  | 'design'
  | 'production'
  | 'completed'
  | 'archived';

export interface CustomerInquiry {
  id: string;
  customer_name: string;
  phone: string;
  telegram?: string;
  instagram?: string;
  email?: string;
  table_interest: string;
  seating_preference: string;
  custom_dimensions?: string;
  estimated_budget_etb?: number;
  status: InquiryStatus;
  notes?: string;
  channel: 'website' | 'telegram' | 'phone' | 'instagram';
  created_at: string;
  updated_at: string;
}

export interface BrandSettings {
  brand_name: string;
  tagline: string;
  hero_headline: string;
  hero_highlight_text: string;
  hero_description: string;
  primary_color: string;
  secondary_color: string;
  phone_primary: string;
  phone_secondary: string;
  telegram_url: string;
  instagram_url: string;
  tiktok_url: string;
  facebook_url: string;
  google_maps_url: string;
  showroom_address: string;
  announcement_enabled: boolean;
  announcement_text: string;
  developer_credit: string;
  currency_symbol: string;
}

export interface DashboardStats {
  total_products: number;
  in_stock_count: number;
  bespoke_count: number;
  featured_count: number;
  total_categories: number;
  total_films: number;
  films_count: number;
}

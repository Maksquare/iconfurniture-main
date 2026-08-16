export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category_id: string;
  category?: Category;
  image_url: string;
  in_stock: boolean;
  featured?: boolean;
  dimensions?: string;
  materials?: string;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFinish?: string;
}

export interface Order {
  id: string;
  user_id?: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total_amount: number;
  shipping_address?: Record<string, unknown>;
  created_at?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  created_at?: string;
}

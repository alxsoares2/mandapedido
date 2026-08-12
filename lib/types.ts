// Types para o projeto MandaPedido

export interface Brand {
  id: string;
  name: string;
  slug: string;
  color: string;
  image: string;
}

export interface Totem {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  brand: string;
  available: boolean;
}

export interface CartItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  totem_name: string;
  items: CartItem[];
  total: number;
  status: string;
  source: 'totem' | 'website';
  payment_method: 'pix' | 'credit_card';
  created_at: string;
}

export interface KioskState {
  isActive: boolean;
  lastInteraction: number;
  timeoutSeconds: number;
}

import type { Product } from './Product';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface CartSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  itemCount: number;
}

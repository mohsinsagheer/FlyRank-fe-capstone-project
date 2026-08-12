export type ProductCategory = 
  | 'all'
  | 'electronics'
  | 'laptops'
  | 'boots'
  | 'bluetooth'
  | 'hair-care'
  | 'sports';

export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice: number;
  rating: ProductRating;
  image: string;
  gallery?: string[];
  description: string;
  specifications: Record<string, string>;
  isExclusive: boolean;
  inStock: boolean;
  brand: string;
  discountPercentage: number;
  badge?: string;
}

export interface ExclusiveDeal {
  id: string;
  productId: string;
  title: string;
  subtitle: string;
  bannerImage: string;
  discountBadge: string;
  originalPrice: number;
  dealPrice: number;
  timerHours: number;
  timerMinutes: number;
  timerSeconds: number;
  featureBullets: string[];
}

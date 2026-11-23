export type ProductCategory = 
  | 'Clothing'
  | 'Toys'
  | 'Baby care'
  | 'Feeding'
  | 'Nursery'
  | 'Baby gear'
  | 'Footwear'
  | 'Books'
  | 'Mom & maternity'
  | 'School supplies'
  | 'Safety'
  | 'Outdoor';

export type AgeGroup = 
  | '0–3 months'
  | '3–6 months'
  | '6–12 months'
  | '1–2 years'
  | '2–4 years'
  | '4–6 years'
  | '6+ years';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;
  subcategory: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  ageRange: AgeGroup | string;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  tags: string[];
  specifications: Record<string, string>;
  shippingInfo: string;
  highlights?: string[];
  ecoFriendly?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import brandsData from '@/data/brands.json';
import { Product, ProductCategory } from '@/types/product';
import { CategoryInfo, BrandInfo } from '@/types/category';

const products: Product[] = productsData as unknown as Product[];
const categories: CategoryInfo[] = categoriesData as CategoryInfo[];
const brands: BrandInfo[] = brandsData as BrandInfo[];

// Canonical mapping table matching all possible slugs, display names, and subcategory terms
const CATEGORY_MAP: Record<string, ProductCategory> = {
  // Clothing
  'clothing': 'Clothing',
  'baby-clothing': 'Clothing',
  'baby clothing': 'Clothing',
  'apparel': 'Clothing',
  'sleepwear': 'Clothing',
  'rompers': 'Clothing',
  
  // Toys
  'toys': 'Toys',
  'toys-play': 'Toys',
  'toys & play': 'Toys',
  'toys and play': 'Toys',
  'play': 'Toys',
  'wooden toys': 'Toys',
  'montessori': 'Toys',
  
  // Baby Care
  'baby-care': 'Baby care',
  'baby care': 'Baby care',
  'care': 'Baby care',
  'bath': 'Baby care',
  'botanical care': 'Baby care',
  
  // Feeding
  'feeding': 'Feeding',
  'feeding-nursing': 'Feeding',
  'feeding & nursing': 'Feeding',
  'feeding and nursing': 'Feeding',
  'nursing': 'Feeding',
  'tableware': 'Feeding',
  
  // Nursery
  'nursery': 'Nursery',
  'nursery-decor': 'Nursery',
  'nursery & decor': 'Nursery',
  'nursery and decor': 'Nursery',
  'furniture': 'Nursery',
  'cribs': 'Nursery',
  
  // Baby Gear
  'baby-gear': 'Baby gear',
  'baby gear': 'Baby gear',
  'gear': 'Baby gear',
  'baby gear & travel': 'Baby gear',
  'baby gear and travel': 'Baby gear',
  'gear & travel': 'Baby gear',
  'travel': 'Baby gear',
  'strollers': 'Baby gear',
  
  // Footwear
  'footwear': 'Footwear',
  'first-steps-footwear': 'Footwear',
  'first steps footwear': 'Footwear',
  'shoes': 'Footwear',
  'booties': 'Footwear',
  
  // Books
  'books': 'Books',
  'books-audio': 'Books',
  'books & audio': 'Books',
  'books and audio': 'Books',
  
  // Mom & Maternity
  'mom-maternity': 'Mom & maternity',
  'mom & maternity': 'Mom & maternity',
  'mom and maternity': 'Mom & maternity',
  'maternity': 'Mom & maternity',
  'postpartum': 'Mom & maternity',
  
  // School Supplies
  'school-supplies': 'School supplies',
  'school & preschool': 'School supplies',
  'school and preschool': 'School supplies',
  'school supplies': 'School supplies',
  'school': 'School supplies',
  
  // Safety
  'safety': 'Safety',
  'baby-safety': 'Safety',
  'baby safety': 'Safety',
  
  // Outdoor
  'outdoor': 'Outdoor',
  'outdoor-swimming': 'Outdoor',
  'outdoor & swimming': 'Outdoor',
  'outdoor and swimming': 'Outdoor',
  'swim': 'Outdoor',
};

export function resolveCategory(input?: string): string {
  if (!input || input === 'all') return 'all';
  const k = input.toLowerCase().trim();
  if (CATEGORY_MAP[k]) return CATEGORY_MAP[k];
  
  // Replace hyphens & underscores
  const clean = k.replace(/[-_]/g, ' ');
  if (CATEGORY_MAP[clean]) return CATEGORY_MAP[clean];

  return input;
}

export interface ProductFilterParams {
  category?: string;
  subcategory?: string;
  brand?: string;
  ageRange?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: 'recommended' | 'popular' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  inStockOnly?: boolean;
  onSaleOnly?: boolean;
  search?: string;
}

export async function getProducts(params?: ProductFilterParams): Promise<Product[]> {
  let filtered = [...products];

  if (!params) return filtered;

  if (params.category && params.category !== 'all') {
    const targetCategory = resolveCategory(params.category).toLowerCase();
    filtered = filtered.filter(p => p.category.toLowerCase() === targetCategory);
  }

  if (params.subcategory) {
    filtered = filtered.filter(p => p.subcategory.toLowerCase() === params.subcategory?.toLowerCase());
  }

  if (params.brand) {
    const brandLower = params.brand.toLowerCase().replace(/-/g, ' ');
    filtered = filtered.filter(p => p.brand.toLowerCase() === brandLower);
  }

  if (params.ageRange) {
    filtered = filtered.filter(p => p.ageRange.toLowerCase().includes(params.ageRange!.toLowerCase()));
  }

  if (params.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= params.minPrice!);
  }

  if (params.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= params.maxPrice!);
  }

  if (params.rating !== undefined) {
    filtered = filtered.filter(p => p.rating >= params.rating!);
  }

  if (params.inStockOnly) {
    filtered = filtered.filter(p => p.stockStatus !== 'out_of_stock');
  }

  if (params.onSaleOnly) {
    filtered = filtered.filter(p => p.discountPercentage > 0);
  }

  if (params.search) {
    const q = params.search.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  // Sorting
  if (params.sortBy) {
    switch (params.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'recommended':
      default:
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
  }

  return filtered;
}

export async function getProductById(id: string): Promise<Product | null> {
  const product = products.find(p => p.id === id);
  return product || null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = products.find(p => p.slug === slug || p.id === slug);
  return product || null;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const targetCategory = resolveCategory(categorySlug);
  return getProducts({ category: targetCategory });
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const featured = products.filter(p => p.isFeatured);
  return featured.slice(0, limit);
}

export async function getTrendingProducts(limit = 10): Promise<Product[]> {
  const trending = [...products].sort((a, b) => b.reviewCount - a.reviewCount);
  return trending.slice(0, limit);
}

export async function getBestSellers(limit = 8): Promise<Product[]> {
  const bestSellers = products.filter(p => p.isBestSeller);
  return bestSellers.slice(0, limit);
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  const newArrivals = products.filter(p => p.isNewArrival);
  return newArrivals.slice(0, limit);
}

export async function searchProducts(query: string, limit = 12): Promise<Product[]> {
  if (!query || query.trim() === '') return [];
  const q = query.toLowerCase().trim();
  const results = products.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.subcategory.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  );
  return results.slice(0, limit);
}

export async function getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
  const current = products.find(p => p.id === productId);
  if (!current) return products.slice(0, limit);

  const related = products.filter(p => 
    p.id !== productId && (p.category === current.category || p.brand === current.brand)
  );
  return related.slice(0, limit);
}

export async function getProductsByAge(ageRange: string, limit = 8): Promise<Product[]> {
  const matched = products.filter(p => p.ageRange.toLowerCase().includes(ageRange.toLowerCase()));
  return matched.slice(0, limit);
}

export async function getProductsByBrand(brandSlug: string): Promise<Product[]> {
  const brand = brands.find(b => b.slug === brandSlug);
  const brandName = brand ? brand.name : brandSlug;
  return getProducts({ brand: brandName });
}

export async function getCategories(): Promise<CategoryInfo[]> {
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<CategoryInfo | null> {
  const cat = categories.find(c => c.slug === slug || c.id === slug);
  return cat || null;
}

export async function getBrands(): Promise<BrandInfo[]> {
  return brands;
}

export async function getBrandBySlug(slug: string): Promise<BrandInfo | null> {
  const b = brands.find(brand => brand.slug === slug);
  return b || null;
}

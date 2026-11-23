export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories: string[];
  featuredTag?: string;
  colorAccent?: string;
}

export interface BrandInfo {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  origin: string;
  specialty: string;
  logoText: string;
}

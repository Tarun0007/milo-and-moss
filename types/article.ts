export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string[];
  category: 'Newborn' | 'Sleep' | 'Nutrition' | 'Play & Learning' | 'Parenting Guides';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  publishedAt: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

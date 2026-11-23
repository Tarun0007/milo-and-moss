import articlesData from '@/data/articles.json';
import { Article } from '@/types/article';

const articles: Article[] = articlesData as Article[];

export async function getArticles(): Promise<Article[]> {
  return articles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = articles.find(a => a.slug === slug);
  return article || null;
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const featured = articles.find(a => a.featured);
  return featured || articles[0] || null;
}

export async function getRelatedArticles(currentSlug: string, limit = 3): Promise<Article[]> {
  return articles.filter(a => a.slug !== currentSlug).slice(0, limit);
}

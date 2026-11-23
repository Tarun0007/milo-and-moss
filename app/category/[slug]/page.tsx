import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Sparkles } from 'lucide-react';
import { getCategoryBySlug, getCategories, getProductsByCategory } from '@/lib/api/products';
import { ProductCard } from '@/components/product/ProductCard';

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.slug);

  return (
    <div className="min-h-screen">
      {/* Category Editorial Hero Banner */}
      <div className="relative bg-[#23483B] text-[#FAF8F3] py-14 sm:py-20 overflow-hidden">
        {/* Soft background ambient overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#23483B] via-[#23483B]/90 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-white/70 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/shop" className="hover:text-white">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">{category.name}</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            {category.featuredTag && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#B9D5C4]">
                <Sparkles className="w-3.5 h-3.5" />
                {category.featuredTag}
              </span>
            )}
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Subcategories quick filter pills */}
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-white/10">
              <span className="text-xs text-white/60 mr-1">Subcategories:</span>
              {category.subcategories.map((subcat) => (
                <Link
                  key={subcat}
                  href={`/shop?category=${encodeURIComponent(category.name)}&search=${encodeURIComponent(subcat)}`}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors font-medium"
                >
                  {subcat}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Grid Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E7E4DC]">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#23483B]">
              All {category.name} Essentials
            </h2>
            <p className="text-xs text-[#7A807A] mt-0.5">
              Showing {products.length} products curated for safety & style
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs font-semibold text-[#23483B] hover:underline"
          >
            View all 120+ products →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

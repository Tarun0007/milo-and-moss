'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/product/ProductCard';

interface BestSellersGridProps {
  products: Product[];
}

export function BestSellersGrid({ products }: BestSellersGridProps) {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E7E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#23483B]">
              Most Loved Best Sellers
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7A807A] max-w-md mt-2 md:mt-0">
            Tried, tested, and treasured by thousands of newborn and toddler parents across India.
          </p>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all best sellers CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/shop?sortBy=popular"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#23483B] text-[#FAF8F3] text-xs font-semibold hover:bg-[#1A362C] transition-colors shadow-md group"
          >
            <span>Explore all best sellers</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

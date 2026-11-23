'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/product/ProductCard';

interface TrendingCarouselProps {
  products: Product[];
}

export function TrendingCarousel({ products }: TrendingCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const offset = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
    scrollRef.current.scrollTo({
      left: scrollLeft + offset,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E7E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#23483B]">
              Trending This Week
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="p-2.5 rounded-full border border-[#E7E4DC] hover:border-[#23483B] hover:bg-[#FAF8F3] text-[#252822] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="p-2.5 rounded-full border border-[#E7E4DC] hover:border-[#23483B] hover:bg-[#FAF8F3] text-[#252822] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory"
        >
          {products.map((product, idx) => (
            <div
              key={product.id}
              className="w-[13.75rem] sm:w-[17.5rem] lg:w-[18.125rem] flex-shrink-0 snap-start flex flex-col"
            >
              <ProductCard product={product} priority={idx < 4} />
            </div>
          ))}
        </div>

        {/* Explore all link */}
        <div className="mt-8 text-center sm:text-right">
          <Link
            href="/shop?sortBy=popular"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#23483B] hover:underline"
          >
            <span>Explore all trending essentials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

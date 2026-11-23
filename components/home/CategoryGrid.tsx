'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import categoriesData from '@/data/categories.json';
import { CategoryInfo } from '@/types/category';

export function CategoryGrid() {
  const categories: CategoryInfo[] = categoriesData as CategoryInfo[];

  return (
    <section className="py-14 sm:py-20 bg-white border-y border-[#E7E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#23483B]">
              Shop by Department
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7A807A] max-w-md mt-2 md:mt-0">
            Every category adheres to rigorous pediatric safety, non-toxic organic testing, and timeless design simplicity.
          </p>
        </div>

        {/* Category Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative rounded-3xl overflow-hidden bg-[#FAF8F3] border border-[#E7E4DC] hover:border-[#B9D5C4] hover:shadow-card transition-shadow duration-300 flex flex-col justify-between"
            >
              {/* Category Image with Hover Zoom */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE6DE]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                {cat.featuredTag && (
                  <span className="absolute top-3 left-3 text-[0.625rem] font-semibold px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#23483B]">
                    {cat.featuredTag}
                  </span>
                )}
              </div>

              {/* Text Information */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-base sm:text-lg font-bold text-[#252822] group-hover:text-[#23483B] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#7A807A] mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E7E4DC]/60 flex items-center justify-between text-xs font-semibold text-[#23483B]">
                  <span>Explore category</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all departments button */}
        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF8F3] hover:bg-[#F3EFE6] text-xs font-semibold text-[#23483B] border border-[#E7E4DC] transition-colors"
          >
            <span>View all 12 departments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

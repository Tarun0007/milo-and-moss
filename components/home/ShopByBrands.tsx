'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import brandsData from '@/data/brands.json';
import { BrandInfo } from '@/types/category';

export function ShopByBrands() {
  const brands: BrandInfo[] = brandsData as BrandInfo[];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F3] border-b border-[#E7E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#23483B]">
              Shop by Conscious Brands
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7A807A] max-w-md mt-2 md:mt-0">
            Dedicated workshops and independent studios pioneering non-toxic, sustainable nursery living.
          </p>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className="group p-6 rounded-3xl bg-white border border-[#E7E4DC] hover:border-[#23483B] hover:shadow-float transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Brand Wordmark Logo */}
                <div className="h-12 flex items-center mb-3">
                  <span className="font-heading text-sm sm:text-base font-extrabold text-[#23483B] group-hover:text-[#2B5848] transition-colors">
                    {brand.logoText}
                  </span>
                </div>

                <span className="text-xs font-medium text-[#7A807A] block mb-1">
                  {brand.origin}
                </span>

                <h4 className="text-xs font-medium text-[#252822] mb-2">
                  {brand.tagline}
                </h4>

                <p className="text-[0.6875rem] text-[#7A807A] line-clamp-2 leading-relaxed">
                  {brand.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E7E4DC]/60 flex items-center justify-between text-xs font-semibold text-[#23483B]">
                <span className="text-[0.625rem] px-2 py-0.5 rounded-full bg-[#FAF8F3] border border-[#E7E4DC] text-[#7A807A]">
                  {brand.specialty}
                </span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className="group p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#E7E4DC] hover:border-[#23483B] hover:shadow-float transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Brand Wordmark Logo */}
                <div className="h-10 sm:h-12 flex items-center mb-2 sm:mb-3">
                  <span className="font-heading text-xs sm:text-base font-bold text-[#23483B] group-hover:text-[#2B5848] transition-colors leading-tight">
                    {brand.logoText}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#88B29A]" />
                  <span className="text-[0.6875rem] font-medium text-[#7A807A]">
                    {brand.origin}
                  </span>
                </div>

                <h4 className="text-[0.6875rem] sm:text-xs font-semibold text-[#252822] mb-1.5 line-clamp-1">
                  {brand.tagline}
                </h4>

                <p className="text-[0.625rem] sm:text-[0.6875rem] text-[#7A807A] line-clamp-2 leading-relaxed">
                  {brand.description}
                </p>
              </div>

              {/* Clean, Non-wrapping Action Footer */}
              <div className="mt-4 pt-3 border-t border-[#E7E4DC]/60 flex items-center justify-between text-xs font-semibold text-[#23483B]">
                <span className="text-[0.625rem] sm:text-xs text-[#23483B] font-semibold group-hover:underline">
                  Explore
                </span>
                <span className="w-6 h-6 rounded-full bg-[#FAF8F3] group-hover:bg-[#23483B] group-hover:text-white transition-colors flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

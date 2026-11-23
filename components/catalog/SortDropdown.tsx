'use client';

import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface SortDropdownProps {
  value: string;
  onChange: (val: string) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative inline-flex items-center gap-2">
      <span className="text-xs font-medium text-[#7A807A] hidden sm:inline">Sort by:</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Sort products by"
          className="appearance-none text-xs font-semibold px-3.5 py-2 pr-8 rounded-full bg-white border border-[#E7E4DC] text-[#252822] focus:outline-none focus:border-[#23483B] cursor-pointer shadow-sm hover:border-[#B9D5C4] transition-colors"
        >
          <option value="recommended">Featured / Recommended</option>
          <option value="popular">Most Popular</option>
          <option value="newest">New Arrivals</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
        <ArrowUpDown className="w-3.5 h-3.5 text-[#7A807A] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}

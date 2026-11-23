'use client';

import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import categoriesData from '@/data/categories.json';
import brandsData from '@/data/brands.json';
import { resolveCategory } from '@/lib/api/products';

const priceRanges = [
  { label: 'Under ₹500', min: 0, max: 500, id: 'under-500' },
  { label: '₹500 – ₹1,000', min: 500, max: 1000, id: '500-1000' },
  { label: '₹1,000 – ₹2,500', min: 1000, max: 2500, id: '1000-2500' },
  { label: '₹2,500 – ₹5,000', min: 2500, max: 500, id: '2500-5000' },
  { label: 'Above ₹5,000', min: 5000, max: 100000, id: 'above-5000' },
];

const ageRanges = [
  '0–3 months',
  '3–6 months',
  '6–12 months',
  '1–2 years',
  '2–4 years',
  '4–6 years',
  '6+ years',
];

interface FilterSidebarProps {
  selectedCategory?: string;
  onSelectCategory: (cat: string) => void;
  selectedBrand?: string;
  onSelectBrand: (brand: string) => void;
  selectedAge?: string;
  onSelectAge: (age: string) => void;
  selectedPriceRange?: string;
  onSelectPriceRange: (rangeId: string) => void;
  inStockOnly?: boolean;
  onToggleInStock: () => void;
  onSaleOnly?: boolean;
  onToggleOnSale: () => void;
  onReset: () => void;
}

export function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  selectedBrand,
  onSelectBrand,
  selectedAge,
  onSelectAge,
  selectedPriceRange,
  onSelectPriceRange,
  inStockOnly,
  onToggleInStock,
  onSaleOnly,
  onToggleOnSale,
  onReset,
}: FilterSidebarProps) {
  return (
    <div className="space-y-6 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E7E4DC]">
        <div className="flex items-center gap-2 font-heading text-base font-bold text-[#23483B]">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-[#7A807A] hover:text-[#23483B] flex items-center gap-1 font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-3 pb-5 border-b border-[#E7E4DC]">
        <h4 className="text-xs font-semibold text-[#7A807A]">
          Department
        </h4>
        <div className="space-y-1.5">
          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              !selectedCategory || selectedCategory === 'all'
                ? 'bg-[#23483B] text-white'
                : 'text-[#252822] hover:bg-[#FAF8F3]'
            }`}
          >
            All Departments
          </button>
          {categoriesData.map((cat) => {
            const isSelected = !!selectedCategory && selectedCategory !== 'all' &&
              resolveCategory(selectedCategory).toLowerCase() === resolveCategory(cat.slug).toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#23483B] text-white'
                    : 'text-[#252822] hover:bg-[#FAF8F3]'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Age Ranges */}
      <div className="space-y-3 pb-5 border-b border-[#E7E4DC]">
        <h4 className="text-xs font-semibold text-[#7A807A]">
          Age milestone
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {ageRanges.map((age) => (
            <button
              key={age}
              onClick={() => onSelectAge(selectedAge === age ? '' : age)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                selectedAge === age
                  ? 'bg-[#23483B] text-white border-[#23483B]'
                  : 'bg-white text-[#252822] border-[#E7E4DC] hover:border-[#23483B]'
              }`}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3 pb-5 border-b border-[#E7E4DC]">
        <h4 className="text-xs font-semibold text-[#7A807A]">
          Price range
        </h4>
        <div className="space-y-1.5">
          {priceRanges.map((pr) => (
            <label
              key={pr.id}
              className="flex items-center gap-2.5 text-xs text-[#252822] cursor-pointer hover:text-[#23483B]"
            >
              <input
                type="radio"
                name="priceRange"
                checked={selectedPriceRange === pr.id}
                onChange={() => onSelectPriceRange(pr.id)}
                className="w-3.5 h-3.5 text-[#23483B] focus:ring-[#23483B]"
              />
              <span>{pr.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-3 pb-5 border-b border-[#E7E4DC]">
        <h4 className="text-xs font-semibold text-[#7A807A]">
          Conscious brands
        </h4>
        <div className="space-y-1.5">
          {brandsData.map((brand) => (
            <label
              key={brand.id}
              className="flex items-center gap-2.5 text-xs text-[#252822] cursor-pointer hover:text-[#23483B]"
            >
              <input
                type="checkbox"
                checked={selectedBrand === brand.name}
                onChange={() => onSelectBrand(selectedBrand === brand.name ? '' : brand.name)}
                className="rounded text-[#23483B] focus:ring-[#23483B]"
              />
              <span>{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stock & Offer Toggles */}
      <div className="space-y-2.5">
        <label className="flex items-center gap-2.5 text-xs text-[#252822] cursor-pointer">
          <input
            type="checkbox"
            checked={!!inStockOnly}
            onChange={onToggleInStock}
            className="rounded text-[#23483B] focus:ring-[#23483B]"
          />
          <span>In Stock Only</span>
        </label>
        <label className="flex items-center gap-2.5 text-xs text-[#252822] cursor-pointer">
          <input
            type="checkbox"
            checked={!!onSaleOnly}
            onChange={onToggleOnSale}
            className="rounded text-[#23483B] focus:ring-[#23483B]"
          />
          <span>On Sale / Special Offers</span>
        </label>
      </div>
    </div>
  );
}

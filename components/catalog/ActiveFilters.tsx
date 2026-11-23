'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
  filters: {
    category?: string;
    brand?: string;
    ageRange?: string;
    priceRange?: string;
    inStockOnly?: boolean;
    onSaleOnly?: boolean;
    search?: string;
  };
  onRemove: (key: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({ filters, onRemove, onClearAll }: ActiveFiltersProps) {
  const activeChips: { key: string; label: string }[] = [];

  if (filters.category && filters.category !== 'all') {
    activeChips.push({ key: 'category', label: `Category: ${filters.category}` });
  }
  if (filters.brand) {
    activeChips.push({ key: 'brand', label: `Brand: ${filters.brand}` });
  }
  if (filters.ageRange) {
    activeChips.push({ key: 'ageRange', label: `Age: ${filters.ageRange}` });
  }
  if (filters.priceRange) {
    activeChips.push({ key: 'priceRange', label: `Price: ${filters.priceRange}` });
  }
  if (filters.inStockOnly) {
    activeChips.push({ key: 'inStockOnly', label: 'In Stock Only' });
  }
  if (filters.onSaleOnly) {
    activeChips.push({ key: 'onSaleOnly', label: 'On Sale' });
  }
  if (filters.search) {
    activeChips.push({ key: 'search', label: `Search: "${filters.search}"` });
  }

  if (activeChips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-xs font-semibold text-[#7A807A]">Active Filters:</span>
      {activeChips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E4DC] text-xs font-medium text-[#252822] shadow-sm"
        >
          <span>{chip.label}</span>
          <button
            onClick={() => onRemove(chip.key)}
            className="p-0.5 rounded-full hover:bg-black/5 text-[#7A807A] hover:text-[#252822]"
            aria-label={`Remove filter ${chip.label}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-xs font-semibold text-[#23483B] hover:underline ml-2"
      >
        Clear all
      </button>
    </div>
  );
}

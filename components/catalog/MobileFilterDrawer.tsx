'use client';

import React from 'react';
import { X } from 'lucide-react';
import { FilterSidebar } from './FilterSidebar';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filterProps: React.ComponentProps<typeof FilterSidebar>;
  totalCount: number;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  filterProps,
  totalCount,
}: MobileFilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
        <div className="p-4 border-b border-[#E7E4DC] flex items-center justify-between">
          <h3 className="font-heading text-base font-bold text-[#23483B]">Filter Products</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#7A807A]"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <FilterSidebar {...filterProps} />
        </div>

        <div className="p-4 border-t border-[#E7E4DC] bg-[#FAF8F3]">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors"
          >
            Show {totalCount} Products
          </button>
        </div>
      </div>
    </div>
  );
}

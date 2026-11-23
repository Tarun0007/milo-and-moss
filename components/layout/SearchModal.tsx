'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { searchProducts } from '@/lib/api/products';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/utils';

const trendingKeywords = [
  'Wooden Rainbow Stacker',
  'Organic Cotton Onesie',
  'Silicone Weaning Bowl',
  'AeroGlide Flight Stroller',
  'Montessori Sound Blocks',
  'Bamboo Water Wipes',
  'Solid Beech Convertible Crib',
  'Pregnancy Memory Foam Pillow',
];

const quickCategories = [
  { name: 'Baby Clothing', href: '/category/clothing' },
  { name: 'Montessori Toys', href: '/category/toys' },
  { name: 'Gentle Care', href: '/category/baby-care' },
  { name: 'Silicone Feeding', href: '/category/feeding' },
  { name: 'Nursery Decor', href: '/category/nursery' },
  { name: 'Baby Gear', href: '/category/baby-gear' },
];

export function SearchModal() {
  const { isSearchOpen, setSearchOpen } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isSearchOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      const hits = await searchProducts(query, 8);
      setResults(hits);
      setIsSearching(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#252822]/60 backdrop-blur-md transition-opacity"
        onClick={() => setSearchOpen(false)}
      />

      {/* Search dialog */}
      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 md:p-12">
        <div className="relative w-full max-w-3xl bg-[#FAF8F3] rounded-3xl shadow-2xl border border-[#E7E4DC] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Top Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-[#E7E4DC] flex items-center gap-3 bg-white">
            <Search className="w-5 h-5 text-[#23483B] flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search organic clothing, wooden toys, cribs, strollers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-base sm:text-lg bg-transparent text-[#252822] placeholder-[#7A807A] focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-[#7A807A] hover:text-[#252822]"
                aria-label="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setSearchOpen(false)}
              className="p-2 rounded-full hover:bg-[#FAF8F3] text-[#7A807A] hover:text-[#252822] transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Body Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
            {query.trim().length > 0 ? (
              /* Live Results */
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs uppercase tracking-wider text-[#7A807A] font-semibold">
                    Matching Products ({results.length})
                  </h3>
                  {results.length > 0 && (
                    <Link
                      href={`/shop?search=${encodeURIComponent(query)}`}
                      onClick={() => setSearchOpen(false)}
                      className="text-xs font-semibold text-[#23483B] hover:underline inline-flex items-center gap-1"
                    >
                      <span>View all results</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                {isSearching ? (
                  <div className="py-12 text-center text-sm text-[#7A807A]">
                    Searching catalog...
                  </div>
                ) : results.length === 0 ? (
                  <div className="py-12 text-center space-y-2">
                    <p className="font-serif text-lg text-[#252822]">No products found for &ldquo;{query}&rdquo;</p>
                    <p className="text-xs text-[#7A807A]">
                      Try searching for organic cotton, wooden stacker, high chair, or feeding bowl.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#E7E4DC] hover:border-[#B9D5C4] hover:shadow-card transition-colors transition-shadow group"
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#FAF8F3] flex-shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[0.625rem] uppercase tracking-wider font-semibold text-[#7A807A] block truncate">
                            {product.brand}
                          </span>
                          <h4 className="text-xs font-medium text-[#252822] group-hover:text-[#23483B] truncate transition-colors">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-semibold text-[#23483B]">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-[0.625rem] text-[#7A807A] line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Discovery state: Trending & Categories */
              <div className="space-y-6">
                {/* Trending searches */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#7A807A] mb-3">
                    <TrendingUp className="w-3.5 h-3.5 text-[#23483B]" />
                    <span>Trending searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingKeywords.map((item) => (
                      <button
                        key={item}
                        onClick={() => setQuery(item)}
                        className="text-xs px-3.5 py-1.5 rounded-full bg-white border border-[#E7E4DC] hover:border-[#23483B] text-[#252822] hover:text-[#23483B] transition-colors font-medium shadow-sm flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3 h-3 text-[#B9D5C4]" />
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular departments */}
                <div>
                  <div className="text-xs font-semibold text-[#7A807A] mb-3">
                    Explore departments
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {quickCategories.map((c) => (
                      <Link
                        key={c.name}
                        href={c.href}
                        onClick={() => setSearchOpen(false)}
                        className="p-3 rounded-2xl bg-white border border-[#E7E4DC] text-xs font-medium text-[#252822] hover:text-[#23483B] hover:border-[#B9D5C4] transition-colors flex items-center justify-between"
                      >
                        <span>{c.name}</span>
                        <ArrowRight className="w-3 h-3 text-[#7A807A]" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Gift discovery banner */}
                <div className="p-4 rounded-2xl bg-[#F4E4A5]/25 border border-[#F4E4A5]/50 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-[#23483B] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Looking for the perfect gift?
                    </span>
                    <p className="text-xs text-[#7A807A]">
                      Use our interactive Gift Finder to match age, occasion & budget.
                    </p>
                  </div>
                  <Link
                    href="/gifts"
                    onClick={() => setSearchOpen(false)}
                    className="px-4 py-2 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors whitespace-nowrap ml-4"
                  >
                    Launch Finder
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

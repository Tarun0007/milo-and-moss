'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, LayoutGrid, List, Sparkles, ChevronRight } from 'lucide-react';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import { resolveCategory } from '@/lib/api/products';
import { ProductCard } from '@/components/product/ProductCard';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { MobileFilterDrawer } from '@/components/catalog/MobileFilterDrawer';
import { SortDropdown } from '@/components/catalog/SortDropdown';
import { ActiveFilters } from '@/components/catalog/ActiveFilters';

function ShopContent() {
  const searchParams = useSearchParams();

  // Initial filter states from URL search params
  const paramCategory = searchParams.get('category') || 'all';
  const paramBrand = searchParams.get('brand') || '';
  const paramAge = searchParams.get('ageRange') || '';
  const paramSearch = searchParams.get('search') || '';
  const paramSort = searchParams.get('sortBy') || 'recommended';

  const [category, setCategory] = useState<string>(paramCategory);
  const [brand, setBrand] = useState<string>(paramBrand);
  const [ageRange, setAgeRange] = useState<string>(paramAge);
  const [priceRange, setPriceRange] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(paramSearch);
  const [sortBy, setSortBy] = useState<string>(paramSort);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [isListView, setIsListView] = useState<boolean>(false);

  // Sync state if URL search params change
  useEffect(() => {
    if (searchParams.get('category')) setCategory(searchParams.get('category')!);
    if (searchParams.get('brand')) setBrand(searchParams.get('brand')!);
    if (searchParams.get('ageRange')) setAgeRange(searchParams.get('ageRange')!);
    if (searchParams.get('search')) setSearch(searchParams.get('search')!);
    if (searchParams.get('sortBy')) setSortBy(searchParams.get('sortBy')!);
  }, [searchParams]);

  const allProducts = productsData as unknown as Product[];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category
    if (category && category !== 'all') {
      const canonical = resolveCategory(category).toLowerCase();
      result = result.filter((p) => p.category.toLowerCase() === canonical);
    }

    // Brand
    if (brand) {
      result = result.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
    }

    // Age
    if (ageRange) {
      result = result.filter((p) => p.ageRange.toLowerCase().includes(ageRange.toLowerCase()));
    }

    // Search
    if (search) {
      const q = search.toLowerCase().trim();
      const words = q.split(/\s+/).filter(Boolean);
      result = result.filter((p) => {
        const textToSearch = [
          p.name,
          p.brand,
          p.category,
          p.subcategory || '',
          p.description,
          ...(p.tags || [])
        ].join(' ').toLowerCase();
        
        return words.every((word) => textToSearch.includes(word));
      });
    }

    // Stock
    if (inStockOnly) {
      result = result.filter((p) => p.stockStatus !== 'out_of_stock');
    }

    // Sale
    if (onSaleOnly) {
      result = result.filter((p) => p.discountPercentage > 0);
    }

    // Price range
    if (priceRange) {
      if (priceRange === 'under-500') result = result.filter((p) => p.price < 500);
      else if (priceRange === '500-1000') result = result.filter((p) => p.price >= 500 && p.price <= 1000);
      else if (priceRange === '1000-2500') result = result.filter((p) => p.price >= 1000 && p.price <= 2500);
      else if (priceRange === '2500-5000') result = result.filter((p) => p.price >= 2500 && p.price <= 5000);
      else if (priceRange === 'above-5000') result = result.filter((p) => p.price > 5000);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'recommended':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [allProducts, category, brand, ageRange, search, inStockOnly, onSaleOnly, priceRange, sortBy]);

  const handleResetFilters = () => {
    setCategory('all');
    setBrand('');
    setAgeRange('');
    setPriceRange('');
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSearch('');
  };

  const handleRemoveChip = (key: string) => {
    if (key === 'category') setCategory('all');
    if (key === 'brand') setBrand('');
    if (key === 'ageRange') setAgeRange('');
    if (key === 'priceRange') setPriceRange('');
    if (key === 'inStockOnly') setInStockOnly(false);
    if (key === 'onSaleOnly') setOnSaleOnly(false);
    if (key === 'search') setSearch('');
  };

  const filterProps = {
    selectedCategory: category,
    onSelectCategory: setCategory,
    selectedBrand: brand,
    onSelectBrand: setBrand,
    selectedAge: ageRange,
    onSelectAge: setAgeRange,
    selectedPriceRange: priceRange,
    onSelectPriceRange: setPriceRange,
    inStockOnly,
    onToggleInStock: () => setInStockOnly(!inStockOnly),
    onSaleOnly,
    onToggleOnSale: () => setOnSaleOnly(!onSaleOnly),
    onReset: handleResetFilters,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#7A807A] mb-6">
        <Link href="/" className="hover:text-[#23483B]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#252822] font-semibold">The Shop Collection</span>
      </nav>

      {/* Header Title Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#E7E4DC]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7A807A]">
            The Curated Catalog
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-[#23483B] mt-1">
            {category && category !== 'all' ? category : 'All Essentials'}
          </h1>
          <p className="text-xs sm:text-sm text-[#7A807A] mt-1.5">
            Showing <strong className="text-[#23483B]">{filteredProducts.length}</strong> thoughtfully crafted products
          </p>
        </div>

        {/* Controls: Filter trigger for mobile, Sort, Grid/List toggle */}
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E7E4DC] text-xs font-semibold text-[#252822] hover:border-[#23483B]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#23483B]" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <SortDropdown value={sortBy} onChange={setSortBy} />

          {/* Grid / List View Toggle */}
          <div className="hidden sm:flex items-center p-1 rounded-full bg-white border border-[#E7E4DC]">
            <button
              onClick={() => setIsListView(false)}
              aria-label="Grid view"
              className={`p-1.5 rounded-full transition-colors ${
                !isListView ? 'bg-[#23483B] text-white' : 'text-[#7A807A] hover:text-[#252822]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsListView(true)}
              aria-label="List view"
              className={`p-1.5 rounded-full transition-colors ${
                isListView ? 'bg-[#23483B] text-white' : 'text-[#7A807A] hover:text-[#252822]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      <ActiveFilters
        filters={{
          category: category !== 'all' ? category : undefined,
          brand,
          ageRange,
          priceRange,
          inStockOnly,
          onSaleOnly,
          search,
        }}
        onRemove={handleRemoveChip}
        onClearAll={handleResetFilters}
      />

      {/* Main Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24 bg-white p-6 rounded-3xl border border-[#E7E4DC] shadow-card">
          <FilterSidebar {...filterProps} />
        </div>

        {/* Product Grid / List */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="p-12 sm:p-16 rounded-3xl bg-white border border-[#E7E4DC] text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#B9D5C4]/30 flex items-center justify-center text-[#23483B] mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#23483B] tracking-tight">No products match these filters</h3>
                <p className="text-xs text-[#7A807A] max-w-sm mx-auto">
                  Try clearing some filter options or reset all filters to view our full collection of 120+ products.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                isListView
                  ? 'space-y-4'
                  : 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filterProps={filterProps}
        totalCount={filteredProducts.length}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-[#7A807A]">
          Loading curated essentials...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}

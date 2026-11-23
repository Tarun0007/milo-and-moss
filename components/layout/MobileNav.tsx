'use client';

import React from 'react';
import Link from 'next/link';
import { X, Search, Heart, ShoppingBag, User, ArrowRight, Gift, BookOpen } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { Logo } from '@/components/ui/Logo';

const navCategories = [
  { name: 'All Collection', href: '/shop' },
  { name: 'Baby Clothing', href: '/category/clothing' },
  { name: 'Toys & Play', href: '/category/toys' },
  { name: 'Baby Care', href: '/category/baby-care' },
  { name: 'Feeding & Nursing', href: '/category/feeding' },
  { name: 'Nursery & Decor', href: '/category/nursery' },
  { name: 'Baby Gear & Travel', href: '/category/baby-gear' },
  { name: 'First Steps Footwear', href: '/category/footwear' },
  { name: 'Books & Audio', href: '/category/books' },
  { name: 'Mom & Maternity', href: '/category/mom-maternity' },
  { name: 'School Supplies', href: '/category/school-supplies' },
  { name: 'Baby Safety', href: '/category/safety' },
  { name: 'Outdoor & Swimming', href: '/category/outdoor' },
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

export function MobileNav() {
  const { isMobileNavOpen, setMobileNavOpen, setSearchOpen, setMiniCartOpen } = useUIStore();
  const itemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  if (!isMobileNavOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setMobileNavOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-[#FAF8F3] text-[#252822] shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-[#E7E4DC]">
          <Logo size="sm" showTagline={false} />
          <button
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-full hover:bg-black/5 text-[#252822]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search quick button */}
        <div className="p-4 border-b border-[#E7E4DC]">
          <button
            onClick={() => {
              setMobileNavOpen(false);
              setSearchOpen(true);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full bg-white border border-[#E7E4DC] text-sm text-[#7A807A] hover:border-[#B9D5C4] transition-colors text-left"
          >
            <Search className="w-4 h-4 text-[#7A807A]" />
            <span>Search clothes, wooden toys, cribs...</span>
          </button>
        </div>

        {/* Scrollable navigation */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {/* Quick interactive shortcuts */}
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              href="/gifts"
              onClick={() => setMobileNavOpen(false)}
              className="flex items-center gap-2 p-3 rounded-2xl bg-[#F4E4A5]/30 text-xs font-semibold text-[#23483B] border border-[#F4E4A5]/60"
            >
              <Gift className="w-4 h-4 text-[#23483B]" />
              <span>Gift Finder</span>
            </Link>
            <Link
              href="/journal"
              onClick={() => setMobileNavOpen(false)}
              className="flex items-center gap-2 p-3 rounded-2xl bg-[#E6DDF1]/35 text-xs font-semibold text-[#23483B] border border-[#E6DDF1]/60"
            >
              <BookOpen className="w-4 h-4 text-[#23483B]" />
              <span>Journal</span>
            </Link>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-xs font-semibold text-[#7A807A] mb-3">
              Departments
            </h4>
            <div className="space-y-1">
              {navCategories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-between py-2 text-sm font-medium text-[#252822] hover:text-[#23483B] transition-colors"
                >
                  <span>{cat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7A807A]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Shop By Age */}
          <div>
            <h4 className="text-xs font-semibold text-[#7A807A] mb-3">
              Shop by age
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {ageRanges.map((age) => (
                <Link
                  key={age}
                  href={`/shop?ageRange=${encodeURIComponent(age)}`}
                  onClick={() => setMobileNavOpen(false)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-[#252822] hover:border-[#23483B] hover:text-[#23483B] transition-colors font-medium"
                >
                  {age}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 bg-white border-t border-[#E7E4DC] flex items-center justify-around">
          <Link
            href="/account"
            onClick={() => setMobileNavOpen(false)}
            className="flex flex-col items-center gap-1 text-xs text-[#252822] hover:text-[#23483B]"
          >
            <User className="w-4 h-4" />
            <span>Account</span>
          </Link>
          <Link
            href="/wishlist"
            onClick={() => setMobileNavOpen(false)}
            className="flex flex-col items-center gap-1 text-xs text-[#252822] hover:text-[#23483B] relative"
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-[#F3C6B3] text-[#252822] rounded-full text-[0.625rem] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => {
              setMobileNavOpen(false);
              setMiniCartOpen(true);
            }}
            className="flex flex-col items-center gap-1 text-xs text-[#252822] hover:text-[#23483B] relative"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-[#23483B] text-white rounded-full text-[0.625rem] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

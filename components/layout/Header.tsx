'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, Menu, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { MegaMenu } from './MegaMenu';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Shop All', href: '/shop', hasMegaMenu: true },
  { name: 'Clothing', href: '/category/clothing' },
  { name: 'Toys', href: '/category/toys' },
  { name: 'Care', href: '/category/baby-care' },
  { name: 'Nursery', href: '/category/nursery' },
  { name: 'Feeding', href: '/category/feeding' },
  { name: 'Gear', href: '/category/baby-gear' },
  { name: 'Gifts', href: '/gifts', isGift: true },
  { name: 'Journal', href: '/journal' },
];

export function Header() {
  const pathname = usePathname();
  const [isMegaMenuOpen, setMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { setSearchOpen, setMiniCartOpen, setMobileNavOpen } = useUIStore();
  const cartItemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMegaMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div
        className={cn(
          "w-full bg-[#FAF8F3]/95 backdrop-blur-md transition-[height,box-shadow] duration-200 border-b border-[#23483B]/10",
          isScrolled ? "h-14 shadow-xs" : "h-16"
        )}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full gap-2 lg:gap-4">
            
            {/* Left: Mobile Menu Toggle + Compact Brand Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open mobile navigation menu"
                className="p-1.5 -ml-1.5 rounded-lg hover:bg-black/5 text-[#252822] transition-colors lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Logo size="sm" showTagline={false} />
            </div>

            {/* Center: Sleek, Single-Line Main Navigation with Perfect Optical Baseline */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-7 h-full flex-shrink-0">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                
                if (link.hasMegaMenu) {
                  return (
                    <div
                      key={link.name}
                      className="relative h-full flex items-center"
                      onMouseEnter={() => setMegaMenuOpen(true)}
                    >
                      <button
                        onClick={() => setMegaMenuOpen(!isMegaMenuOpen)}
                        className={cn(
                          "inline-flex items-center gap-1 text-[0.8125rem] font-medium tracking-normal whitespace-nowrap transition-colors h-full px-1",
                          isMegaMenuOpen || isActive
                            ? "text-[#23483B] font-semibold"
                            : "text-[#252822]/80 hover:text-[#23483B]"
                        )}
                      >
                        <span className="whitespace-nowrap">{link.name}</span>
                        <ChevronDown className={cn("w-3 h-3 opacity-60 transition-transform duration-200 flex-shrink-0", isMegaMenuOpen && "rotate-180")} />
                      </button>
                      {isActive && (
                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#23483B]" />
                      )}
                    </div>
                  );
                }

                return (
                  <div key={link.name} className="relative h-full flex items-center">
                    <Link
                      href={link.href}
                      className={cn(
                        "inline-flex items-center text-[0.8125rem] font-medium tracking-normal whitespace-nowrap transition-colors h-full px-1",
                        isActive
                          ? "text-[#23483B] font-semibold"
                          : "text-[#252822]/80 hover:text-[#23483B]"
                      )}
                    >
                      <span className="whitespace-nowrap">{link.name}</span>
                    </Link>
                    {isActive && (
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#23483B]" />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right: Search, Account, Wishlist, Bag */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Minimal Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="p-2 sm:px-3 sm:py-1.5 rounded-full hover:bg-black/5 sm:bg-white/90 sm:border sm:border-[#23483B]/15 text-[#7A807A] hover:text-[#23483B] transition-colors text-xs whitespace-nowrap flex-shrink-0 flex items-center gap-2"
              >
                <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#23483B] flex-shrink-0" />
                <span className="hidden xl:inline text-[0.75rem] font-normal whitespace-nowrap">Search essentials...</span>
              </button>

              {/* Account Link (hidden on mobile, accessible via mobile drawer) */}
              <Link
                href="/account"
                aria-label="Account"
                className="hidden sm:flex p-2 rounded-full hover:bg-black/5 text-[#252822] hover:text-[#23483B] transition-colors flex-shrink-0"
                title="Account"
              >
                <User className="w-4 h-4" />
              </Link>

              {/* Wishlist Link with Count */}
              <Link
                href="/wishlist"
                aria-label={`Wishlist with ${wishlistCount} items`}
                className="relative p-2 rounded-full hover:bg-black/5 text-[#252822] hover:text-[#23483B] transition-colors flex-shrink-0"
                title="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#F3C6B3] text-[#23483B] text-[0.625rem] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Bag Pill */}
              <button
                onClick={() => setMiniCartOpen(true)}
                aria-label={`Shopping bag with ${cartItemCount} items`}
                className="relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#23483B] text-[#FAF8F3] hover:bg-[#1A362C] transition-colors whitespace-nowrap flex-shrink-0"
              >
                <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-xs font-semibold hidden sm:inline whitespace-nowrap">Bag</span>
                <span className="w-4 h-4 rounded-full bg-[#B9D5C4] text-[#23483B] text-[0.625rem] font-bold flex items-center justify-center">
                  {cartItemCount}
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <MegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setMegaMenuOpen(false)}
      />
    </header>
  );
}

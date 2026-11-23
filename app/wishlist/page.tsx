'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowRight, ChevronRight } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types/product';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const { showToast, setMiniCartOpen } = useUIStore();

  const handleMoveToCart = (product: Product) => {
    addItem(product, 1);
    removeItem(product.id);
    showToast(`Moved "${product.name}" to your shopping bag!`, 'success');
    setMiniCartOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#7A807A] mb-8">
        <Link href="/" className="hover:text-[#23483B]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#252822] font-semibold">Saved Wishlist</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E7E4DC]">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#23483B]">
            Your Saved Wishlist
          </h1>
          <p className="text-xs text-[#7A807A] mt-1">
            {items.length} items saved for upcoming milestones & nursery dreams
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs font-semibold text-[#7A807A] hover:text-red-500 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="p-12 sm:p-20 rounded-3xl bg-white border border-[#E7E4DC] text-center space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F3C6B3]/40 flex items-center justify-center text-[#23483B] mx-auto">
            <Heart className="w-8 h-8 text-[#23483B]" />
          </div>
          <div className="space-y-1">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#23483B]">
              Your wishlist is waiting
            </h2>
            <p className="text-xs text-[#7A807A] max-w-sm mx-auto">
              Save essentials as you explore our organic apparel, Montessori playrooms, and baby gear.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors"
          >
            <span>Explore the Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-3 border border-[#E7E4DC] shadow-card flex flex-col justify-between group"
            >
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF8F3] mb-3">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                </Link>
                <button
                  onClick={() => removeItem(product.id)}
                  aria-label="Remove from wishlist"
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#7A807A] hover:text-red-500 shadow-sm transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="px-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[0.625rem] font-bold uppercase tracking-wider text-[#7A807A] block">
                    {product.brand}
                  </span>
                  <Link
                    href={`/product/${product.slug}`}
                    className="font-medium text-xs text-[#252822] hover:text-[#23483B] line-clamp-1 transition-colors mt-0.5"
                  >
                    {product.name}
                  </Link>
                </div>

                <div className="pt-3">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-sm font-bold text-[#23483B]">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-[#7A807A] line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="w-full py-2.5 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

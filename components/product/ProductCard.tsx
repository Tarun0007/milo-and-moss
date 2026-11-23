'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice, cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80';

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { setQuickViewProduct, showToast, setMiniCartOpen } = useUIStore();

  const isFavorited = isInWishlist(product.id);
  const selectedColor = product.colors && product.colors.length > 0 ? product.colors[selectedColorIndex] : undefined;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    showToast(
      added ? `Added "${product.name}" to your wishlist` : `Removed "${product.name}" from wishlist`,
      'info'
    );
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, selectedColor, product.sizes[0]);
    setJustAdded(true);
    showToast(`Added "${product.name}" to your shopping bag!`, 'success');
    setMiniCartOpen(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const primaryImage = product.images && product.images.length > 0 ? product.images[0] : FALLBACK_IMAGE;
  const secondaryImage = product.images && product.images.length > 1 ? product.images[1] : primaryImage;
  const currentImage = imgError ? FALLBACK_IMAGE : (isHovered ? secondaryImage : primaryImage);

  return (
    <div
      className="group relative flex flex-col justify-between h-full bg-white rounded-2xl p-3 border border-[#23483B]/10 hover:border-[#23483B]/40 shadow-xs hover:shadow-md transition-shadow transition-colors duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Part: Image Container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF8F3] flex-shrink-0">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={currentImage}
            alt={product.name}
            fill
            priority={priority}
            onError={() => setImgError(true)}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
          {product.discountPercentage > 0 && (
            <span className="text-[0.625rem] font-bold px-2 py-0.5 rounded-full bg-[#23483B] text-[#FAF8F3] shadow-xs">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="text-[0.625rem] font-semibold px-2 py-0.5 rounded-full bg-[#F4E4A5] text-[#23483B] shadow-xs">
              Best Seller
            </span>
          )}
          {product.isNewArrival && !product.isBestSeller && (
            <span className="text-[0.625rem] font-semibold px-2 py-0.5 rounded-full bg-[#B9D5C4] text-[#23483B] shadow-xs">
              New In
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "absolute top-2 right-2 p-1.5 rounded-full transition-colors duration-200 shadow-xs z-10",
            isFavorited
              ? "bg-[#F3C6B3] text-[#23483B]"
              : "bg-white/90 backdrop-blur-xs text-[#7A807A] hover:text-[#23483B] hover:bg-white"
          )}
        >
          <Heart className={cn("w-3.5 h-3.5 transition-transform", isFavorited && "fill-current scale-110")} />
        </button>

        {/* Quick View Button overlay on hover */}
        <button
          onClick={handleQuickView}
          aria-label="Quick preview"
          className="absolute bottom-2 left-2 p-1.5 rounded-full bg-white/90 backdrop-blur-xs text-[#252822] hover:bg-white hover:text-[#23483B] shadow-xs opacity-0 group-hover:opacity-100 transition-opacity transition-colors duration-200 z-10 hidden sm:flex items-center justify-center"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        {/* Quick Add To Bag Button */}
        <button
          onClick={handleQuickAdd}
          aria-label="Quick add to bag"
          className={cn(
            "absolute bottom-2 right-2 p-2 rounded-full transition-colors duration-200 shadow-xs z-10 flex items-center justify-center",
            justAdded
              ? "bg-[#23483B] text-[#FAF8F3]"
              : "bg-white/95 backdrop-blur-xs text-[#23483B] hover:bg-[#23483B] hover:text-[#FAF8F3]"
          )}
        >
          {justAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Bottom Part: Product Details (Strict uniform height layout) */}
      <div className="pt-2.5 px-0.5 flex-1 flex flex-col justify-between">
        {/* Brand & Age Header (Fixed row) */}
        <div>
          <div className="flex items-center justify-between text-[0.6875rem] text-[#7A807A] h-4 mb-1">
            <span className="font-semibold truncate flex-1 min-w-0 mr-1.5 text-[0.625rem] sm:text-[0.6875rem] text-[#7A807A]">
              {product.brand}
            </span>
            <span className="text-[0.5625rem] sm:text-[0.625rem] px-1.5 py-0.5 rounded-full bg-[#FAF8F3] border border-[#23483B]/10 whitespace-nowrap flex-shrink-0">
              {product.ageRange}
            </span>
          </div>

          {/* Product Name (Fixed 2-line height for perfect row alignment across cards) */}
          <Link
            href={`/product/${product.slug}`}
            className="block text-xs sm:text-[0.8125rem] font-semibold text-[#252822] hover:text-[#23483B] transition-colors line-clamp-2 h-[2.5rem] leading-[1.25rem]"
            title={product.name}
          >
            {product.name}
          </Link>
        </div>

        {/* Rating & Bottom Pricing Footer (Locked to bottom) */}
        <div className="pt-1.5">
          {/* Rating Row (Fixed height) */}
          <div className="flex items-center gap-1.5 h-4 mb-1.5">
            <div className="flex items-center text-[#E5CF78]">
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-xs font-semibold text-[#252822]">{product.rating}</span>
            <span className="text-[0.625rem] text-[#7A807A]">({product.reviewCount})</span>
          </div>

          {/* Price & Color Variant Dots (Uniform bottom row with separator) */}
          <div className="flex items-center justify-between pt-1.5 border-t border-[#23483B]/10 min-h-[1.75rem] gap-1">
            <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-[#23483B] whitespace-nowrap">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[0.625rem] text-[#7A807A] line-through whitespace-nowrap hidden sm:inline">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Color Swatches */}
            <div className="flex items-center gap-1 min-h-[0.75rem] flex-shrink-0">
              {product.colors && product.colors.length > 1 ? (
                product.colors.slice(0, 3).map((col, idx) => (
                  <button
                    key={col.name}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedColorIndex(idx);
                    }}
                    aria-label={`Select ${col.name} color`}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full border transition-transform transition-colors",
                      selectedColorIndex === idx
                        ? "border-[#23483B] scale-125 ring-1 ring-[#23483B]"
                        : "border-black/20"
                    )}
                    style={{ backgroundColor: col.hex }}
                  />
                ))
              ) : (
                <span className="text-[0.5625rem] text-[#7A807A]/70 font-medium">Standard</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

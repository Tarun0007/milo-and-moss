'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Star, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice, cn } from '@/lib/utils';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80';

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, showToast, setMiniCartOpen } = useUIStore();
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (quickViewProduct) {
      setFailedImages({});
      setActiveImageIndex(0);
      setSelectedSize(quickViewProduct.sizes?.[0] || '');
      setSelectedColorIndex(0);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const selectedColor = product.colors && product.colors.length > 0 ? product.colors[selectedColorIndex] : undefined;
  const currentSize = selectedSize || product.sizes[0];

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, currentSize);
    showToast(`Added ${quantity} × "${product.name}" to your bag!`, 'success');
    setQuickViewProduct(null);
    setMiniCartOpen(true);
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product);
    showToast(
      added ? `Added "${product.name}" to your wishlist` : `Removed "${product.name}" from wishlist`,
      'info'
    );
  };

  const getValidImg = (idx: number) => {
    if (failedImages[idx] || !product.images?.[idx]) {
      return FALLBACK_IMAGE;
    }
    return product.images[idx];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-8">
        <div className="relative w-full max-w-4xl bg-[#FAF8F3] rounded-3xl shadow-2xl border border-[#23483B]/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-4 sm:my-8">
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#252822] shadow-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Images */}
            <div className="p-6 bg-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#23483B]/10">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF8F3]">
                <Image
                  src={getValidImg(activeImageIndex)}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="400px"
                  onError={() => setFailedImages((prev) => ({ ...prev, [activeImageIndex]: true }))}
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 mt-4 justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        "relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-colors transition-transform",
                        activeImageIndex === idx ? "border-[#23483B] scale-105 ring-1 ring-[#23483B]" : "border-black/10 opacity-70 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={getValidImg(idx)}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                        onError={() => setFailedImages((prev) => ({ ...prev, [idx]: true }))}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info & Actions */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-[#7A807A] mb-1.5">
                  <span className="font-semibold uppercase tracking-wider">{product.brand}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#23483B]/10 text-[0.6875rem] font-medium">
                    {product.ageRange}
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#23483B] leading-snug">
                  {product.name}
                </h3>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-[#E5CF78]">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-xs font-semibold text-[#252822]">{product.rating}</span>
                  <span className="text-xs text-[#7A807A]">({product.reviewCount} parent reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-2xl font-bold text-[#23483B]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-sm text-[#7A807A] line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#B9D5C4]/30 text-[#23483B]">
                        {product.discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#7A807A] mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Color selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-5">
                    <span className="text-xs font-semibold text-[#252822] block mb-2">
                      Color: <span className="font-normal text-[#7A807A]">{selectedColor?.name}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      {product.colors.map((color, idx) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColorIndex(idx)}
                          className={cn(
                            "w-6 h-6 rounded-full border-2 transition-transform transition-colors",
                            selectedColorIndex === idx ? "border-[#23483B] scale-110 ring-2 ring-[#B9D5C4]" : "border-black/20"
                          )}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size selection */}
                {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
                  <div className="mt-4">
                    <span className="text-xs font-semibold text-[#252822] block mb-2">
                      Size:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors",
                            currentSize === sz
                              ? "bg-[#23483B] text-white border-[#23483B]"
                              : "bg-white text-[#252822] border-[#23483B]/15 hover:border-[#23483B]"
                          )}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-[#23483B]/10 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center rounded-xl border border-[#23483B]/15 bg-white px-2 py-1.5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 py-1 text-sm font-semibold text-[#7A807A] hover:text-[#23483B]"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold px-2 min-w-[1.25rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 py-1 text-sm font-semibold text-[#7A807A] hover:text-[#23483B]"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to bag button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#23483B] text-[#FAF8F3] text-xs font-semibold hover:bg-[#1A362C] transition-colors shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag ({formatPrice(product.price * quantity)})</span>
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={handleToggleWishlist}
                    className={cn(
                      "p-3 rounded-full border transition-colors",
                      isFavorited
                        ? "bg-[#F3C6B3] text-[#23483B] border-[#F3C6B3]"
                        : "bg-white text-[#7A807A] border-[#23483B]/15 hover:text-[#23483B]"
                    )}
                  >
                    <Heart className={cn("w-4 h-4", isFavorited && "fill-current")} />
                  </button>
                </div>

                {/* View Full Product Page */}
                <Link
                  href={`/product/${product.slug}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-[#23483B] hover:underline pt-1"
                >
                  <span>View full specifications & all reviews</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

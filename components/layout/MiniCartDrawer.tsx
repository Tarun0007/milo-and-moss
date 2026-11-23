'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice } from '@/lib/utils';

export function MiniCartDrawer() {
  const { isMiniCartOpen, setMiniCartOpen, showToast } = useUIStore();
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getDiscount,
    getShippingFee,
    getTotal,
    promoCode,
    applyPromoCode,
    removePromoCode,
  } = useCartStore();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isMiniCartOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShippingFee();
  const total = getTotal();
  const freeShippingThreshold = 999;
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    if (res.success) {
      showToast(res.message, 'success');
      setPromoError('');
      setInputCode('');
    } else {
      setPromoError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-opacity"
        onClick={() => setMiniCartOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#FAF8F3] text-[#252822] shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#E7E4DC] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#23483B]" />
            <h2 className="font-serif text-xl font-medium text-[#23483B]">Your Shopping Bag</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#B9D5C4]/30 text-[#23483B] font-semibold">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setMiniCartOpen(false)}
            aria-label="Close cart"
            className="p-2 rounded-full hover:bg-black/5 text-[#252822] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div className="px-5 py-3 bg-[#FCFBF8] border-b border-[#E7E4DC]">
          <div className="flex items-center justify-between text-xs font-medium mb-1.5">
            {amountNeeded > 0 ? (
              <span className="text-[#7A807A]">
                Add <strong className="text-[#23483B]">{formatPrice(amountNeeded)}</strong> more for <span className="text-[#23483B] font-semibold">FREE Delivery</span>
              </span>
            ) : (
              <span className="text-[#23483B] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#23483B]" />
                You have unlocked FREE Express Delivery!
              </span>
            )}
            <span className="text-[0.6875rem] text-[#7A807A]">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#E7E4DC] overflow-hidden">
            <div
              className="h-full bg-[#23483B] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-[#B9D5C4]/30 flex items-center justify-center text-[#23483B]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-medium text-[#23483B]">Your bag is peaceful</h3>
                <p className="text-xs text-[#7A807A] max-w-xs">
                  Discover gentle organic essentials, heirloom wooden toys, and nursery comforts.
                </p>
              </div>
              <button
                onClick={() => setMiniCartOpen(false)}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#23483B] text-[#FAF8F3] text-xs font-semibold hover:bg-[#1A362C] transition-colors"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 rounded-2xl bg-white border border-[#E7E4DC] shadow-card group transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#FAF8F3] flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[0.625rem] uppercase tracking-wider text-[#7A807A] font-semibold truncate">
                        {item.product.brand}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                        className="text-[#7A807A] hover:text-red-500 transition-colors p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={() => setMiniCartOpen(false)}
                      className="text-xs font-medium text-[#252822] hover:text-[#23483B] line-clamp-1 transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1 text-[0.6875rem] text-[#7A807A]">
                      {item.selectedColor && (
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      )}
                      {item.selectedSize && (
                        <span>• Size: {item.selectedSize}</span>
                      )}
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E7E4DC]/50">
                    <div className="flex items-center rounded-lg border border-[#E7E4DC] bg-[#FAF8F3] px-1.5 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-[#23483B] text-[#7A807A]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold px-2 min-w-[1.25rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-[#23483B] text-[#7A807A]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-semibold text-[#23483B]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      {item.product.originalPrice > item.price && (
                        <span className="text-[0.625rem] text-[#7A807A] line-through block">
                          {formatPrice(item.product.originalPrice * item.quantity)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals and action buttons */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E7E4DC] space-y-3.5 shadow-float">
            {/* Promo Code Form */}
            {promoCode ? (
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#B9D5C4]/25 border border-[#B9D5C4]/50 text-xs text-[#23483B]">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Tag className="w-3.5 h-3.5 text-[#23483B]" />
                  Code {promoCode} applied ({formatPrice(discount)} off)
                </span>
                <button
                  onClick={removePromoCode}
                  className="text-xs font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. MOSS20)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 rounded-xl border border-[#E7E4DC] focus:outline-none focus:border-[#23483B] bg-[#FAF8F3]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
            {promoError && <p className="text-[0.6875rem] text-red-500">{promoError}</p>}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#7A807A]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#252822]">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#23483B]">
                  <span>Promotional Savings</span>
                  <span className="font-medium">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-medium text-[#252822]">
                  {shipping === 0 ? <span className="text-[#23483B] font-semibold">FREE</span> : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#23483B] pt-2 border-t border-[#E7E4DC]">
                <span>Total Amount</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <Link
                href="/checkout"
                onClick={() => setMiniCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-[#23483B] text-[#FAF8F3] text-sm font-semibold hover:bg-[#1A362C] transition-colors shadow-md group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/cart"
                onClick={() => setMiniCartOpen(false)}
                className="w-full block text-center py-2 text-xs font-semibold text-[#7A807A] hover:text-[#23483B] transition-colors"
              >
                View Full Bag Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

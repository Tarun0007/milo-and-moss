'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice } from '@/lib/utils';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/product/ProductCard';

export default function CartPage() {
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
  const { showToast } = useUIStore();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShippingFee();
  const total = getTotal();
  const freeThreshold = 999;
  const amountNeeded = Math.max(0, freeThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

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

  const sampleRecommendations = (productsData as unknown as Product[]).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#7A807A] mb-8">
        <Link href="/" className="hover:text-[#23483B]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#252822] font-semibold">Your Shopping Bag</span>
      </nav>

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E7E4DC]">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#23483B]">
            Shopping Bag
          </h1>
          <p className="text-xs text-[#7A807A] mt-1">
            {items.reduce((s, i) => s + i.quantity, 0)} items selected for conscious care
          </p>
        </div>

        <Link
          href="/shop"
          className="text-xs font-semibold text-[#23483B] hover:underline hidden sm:inline-block"
        >
          Continue Shopping →
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="p-12 sm:p-20 rounded-3xl bg-white border border-[#E7E4DC] text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#B9D5C4]/30 flex items-center justify-center text-[#23483B] mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-[#23483B]">Your bag is currently peaceful</h2>
            <p className="text-xs text-[#7A807A] max-w-sm mx-auto">
              Explore our curated collections of organic apparel, Montessori wooden toys, and heirloom nursery comforts.
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Items List & Free Delivery Bar */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free shipping threshold progress bar */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E7E4DC] shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-medium">
                {amountNeeded > 0 ? (
                  <span className="text-[#7A807A]">
                    Add <strong className="text-[#23483B]">{formatPrice(amountNeeded)}</strong> more to unlock <span className="text-[#23483B] font-semibold">FREE Express Shipping</span>
                  </span>
                ) : (
                  <span className="text-[#23483B] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Congratulations! Your order qualifies for FREE Express Delivery.
                  </span>
                )}
                <span className="text-[0.6875rem] font-bold text-[#23483B]">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#FAF8F3] overflow-hidden border border-[#E7E4DC]">
                <div
                  className="h-full bg-[#23483B] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* List of Cart Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E7E4DC] shadow-card flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#FAF8F3] flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div>
                      <span className="text-[0.625rem] uppercase font-bold tracking-wider text-[#7A807A]">
                        {item.product.brand}
                      </span>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="font-medium text-sm text-[#252822] hover:text-[#23483B] transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[#7A807A]">
                        {item.selectedColor && (
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            {item.selectedColor.name}
                          </span>
                        )}
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E7E4DC]">
                    {/* Quantity Selector */}
                    <div className="flex items-center rounded-xl border border-[#E7E4DC] bg-[#FAF8F3] px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-[#23483B] text-[#7A807A]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-semibold px-2 min-w-[1.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-[#23483B] text-[#7A807A]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price and Delete */}
                    <div className="text-right min-w-[5.625rem]">
                      <span className="text-sm font-bold text-[#23483B] block">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      {item.product.originalPrice > item.price && (
                        <span className="text-xs text-[#7A807A] line-through block">
                          {formatPrice(item.product.originalPrice * item.quantity)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                      className="p-2 rounded-full hover:bg-black/5 text-[#7A807A] hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-[#E7E4DC] shadow-card space-y-4 sticky top-24">
              <h3 className="font-heading text-lg font-bold text-[#23483B] pb-3 border-b border-[#E7E4DC]">
                Order Summary
              </h3>

              {/* Promo Code Input */}
              {promoCode ? (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-[#B9D5C4]/25 border border-[#B9D5C4]/50 text-xs text-[#23483B]">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Tag className="w-3.5 h-3.5 text-[#23483B]" />
                    {promoCode} applied (-{formatPrice(discount)})
                  </span>
                  <button onClick={removePromoCode} className="font-semibold hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. MOSS20)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F3] uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-[0.6875rem] text-red-500">{promoError}</p>}
                </form>
              )}

              {/* Price Details */}
              <div className="space-y-2.5 pt-2 text-xs text-[#7A807A]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-medium text-[#252822]">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#23483B]">
                    <span>Promotional Savings</span>
                    <span className="font-medium">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-medium text-[#252822]">
                    {shipping === 0 ? <span className="text-[#23483B] font-semibold">FREE</span> : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#23483B] pt-3 border-t border-[#E7E4DC]">
                  <span>Total Amount</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <Link
                href="/checkout"
                className="w-full py-4 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <div className="text-center text-[0.6875rem] text-[#7A807A] pt-1 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#23483B]" />
                <span>15-day mindful doorstep returns & refunds</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suggested pairings */}
      {items.length > 0 && (
        <div className="mt-16 pt-12 border-t border-[#E7E4DC]">
          <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#23483B] mb-6">
            Frequently Paired Together
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {sampleRecommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

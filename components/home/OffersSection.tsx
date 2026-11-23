'use client';

import React from 'react';
import Link from 'next/link';
import { Tag, Sparkles, Truck, Copy } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

export function OffersSection() {
  const { showToast } = useUIStore();

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`Promo code "${code}" copied to clipboard!`, 'info');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#23483B]">
            Welcome Privileges &amp; Bundles
          </h2>
          <p className="text-xs sm:text-sm text-[#7A807A] mt-2">
            Enjoy exclusive welcome blessings and bundle considerations for new parents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 20% Welcome */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E4DC] shadow-card flex flex-col justify-between group hover:border-[#23483B] transition-shadow duration-300">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#F4E4A5]/40 text-[#23483B] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-[#7A807A]">
                New Parent Welcome
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#23483B] mt-1 tracking-tight">
                20% Off First Nest
              </h3>
              <p className="text-xs text-[#7A807A] mt-2 leading-relaxed">
                Receive 20% off your initial order across our organic cotton apparel, non-toxic feeding, and wooden toys.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E7E4DC] flex items-center justify-between">
              <button
                onClick={() => copyCode('MOSS20')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F3] border border-dashed border-[#23483B] text-xs font-mono font-bold text-[#23483B] hover:bg-[#23483B] hover:text-white transition-colors"
              >
                <span>MOSS20</span>
                <Copy className="w-3 h-3" />
              </button>
              <Link href="/shop" className="text-xs font-semibold text-[#23483B] hover:underline">
                Shop now
              </Link>
            </div>
          </div>

          {/* Card 2: 10% Across Everything */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E4DC] shadow-card flex flex-col justify-between group hover:border-[#23483B] transition-shadow duration-300">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#B9D5C4]/40 text-[#23483B] flex items-center justify-center mb-4">
                <Tag className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-[#7A807A]">
                Storewide Privilege
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#23483B] mt-1 tracking-tight">
                10% Off All Orders
              </h3>
              <p className="text-xs text-[#7A807A] mt-2 leading-relaxed">
                Applies instantly to nursery cribs, flight strollers, botanical bath washes, and gift packages.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E7E4DC] flex items-center justify-between">
              <button
                onClick={() => copyCode('LITTLE10')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F3] border border-dashed border-[#23483B] text-xs font-semibold text-[#23483B] hover:bg-[#23483B] hover:text-white transition-colors"
              >
                <span>LITTLE10</span>
                <Copy className="w-3 h-3" />
              </button>
              <Link href="/shop" className="text-xs font-semibold text-[#23483B] hover:underline">
                Shop now
              </Link>
            </div>
          </div>

          {/* Card 3: Free Shipping & Gift Box */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E4DC] shadow-card flex flex-col justify-between group hover:border-[#23483B] transition-shadow duration-300">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#F3C6B3]/40 text-[#23483B] flex items-center justify-center mb-4">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-[#7A807A]">
                Complimentary Shipping
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#23483B] mt-1 tracking-tight">
                Free Delivery &gt; ₹999
              </h3>
              <p className="text-xs text-[#7A807A] mt-2 leading-relaxed">
                Delivered across all Indian pincodes in sustainable, 100% recyclable kraft unboxing packages.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E7E4DC] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#23483B]">Auto-applied at checkout</span>
              <Link href="/cart" className="text-xs font-semibold text-[#23483B] hover:underline">
                View Bag
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

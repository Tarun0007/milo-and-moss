'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      {/* Soft layered background ambient gradient blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F3C6B3]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#B9D5C4]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F4E4A5]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Editorial collection tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E4DC] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#23483B]" />
              <span className="text-xs font-medium text-[#23483B]">
                Autumn &amp; Winter Collection · GOTS Organic
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-[4.25rem] font-bold tracking-tight text-[#23483B] leading-[1.08]">
              Made for every <br />
              <span className="font-bold text-[#2B5848]">
                little wonder.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base lg:text-lg text-[#7A807A] max-w-xl leading-relaxed">
              Discover thoughtfully chosen essentials for their biggest little moments. From chemical-free organic swaddles to Montessori wooden toys designed for calm, conscious homes.
            </p>

            {/* Action Buttons (Stacked on mobile, row on tablet/desktop) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/shop"
                className="group px-7 py-3.5 rounded-full bg-[#23483B] text-[#FAF8F3] text-sm font-semibold hover:bg-[#1A362C] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>Explore the collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/shop?ageRange=0–3+months"
                className="px-6 py-3.5 rounded-full bg-white border border-[#E7E4DC] text-[#252822] text-sm font-semibold hover:border-[#23483B] hover:text-[#23483B] transition-colors shadow-xs text-center"
              >
                Shop newborn essentials
              </Link>
            </div>

            {/* Floating category quick chips */}
            <div className="pt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#7A807A] font-medium mr-1">Trending:</span>
              <Link
                href="/category/clothing"
                className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#252822] border border-[#E7E4DC] transition-colors"
              >
                Kimono Bodysuits
              </Link>
              <Link
                href="/category/toys"
                className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#252822] border border-[#E7E4DC] transition-colors"
              >
                Rainbow Wooden Arches
              </Link>
              <Link
                href="/category/nursery"
                className="px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#252822] border border-[#E7E4DC] transition-colors"
              >
                Beechwood Cribs
              </Link>
              <Link
                href="/gifts"
                className="px-3 py-1.5 rounded-full bg-[#F4E4A5]/40 hover:bg-[#F4E4A5]/70 text-[#23483B] border border-[#F4E4A5] font-semibold transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-[#23483B]" />
                Gift Finder
              </Link>
            </div>

            {/* Trust and material pledges */}
            <div className="pt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#7A807A] border-t border-[#E7E4DC]/60">
              <span className="flex items-center gap-1.5 font-medium text-[#252822]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#23483B]" />
                Non-toxic, food-grade materials
              </span>
              <span>·</span>
              <span>100% GOTS organic cotton</span>
              <span>·</span>
              <span>15-day doorstep returns</span>
            </div>
          </div>

          {/* Right Column: Layered Editorial Layout */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#EBE7DF]">
              {/* Editorial Hero Lifestyle Image */}
              <Image
                src="https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1200&q=85"
                alt="Mother and newborn baby wearing organic cotton apparel"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

              {/* Top-Right Authentic Tag */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/60 text-[0.6875rem] font-semibold text-[#23483B] shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#23483B]" />
                <span>Heirloom Quality</span>
              </div>

              {/* Floating Featured Product Card (Bottom) */}
              <Link
                href="/product/natural-beechwood-rainbow-stacker-12"
                className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-xs p-3 sm:p-3.5 rounded-2xl glass-panel shadow-float hover:scale-[1.02] transition-transform duration-300 block group z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=200&q=80"
                      alt="Rainbow Stacker"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[0.6875rem] font-semibold text-[#23483B] block">
                      Editor&apos;s pick: Pebble &amp; Pine
                    </span>
                    <h4 className="text-xs font-semibold text-[#252822] truncate">
                      Beechwood Rainbow Stacker
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-bold text-[#23483B]">{formatPrice(1299)}</span>
                      <span className="text-[0.625rem] px-2 py-0.5 rounded-full bg-[#B9D5C4]/40 text-[#23483B] font-semibold">
                        FSC Certified
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

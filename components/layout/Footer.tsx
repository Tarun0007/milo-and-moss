'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { ShieldCheck, Sparkles, Heart, Leaf, Check } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useUIStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Thank you for subscribing to thoughtful parenting notes!', 'success');
  };

  return (
    <footer className="bg-[#23483B] text-[#FAF8F3] pt-16 pb-12 border-t border-[#23483B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Promise Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-white/10">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 text-[#B9D5C4] flex-shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-heading text-sm font-bold text-white">GOTS Certified Organic</h5>
              <p className="text-xs text-white/70 mt-0.5">Only chemical-free, hypoallergenic textiles touching skin.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 text-[#F4E4A5] flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-heading text-sm font-bold text-white">FSC Beechwood & Silicone</h5>
              <p className="text-xs text-white/70 mt-0.5">Sustainably harvested non-toxic toys and food-grade dinnerware.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 text-[#F3C6B3] flex-shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-heading text-sm font-bold text-white">Pediatrician Approved</h5>
              <p className="text-xs text-white/70 mt-0.5">Botanical skincare & barefoot-friendly podiatric footwear.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 text-[#D8E5F0] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-heading text-sm font-bold text-white">15-Day Mindful Returns</h5>
              <p className="text-xs text-white/70 mt-0.5">Doorstep pickups with zero friction for busy parents.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12 border-b border-white/10">
          {/* Brand Info & Mission */}
          <div className="md:col-span-4 space-y-4">
            <Logo variant="light" size="md" showTagline={true} />
            <p className="text-xs text-white/75 leading-relaxed max-w-sm pt-2">
              MILO & MOSS is a modern parenting sanctuary celebrating the beauty of early beginnings. We thoughtfully design and curate timeless essentials that honor child development and conscious homes.
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold text-[#B9D5C4] block mb-2">
                Join our private parent circle
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-white/10 border border-[#B9D5C4]/40 text-xs text-[#B9D5C4]">
                  <Check className="w-4 h-4 text-[#B9D5C4]" />
                  <span>You are on our private journal list. Welcome!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#B9D5C4]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#B9D5C4] text-[#23483B] text-xs font-semibold hover:bg-[#A3C8B1] transition-colors"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-[#B9D5C4]">
              Shop collections
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><Link href="/category/clothing" className="hover:text-white transition-colors">Organic Clothing</Link></li>
              <li><Link href="/category/toys" className="hover:text-white transition-colors">Montessori Toys</Link></li>
              <li><Link href="/category/baby-care" className="hover:text-white transition-colors">Botanical Care</Link></li>
              <li><Link href="/category/feeding" className="hover:text-white transition-colors">Silicone Tableware</Link></li>
              <li><Link href="/category/nursery" className="hover:text-white transition-colors">Nursery Woodwork</Link></li>
              <li><Link href="/category/baby-gear" className="hover:text-white transition-colors">Flight Strollers</Link></li>
              <li><Link href="/category/footwear" className="hover:text-white transition-colors">First Steps Shoes</Link></li>
            </ul>
          </div>

          {/* Column 2: Curation */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-[#B9D5C4]">
              Curated for you
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><Link href="/gifts" className="hover:text-white transition-colors">Interactive Gift Finder</Link></li>
              <li><Link href="/journal" className="hover:text-white transition-colors">Parenting Journal</Link></li>
              <li><Link href="/shop?ageRange=0–3+months" className="hover:text-white transition-colors">Newborn 0–3M</Link></li>
              <li><Link href="/shop?ageRange=1–2+years" className="hover:text-white transition-colors">Toddler 1–2Y</Link></li>
              <li><Link href="/shop?sortBy=popular" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link href="/shop?sortBy=newest" className="hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-[#B9D5C4]">
              Care &amp; support
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><Link href="/account" className="hover:text-white transition-colors">Your Account & Orders</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Shopping Bag</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition-colors">Saved Wishlist</Link></li>
              <li><span className="text-white/60 cursor-default">Free Shipping above ₹999</span></li>
              <li><span className="text-white/60 cursor-default">15-Day Easy Returns</span></li>
              <li><span className="text-white/60 cursor-default">Support: care@miloandmoss.com</span></li>
            </ul>
          </div>

          {/* Column 4: Fictional Brand Trust */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#B9D5C4] font-semibold">
              Featured Brands
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><Link href="/shop?brand=Little+Fern" className="hover:text-white transition-colors">Little Fern</Link></li>
              <li><Link href="/shop?brand=Pebble+%26+Pine" className="hover:text-white transition-colors">Pebble & Pine</Link></li>
              <li><Link href="/shop?brand=Tiny+Orbit" className="hover:text-white transition-colors">Tiny Orbit</Link></li>
              <li><Link href="/shop?brand=Cloudberry+Kids" className="hover:text-white transition-colors">Cloudberry Kids</Link></li>
              <li><Link href="/shop?brand=Mini+Meadow" className="hover:text-white transition-colors">Mini Meadow</Link></li>
              <li><Link href="/shop?brand=Sprout+Society" className="hover:text-white transition-colors">Sprout Society</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© 2026 MILO & MOSS. Designed with reverence for little beginnings. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[0.6875rem]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accessibility</span>
            <span className="text-[#B9D5C4]">Demo Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

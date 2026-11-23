'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-0 w-full bg-[#FAF8F3] border-b border-[#E7E4DC] shadow-dropdown z-40 animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Column 1: Core Categories */}
          <div className="col-span-3 border-r border-[#E7E4DC]/60 pr-6">
            <h4 className="text-xs font-semibold text-[#7A807A] mb-4">
              Explore departments
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link 
                  href="/category/clothing" 
                  onClick={onClose}
                  className="group flex items-center justify-between text-[#252822] hover:text-[#23483B] font-medium transition-colors"
                >
                  <span>Baby & Toddler Clothing</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#F3C6B3]/40 text-[#252822] opacity-0 group-hover:opacity-100 transition-opacity">Organic</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/category/toys" 
                  onClick={onClose}
                  className="group flex items-center justify-between text-[#252822] hover:text-[#23483B] font-medium transition-colors"
                >
                  <span>Montessori Wooden Toys</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#B9D5C4]/40 text-[#23483B] opacity-0 group-hover:opacity-100 transition-opacity">FSC Wood</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/category/baby-care" 
                  onClick={onClose}
                  className="flex items-center justify-between text-[#252822] hover:text-[#23483B] font-medium transition-colors"
                >
                  <span>Botanical Baby Care</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/category/feeding" 
                  onClick={onClose}
                  className="flex items-center justify-between text-[#252822] hover:text-[#23483B] font-medium transition-colors"
                >
                  <span>Pure Silicone Feeding</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/category/nursery" 
                  onClick={onClose}
                  className="flex items-center justify-between text-[#252822] hover:text-[#23483B] font-medium transition-colors"
                >
                  <span>Nursery Furniture & Decor</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/category/baby-gear" 
                  onClick={onClose}
                  className="flex items-center justify-between text-[#252822] hover:text-[#23483B] font-medium transition-colors"
                >
                  <span>Baby Gear & Strollers</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/category/mom-maternity" 
                  onClick={onClose}
                  className="flex items-center justify-between text-[#252822] hover:text-[#23483B] font-medium transition-colors"
                >
                  <span>Mom & Maternity Lounge</span>
                </Link>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[#E7E4DC]/60">
              <Link 
                href="/shop" 
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#23483B] hover:underline"
              >
                <span>View all 120+ essentials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Shop by Age Milestones */}
          <div className="col-span-3 border-r border-[#E7E4DC]/60 pr-6">
            <h4 className="text-xs font-semibold text-[#7A807A] mb-4">
              Shop by milestone
            </h4>
            <div className="space-y-2">
              {[
                { label: 'Newborn Essentials', age: '0–3 months', badge: 'Fourth Trimester' },
                { label: 'Tummy Time & Wonder', age: '3–6 months', badge: 'Sensory' },
                { label: 'Sitting & First Solids', age: '6–12 months', badge: 'Weaning' },
                { label: 'First Steps & Walking', age: '1–2 years', badge: 'Barefoot' },
                { label: 'Montessori Playroom', age: '2–4 years', badge: 'Curiosity' },
                { label: 'Preschool & Outdoor', age: '4–6 years', badge: 'Activity' },
              ].map((item) => (
                <Link
                  key={item.age}
                  href={`/shop?ageRange=${encodeURIComponent(item.age)}`}
                  onClick={onClose}
                  className="group flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors text-sm"
                >
                  <div>
                    <span className="block font-medium text-[#252822] group-hover:text-[#23483B]">
                      {item.label}
                    </span>
                    <span className="text-xs text-[#7A807A]">{item.age}</span>
                  </div>
                  <span className="text-[0.6875rem] px-2 py-0.5 rounded-md bg-[#FAF8F3] border border-[#E7E4DC] text-[#7A807A] group-hover:border-[#B9D5C4] group-hover:text-[#23483B]">
                    {item.badge}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Curated Edits */}
          <div className="col-span-3 border-r border-[#E7E4DC]/60 pr-6">
            <h4 className="text-xs font-semibold text-[#7A807A] mb-4">
              Curated edits
            </h4>
            <div className="space-y-3">
              <Link
                href="/gifts"
                onClick={onClose}
                className="block p-3.5 rounded-2xl bg-[#F4E4A5]/25 hover:bg-[#F4E4A5]/40 transition-colors border border-[#F4E4A5]/50 group"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-[#23483B]">
                  <Sparkles className="w-3.5 h-3.5 text-[#23483B]" />
                  <span>The Gift Concierge</span>
                </div>
                <p className="text-xs text-[#7A807A] mt-1 leading-relaxed">
                  Interactive quiz matching the perfect present by baby age & occasion.
                </p>
              </Link>

              <Link
                href="/journal"
                onClick={onClose}
                className="block p-3.5 rounded-2xl bg-[#E6DDF1]/30 hover:bg-[#E6DDF1]/50 transition-colors border border-[#E6DDF1]/50 group"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-[#23483B]">
                  <Heart className="w-3.5 h-3.5 text-[#23483B]" />
                  <span>Parenting Journal</span>
                </div>
                <p className="text-xs text-[#7A807A] mt-1 leading-relaxed">
                  Pediatrician notes on infant sleep rhythms, gentle weaning & Montessori spaces.
                </p>
              </Link>

              <Link
                href="/shop?sortBy=popular"
                onClick={onClose}
                className="block p-3.5 rounded-2xl bg-[#B9D5C4]/25 hover:bg-[#B9D5C4]/40 transition-colors border border-[#B9D5C4]/50 group"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-[#23483B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#23483B]" />
                  <span>Parent Loved Best Sellers</span>
                </div>
                <p className="text-xs text-[#7A807A] mt-1 leading-relaxed">
                  Top-rated essentials reviewed by over 20,000+ conscious families.
                </p>
              </Link>
            </div>
          </div>

          {/* Column 4: Editorial Spotlight Card */}
          <div className="col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-[#7A807A] font-semibold mb-4">
              Seasonal Focus
            </h4>
            <div className="relative rounded-2xl overflow-hidden shadow-card group">
              <div className="aspect-[4/3] relative w-full">
                <Image
                  src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80"
                  alt="Nursery Dreams Spotlight"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#23483B]/85 via-[#23483B]/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 text-[#FAF8F3]">
                <span className="text-[0.625rem] uppercase tracking-wider font-semibold bg-[#FAF8F3]/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  Editorial Spotlight
                </span>
                <h5 className="font-heading text-base font-bold mt-1.5 leading-snug">
                  The Sanctuary Nursery
                </h5>
                <p className="text-xs text-[#FAF8F3]/80 mt-1 line-clamp-2">
                  Heirloom beechwood cribs, organic sleep sacks, and amber nightlights for peaceful dreams.
                </p>
                <Link
                  href="/category/nursery"
                  onClick={onClose}
                  className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-[#B9D5C4] hover:text-white"
                >
                  <span>Explore sanctuary collection</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

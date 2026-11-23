'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const ageGroups = [
  {
    title: 'Newborn',
    range: '0–3 months',
    subtitle: 'Fourth trimester swaddles, organic kimonos & gentle soothing',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=400&q=80',
    color: '#F3C6B3',
  },
  {
    title: 'Little Wonder',
    range: '3–6 months',
    subtitle: 'Tummy time rollers, sensory crinkles & organic teething rings',
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=400&q=80',
    color: '#B9D5C4',
  },
  {
    title: 'Sitting & Solids',
    range: '6–12 months',
    subtitle: 'Silicone weaning bowls, crawling knees & object permanence boxes',
    image: 'https://images.unsplash.com/photo-1595347097560-69238724e7bd?auto=format&fit=crop&w=400&q=80',
    color: '#F4E4A5',
  },
  {
    title: 'First Steps',
    range: '1–2 years',
    subtitle: 'Barefoot pre-walker shoes, stacking pebbles & first puzzles',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80',
    color: '#D8E5F0',
  },
  {
    title: 'Toddler Explorer',
    range: '2–4 years',
    subtitle: 'Balance boards, Montessori busy boards & mini backpacks',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80',
    color: '#E6DDF1',
  },
  {
    title: 'Playful Mind',
    range: '4–6 years',
    subtitle: 'Natural beeswax art kits, storybooks & outdoor tents',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80',
    color: '#F3C6B3',
  },
  {
    title: 'Big Beginnings',
    range: '6+ years',
    subtitle: 'Stationery sets, stainless lunchware & developmental puzzles',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    color: '#B9D5C4',
  },
];

export function AgeExplorer() {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#23483B]">
              Shop by Age &amp; Stage
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7A807A] max-w-md mt-2 md:mt-0">
            Every developmental window requires distinct physical and cognitive support. Filter essentials curated specifically for their current stage.
          </p>
        </div>

        {/* Horizontal scrollable on mobile, grid on desktop */}
        <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x">
          {ageGroups.map((group) => (
            <Link
              key={group.range}
              href={`/shop?ageRange=${encodeURIComponent(group.range)}`}
              className="group flex flex-col items-center text-center p-3.5 sm:p-4 rounded-3xl bg-white border border-[#E7E4DC] hover:border-[#23483B] hover:shadow-float transition-shadow duration-300 w-36 sm:w-auto flex-shrink-0 snap-start"
            >
              {/* Rounded circular avatar image */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 border-2 border-[#FAF8F3] shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={group.image}
                  alt={group.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <span className="text-[0.625rem] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FAF8F3] text-[#23483B] mb-1">
                {group.range}
              </span>

              <h3 className="font-heading text-xs sm:text-sm font-bold text-[#252822] group-hover:text-[#23483B] transition-colors leading-tight">
                {group.title}
              </h3>

              <p className="text-[0.625rem] text-[#7A807A] mt-1.5 line-clamp-2 leading-tight hidden sm:block">
                {group.subtitle}
              </p>

              <div className="mt-3 text-[0.6875rem] font-semibold text-[#23483B] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

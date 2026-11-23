'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    id: 'soft-beginnings',
    title: 'Soft Beginnings',
    tagline: '100% GOTS Organic Cotton',
    description: 'Chemical-free, breathable kimono bodysuits, double-layer swaddles, and footed sleepers designed for sensitive fourth-trimester skin.',
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80',
    link: '/category/clothing',
    badgeBg: '#F3C6B3',
    themeBg: 'bg-[#F9F5EE]',
  },
  {
    id: 'playful-learning',
    title: 'Playful Learning',
    tagline: 'Montessori Wooden Toys',
    description: 'Open-ended, tactile play crafted from FSC-certified sustainable European beechwood and smooth water-based food-safe stains.',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    link: '/category/toys',
    badgeBg: '#B9D5C4',
    themeBg: 'bg-[#F3F7F4]',
  },
  {
    id: 'nursery-dreams',
    title: 'Nursery Dreams',
    tagline: 'Heirloom Scandinavian Furniture',
    description: 'Convertible solid wood cribs, organic latex mattresses, amber ambient lighting, and hand-quilted Indian cotton voile dohars.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    link: '/category/nursery',
    badgeBg: '#E6DDF1',
    themeBg: 'bg-[#F7F4F9]',
  },
  {
    id: 'little-explorers',
    title: 'Little Explorers',
    tagline: 'Flight Strollers & Barefoot Steps',
    description: 'Cabin-approved 4.8kg aerospace alloy strollers, hip-healthy organic wraps, and flexible barefoot podiatric pre-walkers.',
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=800&q=80',
    link: '/category/baby-gear',
    badgeBg: '#F4E4A5',
    themeBg: 'bg-[#FAF8EC]',
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-heading text-2xl sm:text-5xl font-bold tracking-tight text-[#23483B]">
            Featured Editorial Collections
          </h2>
          <p className="text-xs sm:text-sm text-[#7A807A] mt-2.5">
            Designed to bring quiet elegance, organic safety, and developmental harmony to your family&apos;s daily routine.
          </p>
        </div>

        {/* Editorial Layout: Alternating large cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {collections.map((col) => (
            <div
              key={col.id}
              className={`rounded-3xl overflow-hidden border border-[#E7E4DC] ${col.themeBg} p-6 sm:p-8 flex flex-col justify-between shadow-card hover:shadow-float transition-shadow duration-300 group`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full text-[#23483B]"
                    style={{ backgroundColor: `${col.badgeBg}99` }}
                  >
                    {col.tagline}
                  </span>
                  <span className="text-xs font-sans text-[#7A807A]">
                    Curated Edit
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#23483B] mb-2 tracking-tight">
                  {col.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#7A807A] leading-relaxed mb-6">
                  {col.description}
                </p>
              </div>

              {/* Lifestyle Image in Card */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-white shadow-sm mb-6">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <Link
                href={col.link}
                className="group inline-flex items-center gap-2 text-xs font-semibold text-[#23483B]"
              >
                <span>Shop the {col.title} edit</span>
                <ArrowRight className="w-4 h-4 text-[#23483B] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

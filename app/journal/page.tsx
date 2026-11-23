'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Clock, ArrowRight, Search, ChevronRight } from 'lucide-react';
import articlesData from '@/data/articles.json';
import { Article } from '@/types/article';

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const articles: Article[] = articlesData as Article[];
  const categories = ['All', 'Newborn', 'Sleep', 'Nutrition', 'Play & Learning', 'Parenting Guides'];

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchCat = selectedCategory === 'All' || a.category === selectedCategory;
      const matchQuery =
        !searchQuery ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  const featured = articles[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#7A807A] mb-8">
        <Link href="/" className="hover:text-[#23483B]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#252822] font-semibold">The Parenting Journal</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-xs font-semibold text-[#23483B] mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Pediatric & Developmental Wisdom</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-[#23483B]">
          The Parenting Journal
        </h1>
        <p className="text-xs sm:text-sm text-[#7A807A] mt-2.5 leading-relaxed">
          Thoughtful, science-backed essays and gentle guidance for modern parents. From infant sleep rhythms to creating Montessori home spaces.
        </p>
      </div>

      {/* Featured Lead Article */}
      {featured && (
        <div className="mb-14 rounded-3xl overflow-hidden bg-white border border-[#E7E4DC] shadow-card group">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:h-full min-h-[20rem] overflow-hidden bg-[#FAF8F3]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-[#23483B] text-white">
                Featured Cover Story
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 space-y-4">
              <div className="flex items-center gap-3 text-xs text-[#7A807A]">
                <span className="font-semibold text-[#23483B] uppercase tracking-wider">{featured.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {featured.readTime}
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#23483B] leading-tight group-hover:text-[#2B5848] transition-colors tracking-tight">
                <Link href={`/journal/${featured.slug}`}>
                  {featured.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-[#7A807A] leading-relaxed">
                {featured.excerpt}
              </p>

              <div className="pt-4 border-t border-[#E7E4DC] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white">
                    <Image src={featured.author.avatar} alt={featured.author.name} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#252822] block leading-none">{featured.author.name}</span>
                    <span className="text-[0.625rem] text-[#7A807A] leading-none">{featured.author.role}</span>
                  </div>
                </div>

                <Link
                  href={`/journal/${featured.slug}`}
                  className="group inline-flex items-center gap-1 text-xs font-semibold text-[#23483B]"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Category Pills & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E7E4DC]">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#23483B] text-white shadow-sm'
                  : 'bg-white text-[#252822] border border-[#E7E4DC] hover:border-[#23483B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#7A807A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-full bg-white border border-[#E7E4DC] text-[#252822] focus:outline-none focus:border-[#23483B]"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            href={`/journal/${article.slug}`}
            className="group flex flex-col justify-between rounded-3xl overflow-hidden bg-white border border-[#E7E4DC] hover:border-[#23483B] shadow-card hover:shadow-float transition-shadow transition-colors duration-300"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF8F3]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute top-3 left-3 text-[0.625rem] font-semibold px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#23483B]">
                  {article.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#7A807A]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                  <span>•</span>
                  <span>{article.publishedAt}</span>
                </div>

                <h3 className="font-heading text-lg font-bold text-[#252822] group-hover:text-[#23483B] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-[#7A807A] leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-[#E7E4DC]/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-white">
                  <Image src={article.author.avatar} alt="" fill className="object-cover" />
                </div>
                <span className="text-xs font-semibold text-[#252822]">{article.author.name}</span>
              </div>

              <ArrowRight className="w-4 h-4 text-[#7A807A] group-hover:text-[#23483B] group-hover:translate-x-1 transition-transform transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

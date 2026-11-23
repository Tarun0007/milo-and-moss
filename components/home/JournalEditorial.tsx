'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import articlesData from '@/data/articles.json';
import { Article } from '@/types/article';

export function JournalEditorial() {
  const articles: Article[] = articlesData as Article[];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E7E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#23483B]">
              The Parenting Journal
            </h2>
          </div>
          <Link
            href="/journal"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#23483B] hover:underline mt-2 md:mt-0"
          >
            <span>Read all articles &amp; guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Featured Editorial Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.slug}`}
              className="group flex flex-col justify-between rounded-3xl overflow-hidden bg-[#FAF8F3] border border-[#E7E4DC] hover:border-[#23483B] hover:shadow-card transition-shadow duration-300"
            >
              <div>
                {/* Article Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E7E4DC]">
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

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#7A807A]">
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

              {/* Author Footer */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#E7E4DC]/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden bg-white">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#252822] block leading-none">
                      {article.author.name}
                    </span>
                    <span className="text-[0.625rem] text-[#7A807A] leading-none">
                      {article.author.role}
                    </span>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-[#7A807A] group-hover:text-[#23483B] group-hover:translate-x-1 transition-transform transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

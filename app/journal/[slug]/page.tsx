import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Clock, ArrowLeft, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { getArticleBySlug, getArticles, getRelatedArticles } from '@/lib/api/articles';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

interface ArticlePageProps {
  params: { slug: string };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const related = await getRelatedArticles(article.slug, 3);

  return (
    <article className="min-h-screen bg-[#FAF8F3] py-8 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[#7A807A] mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#23483B]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/journal" className="hover:text-[#23483B]">The Parenting Journal</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#252822] font-semibold truncate max-w-xs">{article.title}</span>
        </nav>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-xs text-[#7A807A]">
            <span className="font-bold text-[#23483B] uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#B9D5C4]/35">
              {article.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span>•</span>
            <span>{article.publishedAt}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#23483B] leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-lg text-[#7A807A] font-light leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author Card Header */}
          <div className="flex items-center justify-between pt-4 pb-2 border-y border-[#E7E4DC]">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden bg-white shadow-sm border border-[#E7E4DC]">
                <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#252822]">{article.author.name}</h4>
                <p className="text-[0.6875rem] text-[#7A807A]">{article.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#7A807A] font-medium hidden sm:inline">Verified Pediatric Note</span>
              <Sparkles className="w-3.5 h-3.5 text-[#23483B]" />
            </div>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-white shadow-card border border-[#E7E4DC] mb-12">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E7E4DC] shadow-card space-y-6 text-sm sm:text-base leading-relaxed text-[#252822] mb-14 font-sans">
          {article.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed text-[#252822]/90">
              {paragraph}
            </p>
          ))}

          {/* Editorial Quote Callout */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F3] border-l-4 border-[#23483B] my-8 space-y-2">
            <p className="font-serif italic text-lg sm:text-xl text-[#23483B] leading-snug">
              &ldquo;Parenting during the tender initial milestones is not about mechanical precision—it is about honoring sensory warmth, patience, and presence.&rdquo;
            </p>
            <span className="text-xs text-[#7A807A] font-semibold block uppercase tracking-wider">
              — {article.author.name}
            </span>
          </div>

          <div className="pt-6 border-t border-[#E7E4DC] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-[#7A807A] mr-1">Tags:</span>
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#E7E4DC] text-[#252822]"
                >
                  #{t}
                </span>
              ))}
            </div>

            <Link
              href="/journal"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#23483B] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Journal Overview</span>
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-medium text-[#23483B] pb-3 border-b border-[#E7E4DC]">
              Continue Reading
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/journal/${item.slug}`}
                  className="group p-4 rounded-2xl bg-white border border-[#E7E4DC] shadow-sm hover:border-[#23483B] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[0.625rem] font-bold uppercase tracking-wider text-[#7A807A]">
                      {item.category} • {item.readTime}
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#252822] group-hover:text-[#23483B] transition-colors mt-1 line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#E7E4DC] text-[0.6875rem] font-semibold text-[#23483B] flex items-center justify-between">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

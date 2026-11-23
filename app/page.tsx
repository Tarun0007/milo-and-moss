import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { AgeExplorer } from '@/components/home/AgeExplorer';
import { TrendingCarousel } from '@/components/home/TrendingCarousel';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { BestSellersGrid } from '@/components/home/BestSellersGrid';
import { ShopByBrands } from '@/components/home/ShopByBrands';
import { JournalEditorial } from '@/components/home/JournalEditorial';
import { OffersSection } from '@/components/home/OffersSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { getTrendingProducts, getBestSellers } from '@/lib/api/products';

export default async function HomePage() {
  const [trendingProducts, bestSellerProducts] = await Promise.all([
    getTrendingProducts(10),
    getBestSellers(8),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <CategoryGrid />
      <AgeExplorer />
      <TrendingCarousel products={trendingProducts} />
      <FeaturedCollections />
      <BestSellersGrid products={bestSellerProducts} />
      <ShopByBrands />
      <JournalEditorial />
      <OffersSection />
      <NewsletterSection />
    </div>
  );
}

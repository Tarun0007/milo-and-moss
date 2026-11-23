import React from 'react';
import { GiftFinderWizard } from '@/components/gifts/GiftFinderWizard';
import { Gift } from 'lucide-react';

export const metadata = {
  title: 'The Gift Concierge | MILO & MOSS',
  description: 'Interactive gifting discovery matching baby age, occasion, and budget with certified organic and Montessori essentials.',
};

export default function GiftsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E4DC] text-xs font-semibold text-[#23483B] mb-3">
            <Gift className="w-3.5 h-3.5 text-[#23483B]" />
            <span>Interactive Gift Discovery</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#23483B] leading-tight">
            The Gift Concierge
          </h1>
          <p className="text-xs sm:text-sm text-[#7A807A] mt-2.5 leading-relaxed">
            Whether welcoming a newborn or celebrating a first birthday, let our interactive wizard find the sweetest, safest presents for your loved ones.
          </p>
        </div>

        {/* Wizard Form & Interactive Results */}
        <GiftFinderWizard />
      </div>
    </div>
  );
}

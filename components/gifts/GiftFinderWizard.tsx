'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/product/ProductCard';
import { cn } from '@/lib/utils';

const recipients = [
  { id: 'baby', label: 'Infant / Baby', desc: '0 to 12 months sweet bundle', icon: '👶' },
  { id: 'toddler', label: 'Toddler', desc: '1 to 3 years first steps & play', icon: '🧸' },
  { id: 'kid', label: 'Curious Kid', desc: '3 to 6+ years active explorers', icon: '🎨' },
  { id: 'parent', label: 'Expecting Mother', desc: 'Maternity comfort & recovery', icon: '🌿' },
];

const occasions = [
  { id: 'newborn-welcome', label: 'Newborn Welcome', desc: 'Welcoming the little one home' },
  { id: 'baby-shower', label: 'Baby Shower', desc: 'Thoughtful gifts for parents-to-be' },
  { id: 'first-birthday', label: 'First Birthday', desc: 'Milestone heirloom celebration' },
  { id: 'festivals', label: 'Festivals & Diwali', desc: 'Blessings & festive apparel' },
  { id: 'just-because', label: 'Just Because', desc: 'Everyday delight and affection' },
];

const budgets = [
  { id: 'under-1000', label: 'Under ₹1,000', min: 0, max: 1000 },
  { id: '1000-2500', label: '₹1,000 – ₹2,500', min: 1000, max: 2500 },
  { id: '2500-5000', label: '₹2,500 – ₹5,000', min: 2500, max: 5000 },
  { id: 'luxury', label: 'Heirloom Luxury (> ₹5,000)', min: 5000, max: 100000 },
];

export function GiftFinderWizard() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedRecipient, setSelectedRecipient] = useState<string>('baby');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('newborn-welcome');
  const [selectedBudget, setSelectedBudget] = useState<string>('1000-2500');
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleCalculate = () => {
    const budgetObj = budgets.find((b) => b.id === selectedBudget) || budgets[1];
    const allProducts = productsData as unknown as Product[];

    let filtered = allProducts.filter((p) => {
      const withinPrice = p.price >= budgetObj.min && p.price <= budgetObj.max;
      return withinPrice;
    });

    if (selectedRecipient === 'parent') {
      filtered = filtered.filter((p) => p.category === 'Mom & maternity' || p.category === 'Nursery');
    } else if (selectedRecipient === 'toddler') {
      filtered = filtered.filter((p) => p.ageRange.includes('1–2') || p.ageRange.includes('2–4') || p.category === 'Toys');
    } else if (selectedRecipient === 'kid') {
      filtered = filtered.filter((p) => p.ageRange.includes('2–4') || p.ageRange.includes('4–6') || p.category === 'Books');
    } else {
      // baby
      filtered = filtered.filter((p) => p.ageRange.includes('0–3') || p.ageRange.includes('3–6') || p.category === 'Clothing');
    }

    if (filtered.length < 4) {
      filtered = allProducts.slice(0, 8);
    }

    setMatchedProducts(filtered.slice(0, 8));
    setIsCalculated(true);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedRecipient('baby');
    setSelectedOccasion('newborn-welcome');
    setSelectedBudget('1000-2500');
    setIsCalculated(false);
    setMatchedProducts([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!isCalculated ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E4DC] shadow-card">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E7E4DC]">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#23483B] text-white text-xs font-bold flex items-center justify-center">
                {step}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#23483B]">
                Step {step} of 3
              </span>
            </div>
            <span className="text-xs text-[#7A807A]">
              {step === 1 && 'Select recipient'}
              {step === 2 && 'Choose occasion'}
              {step === 3 && 'Set price comfort'}
            </span>
          </div>

          {/* Step 1: Who is the gift for? */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#23483B]">
                  Who are you celebrating today?
                </h3>
                <p className="text-xs text-[#7A807A]">
                  Select the recipient to tailor organic apparel, sensory toys, or soothing mother care.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recipients.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRecipient(r.id)}
                    className={cn(
                      "p-5 rounded-2xl border text-left flex items-start gap-3.5 transition-colors",
                      selectedRecipient === r.id
                        ? "border-[#23483B] bg-[#FAF8F3] shadow-sm ring-1 ring-[#23483B]"
                        : "border-[#E7E4DC] hover:border-[#B9D5C4] hover:bg-[#FAF8F3]/50"
                    )}
                  >
                    <span className="text-2xl">{r.icon}</span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#252822]">{r.label}</h4>
                      <p className="text-xs text-[#7A807A] mt-0.5">{r.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors flex items-center gap-2"
                >
                  <span>Continue to Occasion</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: What is the occasion? */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#23483B]">
                  What is the special occasion?
                </h3>
                <p className="text-xs text-[#7A807A]">
                  We match gift-ready packaging, heirloom keepsakes, or festive bundles.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {occasions.map((occ) => (
                  <button
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ.id)}
                    className={cn(
                      "p-4 rounded-2xl border text-left transition-colors",
                      selectedOccasion === occ.id
                        ? "border-[#23483B] bg-[#FAF8F3] shadow-sm ring-1 ring-[#23483B]"
                        : "border-[#E7E4DC] hover:border-[#B9D5C4] hover:bg-[#FAF8F3]/50"
                    )}
                  >
                    <h4 className="text-sm font-semibold text-[#252822]">{occ.label}</h4>
                    <p className="text-xs text-[#7A807A] mt-0.5">{occ.desc}</p>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-[#7A807A] hover:text-[#23483B]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors flex items-center gap-2"
                >
                  <span>Continue to Budget</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Budget Comfort */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#23483B]">
                  What is your gifting budget?
                </h3>
                <p className="text-xs text-[#7A807A]">
                  Every tier features sustainably packaged, certified non-toxic essentials.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {budgets.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBudget(b.id)}
                    className={cn(
                      "p-4 rounded-2xl border text-left transition-colors",
                      selectedBudget === b.id
                        ? "border-[#23483B] bg-[#FAF8F3] shadow-sm ring-1 ring-[#23483B]"
                        : "border-[#E7E4DC] hover:border-[#B9D5C4] hover:bg-[#FAF8F3]/50"
                    )}
                  >
                    <h4 className="text-sm font-semibold text-[#252822]">{b.label}</h4>
                    <span className="text-[0.6875rem] text-[#7A807A] block mt-0.5">Complimentary gift unboxing</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs font-semibold text-[#7A807A] hover:text-[#23483B]"
                >
                  Back
                </button>
                <button
                  onClick={handleCalculate}
                  className="px-7 py-3 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B9D5C4]" />
                  <span>Reveal Curated Recommendations</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="p-6 rounded-3xl bg-white border border-[#E7E4DC] shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#23483B] flex items-center gap-1.5 justify-center sm:justify-start">
                <Sparkles className="w-3.5 h-3.5 text-[#23483B]" />
                Concierge Match Complete
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#23483B]">
                Curated Gifting Recommendations
              </h3>
              <p className="text-xs text-[#7A807A]">
                Matched for {recipients.find((r) => r.id === selectedRecipient)?.label} • {occasions.find((o) => o.id === selectedOccasion)?.label}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E7E4DC] text-xs font-semibold text-[#252822] hover:bg-[#FAF8F3] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Modify Quiz Answers</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {matchedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF8F3] border border-[#E7E4DC] text-center space-y-2">
            <h4 className="font-heading text-lg font-bold text-[#23483B] tracking-tight">
              Looking for something completely custom?
            </h4>
            <p className="text-xs text-[#7A807A] max-w-md mx-auto">
              Our parent stylists can prepare a bespoke wooden keepsake crate hand-stamped with the baby&apos;s name.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#23483B] hover:underline pt-2"
            >
              <span>Explore all 120+ products in the catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

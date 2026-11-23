'use client';

import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isDone, setIsDone] = useState(false);
  const { showToast } = useUIStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsDone(true);
    showToast('Welcome to the MILO & MOSS family circle!', 'success');
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E7E4DC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-2xl sm:text-5xl font-bold tracking-tight text-[#23483B] mb-3">
          A little love in your inbox.
        </h2>

        <p className="text-xs sm:text-base text-[#7A807A] max-w-xl mx-auto mb-8 leading-relaxed">
          Discover new favorites, thoughtful tips, and little things that make growing up special. No spam: only gentle notes on developmental play, sleep, and seasonal launches.
        </p>

        {isDone ? (
          <div className="inline-flex items-center gap-2.5 px-6 py-4 rounded-3xl bg-[#B9D5C4]/30 border border-[#B9D5C4] text-sm text-[#23483B] font-medium animate-in zoom-in-95">
            <Check className="w-5 h-5 text-[#23483B]" />
            <span>Thank you! Your welcome guide & 20% code has been sent.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#7A807A] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs sm:text-sm pl-11 pr-4 py-3.5 rounded-full bg-[#FAF8F3] border border-[#E7E4DC] focus:outline-none focus:border-[#23483B] text-[#252822] placeholder-[#7A807A]"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-[#23483B] text-[#FAF8F3] text-xs sm:text-sm font-semibold hover:bg-[#1A362C] transition-colors shadow-sm"
            >
              Subscribe
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-6 mt-6 text-[0.6875rem] text-[#7A807A]">
          <span>✓ Private & spam-free</span>
          <span>✓ Unsubscribe anytime</span>
          <span>✓ Weekly mindful reads</span>
        </div>
      </div>
    </section>
  );
}

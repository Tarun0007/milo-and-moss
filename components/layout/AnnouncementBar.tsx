'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const announcements = [
  "Free delivery across India on orders above ₹999: made for little moments",
  "Welcome to MILO & MOSS: Use code MOSS20 for 20% off your first order",
  "Pediatrician-approved gentle botanicals and 100% GOTS organic cotton textiles",
  "Mindful parenting: 15-day easy doorstep returns and heirloom quality guarantee"
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <div className="relative bg-[#23483B] text-[#FAF8F3] text-xs font-medium py-2 px-4 select-none z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="p-1 hover:text-[#B9D5C4] transition-colors rounded-full"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 text-center overflow-hidden px-2 min-w-0">
          <span className="text-[0.6875rem] sm:text-xs truncate block font-normal text-[#FAF8F3]/90">
            {announcements[currentIndex]}
          </span>
        </div>

        <button
          onClick={handleNext}
          aria-label="Next announcement"
          className="p-1 hover:text-[#B9D5C4] transition-colors rounded-full"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export function Logo({
  className,
  showTagline = false,
  size = 'md',
  variant = 'dark',
}: LogoProps) {
  const isLight = variant === 'light';

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 select-none transition-opacity hover:opacity-90 flex-shrink-0",
        className
      )}
      aria-label="MILO & MOSS - Little things. Big beginnings."
    >
      {/* Bespoke Scandinavian Botanical Emblem */}
      <div
        className={cn(
          "relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0",
          size === 'sm' && "w-7 h-7",
          size === 'md' && "w-8 h-8",
          size === 'lg' && "w-10 h-10"
        )}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Elegant Parent Leaf (Protective Outer Arch) */}
          <path
            d="M8 25C8 18 12 11 20 8C20 15 17 22 10 25H8Z"
            fill={isLight ? "#FFFFFF" : "#23483B"}
            fillOpacity={isLight ? "0.95" : "1"}
          />
          {/* Tender Child Leaf (Gentle Inner Bloom in Soft Sage) */}
          <path
            d="M13 25C13 19 16 14.5 24 13C23.5 19 20 23.5 14.5 25H13Z"
            fill={isLight ? "#B9D5C4" : "#88B29A"}
            fillOpacity="0.9"
          />
          {/* Subtle Grounding Horizon Line */}
          <path
            d="M6 26.5H26"
            stroke={isLight ? "rgba(255,255,255,0.4)" : "#23483B"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity={isLight ? "0.5" : "0.25"}
          />
        </svg>
      </div>

      {/* Modern High-End Scandinavian Brandmark */}
      <div className="flex flex-col justify-center flex-shrink-0">
        <span
          className={cn(
            "font-heading font-bold uppercase leading-none transition-colors whitespace-nowrap",
            size === 'sm' && "text-[0.9375rem] tracking-[0.14em]",
            size === 'md' && "text-[1.0625rem] tracking-[0.16em]",
            size === 'lg' && "text-[1.3125rem] tracking-[0.18em]",
            isLight ? "text-white" : "text-[#23483B]"
          )}
        >
          MILO <span className={isLight ? "text-white/70 font-light mx-0.5" : "text-[#88B29A] font-light mx-0.5"}>&amp;</span> MOSS
        </span>

        {showTagline && (
          <span
            className={cn(
              "font-sans text-[0.5rem] uppercase tracking-[0.22em] font-medium leading-none mt-1 whitespace-nowrap",
              isLight ? "text-white/60" : "text-[#7A807A]"
            )}
          >
            Little things · Big beginnings
          </span>
        )}
      </div>
    </Link>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Box, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80';

const Product3DViewer = dynamic(
  () => import('./Product3DViewer').then((mod) => mod.Product3DViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square rounded-3xl bg-[#FAF8F3] flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#B9D5C4]/30 animate-pulse" />
      </div>
    ),
  }
);

interface ProductGalleryProps {
  images: string[];
  productName: string;
  themeColor?: string;
}

export function ProductGallery({ images, productName, themeColor }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [is3DMode, setIs3DMode] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const handleImageError = (index: number) => {
    setFailedImages((prev) => ({ ...prev, [index]: true }));
  };

  const getValidSrc = (index: number) => {
    if (failedImages[index] || !images[index]) {
      return FALLBACK_IMAGE;
    }
    return images[index];
  };

  return (
    <div className="space-y-4">
      {/* 2D / 3D Toggle Pill Bar */}
      <div className="flex items-center justify-between">
        <div className="inline-flex p-1 rounded-2xl bg-white border border-[#23483B]/10 shadow-xs">
          <button
            onClick={() => setIs3DMode(false)}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors",
              !is3DMode
                ? "bg-[#23483B] text-white shadow-xs"
                : "text-[#7A807A] hover:text-[#23483B]"
            )}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photography</span>
          </button>
          <button
            onClick={() => setIs3DMode(true)}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors",
              is3DMode
                ? "bg-[#23483B] text-white shadow-xs"
                : "text-[#7A807A] hover:text-[#23483B]"
            )}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Interactive</span>
          </button>
        </div>

        {!is3DMode && (
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="text-xs text-[#7A807A] hover:text-[#23483B] flex items-center gap-1 font-medium"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>{isZoomed ? 'Reset zoom' : 'Click to zoom'}</span>
          </button>
        )}
      </div>

      {/* Main Viewport */}
      {is3DMode ? (
        <Product3DViewer color={themeColor} />
      ) : (
        <div
          onClick={() => setIsZoomed(!isZoomed)}
          className={cn(
            "relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#23483B]/10 shadow-xs cursor-zoom-in transition-shadow",
            isZoomed && "cursor-zoom-out ring-2 ring-[#23483B]"
          )}
        >
          <Image
            src={getValidSrc(selectedIndex)}
            alt={productName}
            fill
            priority
            onError={() => handleImageError(selectedIndex)}
            className={cn(
              "object-cover transition-transform duration-500",
              isZoomed ? "scale-150" : "hover:scale-105"
            )}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      )}

      {/* Thumbnail Selection Strip */}
      {!is3DMode && images.length > 1 && (
        <div className="flex gap-2.5">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedIndex(idx);
                setIsZoomed(false);
              }}
              className={cn(
                "relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white border-2 transition-transform transition-colors",
                selectedIndex === idx
                  ? "border-[#23483B] scale-105 ring-1 ring-[#23483B]"
                  : "border-[#23483B]/10 opacity-75 hover:opacity-100"
              )}
            >
              <Image
                src={getValidSrc(idx)}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                onError={() => handleImageError(idx)}
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

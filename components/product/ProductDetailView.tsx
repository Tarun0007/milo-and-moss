'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Star,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  Share2,
  Check,
  Plus,
  Minus,
  CheckCircle2,
} from 'lucide-react';
import { Product } from '@/types/product';
import { ProductGallery } from './ProductGallery';
import { PincodeChecker } from './PincodeChecker';
import { ProductCard } from './ProductCard';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice, cn } from '@/lib/utils';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const router = useRouter();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'One Size');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews' | 'shipping'>('details');

  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { showToast, setMiniCartOpen } = useUIStore();

  const isFavorited = isInWishlist(product.id);
  const selectedColor = product.colors && product.colors.length > 0 ? product.colors[selectedColorIndex] : undefined;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, selectedSize);
    showToast(`Added ${quantity} × "${product.name}" to your bag!`, 'success');
    setMiniCartOpen(true);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedColor, selectedSize);
    router.push('/checkout');
  };

  const handleWishlist = () => {
    const added = toggleWishlist(product);
    showToast(
      added ? `Added "${product.name}" to your wishlist` : `Removed "${product.name}" from wishlist`,
      'info'
    );
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#7A807A] mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-[#23483B]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-[#23483B]">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/category/${product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="hover:text-[#23483B]">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#252822] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Section: Gallery (Left) + Details/Actions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
        {/* Left Column: Gallery (6 Cols) */}
        <div className="lg:col-span-6 sticky top-24">
          <ProductGallery
            images={product.images}
            productName={product.name}
            themeColor={selectedColor?.hex}
          />
        </div>

        {/* Right Column: Information & Add to Bag (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Brand */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <Link
                href={`/shop?brand=${encodeURIComponent(product.brand)}`}
                className="font-bold uppercase tracking-wider text-[#23483B] hover:underline"
              >
                {product.brand}
              </Link>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#E7E4DC] text-[0.6875rem] font-medium text-[#7A807A]">
                  Age: {product.ageRange}
                </span>
                <button
                  onClick={handleShare}
                  aria-label="Share product"
                  className="p-1.5 rounded-full hover:bg-black/5 text-[#7A807A] transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#23483B] tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-2.5 mt-2.5">
              <div className="flex text-[#E5CF78]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating) ? "fill-current" : "fill-none text-[#E7E4DC]"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-[#252822]">{product.rating}</span>
              <span className="text-xs text-[#7A807A]">
                ({product.reviewCount} verified parent reviews)
              </span>
              <span className="text-[#E7E4DC]">•</span>
              <span className="text-xs text-[#23483B] font-semibold">
                {product.stockStatus === 'low_stock' ? 'Only a few left' : 'In Stock'}
              </span>
            </div>
          </div>

          {/* Price & Savings */}
          <div className="p-4 rounded-2xl bg-white border border-[#E7E4DC] shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#23483B]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-[#7A807A] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discountPercentage > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#23483B] text-[#FAF8F3]">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
              <span className="text-[0.6875rem] text-[#7A807A] block">
                Inclusive of all taxes. Free shipping on orders above ₹999.
              </span>
            </div>
          </div>

          {/* Description Excerpt */}
          <p className="text-xs sm:text-sm text-[#7A807A] leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#252822]">
                  Color Variant:{' '}
                  <span className="font-normal text-[#7A807A]">{selectedColor?.name}</span>
                </span>
                <span className="text-[0.6875rem] text-[#7A807A]">
                  {product.colors.length} shades available
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColorIndex(idx)}
                    aria-label={`Select ${color.name}`}
                    className={cn(
                      "w-7 h-7 rounded-full border-2 transition-transform transition-colors flex items-center justify-center",
                      selectedColorIndex === idx
                        ? "border-[#23483B] scale-110 ring-2 ring-[#B9D5C4]"
                        : "border-black/20 hover:scale-105"
                    )}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColorIndex === idx && (
                      <Check className="w-3.5 h-3.5 text-white drop-shadow-sm" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#252822]">
                  Select Size:{' '}
                  <span className="font-normal text-[#7A807A]">{selectedSize}</span>
                </span>
                <span className="text-[0.6875rem] text-[#23483B] font-medium cursor-pointer hover:underline">
                  Size Guide
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-semibold border transition-colors",
                      selectedSize === sz
                        ? "bg-[#23483B] text-white border-[#23483B] shadow-sm"
                        : "bg-white text-[#252822] border-[#E7E4DC] hover:border-[#23483B]"
                    )}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-3">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center rounded-2xl border border-[#E7E4DC] bg-white px-3 py-2.5 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:text-[#23483B] text-[#7A807A]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-semibold px-3 min-w-[1.75rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:text-[#23483B] text-[#7A807A]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#23483B] text-[#FAF8F3] text-xs sm:text-sm font-semibold hover:bg-[#1A362C] transition-colors shadow-md flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag ({formatPrice(product.price * quantity)})</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlist}
                aria-label="Wishlist toggle"
                className={cn(
                  "p-3.5 rounded-full border shadow-sm transition-colors",
                  isFavorited
                    ? "bg-[#F3C6B3] text-[#23483B] border-[#F3C6B3]"
                    : "bg-white text-[#7A807A] border-[#E7E4DC] hover:border-[#23483B] hover:text-[#23483B]"
                )}
              >
                <Heart className={cn("w-4 h-4", isFavorited && "fill-current")} />
              </button>
            </div>

            {/* Buy Now Demo Button */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 rounded-full bg-[#FAF8F3] hover:bg-[#F3EFE6] text-[#23483B] border border-[#23483B] text-xs sm:text-sm font-semibold transition-colors"
            >
              Buy Now (Express Demo Checkout)
            </button>
          </div>

          {/* Delivery Pincode Checker */}
          <div className="pt-2">
            <PincodeChecker />
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 p-4 rounded-2xl bg-[#FAF8F3] border border-[#E7E4DC] text-center text-[0.6875rem] text-[#7A807A]">
            <div className="space-y-1">
              <Truck className="w-4 h-4 text-[#23483B] mx-auto" />
              <span className="font-semibold text-[#252822] block">Free Delivery</span>
              <span>Orders over ₹999</span>
            </div>
            <div className="space-y-1">
              <RotateCcw className="w-4 h-4 text-[#23483B] mx-auto" />
              <span className="font-semibold text-[#252822] block">15-Day Return</span>
              <span>Doorstep pickup</span>
            </div>
            <div className="space-y-1">
              <ShieldCheck className="w-4 h-4 text-[#23483B] mx-auto" />
              <span className="font-semibold text-[#252822] block">Non-Toxic</span>
              <span>Safe for babies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details, Specs, Reviews Tabs */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E4DC] shadow-card mb-16">
        {/* Tab Headers */}
        <div className="flex border-b border-[#E7E4DC] gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('details')}
            className={cn(
              "pb-4 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap",
              activeTab === 'details'
                ? "border-b-2 border-[#23483B] text-[#23483B]"
                : "text-[#7A807A] hover:text-[#252822]"
            )}
          >
            Product Highlights
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={cn(
              "pb-4 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap",
              activeTab === 'specs'
                ? "border-b-2 border-[#23483B] text-[#23483B]"
                : "text-[#7A807A] hover:text-[#252822]"
            )}
          >
            Detailed Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={cn(
              "pb-4 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap",
              activeTab === 'reviews'
                ? "border-b-2 border-[#23483B] text-[#23483B]"
                : "text-[#7A807A] hover:text-[#252822]"
            )}
          >
            Parent Reviews ({product.reviewCount})
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={cn(
              "pb-4 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap",
              activeTab === 'shipping'
                ? "border-b-2 border-[#23483B] text-[#23483B]"
                : "text-[#7A807A] hover:text-[#252822]"
            )}
          >
            Shipping & Doorstep Returns
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-8">
          {activeTab === 'details' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#23483B] mb-3 tracking-normal">
                  Designed for peaceful growth and enduring wonder
                </h3>
                <p className="text-sm text-[#7A807A] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.highlights && (
                <div className="pt-2">
                  <h4 className="text-sm font-semibold text-[#23483B] mb-3">
                    Key considerations
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-[0.8125rem] text-[#252822]">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#23483B] flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <table className="w-full text-xs text-left">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <tr
                      key={key}
                      className={idx % 2 === 0 ? 'bg-[#FAF8F3]/50' : 'bg-white'}
                    >
                      <td className="py-3 px-4 font-semibold text-[#252822] w-1/3 border-b border-[#E7E4DC]">
                        {key}
                      </td>
                      <td className="py-3 px-4 text-[#7A807A] border-b border-[#E7E4DC]">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              <div className="p-6 rounded-2xl bg-[#FAF8F3] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-heading text-4xl font-extrabold text-[#23483B]">
                    {product.rating}
                  </span>
                  <div>
                    <div className="flex text-[#E5CF78]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-[#7A807A] mt-0.5 block">
                      Based on {product.reviewCount} customer reviews
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Review submission simulated. Thank you!', 'info')}
                  className="px-5 py-2.5 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors"
                >
                  Write a Review
                </button>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-4 pt-2">
                {[
                  {
                    author: 'Priyanka M. (Bengaluru)',
                    rating: 5,
                    date: '3 weeks ago',
                    title: 'Remarkable texture and quality',
                    comment: 'The touch is heavenly against my newborn baby’s skin. The side snaps make nighttime diaper changes painless without waking him up.',
                  },
                  {
                    author: 'Sameer & Gayatri (Mumbai)',
                    rating: 5,
                    date: '1 month ago',
                    title: 'Truly heirloom craftsmanship',
                    comment: 'You can immediately tell this was made with deep intentionality. Beautiful packaging, zero chemical odor, and holds up perfectly in gentle wash cycles.',
                  },
                  {
                    author: 'Dr. Shruti K. (Delhi NCR)',
                    rating: 5,
                    date: '2 months ago',
                    title: 'Recommended by our pediatrician',
                    comment: 'Pediatrician certified and genuinely hypoallergenic. As a new mother, this gives me immense peace of mind.',
                  },
                ].map((rev, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-[#E7E4DC] bg-white space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#252822]">{rev.author}</span>
                      <span className="text-[#7A807A]">{rev.date}</span>
                    </div>
                    <div className="flex text-[#E5CF78]">
                      {[...Array(rev.rating)].map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <h5 className="text-xs font-semibold text-[#23483B]">{rev.title}</h5>
                    <p className="text-xs text-[#7A807A] leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 max-w-2xl text-xs text-[#7A807A] leading-relaxed">
              <h4 className="font-heading text-lg font-bold text-[#23483B] tracking-tight">
                Doorstep Delivery & Mindful Returns
              </h4>
              <p>
                All orders are dispatched within 24 hours from our climate-controlled regional fulfilment centres across India. Standard delivery arrives in 2 to 4 business days. Priority Next-Day air delivery is available in Tier 1 and Metro cities.
              </p>
              <p>
                We understand that life with an infant requires gentleness. We offer a <strong>15-day unconditional doorstep return window</strong>. Our courier will pick up the item in its original packaging right from your door.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Essentials */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E4DC]">
            <h2 className="font-heading text-2xl font-bold text-[#23483B] tracking-tight">
              You May Also Treasure
            </h2>
            <Link href="/shop" className="text-xs font-semibold text-[#23483B] hover:underline">
              View all products →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

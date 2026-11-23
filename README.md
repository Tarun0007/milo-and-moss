# MILO & MOSS — Premium Next-Generation Baby & Kids E-Commerce

> *"Little things. Big beginnings."*

MILO & MOSS is a complete, production-grade baby and kids e-commerce web application inspired by the comprehensive catalog breadth of leading baby marketplaces, but designed with an original high-end editorial aesthetic, organic Scandi-inspired visual identity, and modern interactive shopping experience.

---

## 🌿 Brand Identity & Design System

- **Brand Name**: MILO & MOSS
- **Tagline**: *"Little things. Big beginnings."*
- **Brand Personality**: Premium, Warm, Modern, Trustworthy, Playful, Minimal, Parent-friendly, Elegant, Innovative.
- **Color Palette**:
  - **Warm Ivory** (`#FAF8F3`): Calming background canvas
  - **Soft White** (`#FFFFFF`): Elevated card surfaces
  - **Deep Forest** (`#23483B`): Primary typography & luxury accents
  - **Sage** (`#B9D5C4`): Nature-inspired secondary tone
  - **Muted Peach** (`#F3C6B3`): Warmth & softness
  - **Butter Yellow** (`#F4E4A5`): Subtle sunshine accent
  - **Dusty Blue** (`#D8E5F0`): Serene nursery hue
  - **Soft Lavender** (`#E6DDF1`): Dreamy twilight note
  - **Text Dark** (`#252822`): High contrast readability
  - **Muted Text** (`#7A807A`): Subdued metadata & secondary text

---

## ✨ Features & Architecture

### 1. Storefront & Catalog
- **126 Fictional Products** spanning 12 diverse departments:
  - Baby Clothing (GOTS organic cotton kimonos, waffle rompers, bamboo sleepsuits)
  - Toys & Play (Montessori beechwood stacking arches, sensory sound blocks, balance boards)
  - Baby Care (Botanical oat washes, sweet almond massage oils, bamboo water wipes)
  - Feeding & Nursing (Food-grade silicone tableware, anti-colic borosilicate bottles)
  - Nursery & Decor (Solid beechwood 3-in-1 convertible cribs, organic dohars, amber lights)
  - Baby Gear & Travel (AeroGlide flight cabin strollers, ergonomic hip-healthy carriers)
  - First Steps Footwear (Barefoot leather moccasins, flexible pre-walkers)
  - Books & Audio (High-contrast infant accordions, classical sound books)
  - Mom & Maternity (Bamboo lounge sets, pregnancy support pillows, belly balms)
  - School Supplies (Stainless bento boxes, beeswax triangular crayons)
  - Baby Safety (Non-Wi-Fi HD video monitors, pressure-fit wooden gates)
  - Outdoor & Swimming (UPF 50+ swimwear, pop-up UV beach tents)
- **Fictional Conscious Brands**: Little Fern, Pebble & Pine, Tiny Orbit, Cloudberry Kids, Mini Meadow, Sprout Society, Moss & Moon, Nordic Nestling.
- **Realistic Indian Pricing** (₹349 to ₹18,999) with authentic specifications, care instructions, and safety certifications.

### 2. Interactive Discovery & Tools
- **Interactive 3D Hero Scene**: Organic floating pastel spheres and beechwood rings powered by Three.js & React Three Fiber.
- **Interactive 3D Product Viewer**: Orbit, inspect, and rotate 3D geometries on product pages.
- **Interactive Gift Concierge (`/gifts`)**: 3-step gifting quiz filtering products by recipient, milestone, occasion, and budget.
- **Pincode Delivery Checker**: Real-time simulation of Indian postal delivery dates, express shipping, and cash-on-delivery availability.
- **Full Search Modal**: Autocomplete, trending keywords, and live real-time product search.
- **Filter Sidebar & Mobile Filter Drawer**: Filter by department, milestone age, conscious brand, price tier, stock, and promotional status.
- **Parenting Journal (`/journal`)**: Science-backed editorial essays authored by pediatricians on sleep cycles, baby-led weaning, and Montessori spaces.

### 3. Shopping Cart, Wishlist & Demo Checkout
- **Free Shipping Calculator**: Dynamic progress bar toward the ₹999 free shipping threshold.
- **Promo Code Engine**: Supports codes like `MOSS20` (20% off), `LITTLE10` (10% off), and `FIRSTNEST` (15% off).
- **Persistent LocalStorage**: Cart, wishlist, addresses, and order history persist across sessions.
- **Slide-In Mini Cart Drawer**: Instant slide-over upon adding items with quick quantity controls.
- **Frontend Demo Checkout (`/checkout`)**: Multi-step flow (Address, Shipping speed, Demo UPI/Card/COD, Confetti celebration, Mock Order Confirmation).
- **Parent Account (`/account`)**: Manage profile, delivery addresses, child milestone preferences, and order tracking history.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 App Router](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with LocalStorage persistence
- **3D & Canvas**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebration Animation**: `canvas-confetti`

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production & Vercel
```bash
npm run build
npm run start
```

---

## 📱 Responsiveness

Fully verified across all screen widths:
- Mobile Small (375px)
- Mobile Standard (390px / 430px)
- Tablet (768px)
- Desktop (1024px / 1440px / 1920px)

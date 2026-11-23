import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { MiniCartDrawer } from "@/components/layout/MiniCartDrawer";
import { SearchModal } from "@/components/layout/SearchModal";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { ToastProvider } from "@/components/layout/ToastProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#23483B",
};

export const metadata: Metadata = {
  title: "MILO & MOSS | Little things. Big beginnings.",
  description: "A premium, conscious baby & kids shopping sanctuary. Discover GOTS-certified organic cotton apparel, Montessori wooden toys, botanical baby care, and Scandinavian nursery furniture.",
  keywords: "baby clothing, organic baby, wooden toys, montessori toys, nursery furniture, sustainable baby store, firstcry alternative, premium baby gifts",
  openGraph: {
    title: "MILO & MOSS | Little things. Big beginnings.",
    description: "Conscious essentials for their biggest little moments. Organic apparel, Montessori toys, and heirloom nursery living.",
    url: "https://miloandmoss.com",
    siteName: "MILO & MOSS",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "MILO & MOSS Editorial Baby Living",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#252822] antialiased selection:bg-[#B9D5C4] selection:text-[#23483B]">
        <AnnouncementBar />
        <Header />
        
        {/* Main Content Viewport */}
        <main className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Global Overlays & Modals */}
        <MobileNav />
        <MiniCartDrawer />
        <SearchModal />
        <QuickViewModal />
        <ToastProvider />
        <Analytics debug={process.env.NODE_ENV === 'development'} />
        <SpeedInsights debug={process.env.NODE_ENV === 'development'} />
      </body>
    </html>
  );
}

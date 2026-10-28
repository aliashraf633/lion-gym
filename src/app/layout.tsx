import type { Metadata, Viewport } from 'next';
import { Cairo } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/store/CartDrawer';
import { CartProvider, CartToast } from '@/context/CartContext';
import { siteConfig } from '@/data/site';
import './globals.css';

const cairo = Cairo({ subsets: ['arabic', 'latin'], weight: ['400', '600', '700', '800', '900'], variable: '--font-cairo', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: `${siteConfig.nameAr} | ${siteConfig.nameEn}`, template: `%s | ${siteConfig.nameAr}` },
  description: siteConfig.description,
  keywords: ['جيم', 'جيم الأسد', 'Lion Gym', 'جيم مصر', 'اشتراك جيم', 'مكملات غذائية'],
  alternates: { canonical: '/' },
  openGraph: { title: `${siteConfig.nameAr} | ${siteConfig.nameEn}`, description: siteConfig.description, locale: 'ar_EG', type: 'website', url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000' },
};
export const viewport: Viewport = { themeColor: '#0f0f12', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}

'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { navLinks, siteConfig } from '@/data/site';
import { useCart } from '@/context/CartContext';
import { buttonClasses } from '@/components/ui/Button';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-darkbg/90 backdrop-blur-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:bg-gold focus:text-black focus:px-3 focus:py-2 focus:rounded-lg">
        تخطي إلى المحتوى
      </a>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-xl shadow-lg shadow-gold/20" aria-hidden="true">🦁</span>
          <span>
            <span className="block text-xl font-black text-gold leading-tight">{siteConfig.nameAr}</span>
            <span className="block text-[10px] uppercase tracking-widest text-gray-400">LION GYM &amp; FITNESS</span>
          </span>
        </Link>

        <nav aria-label="التنقل الرئيسي" className="hidden lg:flex items-center gap-5">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-semibold text-gray-300 hover:text-gold transition">{l.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={openCart} aria-label={`عربة التسوق (${count} منتج)`} className="relative rounded-lg border border-gold/30 bg-sectionbg px-3 py-2 text-gold transition hover:bg-gray-800">
            <span aria-hidden="true">🛒</span>
            {count > 0 && <span className="absolute -top-2 -end-2 min-w-[1.25rem] rounded-full bg-gold px-1 text-center text-[10px] font-black text-black">{count}</span>}
          </button>
          <Link href="/#plans" className={`${buttonClasses('primary', 'sm')} hidden sm:inline-flex`}>اشترك الآن</Link>
          <button
            type="button"
            className="lg:hidden rounded-lg border border-gray-700 p-2 text-gold"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="block text-xl leading-none">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="القائمة" className="lg:hidden border-t border-gray-800 bg-darkbg px-4 py-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-semibold text-gray-200 hover:bg-sectionbg hover:text-gold">{l.label}</Link>
          ))}
          <Link href="/#plans" onClick={() => setOpen(false)} className={`${buttonClasses('primary', 'md')} mt-2`}>اشترك الآن</Link>
        </nav>
      )}
    </header>
  );
}

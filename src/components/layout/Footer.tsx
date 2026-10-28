import Link from 'next/link';
import { navLinks, siteConfig } from '@/data/site';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-darkbg py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-bold text-gold mb-3">{siteConfig.nameAr} | {siteConfig.nameEn}</h2>
          <p className="text-xs text-gray-300 leading-relaxed">{siteConfig.description}</p>
        </div>
        <div>
          <h3 className="text-sm font-bold mb-3">تواصل معنا</h3>
          <ul className="text-xs text-gray-300 space-y-2">
            <li>📞 <span dir="ltr" className="inline-block">{siteConfig.phone}</span></li>
            <li>📍 {siteConfig.address}</li>
            <li>🕙 {siteConfig.hours}</li><li><a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer" className="text-gold hover:underline">💬 WhatsApp</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold mb-3">روابط سريعة</h3>
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-xs text-gold hover:underline">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-8 border-t border-gray-900 px-4 pt-4 text-center text-[11px] text-gray-400">
        © 2026 {siteConfig.nameAr}
      </p>
    </footer>
  );
}

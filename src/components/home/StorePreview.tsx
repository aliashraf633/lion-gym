import Link from 'next/link';
import { products } from '@/data/products';
import { formatEGP } from '@/lib/format';
import { buttonClasses } from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';

export default function StorePreview() {
 return <section id="store-preview" className="px-4 py-16"><SectionHeading title="المتجر عندك في الجيم" subtitle="مكملات ومنتجات مختارة للاحتياجات اليومية." />
 <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.slice(0,4).map(p=><article key={p.id} className="overflow-hidden rounded-2xl border border-gray-800 bg-cardbg"><img src={p.image} alt={p.name} loading="lazy" className="h-44 w-full object-cover"/><div className="p-4"><h3 className="text-sm font-bold">{p.name}</h3><p className="mt-2 font-black text-gold">{formatEGP(p.price)}</p></div></article>)}</div>
 <div className="mt-6 text-center"><Link href="/store" className={buttonClasses('primary','md')}>تصفح المتجر بالكامل</Link></div></section>
}

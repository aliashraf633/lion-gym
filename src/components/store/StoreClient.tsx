'use client';
import { useMemo, useState } from 'react';
import { categoryLabels, products } from '@/data/products';
import { siteConfig } from '@/data/site';
import { useCart } from '@/context/CartContext';
import type { Product, ProductCategory } from '@/types';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

type Sort = 'default' | 'price-asc' | 'price-desc' | 'rating';
type Cat = 'all' | ProductCategory;

const sorters: Record<Sort, (a: Product, b: Product) => number> = {
  default: () => 0,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
};
const chip = (on: boolean) => `whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition ${on ? 'bg-gold text-black' : 'border border-gray-700 bg-sectionbg text-gray-300 hover:text-gold'}`;

export default function StoreClient() {
  const { add } = useCart();
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<Cat>('all');
  const [sort, setSort] = useState<Sort>('default');
  const [active, setActive] = useState<Product | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => (cat === 'all' || p.category === cat) && (!q || `${p.name} ${p.description}`.toLowerCase().includes(q)))
      .sort(sorters[sort]);
  }, [query, cat, sort]);

  const reset = () => { setQuery(''); setCat('all'); setSort('default'); };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-black text-gold">متجر المكملات الغذائية</h1>
        <p className="mt-2 text-sm text-gray-300">منتجات تجريبية بأسعار بالجنيه المصري. {siteConfig.demoNotice}</p>
      </header>

      <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <label htmlFor="store-search" className="mb-1 block text-xs text-gray-300">ابحث في المنتجات</label>
          <input id="store-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث عن بروتين، كرياتين..." className="w-full rounded-lg border border-gray-700 bg-sectionbg p-2.5 text-sm text-white outline-none focus:border-gold" />
        </div>
        <div className="md:w-56">
          <Select label="ترتيب حسب" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="default">الافتراضي</option>
            <option value="price-asc">السعر: الأقل أولاً</option>
            <option value="price-desc">السعر: الأعلى أولاً</option>
            <option value="rating">الأعلى تقييماً</option>
          </Select>
        </div>
      </div>

      <div role="group" aria-label="تصنيفات المنتجات" className="mb-6 flex gap-2 overflow-x-auto pb-2">
        <button type="button" aria-pressed={cat === 'all'} className={chip(cat === 'all')} onClick={() => setCat('all')}>الكل</button>
        {(Object.keys(categoryLabels) as ProductCategory[]).map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} className={chip(cat === c)} onClick={() => setCat(c)}>{categoryLabels[c]}</button>
        ))}
      </div>

      <p className="mb-4 text-xs text-gray-300" aria-live="polite">{list.length} منتج</p>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-gray-800 bg-cardbg py-16 text-center">
          <p className="mb-3 text-5xl" aria-hidden="true">🔍</p>
          <p className="mb-4 text-sm text-gray-300">مفيش منتجات مطابقة للبحث أو التصنيف.</p>
          <Button variant="secondary" onClick={reset}>مسح الفلاتر</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <ProductCard key={p.id} product={p} onDetails={setActive} onAdd={(x) => add(x.id)} />)}
        </div>
      )}
      <ProductModal product={active} onClose={() => setActive(null)} />
    </div>
  );
}

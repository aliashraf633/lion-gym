'use client';
import type { Product } from '@/types';
import { formatEGP } from '@/lib/format';
import { categoryLabels } from '@/data/products';
import Button from '@/components/ui/Button';
import Rating from '@/components/ui/Rating';
import ProductImage from './ProductImage';

interface Props { product: Product; onDetails: (p: Product) => void; onAdd: (p: Product) => void }

export default function ProductCard({ product: p, onDetails, onAdd }: Props) {
  const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const out = p.stock <= 0;
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-cardbg transition hover:border-gold/50">
      <button type="button" onClick={() => onDetails(p)} aria-label={`تفاصيل ${p.name}`} className="relative block h-44 overflow-hidden bg-darkbg">
        <ProductImage src={p.image} alt={p.name} className={`h-full w-full object-cover ${out ? 'opacity-50' : ''}`} />
        {off > 0 && <span className="absolute top-2 start-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-extrabold text-black">خصم {off}%</span>}
        {out && <span className="absolute top-2 end-2 rounded-full bg-red-700 px-2 py-0.5 text-[10px] font-bold">غير متوفر</span>}
        {!out && p.stock <= 5 && <span className="absolute top-2 end-2 rounded-full bg-amber-700 px-2 py-0.5 text-[10px] font-bold">باقي {p.stock} فقط</span>}
      </button>
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-[11px] text-gray-400">{categoryLabels[p.category]}</p>
        <h3 className="mb-1 text-sm font-bold">{p.name}</h3>
        <Rating value={p.rating} reviews={p.reviews} />
        <div className="my-3 flex items-baseline gap-2">
          <span className="text-lg font-black text-gold">{formatEGP(p.price)}</span>
          {p.oldPrice && <span className="text-xs text-gray-400 line-through">{formatEGP(p.oldPrice)}</span>}
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2">
          <Button variant="secondary" size="sm" onClick={() => onDetails(p)}>التفاصيل</Button>
          <Button size="sm" disabled={out} onClick={() => onAdd(p)} aria-label={`أضف ${p.name} إلى العربة`}>{out ? 'نفدت الكمية' : 'أضف للعربة'}</Button>
        </div>
      </div>
    </article>
  );
}

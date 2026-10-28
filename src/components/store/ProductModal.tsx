'use client';
import { useState } from 'react';
import type { Product } from '@/types';
import { categoryLabels } from '@/data/products';
import { storeConfig } from '@/data/site';
import { formatEGP } from '@/lib/format';
import { useCart } from '@/context/CartContext';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Rating from '@/components/ui/Rating';
import ProductImage from './ProductImage';
import QuantityStepper from './QuantityStepper';

function Details({ product: p, onClose }: { product: Product; onClose: () => void }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const max = Math.min(p.stock, storeConfig.maxQty);
  const out = p.stock <= 0;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ProductImage src={p.image} alt={p.name} className="h-56 w-full rounded-xl object-cover" />
      <div className="flex flex-col gap-3">
        <p className="text-xs text-gray-400">{categoryLabels[p.category]}</p>
        <Rating value={p.rating} reviews={p.reviews} />
        <p className="text-sm leading-relaxed text-gray-300">{p.description}</p>
        <p className="text-2xl font-black text-gold">{formatEGP(p.price)} {p.oldPrice && <span className="text-sm font-normal text-gray-400 line-through">{formatEGP(p.oldPrice)}</span>}</p>
        <p className={`text-xs font-bold ${out ? 'text-red-400' : p.stock <= 5 ? 'text-amber-400' : 'text-green-400'}`}>
          {out ? 'غير متوفر حالياً' : p.stock <= 5 ? `باقي ${p.stock} قطع فقط` : 'متوفر في المخزون'}
        </p>
        {!out && <QuantityStepper value={qty} max={max} onChange={setQty} label={p.name} />}
        <Button disabled={out} onClick={() => { add(p.id, qty); onClose(); }}>{out ? 'نفدت الكمية' : `أضف للعربة (${qty})`}</Button>
      </div>
    </div>
  );
}

export default function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  return (
    <Modal open={!!product} onClose={onClose} title={product?.name ?? ''} maxWidth="max-w-2xl">
      {product && <Details key={product.id} product={product} onClose={onClose} />}
    </Modal>
  );
}

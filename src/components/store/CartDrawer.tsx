'use client';
import Link from 'next/link';
import { formatEGP } from '@/lib/format';
import { storeConfig } from '@/data/site';
import { useCart } from '@/context/CartContext';
import { buttonClasses } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import ProductImage from './ProductImage';
import QuantityStepper from './QuantityStepper';

export function TotalsBox({ subtotal, discount, shipping = 0, total }: { subtotal: number; discount: number; shipping?: number; total: number }) {
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between"><dt className="text-gray-300">المجموع الفرعي</dt><dd>{formatEGP(subtotal)}</dd></div>
      <div className="flex justify-between"><dt className="text-gray-300">الخصم</dt><dd className={discount ? 'text-green-400' : ''}>{discount ? `− ${formatEGP(discount)}` : formatEGP(0)}</dd></div>
      <div className="flex justify-between border-t border-gray-800 pt-2 text-base"><dt className="font-bold">الإجمالي</dt><dd className="font-black text-gold">{formatEGP(total)}</dd></div>
    </dl>
  );
}

export default function CartDrawer() {
  const { isOpen, closeCart, lines, totals, setQty, remove, clear } = useCart();
  return (
    <Modal open={isOpen} onClose={closeCart} title="عربة التسوق" variant="drawer">
      {lines.length === 0 ? (
        <div className="py-12 text-center">
          <p className="mb-3 text-5xl" aria-hidden="true">🛒</p>
          <p className="mb-4 text-sm text-gray-300">عربتك فاضية. ضيف منتجات من المتجر.</p>
          <Link href="/store" onClick={closeCart} className={buttonClasses('primary', 'sm')}>تصفح المتجر</Link>
        </div>
      ) : (
        <div className="space-y-4">
          <ul className="space-y-3">
            {lines.map(({ product: p, qty }) => (
              <li key={p.id} className="flex gap-3 rounded-xl border border-gray-800 bg-sectionbg p-3">
                <ProductImage src={p.image} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold">{p.name}</p>
                  <p className="mb-2 text-xs text-gold">{formatEGP(p.price)} × {qty} = {formatEGP(p.price * qty)}</p>
                  <div className="flex items-center justify-between">
                    <QuantityStepper value={qty} max={Math.min(p.stock, storeConfig.maxQty)} onChange={(n) => setQty(p.id, n)} label={p.name} />
                    <button type="button" onClick={() => remove(p.id)} aria-label={`حذف ${p.name} من العربة`} className="p-2 text-gray-300 hover:text-red-400">🗑️</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {totals.discount === 0 && (
            <p className="rounded-lg bg-gold/10 p-2 text-center text-[11px] text-gold">
              اطلب بـ {formatEGP(storeConfig.discountThreshold)} أو أكثر واحصل على خصم {storeConfig.discountRate * 100}% (تجريبي)
            </p>
          )}
          <TotalsBox {...totals} />
          <Link href="/store/checkout" onClick={closeCart} className={`${buttonClasses('primary', 'md')} w-full`}>إتمام الطلب</Link>
          <button type="button" onClick={clear} className="w-full py-1 text-xs text-gray-300 hover:text-red-400">إفراغ العربة</button>
        </div>
      )}
    </Modal>
  );
}

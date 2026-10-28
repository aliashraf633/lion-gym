import { storeConfig } from '@/data/site';
export interface Totals { subtotal: number; discount: number; shipping: number; total: number }
export function calculateTotals(lines: { unitPrice: number; qty: number }[]): Totals {
  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
  const discount = subtotal >= storeConfig.discountThreshold ? Math.round(subtotal * storeConfig.discountRate) : 0;
  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount === 0 ? 0 : afterDiscount >= storeConfig.freeShippingThreshold ? 0 : storeConfig.shippingFee;
  return { subtotal, discount, shipping, total: afterDiscount + shipping };
}

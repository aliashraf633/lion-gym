'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { products } from '@/data/products';
import { storeConfig } from '@/data/site';
import { calculateTotals, type Totals } from '@/lib/cart-math';
import { loadJSON, saveJSON } from '@/lib/storage';
import type { Product } from '@/types';

interface CartItem { productId: string; qty: number }
export interface CartLine { product: Product; qty: number }

interface CartContextValue {
  lines: CartLine[]; count: number; totals: Totals; ready: boolean;
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  isOpen: boolean; openCart: () => void; closeCart: () => void; notice: string;
}

const KEY = 'lionGymCartV2';
const byId = new Map(products.map((p) => [p.id, p]));
const clampQty = (p: Product, q: number) => Math.max(0, Math.min(Math.floor(q), p.stock, storeConfig.maxQty));
const isItems = (v: unknown): v is CartItem[] => Array.isArray(v) && v.every((i) => i && typeof i.productId === 'string' && Number.isInteger(i.qty));

function sanitize(raw: CartItem[]): CartItem[] {
  const m = new Map<string, number>();
  raw.forEach((i) => {
    const p = byId.get(i.productId);
    if (p) m.set(i.productId, clampQty(p, (m.get(i.productId) ?? 0) + i.qty));
  });
  return [...m].filter(([, q]) => q > 0).map(([productId, qty]) => ({ productId, qty }));
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const itemsRef = useRef<CartItem[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => { setItems(sanitize(loadJSON<CartItem[]>(KEY, [], isItems))); setReady(true); }, []);
  useEffect(() => { itemsRef.current = items; if (ready) saveJSON(KEY, items); }, [items, ready]);

  const notify = useCallback((msg: string) => {
    setNotice(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotice(''), 2500);
  }, []);

  const add = useCallback((productId: string, qty = 1) => {
    const p = byId.get(productId);
    if (!p || p.stock <= 0) return notify('المنتج غير متوفر حالياً');
    const cur = itemsRef.current.find((i) => i.productId === productId)?.qty ?? 0;
    const next = clampQty(p, cur + qty);
    if (next === cur) return notify('وصلت للحد الأقصى المتاح لهذا المنتج');
    setItems((prev) => prev.some((i) => i.productId === productId)
      ? prev.map((i) => (i.productId === productId ? { ...i, qty: next } : i))
      : [...prev, { productId, qty: next }]);
    notify(`تمت إضافة ${p.name} إلى العربة`);
  }, [notify]);

  const setQty = useCallback((productId: string, qty: number) => {
    const p = byId.get(productId);
    if (!p) return;
    const q = clampQty(p, qty);
    setItems((prev) => (q <= 0 ? prev.filter((i) => i.productId !== productId) : prev.map((i) => (i.productId === productId ? { ...i, qty: q } : i))));
  }, []);
  const remove = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.productId !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const lines = useMemo<CartLine[]>(() => items.flatMap((i) => { const product = byId.get(i.productId); return product ? [{ product, qty: i.qty }] : []; }), [items]);
  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);
  const totals = useMemo(() => calculateTotals(lines.map((l) => ({ unitPrice: l.product.price, qty: l.qty }))), [lines]);

  const value = useMemo<CartContextValue>(() => ({
    lines, count, totals, ready, add, setQty, remove, clear, isOpen, notice,
    openCart: () => setOpen(true), closeCart: () => setOpen(false),
  }), [lines, count, totals, ready, add, setQty, remove, clear, isOpen, notice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Polite live-region toast for cart feedback. */
export function CartToast() {
  const { notice } = useCart();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-4 z-[70] flex justify-center">
      {notice && <p className="rounded-xl border border-gold bg-cardbg px-4 py-3 text-sm font-bold text-gold shadow-2xl animate-fade-up">{notice}</p>}
    </div>
  );
}

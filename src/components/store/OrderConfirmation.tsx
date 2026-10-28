'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { products } from '@/data/products';
import { siteConfig } from '@/data/site';
import { formatDate, formatEGP } from '@/lib/format';
import { loadOrders, paymentLabels, statusLabels } from '@/lib/orders';
import type { Order } from '@/types';
import { buttonClasses } from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { TotalsBox } from './CartDrawer';

function Inner() {
  const id = useSearchParams().get('id');
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  useEffect(() => { setOrder(loadOrders().find((o) => o.id === id) ?? null); }, [id]);

  if (order === undefined) return <div className="mx-auto max-w-2xl space-y-4 px-4 py-10"><Skeleton className="h-12 w-2/3" /><Skeleton className="h-64 w-full" /></div>;

  if (!order) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="mb-3 text-6xl" aria-hidden="true">📭</p>
        <h1 className="mb-2 text-2xl font-black text-gold">لم نجد هذا الطلب</h1>
        <p className="mb-6 text-sm text-gray-300">الطلبات التجريبية بتتحفظ في متصفحك بس. يمكن اتمسحت أو فتحت الرابط من جهاز تاني.</p>
        <Link href="/store" className={buttonClasses('primary', 'md')}>العودة للمتجر</Link>
      </div>
    );
  }

  const subtotal = order.subtotal ?? order.total;
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6 text-center">
        <p className="mb-2 text-5xl" aria-hidden="true">✅</p>
        <h1 className="text-3xl font-black text-gold">تم تسجيل طلبك (Demo)</h1>
        <p className="mt-2 text-sm text-gray-300">شكراً {order.customer?.name}! {siteConfig.demoNotice}</p>
      </div>
      <div className="space-y-5 rounded-2xl border border-gray-800 bg-cardbg p-6">
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div><dt className="text-xs text-gray-400">رقم الطلب</dt><dd dir="ltr" className="text-right font-black text-gold">{order.id}</dd></div>
          <div><dt className="text-xs text-gray-400">الحالة</dt><dd className="font-bold">{statusLabels[order.status]}</dd></div>
          <div><dt className="text-xs text-gray-400">التاريخ</dt><dd>{formatDate(order.createdAt)}</dd></div>
          <div><dt className="text-xs text-gray-400">الدفع</dt><dd>{paymentLabels[order.paymentMethod]}</dd></div>
          {order.customer && <div className="col-span-2"><dt className="text-xs text-gray-400">التوصيل إلى</dt><dd>{order.customer.governorate} - {order.customer.city} - {order.customer.address}</dd></div>}
        </dl>
        <ul className="divide-y divide-gray-800 border-y border-gray-800 text-sm">
          {order.items.map((i) => {
            const p = products.find((x) => x.id === i.productId);
            const price = i.unitPrice ?? p?.price ?? 0;
            return <li key={i.productId} className="flex justify-between gap-2 py-2"><span>{p?.name ?? 'منتج غير متاح'} × {i.qty}</span><span>{formatEGP(price * i.qty)}</span></li>;
          })}
        </ul>
        <TotalsBox subtotal={subtotal} discount={order.discount ?? 0} shipping={order.shipping ?? 0} total={order.total} />
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/store" className={buttonClasses('primary', 'md')}>متابعة التسوق</Link>
        <Link href="/" className={buttonClasses('secondary', 'md')}>الرئيسية</Link>
      </div>
    </div>
  );
}

export default function OrderConfirmation() {
  return <Suspense fallback={<div className="mx-auto max-w-2xl px-4 py-10"><Skeleton className="h-64 w-full" /></div>}><Inner /></Suspense>;
}

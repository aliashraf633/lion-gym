'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { siteConfig, storeConfig } from '@/data/site';
import { formatEGP } from '@/lib/format';
import { generateOrderId, saveOrder } from '@/lib/orders';
import { contactSchema, normalizePhone } from '@/lib/validation';
import { useCart } from '@/context/CartContext';
import Button, { buttonClasses } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Skeleton from '@/components/ui/Skeleton';
import { TotalsBox } from './CartDrawer';

const schema = contactSchema.extend({
  governorate: z.string().trim().min(2, 'اختر المحافظة'),
  city: z.string().trim().min(2, 'اكتب المدينة أو المنطقة'),
  address: z.string().trim().min(10, 'اكتب العنوان بالتفصيل (10 حروف على الأقل)').max(200, 'العنوان طويل جداً'),
  notes: z.string().trim().max(300, 'الملاحظات طويلة جداً').optional(),
  payment: z.enum(['cash', 'demo-card']),
});
type FormValues = z.infer<typeof schema>;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function CheckoutForm() {
  const router = useRouter();
  const { lines, totals, ready, clear } = useCart();
  const [placing, setPlacing] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { payment: 'cash', governorate: '', city: '' },
  });
  const payment = watch('payment');

  async function onSubmit(v: FormValues) {
    if (!lines.length) return;
    setPlacing(true);
    await sleep(v.payment === 'demo-card' ? 1200 : 700);
    const id = generateOrderId();
    saveOrder({
      id, customerId: 'guest', status: 'pending', paymentMethod: v.payment, createdAt: new Date().toISOString(),
      items: lines.map((l) => ({ productId: l.product.id, qty: l.qty, unitPrice: l.product.price })),
      subtotal: totals.subtotal, discount: totals.discount, shipping: totals.shipping, total: totals.total,
      customer: {
        name: v.name.trim(), phone: normalizePhone(v.phone), email: v.email.trim(),
        governorate: v.governorate.trim(), city: v.city.trim(), address: v.address.trim(), notes: v.notes?.trim() || undefined,
      },
    });
    clear();
    router.push(`/store/confirmation?id=${id}`);
  }

  if (!ready) return <div className="mx-auto max-w-4xl space-y-4 px-4 py-10"><Skeleton className="h-10 w-1/2" /><Skeleton className="h-64 w-full" /></div>;
  if (placing) return <div className="mx-auto max-w-md px-4 py-24 text-center" role="status" aria-live="polite"><span className="mx-auto mb-4 block h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent" aria-hidden="true" /><p className="font-bold text-gold">{payment === 'demo-card' ? 'جاري تنفيذ الدفع التجريبي...' : 'جاري تسجيل الطلب...'}</p></div>;
  if (!lines.length) return <div className="mx-auto max-w-md px-4 py-24 text-center"><p className="mb-3 text-6xl" aria-hidden="true">🛒</p><h1 className="mb-2 text-2xl font-black text-gold">عربتك فاضية</h1><p className="mb-6 text-sm text-gray-300">ضيف منتجات من المتجر الأول عشان تكمل الطلب.</p><Link href="/store" className={buttonClasses('primary', 'md')}>الذهاب للمتجر</Link></div>;

  const radio = 'flex items-center gap-2 rounded-xl border-2 border-gray-700 bg-sectionbg p-3 text-sm font-bold text-gray-300 transition hover:border-gold/60 peer-checked:border-gold peer-checked:text-gold peer-focus-visible:ring-2 peer-focus-visible:ring-gold';

  return <div className="mx-auto max-w-5xl px-4 py-10">
    <header className="mb-8"><p className="text-xs font-bold text-gold">الخطوة الأخيرة</p><h1 className="mb-2 text-3xl font-black">إتمام الطلب</h1><p className="text-sm text-gray-300">{siteConfig.demoNotice}</p></header>
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-2xl border border-gray-800 bg-cardbg p-6">
        <h2 className="mb-4 text-lg font-black text-gold">بيانات العميل</h2>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Input label="الاسم الكامل" autoComplete="name" placeholder="أحمد محمد" error={errors.name?.message} {...register('name')} />
          <Input label="رقم الموبايل" type="tel" inputMode="tel" autoComplete="tel" ltr placeholder="01012345678" error={errors.phone?.message} {...register('phone')} />
        </div>
        <Input label="البريد الإلكتروني" type="email" autoComplete="email" ltr placeholder="name@example.com" error={errors.email?.message} {...register('email')} />
        <h2 className="mb-4 mt-6 text-lg font-black text-gold">بيانات التوصيل</h2>
        <div className="grid gap-x-4 sm:grid-cols-2">
          <Select label="المحافظة" error={errors.governorate?.message} {...register('governorate')}><option value="">اختر المحافظة</option><option>القاهرة</option><option>الجيزة</option><option>الدقهلية</option><option>الإسكندرية</option><option>الشرقية</option><option>القليوبية</option><option>الغربية</option><option>المنوفية</option><option>البحيرة</option><option>أخرى</option></Select>
          <Input label="المدينة / المنطقة" placeholder="المنصورة" error={errors.city?.message} {...register('city')} />
        </div>
        <Input label="العنوان بالتفصيل" autoComplete="street-address" placeholder="الشارع - رقم العمارة - الدور - الشقة" error={errors.address?.message} {...register('address')} />
        <Input label="ملاحظات (اختياري)" placeholder="علامة مميزة أو وقت مناسب للتوصيل" error={errors.notes?.message} {...register('notes')} />
        <fieldset className="mb-5 mt-6 min-w-0"><legend className="mb-2 text-sm font-bold text-gray-200">طريقة الدفع</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block cursor-pointer"><input type="radio" value="cash" className="peer sr-only" {...register('payment')} /><span className={radio}>💵 كاش عند الاستلام</span></label>
            <label className="block cursor-pointer"><input type="radio" value="demo-card" className="peer sr-only" {...register('payment')} /><span className={radio}>💳 بطاقة (Demo)</span></label>
          </div>
          {payment === 'demo-card' && <p className="mt-2 rounded-lg border border-gold/30 bg-darkbg p-3 text-xs text-gray-300">الدفع تجريبي فقط؛ لا تدخل رقم بطاقة أو CVC حقيقي.</p>}
        </fieldset>
        <Button type="submit" className="w-full" size="lg">تأكيد الطلب · {formatEGP(totals.total)}</Button>
      </form>
      <aside aria-label="ملخص الطلب" className="h-fit rounded-2xl border border-gray-800 bg-cardbg p-6 lg:sticky lg:top-24">
        <h2 className="mb-4 font-bold text-gold">ملخص الطلب</h2>
        <ul className="mb-4 space-y-3 text-sm text-gray-300">{lines.map((l) => <li key={l.product.id} className="flex justify-between gap-2"><span>{l.product.name} × {l.qty}</span><span className="shrink-0">{formatEGP(l.product.price * l.qty)}</span></li>)}</ul>
        <TotalsBox {...totals} />
        <p className="mt-3 text-[11px] text-gray-400">{totals.shipping === 0 ? 'الشحن مجاني على طلبك.' : `الشحن ${formatEGP(storeConfig.shippingFee)}، ومجاني من ${formatEGP(storeConfig.freeShippingThreshold)} بعد الخصم.`}</p>
        <Link href="/store" className="mt-4 block text-center text-xs text-gold hover:underline">تعديل العربة</Link>
      </aside>
    </div>
  </div>;
}

'use client';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { plans } from '@/data/plans';
import { siteConfig } from '@/data/site';
import { formatDate, formatEGP } from '@/lib/format';
import { addMonths, saveSubscription } from '@/lib/subscription';
import { contactSchema, normalizePhone } from '@/lib/validation';
import type { Plan } from '@/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

const schema = contactSchema.extend({ planId: z.enum(['basic', 'pro', 'elite']) });
type FormValues = z.infer<typeof schema>;
type Step = 'form' | 'processing' | 'success';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function SubscribeFlow({ initialPlan, onClose }: { initialPlan: Plan; onClose: () => void }) {
  const [step, setStep] = useState<Step>('form');
  const [result, setResult] = useState<{ code: string; plan: Plan; name: string; expiresAt: string } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { planId: initialPlan.id },
  });
  const currentPlan = plans.find((p) => p.id === watch('planId')) ?? initialPlan;

  useEffect(() => { if (step !== 'form') headingRef.current?.focus(); }, [step]);

  async function onSubmit(values: FormValues) {
    setStep('processing');
    await sleep(1400); // simulated payment gateway latency
    const plan = plans.find((p) => p.id === values.planId) ?? initialPlan;
    const now = new Date();
    const code = `LG-DEMO-${Math.floor(1000 + Math.random() * 9000)}`;
    const expiresAt = addMonths(now, plan.months).toISOString();
    saveSubscription({ code, name: values.name.trim(), phone: normalizePhone(values.phone), email: values.email.trim(), planId: plan.id, startedAt: now.toISOString(), expiresAt });
    setResult({ code, plan, name: values.name.trim(), expiresAt });
    setStep('success');
  }

  if (step === 'processing') {
    return (
      <div className="py-10 text-center" role="status" aria-live="polite">
        <span className="mx-auto mb-4 block h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent" aria-hidden="true" />
        <h3 ref={headingRef} tabIndex={-1} className="font-bold text-gold outline-none">جاري تنفيذ الدفع التجريبي...</h3>
        <p className="mt-2 text-xs text-gray-300">لا يتم إرسال أي بيانات ولا خصم أي مبالغ.</p>
      </div>
    );
  }

  if (step === 'success' && result) {
    return (
      <div className="py-4 text-center">
        <p className="mb-2 text-5xl" aria-hidden="true">✅</p>
        <h3 ref={headingRef} tabIndex={-1} className="mb-1 text-xl font-extrabold text-gold outline-none">Demo Payment ناجح</h3>
        <p className="mb-4 text-sm text-gray-300">أهلاً بيك يا {result.name} في {siteConfig.nameAr}!</p>
        <dl className="mb-4 space-y-2 rounded-xl border border-gray-800 bg-sectionbg p-4 text-sm">
          <div className="flex justify-between"><dt className="text-gray-300">كود الاشتراك</dt><dd dir="ltr" className="font-bold text-gold">{result.code}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-300">الباقة</dt><dd className="font-bold">{result.plan.name} ({result.plan.duration})</dd></div>
          <div className="flex justify-between"><dt className="text-gray-300">المبلغ (تجريبي)</dt><dd className="font-bold">{formatEGP(result.plan.price)}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-300">ينتهي في</dt><dd className="font-bold">{formatDate(result.expiresAt)}</dd></div>
        </dl>
        <p className="mb-4 rounded-lg border border-gold/30 bg-darkbg p-3 text-xs text-gray-300">{siteConfig.demoNotice}</p>
        <Button onClick={onClose}>إغلاق</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-1">
      <Select label="الباقة" error={errors.planId?.message} {...register('planId')}>
        {plans.map((p) => <option key={p.id} value={p.id}>{p.name} - {formatEGP(p.price)} / {p.duration}</option>)}
      </Select>
      <Input label="الاسم الكامل" autoComplete="name" placeholder="أحمد محمد" error={errors.name?.message} {...register('name')} />
      <Input label="رقم الموبايل" type="tel" inputMode="tel" autoComplete="tel" ltr placeholder="01012345678" error={errors.phone?.message} {...register('phone')} />
      <Input label="البريد الإلكتروني" type="email" autoComplete="email" ltr placeholder="name@example.com" error={errors.email?.message} {...register('email')} />
      <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-sectionbg p-4">
        <div>
          <span className="block text-xs text-gray-300">الإجمالي (تجريبي)</span>
          <span className="text-2xl font-black text-gold">{formatEGP(currentPlan.price)}</span>
        </div>
        <Button type="submit">ادفع الآن (Demo)</Button>
      </div>
      <p className="pt-2 text-center text-[11px] text-gray-400">{siteConfig.demoNotice} ولا نطلب أي بيانات بطاقة.</p>
    </form>
  );
}

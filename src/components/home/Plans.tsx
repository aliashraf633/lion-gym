'use client';
import { useState } from 'react';
import { plans } from '@/data/plans';
import { formatEGP } from '@/lib/format';
import type { Plan } from '@/types';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import SectionHeading from '@/components/ui/SectionHeading';
import SubscribeFlow from './SubscribeFlow';

export default function Plans() {
  const [selected, setSelected] = useState<Plan | null>(null);
  return (
    <section id="plans" className="scroll-mt-20 border-y border-gray-800 bg-sectionbg px-4 py-16">
      <SectionHeading title="باقات الاشتراك" subtitle="اختار الباقة المناسبة وسجّل طلبك. الأسعار والبيانات تجريبية." />
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <article key={p.id} className={`relative flex flex-col rounded-2xl border-2 bg-cardbg p-6 text-center ${p.featured ? 'border-gold shadow-lg shadow-gold/10' : 'border-gray-800'}`}>
            {p.featured && <span className="absolute -top-3 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 rounded-full bg-gold px-3 py-1 text-xs font-extrabold text-black">الأكثر طلباً 🔥</span>}
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="my-3 text-3xl font-black text-gold">{formatEGP(p.price)} <span className="text-sm font-normal text-gray-300">/ {p.duration}</span></p>
            <ul className="mb-6 flex-1 space-y-2 text-sm text-gray-300">
              {p.features.map((f) => <li key={f}>✓ {f}</li>)}
            </ul>
            <Button variant={p.featured ? 'primary' : 'secondary'} onClick={() => setSelected(p)}>{p.cta}</Button>
          </article>
        ))}
      </div>
      <Modal open={!!selected} onClose={() => setSelected(null)} title="الاشتراك (نسخة تجريبية)">
        {selected && <SubscribeFlow initialPlan={selected} onClose={() => setSelected(null)} />}
      </Modal>
    </section>
  );
}

'use client';
import { useState } from 'react';
import { trainers } from '@/data/trainers';
import { siteConfig } from '@/data/site';
import { buttonClasses } from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import Modal from '@/components/ui/Modal';
import Rating from '@/components/ui/Rating';
import Link from 'next/link';

export default function Trainers() {
  const [active, setActive] = useState<typeof trainers[number] | null>(null);
  return <section id="trainers" className="scroll-mt-20 px-4 py-16">
    <SectionHeading title="مدربيك معاك في كل خطوة" subtitle="اختار التخصص المناسب لهدفك واحجز جلسة تعريفية." />
    <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {trainers.map(t => <article key={t.id} className="overflow-hidden rounded-2xl border border-gray-800 bg-cardbg">
        <img src={t.image} alt={t.name} loading="lazy" className="h-64 w-full object-cover" />
        <div className="p-4"><h3 className="font-black">{t.name}</h3><p className="mt-1 text-xs text-gold">{t.specialty} · {t.experienceYears} سنوات خبرة</p><Rating value={t.rating} /><p className="mt-3 line-clamp-2 text-xs leading-6 text-gray-300">{t.bio}</p>
        <button type="button" onClick={()=>setActive(t)} className={`${buttonClasses('secondary','sm')} mt-4 w-full`}>احجز جلسة تعريفية</button></div>
      </article>)}
    </div>
    <Modal open={!!active} onClose={()=>setActive(null)} title={active?.name ?? ''}>
      {active && <div className="space-y-4"><p className="text-sm text-gray-300">{active.bio}</p><div className="grid grid-cols-2 gap-2">{active.slots.map(s=><a key={s} className="rounded-xl border border-gray-700 p-3 text-center text-sm hover:border-gold" href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`مرحباً، أريد حجز جلسة مع ${active.name} الساعة ${s}`)}`} target="_blank" rel="noreferrer">🕒 {s}</a>)}</div><a className={`${buttonClasses('primary','md')} w-full`} href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(`مرحباً، أريد حجز جلسة مع ${active.name}`)}`} target="_blank" rel="noreferrer">التواصل عبر WhatsApp</a></div>}
    </Modal>
  </section>;
}

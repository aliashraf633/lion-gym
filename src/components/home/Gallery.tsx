'use client';
import { useState } from 'react';
import { gallery } from '@/data/gallery';
import SectionHeading from '@/components/ui/SectionHeading';
import Modal from '@/components/ui/Modal';

export default function Gallery() {
 const [active,setActive]=useState<typeof gallery[number]|null>(null);
 return <section id="gallery" className="scroll-mt-20 border-y border-gray-800 bg-sectionbg px-4 py-16">
  <SectionHeading title="شوف أجواء Lion Gym" subtitle="مساحات مصممة عشان تمرينك يكون أقوى وأكثر راحة." />
  <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-3">
   {gallery.map((g,i)=><button key={g.id} type="button" onClick={()=>setActive(g)} className={`group relative overflow-hidden rounded-2xl border border-gray-800 text-start ${i===0?'col-span-2 md:col-span-1':''}`}>
    <img src={g.image} alt={g.title} loading="lazy" className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 md:h-56" />
    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-3 text-xs font-bold">{g.title}<span className="block font-normal text-gray-300">{g.category}</span></span>
   </button>)}
  </div>
  <Modal open={!!active} onClose={()=>setActive(null)} title={active?.title ?? ''} maxWidth="max-w-4xl">{active && <img src={active.image} alt={active.title} className="max-h-[70vh] w-full rounded-xl object-contain" />}</Modal>
 </section>
}

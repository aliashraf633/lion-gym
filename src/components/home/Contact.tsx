import Link from 'next/link';
import { siteConfig } from '@/data/site';
import SectionHeading from '@/components/ui/SectionHeading';
import { buttonClasses } from '@/components/ui/Button';

export default function Contact() {
 const wa=`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent('مرحباً Lion Gym، أريد معرفة تفاصيل الاشتراك.')}`;
 return <section id="contact" className="scroll-mt-20 px-4 py-16">
  <SectionHeading title="جاهز تبدأ؟" subtitle="كل طرق التواصل والموقع في مكان واحد." />
  <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
   <div className="rounded-2xl border border-gray-800 bg-cardbg p-6">
    <div className="space-y-5 text-sm">
     <p><span className="block text-xs text-gray-400">الهاتف</span><a href={`tel:${siteConfig.phone.replace(/\s/g,'')}`} dir="ltr" className="font-bold text-gold hover:underline">{siteConfig.phone}</a></p>
     <p><span className="block text-xs text-gray-400">البريد</span><a href={`mailto:${siteConfig.email}`} className="font-bold text-gold hover:underline">{siteConfig.email}</a></p>
     <p><span className="block text-xs text-gray-400">العنوان</span>{siteConfig.address}</p>
     <p><span className="block text-xs text-gray-400">مواعيد العمل</span>{siteConfig.hours}</p>
    </div>
    <div className="mt-6 flex flex-wrap gap-2"><a href={wa} target="_blank" rel="noreferrer" className={buttonClasses('primary','sm')}>WhatsApp</a><a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer" className={buttonClasses('secondary','sm')}>فتح الموقع على الخريطة</a></div>
   </div>
   <div className="min-h-72 overflow-hidden rounded-2xl border border-gray-800 bg-cardbg">
    <iframe title="موقع Lion Gym على الخريطة" src="https://www.google.com/maps?q=Cairo,Egypt&output=embed" loading="lazy" className="h-full min-h-72 w-full border-0" referrerPolicy="no-referrer-when-downgrade" />
   </div>
  </div>
 </section>
}

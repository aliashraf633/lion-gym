import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { buttonClasses } from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-gray-800 bg-gradient-to-b from-darkbg via-sectionbg to-darkbg px-4 py-20">
      <div className="pointer-events-none absolute -top-24 -end-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-4xl text-center animate-fade-up">
        <span className="mb-4 inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold text-gold">🔥 قوتك تبدأ من هنا</span>
        <h1 className="mb-6 text-4xl font-black leading-tight md:text-6xl">{siteConfig.tagline}</h1>
        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
          أجهزة حديثة، برامج تدريبية، ومدربين محترفين. ابدأ رحلتك الآن مع {siteConfig.nameAr}.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/#plans" className={buttonClasses('primary', 'lg')}>اشترك الآن</Link>
          <Link href="/#features" className={buttonClasses('secondary', 'lg')}>اكتشف برامجنا</Link>
        </div>
      </div>
    </section>
  );
}

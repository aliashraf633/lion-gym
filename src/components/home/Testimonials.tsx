import { testimonials } from '@/data/testimonials';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 border-t border-gray-800 bg-sectionbg px-4 py-16">
      <SectionHeading title="آراء المشتركين" subtitle="آراء تجريبية مكتوبة لأغراض العرض." />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.id} className="rounded-2xl border border-gray-800 bg-cardbg p-6">
            <div role="img" aria-label={`تقييم ${t.rating} من 5`} className="mb-3 text-amber-400">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
            <blockquote className="mb-4 text-sm leading-relaxed text-gray-200">“{t.comment}”</blockquote>
            <figcaption className="flex items-center gap-3">
              <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-black text-black">{t.avatar}</span>
              <span className="text-sm font-bold">{t.name}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

import { transformations } from '@/data/transformations';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Transformations() {
  return (
    <section id="results" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <SectionHeading title="قصص نجاح أبطال الجيم" subtitle="الصور والأسماء والنتائج هنا بيانات تجريبية (Placeholder) لأغراض العرض فقط." />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {transformations.map((t) => (
          <article key={t.id} className="overflow-hidden rounded-2xl border border-gray-800 bg-cardbg transition hover:border-gold/50">
            <div className="grid grid-cols-2">
              {([['قبل', t.beforeImage], ['بعد', t.afterImage]] as const).map(([label, src]) => (
                <figure key={label} className="relative h-56 bg-darkbg">
                  <img loading="lazy" src={src} alt={`صورة توضيحية (${label}) - ${t.goal}`} className="h-full w-full object-cover" />
                  <figcaption className="absolute bottom-2 start-2 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-gold">{label}</figcaption>
                </figure>
              ))}
            </div>
            <div className="p-6">
              <h3 className="mb-1 text-lg font-bold">{t.name} · {t.goal}</h3>
              <p className="mb-3 text-sm text-gray-300">{t.description}</p>
              <p className="border-t border-gray-800 pt-3 text-xs font-semibold text-gold">⏱️ المدة: {t.duration}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

import { features } from '@/data/site';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <SectionHeading title="لماذا جيم الأسد؟" subtitle="كل اللي محتاجه علشان توصل لهدفك في مكان واحد." />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <article key={f.id} className="rounded-2xl border border-gray-800 bg-cardbg p-6 transition hover:-translate-y-0.5 hover:border-gold/50">
            <p className="mb-3 text-3xl" aria-hidden="true">{f.icon}</p>
            <h3 className="mb-1 text-lg font-bold">{f.title}</h3>
            <p className="text-sm leading-relaxed text-gray-300">{f.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import { stats } from '@/data/site';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(value); return; }
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1200, 1);
        setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);

  return <dd ref={ref} className="order-1 text-3xl font-black text-gold">{n}{suffix}</dd>;
}

export default function Stats() {
  return (
    <section aria-label="أرقام الصالة (بيانات تجريبية)" className="border-b border-gray-800 bg-sectionbg py-10">
      <dl className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 text-center md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.id} className="flex flex-col rounded-2xl border border-gray-800 bg-cardbg p-4">
            <Counter value={s.value} suffix={s.suffix} />
            <dt className="order-2 text-sm font-semibold text-gray-300">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

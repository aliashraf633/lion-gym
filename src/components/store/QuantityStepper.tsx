interface Props { value: number; max: number; onChange: (n: number) => void; label: string }

export default function QuantityStepper({ value, max, onChange, label }: Props) {
  const btn = 'h-9 w-9 rounded-lg border border-gray-700 text-lg font-bold transition hover:border-gold disabled:opacity-40 disabled:hover:border-gray-700';
  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label={`الكمية: ${label}`}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="تقليل الكمية">−</button>
      <span className="w-8 text-center text-sm font-bold" aria-live="polite">{value}</span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="زيادة الكمية">+</button>
    </div>
  );
}

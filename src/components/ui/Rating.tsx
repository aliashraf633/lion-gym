export default function Rating({ value, reviews }: { value: number; reviews?: number }) {
  const full = Math.round(value);
  return (
    <div className="flex items-center gap-1 text-xs">
      <span role="img" aria-label={`تقييم ${value} من 5`} className="text-amber-400">{'★'.repeat(full)}{'☆'.repeat(5 - full)}</span>
      <span className="text-gray-300">{value.toFixed(1)}{reviews !== undefined && ` (${reviews})`}</span>
    </div>
  );
}

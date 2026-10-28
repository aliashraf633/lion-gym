'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { activityLevels, calculateCalories, type CalorieResult } from '@/lib/calories';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import SectionHeading from '@/components/ui/SectionHeading';

const num = (label: string, min: number, max: number) =>
  z.number({ invalid_type_error: `أدخل ${label}`, required_error: `أدخل ${label}` }).min(min, `${label} لازم يكون ${min} أو أكثر`).max(max, `${label} لازم يكون ${max} أو أقل`);

const schema = z.object({
  sex: z.enum(['male', 'female']),
  age: num('العمر', 15, 80),
  heightCm: num('الطول', 120, 230),
  weightKg: num('الوزن', 30, 250),
  activity: z.number().refine((v) => activityLevels.some((a) => a.value === v), 'اختار مستوى النشاط'),
});
type FormValues = z.infer<typeof schema>;

export default function CalorieCalculator() {
  const [result, setResult] = useState<CalorieResult | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { sex: 'male', activity: 1.55 },
  });

  const cards = result && [
    { label: 'معدل الحرق الأساسي (BMR)', value: result.bmr, hint: 'السعرات وأنت في راحة تامة' },
    { label: 'سعرات الحفاظ على الوزن (TDEE)', value: result.maintain, hint: 'مع نشاطك اليومي' },
    { label: 'لخسارة الدهون', value: result.cut, hint: result.cutRaisedToFloor ? 'تم رفعها للحد الأدنى الآمن' : 'عجز حوالي 400 سعرة' },
    { label: 'لزيادة العضلات', value: result.bulk, hint: 'فائض حوالي 300 سعرة' },
  ];

  return (
    <section id="calculator" className="scroll-mt-20 border-y border-gray-800 bg-sectionbg px-4 py-16">
      <SectionHeading title="حاسبة السعرات اليومية" subtitle="تقدير احتياجك اليومي بمعادلة Mifflin-St Jeor حسب نشاطك وهدفك." />
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
        <form onSubmit={handleSubmit((v) => setResult(calculateCalories({ sex: v.sex, age: v.age, heightCm: v.heightCm, weightKg: v.weightKg, activity: v.activity })))} noValidate className="rounded-2xl border border-gray-800 bg-cardbg p-6">
          <div className="grid grid-cols-2 gap-x-3">
            <Select label="الجنس" error={errors.sex?.message} {...register('sex')}>
              <option value="male">ذكر</option>
              <option value="female">أنثى</option>
            </Select>
            <Input label="العمر (15–80)" type="number" inputMode="numeric" placeholder="25" error={errors.age?.message} {...register('age', { valueAsNumber: true })} />
            <Input label="الطول بالسم (120–230)" type="number" inputMode="numeric" placeholder="175" error={errors.heightCm?.message} {...register('heightCm', { valueAsNumber: true })} />
            <Input label="الوزن بالكجم (30–250)" type="number" inputMode="decimal" step="0.1" placeholder="75" error={errors.weightKg?.message} {...register('weightKg', { valueAsNumber: true })} />
          </div>
          <Select label="مستوى النشاط" error={errors.activity?.message} {...register('activity', { setValueAs: (v) => Number(v) })}>
            {activityLevels.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
          </Select>
          <Button type="submit" className="w-full">احسب السعرات</Button>
        </form>

        <div className="rounded-2xl border border-gray-800 bg-cardbg p-6" role="status" aria-live="polite">
          {cards ? (
            <div className="grid grid-cols-2 gap-3 text-center">
              {cards.map((c) => (
                <div key={c.label} className="rounded-xl border border-gray-800 bg-sectionbg p-3">
                  <p className="text-xs text-gray-300">{c.label}</p>
                  <p className="my-1 text-2xl font-black text-gold">{Math.round(c.value).toLocaleString('en-US')}</p>
                  <p className="text-[11px] text-gray-400">{c.hint}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-sm text-gray-300">املأ البيانات واضغط «احسب السعرات» وهتظهر النتيجة هنا.</p>
          )}
          <p className="mt-4 text-[11px] leading-relaxed text-gray-400">
            ⚠️ النتيجة تقدير عام وليست نصيحة طبية. استشر طبيباً أو أخصائي تغذية قبل تغيير نظامك الغذائي، خصوصاً مع الأمراض المزمنة أو الحمل.
          </p>
        </div>
      </div>
    </section>
  );
}

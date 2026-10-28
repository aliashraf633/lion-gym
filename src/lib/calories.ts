export type Sex = 'male' | 'female';

export const activityLevels = [
  { value: 1.2, label: 'خامل (بدون تمارين)' },
  { value: 1.375, label: 'خفيف (1–3 أيام أسبوعياً)' },
  { value: 1.55, label: 'متوسط (3–5 أيام أسبوعياً)' },
  { value: 1.725, label: 'عالٍ (6–7 أيام أسبوعياً)' },
  { value: 1.9, label: 'شديد (تمارين مكثفة + عمل بدني)' },
] as const;

export interface CalorieInput { sex: Sex; age: number; heightCm: number; weightKg: number; activity: number }
export interface CalorieResult { bmr: number; tdee: number; maintain: number; cut: number; bulk: number; cutRaisedToFloor: boolean }

/** Mifflin-St Jeor equation. Results are estimates only. */
export function calculateCalories({ sex, age, heightCm, weightKg, activity }: CalorieInput): CalorieResult {
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === 'male' ? 5 : -161);
  const tdee = bmr * activity;
  const floor = sex === 'male' ? 1500 : 1200; // safety floor for fat-loss targets
  const rawCut = tdee - 400;
  return { bmr, tdee, maintain: tdee, cut: Math.max(rawCut, floor), bulk: tdee + 300, cutRaisedToFloor: rawCut < floor };
}

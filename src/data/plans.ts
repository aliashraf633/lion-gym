import type { Plan } from '@/types';

export const plans: Plan[] = [
  { id: 'basic', name: 'Basic', price: 400, duration: 'شهرياً', months: 1, features: ['استخدام كل الأجهزة', 'متابعة أسبوعية', 'خزانة يومية'], cta: 'اشترك في Basic' },
  { id: 'pro', name: 'Pro', price: 1000, duration: '3 شهور', months: 3, featured: true, features: ['كل مميزات Basic', 'حصة تدريب شخصي مجاناً', 'برنامج تغذية أساسي', 'قياس InBody شهري'], cta: 'اشترك في Pro' },
  { id: 'elite', name: 'Elite', price: 3500, duration: 'سنوياً', months: 12, features: ['كل مميزات Pro', 'مدرب شخصي مخصص', 'خصم 15% على المكملات', 'خزانة خاصة مجاناً'], cta: 'اشترك في Elite' },
];

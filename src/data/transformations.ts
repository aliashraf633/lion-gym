import type { Transformation } from '@/types';

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

/** Placeholder images only. Not real before/after photos. */
export const transformations: Transformation[] = [
  { id: 'cut-1', name: 'أحمد م.', goal: 'خسارة الدهون', duration: '5 شهور', description: 'نتيجة تجريبية: برنامج تنشيف مع متابعة تغذية.', beforeImage: img('1581009146145-b5ef050c2e1e'), afterImage: img('1526506118085-60ce8714f8c5') },
  { id: 'bulk-1', name: 'محمود إ.', goal: 'بناء العضلات', duration: '6 شهور', description: 'نتيجة تجريبية: برنامج تضخيم تدريجي.', beforeImage: img('1534438327276-14e5300c3a48'), afterImage: img('1571902943202-507ec2618e8f') },
];

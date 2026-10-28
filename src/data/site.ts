import type { Feature, NavLink, Stat } from '@/types';

export const siteConfig = {
  nameAr: 'جيم الأسد',
  nameEn: 'Lion Gym',
  tagline: 'ابني جسمك. طوّر قوتك. كن أفضل نسخة منك.',
  description: 'جيم الأسد في مصر: تدريب شخصي، أجهزة حديثة، برامج لياقة ومتجر مكملات. ابدأ رحلتك الرياضية اليوم.',
  phone: '0100 000 0000',
  whatsapp: '201000000000',
  email: 'hello@liongym.example',
  address: 'القاهرة - مصر',
  hours: 'يومياً من 10 صباحاً حتى 1 صباحاً',
  mapsUrl: 'https://maps.google.com/?q=Lion+Gym+Cairo',
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',
  demoNotice: 'الدفع الإلكتروني تجريبي حالياً ولا يتم تحصيل أي أموال حقيقية.',
} as const;

export const navLinks: NavLink[] = [
  { href: '/#features', label: 'الخدمات' },
  { href: '/#trainers', label: 'المدربين' },
  { href: '/#plans', label: 'الاشتراكات' },
  { href: '/#results', label: 'النتائج' },
  { href: '/#gallery', label: 'الجاليري' },
  { href: '/store', label: 'المتجر' },
];

export const stats: Stat[] = [
  { id: 'members', value: 500, suffix: '+', label: 'مشترك' },
  { id: 'trainers', value: 15, suffix: '+', label: 'مدرب' },
  { id: 'years', value: 10, suffix: '+', label: 'سنوات خبرة' },
  { id: 'programs', value: 20, suffix: '+', label: 'برنامج تدريبي' },
];

export const features: Feature[] = [
  { id: 'equipment', icon: '🏋️', title: 'أجهزة حديثة', description: 'معدات عالمية بصيانة دورية لتمرين آمن وفعّال.' },
  { id: 'trainers', icon: '🧑‍🏫', title: 'مدربين محترفين', description: 'فريق معتمد يتابعك خطوة بخطوة نحو هدفك.' },
  { id: 'programs', icon: '📋', title: 'برامج تدريبية', description: 'خطط للتضخيم والتنشيف واللياقة حسب مستواك.' },
  { id: 'progress', icon: '📈', title: 'متابعة التقدم', description: 'قياسات وتقارير دورية لتشوف نتيجتك بالأرقام.' },
  { id: 'nutrition', icon: '🥗', title: 'التغذية', description: 'إرشادات تغذية مناسبة لهدفك ونمط حياتك.' },
  { id: 'pt', icon: '🎯', title: 'Personal Training', description: 'جلسات فردية مخصصة مع مدرب شخصي.' },
];

export const storeConfig = {
  maxQty: 10,
  discountThreshold: 3000,
  discountRate: 0.1,
  shippingFee: 75,
  freeShippingThreshold: 2000,
} as const;

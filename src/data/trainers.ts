import type { Trainer } from '@/types';

const slots = ['10:00', '12:00', '15:00', '17:00', '19:00'];
const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

export const trainers: Trainer[] = [
  { id: 'ahmed-mohamed', name: 'الكابتن أحمد محمد', specialty: 'بناء العضلات', experienceYears: 9, rating: 4.9, bio: 'مدرب مختص في برامج التضخيم والقوة، يركّز على التقدم التدريجي الآمن.', image: img('1534438327276-14e5300c3a48'), slots },
  { id: 'omar-khaled', name: 'الكابتن عمر خالد', specialty: 'خسارة الدهون', experienceYears: 7, rating: 4.8, bio: 'يصمم برامج تنشيف وكارديو مع متابعة أسبوعية للقياسات.', image: img('1540497077202-7c8a3999166f'), slots },
  { id: 'youssef-ahmed', name: 'الكابتن يوسف أحمد', specialty: 'اللياقة الوظيفية', experienceYears: 5, rating: 4.7, bio: 'تمارين وظيفية لتحسين الحركة والقوة في الحياة اليومية.', image: img('1571902943202-507ec2618e8f'), slots },
  { id: 'mohamed-ali', name: 'الكابتن محمد علي', specialty: 'تدريب شخصي', experienceYears: 11, rating: 5.0, bio: 'جلسات فردية مخصصة تناسب هدفك ومستواك وجدولك.', image: img('1583454110551-21f2fa2afe61'), slots },
];

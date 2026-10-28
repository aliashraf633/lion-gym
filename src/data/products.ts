import type { Product, ProductCategory } from '@/types';

export const categoryLabels: Record<ProductCategory, string> = {
  protein: 'بروتين', creatine: 'كرياتين', amino: 'أحماض أمينية', preworkout: 'باور (Pre-Workout)', vitamins: 'فيتامينات', snacks: 'سناكس',
};
const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

export const products: Product[] = [
  { id: 'whey-protein', name: 'واي بروتين 2.2 كجم', category: 'protein', price: 2450, oldPrice: 2800, rating: 4.8, reviews: 124, stock: 18, image: img('1579722821273-0f6c7d44362f'), description: 'بروتين سريع الامتصاص لدعم بناء العضلات بعد التمرين.' },
  { id: 'creatine', name: 'كرياتين ميكرونايزد 300 جرام', category: 'creatine', price: 680, oldPrice: 800, rating: 4.9, reviews: 98, stock: 32, image: img('1593095948071-474c5cc2989d'), description: 'يدعم القوة والأداء أثناء التمارين عالية الشدة.' },
  { id: 'bcaa', name: 'BCAA أحماض أمينية 400 جرام', category: 'amino', price: 720, rating: 4.5, reviews: 61, stock: 4, image: img('1594381898411-846e7d193883'), description: 'أحماض أمينية متفرعة السلسلة لدعم التعافي.' },
  { id: 'pre-workout', name: 'Pre Workout باور', category: 'preworkout', price: 950, oldPrice: 1100, rating: 4.4, reviews: 77, stock: 12, image: img('1517838277536-f5f99be501cd'), description: 'طاقة وتركيز أعلى قبل التمرين. يحتوي على كافيين.' },
  { id: 'multivitamin', name: 'ملتي فيتامين للرياضيين', category: 'vitamins', price: 420, rating: 4.6, reviews: 53, stock: 40, image: img('1550572017-edd951b55104'), description: 'فيتامينات ومعادن أساسية لدعم الصحة العامة.' },
  { id: 'protein-bars', name: 'ألواح بروتين (12 قطعة)', category: 'snacks', price: 540, rating: 4.3, reviews: 39, stock: 0, image: img('1584017911766-d451b3d0e843'), description: 'سناك عالي البروتين مناسب بين الوجبات.' },
];

import type { Metadata } from 'next';
import StoreClient from '@/components/store/StoreClient';

export const metadata: Metadata = {
  title: 'متجر المكملات',
  description: 'متجر مكملات غذائية تجريبي: بروتين وكرياتين وBCAA وفيتامينات مع بحث وفلاتر وعربة تسوق. مشروع للعرض فقط.',
};

export default function StorePage() {
  return <StoreClient />;
}

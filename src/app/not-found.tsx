import Link from 'next/link';
import { buttonClasses } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl mb-4" aria-hidden="true">🦁</p>
      <h1 className="text-3xl font-black text-gold mb-3">الصفحة غير موجودة</h1>
      <p className="text-gray-300 mb-6">الرابط اللي فتحته مش موجود أو اتنقل لمكان تاني.</p>
      <Link href="/" className={buttonClasses('primary', 'md')}>العودة للرئيسية</Link>
    </section>
  );
}

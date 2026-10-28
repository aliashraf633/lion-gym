import type { Metadata } from 'next';
import OrderConfirmation from '@/components/store/OrderConfirmation';

export const metadata: Metadata = { title: 'تأكيد الطلب' };
export default function ConfirmationPage() { return <OrderConfirmation />; }

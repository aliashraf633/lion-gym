import type { Order } from '@/types';

export const orders: Order[] = [
  { id: 'LG-1001', customerId: 'c1', items: [{ productId: 'whey-protein', qty: 1 }, { productId: 'creatine', qty: 1 }], total: 3130, status: 'delivered', paymentMethod: 'cash', createdAt: '2026-10-05' },
  { id: 'LG-1002', customerId: 'c3', items: [{ productId: 'pre-workout', qty: 2 }], total: 1900, status: 'processing', paymentMethod: 'demo-card', createdAt: '2026-10-22' },
  { id: 'LG-1003', customerId: 'c4', items: [{ productId: 'multivitamin', qty: 1 }], total: 420, status: 'pending', paymentMethod: 'cash', createdAt: '2026-10-27' },
];

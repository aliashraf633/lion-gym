import type { Order, OrderStatus, PaymentMethod } from '@/types';
import { loadJSON, saveJSON } from '@/lib/storage';

export const ORDERS_KEY = 'lionGymOrders';

export const statusLabels: Record<OrderStatus, string> = {
  pending: 'قيد المراجعة', processing: 'جاري التجهيز', delivered: 'تم التسليم', cancelled: 'ملغي',
};
export const paymentLabels: Record<PaymentMethod, string> = { cash: 'كاش عند الاستلام', 'demo-card': 'دفع بالبطاقة (تجريبي)' };

const isOrders = (v: unknown): v is Order[] =>
  Array.isArray(v) && v.every((o) => o && typeof o.id === 'string' && Array.isArray(o.items) && typeof o.total === 'number');

export const loadOrders = (): Order[] => loadJSON<Order[]>(ORDERS_KEY, [], isOrders);
export const saveOrder = (order: Order): void => saveJSON(ORDERS_KEY, [order, ...loadOrders()].slice(0, 50));
export const generateOrderId = (): string => `LG-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;

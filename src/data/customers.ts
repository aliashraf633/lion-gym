import type { Customer } from '@/types';

/** All data below is fictional. Phone numbers are intentionally fake. */
export const customers: Customer[] = [
  { id: 'c1', name: 'أحمد محمد', phone: '0100 000 0001', email: 'ahmed@example.com', planId: 'pro', joinedAt: '2026-08-02', expiresAt: '2026-11-02', status: 'active' },
  { id: 'c2', name: 'محمد علي', phone: '0100 000 0002', email: 'mohamed@example.com', planId: 'basic', joinedAt: '2026-09-15', expiresAt: '2026-10-15', status: 'expired' },
  { id: 'c3', name: 'عمر خالد', phone: '0100 000 0003', email: 'omar@example.com', planId: 'elite', joinedAt: '2026-01-10', expiresAt: '2027-01-10', status: 'active' },
  { id: 'c4', name: 'يوسف أحمد', phone: '0100 000 0004', email: 'youssef@example.com', planId: 'basic', joinedAt: '2026-10-01', expiresAt: '2026-11-01', status: 'active' },
];

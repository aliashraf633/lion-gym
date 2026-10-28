import type { PlanId } from '@/types';
import { saveJSON } from '@/lib/storage';

export const SUBSCRIPTION_KEY = 'lionGymSubscription';

export interface DemoSubscription {
  code: string; name: string; phone: string; email: string; planId: PlanId; startedAt: string; expiresAt: string;
}

export function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export const saveSubscription = (s: DemoSubscription): void => saveJSON(SUBSCRIPTION_KEY, s);

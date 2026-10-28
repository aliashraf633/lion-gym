export type PlanId = 'basic' | 'pro' | 'elite';
export type ProductCategory = 'protein' | 'creatine' | 'amino' | 'preworkout' | 'vitamins' | 'snacks';
export type OrderStatus = 'pending' | 'processing' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cash' | 'demo-card';

export interface Stat { id: string; value: number; suffix: string; label: string }
export interface Feature { id: string; icon: string; title: string; description: string }
export interface NavLink { href: string; label: string }

export interface Plan {
  id: PlanId; name: string; price: number; duration: string; months: number; featured?: boolean; features: string[]; cta: string;
}
export interface Product {
  id: string; name: string; category: ProductCategory; price: number; oldPrice?: number;
  rating: number; reviews: number; stock: number; image: string; description: string;
}
export interface Trainer {
  id: string; name: string; specialty: string; experienceYears: number; rating: number;
  bio: string; image: string; slots: string[];
}
export interface Testimonial { id: string; name: string; rating: number; comment: string; avatar: string }
export interface Transformation {
  id: string; name: string; goal: string; duration: string; description: string; beforeImage: string; afterImage: string;
}
export interface OrderItem { productId: string; qty: number; unitPrice?: number }
export interface OrderCustomer { name: string; phone: string; email: string; governorate: string; city: string; address: string; notes?: string }
export interface Order {
  id: string; customerId: string; items: OrderItem[]; total: number; status: OrderStatus; paymentMethod: PaymentMethod; createdAt: string;
  subtotal?: number; discount?: number; shipping?: number; customer?: OrderCustomer;
}
export interface Customer {
  id: string; name: string; phone: string; email: string; planId: PlanId; joinedAt: string; expiresAt: string; status: 'active' | 'expired';
}

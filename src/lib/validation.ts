import { z } from 'zod';

const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
/** Normalizes Arabic-Indic digits, spaces and dashes before validation. */
export const normalizePhone = (s: string): string =>
  s.replace(/[٠-٩]/g, (d) => String(arabicDigits.indexOf(d))).replace(/[\s-]/g, '');

export const phoneSchema = z
  .string()
  .refine((v) => /^(\+?20|0)?1[0125]\d{8}$/.test(normalizePhone(v)), 'أدخل رقم موبايل مصري صحيح، مثل 01012345678');

export const nameSchema = z.string().trim().min(2, 'الاسم لازم يكون حرفين على الأقل').max(50, 'الاسم طويل جداً');
export const emailSchema = z.string().trim().email('أدخل بريداً إلكترونياً صحيحاً');

export const contactSchema = z.object({ name: nameSchema, phone: phoneSchema, email: emailSchema });
export type ContactInput = z.infer<typeof contactSchema>;

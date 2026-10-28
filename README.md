# 🦁 Lion Gym | جيم الأسد

موقع عربي RTL احترافي لجيم مبني بـ **Next.js 14 + TypeScript + Tailwind CSS** مع تجربة اشتراكات ومتجر مكملات تعمل محلياً بدون Backend.

> **مهم:** الدفع الإلكتروني في النسخة الحالية تجريبي فقط. الطلبات والاشتراكات تُحفظ في `localStorage` داخل متصفح المستخدم. لا توجد مفاتيح سرية أو بيانات دفع حقيقية في المشروع.

## Features

- Homepage Premium Dark + Gold
- Membership plans + validation + subscription confirmation
- Trainers + WhatsApp booking
- Transformations + testimonials
- Responsive gym gallery/lightbox
- Calorie calculator
- Store search, categories and sorting
- Product details, stock limits and ratings
- Persistent cart with localStorage
- Discounts + shipping/free-shipping rules
- Checkout with customer, governorate, city and address
- Cash on delivery + demo card option
- Order confirmation + generated order ID
- WhatsApp, phone, email and map contact section
- Arabic RTL accessibility/focus states
- SEO metadata, canonical, Open Graph, robots.txt and sitemap
- TypeScript + ESLint configuration
- Static export ready for Vercel/Netlify/GitHub Pages

## Tech Stack

- Next.js 14.2
- React 18
- TypeScript
- Tailwind CSS 3
- React Hook Form
- Zod
- Next Font (Cairo)

## Run locally

```bash
npm install
npm run dev
```

ثم افتح:

`http://localhost:3000`

## QA commands

```bash
npm run typecheck
npm run lint
npm run build
```

## Environment

انسخ `.env.example` إلى `.env.local` عند الحاجة:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

في الإنتاج، ضع الدومين الحقيقي، مثلاً:

```env
NEXT_PUBLIC_SITE_URL=https://liongym.example
```

## Project structure

```text
src/
  app/                 # Routes, metadata, sitemap, robots
  components/
    home/              # Homepage sections
    layout/            # Navbar/Footer
    store/             # Store, cart, checkout, confirmation
    ui/                # Reusable UI primitives
  context/             # Cart state
  data/                # Products, plans, trainers, site content
  lib/                 # Validation, storage, pricing, orders
  types/               # Shared TypeScript types
legacy/                # Original single-file prototype
```

## Real backend migration

الـarchitecture الحالية تفصل البيانات والـbusiness logic عن الـUI قدر الإمكان، لذلك يمكن لاحقاً استبدال `data/*` و`localStorage` بـ API/Database/Auth/Payment Gateway بدون إعادة بناء الواجهة بالكامل.

### Production next steps

1. استبدال بيانات التواصل والعنوان التجريبية ببيانات الجيم الحقيقية.
2. ربط المنتجات والمخزون بقاعدة بيانات.
3. إضافة Authentication وAdmin dashboard.
4. ربط بوابة دفع مصرية حقيقية من خلال Backend آمن.
5. إرسال رسائل تأكيد الطلب/الاشتراك من Server.
6. إضافة analytics وmonitoring.
7. استبدال صور Unsplash بصور الجيم الأصلية المضغوطة بصيغ WebP/AVIF.

## Screenshots

أضف لقطات الشاشة الحقيقية داخل `docs/screenshots/` عند تجهيز نسخة الإنتاج، ثم حدّث هذا القسم.

## License

Internal project / portfolio use.

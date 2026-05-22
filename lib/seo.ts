import { contacts } from '@/lib/contacts';

// Replace NEXT_PUBLIC_SITE_URL in .env.local with your real domain before publishing
export const siteConfig = {
  name: 'TEEON',
  descriptor: 'Пошив промо-одежды и корпоративного мерча под ключ',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teeon.ru').replace(/\/$/, ''),
  email: contacts.email,
  phone: contacts.phone,
  city: contacts.city,
  defaultTitle: 'Пошив промо-одежды и мерча на заказ | TEEON',
  defaultDescription:
    'Пошив промо-одежды и корпоративного мерча на заказ: футболки, худи, свитшоты, сумки, жилетки, куртки. Собственный цех, брендирование, B2B-заказы под ключ.',
  ogImage: '/og-default.svg',
} as const;

export type SiteConfig = typeof siteConfig;

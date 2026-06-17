import { contacts } from '@/lib/contacts';

// Replace NEXT_PUBLIC_SITE_URL in .env.local with your real domain before publishing
export const siteConfig = {
  name: 'TEEON',
  descriptor: 'Пошив промо-одежды и корпоративного мерча под ключ',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teeon.ru').replace(/\/$/, ''),
  email: contacts.email,
  phone: contacts.phone,
  city: contacts.city,
  defaultTitle: 'Пошив корпоративного мерча и промо-одежды на заказ | TEEON',
  defaultDescription:
    'Производим корпоративный мерч и промо-одежду: футболки, худи, свитшоты, сумки, куртки и брендирование. Собственное производство в Москве, документы для B2B.',
  ogImage: '/og-default.svg',
} as const;

export type SiteConfig = typeof siteConfig;

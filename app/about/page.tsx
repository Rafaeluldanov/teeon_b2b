import type { Metadata } from 'next';
import AboutPage from '@/components/AboutPage/AboutPage';
import JsonLd from '@/components/JsonLd/JsonLd';
import { siteConfig } from '@/lib/seo';
import { getBreadcrumbSchema, getOrganizationSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'О компании TEEON | Производство промо-одежды и мерча',
  description:
    'TEEON — производство промо-одежды и корпоративного мерча. Собственный швейный цех, брендирование, контроль качества, работа с B2B-заказами под ключ.',
  alternates: { canonical: `${siteConfig.url}/about/` },
  openGraph: {
    url: `${siteConfig.url}/about/`,
    title: 'О компании TEEON | Производство промо-одежды и мерча',
    description:
      'TEEON — производство промо-одежды и корпоративного мерча. Собственный швейный цех, брендирование, контроль качества, работа с B2B-заказами под ключ.',
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={[
        getBreadcrumbSchema([
          { name: 'Главная', url: siteConfig.url },
          { name: 'О компании', url: `${siteConfig.url}/about/` },
        ]),
        getOrganizationSchema(),
      ]} />
      <AboutPage />
    </>
  );
}

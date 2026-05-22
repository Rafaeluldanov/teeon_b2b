import type { Metadata } from 'next';
import { getCategoryBySlug } from '@/lib/catalog';
import CategoryPageContent from '@/components/CategoryPageContent/CategoryPageContent';
import { siteConfig } from '@/lib/seo';

const cat = getCategoryBySlug('futbolki')!;

export const metadata: Metadata = {
  title: cat.seo.title,
  description: cat.seo.description,
  alternates: { canonical: `${siteConfig.url}/catalog/${cat.slug}/` },
  openGraph: {
    url: `${siteConfig.url}/catalog/${cat.slug}/`,
    title: cat.seo.title,
    description: cat.seo.description,
  },
};

export default function Page() {
  return <CategoryPageContent category={cat} />;
}

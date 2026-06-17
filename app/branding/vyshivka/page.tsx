import type { Metadata } from 'next';
import { getBrandingMethod } from '@/lib/branding';
import BrandingPageContent from '@/components/BrandingPageContent/BrandingPageContent';
import { siteConfig } from '@/lib/seo';

const method = getBrandingMethod('vyshivka')!;

export const metadata: Metadata = {
  title: method.seoTitle,
  description: method.seoDescription,
  alternates: { canonical: `${siteConfig.url}/branding/${method.slug}` },
  openGraph: {
    url: `${siteConfig.url}/branding/${method.slug}`,
    title: method.seoTitle,
    description: method.seoDescription,
  },
};

export default function Page() {
  return <BrandingPageContent method={method} />;
}

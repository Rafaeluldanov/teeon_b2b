import type { MetadataRoute } from 'next';
import { canonicalUrl } from '@/lib/seo';
import { catalogCategories } from '@/lib/catalog';
import { brandingMethods } from '@/lib/branding';
import { portfolioCases } from '@/lib/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const catalogPages: MetadataRoute.Sitemap = catalogCategories.map((cat) => ({
    url: canonicalUrl(`/catalog/${cat.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const brandingPages: MetadataRoute.Sitemap = brandingMethods.map((m) => ({
    url: canonicalUrl(`/branding/${m.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const portfolioPages: MetadataRoute.Sitemap = portfolioCases.map((c) => ({
    url: canonicalUrl(`/portfolio/${c.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    { url: canonicalUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: canonicalUrl('/catalog'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...catalogPages,
    { url: canonicalUrl('/branding'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...brandingPages,
    { url: canonicalUrl('/portfolio'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...portfolioPages,
    { url: canonicalUrl('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: canonicalUrl('/faq'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: canonicalUrl('/contacts'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: canonicalUrl('/suvenirnaya-produkciya'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: canonicalUrl('/privacy'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: canonicalUrl('/requisites'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}

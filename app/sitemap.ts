import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';
import { catalogCategories } from '@/lib/catalog';
import { brandingMethods } from '@/lib/branding';
import { portfolioCases } from '@/lib/portfolio';

const base = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const catalogPages: MetadataRoute.Sitemap = catalogCategories.map((cat) => ({
    url: `${base}/catalog/${cat.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const brandingPages: MetadataRoute.Sitemap = brandingMethods.map((m) => ({
    url: `${base}/branding/${m.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const portfolioPages: MetadataRoute.Sitemap = portfolioCases.map((c) => ({
    url: `${base}/portfolio/${c.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/catalog/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...catalogPages,
    { url: `${base}/branding/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...brandingPages,
    { url: `${base}/portfolio/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    ...portfolioPages,
    { url: `${base}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/faq/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contacts/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/suvenirnaya-produkciya/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/privacy/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/requisites/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}

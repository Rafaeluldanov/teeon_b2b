import { siteConfig } from '@/lib/seo';
import { contacts } from '@/lib/contacts';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.descriptor,
    url: siteConfig.url,
    email: contacts.email,
    telephone: contacts.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: contacts.city,
      addressCountry: 'RU',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: contacts.phone,
        contactType: 'customer service',
        availableLanguage: 'Russian',
      },
    ],
    sameAs: [],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.defaultDescription,
    inLanguage: 'ru-RU',
  };
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getServiceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Russia',
    },
    serviceType: 'Textile Manufacturing',
    inLanguage: 'ru-RU',
  };
}

export function getFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function getPortfolioCaseSchema(caseItem: {
  title: string;
  description: string;
  slug: string;
  clientType: string;
  year: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: caseItem.title,
    description: caseItem.description,
    url: `${siteConfig.url}/portfolio/${caseItem.slug}`,
    dateCreated: String(caseItem.year),
    creator: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: caseItem.clientType,
    inLanguage: 'ru-RU',
  };
}

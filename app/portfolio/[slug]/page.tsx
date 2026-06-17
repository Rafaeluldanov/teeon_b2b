import type { Metadata } from 'next';
import { portfolioCases, getPortfolioCase } from '@/lib/portfolio';
import PortfolioCasePage from '@/components/PortfolioCasePage/PortfolioCasePage';
import PortfolioCaseLoader from '@/components/PortfolioCasePage/PortfolioCaseLoader';
import { siteConfig } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export const dynamicParams = true;

export function generateStaticParams() {
  return portfolioCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getPortfolioCase(params.slug);
  if (!c) {
    return {
      title: 'Кейс портфолио | TEEON',
      robots: { index: false, follow: false },
    };
  }
  const url = `${siteConfig.url}/portfolio/${c.slug}`;
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: c.seoTitle,
      description: c.seoDescription,
    },
  };
}

export default function Page({ params }: Props) {
  const c = getPortfolioCase(params.slug);
  if (c) return <PortfolioCasePage caseItem={c} />;
  return <PortfolioCaseLoader slug={params.slug} />;
}

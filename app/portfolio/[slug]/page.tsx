import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { portfolioCases, getPortfolioCase } from '@/lib/portfolio';
import PortfolioCasePage from '@/components/PortfolioCasePage/PortfolioCasePage';
import { siteConfig } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return portfolioCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getPortfolioCase(params.slug);
  if (!c) return {};
  const url = `${siteConfig.url}/portfolio/${c.slug}/`;
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
  if (!c) notFound();
  return <PortfolioCasePage caseItem={c} />;
}

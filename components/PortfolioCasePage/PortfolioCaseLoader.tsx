'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { PortfolioCase } from '@/lib/portfolio';
import PortfolioCasePage from './PortfolioCasePage';

const LS_KEY = 'teeon_admin_portfolio_cases';

interface AdminCaseInput {
  slug: string;
  title?: string;
  shortTitle?: string;
  clientType?: string;
  industry?: string;
  task?: string;
  result?: string;
  description?: string;
  products?: string[];
  technologies?: string[];
  quantity?: string;
  timeline?: string;
  year?: number;
  coverLabel?: string;
  galleryLabels?: string[];
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  relatedCatalog?: string[];
  relatedBranding?: string[];
  coverImage?: string;
  galleryImages?: string[];
  caseProducts?: unknown[];
  isActive?: boolean;
}

function normalize(raw: AdminCaseInput): PortfolioCase {
  return {
    slug: raw.slug,
    title: raw.title ?? '',
    shortTitle: raw.shortTitle ?? raw.title ?? '',
    clientType: raw.clientType ?? '',
    industry: raw.industry ?? '',
    task: raw.task ?? '',
    result: raw.result ?? '',
    description: raw.description ?? '',
    products: raw.products ?? [],
    technologies: raw.technologies ?? [],
    quantity: raw.quantity ?? '',
    timeline: raw.timeline ?? '',
    year: raw.year ?? new Date().getFullYear(),
    coverLabel: raw.coverLabel ?? raw.title ?? '',
    galleryLabels: raw.galleryLabels ?? [],
    seoTitle: raw.seoTitle ?? raw.title ?? '',
    seoDescription: raw.seoDescription ?? raw.description ?? '',
    tags: raw.tags ?? [],
    relatedCatalog: raw.relatedCatalog ?? [],
    relatedBranding: raw.relatedBranding ?? [],
  };
}

type Status = 'loading' | 'found' | 'not-found';

interface Props {
  slug: string;
}

export default function PortfolioCaseLoader({ slug }: Props) {
  const [status, setStatus] = useState<Status>('loading');
  const [caseItem, setCaseItem] = useState<PortfolioCase | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const all = JSON.parse(raw) as AdminCaseInput[];
        const found = all.find((c) => c?.slug === slug);
        if (found && (found.isActive !== false)) {
          setCaseItem(normalize(found));
          setStatus('found');
          return;
        }
      }
    } catch { /* ignore */ }
    setStatus('not-found');
  }, [slug]);

  if (status === 'loading') {
    return (
      <main className="v6-page" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 16, color: '#64748b' }}>Загрузка кейса…</p>
      </main>
    );
  }

  if (status === 'not-found' || !caseItem) {
    return (
      <main className="v6-page" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '48px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 96, fontWeight: 800, color: '#f97316', margin: 0, lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', margin: 0 }}>Страница не найдена</h2>
        <p style={{ fontSize: 15, color: '#64748b', margin: 0, maxWidth: 480 }}>
          Возможно, ссылка изменилась или раздел ещё не опубликован
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <Link href="/" className="v6-btn v6-btn--yellow">На главную</Link>
          <Link href="/portfolio/" className="v6-btn v6-btn--ghost-d">Все кейсы</Link>
        </div>
      </main>
    );
  }

  return <PortfolioCasePage caseItem={caseItem} />;
}

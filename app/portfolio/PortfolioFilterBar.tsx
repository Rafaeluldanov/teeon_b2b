'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DEFAULT_PORTFOLIO_FILTERS, loadPortfolioFilters } from '@/lib/portfolioFilters';
import type { PortfolioFilter } from '@/lib/portfolioFilters';
import styles from './portfolio.module.css';

interface Props { activeTag: string }

export default function PortfolioFilterBar({ activeTag }: Props) {
  const [filters, setFilters] = useState<PortfolioFilter[]>(DEFAULT_PORTFOLIO_FILTERS);

  useEffect(() => {
    setFilters(loadPortfolioFilters());
  }, []);

  const activeLabel = filters.find((f) => f.value === activeTag)?.label ?? activeTag;

  return (
    <div className={styles.filtersBar} role="navigation" aria-label="Фильтры кейсов">
      <span className={styles.filtersLead}>Фильтр:</span>
      <Link
        href="/portfolio/"
        className={`${styles.filterTag} ${styles.filterTagAll} ${!activeTag ? styles.filterTagActive : ''}`}
        aria-pressed={!activeTag}
      >
        Все кейсы
      </Link>
      {filters.map((f) => (
        <Link
          key={f.value}
          href={`/portfolio/?tag=${f.value}`}
          className={`${styles.filterTag} ${activeTag === f.value ? styles.filterTagActive : ''}`}
          aria-pressed={activeTag === f.value}
        >
          {f.label}
        </Link>
      ))}
      {activeTag && (
        <span className={styles.filterResult} aria-live="polite">
          Результаты по: «{activeLabel}»
        </span>
      )}
    </div>
  );
}

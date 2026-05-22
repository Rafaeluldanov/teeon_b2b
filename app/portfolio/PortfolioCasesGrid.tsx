'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { portfolioCases } from '@/lib/portfolio';
import type { PortfolioCase } from '@/lib/portfolio';
import styles from './portfolio.module.css';

const LS_KEY = 'teeon_admin_portfolio_cases';

type CaseKind = 'tee' | 'hoodie' | 'sweat' | 'longsleeve' | 'bag' | 'vest' | 'jacket' | 'raincoat';

const SLUG_META: Record<string, { kind: CaseKind; bg: string }> = {
  'hudi-futbolki-komanda':   { kind: 'hoodie',     bg: 'bgPaper2' },
  'merch-konferenciya':      { kind: 'tee',        bg: 'bgYellow' },
  'promo-odezhda-vistavka':  { kind: 'vest',       bg: 'bgPaper2' },
  'sumki-shopery-meropriyatie': { kind: 'bag',     bg: 'bgBlue'   },
  'zhiletki-personal':       { kind: 'vest',       bg: 'bgPaper2' },
  'dozhdeviki-promoakciya':  { kind: 'raincoat',   bg: 'bgYellow' },
  'svitshoty-sotrudniki':    { kind: 'sweat',      bg: 'bgPaper2' },
  'welcome-pack':            { kind: 'hoodie',     bg: 'bgInk'    },
  'kurtki-vyezdnaya-komanda':{ kind: 'jacket',     bg: 'bgPaper2' },
};

function Silhouette({ kind, opacity }: { kind: CaseKind; opacity: number }) {
  return (
    <svg
      viewBox="0 0 200 240"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }}
      aria-hidden="true"
    >
      {kind === 'tee'        && <g fill="currentColor"><path d="M52 78 L74 56 L86 64 Q100 76 114 64 L126 56 L148 78 L138 96 L122 88 L122 188 L78 188 L78 88 L62 96 Z"/></g>}
      {kind === 'hoodie'     && <g fill="currentColor"><path d="M70 70 Q70 50 100 50 Q130 50 130 70 L150 78 L142 100 L130 94 L130 188 L70 188 L70 94 L58 100 L50 78 Z"/></g>}
      {kind === 'sweat'      && <g fill="currentColor"><path d="M52 78 L78 58 Q100 68 122 58 L148 78 L140 100 L128 94 L128 188 L72 188 L72 94 L60 100 Z"/></g>}
      {kind === 'longsleeve' && <g fill="currentColor"><path d="M40 70 L78 58 Q100 68 122 58 L160 70 L158 130 L140 124 L140 188 L60 188 L60 124 L42 130 Z"/></g>}
      {kind === 'bag'        && <g fill="currentColor"><path d="M70 92 L130 92 L138 192 L62 192 Z"/><path d="M84 92 Q84 60 100 60 Q116 60 116 92" fill="none" stroke="currentColor" strokeWidth="6"/></g>}
      {kind === 'vest'       && <g fill="currentColor"><path d="M58 78 L86 60 L100 70 L114 60 L142 78 L142 188 L114 188 L114 96 L86 96 L86 188 L58 188 Z"/></g>}
      {kind === 'jacket'     && <g fill="currentColor"><path d="M50 78 L78 56 L98 60 L98 188 L60 188 Z"/><path d="M150 78 L122 56 L102 60 L102 188 L140 188 Z"/></g>}
      {kind === 'raincoat'   && <g fill="currentColor"><path d="M64 80 Q64 56 100 56 Q136 56 136 80 L154 88 L144 110 L132 104 L132 196 L68 196 L68 104 L56 110 L46 88 Z"/></g>}
    </svg>
  );
}

type AdminCase = PortfolioCase & {
  coverImage?: string;
  sortOrder?: number;
  isActive?: boolean;
};

interface Props {
  activeTag: string;
}

export default function PortfolioCasesGrid({ activeTag }: Props) {
  const [cases, setCases] = useState<AdminCase[]>(portfolioCases as AdminCase[]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setCases(JSON.parse(raw) as AdminCase[]);
    } catch { /* ignore */ }
  }, []);

  const filtered = cases
    .filter((c) => c.isActive !== false)
    .filter((c) => !activeTag || c.tags.includes(activeTag));

  if (filtered.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyText}>По выбранному фильтру кейсов пока нет.</p>
        <Link href="/portfolio/" className="v6-btn v6-btn--ghost-d">Смотреть все кейсы</Link>
      </div>
    );
  }

  return (
    <>
      {activeTag && (
        <p className={styles.filterResult} aria-live="polite">
          Найдено кейсов: {filtered.length}
        </p>
      )}
      <ul className={styles.casesGrid}>
        {filtered.map((c) => {
          const meta = SLUG_META[c.slug] ?? { kind: 'tee' as CaseKind, bg: 'bgPaper2' };
          const bgClass = styles[meta.bg as keyof typeof styles] ?? styles.bgPaper2;
          const opacity = meta.bg === 'bgPaper2' ? 0.5 : 0.4;

          return (
            <li key={c.slug} className={styles.caseCard}>
              <div className={`${styles.caseMedia} ${bgClass}`}>
                <span className={styles.caseChip}>{c.clientType}</span>
                <span className={styles.caseYear}>{c.year}</span>
                {c.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.coverImage}
                    alt={c.title}
                    className={styles.caseMediaImg}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <Silhouette kind={meta.kind} opacity={opacity} />
                )}
              </div>

              <div className={styles.caseBody}>
                <h3 className={styles.caseTitle}>{c.title}</h3>
                <dl className={styles.caseMeta}>
                  <dt>Задача</dt>
                  <dd>{c.shortTitle}</dd>
                  <dt>Тираж</dt>
                  <dd>{c.quantity}</dd>
                  <dt>Срок</dt>
                  <dd>{c.timeline}</dd>
                </dl>
                <div className={styles.caseTechTags}>
                  {c.technologies.map((t) => (
                    <span key={t} className={styles.caseTechTag}>{t}</span>
                  ))}
                </div>
              </div>

              <div className={styles.caseActions}>
                <Link href={`/portfolio/${c.slug}/`} className={styles.caseBtn}>
                  Смотреть кейс
                </Link>
                <a href="/#request" className={styles.caseQuote}>Рассчитать похожий →</a>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

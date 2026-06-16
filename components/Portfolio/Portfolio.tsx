'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Portfolio.module.css';
import { portfolioCases } from '@/lib/portfolio';
import type { PortfolioCase } from '@/lib/portfolio';

const LS_KEY = 'teeon_admin_portfolio_cases';
const DISPLAY_COUNT = 6;

interface CaseProductLite {
  images: string[];
  isActive?: boolean;
  sortOrder?: number;
}

type AdminCase = PortfolioCase & {
  coverImage?: string;
  sortOrder?: number;
  isActive?: boolean;
  caseProducts?: CaseProductLite[];
};
type CaseKind = 'tee' | 'hoodie' | 'sweat' | 'longsleeve' | 'bag' | 'vest' | 'jacket' | 'raincoat';

function collectProductImages(c: AdminCase, max = 4): string[] {
  const out: string[] = [];
  const prods = (c.caseProducts ?? [])
    .filter((p) => p.isActive !== false)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  for (const p of prods) {
    for (const img of p.images ?? []) {
      if (img && !out.includes(img)) out.push(img);
      if (out.length >= max) return out;
    }
  }
  return out;
}

const SLUG_META: Record<string, { kind: CaseKind; bg: string }> = {
  'hudi-futbolki-komanda':      { kind: 'hoodie',   bg: 'bg-paper2' },
  'merch-konferenciya':         { kind: 'tee',      bg: 'bg-yellow' },
  'promo-odezhda-vistavka':     { kind: 'vest',     bg: 'bg-paper2' },
  'sumki-shopery-meropriyatie': { kind: 'bag',      bg: 'bg-blue'   },
  'zhiletki-personal':          { kind: 'vest',     bg: 'bg-paper2' },
  'dozhdeviki-promoakciya':     { kind: 'raincoat', bg: 'bg-yellow' },
  'svitshoty-sotrudniki':       { kind: 'sweat',    bg: 'bg-paper2' },
  'welcome-pack':               { kind: 'hoodie',   bg: 'bg-ink'    },
  'kurtki-vyezdnaya-komanda':   { kind: 'jacket',   bg: 'bg-paper2' },
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

export default function Portfolio() {
  const [cases, setCases] = useState<AdminCase[]>(portfolioCases as AdminCase[]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setCases(JSON.parse(raw) as AdminCase[]);
    } catch { /* ignore */ }
  }, []);

  const visible = cases.filter(c => c.isActive !== false).slice(0, DISPLAY_COUNT);

  return (
    <section id="portfolio" className="section-spacer" aria-labelledby="portfolio-title">
      <div className="v6-section-head">
        <div>
          <div className="v6-kicker">(06) — Кейсы</div>
          <h2 id="portfolio-title">Кейсы <em>корпоративного мерча</em><br />и&nbsp;промо-одежды</h2>
        </div>
        <p>Примеры нашей работы: от welcome-наборов для IT до тиражей в 1 200 шопперов для ритейл-сети. Каждый — с задачей, цифрами и сроками.</p>
      </div>

      <ul className={styles.grid}>
        {visible.map((c) => {
          const meta = SLUG_META[c.slug] ?? { kind: 'tee' as CaseKind, bg: 'bg-paper2' };
          const bgClass = styles[meta.bg as keyof typeof styles] ?? '';
          const opacity = meta.bg === 'bg-paper2' ? 0.55 : 0.45;
          const productImgs = collectProductImages(c, 4);
          const hasMedia = c.coverImage || productImgs.length > 0;
          return (
            <li
              key={c.slug}
              className={styles.card}
              data-request-source={`Портфолио · ${c.title}`}
              data-request-image={c.coverImage || productImgs[0] || undefined}
            >
              <div className={`${styles.media} ${hasMedia ? '' : bgClass}`}>
                <span className={styles.chip}>{c.clientType}</span>
                {c.coverImage ? (
                  <Image
                    src={c.coverImage}
                    alt={c.title}
                    className={styles.mediaImg}
                    width={600}
                    height={600}
                    sizes="(max-width: 400px) 92vw, (max-width: 1024px) 46vw, 33vw"
                    loading="lazy"
                  />
                ) : productImgs.length > 0 ? (
                  <div className={styles.mediaCollage} data-count={Math.min(productImgs.length, 4)}>
                    {productImgs.slice(0, 4).map((img, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className={styles.mediaCollageImg}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    ))}
                  </div>
                ) : (
                  <Silhouette kind={meta.kind} opacity={opacity} />
                )}
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{c.title}</h3>
                <dl className={styles.meta}>
                  <dt>Задача</dt><dd>{c.task.slice(0, 60)}{c.task.length > 60 ? '…' : ''}</dd>
                  <dt>Тираж</dt><dd>{c.quantity}</dd>
                  <dt>Метод</dt><dd>{c.technologies.join(', ')}</dd>
                  <dt>Срок</dt><dd>{c.timeline}</dd>
                </dl>
                <div className={styles.actions}>
                  <Link href={`/portfolio/${c.slug}/`} className={styles.btn}>Смотреть кейс</Link>
                  <a href="#request" className={styles.quote}>Рассчитать похожий →</a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.footer}>
        <Link href="/portfolio/" className="v6-btn v6-btn--ink">
          Смотреть все кейсы
          <span className="v6-ic" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
          </span>
        </Link>
      </div>
    </section>
  );
}

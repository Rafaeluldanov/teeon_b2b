'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './BrandingSection.module.css';
import { brandingMethods } from '@/lib/branding';
import type { BrandingMethod } from '@/lib/branding';

const LS_KEY = 'teeon_admin_branding_methods';
type AdminMethod = BrandingMethod & { isActive?: boolean; sortOrder?: number };

const IP = { width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 1.7 };

function BrIcon({ slug }: { slug: string }) {
  switch (slug) {
    case 'vyshivka':     return <svg {...IP} viewBox="0 0 22 22"><circle cx="11" cy="11" r="6"/><path d="M11 5 L11 17 M5 11 L17 11"/></svg>;
    case 'shevrony':     return <svg {...IP} viewBox="0 0 22 22"><path d="M3 14 L11 6 L19 14 L17 17 L11 12 L5 17 Z"/></svg>;
    case 'shelkografiya':return <svg {...IP} viewBox="0 0 22 22"><rect x="3" y="3" width="16" height="16"/><path d="M7 7 L15 7 M7 11 L15 11 M7 15 L15 15"/></svg>;
    case 'dtf-pechat':   return <svg {...IP} viewBox="0 0 22 22"><rect x="3" y="5" width="16" height="12"/><path d="M7 5 L7 17 M11 5 L11 17 M15 5 L15 17"/></svg>;
    case 'dtg-pechat':   return <svg {...IP} viewBox="0 0 22 22"><path d="M3 8 L19 8 L16 17 L6 17 Z"/><circle cx="11" cy="12" r="2.5"/></svg>;
    case 'sublimaciya':  return <svg {...IP} viewBox="0 0 22 22"><path d="M5 17 Q5 5 11 5 Q17 5 17 17 Z"/></svg>;
    case 'tisnenie':     return <svg {...IP} viewBox="0 0 22 22"><rect x="3" y="5" width="16" height="12"/><path d="M8 11 L14 11" strokeWidth={3}/></svg>;
    case 'gravirovka':   return <svg {...IP} viewBox="0 0 22 22"><path d="M3 19 L19 19 M11 3 L11 15 M8 12 L11 15 L14 12"/></svg>;
    case 'birki':        return <svg {...IP} viewBox="0 0 22 22"><path d="M3 6 L14 3 L19 11 L14 19 L3 16 Z"/><circle cx="9" cy="11" r="2"/></svg>;
    default:             return <svg {...IP} viewBox="0 0 22 22"><rect x="3" y="3" width="16" height="16" rx="2"/></svg>;
  }
}

const SLUG_META: Record<string, { bg: string; num: string }> = {
  vyshivka:      { bg: '',       num: '01' },
  shelkografiya: { bg: 'yellow', num: '02' },
  'dtf-pechat':  { bg: 'blue',   num: '03' },
  'dtg-pechat':  { bg: '',       num: '04' },
  sublimaciya:   { bg: '',       num: '05' },
  shevrony:      { bg: 'yellow', num: '06' },
  tisnenie:      { bg: 'ink',    num: '07' },
  gravirovka:    { bg: '',       num: '08' },
  birki:         { bg: 'blue',   num: '09' },
};

const ArrowIc = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 10 L10 2 M4 2 L10 2 L10 8" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export default function BrandingSection() {
  const [methods, setMethods] = useState<AdminMethod[]>(brandingMethods as AdminMethod[]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setMethods(JSON.parse(raw) as AdminMethod[]);
    } catch { /* ignore */ }
  }, []);

  const visible = methods.filter(m => m.isActive !== false);

  return (
    <section id="branding" className="section-spacer" aria-labelledby="branding-title">
      <div className="v6-section-head">
        <div>
          <div className="v6-kicker">(04) — Нанесение</div>
          <h2 id="branding-title">Способы <em>брендирования</em><br />одежды и&nbsp;мерча</h2>
        </div>
        <p>Подбираем технологию под ткань, тираж и бюджет. От вышивки на корпоративных поло до полноцветной DTF на промо-футболках.</p>
      </div>

      <ul className={styles.grid}>
        {visible.map((m) => {
          const meta = SLUG_META[m.slug] ?? { bg: '', num: '—' };
          const bgClass = meta.bg ? styles[meta.bg as keyof typeof styles] : '';
          return (
            <li key={m.slug}>
              <Link href={`/branding/${m.slug}/`} className={`${styles.card} ${bgClass}`}>
                <div className={styles.head}>
                  <span className={styles.icon} aria-hidden="true"><BrIcon slug={m.slug} /></span>
                  <span className={styles.num}>{meta.num}</span>
                </div>
                <div className={styles.title}>{m.title}</div>
                <div className={styles.desc}>{m.shortDescription}</div>
                <div className={styles.tags}>
                  {m.tags.slice(0, 2).map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <span className={styles.link}>
                  Подробнее <ArrowIc />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className={styles.footer}>
        <Link href="/branding/" className="v6-btn v6-btn--ink">
          Все способы брендирования
          <span className="v6-ic" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
          </span>
        </Link>
      </div>
    </section>
  );
}

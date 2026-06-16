'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { portfolioCases } from '@/lib/portfolio';
import type { PortfolioCase } from '@/lib/portfolio';
import { DEFAULT_TAG_ALIASES } from '@/lib/portfolioFilters';
import Lightbox, { type LightboxState } from '@/components/Lightbox/Lightbox';
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

interface CaseProductLite {
  id?: string;
  title?: string;
  description?: string;
  quantity?: string;
  material?: string;
  color?: string;
  characteristics?: string[];
  images: string[];
  isActive?: boolean;
  sortOrder?: number;
  categorySlug?: string;
  branding?: string[];
  tags?: string[];
}

type AdminCase = PortfolioCase & {
  coverImage?: string;
  sortOrder?: number;
  isActive?: boolean;
  caseProducts?: CaseProductLite[];
};

// Алиасы (русские слова) для fallback-матча по свободному тексту:
// названию изделия, технологиям кейса, полю «Брендирование».
const TAG_ALIASES = DEFAULT_TAG_ALIASES;

function norm(s: string): string {
  return s.toLowerCase().replace(/ё/g, 'е').trim();
}

function caseMatchesTag(c: AdminCase, tag: string): boolean {
  if (!tag) return true;
  // Кейс виден в фильтре только если у него есть хотя бы одно подходящее по строгому матчу изделие.
  const products = (c.caseProducts ?? []).filter((p) => p.isActive !== false);
  return products.some((p) => productMatchesTag(p, c, tag));
}

function productMatchesTag(p: CaseProductLite, _parent: AdminCase, tag: string): boolean {
  if (!tag) return true;

  // Строгий матч: только данные самого изделия. Тег родительского кейса/его технологии
  // больше не наследуются — иначе в фильтре «Вышивка» оказывались изделия без вышивки.
  if (p.tags?.includes(tag)) return true;
  if (p.categorySlug === tag) return true;

  // Fallback для старых данных без явного тега — ищем алиас в названии и брендировании изделия.
  const aliases = TAG_ALIASES[tag] ?? [];
  if (aliases.length > 0) {
    const haystack = [p.title ?? '', ...(p.branding ?? [])].map(norm);
    if (aliases.some((a) => haystack.some((h) => h.includes(a)))) return true;
  }

  return false;
}

interface ProductWithCase {
  product: CaseProductLite;
  parent: AdminCase;
  key: string;
}

function collectMatchingProducts(cases: AdminCase[], tag: string): ProductWithCase[] {
  const out: ProductWithCase[] = [];
  for (const c of cases) {
    if (c.isActive === false) continue;
    const products = (c.caseProducts ?? [])
      .filter((p) => p.isActive !== false)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    for (const p of products) {
      if (!productMatchesTag(p, c, tag)) continue;
      out.push({ product: p, parent: c, key: `${c.slug}__${p.id ?? p.title ?? out.length}` });
    }
  }
  return out;
}

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

interface Props {
  activeTag: string;
}

export default function PortfolioCasesGrid({ activeTag }: Props) {
  const [cases, setCases] = useState<AdminCase[]>(portfolioCases as AdminCase[]);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setCases(JSON.parse(raw) as AdminCase[]);
    } catch { /* ignore */ }
  }, []);

  // Активен фильтр — показываем отдельные карточки изделий из кейсов.
  if (activeTag) {
    const visibleCases = cases.filter((c) => c.isActive !== false && caseMatchesTag(c, activeTag));
    const items = collectMatchingProducts(visibleCases, activeTag);

    if (items.length === 0) {
      return (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>По выбранному фильтру изделий пока нет.</p>
          <Link href="/portfolio/" className="v6-btn v6-btn--ghost-d">Смотреть все кейсы</Link>
        </div>
      );
    }

    return (
      <>
        <p className={styles.filterResult} aria-live="polite">
          Найдено изделий: {items.length}
        </p>
        <ul className={styles.productsGrid}>
          {items.map(({ product: p, parent, key }) => (
            <li
              key={key}
              className={styles.productCard}
              data-request-source={`Портфолио · ${p.title || parent.title}`}
              data-request-image={p.images?.[0] || parent.coverImage || undefined}
            >
              {p.images && p.images.length > 0 ? (
                <div className={styles.productImgs} data-count={Math.min(p.images.length, 3)}>
                  {p.images.slice(0, 3).map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      className={styles.productImgWrap}
                      onClick={() => setLightbox({ images: p.images, index: i })}
                      aria-label={`Открыть фото: ${p.title ?? parent.title} ${i + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`${p.title ?? parent.title} фото ${i + 1}`}
                        className={styles.productImgEl}
                        width={600}
                        height={450}
                        sizes="(max-width: 560px) 92vw, (max-width: 1100px) 46vw, 33vw"
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className={`${styles.productImgs} ${styles.productImgsEmpty}`}>
                  <Silhouette
                    kind={(SLUG_META[parent.slug]?.kind ?? 'tee') as CaseKind}
                    opacity={0.4}
                  />
                </div>
              )}
              <div className={styles.productBody}>
                <Link href={`/portfolio/${parent.slug}/`} className={styles.productCaseChip}>
                  {parent.clientType || parent.title}
                </Link>
                <h3 className={styles.productTitle}>{p.title || parent.title}</h3>
                {p.description && <p className={styles.productDesc}>{p.description}</p>}
                {(p.quantity || p.material || p.color) && (
                  <dl className={styles.productMeta}>
                    {p.quantity && (
                      <div className={styles.productMetaRow}><dt>Количество</dt><dd>{p.quantity}</dd></div>
                    )}
                    {p.material && (
                      <div className={styles.productMetaRow}><dt>Материал</dt><dd>{p.material}</dd></div>
                    )}
                    {p.color && (
                      <div className={styles.productMetaRow}><dt>Цвет</dt><dd>{p.color}</dd></div>
                    )}
                  </dl>
                )}
                {p.branding && p.branding.length > 0 && (
                  <p className={styles.productBranding}>Брендирование: {p.branding.join(', ')}</p>
                )}
                {p.characteristics && p.characteristics.length > 0 && (
                  <ul className={styles.productChars}>
                    {p.characteristics.map((ch) => <li key={ch}>{ch}</li>)}
                  </ul>
                )}
                <div className={styles.productActions}>
                  <Link href={`/portfolio/${parent.slug}/`} className={styles.caseBtn}>
                    Смотреть кейс
                  </Link>
                  <a href="/#request" className={styles.caseQuote}>Рассчитать похожий →</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Lightbox state={lightbox} onChange={setLightbox} />
      </>
    );
  }

  // Фильтр не активен — старая сетка кейсов.
  const filtered = cases.filter((c) => c.isActive !== false);

  if (filtered.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyText}>Кейсов пока нет.</p>
        <Link href="/portfolio/" className="v6-btn v6-btn--ghost-d">Смотреть все кейсы</Link>
      </div>
    );
  }

  return (
    <>
      <ul className={styles.casesGrid}>
        {filtered.map((c) => {
          const meta = SLUG_META[c.slug] ?? { kind: 'tee' as CaseKind, bg: 'bgPaper2' };
          const bgClass = styles[meta.bg as keyof typeof styles] ?? styles.bgPaper2;
          const opacity = meta.bg === 'bgPaper2' ? 0.5 : 0.4;

          const productImgs = collectProductImages(c, 4);
          const hasMedia = c.coverImage || productImgs.length > 0;

          return (
            <li
              key={c.slug}
              className={styles.caseCard}
              data-request-source={`Портфолио · ${c.title}`}
              data-request-image={c.coverImage || productImgs[0] || undefined}
            >
              <div className={`${styles.caseMedia} ${hasMedia ? '' : bgClass}`}>
                <span className={styles.caseChip}>{c.clientType}</span>
                <span className={styles.caseYear}>{c.year}</span>
                {c.coverImage ? (
                  <Image
                    src={c.coverImage}
                    alt={c.title}
                    className={styles.caseMediaImg}
                    width={800}
                    height={600}
                    sizes="(max-width: 560px) 92vw, (max-width: 1100px) 46vw, 33vw"
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : productImgs.length > 0 ? (
                  <div className={styles.caseMediaCollage} data-count={Math.min(productImgs.length, 4)}>
                    {productImgs.slice(0, 4).map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        alt=""
                        className={styles.caseMediaCollageImg}
                        width={400}
                        height={300}
                        sizes="(max-width: 560px) 46vw, (max-width: 1100px) 23vw, 16vw"
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    ))}
                  </div>
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

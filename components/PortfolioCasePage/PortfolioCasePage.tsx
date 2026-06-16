'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PortfolioCase } from '@/lib/portfolio';
import { getRelatedPortfolioCases } from '@/lib/portfolio';
import { catalogCategories } from '@/lib/catalog';
import { brandingMethods } from '@/lib/branding';
import JsonLd from '@/components/JsonLd/JsonLd';
import Lightbox, { type LightboxState } from '@/components/Lightbox/Lightbox';
import { siteConfig } from '@/lib/seo';
import { getBreadcrumbSchema, getPortfolioCaseSchema } from '@/lib/schema';
import styles from './PortfolioCasePage.module.css';

const LS_KEY = 'teeon_admin_portfolio_cases';

interface PortfolioCaseProduct {
  id: string;
  title: string;
  categorySlug?: string;
  description: string;
  quantity?: string;
  material?: string;
  color?: string;
  branding?: string[];
  characteristics: string[];
  images: string[];
  sortOrder: number;
  isActive: boolean;
}

type CaseKind = 'tee' | 'hoodie' | 'sweat' | 'longsleeve' | 'bag' | 'vest' | 'jacket' | 'raincoat';

type AdminCase = PortfolioCase & {
  coverImage?: string;
  galleryImages?: string[];
  caseProducts?: PortfolioCaseProduct[];
  isActive?: boolean;
};

const SLUG_META: Record<string, { kind: CaseKind; bg: string }> = {
  'hudi-futbolki-komanda':      { kind: 'hoodie',   bg: '' },
  'merch-konferenciya':         { kind: 'tee',      bg: 'coverYellow' },
  'promo-odezhda-vistavka':     { kind: 'vest',     bg: '' },
  'sumki-shopery-meropriyatie': { kind: 'bag',      bg: 'coverBlue' },
  'zhiletki-personal':          { kind: 'vest',     bg: '' },
  'dozhdeviki-promoakciya':     { kind: 'raincoat', bg: 'coverYellow' },
  'svitshoty-sotrudniki':       { kind: 'sweat',    bg: '' },
  'welcome-pack':               { kind: 'hoodie',   bg: 'coverInk' },
  'kurtki-vyezdnaya-komanda':   { kind: 'jacket',   bg: '' },
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

const productionSteps = [
  'Брифинг и согласование задачи',
  'Подбор тканей и метода нанесения',
  'Расчёт сметы (2–3 варианта)',
  'Изготовление pre-production sample',
  'Согласование образца',
  'Производство и ОТК на этапах',
  'Упаковка, маркировка, отгрузка',
];

const ArrowIc = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
);

interface Props {
  caseItem: PortfolioCase;
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

export default function PortfolioCasePage({ caseItem }: Props) {
  const [c, setC] = useState<AdminCase>(caseItem as AdminCase);
  const [allCases, setAllCases] = useState<AdminCase[]>([]);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const cases = JSON.parse(raw) as AdminCase[];
        setAllCases(cases);
        const override = cases.find((x) => x.slug === caseItem.slug);
        if (override) setC(override);
      }
    } catch { /* ignore */ }
  }, [caseItem.slug]);

  const related = getRelatedPortfolioCases(caseItem.slug);
  const relatedCatalogItems = caseItem.relatedCatalog
    .map((slug) => catalogCategories.find((cat) => cat.slug === slug))
    .filter(Boolean);
  const relatedBrandingItems = caseItem.relatedBranding
    .map((slug) => brandingMethods.find((m) => m.slug === slug))
    .filter(Boolean);

  const activeProducts = (c.caseProducts ?? []).filter((p) => p.isActive !== false);
  const galleryImages = (c.galleryImages ?? []).filter(Boolean);

  return (
    <main className="v6-page">
      {/* ── Breadcrumb ── */}
      <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
        <Link href="/" className={styles.breadLink}>Главная</Link>
        <span className={styles.breadSep} aria-hidden="true">›</span>
        <Link href="/portfolio/" className={styles.breadLink}>Портфолио</Link>
        <span className={styles.breadSep} aria-hidden="true">›</span>
        <span aria-current="page">{c.shortTitle}</span>
      </nav>

      {/* ── Gallery ── */}
      {galleryImages.length > 0 && (
        <ul
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, listStyle: 'none', padding: 0 }}
          aria-label="Галерея проекта"
        >
          {galleryImages.map((url, i) => (
            <li
              key={i}
              style={{ aspectRatio: '4/3', borderRadius: 'var(--rad-md)', overflow: 'hidden', background: 'var(--paper-2)' }}
            >
              <button
                type="button"
                onClick={() => setLightbox({ images: galleryImages, index: i })}
                aria-label={`Открыть: ${c.galleryLabels[i] ?? `Фото ${i + 1}`}`}
                style={{ display: 'block', width: '100%', height: '100%', padding: 0, border: 0, background: 'transparent', cursor: 'zoom-in' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={c.galleryLabels[i] ?? `Фото ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  {...(i === 0 ? { fetchPriority: 'high' as const } : {})}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* ── Case products (admin) ── */}
      {activeProducts.length > 0 && (
        <section aria-labelledby={`case-products-${c.slug}`}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.kicker}>Состав</div>
              <h2 id={`case-products-${c.slug}`}>Изделия <em>в заказе</em></h2>
            </div>
          </div>
          <ul className={styles.caseProductsGrid}>
            {activeProducts.map((p) => (
              <li key={p.id} className={styles.caseProductCard}>
                {p.images.length > 0 && (
                  <div className={styles.caseProductImgs}>
                    {p.images.slice(0, 3).map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        className={styles.caseProductImgWrap}
                        onClick={() => setLightbox({ images: p.images, index: i })}
                        aria-label={`Открыть фото: ${p.title} ${i + 1}`}
                      >
                        <Image
                          src={img}
                          alt={`${p.title} фото ${i + 1}`}
                          className={styles.caseProductImgEl}
                          width={420}
                          height={420}
                          sizes="(max-width: 760px) 44vw, (max-width: 1100px) 28vw, 260px"
                          loading="lazy"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                        />
                      </button>
                    ))}
                  </div>
                )}
                <div className={styles.caseProductBody}>
                  <h3 className={styles.caseProductTitle}>{p.title}</h3>
                  {p.description && <p className={styles.caseProductDesc}>{p.description}</p>}
                  {(p.quantity || p.material || p.color) && (
                    <dl className={styles.caseProductMeta}>
                      {p.quantity && (
                        <div className={styles.caseProductMetaRow}><dt>Количество</dt><dd>{p.quantity}</dd></div>
                      )}
                      {p.material && (
                        <div className={styles.caseProductMetaRow}><dt>Материал</dt><dd>{p.material}</dd></div>
                      )}
                      {p.color && (
                        <div className={styles.caseProductMetaRow}><dt>Цвет</dt><dd>{p.color}</dd></div>
                      )}
                    </dl>
                  )}
                  {p.branding && p.branding.length > 0 && (
                    <p className={styles.caseProductBranding}>Брендирование: {p.branding.join(', ')}</p>
                  )}
                  {p.characteristics.length > 0 && (
                    <ul className={styles.caseProductChars}>
                      {p.characteristics.map((ch) => <li key={ch}>{ch}</li>)}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── 3-col: задача / состав / технологии ── */}
      <section aria-labelledby={`case-info-${c.slug}`}>
        <div className={styles.threeCol}>
          <div className={`${styles.col} ${styles.colYellow}`}>
            <div className={styles.colTitle} id={`case-info-${c.slug}`}>Задача клиента</div>
            <p className={styles.colText}>{c.task}</p>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Что сделали</div>
            <ul className={styles.productList}>
              {c.products.map((p) => (
                <li key={p} className={styles.productItem}>{p}</li>
              ))}
            </ul>
          </div>

          <div className={`${styles.col} ${styles.colBlue}`}>
            <div className={styles.colTitle}>Технологии брендирования</div>
            <div className={styles.techLinks}>
              {relatedBrandingItems.map((m) => (
                <Link key={m!.slug} href={`/branding/${m!.slug}/`} className={styles.techLink}>
                  <span aria-hidden="true">{m!.icon}</span>
                  {m!.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Результат + процесс ── */}
      <section aria-labelledby={`result-${c.slug}`}>
        <div className={styles.resultGrid}>
          <div className={styles.resultCol}>
            <h2 className={styles.resultTitle} id={`result-${c.slug}`}>Результат</h2>
            <p className={styles.resultText}>{c.result}</p>
          </div>
          <div className={`${styles.resultCol} ${styles.resultColInk}`}>
            <h2 className={styles.resultTitle}>Что входило в проект</h2>
            <ol className={styles.stepsList}>
              {productionSteps.map((step) => (
                <li key={step} className={styles.stepItem}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Похожие категории каталога ── */}
      {relatedCatalogItems.length > 0 && (
        <section aria-labelledby={`catalog-${c.slug}`}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.kicker}>Категории каталога</div>
              <h2 id={`catalog-${c.slug}`}>Похожие <em>позиции</em> в каталоге</h2>
            </div>
            <p>То, что использовали в этом кейсе — для похожих задач.</p>
          </div>
          <ul className={styles.relCatalogGrid}>
            {relatedCatalogItems.map((cat) => (
              <li key={cat!.slug} className={styles.relCatalogCard}>
                <div className={styles.relCatalogImg} role="img" aria-label={cat!.name}>
                  {cat!.name}
                </div>
                <div className={styles.relCatalogBody}>
                  <h3 className={styles.relCatalogTitle}>{cat!.name}</h3>
                  <p className={styles.relCatalogDesc}>{cat!.shortDesc}</p>
                  <Link href={`/catalog/${cat!.slug}/`} className={styles.relLink}>
                    Подробнее →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Похожие кейсы ── */}
      {related.length > 0 && (
        <section aria-labelledby={`related-${c.slug}`}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.kicker}>Похожие проекты</div>
              <h2 id={`related-${c.slug}`}>Другие <em>кейсы</em> на ту же тему</h2>
            </div>
            <p>Подобрали по пересечению тегов. Каждый — с тиражом, сроком, технологиями.</p>
          </div>
          <ul className={styles.relCasesGrid}>
            {related.map((r) => {
              const rMeta = SLUG_META[r.slug] ?? { kind: 'hoodie' as CaseKind, bg: '' };
              const rBgMap: Record<string, string> = {
                coverYellow: 'relCaseMediaYellow',
                coverBlue:   'relCaseMediaBlue',
                coverInk:    'relCaseMediaInk',
              };
              const rBg = rBgMap[rMeta.bg] ?? '';
              const rAdmin = allCases.find((x) => x.slug === r.slug) ?? (r as AdminCase);
              const rImgs = collectProductImages(rAdmin, 4);
              const rHasMedia = rAdmin.coverImage || rImgs.length > 0;
              return (
                <li key={r.slug} className={styles.relCaseCard}>
                  <div className={`${styles.relCaseMedia} ${rHasMedia ? '' : (rBg ? styles[rBg as keyof typeof styles] : '')}`}>
                    <span className={styles.relCaseChip}>{r.clientType}</span>
                    {rAdmin.coverImage ? (
                      <Image
                        src={rAdmin.coverImage}
                        alt={r.title}
                        className={styles.relCaseMediaImg}
                        width={600}
                        height={450}
                        sizes="(max-width: 760px) 92vw, (max-width: 1100px) 44vw, 360px"
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : rImgs.length > 0 ? (
                      <div className={styles.relCaseMediaCollage} data-count={Math.min(rImgs.length, 4)}>
                        {rImgs.slice(0, 4).map((img, i) => (
                          <Image
                            key={i}
                            src={img}
                            alt=""
                            className={styles.relCaseMediaCollageImg}
                            width={300}
                            height={300}
                            sizes="(max-width: 760px) 44vw, (max-width: 1100px) 22vw, 180px"
                            loading="lazy"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                          />
                        ))}
                      </div>
                    ) : (
                      <Silhouette kind={rMeta.kind} opacity={rBg ? 0.4 : 0.45} />
                    )}
                  </div>
                  <div className={styles.relCaseBody}>
                    <h3 className={styles.relCaseTitle}>{r.shortTitle}</h3>
                    <div className={styles.relCaseMeta}>
                      <span>📦 {r.quantity}</span>
                      <span>⏱ {r.timeline}</span>
                    </div>
                    <Link href={`/portfolio/${r.slug}/`} className={styles.relCaseLink}>
                      Смотреть кейс →
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <div className={styles.bottomCta}>
        <div>
          <div className={styles.bottomCtaTitle}>Обсудить похожий проект?</div>
          <p className={styles.bottomCtaDesc}>
            Пришлите задачу, логотип и ориентировочный тираж — подберём изделия,
            технологию нанесения и рассчитаем стоимость.
          </p>
        </div>
        <div className={styles.bottomCtaActions}>
          <a href="/#request" className="v6-btn v6-btn--yellow">
            Оставить заявку
            <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
          </a>
          <Link href="/portfolio/" className={styles.bottomBackBtn}>← Все кейсы</Link>
        </div>
      </div>

      <JsonLd data={[
        getBreadcrumbSchema([
          { name: 'Главная', url: siteConfig.url },
          { name: 'Портфолио', url: `${siteConfig.url}/portfolio/` },
          { name: caseItem.shortTitle, url: `${siteConfig.url}/portfolio/${caseItem.slug}/` },
        ]),
        getPortfolioCaseSchema(caseItem),
      ]} />

      <Lightbox state={lightbox} onChange={setLightbox} />
    </main>
  );
}

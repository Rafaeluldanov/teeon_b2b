import Link from 'next/link';
import Image from 'next/image';
import type { CatalogCategory } from '@/lib/catalog';
import { getRelatedCategories } from '@/lib/catalog';
import { collectCategoryImages } from '@/lib/catalogModels';
import { getMergedCatalogModels, getMergedPortfolioCases } from '@/lib/serverData';
import JsonLd from '@/components/JsonLd/JsonLd';
import { siteConfig } from '@/lib/seo';
import { getBreadcrumbSchema, getServiceSchema } from '@/lib/schema';
import ModelVariantBlock from '@/components/ModelVariantBlock/ModelVariantBlock';
import SafeImg from '@/components/SafeImg/SafeImg';
import ZoomableImage from '@/components/ZoomableImage/ZoomableImage';
import styles from './CategoryPageContent.module.css';

interface Props {
  category: CatalogCategory;
}

interface PortfolioExample {
  href: string;
  title: string;
  subtitle?: string;
  image?: string;
  fabric?: string;
  color?: string;
}

// Из портфолио вытаскиваем конкретные продукты, помеченные текущей категорией.
// Если внутри кейсов нет caseProducts (старый формат) — берём сам кейс с тегом.
function collectPortfolioForCategory(
  slug: string,
  cases: Awaited<ReturnType<typeof getMergedPortfolioCases>>,
  max: number,
): PortfolioExample[] {
  const out: PortfolioExample[] = [];

  // Шаг 1: точные совпадения по конкретному продукту (categorySlug или tag).
  for (const c of cases) {
    if (c.isActive === false) continue;
    if (!Array.isArray(c.caseProducts) || !c.caseProducts.length) continue;
    for (const p of c.caseProducts) {
      if (p.isActive === false) continue;
      const productTagged = p.categorySlug === slug || (p.tags ?? []).includes(slug);
      if (!productTagged) continue;
      out.push({
        href: `/portfolio/${c.slug}/`,
        title: p.title || c.shortTitle || c.title,
        subtitle: c.shortTitle && p.title !== c.shortTitle ? c.shortTitle : undefined,
        image: p.images?.[0] || c.coverImage || c.galleryImages?.[0],
        fabric: p.material,
        color: p.color,
      });
      if (out.length >= max) return out;
    }
  }
  // Шаг 2: добор по уровню кейса (relatedCatalog/tags), если точных совпадений мало.
  for (const c of cases) {
    if (out.length >= max) break;
    if (c.isActive === false) continue;
    const caseTagged = (c.relatedCatalog ?? []).includes(slug) || (c.tags ?? []).includes(slug);
    if (!caseTagged) continue;
    // если каскадные продукты уже были в шаге 1 — пропускаем
    if (out.some((o) => o.href === `/portfolio/${c.slug}/`)) continue;
    out.push({
      href: `/portfolio/${c.slug}/`,
      title: c.shortTitle || c.title,
      image: c.coverImage || c.galleryImages?.[0],
    });
  }
  return out;
}

const ArrowIc = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
);

export default async function CategoryPageContent({ category: cat }: Props) {
  const related = getRelatedCategories(cat.related);
  const modelsData = await getMergedCatalogModels();
  const cases = await getMergedPortfolioCases();
  const productImgs = collectCategoryImages(cat.slug, Math.max(cat.productExamples.length, 4), modelsData);
  const portfolioExamples = collectPortfolioForCategory(cat.slug, cases, 6);

  return (
    <main className="v6-page">
      {/* ── Hero ── */}
      <section className={styles.hero} aria-label={cat.h1}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
            <Link href="/" className={styles.breadLink}>Главная</Link>
            <span className={styles.breadSep} aria-hidden="true">›</span>
            <Link href="/catalog/" className={styles.breadLink}>Каталог</Link>
            <span className={styles.breadSep} aria-hidden="true">›</span>
            <span aria-current="page">{cat.name}</span>
          </nav>

          <span className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} aria-hidden="true" />
            Промо-одежда
          </span>
          <h1 className={styles.heroTitle}>{cat.h1}</h1>
          <p className={styles.heroDesc}>{cat.pageDesc}</p>
          <div className={styles.heroActions}>
            <a href="/#request" className="v6-btn v6-btn--yellow">
              Рассчитать тираж
              <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
            </a>
            <Link href="/catalog/" className="v6-btn v6-btn--ghost">
              Все категории
            </Link>
          </div>
          <div className={styles.heroBadgesRow}>
            {['Свой цех', 'Пошив под тираж', 'Нанесение логотипа', 'Образец перед партией'].map((t) => (
              <span key={t} className={styles.heroBadgeChip}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Models & Variants ── */}
      <ModelVariantBlock categorySlug={cat.slug} />

      {/* ── Tasks + Branding + Customizable ── */}
      <div className={styles.infoSection}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Параметры</div>
            <h2>Задачи, нанесение<br /><em>и настройки</em></h2>
          </div>
          <p>Подбираем технологию под материал и задачу. Итоговый выбор согласовываем перед производством.</p>
        </div>
        <div className={styles.infoGrid}>
          {/* Tasks */}
          <div className={styles.infoCard}>
            <h2 className={styles.infoCardTitle} id={`tasks-${cat.slug}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--blue)" strokeWidth="1.8" aria-hidden="true"><path d="M2 8 L6 12 L14 4"/></svg>
              Для каких задач подходит
            </h2>
            <ul className={styles.taskList} aria-labelledby={`tasks-${cat.slug}`}>
              {cat.tasks.map((t) => (
                <li key={t} className={styles.taskItem}>
                  <span className={styles.taskCheck} aria-hidden="true">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Branding */}
          <div className={styles.infoCard}>
            <h2 className={styles.infoCardTitle}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--blue)" strokeWidth="1.8" aria-hidden="true"><circle cx="8" cy="8" r="5"/><path d="M8 4 L8 8 L11 11"/></svg>
              Варианты брендирования
            </h2>
            <p className={styles.infoCardNote}>
              Подбираем технологию под ткань, тираж и бюджет.
            </p>
            <ul className={styles.brandingList}>
              {cat.branding.map((b) => (
                <li key={b.slug} className={styles.brandingItem}>
                  <Link href={`/branding/${b.slug}/`} className={styles.brandingLink}>
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customizable */}
          <div className={styles.infoCard}>
            <h2 className={styles.infoCardTitle}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--blue)" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 8 L11 8 M8 5 L8 11"/></svg>
              Что можно настроить
            </h2>
            <ul className={styles.customList}>
              {cat.customizable.map((c) => (
                <li key={c} className={styles.customItem}>
                  <span className={styles.customDot} aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Portfolio examples / Product examples fallback ── */}
      <div className={styles.productSection}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>{portfolioExamples.length > 0 ? 'Из портфолио' : 'Примеры'}</div>
            <h2>Позиции —<br /><em>{cat.name}</em></h2>
          </div>
          <p>{portfolioExamples.length > 0
            ? 'Реальные проекты, которые мы уже делали. Нажмите на карточку — откроется кейс целиком.'
            : 'Конкретные модели и характеристики уточняем при расчёте — подбираем под ваш тираж и задачу.'}</p>
        </div>
        <ul className={styles.productGrid}>
          {portfolioExamples.length > 0 ? (
            portfolioExamples.map((p, idx) => (
              <li
                key={`${p.href}-${idx}`}
                className={styles.productCard}
                data-request-source={`Каталог · ${cat.name} · ${p.title}`}
                data-request-image={p.image ?? undefined}
              >
                {p.image ? (
                  <ZoomableImage
                    src={p.image}
                    alt={p.title}
                    wrapperClassName={styles.productImg}
                    imgClassName={styles.productImgEl}
                    ariaLabel={`Открыть фото: ${p.title}`}
                  />
                ) : (
                  <div className={styles.productImg} role="img" aria-label={p.title}>
                    <span className={styles.productImgText}>{cat.name}</span>
                  </div>
                )}
                <div className={styles.productBody}>
                  <h3 className={styles.productName}>{p.title}</h3>
                  {(p.subtitle || p.fabric || p.color) && (
                    <dl className={styles.productMeta}>
                      {p.subtitle && (
                        <div className={styles.metaRow}>
                          <dt>Кейс</dt>
                          <dd>{p.subtitle}</dd>
                        </div>
                      )}
                      {p.fabric && (
                        <div className={styles.metaRow}>
                          <dt>Ткань</dt>
                          <dd>{p.fabric}</dd>
                        </div>
                      )}
                      {p.color && (
                        <div className={styles.metaRow}>
                          <dt>Цвет</dt>
                          <dd>{p.color}</dd>
                        </div>
                      )}
                    </dl>
                  )}
                  <Link href={p.href} className={styles.productCta}>Смотреть кейс →</Link>
                </div>
              </li>
            ))
          ) : (
            cat.productExamples.map((p, idx) => {
              const img = productImgs[idx % Math.max(productImgs.length, 1)];
              return (
                <li
                  key={p.name}
                  className={styles.productCard}
                  data-request-source={`Каталог · ${cat.name} · ${p.name}`}
                  data-request-image={img ?? undefined}
                >
                  <div className={styles.productImg} role="img" aria-label={`Фото: ${p.name}`}>
                    {img ? (
                      <SafeImg
                        src={img}
                        alt={p.name}
                        className={styles.productImgEl}
                      />
                    ) : (
                      <span className={styles.productImgText}>{cat.name}</span>
                    )}
                  </div>
                  <div className={styles.productBody}>
                    <h3 className={styles.productName}>{p.name}</h3>
                    <dl className={styles.productMeta}>
                      <div className={styles.metaRow}><dt>Ткань</dt><dd>{p.fabric}</dd></div>
                      <div className={styles.metaRow}><dt>Цвет</dt><dd>{p.color}</dd></div>
                      <div className={styles.metaRow}><dt>Стоимость</dt><dd>Расчёт под тираж</dd></div>
                    </dl>
                    <a href="/#request" className={styles.productCta}>Запросить расчёт →</a>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>

      {/* ── Pricing ── */}
      <div className={styles.pricingSection}>
        <div>
          <div className={styles.pricingTitle}>Как рассчитывается стоимость</div>
          <p className={styles.pricingText}>{cat.pricingNote}</p>
        </div>
        <a href="/#request" className="v6-btn v6-btn--yellow">
          Получить расчёт
          <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
        </a>
      </div>

      {/* ── Related ── */}
      {related.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>Также заказывают</h2>
          <ul className={styles.relatedGrid}>
            {related.map((r) => {
              const rImgs = collectCategoryImages(r.slug, 4, modelsData);
              return (
              <li key={r.slug} className={styles.relatedCard}>
                <div className={styles.relatedImg} role="img" aria-label={r.name}>
                  {rImgs.length > 0 ? (
                    <div className={styles.relatedImgCollage} data-count={Math.min(rImgs.length, 4)}>
                      {rImgs.slice(0, 4).map((src, i) => (
                        <Image
                          key={i}
                          src={src}
                          alt=""
                          className={styles.relatedImgCollageImg}
                          width={300}
                          height={200}
                          sizes="(max-width: 768px) 25vw, 160px"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  ) : (
                    <span>{r.name}</span>
                  )}
                </div>
                <div className={styles.relatedBody}>
                  <h3 className={styles.relatedName}>{r.name}</h3>
                  <p className={styles.relatedDesc}>{r.shortDesc}</p>
                  <Link href={`/catalog/${r.slug}/`} className={styles.relatedLink}>
                    Подробнее →
                  </Link>
                </div>
              </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* ── Bottom nav ── */}
      <div className={styles.bottomNav}>
        <div className={styles.bottomNavInner}>
          <Link href="/catalog/" className={styles.catalogBtn}>
            ← Вернуться в каталог
          </Link>
          <a href="/#request" className="v6-btn v6-btn--ink">
            Оставить заявку на расчёт
            <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
          </a>
        </div>
      </div>

      <JsonLd data={[
        getBreadcrumbSchema([
          { name: 'Главная', url: siteConfig.url },
          { name: 'Каталог', url: `${siteConfig.url}/catalog/` },
          { name: cat.name, url: `${siteConfig.url}/catalog/${cat.slug}/` },
        ]),
        getServiceSchema({
          name: cat.h1,
          description: cat.pageDesc,
          url: `${siteConfig.url}/catalog/${cat.slug}/`,
        }),
      ]} />
    </main>
  );
}

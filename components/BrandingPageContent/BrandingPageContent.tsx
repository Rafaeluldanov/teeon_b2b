import Link from 'next/link';
import type { BrandingMethod } from '@/lib/branding';
import { getRelatedBrandingMethods } from '@/lib/branding';
import { catalogCategories } from '@/lib/catalog';
import { getMergedPortfolioCases } from '@/lib/serverData';
import JsonLd from '@/components/JsonLd/JsonLd';
import { siteConfig } from '@/lib/seo';
import { getBreadcrumbSchema, getServiceSchema } from '@/lib/schema';
import BrandingSampleTabs from '@/components/BrandingSampleTabs/BrandingSampleTabs';
import SafeImg from '@/components/SafeImg/SafeImg';
import ZoomableImage from '@/components/ZoomableImage/ZoomableImage';
import styles from './BrandingPageContent.module.css';

interface Props {
  method: BrandingMethod;
}

interface BrandingPortfolioExample {
  href: string;
  title: string;
  task?: string;
  image?: string;
}

// Подбираем кейсы из портфолио, в которых использовалась эта технология нанесения.
// Источник истины — relatedBranding на уровне кейса (поле админки). Дополнительно
// пытаемся вытащить конкретный продукт из caseProducts, у которого branding[]
// содержит совпадение по названию метода (нормализуем — в админ-дампе часто опечатки).
function collectBrandingPortfolio(
  methodSlug: string,
  methodTitle: string,
  cases: Awaited<ReturnType<typeof getMergedPortfolioCases>>,
  max: number,
): BrandingPortfolioExample[] {
  const out: BrandingPortfolioExample[] = [];
  const titleNorm = methodTitle.toLowerCase().replace(/[-\s]/g, '');

  function productMatchesMethod(branding: string[] | undefined): boolean {
    if (!branding?.length) return false;
    return branding.some((b) => {
      const bn = b.toLowerCase().replace(/[-\s]/g, '');
      return bn.includes(titleNorm) || titleNorm.includes(bn);
    });
  }

  // Шаг 1: точное совпадение по branding-полю отдельного продукта.
  for (const c of cases) {
    if (c.isActive === false) continue;
    if (!Array.isArray(c.caseProducts) || !c.caseProducts.length) continue;
    for (const p of c.caseProducts) {
      if (p.isActive === false) continue;
      if (!productMatchesMethod(p.branding)) continue;
      out.push({
        href: `/portfolio/${c.slug}/`,
        title: p.title || c.shortTitle || c.title,
        task: c.shortTitle && p.title !== c.shortTitle ? c.shortTitle : c.task,
        image: p.images?.[0] || c.coverImage || c.galleryImages?.[0],
      });
      if (out.length >= max) return out;
    }
  }

  // Шаг 2: добор кейсами с relatedBranding[]-slug, если точных совпадений мало.
  for (const c of cases) {
    if (out.length >= max) break;
    if (c.isActive === false) continue;
    if (!(c.relatedBranding ?? []).includes(methodSlug)) continue;
    if (out.some((o) => o.href === `/portfolio/${c.slug}/`)) continue;
    out.push({
      href: `/portfolio/${c.slug}/`,
      title: c.shortTitle || c.title,
      task: c.task,
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

export default async function BrandingPageContent({ method: m }: Props) {
  const relatedMethods = getRelatedBrandingMethods(m.relatedMethods);
  const cases = await getMergedPortfolioCases();
  const portfolioExamples = collectBrandingPortfolio(m.slug, m.title, cases, 6);
  const relatedCatalog = m.relatedCatalog
    .map((slug) => catalogCategories.find((c) => c.slug === slug))
    .filter(Boolean);

  return (
    <main className="v6-page">
      {/* ── Hero ── */}
      <section className={styles.hero} aria-label={m.h1}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
            <Link href="/" className={styles.breadLink}>Главная</Link>
            <span className={styles.breadSep} aria-hidden="true">›</span>
            <Link href="/branding/" className={styles.breadLink}>Нанесение</Link>
            <span className={styles.breadSep} aria-hidden="true">›</span>
            <span aria-current="page">{m.title}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroTags}>
                {m.tags.map((tag) => (
                  <span key={tag} className={styles.heroTag}>{tag}</span>
                ))}
              </div>
              <h1 className={styles.heroTitle}>{m.h1}</h1>
              <p className={styles.heroDesc}>{m.shortDescription}</p>
              <p className={styles.heroDesc2}>{m.description}</p>
              <div className={styles.heroActions}>
                <a href="/#request" className="v6-btn v6-btn--yellow">
                  Рассчитать нанесение
                  <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
                </a>
                <Link href="/branding/" className={styles.backLink}>
                  ← Все способы нанесения
                </Link>
              </div>
            </div>
            <div className={styles.heroVisual} role="img" aria-label={`Иконка метода: ${m.title}`}>
              <span className={styles.heroVisualIcon} aria-hidden="true">{m.icon}</span>
              <span className={styles.heroVisualName}>{m.title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sample tabs ── */}
      <BrandingSampleTabs methodSlug={m.slug} />

      {/* ── For tasks / Products / Benefits ── */}
      <section aria-labelledby={`info-${m.slug}`}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Параметры</div>
            <h2 id={`info-${m.slug}`}>Задачи, изделия<br /><em>и преимущества</em></h2>
          </div>
          <p>Подбираем технологию под изделие и задачу. Результат согласовываем до запуска тиража.</p>
        </div>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3 className={styles.blockTitle}>Для каких задач подходит</h3>
            <ul className={styles.checkList}>
              {m.suitableFor.map((item) => (
                <li key={item} className={styles.checkItem}>
                  <span className={styles.checkIcon} aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.infoCard}>
            <h3 className={styles.blockTitle}>На какие изделия применяем</h3>
            <ul className={styles.dotList}>
              {m.products.map((p) => (
                <li key={p} className={styles.dotItem}>
                  <span className={styles.dot} aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.infoCard}>
            <h3 className={styles.blockTitle}>Преимущества технологии</h3>
            <ul className={styles.dotList}>
              {m.benefits.map((b) => (
                <li key={b} className={styles.dotItem}>
                  <span className={styles.dotGreen} aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Limitations + Mockup ── */}
      <section aria-labelledby={`details-${m.slug}`}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Детали</div>
            <h2 id={`details-${m.slug}`}>Ограничения<br /><em>и требования к макету</em></h2>
          </div>
          <p>Что важно учесть при выборе технологии и подготовке файлов.</p>
        </div>
        <div className={styles.detailGrid}>
          <div className={styles.detailBlock}>
            <h3 className={styles.blockTitle}>Что важно учесть</h3>
            <ul className={styles.warningList}>
              {m.limitations.map((l) => (
                <li key={l} className={styles.warningItem}>
                  <span className={styles.warningIcon} aria-hidden="true">!</span>
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.detailBlock}>
            <h3 className={styles.blockTitle}>Как подготовить макет</h3>
            <p className={styles.mockupText}>{m.mockupRequirements}</p>
            <a href="/#request" className={styles.mockupCta}>
              Прикрепить логотип к заявке →
            </a>
          </div>
        </div>
      </section>

      {/* ── Process + Price ── */}
      <section aria-labelledby={`process-${m.slug}`}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Работа и стоимость</div>
            <h2 id={`process-${m.slug}`}>Как работаем<br /><em>и что влияет на цену</em></h2>
          </div>
          <p>Прозрачный процесс и понятное ценообразование.</p>
        </div>
        <div className={styles.processGrid}>
          <div className={styles.processBlock}>
            <h3 className={styles.sectionH2}>Как проходит работа</h3>
            <ol className={styles.processList}>
              {m.process.map((step, i) => (
                <li key={i} className={styles.processItem}>
                  <span className={styles.processNum} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.processText}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.processBlock}>
            <h3 className={styles.sectionH2}>От чего зависит стоимость</h3>
            <ul className={styles.priceList}>
              {m.priceFactors.map((f) => (
                <li key={f} className={styles.priceItem}>
                  <span className={styles.priceDot} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="/#request" className="v6-btn v6-btn--yellow" style={{ marginTop: 20, display: 'inline-flex' }}>
              Получить расчёт
              <span className="v6-ic" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Examples / Portfolio cases ── */}
      <section aria-labelledby={`examples-${m.slug}`}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>{portfolioExamples.length > 0 ? 'Из портфолио' : 'Примеры'}</div>
            <h2 id={`examples-${m.slug}`}>Примеры —<br /><em>{m.title}</em></h2>
          </div>
          <p>{portfolioExamples.length > 0
            ? 'Реальные кейсы, где мы применяли эту технологию. Нажмите на карточку — откроется кейс.'
            : 'Реальные задачи, которые мы решаем с помощью этой технологии.'}</p>
        </div>
        <ul className={styles.examplesGrid}>
          {portfolioExamples.length > 0 ? (
            portfolioExamples.map((ex, idx) => (
              <li key={`${ex.href}-${idx}`} className={styles.exampleCard}>
                {ex.image ? (
                  <ZoomableImage
                    src={ex.image}
                    alt={ex.title}
                    wrapperClassName={styles.exampleImg}
                    imgClassName={styles.exampleImgEl}
                    ariaLabel={`Открыть фото: ${ex.title}`}
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 92vw, (max-width: 1024px) 50vw, 380px"
                  />
                ) : (
                  <div className={styles.exampleImg} role="img" aria-label={ex.title} />
                )}
                <div className={styles.exampleBody}>
                  <h3 className={styles.exampleTitle}>{ex.title}</h3>
                  {ex.task && <p className={styles.exampleTask}>{ex.task}</p>}
                  <Link href={ex.href} className={styles.exampleCta}>Смотреть кейс →</Link>
                </div>
              </li>
            ))
          ) : (
            m.examples.map((ex) => (
              <li
                key={ex.name}
                className={styles.exampleCard}
                data-request-source={`Брендирование · ${m.title} · ${ex.name}`}
              >
                <div className={styles.exampleImg} role="img" aria-label={`Пример: ${ex.name}`} />
                <div className={styles.exampleBody}>
                  <h3 className={styles.exampleTitle}>{ex.name}</h3>
                  <p className={styles.exampleTask}>{ex.task}</p>
                  <a href="/#request" className={styles.exampleCta}>Похожий заказ →</a>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>

      {/* ── Related methods ── */}
      {relatedMethods.length > 0 && (
        <section aria-labelledby={`related-${m.slug}`}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.kicker}>Смежные технологии</div>
              <h2 id={`related-${m.slug}`}>Сочетается<br /><em>с другими методами</em></h2>
            </div>
            <p>Технологии, которые часто используют вместе с {m.title.toLowerCase()}.</p>
          </div>
          <ul className={styles.relatedGrid}>
            {relatedMethods.map((rm) => (
              <li key={rm.slug} className={styles.relatedCard}>
                <span className={styles.relatedIcon} aria-hidden="true">{rm.icon}</span>
                <div className={styles.relatedBody}>
                  <h3 className={styles.relatedTitle}>{rm.title}</h3>
                  <p className={styles.relatedDesc}>{rm.shortDescription}</p>
                  <Link href={`/branding/${rm.slug}/`} className={styles.relatedLink}>
                    Подробнее →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Related catalog ── */}
      {relatedCatalog.length > 0 && (
        <section aria-labelledby={`catalog-${m.slug}`}>
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.kicker}>Изделия</div>
              <h2 id={`catalog-${m.slug}`}>Подходящие<br /><em>изделия</em></h2>
            </div>
            <p>Изделия из каталога, на которые часто наносят {m.title.toLowerCase()}.</p>
          </div>
          <ul className={styles.catalogGrid}>
            {relatedCatalog.map((cat) => (
              <li key={cat!.slug} className={styles.catalogCard}>
                <div className={styles.catalogImg} role="img" aria-label={cat!.name}>
                  {cat!.name}
                </div>
                <div className={styles.catalogBody}>
                  <h3 className={styles.catalogTitle}>{cat!.name}</h3>
                  <p className={styles.catalogDesc}>{cat!.shortDesc}</p>
                  <Link href={`/catalog/${cat!.slug}/`} className={styles.relatedLink}>
                    Подробнее →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Bottom nav ── */}
      <div className={styles.bottomNav}>
        <div className={styles.bottomNavInner}>
          <Link href="/branding/" className={styles.backBtn}>
            ← Все способы нанесения
          </Link>
          <a href="/#request" className="v6-btn v6-btn--ink">
            Оставить заявку на нанесение
            <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
          </a>
        </div>
      </div>

      <JsonLd data={[
        getBreadcrumbSchema([
          { name: 'Главная', url: siteConfig.url },
          { name: 'Брендирование', url: `${siteConfig.url}/branding/` },
          { name: m.title, url: `${siteConfig.url}/branding/${m.slug}/` },
        ]),
        getServiceSchema({
          name: m.h1,
          description: m.shortDescription,
          url: `${siteConfig.url}/branding/${m.slug}/`,
        }),
      ]} />
    </main>
  );
}

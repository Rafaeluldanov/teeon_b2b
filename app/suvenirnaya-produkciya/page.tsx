import type { Metadata } from 'next';
import Link from 'next/link';
import { giftsData } from '@/lib/gifts';
import JsonLd from '@/components/JsonLd/JsonLd';
import { siteConfig } from '@/lib/seo';
import { getBreadcrumbSchema, getServiceSchema } from '@/lib/schema';
import styles from './suvenirnaya-produkciya.module.css';

const pageUrl = `${siteConfig.url}/suvenirnaya-produkciya/`;

export const metadata: Metadata = {
  title: giftsData.seoTitle,
  description: giftsData.seoDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    url: pageUrl,
    title: giftsData.seoTitle,
    description: giftsData.seoDescription,
  },
};

const ArrowIc = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
);

const heroBentoItems = [
  { icon: '👕', label: 'Одежда' },
  { icon: '🎁', label: 'Сувениры' },
  { icon: '📦', label: 'Упаковка' },
  { icon: '✨', label: 'Нанесение' },
];

export default function SuvenirnayaProdukciyaPage() {
  return (
    <main className="v6-page">
      {/* ── Hero ── */}
      <section className={styles.hero} aria-label={giftsData.h1}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
            <Link href="/" className={styles.breadLink}>Главная</Link>
            <span className={styles.breadSep} aria-hidden="true">›</span>
            <span aria-current="page">Сувенирная продукция</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroTags}>
                {['Корпоративные подарки', 'Промо-сувениры', 'Welcome-наборы', 'B2B'].map((t) => (
                  <span key={t} className={styles.heroTag}>{t}</span>
                ))}
              </div>
              <h1 className={styles.heroTitle}>
                {giftsData.h1}
              </h1>
              <p className={styles.heroSubtitle}>{giftsData.heroSubtitle}</p>
              <div className={styles.heroActions}>
                <a
                  href={giftsData.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v6-btn v6-btn--yellow"
                  aria-label="Открыть сайт UP Gifts в новой вкладке"
                >
                  {giftsData.externalLabel}
                  <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
                </a>
                <a href="/#request" className="v6-btn v6-btn--ghost">
                  Собрать мерч-набор
                </a>
              </div>
            </div>

            <div className={styles.heroBento} role="img" aria-label="Категории: одежда, сувениры, упаковка, нанесение">
              {heroBentoItems.map((item) => (
                <div key={item.label} className={styles.bentoCard}>
                  <span className={styles.bentoIcon} aria-hidden="true">{item.icon}</span>
                  <span className={styles.bentoLabel}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Категории ── */}
      <section aria-labelledby="gift-categories" id="gift-categories">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Ассортимент</div>
            <h2>Что входит в<br /><em>сувенирную продукцию</em></h2>
          </div>
          <p>Полный каталог сувениров и корпоративных подарков с логотипом — в UP Gifts.</p>
        </div>
        <ul className={styles.categoriesGrid}>
          {giftsData.categories.map((cat) => (
            <li key={cat.title} className={styles.categoryCard}>
              <div className={styles.categoryTitle}>{cat.title}</div>
              <p className={styles.categoryDesc}>{cat.description}</p>
              <ul className={styles.categoryExamples} aria-label="Примеры">
                {cat.examples.map((ex) => (
                  <li key={ex} className={styles.categoryExample}>{ex}</li>
                ))}
              </ul>
              <div className={styles.categoryTags}>
                {cat.tags.map((tag) => (
                  <span key={tag} className={styles.categoryTag}>{tag}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
          <a
            href={giftsData.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="v6-btn v6-btn--ghost-d"
            aria-label="Открыть сайт UP Gifts в новой вкладке"
          >
            Открыть полный каталог UP Gifts
            <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
          </a>
        </div>
      </section>

      {/* ── Сценарии ── */}
      <section aria-labelledby="scenarios-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Задачи</div>
            <h2 id="scenarios-title">Когда нужны<br /><em>сувениры</em></h2>
          </div>
          <p>Корпоративные подарки и промо-сувениры под любую B2B-задачу.</p>
        </div>
        <ul className={styles.scenariosGrid}>
          {giftsData.scenarios.map((s) => (
            <li key={s.title} className={styles.scenarioCard}>
              <div className={styles.scenarioTitle}>{s.title}</div>
              <p className={styles.scenarioDesc}>{s.description}</p>
              <ul className={styles.scenarioItems} aria-label="Что включает">
                {s.items.map((item) => (
                  <li key={item} className={styles.scenarioItem}>
                    <span className={styles.scenarioIcon} aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Связки с одеждой ── */}
      <section aria-labelledby="bundles-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Связки</div>
            <h2 id="bundles-title">Сувениры плюс<br /><em>мерч TEEON</em></h2>
          </div>
          <p>Сочетайте промо-одежду TEEON и сувениры UP Gifts в одном B2B-проекте.</p>
        </div>
        <ul className={styles.bundlesGrid}>
          {giftsData.bundles.map((bundle) => (
            <li key={bundle.title} className={styles.bundleCard}>
              <div className={styles.bundleTitle}>{bundle.title}</div>
              <p className={styles.bundleDesc}>{bundle.description}</p>
              <ul className={styles.bundleProducts} aria-label="Из UP Gifts">
                {bundle.products.map((p) => (
                  <li key={p} className={styles.bundleProduct}>
                    <span className={styles.bundleDot} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className={styles.bundleLinks}>
                {bundle.teeonLinks.map((l) => (
                  <Link key={l.href} href={l.href} className={styles.bundleLink}>
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className={styles.bundleCta}>
                <a href="/#request" className="v6-btn v6-btn--yellow">
                  Рассчитать комплект
                  <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Преимущества UP Gifts ── */}
      <section aria-labelledby="benefits-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Преимущества</div>
            <h2 id="benefits-title">Почему через<br /><em>UP Gifts</em></h2>
          </div>
          <p>Отдельное направление с полным сервисом для B2B-заказов.</p>
        </div>
        <div className={styles.benefitsGrid}>
          {giftsData.benefits.map((b, i) => (
            <div key={b} className={styles.benefitCard}>
              <span className={styles.benefitNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.benefitText}>{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Как работаем ── */}
      <section aria-labelledby="process-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Процесс</div>
            <h2 id="process-title">Как мы<br /><em>работаем</em></h2>
          </div>
          <p>Прозрачный процесс от заявки до доставки готового набора.</p>
        </div>
        <ol className={styles.processGrid} aria-label="Этапы работы">
          {giftsData.processSteps.map((step, i) => (
            <li key={i} className={styles.processCard}>
              <span className={styles.processNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.processText}>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ── TEEON vs UP Gifts ── */}
      <section aria-labelledby="connect-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Как связаны</div>
            <h2 id="connect-title">Одежда в TEEON,<br /><em>сувениры в UP Gifts</em></h2>
          </div>
          <p>Два направления для полного B2B-проекта: промо-одежда и корпоративные подарки.</p>
        </div>
        <div className={styles.connectGrid}>
          <div className={styles.connectCard}>
            <div className={styles.connectTitle}>На TEEON вы можете заказать</div>
            <p className={styles.connectDesc}>
              Промо-одежду, корпоративный мерч и брендированные изделия с нанесением логотипа:
              футболки, худи, свитшоты, лонгсливы, сумки, жилетки, куртки, дождевики.
              Брендирование вышивкой, шелкографией, DTF, DTG, сублимацией, тиснением, гравировкой.
            </p>
            <ul className={styles.connectLinks}>
              <li><Link href="/catalog/" className={styles.connectLink}>→ Каталог промо-одежды</Link></li>
              <li><Link href="/branding/" className={styles.connectLink}>→ Способы брендирования</Link></li>
              <li><Link href="/portfolio/" className={styles.connectLink}>→ Примеры работ</Link></li>
              <li><Link href="/contacts/" className={styles.connectLink}>→ Оставить заявку</Link></li>
            </ul>
          </div>
          <div className={`${styles.connectCard} ${styles.connectCardDark}`}>
            <div className={styles.connectTitle}>В UP Gifts вы найдёте</div>
            <p className={styles.connectDesc}>
              Корпоративные подарки, бизнес-сувениры, подарочные наборы, кружки и термокружки,
              ежедневники, ручки, электронику, аксессуары и упаковку — с нанесением логотипа.
            </p>
            <a
              href={giftsData.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="v6-btn v6-btn--yellow"
              aria-label="Открыть сайт UP Gifts в новой вкладке"
            >
              {giftsData.externalLabel}
              <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ── SEO-текст ── */}
      <div className={styles.seoSection} aria-label="О сувенирной продукции">
        <div className={styles.seoHead}>
          <div className={styles.kicker}>О направлении</div>
          <h3>Сувенирная продукция и корпоративные подарки с логотипом</h3>
        </div>
        <div className={styles.seoBody}>
          <p>
            Сувенирная продукция дополняет корпоративный мерч и позволяет собрать комплексный B2B-подарок
            под фирменный стиль компании. TEEON занимается промо-одеждой — футболками, худи, свитшотами,
            дождевиками и другими текстильными изделиями с брендированием. Сувениры и корпоративные
            подарки представлены в отдельном направлении UP Gifts.
          </p>
          <p>
            Для мероприятий, выставок, welcome-наборов, подарков сотрудникам и партнёрам можно
            сочетать промо-одежду TEEON с бизнес-сувенирами из каталога UP Gifts: кружками,
            термокружками, ежедневниками, ручками, наборами, упаковкой и другими позициями.
            Такой подход помогает собрать единый набор под фирменный стиль компании.
          </p>
        </div>
      </div>

      {/* ── Финальный CTA ── */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaText}>
          <div className={styles.ctaTitle}>Хотите собрать мерч-набор под событие?</div>
          <p className={styles.ctaDesc}>
            Рассчитайте промо-одежду на TEEON, а сувениры подберите в UP Gifts
          </p>
        </div>
        <div className={styles.ctaActions}>
          <a href="/#request" className="v6-btn v6-btn--yellow">
            Оставить заявку
            <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
          </a>
          <a
            href={giftsData.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="v6-btn v6-btn--ghost"
            aria-label="Открыть сайт UP Gifts в новой вкладке"
          >
            Перейти в UP Gifts ↗
          </a>
        </div>
      </div>

      <JsonLd data={[
        getBreadcrumbSchema([
          { name: 'Главная', url: siteConfig.url },
          { name: 'Сувенирная продукция', url: pageUrl },
        ]),
        getServiceSchema({
          name: giftsData.h1,
          description: giftsData.seoDescription,
          url: pageUrl,
        }),
      ]} />
    </main>
  );
}

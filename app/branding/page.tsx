import type { Metadata } from 'next';
import Link from 'next/link';
import { brandingMethods } from '@/lib/branding';
import { catalogCategories } from '@/lib/catalog';
import JsonLd from '@/components/JsonLd/JsonLd';
import { siteConfig } from '@/lib/seo';
import { getBreadcrumbSchema, getServiceSchema, getFAQSchema } from '@/lib/schema';
import styles from './branding.module.css';

export const metadata: Metadata = {
  title: 'Нанесение и брендирование | Вышивка, шелкография, DTF',
  description:
    'Наносим логотипы на промо-одежду и мерч: вышивка, шевроны, шелкография, DTF, DTG, сублимация, тиснение, гравировка и бирки. Расчёт под тираж.',
  alternates: { canonical: `${siteConfig.url}/branding/` },
  openGraph: {
    url: `${siteConfig.url}/branding/`,
    title: 'Нанесение и брендирование | Вышивка, шелкография, DTF',
    description:
      'Наносим логотипы на промо-одежду и мерч: вышивка, шевроны, шелкография, DTF, DTG, сублимация, тиснение, гравировка и бирки. Расчёт под тираж.',
  },
};

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

const howToChoose = [
  { need: 'Премиальный вид', desc: 'Вышивка, шевроны и бирки — объёмная фактура, долговечность', slugs: ['vyshivka', 'shevrony', 'birki'] },
  { need: 'Большой промо-тираж', desc: 'Шелкография — стойкая печать, экономична на средних тиражах', slugs: ['shelkografiya'] },
  { need: 'Полноцветный принт', desc: 'DTF или DTG — без ограничений по цветности и сложным макетам', slugs: ['dtf-pechat', 'dtg-pechat'] },
  { need: 'Спортивная форма', desc: 'Сублимация — полноцветный принт по всей поверхности синтетики', slugs: ['sublimaciya'] },
  { need: 'Корпоративный набор', desc: 'Тиснение, гравировка и бирки — для подарков и премиум-мерча', slugs: ['tisnenie', 'gravirovka', 'birki'] },
];

const processSteps = [
  { icon: '📋', step: 'Задача и логотип',       desc: 'Описываете изделие, тираж и логотип' },
  { icon: '🔍', step: 'Проверка макета',         desc: 'Проверяем совместимость с изделием' },
  { icon: '🎨', step: 'Подбор технологии',       desc: 'Предлагаем оптимальный способ нанесения' },
  { icon: '🧪', step: 'Тест или визуализация',   desc: 'Согласовываем результат перед тиражом' },
  { icon: '🏭', step: 'Нанесение на тираж',      desc: 'Производство на собственном оборудовании' },
  { icon: '✅', step: 'Контроль и упаковка',     desc: 'Проверяем каждую единицу перед отгрузкой' },
];

const priceFactors = [
  'Тираж — чем крупнее, тем ниже цена за единицу',
  'Размер нанесения на изделии',
  'Количество цветов в логотипе',
  'Материал и тип изделия',
  'Место нанесения: грудь, спина, рукав',
  'Срочность и дедлайн',
  'Необходимость образца или теста',
  'Упаковка и комплектация',
];

const faqItems = [
  { q: 'Какой способ брендирования выбрать?', a: 'Это зависит от изделия, ткани, тиража и логотипа. Расскажите нам задачу — предложим подходящую технологию.' },
  { q: 'Можно ли нанести логотип на готовые изделия?', a: 'Да, выполняем брендирование на готовых изделиях. Уточните изделие и способ — проверим совместимость.' },
  { q: 'Делаете ли образец перед тиражом?', a: 'Да, для большинства технологий делаем тестовое нанесение до запуска серийной партии.' },
  { q: 'Что нужно для расчёта?', a: 'Укажите изделие, тираж, логотип (желательно в векторе) и место нанесения. Рассчитаем и предложим технологию.' },
  { q: 'Какие файлы нужны для макета?', a: 'Векторный файл: AI, EPS, SVG или CDR. Для некоторых технологий — PNG от 300 dpi с прозрачным фоном.' },
  { q: 'Можно совместить несколько технологий?', a: 'Да. Например, вышивка + бирки, шелкография + шевроны. Итоговый набор согласовываем по задаче и бюджету.' },
];

const ArrowIc = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
);

const brandingJsonLd = [
  getBreadcrumbSchema([
    { name: 'Главная', url: siteConfig.url },
    { name: 'Брендирование', url: `${siteConfig.url}/branding/` },
  ]),
  getServiceSchema({
    name: 'Брендирование одежды и мерча',
    description: 'Наносим логотипы на промо-одежду и мерч: вышивка, шевроны, шелкография, DTF, DTG, сублимация, тиснение, гравировка и бирки.',
    url: `${siteConfig.url}/branding/`,
  }),
  getFAQSchema(faqItems),
];

export default function BrandingPage() {
  const catalogItems = catalogCategories.slice(0, 8);

  return (
    <main className="v6-page">
      <JsonLd data={brandingJsonLd} />

      {/* ── Hero ── */}
      <section className={styles.hero} aria-label="Нанесение и брендирование">
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
            <Link href="/" className={styles.breadLink}>Главная</Link>
            <span className={styles.breadSep} aria-hidden="true">›</span>
            <span aria-current="page">Нанесение</span>
          </nav>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            9 технологий · в собственном цехе · от 30 шт.
          </span>
          <h1 className={styles.heroTitle}>
            Нанесение и<br /><em>брендирование</em><br />одежды
          </h1>
          <p className={styles.heroDesc}>
            Подбираем технологию под изделие, тираж и задачу. Вышивка, шелкография, DTF, DTG, сублимация, тиснение, гравировка, шевроны и бирки — всё в одном цехе.
          </p>
          <div className={styles.heroActions}>
            <a href="/#request" className="v6-btn v6-btn--yellow">
              Рассчитать нанесение
              <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
            </a>
            <a href="#branding-methods" className="v6-btn v6-btn--ghost">Смотреть технологии</a>
          </div>
          <div className={styles.heroBadges}>
            {['Вышивка', 'Шелкография', 'DTF / DTG', 'Шевроны и бирки'].map((b) => (
              <span key={b} className={styles.heroBadge}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Methods grid ── */}
      <section aria-labelledby="methods-title" id="branding-methods">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>(04) — Нанесение</div>
            <h2 id="methods-title">9 способов<br /><em>персонализации</em></h2>
          </div>
          <p>Выберите технологию или расскажите задачу — подберём оптимальный вариант нанесения.</p>
        </div>
        <ul className={styles.grid}>
          {brandingMethods.map((m) => {
            const meta = SLUG_META[m.slug] ?? { bg: '', num: '—' };
            const bgClass = meta.bg ? styles[meta.bg as keyof typeof styles] : '';
            return (
              <li key={m.slug}>
                <Link href={`/branding/${m.slug}/`} className={`${styles.card} ${bgClass}`}>
                  <div className={styles.cardHead}>
                    <span className={styles.cardIcon} aria-hidden="true">{m.icon}</span>
                    <span className={styles.cardNum}>{meta.num}</span>
                  </div>
                  <div className={styles.cardTitle}>{m.title}</div>
                  <div className={styles.cardDesc}>{m.shortDescription}</div>
                  <div className={styles.cardTags}>
                    {m.tags.slice(0, 2).map((t) => (
                      <span key={t} className={styles.cardTag}>{t}</span>
                    ))}
                  </div>
                  <span className={styles.cardLink}>
                    Подробнее
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 10 L10 2 M4 2 L10 2 L10 8" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.gridFooter}>
          <a href="/#request" className="v6-btn v6-btn--ink">
            Рассчитать нанесение
            <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
          </a>
        </div>
      </section>

      {/* ── How to choose ── */}
      <section aria-labelledby="choose-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Выбор</div>
            <h2 id="choose-title">Как выбрать<br /><em>технологию</em></h2>
          </div>
          <p>Ориентируйтесь на задачу — подберём технологию под изделие, ткань и тираж.</p>
        </div>
        <ul className={styles.chooseGrid}>
          {howToChoose.map((item) => (
            <li key={item.need} className={styles.chooseCard}>
              <p className={styles.chooseNeed}>{item.need}</p>
              <p className={styles.chooseDesc}>{item.desc}</p>
              <div className={styles.chooseSlugs}>
                {item.slugs.map((slug) => {
                  const method = brandingMethods.find((m) => m.slug === slug);
                  return method ? (
                    <Link key={slug} href={`/branding/${slug}/`} className={styles.chooseLink}>
                      {method.title}
                    </Link>
                  ) : null;
                })}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── On which items ── */}
      <section aria-labelledby="items-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Изделия</div>
            <h2 id="items-title">На какие изделия<br /><em>наносим</em></h2>
          </div>
          <p>Брендируем всю промо-одежду и аксессуары из нашего производства.</p>
        </div>
        <ul className={styles.itemsGrid}>
          {catalogItems.map((cat) => (
            <li key={cat.slug}>
              <Link href={`/catalog/${cat.slug}/`} className={styles.itemCard}>
                <span className={styles.itemName}>{cat.name}</span>
                <span className={styles.itemArrow} aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
          {['Аксессуары', 'Упаковка'].map((name) => (
            <li key={name}>
              <span className={styles.itemCard}>
                <span className={styles.itemName}>{name}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Process ── */}
      <section aria-labelledby="process-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Процесс</div>
            <h2 id="process-title">Как проходит<br /><em>брендирование</em></h2>
          </div>
          <p>Прозрачный процесс — от задачи до готового тиража с образцом.</p>
        </div>
        <ol className={styles.processGrid}>
          {processSteps.map((s, i) => (
            <li key={s.step} className={styles.processCard}>
              <span className={styles.processNum}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.processIcon} aria-hidden="true">{s.icon}</span>
              <strong className={styles.processTitle}>{s.step}</strong>
              <p className={styles.processDesc}>{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Price factors ── */}
      <section aria-labelledby="price-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Стоимость</div>
            <h2 id="price-title">Что влияет<br /><em>на цену</em></h2>
          </div>
          <p>Точная цена рассчитывается индивидуально — зависит от нескольких параметров.</p>
        </div>
        <ul className={styles.priceListGrid} style={{ marginTop: 24 }}>
          {priceFactors.map((f) => (
            <li key={f} className={styles.priceItem}>
              <span className={styles.priceDot} aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* ── FAQ (native details/summary) ── */}
      <section aria-labelledby="faq-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>(08) — FAQ</div>
            <h2 id="faq-title">Часто<br /><em>спрашивают</em></h2>
          </div>
          <p>Если не нашли ответ — напишите нам, ответим в течение рабочего дня.</p>
        </div>
        <div className={styles.faqWrap}>
          {faqItems.map((item, i) => (
            <details key={i} className={styles.faqItem}>
              <summary className={styles.faqSummary}>
                <span className={styles.faqNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.faqQ}>{item.q}</span>
                <span className={styles.faqToggle} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2 L8 14 M2 8 L14 8" stroke="currentColor" strokeWidth="1.8"/>
                  </svg>
                </span>
              </summary>
              <div className={styles.faqAnswer}>
                <div className={styles.faqBody}>{item.a}</div>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── SEO text ── */}
      <div className={styles.seoSection} aria-label="О брендировании">
        <div className={styles.seoHead}>
          <div className={styles.kicker}>Подробнее</div>
          <h3>Брендирование корпоративной одежды и мерча</h3>
        </div>
        <div className={styles.seoBody}>
          <p>Выполняем брендирование промо-одежды, корпоративного мерча и аксессуаров для бизнеса. Подбираем технологию под изделие, ткань, тираж, макет и задачу проекта. Используем вышивку, шевроны, шелкографию, DTF-печать, DTG-печать, сублимацию, тиснение, гравировку и брендированные бирки.</p>
          <p>Такой подход позволяет собрать мерч под ключ: от выбора изделия и подготовки макета до нанесения, контроля качества, упаковки и отгрузки партии.</p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className={styles.ctaSection} aria-label="Оставить заявку">
        <div className={styles.ctaText}>
          <div className={styles.ctaTitle}>Не знаете, какой способ нанесения выбрать?</div>
          <p className={styles.ctaDesc}>Пришлите логотип, изделие и тираж — предложим технологию и рассчитаем стоимость.</p>
        </div>
        <a href="/#request" className="v6-btn v6-btn--yellow">
          Получить консультацию
          <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
        </a>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategoryBySlug } from '@/lib/catalog';
import { getMergedPortfolioCases } from '@/lib/serverData';
import { siteConfig } from '@/lib/seo';
import { getBreadcrumbSchema, getServiceSchema, getFAQSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd/JsonLd';
import SafeImg from '@/components/SafeImg/SafeImg';
import styles from './kepki.module.css';

const cat = getCategoryBySlug('kepki')!;
const pageUrl = `${siteConfig.url}/catalog/${cat.slug}/`;

export const metadata: Metadata = {
  title: cat.seo.title,
  description: cat.seo.description,
  alternates: { canonical: pageUrl },
  openGraph: {
    url: pageUrl,
    title: cat.seo.title,
    description: cat.seo.description,
  },
};

const modelTypes = [
  {
    title: 'Бейсболки с логотипом',
    text: 'Классическая модель с жёсткой лицевой панелью и регулируемой застёжкой — удобная база для корпоративного мерча и промо.',
  },
  {
    title: 'Кепки с вышивкой',
    text: 'Структурированная машинная вышивка логотипа на передней панели — аккуратный и долговечный способ нанесения на головные уборы.',
  },
  {
    title: 'Пятипанельные кепки',
    text: 'Модель с плоским козырьком и пятью панелями — более молодёжная подача для промо-команд и событийного мерча.',
  },
  {
    title: 'Кепки для промо-команд и мероприятий',
    text: 'Лёгкие модели под массовый тираж: подбираем цвет под фирменный стиль и наносим логотип выбранным способом.',
  },
];

const brandingMethods = [
  {
    title: 'Вышивка на кепках',
    slug: 'vyshivka',
    text: 'Основной способ для корпоративных кепок: выглядит аккуратно, долго служит и хорошо держит форму логотипа на жёсткой панели.',
  },
  {
    title: 'Шевроны и нашивки на кепках',
    slug: 'shevrony',
    text: 'Объёмный фирменный элемент — тканые или ПВХ-шевроны и нашивки для более выразительной подачи логотипа.',
  },
  {
    title: 'DTF и термоперенос на кепках',
    slug: 'dtf-pechat',
    text: 'Полноцветное нанесение для сложных логотипов и небольших партий — выбор зависит от материала и формы изделия.',
  },
];

const costFactors = [
  'Тираж',
  'Модель кепки',
  'Материал',
  'Количество мест нанесения',
  'Технология брендирования',
  'Сложность логотипа',
  'Подготовка макета',
  'Сроки',
  'Упаковка и логистика',
];

const faqItems = [
  {
    q: 'Какие кепки можно сделать с логотипом?',
    a: 'Можно подобрать бейсболки, пятипанельные кепки и другие модели под корпоративный мерч, промо-акцию, форму персонала или мероприятие. Модель и способ брендирования подбираются под задачу и тираж.',
  },
  {
    q: 'Какой способ нанесения лучше для кепок?',
    a: 'Для большинства корпоративных кепок хорошо подходит вышивка: она выглядит аккуратно и долго служит. Для отдельных задач можно использовать шевроны, нашивки или термоперенос — выбор зависит от материала, логотипа и тиража.',
  },
  {
    q: 'Можно ли сделать кепки в фирменных цветах?',
    a: 'Да, можно подобрать готовые модели в нужной палитре или обсудить индивидуальное решение. Цвет, материалы и фурнитура согласуются до запуска тиража.',
  },
  {
    q: 'Можно ли добавить бирки или нашивки?',
    a: 'Да, для кепок можно использовать брендированные бирки, нашивки, шевроны и другие элементы, чтобы изделие выглядело как полноценный корпоративный продукт.',
  },
  {
    q: 'Как рассчитывается стоимость кепок с логотипом?',
    a: 'Стоимость зависит от модели, тиража, способа брендирования, количества мест нанесения, сложности макета, сроков и упаковки. Менеджер рассчитывает заказ под конкретную задачу.',
  },
];

const ArrowIc = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

interface CapExample {
  title: string;
  image: string;
  caseSlug: string;
  caseTitle: string;
  material?: string;
  color?: string;
}

function collectCapExamples(cases: Awaited<ReturnType<typeof getMergedPortfolioCases>>): CapExample[] {
  const out: CapExample[] = [];
  for (const c of cases) {
    if (c.isActive === false || !Array.isArray(c.caseProducts)) continue;
    for (const p of c.caseProducts) {
      if (p.isActive === false) continue;
      const isCap = (p.tags ?? []).includes('kepki') || p.categorySlug === 'kepki';
      const img = p.images?.[0];
      if (!isCap || !img) continue;
      out.push({
        title: p.title,
        image: img,
        caseSlug: c.slug,
        caseTitle: c.shortTitle || c.title,
        material: p.material,
        color: p.color,
      });
      if (out.length >= 6) return out;
    }
  }
  return out;
}

export default async function KepkiPage() {
  const cases = await getMergedPortfolioCases();
  const examples = collectCapExamples(cases);

  return (
    <main className={`v6-page ${styles.page}`}>
      {/* ── Hero ── */}
      <section className={styles.hero} aria-label={cat.h1}>
        <div className="container">
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
              <Link href="/" className={styles.breadLink}>Главная</Link>
              <span className={styles.breadSep} aria-hidden="true">›</span>
              <Link href="/catalog/" className={styles.breadLink}>Каталог</Link>
              <span className={styles.breadSep} aria-hidden="true">›</span>
              <span aria-current="page">Кепки и бейсболки</span>
            </nav>
            <span className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} aria-hidden="true" />
              Корпоративный мерч · головные уборы
            </span>
            <h1 className={styles.heroTitle}>Кепки с логотипом <em>на заказ</em></h1>
            <p className={styles.heroDesc}>{cat.pageDesc}</p>
            <div className={styles.heroActions}>
              <a href="/#request" className="v6-btn v6-btn--yellow">
                Рассчитать тираж
                <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
              </a>
              <Link href="/catalog/" className="v6-btn v6-btn--ghost">
                Весь каталог
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Модели ── */}
      <section className={`${styles.section} container`} aria-labelledby="kepki-models">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Модели</div>
            <h2 id="kepki-models">Модели кепок и бейсболок <em>для корпоративного мерча</em></h2>
          </div>
          <p>Подбираем модель под задачу, фирменный стиль и тираж. Итоговый вариант согласуем до запуска.</p>
        </div>
        <div className={styles.modelGrid}>
          {modelTypes.map((m) => (
            <article key={m.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{m.title}</h3>
              <p className={styles.cardText}>{m.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Для каких задач ── */}
      <section className={`${styles.section} container`} aria-labelledby="kepki-tasks">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Задачи</div>
            <h2 id="kepki-tasks">Для каких задач подходят <em>кепки с логотипом</em></h2>
          </div>
          <p>Кепки и бейсболки работают и как промо, и как часть корпоративной формы или подарочного набора.</p>
        </div>
        <div className={styles.twoCol}>
          <ul className={styles.list}>
            {cat.tasks.map((t) => (
              <li key={t} className={styles.listItem}>
                <span className={styles.listCheck} aria-hidden="true">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Что можно настроить</h3>
            <ul className={styles.list}>
              {cat.customizable.map((c) => (
                <li key={c} className={styles.listItem}>
                  <span className={styles.listDot} aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Способы брендирования ── */}
      <section className={`${styles.section} container`} aria-labelledby="kepki-branding">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Нанесение</div>
            <h2 id="kepki-branding">Способы брендирования <em>кепок</em></h2>
          </div>
          <p>Технологию подбираем под материал, форму изделия, логотип и тираж.</p>
        </div>
        <div className={styles.brandingGrid}>
          {brandingMethods.map((b) => (
            <article key={b.slug} className={styles.card}>
              <h3 className={styles.cardTitle}>{b.title}</h3>
              <p className={styles.cardText}>{b.text}</p>
              <Link href={`/branding/${b.slug}/`} className={styles.brandingLink}>
                Подробнее о методе
                <ArrowIc />
              </Link>
            </article>
          ))}
        </div>
        <p style={{ marginTop: 16, fontSize: 14, color: 'var(--color-text-muted)' }}>
          Дополнительно к кепкам можно сделать{' '}
          <Link href="/branding/birki/" className={styles.brandingLink} style={{ marginTop: 0 }}>брендированные бирки</Link>
          {' '}и нашивки.
        </p>
      </section>

      {/* ── Что влияет на стоимость ── */}
      <section className={`${styles.section} container`} aria-labelledby="kepki-cost">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Стоимость</div>
            <h2 id="kepki-cost">Что влияет на стоимость <em>кепок с логотипом</em></h2>
          </div>
          <p>Точную цену рассчитывает менеджер под конкретную задачу — без скрытых наценок.</p>
        </div>
        <div className={styles.card}>
          <ul className={styles.list}>
            {costFactors.map((f) => (
              <li key={f} className={styles.listItem}>
                <span className={styles.listDot} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Сроки и тиражи ── */}
      <section className={`${styles.section} container`} aria-labelledby="kepki-terms">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Условия</div>
            <h2 id="kepki-terms">Сроки и тиражи</h2>
          </div>
        </div>
        <div className={styles.termsBox}>
          Работаем с небольшими и крупными тиражами — рассчитываем заказ под задачу. Срок зависит от модели,
          способа брендирования, загрузки производства и сложности макета. Перед запуском партии согласуем
          макет нанесения, а при необходимости готовим образец.
        </div>
      </section>

      {/* ── Примеры (реальные фото) ── */}
      {examples.length > 0 && (
        <section className={`${styles.section} container`} aria-labelledby="kepki-examples">
          <div className={styles.sectionHead}>
            <div>
              <div className={styles.kicker}>Из портфолио</div>
              <h2 id="kepki-examples">Примеры кепок и бейсболок <em>в корпоративном мерче</em></h2>
            </div>
            <p>Реальные проекты, в которые входили бейсболки с нанесением логотипа. Нажмите — откроется кейс.</p>
          </div>
          <div className={styles.exampleGrid}>
            {examples.map((ex, idx) => (
              <article key={`${ex.caseSlug}-${idx}`} className={styles.exampleCard}>
                <div className={styles.exampleImg}>
                  <SafeImg src={ex.image} alt={`${ex.title} — ${ex.caseTitle}`} className={styles.exampleImgEl} loading="lazy" decoding="async" />
                </div>
                <div className={styles.exampleBody}>
                  <h3 className={styles.exampleTitle}>{ex.title}</h3>
                  <p className={styles.exampleMeta}>
                    Кейс: {ex.caseTitle}
                    {ex.color ? ` · ${ex.color}` : ''}
                    {ex.material ? ` · ${ex.material}` : ''}
                  </p>
                  <Link href={`/portfolio/${ex.caseSlug}/`} className={styles.exampleLink}>Смотреть кейс →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className={`${styles.section} container`} aria-labelledby="kepki-faq">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>FAQ</div>
            <h2 id="kepki-faq">FAQ по кепкам с логотипом</h2>
          </div>
        </div>
        <div className={styles.faqList}>
          {faqItems.map((f) => (
            <details key={f.q} className={styles.faqItem}>
              <summary className={styles.faqQ}>
                {f.q}
                <span className={styles.faqArrow} aria-hidden="true">+</span>
              </summary>
              <p className={styles.faqA}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container" aria-labelledby="kepki-cta">
        <div className={styles.ctaBlock}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaTitle} id="kepki-cta">Рассчитать тираж <em>кепок</em></h2>
            <p className={styles.ctaDesc}>
              Опишите задачу, модель и желаемый тираж — подберём кепки и способ брендирования и пришлём расчёт.
            </p>
          </div>
          <a href="/#request" className="v6-btn v6-btn--yellow">
            Оставить заявку
            <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
          </a>
        </div>
      </section>

      <JsonLd data={[
        getBreadcrumbSchema([
          { name: 'Главная', url: siteConfig.url },
          { name: 'Каталог', url: `${siteConfig.url}/catalog/` },
          { name: 'Кепки и бейсболки', url: pageUrl },
        ]),
        getServiceSchema({
          name: cat.h1,
          description: cat.pageDesc,
          url: pageUrl,
        }),
        getFAQSchema(faqItems.map((f) => ({ q: f.q, a: f.a }))),
      ]} />
    </main>
  );
}

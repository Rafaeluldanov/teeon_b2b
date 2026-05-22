import type { Metadata } from 'next';
import Link from 'next/link';
import { catalogCategories } from '@/lib/catalog';
import JsonLd from '@/components/JsonLd/JsonLd';
import { siteConfig } from '@/lib/seo';
import { getBreadcrumbSchema, getServiceSchema } from '@/lib/schema';
import styles from './catalog.module.css';

export const metadata: Metadata = {
  title: 'Каталог промо-одежды и корпоративного мерча на заказ',
  description:
    'Футболки, худи, свитшоты, лонгсливы, сумки, жилетки, куртки и дождевики для бизнеса. Пошив, брендирование, расчёт тиража и производство под ключ.',
  alternates: { canonical: `${siteConfig.url}/catalog/` },
  openGraph: {
    url: `${siteConfig.url}/catalog/`,
    title: 'Каталог промо-одежды и корпоративного мерча на заказ',
    description:
      'Футболки, худи, свитшоты, лонгсливы, сумки, жилетки, куртки и дождевики для бизнеса. Пошив, брендирование, расчёт тиража и производство под ключ.',
  },
};

const howToChoose = [
  {
    need: 'Массовая промоакция',
    answer: 'Футболки и шопперы — высокий тираж при экономичной стоимости',
    slugs: ['futbolki', 'sumki'],
  },
  {
    need: 'Корпоративный подарок',
    answer: 'Худи и свитшоты — долговечный и качественный мерч',
    slugs: ['hudi', 'svitshoty'],
  },
  {
    need: 'Форма для персонала',
    answer: 'Жилетки, куртки, лонгсливы — практично и фирменно',
    slugs: ['zhiletki', 'kurtki', 'longslivy'],
  },
  {
    need: 'Outdoor и мероприятия',
    answer: 'Дождевики, куртки и сумки — функционально на улице',
    slugs: ['dozhdeviki', 'kurtki', 'sumki'],
  },
];

const productionSteps = [
  { icon: '🔍', step: 'Подбор изделия',   desc: 'Выбираем позицию под задачу, тираж и бюджет' },
  { icon: '🧵', step: 'Подбор ткани',     desc: 'Плотность, состав, цвет — из каталога или под Pantone' },
  { icon: '🎨', step: 'Макет нанесения',  desc: 'Готовим макет и согласовываем с вами' },
  { icon: '✂️', step: 'Пошив',            desc: 'Производство партии на собственном оборудовании' },
  { icon: '🖨', step: 'Брендирование',    desc: 'Наносим логотип выбранным способом' },
  { icon: '✅', step: 'ОТК',              desc: 'Проверяем каждую единицу перед упаковкой' },
  { icon: '📦', step: 'Упаковка',         desc: 'Комплектуем и упаковываем заказ' },
  { icon: '🚚', step: 'Доставка',         desc: 'Отправляем транспортной компанией в любой регион' },
];

type CatKind = 'tee' | 'hoodie' | 'sweat' | 'longsleeve' | 'bag' | 'vest' | 'jacket' | 'raincoat';
type BgKey  = 'bgPaper2' | 'bgYellow' | 'bgBlue' | 'bgMint' | 'bgCoral' | 'bgInk';

const CAT_META: Record<string, { kind: CatKind; bg: BgKey; num: string }> = {
  futbolki:   { kind: 'tee',        bg: 'bgPaper2', num: '01' },
  hudi:       { kind: 'hoodie',     bg: 'bgYellow', num: '02' },
  svitshoty:  { kind: 'sweat',      bg: 'bgPaper2', num: '03' },
  longslivy:  { kind: 'longsleeve', bg: 'bgBlue',   num: '04' },
  sumki:      { kind: 'bag',        bg: 'bgMint',   num: '05' },
  zhiletki:   { kind: 'vest',       bg: 'bgPaper2', num: '06' },
  kurtki:     { kind: 'jacket',     bg: 'bgInk',    num: '07' },
  dozhdeviki: { kind: 'raincoat',   bg: 'bgCoral',  num: '08' },
};

function Silhouette({ kind, opacity }: { kind: CatKind; opacity: number }) {
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

const ArrowIc = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
);

const catalogJsonLd = [
  getBreadcrumbSchema([
    { name: 'Главная', url: siteConfig.url },
    { name: 'Каталог', url: `${siteConfig.url}/catalog/` },
  ]),
  getServiceSchema({
    name: 'Пошив промо-одежды и корпоративного мерча',
    description:
      'Производим промо-одежду и корпоративный мерч для бизнеса: футболки, худи, свитшоты, лонгсливы, сумки, жилетки, куртки и дождевики.',
    url: `${siteConfig.url}/catalog/`,
  }),
];

export default function CatalogPage() {
  return (
    <main className="v6-page">
      <JsonLd data={catalogJsonLd} />

      {/* ── Hero ── */}
      <section className={styles.hero} aria-label="Каталог промо-одежды">
        <div className={styles.heroBg} aria-hidden="true" />
        <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
          <Link href="/" className={styles.breadLink}>Главная</Link>
          <span className={styles.breadSep} aria-hidden="true">›</span>
          <span aria-current="page">Каталог</span>
        </nav>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            промо-одежда · корпоративный мерч · от 30 шт.
          </span>
          <h1 className={styles.heroTitle}>
            Каталог <em>промо-одежды</em><br />и мерча
          </h1>
          <p className={styles.heroDesc}>
            8 базовых категорий — пошив под тираж, 9 методов нанесения, образец до партии. Всё в одном цехе.
          </p>
          <div className={styles.heroActions}>
            <a href="/#request" className="v6-btn v6-btn--yellow">
              Рассчитать заказ
              <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
            </a>
            <a href="#catalog-categories" className="v6-btn v6-btn--ghost">
              Смотреть категории
              <span className="v6-ic" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7 L11 7 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.7"/></svg>
              </span>
            </a>
          </div>
          <div className={styles.heroBadges}>
            {[
              { title: 'Свой цех', desc: 'от лекала до отгрузки' },
              { title: '9 методов нанесения', desc: 'от вышивки до DTF' },
              { title: 'Образец до тиража', desc: 'pre-production sample' },
              { title: 'Тираж от 30 шт.', desc: 'расчёт под задачу' },
            ].map((b) => (
              <div key={b.title} className={styles.heroBadge}>
                <span className={styles.heroBadgeIc} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="10" cy="10" r="6"/><path d="M7 10 L9 12 L13 8"/></svg>
                </span>
                <div>
                  <div className={styles.heroBadgeTitle}>{b.title}</div>
                  <div className={styles.heroBadgeDesc}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category grid ── */}
      <section aria-labelledby="cat-grid-title" id="catalog-categories">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>(03) — Каталог</div>
            <h2 id="cat-grid-title">8 категорий<br /><em>промо-одежды</em></h2>
          </div>
          <p>Выберите категорию — рассчитаем тираж, подберём ткань и способ нанесения под ваш проект и бюджет.</p>
        </div>
        <ul className={styles.grid}>
          {catalogCategories.map((cat) => {
            const meta = CAT_META[cat.slug] ?? { kind: 'tee' as CatKind, bg: 'bgPaper2' as BgKey, num: '—' };
            const opacity = meta.bg === 'bgPaper2' ? 0.55 : 0.45;
            return (
              <li key={cat.slug} className={styles.card}>
                <div className={`${styles.cardMedia} ${styles[meta.bg]}`}>
                  <span className={styles.cardNum}>{meta.num} /</span>
                  <span className={styles.cardPill}>✦ Брендирование</span>
                  <Silhouette kind={meta.kind} opacity={opacity} />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardName}>{cat.name}</div>
                  <div className={styles.cardDesc}>{cat.shortDesc}</div>
                  <ul className={styles.cardTaskList}>
                    {cat.tasks.slice(0, 3).map((t) => (
                      <li key={t} className={styles.cardTask}>
                        <span className={styles.cardTaskDot} aria-hidden="true" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.cardActions}>
                    <Link href={`/catalog/${cat.slug}/`} className={styles.cardBtn}>Подробнее</Link>
                    <a href="/#request" className={styles.cardQuote}>В расчёт →</a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={styles.gridFooter}>
          <a href="/#request" className="v6-btn v6-btn--ink">
            Рассчитать заказ
            <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
          </a>
        </div>
      </section>

      {/* ── How to choose ── */}
      <section aria-labelledby="how-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Выбор</div>
            <h2 id="how-title">Как <em>выбрать</em><br />категорию</h2>
          </div>
          <p>Ориентируйтесь на задачу — мы подберём изделие, ткань и технологию нанесения под проект.</p>
        </div>
        <ul className={styles.chooseGrid}>
          {howToChoose.map((item) => (
            <li key={item.need} className={styles.chooseCard}>
              <p className={styles.chooseNeed}>{item.need}</p>
              <p className={styles.chooseAnswer}>{item.answer}</p>
              <div className={styles.chooseSlugs}>
                {item.slugs.map((slug) => {
                  const cat = catalogCategories.find((c) => c.slug === slug);
                  return cat ? (
                    <Link key={slug} href={`/catalog/${slug}/`} className={styles.chooseLink}>
                      {cat.name}
                    </Link>
                  ) : null;
                })}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Production steps ── */}
      <section aria-labelledby="prod-title">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Процесс</div>
            <h2 id="prod-title">Что входит<br /><em>в производство</em></h2>
          </div>
          <p>Полный цикл внутри одной производственной цепочки — от подбора изделия до отгрузки.</p>
        </div>
        <ol className={styles.stepsGrid}>
          {productionSteps.map((s, i) => (
            <li key={s.step} className={styles.stepCard}>
              <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.stepIcon} aria-hidden="true">{s.icon}</span>
              <strong className={styles.stepName}>{s.step}</strong>
              <p className={styles.stepDesc}>{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── SEO text ── */}
      <div className={styles.seoSection} aria-label="О каталоге">
        <div className={styles.seoHead}>
          <div className={styles.kicker}>Подробнее</div>
          <h3>Промо-одежда для бизнеса под заказ</h3>
        </div>
        <div className={styles.seoBody}>
          <p>
            В каталоге представлены основные категории промо-одежды и корпоративного мерча для компаний. Мы производим футболки, худи, свитшоты, лонгсливы, сумки, жилетки, куртки и дождевики под задачи бизнеса: для сотрудников, мероприятий, выставок, конференций, промоакций и welcome-наборов.
          </p>
          <p>
            Каждую позицию можно адаптировать под фирменный стиль: подобрать цвет, ткань, крой, размерную сетку, способ брендирования и упаковку. Стоимость рассчитывается индивидуально и зависит от тиража, сложности пошива, технологии нанесения и сроков производства.
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className={styles.ctaSection} aria-label="Оставить заявку">
        <div className={styles.ctaText}>
          <div className={styles.ctaTitle}>Не нашли нужную позицию?</div>
          <p className={styles.ctaDesc}>
            Подберём изделие или разработаем модель под ваш проект. Расскажите о задаче — предложим варианты и рассчитаем стоимость.
          </p>
        </div>
        <a href="/#request" className="v6-btn v6-btn--yellow">
          Оставить заявку
          <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
        </a>
      </div>
    </main>
  );
}

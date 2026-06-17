import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd/JsonLd';
import { siteConfig } from '@/lib/seo';
import { getBreadcrumbSchema } from '@/lib/schema';
import PortfolioCasesGrid from './PortfolioCasesGrid';
import PortfolioFilterBar from './PortfolioFilterBar';
import styles from './portfolio.module.css';

export const metadata: Metadata = {
  title: 'Портфолио промо-одежды и мерча | Кейсы производства',
  description:
    'Примеры работ по пошиву промо-одежды, корпоративного мерча и брендированных изделий: футболки, худи, свитшоты, сумки, жилетки, куртки и нанесение логотипов.',
  alternates: { canonical: `${siteConfig.url}/portfolio/` },
  openGraph: {
    url: `${siteConfig.url}/portfolio/`,
    title: 'Портфолио промо-одежды и мерча | Кейсы производства',
    description:
      'Примеры работ по пошиву промо-одежды, корпоративного мерча и брендированных изделий: футболки, худи, свитшоты, сумки, жилетки, куртки и нанесение логотипов.',
  },
};

const ArrowIc = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
);

const TASKS = [
  {
    title: 'Мерч для сотрудников', desc: 'Худи, свитшоты и футболки с логотипом для команды.', icon: '👥', bg: '',
    links: [{ label: 'Худи', href: '/catalog/hudi/' }, { label: 'Свитшоты', href: '/catalog/svitshoty/' }, { label: 'Вышивка', href: '/branding/vyshivka/' }],
  },
  {
    title: 'Welcome-наборы', desc: 'Комплекты для онбординга новых сотрудников.', icon: '👋', bg: 'taskYellow',
    links: [{ label: 'Худи', href: '/catalog/hudi/' }, { label: 'Сумки', href: '/catalog/sumki/' }, { label: 'DTF', href: '/branding/dtf-pechat/' }],
  },
  {
    title: 'Промо-одежда для мероприятий', desc: 'Тиражи 200–1000 шт. для фестивалей и конференций.', icon: '🎤', bg: '',
    links: [{ label: 'Футболки', href: '/catalog/futbolki/' }, { label: 'Шелкография', href: '/branding/shelkografiya/' }],
  },
  {
    title: 'Форма для персонала', desc: 'Униформа кафе, ритейла, сервисных команд.', icon: '🧥', bg: 'taskBlue',
    links: [{ label: 'Жилетки', href: '/catalog/zhiletki/' }, { label: 'Куртки', href: '/catalog/kurtki/' }, { label: 'Вышивка', href: '/branding/vyshivka/' }],
  },
  {
    title: 'Мерч для выставок', desc: 'Форма стенда и раздаточные позиции.', icon: '🏷️', bg: '',
    links: [{ label: 'Куртки', href: '/catalog/kurtki/' }, { label: 'Сумки', href: '/catalog/sumki/' }],
  },
  {
    title: 'Корпоративные подарки', desc: 'Премиум-комплекты для VIP-клиентов и партнёров.', icon: '🎁', bg: 'taskInk',
    links: [{ label: 'Худи', href: '/catalog/hudi/' }, { label: 'Тиснение', href: '/branding/tisnenie/' }],
  },
];

const SHOW_ITEMS = [
  'Задача клиента — какую B2B-проблему решали',
  'Состав заказа — конкретные изделия и комплектность',
  'Тираж — сколько единиц пошито и отгружено',
  'Технологии брендирования — какие методы применили',
  'Сроки — от первого касания до отгрузки',
  'Фото изделий — обложка и галерея процесса',
  'Упаковка — индивидуальная или массовая',
  'Результат — что получил клиент',
];

interface Props {
  searchParams: { tag?: string };
}

export default function PortfolioPage({ searchParams }: Props) {
  const activeTag = searchParams.tag ?? '';

  return (
    <main className="v6-page">
      {/* ── Hero ── */}
      <section className={styles.hero} aria-label="Портфолио">
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
            <Link href="/" className={styles.breadLink}>Главная</Link>
            <span className={styles.breadSep} aria-hidden="true">›</span>
            <span aria-current="page">Портфолио</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroTags}>
                {['Пошив под тираж', 'Брендирование', 'Контроль качества', 'B2B-документы'].map((t) => (
                  <span key={t} className={styles.heroTag}>{t}</span>
                ))}
              </div>
              <h1 className={styles.heroTitle}>
                Портфолио <em>B2B-проектов</em><br />и кейсов
              </h1>
              <p className={styles.heroDesc}>
                Показываем реальные задачи: промо-одежда, корпоративный мерч, брендирование, комплектация и сроки производства.
              </p>
              <div className={styles.heroActions}>
                <a href="/#request" className="v6-btn v6-btn--yellow">
                  Рассчитать похожий проект
                  <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
                </a>
                <a href="#portfolio-cases" className="v6-btn v6-btn--ghost">
                  Смотреть кейсы
                </a>
              </div>
            </div>

            <div className={styles.heroStats} aria-hidden="true">
              <div className={`${styles.heroStat} ${styles.statYellow}`}>
                <span className={styles.statKey}>Кейсов</span>
                <span className={styles.statVal}>9</span>
                <span className={styles.statDesc}>за 2025–2026</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.statKey}>Единиц</span>
                <span className={styles.statVal}>3 100+</span>
                <span className={styles.statDesc}>пошито и отгружено</span>
              </div>
              <div className={`${styles.heroStat} ${styles.statInk}`}>
                <span className={styles.statKey}>Брак</span>
                <span className={styles.statVal}>0%</span>
                <span className={styles.statDesc}>замены не потребовалось</span>
              </div>
              <div className={`${styles.heroStat} ${styles.statBlue}`}>
                <span className={styles.statKey}>Средний срок</span>
                <span className={styles.statVal}>12 дн</span>
                <span className={styles.statDesc}>от макета до отгрузки</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Фильтры ── */}
      <PortfolioFilterBar activeTag={activeTag} />

      {/* ── Сетка кейсов ── */}
      <section id="portfolio-cases" aria-labelledby="cases-heading">
        <h2 id="cases-heading" className="v6-section-head" style={{ display: 'none' }}>
          {activeTag ? `Кейсы: ${activeTag}` : 'Все кейсы'}
        </h2>
        <PortfolioCasesGrid activeTag={activeTag} />
      </section>

      {/* ── Задачи ── */}
      <section aria-labelledby="tasks-heading">
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.kicker}>Сценарии</div>
            <h2 id="tasks-heading">Какие <em>задачи</em> решаем</h2>
          </div>
          <p>Шесть типов B2B-проектов, которые мы регулярно делаем. На каждом — конкретные подходы и проверенные технологии.</p>
        </div>
        <div className={styles.tasksGrid}>
          {TASKS.map((t) => (
            <div
              key={t.title}
              className={`${styles.taskCard} ${t.bg ? styles[t.bg as keyof typeof styles] : ''}`}
            >
              <span className={styles.taskIcon} aria-hidden="true">{t.icon}</span>
              <div className={styles.taskTitle}>{t.title}</div>
              <p className={styles.taskDesc}>{t.desc}</p>
              <div className={styles.taskLinks}>
                {t.links.map((l) => (
                  <Link key={l.href} href={l.href} className={styles.taskLink}>{l.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Что показываем ── */}
      <section aria-labelledby="show-heading">
        <div className={styles.showBlock}>
          <div>
            <div className={styles.kicker} style={{ marginBottom: 12 }}>Прозрачность</div>
            <h2 id="show-heading" className={styles.showTitle}>Что показываем <em>в кейсах</em></h2>
            <p className={styles.showDesc}>
              В каждом кейсе — полная вводная по проекту без маркетинговых обтекаемых формулировок.
              Сравните со своей задачей и оцените, подойдут ли наши подходы.
            </p>
          </div>
          <ol className={styles.showList}>
            {SHOW_ITEMS.map((item) => (
              <li key={item} className={styles.showItem}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── SEO ── */}
      <div className={styles.seoSection} aria-label="О портфолио">
        <div className={styles.seoHead}>
          <div className={styles.kicker}>Подробнее</div>
          <h3>Портфолио кейсов корпоративного мерча</h3>
        </div>
        <div className={styles.seoBody}>
          <p>
            В разделе «Портфолио» — реальные B2B-проекты TEEON за 2025–2026 годы. Welcome-наборы для IT-команд, форма для event-агентств, корпоративный мерч для конференций, шопперы для ритейл-сетей, спортивная форма, жилетки и куртки для персонала. Каждый кейс — с задачей, составом заказа, тиражом, выбранными технологиями нанесения и сроками.
          </p>
          <p>
            Мы показываем кейсы открыто: цифры тиража и сроков соответствуют реальности производственного цикла. Если у вас похожая задача — нажмите «Рассчитать похожий проект» в любой карточке.
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className={styles.ctaSection}>
        <div>
          <div className={styles.ctaTitle}>Хотите похожий <em>проект</em>?</div>
          <p className={styles.ctaDesc}>
            Опишите задачу и тираж — рассчитаем смету на основе подходящего кейса. Первый ответ в течение часа.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <a href="/#request" className="v6-btn v6-btn--yellow">
            Оставить заявку
            <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
          </a>
          <Link href="/catalog/" className="v6-btn v6-btn--ghost">
            Смотреть каталог
          </Link>
        </div>
      </div>

      <JsonLd data={getBreadcrumbSchema([
        { name: 'Главная', url: siteConfig.url },
        { name: 'Портфолио', url: `${siteConfig.url}/portfolio/` },
      ])} />
    </main>
  );
}

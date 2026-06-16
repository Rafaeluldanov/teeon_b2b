import type { Metadata } from 'next';
import Link from 'next/link';
import { faqGroups, faqPageSeo } from '@/lib/faq';
import { contacts } from '@/lib/contacts';
import JsonLd from '@/components/JsonLd/JsonLd';
import { siteConfig } from '@/lib/seo';
import { getBreadcrumbSchema, getFAQSchema } from '@/lib/schema';
import styles from './faq.module.css';

const pageUrl = `${siteConfig.url}/faq/`;

export const metadata: Metadata = {
  title: faqPageSeo.title,
  description: faqPageSeo.description,
  alternates: { canonical: pageUrl },
  openGraph: {
    url: pageUrl,
    title: faqPageSeo.title,
    description: faqPageSeo.description,
  },
};

const ArrowIc = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
);

const PlusIc = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2 L8 14 M2 8 L14 8" stroke="currentColor" strokeWidth="1.8"/>
  </svg>
);

const totalQ = faqGroups.reduce((s, g) => s + g.items.length, 0);

const allFaqItems = faqGroups.flatMap((g) =>
  g.items.map((item) => ({ q: item.question, a: item.answer }))
);

const channels = [
  {
    icon: '📞',
    title: contacts.phone,
    desc: `${contacts.schedule}`,
    href: `tel:+${contacts.phoneRaw}`,
  },
  {
    icon: '✉️',
    title: contacts.email,
    desc: 'Ответ в течение часа',
    href: `mailto:${contacts.email}`,
  },
];

export default function FAQPage() {
  return (
    <main className="v6-page">
      {/* ── Hero ── */}
      <section className={styles.hero} aria-label="FAQ">
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
            <Link href="/" className={styles.breadLink}>Главная</Link>
            <span className={styles.breadSep} aria-hidden="true">›</span>
            <span aria-current="page">FAQ</span>
          </nav>

          <h1 className={styles.heroTitle}>
            Частые <span className={styles.heroTitleHl}>вопросы</span>
          </h1>
          <p className={styles.heroDesc}>
            Ответы на{' '}
            <strong style={{ color: 'var(--blue)', fontWeight: 700 }}>{totalQ} вопросов</strong>{' '}
            о пошиве, брендировании и работе с B2B-заказами. Если не нашли ответ — напишите менеджеру.
          </p>
          <div className={styles.heroActions}>
            <a href="/#request" className="v6-btn v6-btn--ink">
              Задать вопрос менеджеру
              <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
            </a>
            <a href="/#request" className="v6-btn v6-btn--ghost-d">
              Рассчитать заказ
            </a>
          </div>
        </div>

        <div className={styles.heroStats} aria-hidden="true">
          <div className={`${styles.heroStat} ${styles.statYellow}`}>
            <span className={styles.statKey}>Вопросов</span>
            <span className={styles.statVal}>{totalQ}</span>
            <span className={styles.statDesc}>в 3 категориях</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.statKey}>Тираж</span>
            <span className={styles.statVal}>от 30<span className={styles.statUnit}>шт</span></span>
            <span className={styles.statDesc}>минимум на позицию</span>
          </div>
          <div className={`${styles.heroStat} ${styles.statInk}`}>
            <span className={styles.statKey}>Ответ</span>
            <span className={styles.statVal} style={{ color: 'var(--yellow)' }}>
              1<span className={styles.statUnit} style={{ color: 'var(--paper)' }}>час</span>
            </span>
            <span className={styles.statDesc}>в рабочее время</span>
          </div>
          <div className={`${styles.heroStat} ${styles.statBlue}`}>
            <span className={styles.statKey}>Производство</span>
            <span className={styles.statVal}>10–14<span className={styles.statUnit}>дн.</span></span>
            <span className={styles.statDesc}>стандартный срок</span>
          </div>
        </div>
      </section>

      {/* ── Jump nav ── */}
      <nav className={styles.jumpNav} aria-label="Разделы FAQ">
        <span className={styles.jumpLead}>Разделы:</span>
        {faqGroups.map((g) => (
          <a key={g.id} href={`#${g.anchor}`} className={styles.jumpBtn}>
            {g.shortLabel}
            <span className={styles.jumpCount}>{g.items.length}</span>
          </a>
        ))}
        <span className={styles.jumpTotal}>Всего: {totalQ}</span>
      </nav>

      {/* ── Categories ── */}
      {faqGroups.map((group, gi) => (
        <section key={group.id} id={group.anchor} aria-labelledby={`faq-group-${group.id}`}>
          <div className={styles.catCard}>
            <div className={styles.catHead}>
              <div>
                <div className={styles.catBadge}>
                  <span className={styles.catBadgeNum}>{group.items.length}</span>
                  {group.shortLabel}
                </div>
                <h2 id={`faq-group-${group.id}`} className={styles.catTitle}>
                  {group.title.split(' ').map((word, wi, arr) =>
                    wi === arr.length - 1
                      ? <em key={wi}>{word}</em>
                      : <span key={wi}>{word} </span>
                  )}
                </h2>
              </div>
              <p className={styles.catDesc}>{group.description}</p>
            </div>

            <dl className={styles.faqList}>
              {group.items.map((item, i) => (
                <details
                  key={i}
                  className={styles.faqItem}
                  open={gi === 0 && i === 0}
                >
                  <dt>
                    <summary className={styles.faqSummary}>
                      <span className={styles.faqNum}>{String(i + 1).padStart(2, '0')}</span>
                      <span className={styles.faqQ}>{item.question}</span>
                      <span className={styles.faqToggle} aria-hidden="true">
                        <PlusIc />
                      </span>
                    </summary>
                  </dt>
                  <dd className={styles.faqAnswer}>{item.answer}</dd>
                </details>
              ))}
            </dl>
          </div>
        </section>
      ))}

      {/* ── Не нашли ответ ── */}
      <section className={styles.askBlock} aria-labelledby="ask-title">
        <div className={styles.askContent}>
          <h2 id="ask-title" className={styles.askTitle}>
            Не&nbsp;нашли <em>ответ</em>?
          </h2>
          <p className={styles.askDesc}>
            Напишите менеджеру — ответим в течение часа в рабочее время. Срочные вопросы можно отправить в Telegram с файлами до 100 МБ.
          </p>
          <div className={styles.askActions}>
            <a href="/#request" className="v6-btn v6-btn--yellow">
              Оставить заявку
              <span className="v6-ic" aria-hidden="true"><ArrowIc /></span>
            </a>
            <Link href="/contacts/" className="v6-btn v6-btn--ghost">
              Контакты
            </Link>
          </div>
        </div>

        <div className={styles.channels}>
          {channels.map((ch) => (
            <a
              key={ch.href}
              href={ch.href}
              className={styles.channel}
              target={ch.href.startsWith('http') ? '_blank' : undefined}
              rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span className={styles.channelIcon} aria-hidden="true">{ch.icon}</span>
              <div className={styles.channelMain}>
                <span className={styles.channelTitle}>{ch.title}</span>
                <span className={styles.channelDesc}>{ch.desc}</span>
              </div>
              <ArrowIc />
            </a>
          ))}
        </div>
      </section>

      {/* ── SEO ── */}
      <div className={styles.seoSection} aria-label="О разделе FAQ">
        <div className={styles.seoHead}>
          <div className={styles.kicker}>Подробнее</div>
          <h3>Вопросы о пошиве мерча и брендировании</h3>
        </div>
        <div className={styles.seoBody}>
          <p>
            В разделе FAQ собраны ответы на частые вопросы о пошиве промо-одежды, корпоративного мерча и брендировании логотипов для B2B-заказов. Здесь вы найдёте информацию о минимальных тиражах, сроках производства, способах нанесения, подготовке макетов, документах и доставке.
          </p>
          <p>
            Если у вас есть вопросы, которых нет в FAQ, — опишите задачу в форме заявки или напишите менеджеру напрямую. Мы отвечаем в течение часа в рабочее время.
          </p>
        </div>
      </div>

      <JsonLd data={[
        getBreadcrumbSchema([
          { name: 'Главная', url: siteConfig.url },
          { name: 'FAQ', url: pageUrl },
        ]),
        getFAQSchema(allFaqItems),
      ]} />
    </main>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { contacts } from '@/lib/contacts';
import { faqGroups } from '@/lib/faq';
import RequestForm from '@/components/RequestForm/RequestForm';
import JsonLd from '@/components/JsonLd/JsonLd';
import { siteConfig } from '@/lib/seo';
import { getBreadcrumbSchema, getFAQSchema, getOrganizationSchema } from '@/lib/schema';
import styles from './contacts.module.css';

export const metadata: Metadata = {
  title: 'Контакты TEEON | Заявка на пошив промо-одежды и мерча',
  description:
    'Контакты TEEON для расчёта пошива промо-одежды, корпоративного мерча и брендирования. Оставьте заявку, прикрепите логотип или ТЗ, укажите тираж и сроки.',
  alternates: { canonical: `${siteConfig.url}/contacts/` },
  openGraph: {
    url: `${siteConfig.url}/contacts/`,
    title: 'Контакты TEEON | Заявка на пошив промо-одежды и мерча',
    description:
      'Контакты TEEON для расчёта пошива промо-одежды, корпоративного мерча и брендирования. Оставьте заявку, прикрепите логотип или ТЗ, укажите тираж и сроки.',
  },
};

const howToItems = [
  { ic: '📋', t: 'Опишите задачу',  d: 'Что нужно: одежда, мерч, сценарий использования.', mod: '' },
  { ic: '🔢', t: 'Укажите тираж',   d: 'Сколько штук, разбивка по позициям и размерам.',   mod: 'yellow' },
  { ic: '📎', t: 'Прикрепите ТЗ',   d: 'Логотип в векторе, брендбук, референсы — всё пригодится.', mod: '' },
  { ic: '📅', t: 'Желаемый срок',   d: 'Дата, к которой нужна готовая партия.',           mod: 'blue' },
];

const attachItems = [
  'Логотип в векторе (AI, EPS, SVG, CDR)',
  'Брендбук или гайд по цветам',
  'Техническое задание (ТЗ) с деталями',
  'Фото / пример желаемого изделия',
  'Размерная сетка для команды',
  'Референсы и образцы',
  'Список сотрудников по размерам',
  'Дедлайн и желаемая дата отгрузки',
];

const contactCards = [
  { ic: '📞', t: 'Телефон',  main: contacts.phone,     href: `tel:${contacts.phoneRaw}`,           d: 'Пн–Пт · 9:00–19:00 — звонки и SMS', mod: '' },
  { ic: '✉️', t: 'Email',    main: contacts.email,     href: `mailto:${contacts.email}`,           d: 'Любые файлы, ТЗ, договоры — ответ в течение часа', mod: 'yellow' },
  { ic: '💬', t: 'Telegram', main: contacts.telegram,  href: `https://t.me/teeon_merch`,           d: 'Быстрые вопросы, образцы, файлы до 100 МБ', mod: '' },
  { ic: '🟢', t: 'WhatsApp', main: contacts.whatsapp,  href: `https://wa.me/${contacts.phoneRaw}`, d: 'Голосовые и быстрая переписка', mod: 'blue' },
  { ic: '🕐', t: 'График',   main: contacts.schedule,  href: null,                                 d: 'Заявки принимаем круглосуточно — ответим в начале следующего рабочего дня', mod: '' },
  { ic: '📍', t: 'Адрес',    main: contacts.city,      href: null,                                 d: contacts.address, mod: 'ink' },
];

const faqItems = faqGroups[2].items;

const jsonLd = [
  getBreadcrumbSchema([
    { name: 'Главная', url: siteConfig.url },
    { name: 'Контакты', url: `${siteConfig.url}/contacts/` },
  ]),
  getOrganizationSchema(),
  getFAQSchema(faqItems.map(f => ({ q: f.question, a: f.answer }))),
];

export default function ContactsPage() {
  return (
    <main className="v6-page">

      {/* ── Hero ── */}
      <section className={styles.hero} aria-label="Контакты TEEON">
        <div className={styles.heroYellow} aria-hidden="true" />

        <div className={styles.heroContent}>
          <nav className={styles.crumbs} aria-label="Хлебные крошки">
            <Link href="/" className={styles.crumbLink}>Главная</Link>
            <span className={styles.crumbSep} aria-hidden="true">›</span>
            <span className={styles.crumbCurrent} aria-current="page">Контакты</span>
          </nav>

          <div className={styles.heroBadges}>
            {['Расчёт под тираж', 'Работа с юрлицами', 'Можно прикрепить ТЗ', 'Подбор технологии'].map(b => (
              <span key={b} className={styles.heroBadge}>
                <span className={styles.dot} aria-hidden="true" />
                {b}
              </span>
            ))}
          </div>

          <h1 className={styles.heroH1}>
            Контакты <em>TEEON</em>
          </h1>
          <p className={styles.heroDesc}>
            Свяжитесь удобным способом или оставьте заявку&nbsp;— подберём тираж, ткань, способ нанесения и соберём смету в течение часа.
          </p>
          <div className={styles.heroCta}>
            <a href="#request" className="v6-btn v6-btn--ink">
              Оставить заявку
              <span className="v6-ic" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
              </span>
            </a>
            <Link href="/catalog/" className="v6-btn v6-btn--ghost-d">
              Смотреть каталог
              <span className="v6-ic" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7 L11 7 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.7"/></svg>
              </span>
            </Link>
          </div>
        </div>

        <div className={styles.heroQuick} aria-label="Быстрая связь">
          <div className={styles.quickTitle}>Быстрая связь</div>
          <ul className={styles.quickList}>
            {contacts.contactMethods.map(m => (
              <li key={m.title}>
                <a href={m.href} className={styles.quickRow}>
                  <span className={styles.quickIc} aria-hidden="true">{m.icon}</span>
                  <div className={styles.quickMain}>
                    <div className={styles.quickLabel}>{m.title}</div>
                    <div className={styles.quickVal}>{m.value}</div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.quickSched}>
            <span className={styles.quickSchedStrong}>График:</span>{' '}
            {contacts.schedule}<br />
            Заявки принимаем круглосуточно — отвечаем в начале следующего рабочего дня.
          </div>
        </div>
      </section>

      {/* ── Как ускорить расчёт ── */}
      <section className={styles.section} aria-labelledby="how-title">
        <div className="container">
          <div className={styles.howHead}>
            <div>
              <div className="v6-kicker">(02) — Как ускорить расчёт</div>
              <h2 className={styles.secH2}>4 шага <em>до&nbsp;сметы</em></h2>
            </div>
            <p>Чем точнее задача — тем быстрее ответ и точнее цена. Если чего-то нет — ничего страшного, уточним по ходу.</p>
          </div>

          <ul className={styles.howGrid}>
            {howToItems.map((h, i) => (
              <li
                key={h.t}
                className={[
                  styles.howCard,
                  h.mod === 'yellow' ? styles['howCard--yellow'] : '',
                  h.mod === 'blue'   ? styles['howCard--blue']   : '',
                ].filter(Boolean).join(' ')}
              >
                <div className={styles.howNum}>{String(i + 1).padStart(2, '0')} /</div>
                <span className={styles.howIc} aria-hidden="true">{h.ic}</span>
                <div className={styles.howT}>{h.t}</div>
                <div className={styles.howD}>{h.d}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Форма заявки ── */}
      <section className={styles.section} id="request" aria-labelledby="form-title">
        <div className="container">
          <div className={styles.requestWrap}>
            <div className={styles.requestFormCard}>
              <div className={styles.requestFormHead} id="form-title">Заявка на расчёт</div>
              <div className={styles.requestFormSub}>Менеджер свяжется в течение часа в рабочее время</div>
              <RequestForm embedded />
            </div>

            <div className={styles.attachSide}>
              <div className={styles.attachTitle}>
                Что можно приложить <em>к&nbsp;заявке</em>
              </div>
              <p className={styles.attachDesc}>
                Чем больше информации, тем точнее смета. Если чего-то нет — отправьте, что есть, остальное обсудим.
              </p>
              <ul className={styles.attachList}>
                {attachItems.map(item => (
                  <li key={item} className={styles.attachItem}>
                    <span className={styles.attachCheck} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Все способы связи ── */}
      <section className={styles.section} aria-labelledby="contacts-title">
        <div className="container">
          <div className={styles.cnHead}>
            <div>
              <div className="v6-kicker">(04) — Контакты</div>
              <h2 className={styles.secH2} id="contacts-title">Все <em>способы связи</em></h2>
            </div>
            <p>Выбирайте удобный канал — ответ в течение часа в рабочее время. Срочные вопросы — в Telegram или WhatsApp.</p>
          </div>

          <ul className={styles.cnContacts}>
            {contactCards.map(c => (
              <li
                key={c.t}
                className={[
                  styles.cnCard,
                  c.mod === 'yellow' ? styles['cnCard--yellow'] : '',
                  c.mod === 'blue'   ? styles['cnCard--blue']   : '',
                  c.mod === 'ink'    ? styles['cnCard--ink']    : '',
                ].filter(Boolean).join(' ')}
              >
                <div className={styles.cnCardHead}>
                  <span className={styles.cnCardIc} aria-hidden="true">{c.ic}</span>
                  <div className={styles.cnCardLabel}>{c.t}</div>
                </div>
                <div className={styles.cnCardMain}>
                  {c.href
                    ? <a href={c.href}>{c.main}</a>
                    : <span>{c.main}</span>}
                </div>
                <div className={styles.cnCardDesc}>{c.d}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Адрес цеха ── */}
      <section className={styles.section} aria-labelledby="map-title">
        <div className="container">
          <div className={styles.mapWrap}>
            <div className={styles.mapInfo}>
              <div className="v6-kicker">(05) — Производство</div>
              <h2 className={styles.mapTitle} id="map-title">
                Адрес <em>цеха</em>
              </h2>
              <div className={styles.mapAddr}>
                <span className={styles.mapPin} aria-hidden="true">📍</span>
                {contacts.city}
              </div>
              <p className={styles.mapDesc}>
                Производство в {contacts.city}е. Посещение — по согласованию, договоритесь по телефону или в Telegram.
              </p>
              <p className={styles.mapDesc} style={{ fontSize: '12.5px', opacity: 0.7 }}>
                {contacts.address}
              </p>
            </div>
            <div className={styles.mapPlaceholder} role="img" aria-label="Карта расположения офиса и производства">
              <div className={styles.mapPinMarker}>
                <span>📍</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Работа с юридическими лицами ── */}
      <section className={styles.section} aria-labelledby="legal-title">
        <div className="container">
          <div className={styles.legalHead}>
            <div className="v6-kicker">(06) — Юрлица</div>
            <h2 className={styles.secH2} id="legal-title">Работа <em>с&nbsp;юридическими лицами</em></h2>
          </div>
          <div className={styles.legalGrid}>
            <div className={`${styles.legalCol} ${styles['legalCol--yellow']}`}>
              <div className={styles.legalColTitle}>Стандартный B2B-пакет</div>
              <p className={styles.legalColDesc}>
                Полный комплект документов для бухгалтерии и юр-отдела. Маркировка партий для WB/Ozon — по запросу.
              </p>
              <ul className={styles.legalList}>
                {['Договор на производство', 'Счёт на оплату', 'Акт или УПД (закрывающие документы)', 'Согласование ТЗ и образца'].map(d => (
                  <li key={d} className={styles.legalItem}>{d}</li>
                ))}
              </ul>
            </div>

            <div className={styles.legalCol}>
              <div className={styles.legalColTitle}>Реквизиты</div>
              <p className={styles.legalColDesc}>
                Базовые реквизиты для договора. Полные реквизиты с банковскими реквизитами и адресами — по ссылке ниже.
              </p>
              <div className={styles.reqTable}>
                <div className={styles.reqRow}>
                  <span className={styles.reqLabel}>Юр. лицо</span>
                  <span className={styles.reqValue}>{contacts.legalInfo.legalName}</span>
                </div>
                <div className={styles.reqRow}>
                  <span className={styles.reqLabel}>ИНН</span>
                  <span className={styles.reqValue}>{contacts.legalInfo.inn}</span>
                </div>
                <div className={styles.reqRow}>
                  <span className={styles.reqLabel}>ОГРН</span>
                  <span className={styles.reqValue}>{contacts.legalInfo.ogrn}</span>
                </div>
              </div>
              <div className={styles.legalActions}>
                <Link href="/requisites/" className="v6-btn v6-btn--ghost-d">
                  Страница реквизитов
                  <span className="v6-ic" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
                  </span>
                </Link>
                <a href="#request" className="v6-btn v6-btn--ink">
                  Запросить расчёт
                  <span className="v6-ic" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Частые вопросы ── */}
      <section className={styles.section} id="faq" aria-labelledby="faq-title">
        <div className="container">
          <div className={styles.faqHead}>
            <div>
              <div className="v6-kicker">(07) — FAQ</div>
              <h2 className={styles.secH2} id="faq-title">Частые <em>вопросы</em></h2>
            </div>
            <p>Шесть вопросов о контактах и процессе оформления заявки. На остальные — в чате.</p>
          </div>

          <div className={styles.faqList}>
            {faqItems.map((f, i) => (
              <details key={f.question} className={styles.faqItem}>
                <summary className={styles.faqQ}>
                  <span className={styles.faqNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.faqQText}>{f.question}</span>
                  <span className={styles.faqArrow} aria-hidden="true">+</span>
                </summary>
                <p className={styles.faqA}>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.section} aria-label="Готовы обсудить проект">
        <div className="container">
          <div className={styles.ctaBlock}>
            <div className={styles.ctaText}>
              <h2 className={styles.ctaH2}>
                Готовы обсудить <em>проект</em>?
              </h2>
              <p className={styles.ctaDesc}>
                Заполните форму или свяжитесь удобным способом. Менеджер ответит в течение часа.
              </p>
            </div>
            <div className={styles.ctaBtn}>
              <a href="#request" className="v6-btn v6-btn--yellow">
                Заполнить заявку
                <span className="v6-ic" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={jsonLd} />
    </main>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { contacts } from '@/lib/contacts';
import { siteConfig } from '@/lib/seo';
import styles from './requisites.module.css';

export const metadata: Metadata = {
  title: 'Реквизиты TEEON для договора и оплаты',
  description: 'Реквизиты TEEON для B2B-заказов: ИП Ульданов Рафаэль Айратович, ИНН, ОГРНИП и фактический адрес производства в Москве.',
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteConfig.url}/requisites/` },
};

export default function RequisitesPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
          <Link href="/" className={styles.breadLink}>Главная</Link>
          <span className={styles.breadSep} aria-hidden="true">›</span>
          <Link href="/contacts/" className={styles.breadLink}>Контакты</Link>
          <span className={styles.breadSep} aria-hidden="true">›</span>
          <span aria-current="page">Реквизиты</span>
        </nav>

        <h1 className={styles.title}>Реквизиты {contacts.companyName}</h1>

        <div className={styles.notice}>
          <p>
            TEEON работает с юридическими лицами, ИП и корпоративными заказчиками.
            Для подготовки договора и счёта используйте подтверждённые данные компании.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={styles.h2}>Контактная информация</h2>
            <dl className={styles.dl}>
              <div className={styles.dlRow}>
                <dt>Компания</dt>
                <dd>{contacts.companyName}</dd>
              </div>
              <div className={styles.dlRow}>
                <dt>Email</dt>
                <dd><a href={`mailto:${contacts.email}`} className={styles.link}>{contacts.email}</a></dd>
              </div>
              <div className={styles.dlRow}>
                <dt>Телефон</dt>
                <dd><a href={`tel:+${contacts.phoneRaw}`} className={styles.link}>{contacts.phone}</a></dd>
              </div>
              <div className={styles.dlRow}>
                <dt>Город</dt>
                <dd>{contacts.city}</dd>
              </div>
              <div className={styles.dlRow}>
                <dt>График</dt>
                <dd>{contacts.schedule}</dd>
              </div>
            </dl>
          </div>

          <div className={styles.card}>
            <h2 className={styles.h2}>Юридические данные</h2>
            <dl className={styles.dl}>
              <div className={styles.dlRow}>
                <dt>Юр. наименование</dt>
                <dd>{contacts.legalInfo.legalName}</dd>
              </div>
              <div className={styles.dlRow}>
                <dt>ИНН</dt>
                <dd>{contacts.legalInfo.inn}</dd>
              </div>
              <div className={styles.dlRow}>
                <dt>ОГРНИП</dt>
                <dd>{contacts.legalInfo.ogrn}</dd>
              </div>
              <div className={styles.dlRow}>
                <dt>Адрес производства</dt>
                <dd>Москва, 2-й Грайвороновский проезд, 48</dd>
              </div>
            </dl>
            <p className={styles.placeholder}>
              Банковские реквизиты предоставляются менеджером при подготовке договора и счёта.
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <a href="/#request" className="btn-primary">Запросить счёт</a>
          <Link href="/contacts/" className={styles.contactsLink}>Контакты →</Link>
        </div>
      </div>
    </main>
  );
}

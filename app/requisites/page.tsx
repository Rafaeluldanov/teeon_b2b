import type { Metadata } from 'next';
import Link from 'next/link';
import { contacts } from '@/lib/contacts';
import { siteConfig } from '@/lib/seo';
import styles from './requisites.module.css';

export const metadata: Metadata = {
  title: 'Реквизиты компании',
  description: 'Реквизиты компании TEEON: ИНН, ОГРН, контактная информация для работы с юридическими лицами и ИП по договору.',
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
          <span aria-hidden="true">ℹ️</span>
          <p>
            Реквизиты компании будут добавлены после уточнения юридической информации.
            Для уточнения реквизитов, пожалуйста, свяжитесь с нами.
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
                <dt>ОГРН</dt>
                <dd>{contacts.legalInfo.ogrn}</dd>
              </div>
            </dl>
            <p className={styles.placeholder}>
              Полные реквизиты (расчётный счёт, банк, БИК) будут добавлены после уточнения.
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

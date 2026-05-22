import Link from 'next/link';
import styles from './Footer.module.css';
import { catalogCategories } from '@/lib/catalog';
import { brandingMethods } from '@/lib/branding';
import { contacts } from '@/lib/contacts';
import FooterContactsClient from './FooterContactsClient';

const ArrowIc = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className={`${styles.footer} section-spacer`} id="contacts" aria-label="Подвал сайта">
      <div className={styles.top}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>tee</span>
            <span className={styles.logoAccent}>on</span>
          </Link>
          <p className={styles.brandDesc}>
            Шьём корпоративную одежду и промо-мерч для бизнеса. Собственный цех, 9 методов нанесения, работа с юрлицами и доставка по всей России.
          </p>
          <FooterContactsClient />
          <a href="#request" className={styles.brandCta}>
            Рассчитать заказ
            <span className={styles.brandCtaIc} aria-hidden="true"><ArrowIc /></span>
          </a>
        </div>

        {/* Catalog */}
        <nav aria-label="Каталог">
          <span className={styles.colTitle}>
            <Link href="/catalog/" className={styles.colTitleLink}>Каталог</Link>
          </span>
          <ul className={styles.links}>
            {catalogCategories.slice(0, 6).map((cat) => (
              <li key={cat.slug}>
                <Link href={`/catalog/${cat.slug}/`} className={styles.link}>{cat.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/catalog/" className={styles.link}>Все категории →</Link>
            </li>
          </ul>
        </nav>

        {/* Branding */}
        <nav aria-label="Брендирование">
          <span className={styles.colTitle}>
            <Link href="/branding/" className={styles.colTitleLink}>Брендирование</Link>
          </span>
          <ul className={styles.links}>
            {brandingMethods.slice(0, 5).map((m) => (
              <li key={m.slug}>
                <Link href={`/branding/${m.slug}/`} className={styles.link}>{m.menuTitle}</Link>
              </li>
            ))}
            <li>
              <Link href="/branding/" className={styles.link}>Все методы →</Link>
            </li>
          </ul>
        </nav>

        {/* Company */}
        <nav aria-label="О компании">
          <span className={styles.colTitle}>Контакты</span>
          <ul className={styles.links}>
            <li className={styles.linkPlain}>{contacts.phone}</li>
            <li className={styles.linkPlain}>{contacts.email}</li>
            <li className={styles.linkPlain}>{contacts.schedule}</li>
            <li><Link href="/about/" className={styles.link}>О нас</Link></li>
            <li><Link href="/portfolio/" className={styles.link}>Портфолио</Link></li>
            <li><Link href="/contacts/" className={styles.link}>Контакты</Link></li>
            <li><Link href="/faq/" className={styles.link}>FAQ</Link></li>
            <li><Link href="/suvenirnaya-produkciya/" className={styles.link}>Сувениры</Link></li>
          </ul>
        </nav>
      </div>

      <div className={styles.bottom}>
        <span className={styles.copy}>
          © 2014–{new Date().getFullYear()} TEEON — все права защищены
        </span>
        <div className={styles.docs}>
          <a href="/privacy/" className={styles.docLink}>Политика ПД</a>
          <Link href="/requisites/" className={styles.docLink}>Реквизиты</Link>
        </div>
      </div>
    </footer>
  );
}

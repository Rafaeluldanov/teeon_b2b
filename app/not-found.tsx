import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Страница не найдена | TEEON',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <span className={styles.code} aria-hidden="true">404</span>
          <h1 className={styles.title}>Страница не найдена</h1>
          <p className={styles.text}>
            Возможно, ссылка изменилась или раздел ещё не опубликован
          </p>
          <div className={styles.actions}>
            <Link href="/" className="btn-primary">На главную</Link>
            <Link href="/catalog/" className="btn-outline">Каталог</Link>
            <a href="/#request" className={styles.requestLink}>Оставить заявку</a>
          </div>
          <div className={styles.links}>
            <Link href="/portfolio/" className={styles.link}>Портфолио</Link>
            <Link href="/about/" className={styles.link}>О нас</Link>
            <Link href="/contacts/" className={styles.link}>Контакты</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

import Link from 'next/link';
import styles from './StubPage.module.css';

interface StubPageProps {
  type: 'catalog' | 'branding';
  title: string;
  description: string;
  backLabel: string;
  backHref: string;
}

export default function StubPage({ type, title, description, backLabel, backHref }: StubPageProps) {
  return (
    <main className={styles.page}>
      <div className={`${styles.inner} container`}>
        <nav className={styles.breadcrumb} aria-label="Хлебные крошки">
          <Link href="/" className={styles.breadLink}>Главная</Link>
          <span className={styles.breadSep} aria-hidden="true">›</span>
          <Link href={backHref} className={styles.breadLink}>{backLabel}</Link>
          <span className={styles.breadSep} aria-hidden="true">›</span>
          <span className={styles.breadCurrent} aria-current="page">{title}</span>
        </nav>

        <div className={styles.content}>
          <div className={styles.badge}>
            {type === 'catalog' ? '👕 Категория каталога' : '🎨 Способ брендирования'}
          </div>

          <h1 className={styles.title}>{title}</h1>
          <p className={styles.desc}>{description}</p>

          <div className={styles.actions}>
            <a href="/#request" className="btn-primary">Оставить заявку на расчёт</a>
            <Link href={backHref} className="btn-outline">← {backLabel}</Link>
            <Link href="/" className={styles.homeLink}>На главную</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

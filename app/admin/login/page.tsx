import type { Metadata } from 'next';
import styles from './login.module.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Вход в админку | TEEON',
  description: 'Вход в закрытую административную часть TEEON',
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: { error?: string; next?: string };
}

export default function AdminLoginPage({ searchParams }: Props) {
  const { error, next } = searchParams;

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.logo}>TEEON</span>
          <h1 className={styles.title}>Вход в админку</h1>
          <p className={styles.subtitle}>Доступ только для владельца сайта</p>
        </div>

        {error === 'credentials' && (
          <div className={styles.errorMsg} role="alert">
            Неверный логин или пароль
          </div>
        )}
        {error === 'config' && (
          <div className={styles.errorMsg} role="alert">
            Переменные доступа к админке не настроены. Добавьте ADMIN_USERNAME, ADMIN_PASSWORD и ADMIN_SESSION_SECRET в .env.local
          </div>
        )}

        <form className={styles.form} method="post" action="/api/admin/login">
          {next && <input type="hidden" name="next" value={next} />}

          <div className={styles.field}>
            <label htmlFor="admin-username" className={styles.label}>Логин</label>
            <input
              type="text"
              id="admin-username"
              name="username"
              className={styles.input}
              autoComplete="username"
              required
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="admin-password" className={styles.label}>Пароль</label>
            <input
              type="password"
              id="admin-password"
              name="password"
              className={styles.input}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Войти
          </button>
        </form>

        <Link href="/" className={styles.backLink}>← Вернуться на сайт</Link>
      </div>
    </main>
  );
}

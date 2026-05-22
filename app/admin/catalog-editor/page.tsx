import type { Metadata } from 'next';
import AdminDashboard from '@/components/AdminDashboard/AdminDashboard';
import styles from './catalog-editor.module.css';

export const metadata: Metadata = {
  title: 'Админ-панель | TEEON',
  description: 'Административная панель TEEON — редактирование каталога, портфолио, баннера, нанесения и страниц.',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className={styles.page}>
      <div className={styles.topBar}>
        <div className="container">
          <div className={styles.topBarInner}>
            <div className={styles.topBarLeft}>
              <span className={styles.topBarLogo}>TEEON</span>
              <span className={styles.topBarTitle}>Админ-панель</span>
            </div>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className={styles.logoutBtn}>Выйти</button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className="container">
          <AdminDashboard />
        </div>
      </div>
    </main>
  );
}

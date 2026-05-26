'use client';

import { useEffect, useState } from 'react';
import AdminCatalogEditor from '@/components/AdminCatalogEditor/AdminCatalogEditor';
import AdminPortfolioEditor from '@/components/AdminPortfolioEditor/AdminPortfolioEditor';
import AdminBannerEditor from '@/components/AdminBannerEditor/AdminBannerEditor';
import AdminBrandingEditor from '@/components/AdminBrandingEditor/AdminBrandingEditor';
import AdminPagesEditor from '@/components/AdminPagesEditor/AdminPagesEditor';
import AdminExtraTools from '@/components/AdminExtraTools/AdminExtraTools';
import styles from './AdminDashboard.module.css';

type TabId = 'catalog' | 'portfolio' | 'banner' | 'branding' | 'pages' | 'extra';

const ADMIN_KEYS = [
  'teeon_admin_catalog_models',
  'teeon_admin_portfolio_cases',
  'teeon_admin_home_banner',
  'teeon_admin_branding_methods',
  'teeon_admin_branding_samples',
  'teeon_admin_page_content',
  'teeon_admin_contacts',
  'teeon_admin_product_options',
];

// Если в этом браузере localStorage пуст, а на сервере есть дамп — предложить подгрузить.
// Срабатывает один раз при монтировании. Никогда не перезаписывает существующие правки без подтверждения.
function useAutoLoadFromServer() {
  useEffect(() => {
    const hasLocal = ADMIN_KEYS.some(k => localStorage.getItem(k) !== null);
    if (hasLocal) return;
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch('/api/admin/full-sync', { credentials: 'same-origin' });
        if (!res.ok || cancelled) return;
        const json = await res.json() as { ok: boolean; savedAt?: string | null; data?: Record<string, unknown> };
        const data = json?.data ?? {};
        const keys = Object.keys(data);
        if (keys.length === 0) return;
        const when = json.savedAt ? new Date(json.savedAt).toLocaleString('ru-RU') : 'неизвестно когда';
        if (!confirm(`В этом браузере правок нет, а на сервере есть сохранённая копия (${when}, ${keys.length} раздел(ов)).\nЗагрузить её?`)) return;
        keys.forEach(k => {
          if (ADMIN_KEYS.includes(k)) localStorage.setItem(k, JSON.stringify(data[k]));
        });
        location.reload();
      } catch { /* ignore — оффлайн или 401 */ }
    })();
    return () => { cancelled = true; };
  }, []);
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'catalog', label: 'Каталог' },
  { id: 'portfolio', label: 'Портфолио' },
  { id: 'banner', label: 'Баннер' },
  { id: 'branding', label: 'Нанесение' },
  { id: 'pages', label: 'Страницы' },
  { id: 'extra', label: 'Дополнительно' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('catalog');
  useAutoLoadFromServer();

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Админ-панель TEEON</h1>
        <p className={styles.headerSub}>Редактирование каталога, портфолио, баннера, нанесения и страниц</p>
        <div className={styles.storageNotice}>
          Правки живут в браузере (localStorage). После изменений нажимайте «☁️ Сохранить всё на сервер» во вкладке «Дополнительно» — тогда они переживут смену браузера или компьютера.
        </div>
      </div>

      <nav className={styles.tabBar} aria-label="Разделы администрирования">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={activeTab === t.id}
            className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className={styles.tabContent}>
        {activeTab === 'catalog' && <AdminCatalogEditor />}
        {activeTab === 'portfolio' && <AdminPortfolioEditor />}
        {activeTab === 'banner' && <AdminBannerEditor />}
        {activeTab === 'branding' && <AdminBrandingEditor />}
        {activeTab === 'pages' && <AdminPagesEditor />}
        {activeTab === 'extra' && <AdminExtraTools />}
      </div>
    </div>
  );
}

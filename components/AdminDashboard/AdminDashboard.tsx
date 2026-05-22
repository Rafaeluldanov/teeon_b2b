'use client';

import { useState } from 'react';
import AdminCatalogEditor from '@/components/AdminCatalogEditor/AdminCatalogEditor';
import AdminPortfolioEditor from '@/components/AdminPortfolioEditor/AdminPortfolioEditor';
import AdminBannerEditor from '@/components/AdminBannerEditor/AdminBannerEditor';
import AdminBrandingEditor from '@/components/AdminBrandingEditor/AdminBrandingEditor';
import AdminPagesEditor from '@/components/AdminPagesEditor/AdminPagesEditor';
import AdminExtraTools from '@/components/AdminExtraTools/AdminExtraTools';
import styles from './AdminDashboard.module.css';

type TabId = 'catalog' | 'portfolio' | 'banner' | 'branding' | 'pages' | 'extra';

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

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Админ-панель TEEON</h1>
        <p className={styles.headerSub}>Редактирование каталога, портфолио, баннера, нанесения и страниц</p>
        <div className={styles.storageNotice}>
          Изменения сохраняются в браузере через localStorage. Для публикации для всех пользователей нужен backend/CMS или перенос JSON в data-файлы проекта.
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

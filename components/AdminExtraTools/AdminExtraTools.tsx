'use client';

import { useState } from 'react';
import styles from './AdminExtraTools.module.css';

const SECTIONS = [
  { key: 'teeon_admin_catalog_models', label: 'Каталог' },
  { key: 'teeon_admin_portfolio_cases', label: 'Портфолио' },
  { key: 'teeon_admin_home_banner', label: 'Баннер' },
  { key: 'teeon_admin_branding_methods', label: 'Нанесение (методы)' },
  { key: 'teeon_admin_branding_samples', label: 'Нанесение (варианты)' },
  { key: 'teeon_admin_page_content', label: 'Страницы' },
  { key: 'teeon_admin_contacts', label: 'Контакты' },
];

export default function AdminExtraTools() {
  const [statusMsg, setStatusMsg] = useState('');
  const [allJson, setAllJson] = useState('');
  const [importJson, setImportJson] = useState('');

  const showStatus = (msg: string) => { setStatusMsg(msg); setTimeout(() => setStatusMsg(''), 3000); };

  const exportAll = () => {
    const data: Record<string, unknown> = {};
    SECTIONS.forEach(s => {
      try {
        const raw = localStorage.getItem(s.key);
        if (raw) data[s.key] = JSON.parse(raw);
      } catch { /* ignore */ }
    });
    setAllJson(JSON.stringify(data, null, 2));
    showStatus('Экспорт готов');
  };

  const importAll = () => {
    if (!importJson.trim()) { showStatus('Вставьте JSON для импорта'); return; }
    if (!confirm('Импортировать данные? Текущие изменения будут перезаписаны.')) return;
    try {
      const data = JSON.parse(importJson) as Record<string, unknown>;
      Object.entries(data).forEach(([key, val]) => {
        if (SECTIONS.some(s => s.key === key)) {
          localStorage.setItem(key, JSON.stringify(val));
        }
      });
      showStatus('Импорт выполнен. Обновите страницу.');
      setImportJson('');
    } catch { showStatus('Ошибка: неверный JSON'); }
  };

  const clearSection = (key: string, label: string) => {
    if (!confirm(`Очистить «${label}»? Данные вернутся к значениям из проекта.`)) return;
    try { localStorage.removeItem(key); showStatus(`«${label}» сброшен`); } catch { showStatus('Ошибка'); }
  };

  const clearAll = () => {
    if (!confirm('Сбросить ВСЕ разделы? Это нельзя отменить без резервной копии.')) return;
    SECTIONS.forEach(s => { try { localStorage.removeItem(s.key); } catch { /* ignore */ } });
    showStatus('Все данные сброшены');
    setAllJson('');
  };

  return (
    <div className={styles.editor}>
      {statusMsg && <div className={styles.statusBar}>{statusMsg}</div>}

      <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#7c2d12', lineHeight: 1.6 }}>
        <strong>Перед очисткой</strong> обязательно сделайте экспорт JSON, чтобы не потерять изменения.
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Export */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px', color: '#0f172a' }}>Экспорт всех данных</h3>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" className={styles.btnPrimary} onClick={exportAll}>📤 Экспортировать всё</button>
          </div>
          {allJson && (
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, fontSize: 12, color: '#64748b' }}>
                <span>JSON всех разделов</span>
                <button type="button" className={styles.btnSmall} onClick={() => { void navigator.clipboard.writeText(allJson).then(() => showStatus('Скопировано')); }}>📋 Скопировать</button>
              </div>
              <textarea className={styles.jsonTextarea} rows={10} value={allJson} readOnly />
            </div>
          )}
        </div>

        {/* Import */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px', color: '#0f172a' }}>Импорт данных</h3>
          <textarea
            className={styles.jsonTextarea}
            rows={4}
            value={importJson}
            placeholder={'{\n  "teeon_admin_catalog_models": {...},\n  "teeon_admin_home_banner": {...}\n}'}
            onChange={e => setImportJson(e.target.value)}
          />
          <div style={{ marginTop: 8 }}>
            <button type="button" className={styles.btnSecondary} onClick={importAll}>📥 Импортировать</button>
          </div>
        </div>

        {/* Reset by section */}
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px', color: '#0f172a' }}>Сброс по разделу</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SECTIONS.map(s => (
              <div key={s.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8 }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{s.label}</span>
                  <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 8 }}>{s.key}</span>
                </div>
                <button type="button" className={styles.btnDanger} onClick={() => clearSection(s.key, s.label)}>↩ Сбросить</button>
              </div>
            ))}
          </div>
        </div>

        {/* Reset all */}
        <div style={{ borderTop: '1px solid #fee2e2', paddingTop: 16 }}>
          <button type="button" className={styles.btnDanger} onClick={clearAll}>🗑 Сбросить все разделы</button>
        </div>
      </div>

      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 8, padding: '12px 16px', fontSize: 12, color: '#0369a1', lineHeight: 1.6 }}>
        <strong>Как перенести изменения в production:</strong><br />
        1. Нажмите «Экспортировать всё» и скопируйте JSON.<br />
        2. Вставьте нужный раздел в data-файл (lib/catalogModels.ts, lib/portfolio.ts, lib/branding.ts и т.д.).<br />
        3. Пересоберите: <code>npm run build</code>.<br />
        4. Деплойте на сервер.<br />
        Для автоматической публикации нужен backend/CMS.
      </div>
    </div>
  );
}

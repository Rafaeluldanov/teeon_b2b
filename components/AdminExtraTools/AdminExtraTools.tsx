'use client';

import { useEffect, useState } from 'react';
import styles from './AdminExtraTools.module.css';

const SECTIONS = [
  { key: 'teeon_admin_catalog_models', label: 'Каталог' },
  { key: 'teeon_admin_portfolio_cases', label: 'Портфолио' },
  { key: 'teeon_admin_home_banner', label: 'Баннер' },
  { key: 'teeon_admin_branding_methods', label: 'Нанесение (методы)' },
  { key: 'teeon_admin_branding_samples', label: 'Нанесение (варианты)' },
  { key: 'teeon_admin_page_content', label: 'Страницы' },
  { key: 'teeon_admin_contacts', label: 'Контакты' },
  { key: 'teeon_admin_product_options', label: 'Опции товаров' },
];

export default function AdminExtraTools() {
  const [statusMsg, setStatusMsg] = useState('');
  const [allJson, setAllJson] = useState('');
  const [importJson, setImportJson] = useState('');
  const [serverSavedAt, setServerSavedAt] = useState<string | null>(null);
  const [syncing, setSyncing] = useState<'idle' | 'saving' | 'loading'>('idle');

  const showStatus = (msg: string) => { setStatusMsg(msg); setTimeout(() => setStatusMsg(''), 4000); };

  useEffect(() => {
    fetch('/api/admin/full-sync', { credentials: 'same-origin' })
      .then(r => r.ok ? r.json() : null)
      .then(json => { if (json?.ok) setServerSavedAt(json.savedAt ?? null); })
      .catch(() => { /* ignore */ });
  }, []);

  const collectLocal = (): Record<string, unknown> => {
    const data: Record<string, unknown> = {};
    SECTIONS.forEach(s => {
      const raw = localStorage.getItem(s.key);
      if (raw === null) return;
      try { data[s.key] = JSON.parse(raw); }
      catch { data[s.key] = raw; }
    });
    return data;
  };

  const saveToServer = async () => {
    const data = collectLocal();
    const keys = Object.keys(data);
    if (keys.length === 0) {
      showStatus('Нет данных для сохранения — в этом браузере пусто');
      return;
    }
    if (!confirm(`Сохранить на сервер ${keys.length} раздел(ов)?\nЭто перезапишет предыдущую серверную копию.`)) return;
    setSyncing('saving');
    try {
      const res = await fetch('/api/admin/full-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(data),
      });
      const json = await res.json() as { ok: boolean; keys?: string[]; bytes?: number; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setServerSavedAt(new Date().toISOString());
      showStatus(`✓ Сохранено на сервер: ${json.keys?.length ?? 0} раздел(ов), ${json.bytes ?? 0} байт`);
    } catch (e) {
      showStatus('Ошибка сохранения: ' + (e instanceof Error ? e.message : 'unknown'));
    } finally {
      setSyncing('idle');
    }
  };

  const loadFromServer = async () => {
    const localCount = SECTIONS.filter(s => localStorage.getItem(s.key) !== null).length;
    if (localCount > 0 && !confirm(`В этом браузере уже есть данные (${localCount} раздел(ов)). Загрузить с сервера и ПЕРЕЗАПИСАТЬ их?`)) return;
    setSyncing('loading');
    try {
      const res = await fetch('/api/admin/full-sync', { credentials: 'same-origin' });
      const json = await res.json() as { ok: boolean; savedAt?: string | null; data?: Record<string, unknown>; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      const data = json.data ?? {};
      const keys = Object.keys(data);
      if (keys.length === 0) {
        showStatus('На сервере пусто. Сначала сохрани туда что-нибудь.');
        return;
      }
      keys.forEach(k => {
        if (SECTIONS.some(s => s.key === k)) {
          localStorage.setItem(k, JSON.stringify(data[k]));
        }
      });
      showStatus(`✓ Загружено: ${keys.length} раздел(ов). Перезагружаю…`);
      setTimeout(() => location.reload(), 800);
    } catch (e) {
      showStatus('Ошибка загрузки: ' + (e instanceof Error ? e.message : 'unknown'));
    } finally {
      setSyncing('idle');
    }
  };

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

      {/* Server sync — главное действие, на виду */}
      <div style={{ background: '#fff', border: '2px solid #0ea5e9', borderRadius: 12, padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: '#0c4a6e' }}>☁️ Синхронизация с сервером</h3>
          <span style={{ fontSize: 12, color: '#64748b' }}>
            {serverSavedAt
              ? `На сервере: ${new Date(serverSavedAt).toLocaleString('ru-RU')}`
              : 'На сервере пока пусто'}
          </span>
        </div>
        <p style={{ fontSize: 13, color: '#475569', margin: '0 0 14px', lineHeight: 1.5 }}>
          Данные админки живут в браузере. Сохрани их на сервер, чтобы переезд на другой компьютер или смену браузера прошли безболезненно.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" className={styles.btnPrimary} disabled={syncing !== 'idle'} onClick={saveToServer}>
            {syncing === 'saving' ? 'Сохраняю…' : '💾 Сохранить всё на сервер'}
          </button>
          <button type="button" className={styles.btnSecondary} disabled={syncing !== 'idle'} onClick={loadFromServer}>
            {syncing === 'loading' ? 'Загружаю…' : '⤴ Загрузить с сервера'}
          </button>
        </div>
      </div>

      <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#7c2d12', lineHeight: 1.6 }}>
        <strong>Перед очисткой</strong> обязательно сделайте экспорт JSON или сохраните на сервер, чтобы не потерять изменения.
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

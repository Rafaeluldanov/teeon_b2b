'use client';

import { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react';
import { defaultHomeBanner } from '@/lib/homeBanner';
import type { HomeBannerContent, BannerBadge, BannerCta, BannerTextPosition } from '@/lib/homeBanner';
import styles from './AdminBannerEditor.module.css';

const LS_KEY = 'teeon_admin_home_banner';
const VIDEO_MIMES = ['video/mp4', 'video/webm', 'video/quicktime'];

type BannerTab = 'texts' | 'position' | 'buttons' | 'badges' | 'media';

const POSITION_OPTIONS: { value: BannerTextPosition; label: string }[] = [
  { value: 'left-center',   label: 'Слева по центру' },
  { value: 'center-center', label: 'По центру' },
  { value: 'right-center',  label: 'Справа по центру' },
  { value: 'left-top',      label: 'Слева сверху' },
  { value: 'center-top',    label: 'По центру сверху' },
  { value: 'right-top',     label: 'Справа сверху' },
  { value: 'left-bottom',   label: 'Слева снизу' },
  { value: 'center-bottom', label: 'По центру снизу' },
  { value: 'right-bottom',  label: 'Справа снизу' },
];

// ── UploadField ────────────────────────────────────────────────────────────────
interface UploadFieldProps {
  label: string; value: string; onChange: (url: string) => void;
  folder?: string; accept?: string; maxMb?: number; hint?: string;
}
function UploadField({ label, value, onChange, folder = 'banner', accept = 'image/*', maxMb = 50, hint }: UploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > maxMb * 1024 * 1024) { setError(`Файл слишком большой. Макс. ${maxMb} МБ.`); return; }
    setUploading(true); setError('');
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', folder);
    if (VIDEO_MIMES.includes(file.type)) fd.append('mediaType', 'video');
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd, credentials: 'same-origin' });
      const json = await res.json() as { success?: boolean; url?: string; message?: string };
      if (res.status === 401) throw new Error('Сессия истекла, войдите заново.');
      if (!res.ok || !json.url) throw new Error(json.message ?? 'Ошибка загрузки');
      onChange(json.url);
    } catch (err) { setError(err instanceof Error ? err.message : 'Ошибка загрузки'); }
    finally { setUploading(false); if (ref.current) ref.current.value = ''; }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder, maxMb]);

  const isVideoValue = value.match(/\.(mp4|webm|mov)(\?|$)/i);

  return (
    <div className={styles.imageField}>
      <label className={styles.fieldLabel}>{label}</label>
      {hint && <p className={styles.fieldHint}>{hint}</p>}
      <div className={styles.imageFieldRow}>
        <input
          type="text"
          className={styles.input}
          value={value}
          placeholder="https://... или /uploads/banner/..."
          onChange={e => onChange(e.target.value)}
        />
        <label className={`${styles.uploadBtn} ${uploading ? styles.uploadBtnLoading : ''}`} title="Загрузить файл">
          {uploading ? '…' : '📁'}
          <input ref={ref} type="file" accept={accept} style={{ display: 'none' }} onChange={handleFile} />
        </label>
        {value && <button type="button" className={styles.clearBtn} onClick={() => onChange('')} title="Очистить">✕</button>}
      </div>
      {error && <p className={styles.fieldError}>{error}</p>}
      {value && !isVideoValue && (
        <div className={styles.imagePreview}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="preview" className={styles.imagePreviewImg}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      )}
      {value && isVideoValue && (
        <p className={styles.videoNote}>🎬 Видео: <code>{value}</code></p>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminBannerEditor() {
  const [d, setD] = useState<HomeBannerContent>(defaultHomeBanner);
  const [activeTab, setActiveTab] = useState<BannerTab>('texts');
  const [statusMsg, setStatusMsg] = useState('');
  const [exportJson, setExportJson] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setD(JSON.parse(raw) as HomeBannerContent);
    } catch { /* ignore */ }
  }, []);

  const showStatus = (msg: string) => { setStatusMsg(msg); setTimeout(() => setStatusMsg(''), 3000); };

  const save = () => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(d)); showStatus('Баннер сохранён'); }
    catch { showStatus('Ошибка сохранения'); }
  };

  const reset = () => {
    setD(defaultHomeBanner);
    try { localStorage.removeItem(LS_KEY); } catch { /* ignore */ }
    showStatus('Сброшено к данным проекта');
  };

  const set = <K extends keyof HomeBannerContent>(k: K, v: HomeBannerContent[K]) =>
    setD(p => ({ ...p, [k]: v }));

  // Badges
  const updateBadge = (i: number, f: keyof BannerBadge, val: string) =>
    setD(p => ({ ...p, badges: p.badges.map((b, idx) => idx === i ? { ...b, [f]: val } : b) }));
  const addBadge = () => setD(p => ({ ...p, badges: [...p.badges, { title: '', text: '' }] }));
  const removeBadge = (i: number) => setD(p => ({ ...p, badges: p.badges.filter((_, idx) => idx !== i) }));
  const moveBadge = (i: number, dir: -1 | 1) => {
    setD(p => {
      const arr = [...p.badges];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return p;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...p, badges: arr };
    });
  };

  // CTAs
  const updateCta = (i: number, f: keyof BannerCta, val: string) =>
    setD(p => ({ ...p, ctas: p.ctas.map((c, idx) => idx === i ? { ...c, [f]: val } : c) }));
  const addCta = () => setD(p => ({ ...p, ctas: [...p.ctas, { label: '', href: '#', variant: 'primary' as const }] }));
  const removeCta = (i: number) => setD(p => ({ ...p, ctas: p.ctas.filter((_, idx) => idx !== i) }));
  const moveCta = (i: number, dir: -1 | 1) => {
    setD(p => {
      const arr = [...p.ctas];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return p;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...p, ctas: arr };
    });
  };

  const BANNER_TABS: { id: BannerTab; label: string }[] = [
    { id: 'texts',    label: 'Тексты' },
    { id: 'position', label: 'Позиция' },
    { id: 'buttons',  label: 'Кнопки' },
    { id: 'badges',   label: 'Преимущества' },
    { id: 'media',    label: 'Медиа' },
  ];

  return (
    <div className={styles.editor}>
      {statusMsg && <div className={styles.statusBar}>{statusMsg}</div>}

      {/* Sticky save bar */}
      <div className={styles.saveBar}>
        <span className={styles.saveBarTitle}>Баннер главной страницы</span>
        <div className={styles.saveBarActions}>
          <button type="button" className={styles.btnSecondary} onClick={reset}>↩ Сбросить</button>
          <button type="button" className={styles.btnPrimary} onClick={save}>💾 Сохранить баннер</button>
        </div>
      </div>

      <div className={styles.seoNotice}>
        Изменения применяются к главной странице только в этом браузере. H1 виден посетителям, но title/description в &lt;head&gt; меняются только через код.
      </div>

      {/* Sub-tabs */}
      <div className={styles.subTabBar}>
        {BANNER_TABS.map(t => (
          <button
            key={t.id}
            type="button"
            className={`${styles.subTab} ${activeTab === t.id ? styles.subTabActive : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.tabBody}>

        {/* ── Тексты ── */}
        {activeTab === 'texts' && (
          <div className={styles.section}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Надзаголовок (eyebrow)</label>
              <input className={styles.input} value={d.eyebrow ?? ''} placeholder="Например: B2B производство" onChange={e => set('eyebrow', e.target.value)} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>H1 баннера *</label>
              <textarea className={styles.textarea} rows={2} value={d.title} onChange={e => set('title', e.target.value)} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Подзаголовок</label>
              <textarea className={styles.textarea} rows={3} value={d.subtitle} onChange={e => set('subtitle', e.target.value)} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Подпись к медиа (fallback label)</label>
              <input className={styles.input} value={d.mediaLabel ?? ''} onChange={e => set('mediaLabel', e.target.value)} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>
                Баннер активен&nbsp;
                <input type="checkbox" checked={d.isActive} onChange={e => set('isActive', e.target.checked)} />
              </label>
            </div>
          </div>
        )}

        {/* ── Позиция ── */}
        {activeTab === 'position' && (
          <div className={styles.section}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Положение текста</label>
              <select
                className={styles.input}
                value={d.textPosition ?? 'left-center'}
                onChange={e => set('textPosition', e.target.value as BannerTextPosition)}
              >
                {POSITION_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>
                Затемнение фона: <strong>{Math.round((d.overlayOpacity ?? 0.55) * 100)}%</strong>
              </label>
              <input
                type="range"
                min={0}
                max={0.9}
                step={0.05}
                value={d.overlayOpacity ?? 0.55}
                onChange={e => set('overlayOpacity', Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0f172a' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
                <span>0% (прозрачно)</span>
                <span>90% (почти чёрный)</span>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Максимальная ширина блока текста</label>
              <input
                className={styles.input}
                value={d.textMaxWidth ?? '680px'}
                placeholder="680px"
                onChange={e => set('textMaxWidth', e.target.value)}
              />
              <p className={styles.fieldHint}>Например: 680px, 50%, 800px. Ограничивает ширину текстового блока поверх баннера.</p>
            </div>
          </div>
        )}

        {/* ── Кнопки ── */}
        {activeTab === 'buttons' && (
          <div className={styles.section}>
            {d.ctas.length === 0 && <p className={styles.emptyNote}>Кнопок нет. Нажмите «+ Добавить».</p>}
            {d.ctas.map((c, i) => (
              <div key={i} className={styles.listCard}>
                <div className={styles.listCardHeader}>
                  <span className={styles.listCardTitle}>Кнопка {i + 1}</span>
                  <div className={styles.listCardActions}>
                    <button type="button" className={styles.btnMini} onClick={() => moveCta(i, -1)} disabled={i === 0}>↑</button>
                    <button type="button" className={styles.btnMini} onClick={() => moveCta(i, 1)} disabled={i === d.ctas.length - 1}>↓</button>
                    <button type="button" className={styles.btnDangerSm} onClick={() => removeCta(i)}>✕</button>
                  </div>
                </div>
                <div className={styles.row2}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Текст кнопки</label>
                    <input className={styles.input} value={c.label} onChange={e => updateCta(i, 'label', e.target.value)} />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Ссылка href</label>
                    <input className={styles.input} value={c.href} onChange={e => updateCta(i, 'href', e.target.value)} />
                  </div>
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Вид кнопки</label>
                  <select className={styles.input} value={c.variant} onChange={e => updateCta(i, 'variant', e.target.value)}>
                    <option value="primary">Primary (основная)</option>
                    <option value="secondary">Secondary (вторичная)</option>
                  </select>
                </div>
              </div>
            ))}
            <button type="button" className={styles.btnAddFull} onClick={addCta}>+ Добавить кнопку</button>
          </div>
        )}

        {/* ── Преимущества ── */}
        {activeTab === 'badges' && (
          <div className={styles.section}>
            {d.badges.length === 0 && <p className={styles.emptyNote}>Преимуществ нет. Нажмите «+ Добавить».</p>}
            {d.badges.map((b, i) => (
              <div key={i} className={styles.listCard}>
                <div className={styles.listCardHeader}>
                  <span className={styles.listCardTitle}>Преимущество {i + 1}</span>
                  <div className={styles.listCardActions}>
                    <button type="button" className={styles.btnMini} onClick={() => moveBadge(i, -1)} disabled={i === 0}>↑</button>
                    <button type="button" className={styles.btnMini} onClick={() => moveBadge(i, 1)} disabled={i === d.badges.length - 1}>↓</button>
                    <button type="button" className={styles.btnDangerSm} onClick={() => removeBadge(i)}>✕</button>
                  </div>
                </div>
                <div className={styles.row2}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Иконка / заголовок</label>
                    <input className={styles.input} value={b.title} placeholder="🏭" onChange={e => updateBadge(i, 'title', e.target.value)} />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Текст</label>
                    <input className={styles.input} value={b.text} onChange={e => updateBadge(i, 'text', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className={styles.btnAddFull} onClick={addBadge}>+ Добавить преимущество</button>
          </div>
        )}

        {/* ── Медиа ── */}
        {activeTab === 'media' && (
          <div className={styles.section}>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Тип медиа</label>
              <select className={styles.input} value={d.mediaType} onChange={e => set('mediaType', e.target.value as 'video' | 'image')}>
                <option value="video">Видео</option>
                <option value="image">Изображение</option>
              </select>
            </div>

            {d.mediaType === 'video' && (
              <>
                <UploadField
                  label="Видео (MP4/WebM/MOV)"
                  value={d.videoSrc ?? ''}
                  onChange={url => set('videoSrc', url)}
                  folder="banner"
                  accept="video/mp4,video/webm,video/quicktime"
                  maxMb={500}
                  hint="Рекомендуется MP4, до 500 МБ"
                />
                <UploadField
                  label="Постер (изображение для паузы/загрузки)"
                  value={d.posterSrc ?? ''}
                  onChange={url => set('posterSrc', url)}
                  folder="banner"
                  accept="image/jpeg,image/png,image/webp"
                  maxMb={5}
                  hint="JPG или PNG, до 5 МБ"
                />
              </>
            )}

            {d.mediaType === 'image' && (
              <UploadField
                label="Изображение баннера"
                value={d.imageSrc ?? ''}
                onChange={url => set('imageSrc', url)}
                folder="banner"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                maxMb={50}
                hint="JPG, PNG, WebP или SVG, до 50 МБ"
              />
            )}
          </div>
        )}
      </div>

      {/* Bottom save button */}
      <div className={styles.bottomBar}>
        <button type="button" className={styles.btnPrimaryLg} onClick={save}>💾 Сохранить баннер</button>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>После сохранения обновите главную страницу в браузере</span>
      </div>

      {/* JSON tools */}
      <details className={styles.advanced}>
        <summary className={styles.advancedSummary}>Экспорт / Импорт JSON</summary>
        <div className={styles.advancedBody}>
          <div className={styles.advancedRow}>
            <button type="button" className={styles.btnSecondary} onClick={() => setExportJson(JSON.stringify(d, null, 2))}>📤 Экспорт</button>
          </div>
          {exportJson && <textarea className={styles.jsonTextarea} rows={8} value={exportJson} readOnly />}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Импорт JSON</label>
            <textarea className={styles.jsonTextarea} rows={3} onChange={e => { try { setD(JSON.parse(e.target.value) as HomeBannerContent); showStatus('Импортировано'); } catch { /* ignore */ } }} />
          </div>
        </div>
      </details>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react';
import { portfolioCases } from '@/lib/portfolio';
import type { PortfolioCase } from '@/lib/portfolio';
import {
  DEFAULT_PORTFOLIO_FILTERS,
  FILTERS_LS_KEY,
  loadPortfolioFilters,
  slugifyFilterValue,
} from '@/lib/portfolioFilters';
import type { PortfolioFilter } from '@/lib/portfolioFilters';
import { catalogCategories } from '@/lib/catalog';
import { brandingMethods } from '@/lib/branding';
import styles from './AdminPortfolioEditor.module.css';

const LS_KEY = 'teeon_admin_portfolio_cases';

function uid() { return `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`; }
function toLines(arr: string[]) { return arr.join('\n'); }
function fromLines(s: string) { return s.split('\n').map(l => l.trim()).filter(Boolean); }

// ── Types ──────────────────────────────────────────────────────────────────────
export interface PortfolioCaseProduct {
  id: string;
  title: string;
  categorySlug?: string;
  description: string;
  quantity?: string;
  material?: string;
  color?: string;
  branding?: string[];
  characteristics: string[];
  images: string[];
  sortOrder: number;
  isActive: boolean;
  tags?: string[];
}

type AdminCase = PortfolioCase & {
  coverImage?: string;
  galleryImages?: string[];
  caseProducts?: PortfolioCaseProduct[];
  sortOrder?: number;
  isActive?: boolean;
};

function emptyProduct(order = 1): PortfolioCaseProduct {
  return { id: uid(), title: '', description: '', characteristics: [], images: [], branding: [], tags: [], sortOrder: order, isActive: true };
}

function emptyCase(order = 1): AdminCase {
  return {
    slug: `case-${uid()}`, title: '', shortTitle: '', clientType: '', industry: '',
    task: '', result: '', description: '', products: [], technologies: [],
    quantity: '', timeline: '', year: new Date().getFullYear(),
    coverLabel: '', galleryLabels: [], seoTitle: '', seoDescription: '',
    tags: [], relatedCatalog: [], relatedBranding: [],
    coverImage: '', galleryImages: [], caseProducts: [], sortOrder: order, isActive: true,
  };
}

// ── ImageField ─────────────────────────────────────────────────────────────────
interface ImageFieldProps { label: string; value: string; onChange: (url: string) => void; folder?: string; compact?: boolean; }
function ImageField({ label, value, onChange, folder = 'portfolio', compact = false }: ImageFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const handleFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true); setError('');
    const fd = new FormData(); fd.append('file', file); fd.append('folder', folder);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd, credentials: 'same-origin' });
      const json = await res.json() as { success?: boolean; url?: string; message?: string };
      if (res.status === 401) throw new Error('Сессия истекла, войдите заново.');
      if (!res.ok || !json.url) throw new Error(json.message ?? 'Ошибка загрузки');
      onChange(json.url);
    } catch (err) { setError(err instanceof Error ? err.message : 'Ошибка загрузки'); }
    finally { setUploading(false); if (ref.current) ref.current.value = ''; }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder]);
  return (
    <div className={styles.imageField}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.imageFieldRow}>
        <input type="text" className={styles.input} value={value} placeholder="/uploads/portfolio/..." onChange={e => onChange(e.target.value)} />
        <label className={`${styles.uploadBtn} ${uploading ? styles.uploadBtnLoading : ''}`}>
          {uploading ? '…' : '📁'}
          <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" style={{ display: 'none' }} onChange={handleFile} />
        </label>
      </div>
      {error && <p className={styles.fieldError}>{error}</p>}
      {value && !compact && (
        <div>
          <div className={styles.imagePreview}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="preview" className={styles.imagePreviewImg}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <button type="button" className={styles.btnDangerSm} onClick={() => onChange('')}>
              Удалить изображение
            </button>
            <a href={value} target="_blank" rel="noopener noreferrer" className={styles.btnSmall}>
              Открыть
            </a>
          </div>
        </div>
      )}
      {value && compact && (
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</div>
      )}
      {!value && !compact && (
        <div style={{ padding: '8px 10px', background: '#f8fafc', border: '1.5px dashed #e2e8f0', borderRadius: 7, fontSize: 12, color: '#94a3b8' }}>
          Изображение не добавлено
        </div>
      )}
    </div>
  );
}

// ── GalleryEditor ──────────────────────────────────────────────────────────────
interface GalleryEditorProps { images: string[]; onChange: (imgs: string[]) => void; folder?: string; }
function GalleryEditor({ images, onChange, folder = 'portfolio' }: GalleryEditorProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const handleFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true); setError('');
    const fd = new FormData(); fd.append('file', file); fd.append('folder', folder);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd, credentials: 'same-origin' });
      const json = await res.json() as { success?: boolean; url?: string; message?: string };
      if (res.status === 401) throw new Error('Сессия истекла, войдите заново.');
      if (!res.ok || !json.url) throw new Error(json.message ?? 'Ошибка загрузки');
      onChange([...images, json.url]);
    } catch (err) { setError(err instanceof Error ? err.message : 'Ошибка'); }
    finally { setUploading(false); if (ref.current) ref.current.value = ''; }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images, folder]);
  const addUrl = () => onChange([...images, '']);
  const removeImg = (i: number) => onChange(images.filter((_, idx) => idx !== i));
  const updateUrl = (i: number, val: string) => onChange(images.map((u, idx) => idx === i ? val : u));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {images.map((url, i) => (
          <div key={i} style={{ width: 90, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ width: 90, height: 70, borderRadius: 6, overflow: 'hidden', border: '1.5px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : <span style={{ fontSize: 20, color: '#94a3b8' }}>📷</span>}
            </div>
            <input style={{ fontSize: 10, padding: '3px 6px', border: '1px solid #e2e8f0', borderRadius: 4, width: '100%', boxSizing: 'border-box' }} value={url} placeholder="URL..." onChange={e => updateUrl(i, e.target.value)} />
            <button type="button" className={styles.btnDangerSm} onClick={() => removeImg(i)} style={{ width: '100%', justifyContent: 'center' }}>Удалить</button>
          </div>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label style={{ width: 90, height: 70, borderRadius: 6, border: '2px dashed #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column', gap: 4, fontSize: 11, color: '#64748b' }}>
            {uploading ? '…' : <>📁<span>Загрузить</span></>}
            <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" style={{ display: 'none' }} onChange={handleFile} />
          </label>
          <button type="button" className={styles.btnSmall} onClick={addUrl}>+ URL</button>
        </div>
      </div>
      {error && <p className={styles.fieldError}>{error}</p>}
    </div>
  );
}

// ── LineListEditor ─────────────────────────────────────────────────────────────
interface LineListEditorProps { value: string[]; onChange: (v: string[]) => void; placeholder?: string; }
function LineListEditor({ value, onChange, placeholder = 'Добавить…' }: LineListEditorProps) {
  const [text, setText] = useState('');
  const add = () => {
    const v = text.trim();
    if (!v || value.includes(v)) { setText(''); return; }
    onChange([...value, v]);
    setText('');
  };
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {value.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {value.map((item, i) => (
            <div key={`${i}-${item}`} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', border: '1.5px solid #e2e8f0', borderRadius: 7, background: '#f8fafc' }}>
              <span style={{ flex: 1, fontSize: 13, color: '#0f172a' }}>{item}</span>
              <button type="button" className={styles.btnDangerSm} onClick={() => remove(i)} aria-label="Удалить">✕</button>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <input
          className={styles.input}
          style={{ flex: 1 }}
          placeholder={placeholder}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
        />
        <button type="button" className={styles.btnSmall} onClick={add}>+ Добавить</button>
      </div>
    </div>
  );
}

// ── BrandingPicker ─────────────────────────────────────────────────────────────
interface BrandingPickerProps {
  branding: string[];
  tags: string[];
  onChange: (next: { branding: string[]; tags: string[] }) => void;
}
function BrandingPicker({ branding, tags, onChange }: BrandingPickerProps) {
  const [custom, setCustom] = useState('');
  const knownTitles = new Set(brandingMethods.map(m => m.title));
  const has = (t: string) => branding.includes(t);
  const toggle = (title: string, slug: string) => {
    const nextBranding = new Set(branding);
    const nextTags = new Set(tags);
    if (nextBranding.has(title)) {
      nextBranding.delete(title);
      nextTags.delete(slug);
    } else {
      nextBranding.add(title);
      nextTags.add(slug);
    }
    onChange({ branding: Array.from(nextBranding), tags: Array.from(nextTags) });
  };
  const remove = (t: string) => {
    const slug = brandingMethods.find(m => m.title === t)?.slug;
    onChange({
      branding: branding.filter(v => v !== t),
      tags: slug ? tags.filter(v => v !== slug) : tags,
    });
  };
  const addCustom = () => {
    const v = custom.trim();
    if (!v || branding.includes(v)) { setCustom(''); return; }
    onChange({ branding: [...branding, v], tags });
    setCustom('');
  };
  const customs = branding.filter(v => !knownTitles.has(v));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {brandingMethods.map(m => {
          const checked = has(m.title);
          return (
            <label
              key={m.slug}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 10px', borderRadius: 999,
                border: `1.5px solid ${checked ? '#0f172a' : '#e2e8f0'}`,
                background: checked ? '#0f172a' : '#fff',
                color: checked ? '#fff' : '#0f172a',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}
            >
              <input type="checkbox" checked={checked} onChange={() => toggle(m.title, m.slug)} style={{ margin: 0 }} />
              {m.title}
            </label>
          );
        })}
      </div>
      {customs.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {customs.map(c => (
            <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 8px 4px 10px', border: '1.5px solid #94a3b8', borderRadius: 999, background: '#f8fafc', color: '#0f172a', fontSize: 12, fontWeight: 600 }}>
              {c}
              <button type="button" onClick={() => remove(c)} aria-label={`Убрать ${c}`} style={{ border: 0, background: 'transparent', cursor: 'pointer', color: '#64748b', fontSize: 14, lineHeight: 1, padding: '0 2px' }}>×</button>
            </span>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <input
          className={styles.input}
          style={{ flex: '0 0 220px' }}
          placeholder="Своё нанесение…"
          value={custom}
          onChange={e => setCustom(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustom(); } }}
        />
        <button type="button" className={styles.btnSmall} onClick={addCustom}>+ Добавить</button>
      </div>
    </div>
  );
}

// ── ProductEditor ──────────────────────────────────────────────────────────────
interface ProductEditorProps {
  products: PortfolioCaseProduct[];
  onChange: (p: PortfolioCaseProduct[]) => void;
  filters: PortfolioFilter[];
}
function ProductEditor({ products, onChange, filters }: ProductEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<PortfolioCaseProduct | null>(null);

  const startEdit = (p: PortfolioCaseProduct) => { setEditingId(p.id); setDraft({ ...p }); };
  const saveEdit = () => {
    if (!draft) return;
    onChange(products.map(p => p.id === draft.id ? draft : p));
    setEditingId(null); setDraft(null);
  };
  const cancelEdit = () => { setEditingId(null); setDraft(null); };
  const addProduct = () => {
    const p = emptyProduct(products.length + 1);
    onChange([...products, p]);
    setEditingId(p.id); setDraft({ ...p });
  };
  const deleteProduct = (id: string) => {
    if (!confirm('Удалить изделие?')) return;
    onChange(products.filter(p => p.id !== id));
    if (editingId === id) { setEditingId(null); setDraft(null); }
  };
  const duplicateProduct = (p: PortfolioCaseProduct) => {
    const copy = { ...JSON.parse(JSON.stringify(p)) as PortfolioCaseProduct, id: uid(), title: `${p.title} (копия)`, sortOrder: products.length + 1 };
    onChange([...products, copy]);
  };
  const setD = <K extends keyof PortfolioCaseProduct>(k: K, v: PortfolioCaseProduct[K]) =>
    setDraft(d => d ? { ...d, [k]: v } : d);

  if (editingId && draft) {
    return (
      <div style={{ border: '1.5px solid #0f172a', borderRadius: 10, overflow: 'hidden' }}>
        <div className={styles.formHeader}>
          <span className={styles.formTitle}>Изделие: {draft.title || '(без названия)'}</span>
          <div className={styles.formActions}>
            <button type="button" className={styles.btnSecondary} onClick={cancelEdit}>Отмена</button>
            <button type="button" className={styles.btnDanger} onClick={() => deleteProduct(draft.id)}>Удалить</button>
            <button type="button" className={styles.btnPrimary} onClick={saveEdit}>Сохранить изделие</button>
          </div>
        </div>
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className={styles.row2}>
            <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Название изделия *</label><input className={styles.input} value={draft.title} onChange={e => setD('title', e.target.value)} /></div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Категория товара</label>
              <select
                className={styles.input}
                value={draft.categorySlug ?? ''}
                onChange={e => {
                  const nextSlug = e.target.value || undefined;
                  const knownSlugs = new Set(catalogCategories.map(c => c.slug));
                  setDraft(d => {
                    if (!d) return d;
                    // Drop any previous known-category slug from tags, then add the new one if known.
                    const filtered = (d.tags ?? []).filter(t => !knownSlugs.has(t) || t === nextSlug);
                    const nextTags = nextSlug && knownSlugs.has(nextSlug) && !filtered.includes(nextSlug)
                      ? [...filtered, nextSlug]
                      : filtered;
                    return { ...d, categorySlug: nextSlug, tags: nextTags };
                  });
                }}
              >
                <option value="">— не выбрано —</option>
                {catalogCategories.map(cat => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
                {draft.categorySlug && !catalogCategories.some(c => c.slug === draft.categorySlug) && (
                  <option value={draft.categorySlug}>{draft.categorySlug} (старая)</option>
                )}
              </select>
            </div>
          </div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Описание</label><textarea className={styles.textarea} rows={2} value={draft.description} onChange={e => setD('description', e.target.value)} /></div>
          <div className={styles.row2}>
            <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Количество</label><input className={styles.input} value={draft.quantity ?? ''} placeholder="150 шт." onChange={e => setD('quantity', e.target.value)} /></div>
            <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Материал</label><input className={styles.input} value={draft.material ?? ''} onChange={e => setD('material', e.target.value)} /></div>
          </div>
          <div className={styles.row2}>
            <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Цвет</label><input className={styles.input} value={draft.color ?? ''} onChange={e => setD('color', e.target.value)} /></div>
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>Нанесение <span className={styles.fieldHint}>(тег)</span></label>
              <BrandingPicker
                branding={draft.branding ?? []}
                tags={draft.tags ?? []}
                onChange={({ branding, tags }) => setDraft(d => d ? { ...d, branding, tags } : d)}
              />
            </div>
          </div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Характеристики <span className={styles.fieldHint}>(по строке)</span></label><textarea className={styles.textarea} rows={3} value={toLines(draft.characteristics)} onChange={e => setD('characteristics', fromLines(e.target.value))} /></div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Фото изделия</label>
            <GalleryEditor images={draft.images} onChange={imgs => setD('images', imgs)} />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>
              Фильтры портфолио <span className={styles.fieldHint}>(в каких фильтрах будет появляться изделие)</span>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {filters.map((f) => {
                const checked = (draft.tags ?? []).includes(f.value);
                return (
                  <label
                    key={f.value}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '5px 10px', borderRadius: 999,
                      border: `1.5px solid ${checked ? '#0f172a' : '#e2e8f0'}`,
                      background: checked ? '#0f172a' : '#fff',
                      color: checked ? '#fff' : '#0f172a',
                      fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        const cur = new Set(draft.tags ?? []);
                        if (e.target.checked) cur.add(f.value); else cur.delete(f.value);
                        setD('tags', Array.from(cur));
                      }}
                      style={{ margin: 0 }}
                    />
                    {f.label}
                  </label>
                );
              })}
              {filters.length === 0 && (
                <span className={styles.fieldHint}>Нет фильтров — добавьте их в секции «Фильтры портфолио» вверху.</span>
              )}
            </div>
          </div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Активно <input type="checkbox" checked={draft.isActive} onChange={e => setD('isActive', e.target.checked)} /></label></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {products.length === 0 && <p className={styles.emptyNote}>Нет изделий. Добавьте первое.</p>}
      {products.map(p => (
        <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, background: '#f8fafc' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{p.title || '(без названия)'}</span>
            {p.categorySlug && <span style={{ fontSize: 11, color: '#64748b', marginLeft: 8 }}>{catalogCategories.find(c => c.slug === p.categorySlug)?.name ?? p.categorySlug}</span>}
            {p.images.length > 0 && <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 8 }}>{p.images.length} фото</span>}
            {(p.tags?.length ?? 0) > 0 && (
              <span style={{ fontSize: 11, color: '#0f172a', marginLeft: 8 }}>
                · {(p.tags ?? []).map((t) => filters.find((f) => f.value === t)?.label ?? t).join(', ')}
              </span>
            )}
          </div>
          <button type="button" className={styles.btnSmall} onClick={() => startEdit(p)}>Редактировать</button>
          <button type="button" className={styles.btnSmall} onClick={() => duplicateProduct(p)}>Копия</button>
          <button type="button" className={styles.btnDangerSm} onClick={() => deleteProduct(p.id)}>✕</button>
        </div>
      ))}
      <button type="button" className={styles.btnAddSm} onClick={addProduct} style={{ alignSelf: 'flex-start', padding: '7px 14px', fontSize: 13 }}>+ Добавить изделие</button>
    </div>
  );
}

// ── CaseForm ───────────────────────────────────────────────────────────────────
interface CaseFormProps {
  caseItem: AdminCase; isNew: boolean;
  onSave: (c: AdminCase) => void; onCancel: () => void;
  onDelete: () => void; onDuplicate: () => void;
  filters: PortfolioFilter[];
}
function CaseForm({ caseItem, isNew, onSave, onCancel, onDelete, onDuplicate, filters }: CaseFormProps) {
  const [d, setD] = useState<AdminCase>(caseItem);
  const set = <K extends keyof AdminCase>(k: K, v: AdminCase[K]) => setD(p => ({ ...p, [k]: v }));

  return (
    <div className={styles.formCol}>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>{isNew ? 'Новый кейс' : (d.title || '(без названия)')}</h3>
        <div className={styles.formActions}>
          <button type="button" className={styles.btnSecondary} onClick={onCancel}>Отмена</button>
          {!isNew && <><button type="button" className={styles.btnSecondary} onClick={onDuplicate}>Дублировать</button><button type="button" className={styles.btnDanger} onClick={onDelete}>Удалить</button></>}
          <button type="button" className={styles.btnPrimary} onClick={() => onSave(d)}>{isNew ? 'Создать кейс' : 'Сохранить кейс'}</button>
        </div>
      </div>
      <div className={styles.formBody}>
        {isNew && <div className={styles.alertWarning}>Новый кейс появится в портфолио локально. Для production-страницы с новым slug нужен перенос в lib/portfolio.ts или CMS/backend.</div>}

        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Заголовок *</label><input className={styles.input} value={d.title} onChange={e => set('title', e.target.value)} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Короткий заголовок</label><input className={styles.input} value={d.shortTitle} onChange={e => set('shortTitle', e.target.value)} /></div>
        </div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Slug</label><input className={styles.input} value={d.slug} onChange={e => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Тип клиента</label><input className={styles.input} value={d.clientType} onChange={e => set('clientType', e.target.value)} /></div>
        </div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Отрасль</label><input className={styles.input} value={d.industry} onChange={e => set('industry', e.target.value)} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Год</label><input type="number" className={styles.input} value={d.year} onChange={e => set('year', Number(e.target.value))} /></div>
        </div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Тираж</label><input className={styles.input} value={d.quantity} onChange={e => set('quantity', e.target.value)} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Срок</label><input className={styles.input} value={d.timeline} onChange={e => set('timeline', e.target.value)} /></div>
        </div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Задача</label><textarea className={styles.textarea} rows={3} value={d.task} onChange={e => set('task', e.target.value)} /></div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Результат</label><textarea className={styles.textarea} rows={2} value={d.result} onChange={e => set('result', e.target.value)} /></div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Описание</label><textarea className={styles.textarea} rows={3} value={d.description} onChange={e => set('description', e.target.value)} /></div>

        <div className={styles.divider}>Изделия в заказе</div>
        <div className={styles.fieldHint} style={{ marginBottom: 10 }}>
          Главный блок страницы кейса. Картинки изделий показываются здесь и используются
          как превью в листинге портфолио и на главной (вместо силуэта‑заглушки).
        </div>
        <ProductEditor products={d.caseProducts ?? []} onChange={prods => set('caseProducts', prods)} filters={filters} />

        <div className={styles.divider}>Характеристики</div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Изделия</label>
            <LineListEditor value={d.products} onChange={v => set('products', v)} placeholder="Например: Худи, Свитшоты" />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Технологии</label>
            <LineListEditor value={d.technologies} onChange={v => set('technologies', v)} placeholder="Например: Вышивка, Шелкография" />
          </div>
        </div>

        <div className={styles.divider}>Изображения (опционально)</div>
        <div className={styles.fieldHint} style={{ marginBottom: 10 }}>
          Cover и галерея больше не отображаются над «Изделиями в заказе». Cover используется
          только как fallback‑превью в листинге, если у кейса нет изделий с фото. Галерея
          выводится отдельным блоком на странице кейса (если заполнена).
        </div>
        <ImageField label="Главное изображение (cover, fallback)" value={d.coverImage ?? ''} onChange={url => set('coverImage', url)} />
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Галерея изображений</label>
          <GalleryEditor images={d.galleryImages ?? []} onChange={imgs => set('galleryImages', imgs)} />
        </div>

        <div className={styles.divider}>SEO</div>
        <div className={styles.seoNotice}>SEO-данные видны только локально. Для публикации нужно перенести в lib/portfolio.ts.</div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>SEO Title</label><input className={styles.input} value={d.seoTitle} onChange={e => set('seoTitle', e.target.value)} /></div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>SEO Description</label><textarea className={styles.textarea} rows={2} value={d.seoDescription} onChange={e => set('seoDescription', e.target.value)} /></div>

        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Активен <input type="checkbox" checked={d.isActive !== false} onChange={e => set('isActive', e.target.checked)} /></label></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Сортировка <input type="number" className={styles.inputSm} value={d.sortOrder ?? 1} min={1} onChange={e => set('sortOrder', Number(e.target.value))} /></label></div>
        </div>
      </div>
    </div>
  );
}

// ── FilterManager ──────────────────────────────────────────────────────────────
interface FilterManagerProps {
  filters: PortfolioFilter[];
  onChange: (next: PortfolioFilter[]) => void;
  onStatus: (msg: string) => void;
}
function FilterManager({ filters, onChange, onStatus }: FilterManagerProps) {
  const [open, setOpen] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editValue, setEditValue] = useState('');

  const addFilter = () => {
    const label = newLabel.trim();
    if (!label) { onStatus('Введите название фильтра'); return; }
    const value = (newValue.trim() || slugifyFilterValue(label)).trim();
    if (!value) { onStatus('Не получилось получить slug'); return; }
    if (filters.some((f) => f.value === value)) { onStatus(`Фильтр «${value}» уже есть`); return; }
    onChange([...filters, { value, label }]);
    setNewLabel(''); setNewValue('');
    onStatus('Фильтр добавлен');
  };

  const startEdit = (i: number) => {
    setEditIdx(i);
    setEditLabel(filters[i].label);
    setEditValue(filters[i].value);
  };

  const saveEdit = () => {
    if (editIdx === null) return;
    const label = editLabel.trim();
    const value = editValue.trim();
    if (!label || !value) { onStatus('Заполните название и slug'); return; }
    if (filters.some((f, i) => f.value === value && i !== editIdx)) {
      onStatus(`Slug «${value}» уже занят`); return;
    }
    const next = filters.map((f, i) => i === editIdx ? { value, label } : f);
    onChange(next);
    setEditIdx(null);
    onStatus('Фильтр обновлён');
  };

  const removeFilter = (i: number) => {
    if (!confirm(`Удалить фильтр «${filters[i].label}»?`)) return;
    onChange(filters.filter((_, idx) => idx !== i));
    if (editIdx === i) setEditIdx(null);
    onStatus('Фильтр удалён');
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= filters.length) return;
    const next = [...filters];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  const resetDefaults = () => {
    if (!confirm('Сбросить фильтры к значениям по умолчанию?')) return;
    onChange(DEFAULT_PORTFOLIO_FILTERS);
    onStatus('Фильтры сброшены');
  };

  return (
    <details open={open} onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)} style={{ marginBottom: 12, border: '1.5px solid #e2e8f0', borderRadius: 10, background: '#fff' }}>
      <summary style={{ padding: '12px 16px', cursor: 'pointer', fontSize: 14, fontWeight: 700, color: '#0f172a', listStyle: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span>Фильтры портфолио</span>
        <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}>· {filters.length} шт.</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#64748b', fontWeight: 500 }}>{open ? 'Свернуть' : 'Развернуть'}</span>
      </summary>
      <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p className={styles.fieldHint} style={{ marginTop: 4 }}>
          Список чипов в фильтре над сеткой кейсов. Изделия попадают в фильтр, если
          у них проставлен соответствующий тег (выбирается в карточке изделия).
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filters.map((f, i) => (
            <div key={`${f.value}-${i}`} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', border: '1px solid #e2e8f0', borderRadius: 8, background: '#f8fafc' }}>
              {editIdx === i ? (
                <>
                  <input className={styles.input} value={editLabel} onChange={(e) => setEditLabel(e.target.value)} placeholder="Название" style={{ flex: 2 }} />
                  <input className={styles.input} value={editValue} onChange={(e) => setEditValue(e.target.value)} placeholder="slug" style={{ flex: 1 }} />
                  <button type="button" className={styles.btnPrimary} onClick={saveEdit}>Сохранить</button>
                  <button type="button" className={styles.btnSecondary} onClick={() => setEditIdx(null)}>Отмена</button>
                </>
              ) : (
                <>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', minWidth: 140 }}>{f.label}</span>
                  <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>{f.value}</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                    <button type="button" className={styles.btnSmall} onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
                    <button type="button" className={styles.btnSmall} onClick={() => move(i, 1)} disabled={i === filters.length - 1}>↓</button>
                    <button type="button" className={styles.btnSmall} onClick={() => startEdit(i)}>Редактировать</button>
                    <button type="button" className={styles.btnDangerSm} onClick={() => removeFilter(i)}>✕</button>
                  </div>
                </>
              )}
            </div>
          ))}
          {filters.length === 0 && <div className={styles.colEmpty}>Фильтры пусты</div>}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, padding: '10px', border: '1.5px dashed #cbd5e1', borderRadius: 8 }}>
          <div className={styles.fieldGroup} style={{ flex: 2 }}>
            <label className={styles.fieldLabel}>Название</label>
            <input className={styles.input} value={newLabel} placeholder="Например: Лонгсливы" onChange={(e) => setNewLabel(e.target.value)} />
          </div>
          <div className={styles.fieldGroup} style={{ flex: 1 }}>
            <label className={styles.fieldLabel}>Slug <span className={styles.fieldHint}>(авто из названия)</span></label>
            <input className={styles.input} value={newValue} placeholder="longslivy" onChange={(e) => setNewValue(e.target.value)} />
          </div>
          <button type="button" className={styles.btnPrimary} onClick={addFilter}>+ Добавить</button>
        </div>

        <div>
          <button type="button" className={styles.btnSecondary} onClick={resetDefaults}>↩ Сбросить к значениям по умолчанию</button>
        </div>
      </div>
    </details>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function AdminPortfolioEditor() {
  const [cases, setCases] = useState<AdminCase[]>(portfolioCases as AdminCase[]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [exportJson, setExportJson] = useState('');
  const [filters, setFilters] = useState<PortfolioFilter[]>(DEFAULT_PORTFOLIO_FILTERS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setCases(JSON.parse(raw) as AdminCase[]);
    } catch { /* ignore */ }
    setFilters(loadPortfolioFilters());
  }, []);

  const persistFilters = (next: PortfolioFilter[]) => {
    setFilters(next);
    try { localStorage.setItem(FILTERS_LS_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const showStatus = (msg: string) => { setStatusMsg(msg); setTimeout(() => setStatusMsg(''), 3000); };

  const persist = (data: AdminCase[]) => {
    setCases(data);
    try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch { /* ignore */ }
  };

  const selectedCase = isNew ? null : cases.find(c => c.slug === selectedId) ?? null;
  const draftNew = isNew ? emptyCase(cases.length + 1) : null;

  const handleSave = (c: AdminCase) => {
    if (!c.title) { showStatus('Ошибка: введите заголовок кейса'); return; }
    let next: AdminCase[];
    if (isNew) { next = [...cases, c]; showStatus('Кейс добавлен'); }
    else { next = cases.map(x => x.slug === c.slug ? c : x); showStatus('Кейс сохранён'); }
    persist(next); setSelectedId(c.slug); setIsNew(false);
  };

  const handleDelete = (slug: string) => {
    if (!confirm('Удалить кейс?')) return;
    persist(cases.filter(c => c.slug !== slug));
    setSelectedId(null); setIsNew(false); showStatus('Кейс удалён');
  };

  const handleDuplicate = (slug: string) => {
    const src = cases.find(c => c.slug === slug); if (!src) return;
    const copy: AdminCase = { ...JSON.parse(JSON.stringify(src)) as AdminCase, slug: `${src.slug}-copy`, title: `${src.title} (копия)`, sortOrder: cases.length + 1 };
    persist([...cases, copy]); setSelectedId(copy.slug); setIsNew(false); showStatus('Дублировано');
  };

  const formCase = isNew ? (draftNew as AdminCase) : selectedCase;

  return (
    <div className={styles.editor}>
      {statusMsg && <div className={styles.statusBar}>{statusMsg}</div>}
      <FilterManager
        filters={filters}
        onChange={persistFilters}
        onStatus={showStatus}
      />
      <div className={styles.layout}>
        <div className={styles.listCol}>
          <div className={styles.colHeader}>
            <span className={styles.colTitle}>Кейсы</span>
            <button type="button" className={styles.btnAddSm} onClick={() => { setIsNew(true); setSelectedId(null); }}>+ Добавить</button>
          </div>
          <div className={styles.itemList}>
            {cases.length === 0 && <div className={styles.colEmpty}>Нет кейсов</div>}
            {cases.map(c => {
              const firstProductImg = (c.caseProducts ?? [])
                .filter((p) => p.isActive !== false)
                .flatMap((p) => p.images ?? [])
                .find(Boolean);
              const thumb = c.coverImage || firstProductImg;
              return (
              <div key={c.slug} className={`${styles.item} ${c.slug === selectedId && !isNew ? styles.itemActive : ''} ${c.isActive === false ? styles.itemInactive : ''}`}
                onClick={() => { setSelectedId(c.slug); setIsNew(false); }}>
                <div className={styles.itemImg}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {thumb ? <img src={thumb} alt={c.title} className={styles.itemImgEl} /> : '📋'}
                </div>
                <div className={styles.itemBody}>
                  <span className={styles.itemName}>{c.title || c.slug}</span>
                  <span className={styles.itemSub}>{c.clientType || c.year}{(c.caseProducts?.length ?? 0) > 0 && ` · ${c.caseProducts!.length} изд.`}</span>
                </div>
                {c.isActive === false && <span className={styles.inactiveBadge}>Выкл</span>}
              </div>
              );
            })}
          </div>
        </div>
        <div className={styles.formCol}>
          {!formCase && !isNew && <div className={styles.colEmpty}>Выберите кейс или добавьте новый</div>}
          {formCase && (
            <CaseForm key={isNew ? 'new' : selectedId!} caseItem={formCase} isNew={isNew}
              onSave={handleSave} onCancel={() => { setSelectedId(null); setIsNew(false); }}
              onDelete={() => handleDelete(selectedCase!.slug)}
              onDuplicate={() => handleDuplicate(selectedCase!.slug)}
              filters={filters}
            />
          )}
        </div>
      </div>
      <details className={styles.advanced}>
        <summary className={styles.advancedSummary}>Экспорт / Импорт / Сброс</summary>
        <div className={styles.advancedBody}>
          <div className={styles.advancedRow}>
            <button type="button" className={styles.btnSecondary} onClick={() => setExportJson(JSON.stringify(cases, null, 2))}>📤 Экспорт</button>
            <button type="button" className={styles.btnSecondary} onClick={() => { setCases(portfolioCases as AdminCase[]); try { localStorage.removeItem(LS_KEY); } catch { /* ignore */ } showStatus('Сброшено'); setExportJson(''); }}>↩ Сбросить</button>
          </div>
          {exportJson && <textarea className={styles.jsonTextarea} rows={8} value={exportJson} readOnly />}
        </div>
      </details>
    </div>
  );
}

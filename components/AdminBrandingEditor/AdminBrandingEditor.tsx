'use client';

import { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react';
import { brandingMethods } from '@/lib/branding';
import type { BrandingMethod } from '@/lib/branding';
import { brandingSamples } from '@/lib/brandingSamples';
import type { BrandingSample } from '@/lib/brandingSamples';
import type { EditableBrandingSample } from '@/lib/editableBrandingSamples';
import { BRANDING_SAMPLES_LS_KEY } from '@/lib/editableBrandingSamples';
import styles from './AdminBrandingEditor.module.css';

const METHODS_LS_KEY = 'teeon_admin_branding_methods';

function uid() { return `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`; }
function toLines(arr: string[]) { return arr.join('\n'); }
function fromLines(s: string) { return s.split('\n').map(l => l.trim()).filter(Boolean); }

type AdminMethod = BrandingMethod & { isActive?: boolean; sortOrder?: number; iconImage?: string; };
type SamplesMap = Record<string, EditableBrandingSample[]>;

function sampleFromLib(s: BrandingSample, methodSlug: string, i: number): EditableBrandingSample {
  return { id: uid(), methodSlug, title: s.title, subtitle: s.subtitle, description: s.description, image: s.imageSrc, imageLabel: s.imageLabel, effect: s.effect, bestFor: s.bestFor, materials: s.materials, limitations: s.limitations, relatedProducts: s.relatedProducts, isActive: true, sortOrder: i + 1 };
}

function emptySample(methodSlug: string, order = 1): EditableBrandingSample {
  return { id: uid(), methodSlug, title: '', description: '', image: '', effect: '', bestFor: [], materials: [], limitations: [], relatedProducts: [], isActive: true, sortOrder: order };
}

// ── ImageField ─────────────────────────────────────────────────────────────────
interface ImageFieldProps { label: string; value: string; onChange: (url: string) => void; folder?: string; }
function ImageField({ label, value, onChange, folder = 'branding' }: ImageFieldProps) {
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
    } catch (err) { setError(err instanceof Error ? err.message : 'Ошибка'); }
    finally { setUploading(false); if (ref.current) ref.current.value = ''; }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder]);
  return (
    <div className={styles.imageField}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.imageFieldRow}>
        <input type="text" className={styles.input} value={value} onChange={e => onChange(e.target.value)} placeholder="/uploads/branding/..." />
        <label className={`${styles.uploadBtn} ${uploading ? styles.uploadBtnLoading : ''}`}>
          {uploading ? '…' : '📁'}
          <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" style={{ display: 'none' }} onChange={handleFile} />
        </label>
      </div>
      {error && <p className={styles.fieldError}>{error}</p>}
      {value && (
        <div className={styles.imagePreview}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="preview" className={styles.imagePreviewImg} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
        </div>
      )}
    </div>
  );
}

// ── SampleForm ─────────────────────────────────────────────────────────────────
interface SampleFormProps { sample: EditableBrandingSample; onSave: (s: EditableBrandingSample) => void; onCancel: () => void; onDelete: () => void; }
function SampleForm({ sample, onSave, onCancel, onDelete }: SampleFormProps) {
  const [d, setD] = useState<EditableBrandingSample>(sample);
  const set = <K extends keyof EditableBrandingSample>(k: K, v: EditableBrandingSample[K]) => setD(p => ({ ...p, [k]: v }));
  return (
    <div style={{ border: '1.5px solid #0f172a', borderRadius: 10, overflow: 'hidden', marginTop: 8 }}>
      <div className={styles.formHeader}>
        <span className={styles.formTitle}>{d.title || 'Новый вариант'}</span>
        <div className={styles.formActions}>
          <button type="button" className={styles.btnSecondary} onClick={onCancel}>Отмена</button>
          <button type="button" className={styles.btnDanger} onClick={onDelete}>Удалить</button>
          <button type="button" className={styles.btnPrimary} onClick={() => onSave(d)}>Сохранить вариант</button>
        </div>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Название *</label><input className={styles.input} value={d.title} onChange={e => set('title', e.target.value)} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Подзаголовок</label><input className={styles.input} value={d.subtitle ?? ''} onChange={e => set('subtitle', e.target.value)} /></div>
        </div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Описание</label><textarea className={styles.textarea} rows={3} value={d.description} onChange={e => set('description', e.target.value)} /></div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Эффект</label><textarea className={styles.textarea} rows={2} value={d.effect} onChange={e => set('effect', e.target.value)} /></div>
        <ImageField label="Фото варианта" value={d.image ?? ''} onChange={url => set('image', url)} />
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Лучше всего для <span className={styles.fieldHint}>(по строке)</span></label><textarea className={styles.textarea} rows={3} value={toLines(d.bestFor)} onChange={e => set('bestFor', fromLines(e.target.value))} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Материалы <span className={styles.fieldHint}>(по строке)</span></label><textarea className={styles.textarea} rows={3} value={toLines(d.materials)} onChange={e => set('materials', fromLines(e.target.value))} /></div>
        </div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Ограничения <span className={styles.fieldHint}>(по строке)</span></label><textarea className={styles.textarea} rows={2} value={toLines(d.limitations)} onChange={e => set('limitations', fromLines(e.target.value))} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Связанные товары <span className={styles.fieldHint}>(slugs, по строке)</span></label><textarea className={styles.textarea} rows={2} value={toLines(d.relatedProducts)} onChange={e => set('relatedProducts', fromLines(e.target.value))} /></div>
        </div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Активен <input type="checkbox" checked={d.isActive} onChange={e => set('isActive', e.target.checked)} /></label></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Сортировка <input type="number" className={styles.inputSm} value={d.sortOrder} min={1} onChange={e => set('sortOrder', Number(e.target.value))} /></label></div>
        </div>
      </div>
    </div>
  );
}

// ── MethodForm ─────────────────────────────────────────────────────────────────
interface MethodFormProps { method: AdminMethod; isNew: boolean; samples: EditableBrandingSample[]; onSave: (m: AdminMethod) => void; onSaveSamples: (s: EditableBrandingSample[]) => void; onCancel: () => void; onDelete: () => void; onDuplicate: () => void; }
function MethodForm({ method, isNew, samples, onSave, onSaveSamples, onCancel, onDelete, onDuplicate }: MethodFormProps) {
  const [d, setD] = useState<AdminMethod>(method);
  const [localSamples, setLocalSamples] = useState<EditableBrandingSample[]>(samples);
  const [editingSampleId, setEditingSampleId] = useState<string | null>(null);
  const set = <K extends keyof AdminMethod>(k: K, v: AdminMethod[K]) => setD(p => ({ ...p, [k]: v }));

  const addSample = () => {
    const s = emptySample(d.slug, localSamples.length + 1);
    setLocalSamples(prev => [...prev, s]);
    setEditingSampleId(s.id);
  };

  const saveSample = (updated: EditableBrandingSample) => {
    const next = localSamples.map(s => s.id === updated.id ? updated : s);
    setLocalSamples(next);
    onSaveSamples(next);
    setEditingSampleId(null);
  };

  const deleteSample = (id: string) => {
    if (!confirm('Удалить вариант нанесения?')) return;
    const next = localSamples.filter(s => s.id !== id);
    setLocalSamples(next);
    onSaveSamples(next);
    if (editingSampleId === id) setEditingSampleId(null);
  };

  const duplicateSample = (id: string) => {
    const src = localSamples.find(s => s.id === id); if (!src) return;
    const copy = { ...JSON.parse(JSON.stringify(src)) as EditableBrandingSample, id: uid(), title: `${src.title} (копия)`, sortOrder: localSamples.length + 1 };
    const next = [...localSamples, copy];
    setLocalSamples(next); onSaveSamples(next); setEditingSampleId(copy.id);
  };

  const editingSample = localSamples.find(s => s.id === editingSampleId) ?? null;

  return (
    <div className={styles.formCol}>
      <div className={styles.formHeader}>
        <h3 className={styles.formTitle}>{isNew ? 'Новая технология' : d.title}</h3>
        <div className={styles.formActions}>
          <button type="button" className={styles.btnSecondary} onClick={onCancel}>Отмена</button>
          {!isNew && <><button type="button" className={styles.btnSecondary} onClick={onDuplicate}>Дублировать</button><button type="button" className={styles.btnDanger} onClick={onDelete}>Удалить</button></>}
          <button type="button" className={styles.btnPrimary} onClick={() => onSave(d)}>{isNew ? 'Создать' : 'Сохранить технологию'}</button>
        </div>
      </div>
      <div className={styles.formBody}>
        {isNew && <div className={styles.alertWarning}>Новая технология появится только локально. Для публичной страницы нужен route и CMS/backend.</div>}

        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Название *</label><input className={styles.input} value={d.title} onChange={e => set('title', e.target.value)} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>В меню</label><input className={styles.input} value={d.menuTitle} onChange={e => set('menuTitle', e.target.value)} /></div>
        </div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Slug</label><input className={styles.input} value={d.slug} onChange={e => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} /></div>
          <div className={styles.row2} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <div className={styles.fieldGroup} style={{ flex: 1 }}>
              <label className={styles.fieldLabel}>Иконка (emoji/текст)</label>
              <input className={styles.input} value={d.icon} placeholder="🪡" onChange={e => set('icon', e.target.value)} />
            </div>
            {d.icon && <div style={{ width: 36, height: 36, marginTop: 22, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{d.icon}</div>}
          </div>
        </div>
        <ImageField label="Иконка картинкой (опционально)" value={d.iconImage ?? ''} onChange={url => set('iconImage', url)} />
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>H1</label><input className={styles.input} value={d.h1} onChange={e => set('h1', e.target.value)} /></div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Краткое описание</label><textarea className={styles.textarea} rows={2} value={d.shortDescription} onChange={e => set('shortDescription', e.target.value)} /></div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Полное описание</label><textarea className={styles.textarea} rows={4} value={d.description} onChange={e => set('description', e.target.value)} /></div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Теги <span className={styles.fieldHint}>(по строке)</span></label><textarea className={styles.textarea} rows={2} value={toLines(d.tags)} onChange={e => set('tags', fromLines(e.target.value))} /></div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Для каких задач <span className={styles.fieldHint}>(по строке)</span></label><textarea className={styles.textarea} rows={4} value={toLines(d.suitableFor)} onChange={e => set('suitableFor', fromLines(e.target.value))} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>На каких изделиях <span className={styles.fieldHint}>(по строке)</span></label><textarea className={styles.textarea} rows={4} value={toLines(d.products)} onChange={e => set('products', fromLines(e.target.value))} /></div>
        </div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Преимущества <span className={styles.fieldHint}>(по строке)</span></label><textarea className={styles.textarea} rows={4} value={toLines(d.benefits)} onChange={e => set('benefits', fromLines(e.target.value))} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Ограничения <span className={styles.fieldHint}>(по строке)</span></label><textarea className={styles.textarea} rows={4} value={toLines(d.limitations)} onChange={e => set('limitations', fromLines(e.target.value))} /></div>
        </div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Процесс <span className={styles.fieldHint}>(по строке)</span></label><textarea className={styles.textarea} rows={4} value={toLines(d.process)} onChange={e => set('process', fromLines(e.target.value))} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Что влияет на стоимость <span className={styles.fieldHint}>(по строке)</span></label><textarea className={styles.textarea} rows={4} value={toLines(d.priceFactors)} onChange={e => set('priceFactors', fromLines(e.target.value))} /></div>
        </div>
        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Требования к макету</label><textarea className={styles.textarea} rows={2} value={d.mockupRequirements} onChange={e => set('mockupRequirements', e.target.value)} /></div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Связанные методы <span className={styles.fieldHint}>(slugs, по строке)</span></label><textarea className={styles.textarea} rows={2} value={toLines(d.relatedMethods)} onChange={e => set('relatedMethods', fromLines(e.target.value))} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Связанный каталог <span className={styles.fieldHint}>(slugs, по строке)</span></label><textarea className={styles.textarea} rows={2} value={toLines(d.relatedCatalog)} onChange={e => set('relatedCatalog', fromLines(e.target.value))} /></div>
        </div>

        <div className={styles.divider}>SEO</div>
        <div className={styles.seoNotice}>SEO-данные видны только локально. Для публикации нужно перенести в lib/branding.ts.</div>
        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>SEO Title</label><input className={styles.input} value={d.seoTitle} onChange={e => set('seoTitle', e.target.value)} /></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>SEO Description</label><textarea className={styles.textarea} rows={2} value={d.seoDescription} onChange={e => set('seoDescription', e.target.value)} /></div>
        </div>

        <div className={styles.row2}>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Активна <input type="checkbox" checked={d.isActive !== false} onChange={e => set('isActive', e.target.checked)} /></label></div>
          <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Сортировка <input type="number" className={styles.inputSm} value={d.sortOrder ?? 1} min={1} onChange={e => set('sortOrder', Number(e.target.value))} /></label></div>
        </div>

        <div className={styles.divider}>
          Варианты нанесения
          <button type="button" className={styles.btnSmall} onClick={addSample}>+ Добавить вариант</button>
        </div>

        {editingSample && (
          <SampleForm
            sample={editingSample}
            onSave={saveSample}
            onCancel={() => setEditingSampleId(null)}
            onDelete={() => deleteSample(editingSample.id)}
          />
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {localSamples.length === 0 && !editingSampleId && <p className={styles.emptyNote}>Вариантов нет. Нажмите «+ Добавить вариант».</p>}
          {localSamples.filter(s => s.id !== editingSampleId).map(s => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 7, background: s.isActive ? '#f8fafc' : '#f1f5f9', opacity: s.isActive ? 1 : 0.6 }}>
              {s.image && (
                <div style={{ width: 40, height: 40, borderRadius: 5, overflow: 'hidden', flexShrink: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{s.title || '(без названия)'}</span>
                {s.subtitle && <span style={{ fontSize: 11, color: '#64748b', marginLeft: 6 }}>{s.subtitle}</span>}
                {!s.isActive && <span className={styles.inactiveBadge} style={{ marginLeft: 6 }}>Выкл</span>}
              </div>
              <button type="button" className={styles.btnSmall} onClick={() => setEditingSampleId(s.id)}>Редактировать</button>
              <button type="button" className={styles.btnSmall} onClick={() => duplicateSample(s.id)}>Копия</button>
              <button type="button" className={styles.btnDangerSm} onClick={() => deleteSample(s.id)}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function AdminBrandingEditor() {
  const [methods, setMethods] = useState<AdminMethod[]>(brandingMethods as AdminMethod[]);
  const [samplesMap, setSamplesMap] = useState<SamplesMap>({});
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [exportJson, setExportJson] = useState('');

  useEffect(() => {
    try {
      const rawM = localStorage.getItem(METHODS_LS_KEY);
      if (rawM) setMethods(JSON.parse(rawM) as AdminMethod[]);
      const rawS = localStorage.getItem(BRANDING_SAMPLES_LS_KEY);
      if (rawS) setSamplesMap(JSON.parse(rawS) as SamplesMap);
      else {
        // Init from lib
        const init: SamplesMap = {};
        brandingMethods.forEach(m => {
          const lib = brandingSamples[m.slug];
          if (lib) init[m.slug] = lib.map((s, i) => sampleFromLib(s, m.slug, i));
        });
        setSamplesMap(init);
      }
    } catch { /* ignore */ }
  }, []);

  const showStatus = (msg: string) => { setStatusMsg(msg); setTimeout(() => setStatusMsg(''), 3000); };

  const persistMethods = (data: AdminMethod[]) => {
    setMethods(data);
    try { localStorage.setItem(METHODS_LS_KEY, JSON.stringify(data)); } catch { /* ignore */ }
  };

  const persistSamples = (slug: string, samples: EditableBrandingSample[]) => {
    setSamplesMap(prev => {
      const next = { ...prev, [slug]: samples };
      try { localStorage.setItem(BRANDING_SAMPLES_LS_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const emptyMethod = (): AdminMethod => ({
    slug: `method-${uid()}`, title: '', menuTitle: '', h1: '', shortDescription: '',
    description: '', icon: '🖨', iconImage: '', tags: [], seoTitle: '', seoDescription: '',
    suitableFor: [], products: [], benefits: [], limitations: [], process: [],
    priceFactors: [], mockupRequirements: '', examples: [], relatedMethods: [],
    relatedCatalog: [], isActive: true, sortOrder: methods.length + 1,
  });

  const formMethod = isNew ? emptyMethod() : (methods.find(m => m.slug === selectedSlug) ?? null);
  const formSamples = selectedSlug ? (samplesMap[selectedSlug] ?? []) : [];

  const handleSave = (m: AdminMethod) => {
    if (!m.title) { showStatus('Ошибка: введите название технологии'); return; }
    let next: AdminMethod[];
    if (isNew) { next = [...methods, m]; showStatus('Технология добавлена'); }
    else { next = methods.map(x => x.slug === m.slug ? m : x); showStatus('Технология сохранена'); }
    persistMethods(next); setSelectedSlug(m.slug); setIsNew(false);
  };

  const handleDelete = (slug: string) => {
    if (!confirm('Удалить технологию?')) return;
    persistMethods(methods.filter(m => m.slug !== slug));
    setSelectedSlug(null); setIsNew(false); showStatus('Удалено');
  };

  const handleDuplicate = (slug: string) => {
    const src = methods.find(m => m.slug === slug); if (!src) return;
    const copy: AdminMethod = { ...JSON.parse(JSON.stringify(src)) as AdminMethod, slug: `${src.slug}-copy`, title: `${src.title} (копия)` };
    persistMethods([...methods, copy]); setSelectedSlug(copy.slug); setIsNew(false); showStatus('Дублировано');
  };

  return (
    <div className={styles.editor}>
      {statusMsg && <div className={styles.statusBar}>{statusMsg}</div>}
      <div className={styles.layout}>
        <div className={styles.listCol}>
          <div className={styles.colHeader}>
            <span className={styles.colTitle}>Технологии</span>
            <button type="button" className={styles.btnAddSm} onClick={() => { setIsNew(true); setSelectedSlug(null); }}>+ Добавить</button>
          </div>
          <div className={styles.itemList}>
            {methods.map(m => (
              <div key={m.slug} className={`${styles.item} ${m.slug === selectedSlug && !isNew ? styles.itemActive : ''} ${m.isActive === false ? styles.itemInactive : ''}`}
                onClick={() => { setSelectedSlug(m.slug); setIsNew(false); }}>
                <div className={styles.itemImg}>
                  {m.iconImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={m.iconImage} alt={m.title} className={styles.itemImgEl} />
                  ) : m.icon}
                </div>
                <div className={styles.itemBody}>
                  <span className={styles.itemName}>{m.title}</span>
                  <span className={styles.itemSub}>{(samplesMap[m.slug]?.length ?? 0)} вар.</span>
                </div>
                {m.isActive === false && <span className={styles.inactiveBadge}>Выкл</span>}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.formCol}>
          {!formMethod && !isNew && <div className={styles.colEmpty}>Выберите технологию или добавьте новую</div>}
          {formMethod && (
            <MethodForm key={isNew ? 'new' : selectedSlug!} method={formMethod} isNew={isNew}
              samples={formSamples}
              onSave={handleSave}
              onSaveSamples={samples => { if (selectedSlug) persistSamples(selectedSlug, samples); showStatus('Варианты сохранены'); }}
              onCancel={() => { setSelectedSlug(null); setIsNew(false); }}
              onDelete={() => handleDelete(selectedSlug!)}
              onDuplicate={() => handleDuplicate(selectedSlug!)}
            />
          )}
        </div>
      </div>
      <details className={styles.advanced}>
        <summary className={styles.advancedSummary}>Экспорт / Импорт / Сброс</summary>
        <div className={styles.advancedBody}>
          <div className={styles.advancedRow}>
            <button type="button" className={styles.btnSecondary} onClick={() => setExportJson(JSON.stringify({ methods, samplesMap }, null, 2))}>📤 Экспорт</button>
            <button type="button" className={styles.btnSecondary} onClick={() => {
              setMethods(brandingMethods as AdminMethod[]);
              setSamplesMap({});
              try { localStorage.removeItem(METHODS_LS_KEY); localStorage.removeItem(BRANDING_SAMPLES_LS_KEY); } catch { /* ignore */ }
              showStatus('Сброшено'); setExportJson('');
            }}>↩ Сбросить</button>
          </div>
          {exportJson && <textarea className={styles.jsonTextarea} rows={8} value={exportJson} readOnly />}
        </div>
      </details>
    </div>
  );
}

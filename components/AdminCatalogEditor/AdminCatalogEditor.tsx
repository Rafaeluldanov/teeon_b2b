'use client';

import { useState, useEffect, useRef, useCallback, ChangeEvent } from 'react';
import { catalogModelsData } from '@/lib/catalogModels';
import type {
  CatalogModelsMap,
  CatalogModel,
  CatalogVariant,
  ColorOption,
  CategoryModels,
} from '@/lib/catalogModels';
import styles from './AdminCatalogEditor.module.css';

const ADMIN_MODELS_KEY = 'teeon_admin_catalog_models';

// ── helpers ──────────────────────────────────────────────────────────────────

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function toLines(arr: string[]): string {
  return arr.join('\n');
}

function fromLines(s: string): string[] {
  return s.split('\n').map((l) => l.trim()).filter(Boolean);
}

function toCommas(arr: string[]): string {
  return arr.join(', ');
}

function fromCommas(s: string): string[] {
  return s.split(',').map((l) => l.trim()).filter(Boolean);
}

// ── empty model / variant factories ──────────────────────────────────────────

function emptyVariant(sortOrder = 1): CatalogVariant {
  return {
    id: uid(),
    name: '',
    subtitle: '',
    patternCode: '',
    image: '',
    galleryImages: [],
    description: '',
    features: [],
    suitableFor: [],
    colorOptions: [],
    materialOptions: [],
    densityOptions: [],
    sizeOptions: [],
    brandingOptions: [],
    placements: [],
    configurableOptions: [],
    sortOrder,
    isActive: true,
  };
}

function emptyModel(sortOrder = 1): CatalogModel {
  return {
    id: uid(),
    slug: '',
    name: '',
    patternCode: '',
    shortDescription: '',
    fullDescription: '',
    coverImage: '',
    galleryImages: [],
    badges: [],
    suitableFor: [],
    brandingOptions: [],
    configurableOptions: [],
    features: [],
    variants: [emptyVariant(1)],
    sortOrder,
    isActive: true,
  };
}

function emptyCategory(sortOrder = 1): CategoryModels {
  return {
    categorySlug: '',
    categoryTitle: '',
    categoryDescription: '',
    sortOrder,
    isActive: true,
    models: [],
  };
}

// ── ImageField ────────────────────────────────────────────────────────────────

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

function ImageField({ label, value, onChange, folder = 'catalog' }: ImageFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      setUploadError('');
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', folder);
      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: fd,
          credentials: 'same-origin',
        });
        const json = await res.json() as { success?: boolean; url?: string; message?: string; error?: string };
        if (res.status === 401) {
          throw new Error('Сессия истекла, войдите заново.');
        }
        if (!res.ok || !json.url) {
          throw new Error(json.message ?? json.error ?? 'Ошибка загрузки');
        }
        onChange(json.url);
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : 'Ошибка загрузки');
      } finally {
        setUploading(false);
        if (inputRef.current) inputRef.current.value = '';
      }
    },
    [folder, onChange],
  );

  return (
    <div className={styles.imageField}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.imageFieldRow}>
        <input
          type="text"
          className={styles.input}
          value={value}
          placeholder="https://... или /uploads/catalog/file.jpg"
          onChange={(e) => onChange(e.target.value)}
        />
        <label className={`${styles.uploadBtn} ${uploading ? styles.uploadBtnLoading : ''}`}>
          {uploading ? '…' : '📁'}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </label>
      </div>
      {uploadError && <p className={styles.fieldError}>{uploadError}</p>}
      {value ? (
        <div className={styles.imagePreviewWrap}>
          <div className={styles.imagePreview}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="preview"
              className={styles.imagePreviewImg}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const next = (e.target as HTMLImageElement).nextElementSibling as HTMLElement | null;
                if (next) next.style.display = 'flex';
              }}
            />
            <div className={styles.imagePreviewFallback} style={{ display: 'none' }}>
              Изображение не найдено
            </div>
          </div>
          <div className={styles.imagePreviewActions}>
            <button
              type="button"
              className={styles.btnDangerSm}
              onClick={() => onChange('')}
            >
              Удалить изображение
            </button>
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSmall}
            >
              Открыть
            </a>
          </div>
        </div>
      ) : (
        <div className={styles.imagePlaceholder}>Изображение не добавлено</div>
      )}
    </div>
  );
}

// ── GalleryEditor ─────────────────────────────────────────────────────────────

interface GalleryEditorProps {
  label: string;
  images: string[];
  onChange: (imgs: string[]) => void;
  folder?: string;
  max?: number;
}

function GalleryEditor({ label, images, onChange, folder = 'catalog', max = 10 }: GalleryEditorProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const atMax = images.length >= max;

  const handleFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (images.length >= max) { setError(`Максимум ${max} изображений`); return; }
    setUploading(true); setError('');
    const fd = new FormData(); fd.append('file', file); fd.append('folder', folder);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd, credentials: 'same-origin' });
      const json = await res.json() as { url?: string; message?: string; error?: string };
      if (res.status === 401) throw new Error('Сессия истекла, войдите заново.');
      if (!res.ok || !json.url) throw new Error(json.message ?? json.error ?? 'Ошибка загрузки');
      onChange([...images, json.url]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
    } finally {
      setUploading(false);
      if (ref.current) ref.current.value = '';
    }
  }, [images, folder, max, onChange]);

  const addUrl = () => { if (!atMax) onChange([...images, '']); };
  const removeImg = (i: number) => onChange(images.filter((_, idx) => idx !== i));
  const updateUrl = (i: number, val: string) => onChange(images.map((u, idx) => (idx === i ? val : u)));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= images.length) return;
    const next = images.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className={styles.imageField}>
      <label className={styles.fieldLabel}>
        {label} <span className={styles.fieldHint}>({images.length} / {max})</span>
      </label>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {images.map((url, i) => (
          <div key={i} style={{ width: 110, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ width: 110, height: 84, borderRadius: 6, overflow: 'hidden', border: '1.5px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).style.opacity = '.25'; }} />
              ) : <span style={{ fontSize: 22, color: '#94a3b8' }}>📷</span>}
              <span style={{ position: 'absolute', top: 4, left: 4, background: 'rgba(15,23,42,.7)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4 }}>#{i + 1}</span>
            </div>
            <input style={{ fontSize: 10, padding: '3px 6px', border: '1px solid #e2e8f0', borderRadius: 4, width: '100%', boxSizing: 'border-box' }} value={url} placeholder="URL..." onChange={(e) => updateUrl(i, e.target.value)} />
            <div style={{ display: 'flex', gap: 4 }}>
              <button type="button" className={styles.btnSmall} onClick={() => move(i, -1)} disabled={i === 0} style={{ flex: 1, padding: '3px 6px', fontSize: 11 }}>←</button>
              <button type="button" className={styles.btnSmall} onClick={() => move(i, 1)} disabled={i === images.length - 1} style={{ flex: 1, padding: '3px 6px', fontSize: 11 }}>→</button>
            </div>
            <button type="button" className={styles.btnDangerSm} onClick={() => removeImg(i)} style={{ width: '100%', justifyContent: 'center' }}>Удалить</button>
          </div>
        ))}
        {!atMax && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ width: 110, height: 84, borderRadius: 6, border: '2px dashed #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: uploading ? 'wait' : 'pointer', flexDirection: 'column', gap: 4, fontSize: 11, color: '#64748b' }}>
              {uploading ? '…' : <>📁<span>Загрузить</span></>}
              <input ref={ref} type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" style={{ display: 'none' }} onChange={handleFile} disabled={uploading} />
            </label>
            <button type="button" className={styles.btnSmall} onClick={addUrl} style={{ width: 110, justifyContent: 'center' }}>+ URL</button>
          </div>
        )}
      </div>
      {atMax && <p className={styles.fieldHint}>Достигнут лимит — удалите изображение, чтобы добавить новое.</p>}
      {error && <p className={styles.fieldError}>{error}</p>}
    </div>
  );
}

// ── ColorEditor ───────────────────────────────────────────────────────────────

interface ColorEditorProps {
  colors: ColorOption[];
  onChange: (c: ColorOption[]) => void;
}

function ColorEditor({ colors, onChange }: ColorEditorProps) {
  const add = () => onChange([...colors, { name: '', hex: '#000000' }]);
  const remove = (i: number) => onChange(colors.filter((_, idx) => idx !== i));
  const update = (i: number, field: keyof ColorOption, val: string) =>
    onChange(colors.map((c, idx) => (idx === i ? { ...c, [field]: val } : c)));

  return (
    <div className={styles.colorEditor}>
      <div className={styles.colorHeader}>
        <span className={styles.fieldLabel}>Цвета</span>
        <button type="button" className={styles.btnSmall} onClick={add}>+ Добавить цвет</button>
      </div>
      {colors.map((c, i) => (
        <div key={i} className={styles.colorRow}>
          <input
            type="color"
            className={styles.colorPicker}
            value={c.hex}
            onChange={(e) => update(i, 'hex', e.target.value)}
          />
          <input
            className={`${styles.input} ${styles.colorHexInput}`}
            value={c.hex}
            placeholder="#000000"
            onChange={(e) => update(i, 'hex', e.target.value)}
          />
          <input
            className={`${styles.input} ${styles.colorNameInput}`}
            value={c.name}
            placeholder="Название цвета"
            onChange={(e) => update(i, 'name', e.target.value)}
          />
          <button
            type="button"
            className={styles.btnDangerSm}
            onClick={() => remove(i)}
            aria-label="Удалить цвет"
          >✕</button>
        </div>
      ))}
      {colors.length === 0 && (
        <p className={styles.emptyNote}>Цвета не добавлены</p>
      )}
    </div>
  );
}

// ── VariantForm ───────────────────────────────────────────────────────────────

interface VariantFormProps {
  variant: CatalogVariant;
  onSave: (v: CatalogVariant) => void;
  onCancel: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

function VariantForm({ variant, onSave, onCancel, onDelete, onDuplicate }: VariantFormProps) {
  const [d, setD] = useState<CatalogVariant>(variant);
  const set = <K extends keyof CatalogVariant>(k: K, v: CatalogVariant[K]) =>
    setD((prev) => ({ ...prev, [k]: v }));

  return (
    <div className={styles.formPanel}>
      <div className={styles.formPanelHeader}>
        <h3 className={styles.formPanelTitle}>
          {variant.name ? `Вариант: ${variant.name}` : 'Новый вариант'}
        </h3>
        <div className={styles.formPanelActions}>
          <button type="button" className={styles.btnSecondary} onClick={onCancel}>Отмена</button>
          <button type="button" className={styles.btnSecondary} onClick={onDuplicate}>Дублировать</button>
          <button type="button" className={styles.btnDanger} onClick={onDelete}>Удалить</button>
          <button type="button" className={styles.btnPrimary} onClick={() => onSave(d)}>Сохранить вариант</button>
        </div>
      </div>

      <div className={styles.formBody}>
        <div className={styles.formRow2}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Название варианта *</label>
            <input className={styles.input} value={d.name} onChange={(e) => set('name', e.target.value)} />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Подзаголовок</label>
            <input className={styles.input} value={d.subtitle ?? ''} onChange={(e) => set('subtitle', e.target.value)} />
          </div>
        </div>

        <div className={styles.formRow2}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Код лекала / артикул</label>
            <input className={styles.input} value={d.patternCode ?? ''} placeholder="F-OVERSIZE-220" onChange={(e) => set('patternCode', e.target.value)} />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>
              Активен&nbsp;
              <input type="checkbox" checked={d.isActive} onChange={(e) => set('isActive', e.target.checked)} />
            </label>
            <label className={styles.fieldLabel}>
              Порядок сортировки&nbsp;
              <input
                type="number"
                className={styles.inputSm}
                value={d.sortOrder}
                min={1}
                onChange={(e) => set('sortOrder', Number(e.target.value))}
              />
            </label>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Описание</label>
          <textarea className={styles.textarea} rows={3} value={d.description} onChange={(e) => set('description', e.target.value)} />
        </div>

        <ImageField label="Главное изображение варианта" value={d.image ?? ''} onChange={(url) => set('image', url)} />

        <GalleryEditor
          label="Дополнительные изображения варианта"
          images={d.galleryImages ?? []}
          onChange={(imgs) => set('galleryImages', imgs)}
          max={10}
        />

        <div className={styles.sectionDivider}>Характеристики</div>

        <div className={styles.formRow2}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Характеристики <span className={styles.fieldHint}>(по строке)</span></label>
            <textarea className={styles.textarea} rows={4} value={toLines(d.features)} onChange={(e) => set('features', fromLines(e.target.value))} />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Подходит для <span className={styles.fieldHint}>(по строке)</span></label>
            <textarea className={styles.textarea} rows={4} value={toLines(d.suitableFor)} onChange={(e) => set('suitableFor', fromLines(e.target.value))} />
          </div>
        </div>

        <div className={styles.formRow2}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Материалы <span className={styles.fieldHint}>(по строке)</span></label>
            <textarea className={styles.textarea} rows={3} value={toLines(d.materialOptions)} onChange={(e) => set('materialOptions', fromLines(e.target.value))} />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Плотности <span className={styles.fieldHint}>(дискретно, по строке)</span></label>
            <textarea className={styles.textarea} rows={3} value={toLines(d.densityOptions)} onChange={(e) => set('densityOptions', fromLines(e.target.value))} />
          </div>
        </div>

        <div className={styles.formRow2}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Размеры <span className={styles.fieldHint}>(по строке)</span></label>
            <textarea className={styles.textarea} rows={4} value={toLines(d.sizeOptions)} onChange={(e) => set('sizeOptions', fromLines(e.target.value))} />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Брендирование <span className={styles.fieldHint}>(по строке)</span></label>
            <textarea className={styles.textarea} rows={4} value={toLines(d.brandingOptions)} onChange={(e) => set('brandingOptions', fromLines(e.target.value))} />
          </div>
        </div>

        <div className={styles.formRow2}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Места нанесения <span className={styles.fieldHint}>(по строке)</span></label>
            <textarea className={styles.textarea} rows={3} value={toLines(d.placements)} onChange={(e) => set('placements', fromLines(e.target.value))} />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Что можно настроить <span className={styles.fieldHint}>(по строке)</span></label>
            <textarea className={styles.textarea} rows={3} value={toLines(d.configurableOptions)} onChange={(e) => set('configurableOptions', fromLines(e.target.value))} />
          </div>
        </div>

        <ColorEditor colors={d.colorOptions} onChange={(c) => set('colorOptions', c)} />
      </div>
    </div>
  );
}

// ── ModelForm ─────────────────────────────────────────────────────────────────

interface ModelFormProps {
  model: CatalogModel;
  onSave: (m: CatalogModel) => void;
  onCancel: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  isNew: boolean;
}

function ModelForm({ model, onSave, onCancel, onDelete, onDuplicate, isNew }: ModelFormProps) {
  const [d, setD] = useState<CatalogModel>(model);
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null);

  const setF = <K extends keyof CatalogModel>(k: K, v: CatalogModel[K]) =>
    setD((prev) => ({ ...prev, [k]: v }));

  const activeVariant = d.variants.find((v) => v.id === editingVariantId) ?? null;

  const saveVariant = (updated: CatalogVariant) => {
    setD((prev) => ({
      ...prev,
      variants: prev.variants.map((v) => (v.id === updated.id ? updated : v)),
    }));
    setEditingVariantId(null);
  };

  const addVariant = () => {
    const v = emptyVariant(d.variants.length + 1);
    setD((prev) => ({ ...prev, variants: [...prev.variants, v] }));
    setEditingVariantId(v.id);
  };

  const deleteVariant = (id: string) => {
    setD((prev) => ({ ...prev, variants: prev.variants.filter((v) => v.id !== id) }));
    if (editingVariantId === id) setEditingVariantId(null);
  };

  const duplicateVariant = (id: string) => {
    const src = d.variants.find((v) => v.id === id);
    if (!src) return;
    const copy: CatalogVariant = { ...JSON.parse(JSON.stringify(src)) as CatalogVariant, id: uid(), name: `${src.name} (копия)`, sortOrder: d.variants.length + 1 };
    setD((prev) => ({ ...prev, variants: [...prev.variants, copy] }));
    setEditingVariantId(copy.id);
  };

  if (activeVariant) {
    return (
      <VariantForm
        variant={activeVariant}
        onSave={saveVariant}
        onCancel={() => setEditingVariantId(null)}
        onDelete={() => deleteVariant(activeVariant.id)}
        onDuplicate={() => duplicateVariant(activeVariant.id)}
      />
    );
  }

  return (
    <div className={styles.formPanel}>
      <div className={styles.formPanelHeader}>
        <h3 className={styles.formPanelTitle}>
          {isNew ? 'Новая модель' : `Модель: ${d.name}`}
        </h3>
        <div className={styles.formPanelActions}>
          <button type="button" className={styles.btnSecondary} onClick={onCancel}>Отмена</button>
          {!isNew && (
            <>
              <button type="button" className={styles.btnSecondary} onClick={onDuplicate}>Дублировать</button>
              <button type="button" className={styles.btnDanger} onClick={onDelete}>Удалить модель</button>
            </>
          )}
          <button type="button" className={styles.btnPrimary} onClick={() => onSave(d)}>
            {isNew ? 'Создать модель' : 'Сохранить изменения'}
          </button>
        </div>
      </div>

      <div className={styles.formBody}>
        <div className={styles.formRow2}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Название модели *</label>
            <input className={styles.input} value={d.name} onChange={(e) => setF('name', e.target.value)} placeholder="Базовая футболка" />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Slug (латиницей) *</label>
            <input className={styles.input} value={d.slug} onChange={(e) => setF('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} placeholder="basic-tee" />
          </div>
        </div>

        <div className={styles.formRow2}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Код лекала / артикул</label>
            <input className={styles.input} value={d.patternCode ?? ''} placeholder="F-BASIC-001" onChange={(e) => setF('patternCode', e.target.value)} />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Бейджи <span className={styles.fieldHint}>(через запятую)</span></label>
            <input className={styles.input} value={toCommas(d.badges ?? [])} placeholder="Хит, Новинка" onChange={(e) => setF('badges', fromCommas(e.target.value))} />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Краткое описание</label>
          <input className={styles.input} value={d.shortDescription} onChange={(e) => setF('shortDescription', e.target.value)} />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Полное описание</label>
          <textarea className={styles.textarea} rows={3} value={d.fullDescription ?? ''} onChange={(e) => setF('fullDescription', e.target.value)} />
        </div>

        <div className={styles.formRow2}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>
              Активна&nbsp;
              <input type="checkbox" checked={d.isActive} onChange={(e) => setF('isActive', e.target.checked)} />
            </label>
            <label className={styles.fieldLabel}>
              Сортировка&nbsp;
              <input type="number" className={styles.inputSm} value={d.sortOrder} min={1} onChange={(e) => setF('sortOrder', Number(e.target.value))} />
            </label>
          </div>
        </div>

        <div className={styles.alertInfo}>
          Изображение добавляется к конкретному варианту модели. Откройте вариант → поле «Изображение варианта».
        </div>

        <div className={styles.sectionDivider}>Характеристики модели</div>

        <div className={styles.formRow2}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Особенности <span className={styles.fieldHint}>(по строке)</span></label>
            <textarea className={styles.textarea} rows={4} value={toLines(d.features)} onChange={(e) => setF('features', fromLines(e.target.value))} />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Подходит для <span className={styles.fieldHint}>(по строке)</span></label>
            <textarea className={styles.textarea} rows={4} value={toLines(d.suitableFor)} onChange={(e) => setF('suitableFor', fromLines(e.target.value))} />
          </div>
        </div>

        <div className={styles.formRow2}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Брендирование <span className={styles.fieldHint}>(по строке)</span></label>
            <textarea className={styles.textarea} rows={3} value={toLines(d.brandingOptions)} onChange={(e) => setF('brandingOptions', fromLines(e.target.value))} />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Что можно настроить <span className={styles.fieldHint}>(по строке)</span></label>
            <textarea className={styles.textarea} rows={3} value={toLines(d.configurableOptions)} onChange={(e) => setF('configurableOptions', fromLines(e.target.value))} />
          </div>
        </div>

        <div className={styles.sectionDivider}>
          Варианты модели
          <button type="button" className={styles.btnSmall} onClick={addVariant}>+ Добавить вариант</button>
        </div>

        {d.variants.length === 0 && (
          <p className={styles.emptyNote}>Нет вариантов. Добавьте хотя бы один.</p>
        )}

        <div className={styles.variantList}>
          {d.variants.map((v) => (
            <div key={v.id} className={`${styles.variantRow} ${!v.isActive ? styles.variantRowInactive : ''}`}>
              <div className={styles.variantRowImg}>
                {v.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={v.image} alt={v.name} className={styles.variantRowImgEl} />
                ) : (
                  <div className={styles.variantRowImgPlaceholder}>📷</div>
                )}
              </div>
              <div className={styles.variantRowInfo}>
                <span className={styles.variantRowName}>{v.name || '(без названия)'}</span>
                {v.patternCode && <span className={styles.variantRowCode}>{v.patternCode}</span>}
                {!v.isActive && <span className={styles.inactiveBadge}>Выключен</span>}
              </div>
              <div className={styles.variantRowActions}>
                <button type="button" className={styles.btnSmall} onClick={() => setEditingVariantId(v.id)}>Редактировать</button>
                <button type="button" className={styles.btnSmall} onClick={() => duplicateVariant(v.id)}>Копия</button>
                <button type="button" className={styles.btnDangerSm} onClick={() => deleteVariant(v.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── CategoryForm ──────────────────────────────────────────────────────────────

interface CategoryFormProps {
  cat: CategoryModels;
  isNew: boolean;
  onSave: (c: CategoryModels) => void;
  onCancel: () => void;
  onDelete?: () => void;
  isBuiltIn: boolean;
}

function CategoryForm({ cat, isNew, onSave, onCancel, onDelete, isBuiltIn }: CategoryFormProps) {
  const [d, setD] = useState<CategoryModels>(cat);
  const setF = <K extends keyof CategoryModels>(k: K, v: CategoryModels[K]) =>
    setD((prev) => ({ ...prev, [k]: v }));

  return (
    <div className={styles.formPanel}>
      <div className={styles.formPanelHeader}>
        <h3 className={styles.formPanelTitle}>
          {isNew ? 'Новая категория' : `Категория: ${d.categoryTitle}`}
        </h3>
        <div className={styles.formPanelActions}>
          <button type="button" className={styles.btnSecondary} onClick={onCancel}>Отмена</button>
          {!isNew && !isBuiltIn && onDelete && (
            <button type="button" className={styles.btnDanger} onClick={onDelete}>Удалить</button>
          )}
          <button type="button" className={styles.btnPrimary} onClick={() => onSave(d)}>
            {isNew ? 'Создать категорию' : 'Сохранить'}
          </button>
        </div>
      </div>
      <div className={styles.formBody}>
        {isNew && (
          <div className={styles.alertWarning}>
            После сохранения категория появится в редакторе. Для публичной страницы нужно создать route в <code>app/catalog/[slug]/page.tsx</code> или подключить CMS/backend.
          </div>
        )}
        <div className={styles.formRow2}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Название *</label>
            <input className={styles.input} value={d.categoryTitle} onChange={(e) => setF('categoryTitle', e.target.value)} />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Slug (латиницей) *</label>
            <input className={styles.input} value={d.categorySlug} disabled={isBuiltIn}
              onChange={(e) => setF('categorySlug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} />
          </div>
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Описание категории</label>
          <textarea className={styles.textarea} rows={2} value={d.categoryDescription ?? ''} onChange={(e) => setF('categoryDescription', e.target.value)} />
        </div>
        <div className={styles.formRow2}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>
              Активна&nbsp;
              <input type="checkbox" checked={d.isActive !== false} onChange={(e) => setF('isActive', e.target.checked)} />
            </label>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>
              Сортировка&nbsp;
              <input type="number" className={styles.inputSm} value={d.sortOrder ?? 1} min={1} onChange={(e) => setF('sortOrder', Number(e.target.value))} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main AdminCatalogEditor ───────────────────────────────────────────────────

const BUILT_IN_SLUGS = new Set(['futbolki', 'hudi', 'svitshoty', 'longslivy', 'sumki', 'zhiletki', 'kurtki', 'dozhdeviki']);

type PanelMode =
  | { type: 'none' }
  | { type: 'editCategory'; slug: string; isNew: boolean }
  | { type: 'editModel'; categorySlug: string; modelId: string; isNew: boolean }

export default function AdminCatalogEditor() {
  const [catalog, setCatalog] = useState<CatalogModelsMap>(catalogModelsData);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [panel, setPanel] = useState<PanelMode>({ type: 'none' });
  const [statusMsg, setStatusMsg] = useState('');
  const [exportJson, setExportJson] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(ADMIN_MODELS_KEY);
      if (raw) setCatalog(JSON.parse(raw) as CatalogModelsMap);
    } catch { /* ignore */ }
  }, []);

  const showStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const persist = useCallback((data: CatalogModelsMap) => {
    setCatalog(data);
    try {
      localStorage.setItem(ADMIN_MODELS_KEY, JSON.stringify(data));
    } catch { /* ignore */ }
  }, []);

  // ── Category actions ──
  const saveCategory = (cat: CategoryModels) => {
    if (!cat.categorySlug || !cat.categoryTitle) {
      showStatus('Ошибка: заполните название и slug категории');
      return;
    }
    const prev = catalog[cat.categorySlug] ?? { models: [] };
    const next = { ...catalog, [cat.categorySlug]: { ...prev, ...cat } };
    persist(next);
    setSelectedCat(cat.categorySlug);
    setPanel({ type: 'none' });
    showStatus('Категория сохранена');
  };

  const deleteCategory = (slug: string) => {
    if (!confirm(`Удалить категорию «${catalog[slug]?.categoryTitle}» со всеми моделями?`)) return;
    const next = { ...catalog };
    delete next[slug];
    persist(next);
    if (selectedCat === slug) { setSelectedCat(null); setSelectedModelId(null); }
    setPanel({ type: 'none' });
    showStatus('Категория удалена');
  };

  // ── Model actions ──
  const saveModel = (categorySlug: string, model: CatalogModel) => {
    if (!model.name) { showStatus('Ошибка: введите название модели'); return; }
    const cat = catalog[categorySlug];
    if (!cat) return;
    const exists = cat.models.findIndex((m) => m.id === model.id);
    const models = exists >= 0
      ? cat.models.map((m) => (m.id === model.id ? model : m))
      : [...cat.models, model];
    const next = { ...catalog, [categorySlug]: { ...cat, models } };
    persist(next);
    setSelectedModelId(model.id);
    setPanel({ type: 'none' });
    showStatus(exists >= 0 ? 'Модель сохранена' : 'Модель добавлена');
  };

  const deleteModel = (categorySlug: string, modelId: string) => {
    const cat = catalog[categorySlug];
    if (!cat) return;
    if (!confirm(`Удалить модель?`)) return;
    const next = { ...catalog, [categorySlug]: { ...cat, models: cat.models.filter((m) => m.id !== modelId) } };
    persist(next);
    if (selectedModelId === modelId) setSelectedModelId(null);
    setPanel({ type: 'none' });
    showStatus('Модель удалена');
  };

  const duplicateModel = (categorySlug: string, modelId: string) => {
    const cat = catalog[categorySlug];
    const src = cat?.models.find((m) => m.id === modelId);
    if (!src) return;
    const copy: CatalogModel = {
      ...JSON.parse(JSON.stringify(src)) as CatalogModel,
      id: uid(),
      slug: `${src.slug}-copy`,
      name: `${src.name} (копия)`,
      sortOrder: (cat?.models.length ?? 0) + 1,
    };
    const next = { ...catalog, [categorySlug]: { ...cat!, models: [...cat!.models, copy] } };
    persist(next);
    setSelectedModelId(copy.id);
    setPanel({ type: 'editModel', categorySlug, modelId: copy.id, isNew: false });
    showStatus('Модель дублирована');
  };

  // ── Derived ──
  const sortedCats = Object.values(catalog).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  const currentCat = selectedCat ? catalog[selectedCat] : null;
  const sortedModels = currentCat
    ? [...currentCat.models].sort((a, b) => a.sortOrder - b.sortOrder)
    : [];
  const currentModel = selectedModelId
    ? currentCat?.models.find((m) => m.id === selectedModelId)
    : null;

  // Panel model object
  const panelModel: CatalogModel | null =
    panel.type === 'editModel'
      ? panel.isNew
        ? emptyModel((currentCat?.models.length ?? 0) + 1)
        : (catalog[panel.categorySlug]?.models.find((m) => m.id === panel.modelId) ?? null)
      : null;

  const panelCategory: CategoryModels | null =
    panel.type === 'editCategory'
      ? panel.isNew
        ? emptyCategory(sortedCats.length + 1)
        : (catalog[panel.slug] ?? null)
      : null;

  return (
    <div className={styles.editor}>
      {/* ── Status ── */}
      {statusMsg && (
        <div className={styles.statusBar} role="status" aria-live="polite">{statusMsg}</div>
      )}

      {/* ── Storage notice ── */}
      <div className={styles.storageNotice}>
        Изменения сохраняются в браузере (localStorage). Для публикации всем пользователям перенесите JSON в проект или подключите CMS/backend.
      </div>

      {/* ── 3-column layout ── */}
      <div className={styles.layout}>
        {/* Column 1: Categories */}
        <div className={styles.catCol}>
          <div className={styles.colHeader}>
            <span className={styles.colTitle}>Категории</span>
            <button
              type="button"
              className={styles.btnAddSm}
              onClick={() => { setPanel({ type: 'editCategory', slug: '', isNew: true }); setSelectedModelId(null); }}
            >+ Добавить</button>
          </div>
          <div className={styles.catList}>
            {sortedCats.map((cat) => (
              <button
                key={cat.categorySlug}
                type="button"
                className={`${styles.catItem} ${cat.categorySlug === selectedCat ? styles.catItemActive : ''} ${cat.isActive === false ? styles.catItemInactive : ''}`}
                onClick={() => {
                  setSelectedCat(cat.categorySlug);
                  setSelectedModelId(null);
                  setPanel({ type: 'none' });
                }}
              >
                <span className={styles.catItemName}>{cat.categoryTitle}</span>
                {cat.isActive === false && <span className={styles.inactiveBadge}>Выкл</span>}
                <button
                  type="button"
                  className={styles.catEditBtn}
                  title="Настройки категории"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCat(cat.categorySlug);
                    setPanel({ type: 'editCategory', slug: cat.categorySlug, isNew: false });
                  }}
                >⚙</button>
              </button>
            ))}
          </div>
        </div>

        {/* Column 2: Models */}
        <div className={styles.modelCol}>
          {!selectedCat ? (
            <div className={styles.colEmpty}>Выберите категорию</div>
          ) : (
            <>
              <div className={styles.colHeader}>
                <span className={styles.colTitle}>{currentCat?.categoryTitle}</span>
                <button
                  type="button"
                  className={styles.btnAddSm}
                  onClick={() => {
                    setPanel({ type: 'editModel', categorySlug: selectedCat, modelId: '', isNew: true });
                    setSelectedModelId(null);
                  }}
                >+ Модель</button>
              </div>
              {sortedModels.length === 0 && (
                <div className={styles.colEmpty}>Нет моделей. Добавьте первую.</div>
              )}
              <div className={styles.modelList}>
                {sortedModels.map((model) => (
                  <div
                    key={model.id}
                    className={`${styles.modelCard} ${model.id === selectedModelId ? styles.modelCardActive : ''} ${!model.isActive ? styles.modelCardInactive : ''}`}
                    onClick={() => {
                      setSelectedModelId(model.id);
                      setPanel({ type: 'editModel', categorySlug: selectedCat, modelId: model.id, isNew: false });
                    }}
                  >
                    <div className={styles.modelCardImg}>
                      {(() => {
                        const firstImg = model.variants.find((v) => v.image)?.image;
                        return firstImg ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={firstImg} alt={model.name} className={styles.modelCardImgEl} />
                        ) : (
                          <div className={styles.modelCardImgPlaceholder}>📷</div>
                        );
                      })()}
                    </div>
                    <div className={styles.modelCardBody}>
                      <span className={styles.modelCardName}>{model.name}</span>
                      {model.patternCode && (
                        <span className={styles.modelCardCode}>{model.patternCode}</span>
                      )}
                      <span className={styles.modelCardVariants}>
                        {model.variants.length} вар.
                        {!model.isActive && <span className={styles.inactiveBadge}>Выкл</span>}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Column 3: Edit panel */}
        <div className={styles.editCol}>
          {panel.type === 'none' && (
            <div className={styles.colEmpty}>
              {selectedModelId && currentModel
                ? `Выбрана: ${currentModel.name} — нажмите для редактирования`
                : 'Выберите модель или нажмите «+ Модель»'}
            </div>
          )}

          {panel.type === 'editCategory' && panelCategory && (
            <CategoryForm
              cat={panelCategory}
              isNew={panel.isNew}
              isBuiltIn={!panel.isNew && BUILT_IN_SLUGS.has(panel.slug)}
              onSave={saveCategory}
              onCancel={() => setPanel({ type: 'none' })}
              onDelete={!panel.isNew ? () => deleteCategory(panel.slug) : undefined}
            />
          )}

          {panel.type === 'editModel' && panelModel && (
            <ModelForm
              key={`${panel.categorySlug}-${panel.modelId}-${panel.isNew}`}
              model={panelModel}
              isNew={panel.isNew}
              onSave={(m) => saveModel(panel.categorySlug, m)}
              onCancel={() => setPanel({ type: 'none' })}
              onDelete={() => deleteModel(panel.categorySlug, panel.modelId)}
              onDuplicate={() => duplicateModel(panel.categorySlug, panel.modelId)}
            />
          )}
        </div>
      </div>

      {/* ── Advanced: JSON export/import ── */}
      <details className={styles.advanced}>
        <summary className={styles.advancedSummary}>Дополнительно — Экспорт / Импорт JSON</summary>
        <div className={styles.advancedBody}>
          <div className={styles.advancedRow}>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => setExportJson(JSON.stringify(catalog, null, 2))}
            >📤 Экспортировать JSON</button>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => {
                try { localStorage.removeItem(ADMIN_MODELS_KEY); setCatalog(catalogModelsData); showStatus('Сброшено к исходным данным'); setExportJson(''); } catch { /* ignore */ }
              }}
            >↩ Сбросить к данным проекта</button>
          </div>
          {exportJson && (
            <div className={styles.jsonBox}>
              <div className={styles.jsonBoxHeader}>
                <span>JSON для переноса в lib/catalogModels.ts</span>
                <button
                  type="button"
                  className={styles.btnSmall}
                  onClick={() => { void navigator.clipboard.writeText(exportJson).then(() => showStatus('Скопировано')); }}
                >📋 Скопировать</button>
              </div>
              <textarea className={styles.jsonTextarea} rows={10} value={exportJson} readOnly />
            </div>
          )}
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Импорт JSON</label>
            <textarea
              className={styles.jsonTextarea}
              rows={4}
              placeholder='{"futbolki": {"categorySlug": "futbolki", ...}}'
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value) as CatalogModelsMap;
                  persist(parsed);
                  showStatus('JSON импортирован');
                } catch { /* ignore bad json while typing */ }
              }}
            />
          </div>
        </div>
      </details>
    </div>
  );
}

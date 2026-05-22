'use client';

import { useState, useEffect } from 'react';
import { productOptions } from '@/lib/productOptions';
import type { ProductOptionsMap } from '@/lib/productOptions';
import styles from './ProductModelExplorer.module.css';

const ADMIN_STORAGE_KEY = 'teeon_admin_product_options';
const QUOTE_ITEMS_KEY = 'teeon_quote_items';

interface QuoteItem {
  categorySlug: string;
  modelTitle: string;
  optionTitle: string;
  material: string;
  density: string;
  color: string;
  size: string;
  quantity: string;
  branding: string;
  printPosition: string;
  comment: string;
}

interface ProductModelExplorerProps {
  categorySlug: string;
}

export default function ProductModelExplorer({ categorySlug }: ProductModelExplorerProps) {
  const [data, setData] = useState<ProductOptionsMap>(productOptions);
  const [activeGroupIdx, setActiveGroupIdx] = useState(0);
  const [activeOptionIdx, setActiveOptionIdx] = useState(0);
  const [material, setMaterial] = useState('');
  const [density, setDensity] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [branding, setBranding] = useState('');
  const [printPosition, setPrintPosition] = useState('');
  const [comment, setComment] = useState('');
  const [saved, setSaved] = useState(false);
  const [quoteCount, setQuoteCount] = useState(0);

  // Load admin overrides from localStorage (SSR-safe)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ProductOptionsMap;
        setData(parsed);
      }
    } catch { /* ignore */ }

    // Count existing quote items
    try {
      const raw = localStorage.getItem(QUOTE_ITEMS_KEY);
      if (raw) {
        const items = JSON.parse(raw) as QuoteItem[];
        if (Array.isArray(items)) setQuoteCount(items.length);
      }
    } catch { /* ignore */ }
  }, []);

  const groups = data[categorySlug] ?? [];
  if (groups.length === 0) return null;

  const activeGroup = groups[activeGroupIdx];
  const activeOption = activeGroup?.options[activeOptionIdx];
  if (!activeOption) return null;

  const resetSelections = () => {
    setMaterial('');
    setDensity('');
    setColor('');
    setSize('');
    setQuantity('');
    setBranding('');
    setPrintPosition('');
    setComment('');
    setSaved(false);
  };

  const handleGroupChange = (idx: number) => {
    setActiveGroupIdx(idx);
    setActiveOptionIdx(0);
    resetSelections();
  };

  const handleOptionChange = (idx: number) => {
    setActiveOptionIdx(idx);
    resetSelections();
  };

  const handleAddToQuote = () => {
    const item: QuoteItem = {
      categorySlug,
      modelTitle: activeGroup.modelTitle,
      optionTitle: activeOption.title,
      material,
      density,
      color,
      size,
      quantity,
      branding,
      printPosition,
      comment,
    };
    try {
      const raw = localStorage.getItem(QUOTE_ITEMS_KEY);
      const items: QuoteItem[] = raw ? (JSON.parse(raw) as QuoteItem[]) : [];
      items.push(item);
      localStorage.setItem(QUOTE_ITEMS_KEY, JSON.stringify(items));
      setQuoteCount(items.length);
    } catch { /* ignore */ }
    setSaved(true);
  };

  const handleClearQuote = () => {
    try { localStorage.removeItem(QUOTE_ITEMS_KEY); } catch { /* ignore */ }
    setQuoteCount(0);
    setSaved(false);
  };

  const panelId = `pme-panel-${categorySlug}`;

  return (
    <section className={styles.wrapper} aria-labelledby={`pme-title-${categorySlug}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id={`pme-title-${categorySlug}`}>
            Модели и варианты для расчёта
          </h2>
          <p className="section-subtitle">
            Выберите модель, вариант, цвет, плотность, тираж и брендирование — мы передадим параметры в заявку
          </p>
        </div>

        {/* Quote counter */}
        {quoteCount > 0 && (
          <div className={styles.quoteCounter}>
            <span>В расчёте: <strong>{quoteCount}</strong> {quoteCount === 1 ? 'позиция' : quoteCount < 5 ? 'позиции' : 'позиций'}</span>
            <a href="/#request" className={styles.quoteCounterLink}>Перейти к форме →</a>
          </div>
        )}

        {/* Model tabs */}
        <div className={styles.modelTabs} role="tablist" aria-label="Модели">
          {groups.map((g, idx) => (
            <button
              key={g.modelId}
              role="tab"
              aria-selected={idx === activeGroupIdx}
              className={`${styles.modelTab} ${idx === activeGroupIdx ? styles.modelTabActive : ''}`}
              onClick={() => handleGroupChange(idx)}
            >
              {g.modelTitle}
            </button>
          ))}
        </div>

        {/* Model description */}
        {activeGroup.modelDescription && (
          <p className={styles.modelDesc}>{activeGroup.modelDescription}</p>
        )}

        <div className={styles.layout}>
          {/* Option cards */}
          <div className={styles.optionsColumn}>
            <p className={styles.columnLabel}>Выберите вариант</p>
            <div className={styles.optionsGrid}>
              {activeGroup.options.map((opt, idx) => (
                <button
                  key={opt.id}
                  role="tab"
                  aria-selected={idx === activeOptionIdx}
                  aria-controls={`${panelId}-${idx}`}
                  className={`${styles.optionCard} ${idx === activeOptionIdx ? styles.optionCardActive : ''}`}
                  onClick={() => handleOptionChange(idx)}
                >
                  <div className={styles.optionCardImg} aria-label={opt.imageLabel}>
                    {opt.imageSrc ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={opt.imageSrc} alt={opt.imageLabel} className={styles.optionCardImgEl} />
                    ) : (
                      <span className={styles.optionCardImgLabel}>{opt.imageLabel}</span>
                    )}
                  </div>
                  <div className={styles.optionCardBody}>
                    <span className={styles.optionCardTitle}>{opt.title}</span>
                    {opt.densityOptions.length === 1 && (
                      <span className={styles.optionCardDensity}>{opt.densityOptions[0]}</span>
                    )}
                  </div>
                  {idx === activeOptionIdx && (
                    <span className={styles.optionCheck} aria-hidden="true">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Config panel */}
          <div
            className={styles.configPanel}
            role="tabpanel"
            id={`${panelId}-${activeOptionIdx}`}
            aria-labelledby={`pme-title-${categorySlug}`}
          >
            <h3 className={styles.configTitle}>{activeOption.title}</h3>
            <p className={styles.configDesc}>{activeOption.shortDescription}</p>

            {/* Characteristics */}
            {activeOption.characteristics.length > 0 && (
              <ul className={styles.charList}>
                {activeOption.characteristics.map((c) => (
                  <li key={c} className={styles.charItem}>
                    <span className={styles.charDot} aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            )}

            <div className={styles.fields}>
              {/* Material */}
              {activeOption.materialOptions.length > 0 && (
                <div className={styles.field}>
                  <label htmlFor={`pme-mat-${categorySlug}`} className={styles.fieldLabel}>Материал</label>
                  <select id={`pme-mat-${categorySlug}`} className={styles.select} value={material} onChange={(e) => setMaterial(e.target.value)}>
                    <option value="">Выберите материал</option>
                    {activeOption.materialOptions.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              )}

              {/* Density */}
              {activeOption.densityOptions.length > 0 && (
                <div className={styles.field}>
                  <label htmlFor={`pme-den-${categorySlug}`} className={styles.fieldLabel}>Плотность</label>
                  <select id={`pme-den-${categorySlug}`} className={styles.select} value={density} onChange={(e) => setDensity(e.target.value)}>
                    <option value="">Выберите плотность</option>
                    {activeOption.densityOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              )}

              {/* Color swatches */}
              {activeOption.colorOptions.length > 0 && (
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Цвет {color && <span className={styles.colorSelected}>— {color}</span>}</span>
                  <div className={styles.swatches} role="group" aria-label="Выбор цвета">
                    {activeOption.colorOptions.map((c) => (
                      <button
                        key={c.name}
                        className={`${styles.swatch} ${color === c.name ? styles.swatchActive : ''}`}
                        style={{ background: c.hex, borderColor: c.hex === '#ffffff' ? '#e2e8f0' : 'transparent' }}
                        onClick={() => setColor(c.name)}
                        aria-label={c.name}
                        title={c.name}
                        aria-pressed={color === c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size */}
              {activeOption.sizeOptions.length > 0 && (
                <div className={styles.field}>
                  <label htmlFor={`pme-sz-${categorySlug}`} className={styles.fieldLabel}>Размеры / размерная сетка</label>
                  <select id={`pme-sz-${categorySlug}`} className={styles.select} value={size} onChange={(e) => setSize(e.target.value)}>
                    <option value="">Выберите размеры</option>
                    {activeOption.sizeOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}

              {/* Quantity */}
              <div className={styles.field}>
                <label htmlFor={`pme-qty-${categorySlug}`} className={styles.fieldLabel}>Тираж</label>
                <select id={`pme-qty-${categorySlug}`} className={styles.select} value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                  <option value="">Выберите тираж</option>
                  {activeOption.quantityOptions.map((q) => <option key={q} value={q}>{q}</option>)}
                </select>
              </div>

              {/* Branding */}
              {activeOption.brandingOptions.length > 0 && (
                <div className={styles.field}>
                  <label htmlFor={`pme-br-${categorySlug}`} className={styles.fieldLabel}>Брендирование</label>
                  <select id={`pme-br-${categorySlug}`} className={styles.select} value={branding} onChange={(e) => setBranding(e.target.value)}>
                    <option value="">Выберите способ нанесения</option>
                    {activeOption.brandingOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              )}

              {/* Print position */}
              {activeOption.printPositions.length > 0 && (
                <div className={styles.field}>
                  <label htmlFor={`pme-pos-${categorySlug}`} className={styles.fieldLabel}>Расположение логотипа</label>
                  <select id={`pme-pos-${categorySlug}`} className={styles.select} value={printPosition} onChange={(e) => setPrintPosition(e.target.value)}>
                    <option value="">Выберите расположение</option>
                    {activeOption.printPositions.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              )}

              {/* Comment */}
              <div className={styles.field}>
                <label htmlFor={`pme-cmt-${categorySlug}`} className={styles.fieldLabel}>Комментарий к позиции</label>
                <textarea id={`pme-cmt-${categorySlug}`} className={styles.textarea} rows={2} placeholder="Особые пожелания по этой позиции..." value={comment} onChange={(e) => setComment(e.target.value)} />
              </div>
            </div>

            {/* Price factors */}
            {activeOption.priceFactors.length > 0 && (
              <p className={styles.priceNote}>
                На стоимость влияет: {activeOption.priceFactors.join(', ')}.
              </p>
            )}

            {/* Actions */}
            <div className={styles.actions}>
              <button className={styles.addBtn} onClick={handleAddToQuote}>
                Добавить в расчёт
              </button>

              {saved && (
                <div className={styles.savedMsg} role="status" aria-live="polite">
                  <span>✓ Позиция добавлена. Можно выбрать ещё или перейти к форме.</span>
                  <div className={styles.savedBtns}>
                    <a href="/#request" className={styles.toFormBtn}>Перейти к форме →</a>
                    <button className={styles.clearBtn} onClick={handleClearQuote}>Очистить выбранное</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

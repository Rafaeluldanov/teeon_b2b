'use client';

import { useState } from 'react';
import { productOptions } from '@/lib/productOptions';
import type { ProductColor } from '@/lib/productOptions';
import styles from './ProductConfigurator.module.css';

interface ProductConfiguratorProps {
  categorySlug: string;
}

interface QuoteSelection {
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

export default function ProductConfigurator({ categorySlug }: ProductConfiguratorProps) {
  const groups = productOptions[categorySlug];

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

  if (!groups || groups.length === 0) return null;

  const activeGroup = groups[activeGroupIdx];
  const activeOption = activeGroup.options[activeOptionIdx];

  const handleGroupChange = (idx: number) => {
    setActiveGroupIdx(idx);
    setActiveOptionIdx(0);
    setSaved(false);
    setMaterial('');
    setDensity('');
    setColor('');
    setSize('');
    setQuantity('');
    setBranding('');
    setPrintPosition('');
    setComment('');
  };

  const handleOptionChange = (idx: number) => {
    setActiveOptionIdx(idx);
    setSaved(false);
    setMaterial('');
    setDensity('');
    setColor('');
  };

  const handleAddToQuote = () => {
    const selection: QuoteSelection = {
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
      localStorage.setItem('teeon_quote_selection', JSON.stringify(selection));
    } catch {
      // localStorage not available
    }
    setSaved(true);
  };

  return (
    <section className={styles.wrapper} aria-labelledby={`configurator-title-${categorySlug}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id={`configurator-title-${categorySlug}`}>
            Соберите вариант для расчёта
          </h2>
          <p className="section-subtitle">
            Выберите модель, вариант, цвет, плотность, тираж и брендирование — мы передадим параметры в заявку
          </p>
        </div>

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

        <div className={styles.layout}>
          {/* Option cards */}
          <div className={styles.optionsPanel}>
            <p className={styles.optionsPanelLabel}>Вариант</p>
            <div className={styles.optionsGrid}>
              {activeGroup.options.map((opt, idx) => (
                <button
                  key={opt.id}
                  className={`${styles.optionCard} ${idx === activeOptionIdx ? styles.optionCardActive : ''}`}
                  onClick={() => handleOptionChange(idx)}
                  aria-pressed={idx === activeOptionIdx}
                  aria-label={opt.title}
                >
                  <div className={styles.optionCardImg} role="img" aria-label={opt.imageLabel}>
                    <span className={styles.optionCardImgLabel}>{opt.imageLabel}</span>
                  </div>
                  <div className={styles.optionCardBody}>
                    <span className={styles.optionCardTitle}>{opt.title}</span>
                    <span className={styles.optionCardDesc}>{opt.shortDescription}</span>
                  </div>
                  {idx === activeOptionIdx && (
                    <span className={styles.optionCardCheck} aria-hidden="true">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Configuration panel */}
          <div className={styles.configPanel}>
            <h3 className={styles.configTitle}>{activeOption.title}</h3>
            <p className={styles.configDesc}>{activeOption.shortDescription}</p>

            {/* Material */}
            {activeOption.materialOptions.length > 0 && (
              <div className={styles.field}>
                <label htmlFor={`mat-${categorySlug}`} className={styles.fieldLabel}>Материал</label>
                <select
                  id={`mat-${categorySlug}`}
                  className={styles.select}
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                >
                  <option value="">Выберите материал</option>
                  {activeOption.materialOptions.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Density */}
            {activeOption.densityOptions.length > 0 && (
              <div className={styles.field}>
                <label htmlFor={`den-${categorySlug}`} className={styles.fieldLabel}>Плотность</label>
                <select
                  id={`den-${categorySlug}`}
                  className={styles.select}
                  value={density}
                  onChange={(e) => setDensity(e.target.value)}
                >
                  <option value="">Выберите плотность</option>
                  {activeOption.densityOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Color swatches */}
            {activeOption.colorOptions.length > 0 && (
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Цвет</span>
                {color && <span className={styles.colorSelected}>Выбран: {color}</span>}
                <div className={styles.colorSwatches} role="group" aria-label="Выбор цвета">
                  {activeOption.colorOptions.map((c: ProductColor) => (
                    <button
                      key={c.name}
                      className={`${styles.swatch} ${color === c.name ? styles.swatchActive : ''}`}
                      style={{ background: c.hex, borderColor: c.hex === '#ffffff' ? '#e2e8f0' : c.hex }}
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
                <label htmlFor={`sz-${categorySlug}`} className={styles.fieldLabel}>Размеры / размерная сетка</label>
                <select
                  id={`sz-${categorySlug}`}
                  className={styles.select}
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="">Выберите размеры</option>
                  {activeOption.sizeOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity */}
            <div className={styles.field}>
              <label htmlFor={`qty-${categorySlug}`} className={styles.fieldLabel}>Тираж</label>
              <select
                id={`qty-${categorySlug}`}
                className={styles.select}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                <option value="">Выберите тираж</option>
                {activeOption.quantityOptions.map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>

            {/* Branding */}
            {activeOption.brandingOptions.length > 0 && (
              <div className={styles.field}>
                <label htmlFor={`br-${categorySlug}`} className={styles.fieldLabel}>Брендирование</label>
                <select
                  id={`br-${categorySlug}`}
                  className={styles.select}
                  value={branding}
                  onChange={(e) => setBranding(e.target.value)}
                >
                  <option value="">Выберите способ нанесения</option>
                  {activeOption.brandingOptions.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Print position */}
            {activeOption.printPositions.length > 0 && (
              <div className={styles.field}>
                <label htmlFor={`pos-${categorySlug}`} className={styles.fieldLabel}>Расположение логотипа</label>
                <select
                  id={`pos-${categorySlug}`}
                  className={styles.select}
                  value={printPosition}
                  onChange={(e) => setPrintPosition(e.target.value)}
                >
                  <option value="">Выберите расположение</option>
                  {activeOption.printPositions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Comment */}
            <div className={styles.field}>
              <label htmlFor={`cmt-${categorySlug}`} className={styles.fieldLabel}>Комментарий к заявке</label>
              <textarea
                id={`cmt-${categorySlug}`}
                className={styles.textarea}
                rows={3}
                placeholder="Особые пожелания, сроки, дополнительные детали..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {/* Price factors note */}
            {activeOption.priceFactors.length > 0 && (
              <p className={styles.priceNote}>
                На стоимость влияют: {activeOption.priceFactors.join(', ')}.
                Точный расчёт после отправки заявки.
              </p>
            )}

            <div className={styles.configActions}>
              <button
                className={styles.addToQuoteBtn}
                onClick={handleAddToQuote}
              >
                Добавить в расчёт
              </button>
              {saved && (
                <div className={styles.savedMsg} role="status" aria-live="polite">
                  <span>✓ Параметры добавлены в заявку.</span>
                  <a href="/#request" className={styles.toFormLink}>
                    Перейти к форме →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

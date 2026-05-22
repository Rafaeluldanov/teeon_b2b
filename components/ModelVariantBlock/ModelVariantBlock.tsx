'use client';

import { useState, useEffect } from 'react';
import { catalogModelsData } from '@/lib/catalogModels';
import type { CatalogModelsMap, CatalogModel, CatalogVariant } from '@/lib/catalogModels';
import styles from './ModelVariantBlock.module.css';

const ADMIN_MODELS_KEY = 'teeon_admin_catalog_models';
const SELECTED_VARIANT_KEY = 'teeon_selected_variant';

interface ModelVariantBlockProps {
  categorySlug: string;
}

const ArrowIc = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
  </svg>
);

const ImagePlaceholderSvg = () => (
  <>
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="4" y="12" width="56" height="40" rx="4"/>
      <circle cx="22" cy="28" r="6"/>
      <path d="M4 44 L20 28 L36 44 M44 36 L56 44"/>
    </svg>
    <span>Фото не добавлено</span>
  </>
);

export default function ModelVariantBlock({ categorySlug }: ModelVariantBlockProps) {
  const [modelsData, setModelsData] = useState<CatalogModelsMap>(catalogModelsData);
  const [activeModelIdx, setActiveModelIdx] = useState(0);
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ADMIN_MODELS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CatalogModelsMap;
        setModelsData(parsed);
      }
    } catch { /* ignore */ }
  }, []);

  const category = modelsData[categorySlug];
  if (!category) return null;

  const activeModels = category.models.filter((m) => m.isActive);
  if (activeModels.length === 0) return null;

  const activeModel: CatalogModel = activeModels[activeModelIdx] ?? activeModels[0];
  const activeVariants = activeModel.variants.filter((v) => v.isActive);
  const activeVariant: CatalogVariant | undefined = activeVariants[activeVariantIdx];

  const handleModelChange = (idx: number) => {
    setActiveModelIdx(idx);
    setActiveVariantIdx(0);
    setSaved(false);
  };

  const handleVariantChange = (idx: number) => {
    setActiveVariantIdx(idx);
    setSaved(false);
  };

  const handleCalculate = () => {
    if (!activeVariant) return;
    const selection = {
      categorySlug,
      categoryTitle: category.categoryTitle,
      modelName: activeModel.name,
      variantName: activeVariant.name,
      variantId: activeVariant.id,
    };
    try {
      localStorage.setItem(SELECTED_VARIANT_KEY, JSON.stringify(selection));
    } catch { /* ignore */ }
    setSaved(true);
    const el = document.getElementById('request');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = '/#request';
    }
  };

  return (
    <section className={styles.wrapper} aria-labelledby={`mvb-title-${categorySlug}`}>
      <div className={styles.headRow}>
        <div>
          <div className={styles.kicker}>Модели</div>
          <h2 id={`mvb-title-${categorySlug}`}>
            Модели и <em>варианты</em>
          </h2>
        </div>
        <p>Выберите модель и вариант — передадим параметры в заявку и подберём условия под ваш тираж.</p>
      </div>

      {/* ── Model tabs ── */}
      <div className={styles.modelTabsRow} role="tablist" aria-label="Модели">
        {activeModels.map((model, idx) => (
          <button
            key={model.id}
            role="tab"
            aria-selected={idx === activeModelIdx}
            className={`${styles.modelTab} ${idx === activeModelIdx ? styles.modelTabActive : ''}`}
            onClick={() => handleModelChange(idx)}
          >
            {model.name}
          </button>
        ))}
      </div>

      {/* ── Model description ── */}
      {activeModel.shortDescription && (
        <p className={styles.modelDesc}>{activeModel.shortDescription}</p>
      )}

      {/* ── Variant cards ── */}
      {activeVariants.length > 1 && (
        <>
          <p className={styles.variantsLabel}>Выберите вариант</p>
          <div className={styles.variantsGrid}>
            {activeVariants.map((variant, idx) => (
              <button
                key={variant.id}
                role="tab"
                aria-selected={idx === activeVariantIdx}
                className={`${styles.variantCard} ${idx === activeVariantIdx ? styles.variantCardActive : ''}`}
                onClick={() => handleVariantChange(idx)}
              >
                <div className={styles.variantCardImg}>
                  {variant.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={variant.image} alt={variant.name} className={styles.variantCardImgEl} />
                  ) : (
                    <span className={styles.variantCardImgPlaceholder}>{variant.name}</span>
                  )}
                </div>
                <div className={styles.variantCardBody}>
                  <span className={styles.variantCardName}>{variant.name}</span>
                  {variant.subtitle && (
                    <span className={styles.variantCardSub}>{variant.subtitle}</span>
                  )}
                </div>
                {idx === activeVariantIdx && (
                  <span className={styles.variantCheckBadge} aria-hidden="true">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}

      {/* ── Variant detail ── */}
      {activeVariant && (
        <div className={styles.detail}>
          {/* Top: image + info */}
          <div className={styles.detailTop}>
            {/* Image */}
            <div className={styles.detailImg}>
              {activeVariant.image ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeVariant.image}
                    alt={activeVariant.name}
                    className={styles.detailImgEl}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      const fallback = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className={styles.detailImgPlaceholder} style={{ display: 'none' }}>
                    <ImagePlaceholderSvg />
                  </div>
                </>
              ) : (
                <div className={styles.detailImgPlaceholder}>
                  <ImagePlaceholderSvg />
                </div>
              )}
            </div>

            {/* Info */}
            <div className={styles.detailInfo}>
              <h3 className={styles.detailName}>{activeVariant.name}</h3>
              {activeVariant.subtitle && (
                <p className={styles.detailSub}>{activeVariant.subtitle}</p>
              )}
              {activeVariant.patternCode && (
                <p className={styles.detailCode}>Лекало: {activeVariant.patternCode}</p>
              )}
              <p className={styles.detailDesc}>{activeVariant.description}</p>

              {activeVariant.features.length > 0 && (
                <ul className={styles.featureList} aria-label="Характеристики">
                  {activeVariant.features.map((f) => (
                    <li key={f} className={styles.featureItem}>
                      <span className={styles.featureDot} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <button className={styles.ctaBtn} onClick={handleCalculate}>
                Рассчитать эту модель
                <span className={styles.ctaBtnIc} aria-hidden="true"><ArrowIc /></span>
              </button>

              {saved && (
                <div className={styles.savedNotice} role="status" aria-live="polite">
                  ✓ Вариант выбран — переходим к форме заявки
                </div>
              )}
            </div>
          </div>

          {/* Bottom: 3 sub-sections */}
          {(activeVariant.suitableFor.length > 0 || activeVariant.brandingOptions.length > 0 || activeVariant.configurableOptions.length > 0) && (
            <div className={styles.detailSections}>
              {activeVariant.suitableFor.length > 0 && (
                <div className={styles.subSection}>
                  <h4 className={styles.subSectionTitle}>Для каких задач подходит</h4>
                  <ul className={styles.checkList}>
                    {activeVariant.suitableFor.map((s) => (
                      <li key={s} className={styles.checkItem}>
                        <span className={styles.checkIcon} aria-hidden="true">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeVariant.brandingOptions.length > 0 && (
                <div className={styles.subSection}>
                  <h4 className={styles.subSectionTitle}>Варианты брендирования</h4>
                  <ul className={styles.brandingList}>
                    {activeVariant.brandingOptions.map((b) => (
                      <li key={b} className={styles.brandingItem}>
                        <span className={styles.brandingDot} aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeVariant.configurableOptions.length > 0 && (
                <div className={styles.subSection}>
                  <h4 className={styles.subSectionTitle}>Что можно настроить</h4>
                  <ul className={styles.configList}>
                    {activeVariant.configurableOptions.map((c) => (
                      <li key={c} className={styles.configItem}>
                        <span className={styles.configDot} aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

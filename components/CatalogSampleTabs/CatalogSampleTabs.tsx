'use client';

import { useState } from 'react';
import { catalogSamples } from '@/lib/catalogSamples';
import Lightbox, { type LightboxState } from '@/components/Lightbox/Lightbox';
import styles from './CatalogSampleTabs.module.css';

interface Props {
  categorySlug: string;
}

export default function CatalogSampleTabs({ categorySlug }: Props) {
  const samples = catalogSamples[categorySlug];
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  if (!samples || samples.length === 0) return null;

  const active = samples[activeIdx];
  const panelId = `sample-panel-${categorySlug}`;
  const allImages = samples.map((s) => s.imageSrc).filter((s): s is string => Boolean(s));

  return (
    <section className={styles.wrapper} aria-labelledby={`sample-tabs-title-${categorySlug}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" id={`sample-tabs-title-${categorySlug}`}>
            Образцы и варианты моделей
          </h2>
          <p className="section-subtitle">
            Выберите базовую модель — мы адаптируем ткань, цвет, крой, размерную сетку и брендирование под ваш тираж
          </p>
        </div>

        {/* Tab buttons */}
        <div className={styles.tabList} role="tablist" aria-label="Модели">
          {samples.map((s, idx) => (
            <button
              key={s.title}
              role="tab"
              aria-selected={idx === activeIdx}
              aria-controls={`${panelId}-${idx}`}
              id={`sample-tab-${categorySlug}-${idx}`}
              className={`${styles.tab} ${idx === activeIdx ? styles.tabActive : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Tab panels — render all but hide inactive for SEO */}
        {samples.map((s, idx) => (
          <div
            key={s.title}
            role="tabpanel"
            id={`${panelId}-${idx}`}
            aria-labelledby={`sample-tab-${categorySlug}-${idx}`}
            hidden={idx !== activeIdx}
            className={styles.panel}
          >
            <div className={styles.panelGrid}>
              {/* Image */}
              <div className={styles.imageWrapper} aria-label={s.imageLabel}>
                {s.imageSrc ? (
                  <button
                    type="button"
                    className={styles.imageBtn}
                    onClick={() => {
                      const idx = allImages.indexOf(s.imageSrc!);
                      setLightbox({ images: allImages, index: idx >= 0 ? idx : 0 });
                    }}
                    aria-label={`Открыть фото: ${s.imageLabel}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.imageSrc} alt={s.imageLabel} className={styles.image} loading="lazy" decoding="async" />
                  </button>
                ) : (
                  <div className={styles.imagePlaceholder} aria-hidden="true" />
                )}
              </div>

              {/* Info */}
              <div className={styles.info}>
                <h3 className={styles.sampleTitle}>{s.title}</h3>
                {s.subtitle && <p className={styles.sampleSubtitle}>{s.subtitle}</p>}
                <p className={styles.sampleDesc}>{s.description}</p>

                <div className={styles.infoRow}>
                  <div className={styles.infoBlock}>
                    <h4 className={styles.infoLabel}>Характеристики</h4>
                    <ul className={styles.specList}>
                      {s.specs.map((spec) => (
                        <li key={spec} className={styles.specItem}>
                          <span className={styles.specDot} aria-hidden="true" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.infoBlock}>
                    <h4 className={styles.infoLabel}>Подходит для</h4>
                    <ul className={styles.useCaseList}>
                      {s.useCases.map((u) => (
                        <li key={u} className={styles.useCaseItem}>
                          <span className={styles.checkIcon} aria-hidden="true">✓</span>
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.infoBlock}>
                    <h4 className={styles.infoLabel}>Брендирование</h4>
                    <div className={styles.brandingTags}>
                      {s.recommendedBranding.map((b) => (
                        <span key={b} className={styles.brandingTag}>{b}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <a href="/#request" className={`btn-primary ${styles.ctaBtn}`}>
                  Рассчитать эту модель
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Accessible label for screen readers */}
        <p className={styles.srOnly} aria-live="polite">
          {active.title} — выбрана вкладка {activeIdx + 1} из {samples.length}
        </p>
      </div>
      <Lightbox state={lightbox} onChange={setLightbox} />
    </section>
  );
}

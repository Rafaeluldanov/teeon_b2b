'use client';

import { useState, useEffect } from 'react';
import { brandingSamples } from '@/lib/brandingSamples';
import type { BrandingSample } from '@/lib/brandingSamples';
import { BRANDING_SAMPLES_LS_KEY } from '@/lib/editableBrandingSamples';
import type { EditableBrandingSamplesMap } from '@/lib/editableBrandingSamples';
import Image from 'next/image';
import Lightbox, { type LightboxState } from '@/components/Lightbox/Lightbox';
import styles from './BrandingSampleTabs.module.css';

interface Props {
  methodSlug: string;
}

const ImagePlaceholderSvg = () => (
  <>
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="4" y="12" width="56" height="40" rx="4"/>
      <circle cx="22" cy="28" r="6"/>
      <path d="M4 44 L20 28 L36 44 M44 36 L56 44"/>
    </svg>
  </>
);

export default function BrandingSampleTabs({ methodSlug }: Props) {
  const [samples, setSamples] = useState<BrandingSample[]>(brandingSamples[methodSlug] ?? []);
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(BRANDING_SAMPLES_LS_KEY);
      if (raw) {
        const map = JSON.parse(raw) as EditableBrandingSamplesMap;
        const overrides = map[methodSlug];
        if (overrides && overrides.length > 0) {
          const mapped: BrandingSample[] = overrides
            .filter((s) => s.isActive)
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((s) => ({
              title: s.title,
              subtitle: s.subtitle,
              description: s.description,
              imageLabel: s.imageLabel ?? s.title,
              imageSrc: s.image || undefined,
              effect: s.effect,
              bestFor: s.bestFor,
              materials: s.materials,
              limitations: s.limitations,
              relatedProducts: s.relatedProducts,
            }));
          if (mapped.length > 0) setSamples(mapped);
        }
      }
    } catch { /* ignore */ }
  }, [methodSlug]);

  if (!samples || samples.length === 0) return null;

  const active = samples[activeIdx];
  const panelId = `branding-panel-${methodSlug}`;
  const allImages = samples.map((s) => s.imageSrc).filter((s): s is string => Boolean(s));

  return (
    <section className={styles.wrapper} aria-labelledby={`branding-tabs-title-${methodSlug}`}>
      <div className={styles.headRow}>
        <div>
          <div className={styles.kicker}>Варианты</div>
          <h2 id={`branding-tabs-title-${methodSlug}`}>
            Варианты нанесения<br />и <em>эффекты</em>
          </h2>
        </div>
        <p>Выберите эффект или тип нанесения — подскажем, подойдёт ли он под изделие, ткань и тираж.</p>
      </div>

      <div className={styles.tabList} role="tablist" aria-label="Варианты нанесения">
        {samples.map((s, idx) => (
          <button
            key={s.title}
            role="tab"
            aria-selected={idx === activeIdx}
            aria-controls={`${panelId}-${idx}`}
            id={`branding-tab-${methodSlug}-${idx}`}
            className={`${styles.tab} ${idx === activeIdx ? styles.tabActive : ''}`}
            onClick={() => setActiveIdx(idx)}
          >
            {s.title}
          </button>
        ))}
      </div>

      {samples.map((s, idx) => (
        <div
          key={s.title}
          role="tabpanel"
          id={`${panelId}-${idx}`}
          aria-labelledby={`branding-tab-${methodSlug}-${idx}`}
          hidden={idx !== activeIdx}
          className={styles.panel}
        >
          <div className={styles.panelGrid}>
            {/* Image */}
            <div className={styles.imageWrapper} aria-label={s.imageLabel}>
              {/* Рендерим <img> только для активной вкладки: скрытые табы иначе
                  eager-загружают тяжёлые sample-картинки. При переключении таба
                  картинка нового активного таба монтируется и грузится по требованию. */}
              {s.imageSrc && idx === activeIdx ? (
                <button
                  type="button"
                  className={styles.imageBtn}
                  onClick={() => {
                    const idx = allImages.indexOf(s.imageSrc!);
                    setLightbox({ images: allImages, index: idx >= 0 ? idx : 0 });
                  }}
                  aria-label={`Открыть фото: ${s.imageLabel}`}
                >
                  <Image
                    src={s.imageSrc}
                    alt={s.imageLabel}
                    className={styles.image}
                    width={800}
                    height={600}
                    sizes="(max-width: 480px) 92vw, 480px"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      const fb = (e.currentTarget.parentElement?.parentElement?.querySelector(`.${styles.imagePlaceholder}`)) as HTMLElement | null;
                      if (fb) fb.style.display = 'flex';
                    }}
                  />
                </button>
              ) : null}
              {!s.imageSrc && (
                <div className={styles.imagePlaceholder}>
                  <ImagePlaceholderSvg />
                </div>
              )}
              {s.imageSrc && (
                <div className={styles.imagePlaceholder} style={{ display: 'none' }}>
                  <ImagePlaceholderSvg />
                </div>
              )}
            </div>

            {/* Info */}
            <div className={styles.info}>
              <h3 className={styles.sampleTitle}>{s.title}</h3>
              {s.subtitle && <p className={styles.sampleSubtitle}>{s.subtitle}</p>}
              <p className={styles.sampleDesc}>{s.description}</p>

              <div className={styles.effectBlock}>
                <div className={styles.infoLabel}>Эффект</div>
                <p className={styles.effectText}>{s.effect}</p>
              </div>

              <div className={styles.infoRow}>
                <div className={styles.infoBlock}>
                  <div className={styles.infoLabel}>Лучше всего для</div>
                  <ul className={styles.checkList}>
                    {s.bestFor.map((b) => (
                      <li key={b} className={styles.checkItem}>
                        <span className={styles.checkIcon} aria-hidden="true">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.infoLabel}>Материалы</div>
                  <ul className={styles.dotList}>
                    {s.materials.map((mat) => (
                      <li key={mat} className={styles.dotItem}>
                        <span className={styles.dot} aria-hidden="true" />
                        {mat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.infoBlock}>
                  <div className={styles.infoLabel}>Ограничения</div>
                  <ul className={styles.warnList}>
                    {s.limitations.map((l) => (
                      <li key={l} className={styles.warnItem}>
                        <span className={styles.warnIcon} aria-hidden="true">!</span>
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a href="/#request" className={`v6-btn v6-btn--yellow ${styles.ctaBtn}`}>
                Рассчитать нанесение
                <span className="v6-ic" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11 L11 3 M5 3 L11 3 L11 9" stroke="currentColor" strokeWidth="1.7"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      ))}

      <p className={styles.srOnly} aria-live="polite">
        {active.title} — выбрана вкладка {activeIdx + 1} из {samples.length}
      </p>
      <Lightbox state={lightbox} onChange={setLightbox} />
    </section>
  );
}

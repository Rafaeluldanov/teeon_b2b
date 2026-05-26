'use client';

import { useEffect, useState } from 'react';
import styles from './Lightbox.module.css';

export interface LightboxState {
  images: string[];
  index: number;
}

interface Props {
  state: LightboxState | null;
  onChange: (state: LightboxState | null) => void;
}

export default function Lightbox({ state, onChange }: Props) {
  const [zoom, setZoom] = useState<{ scale: number; ox: number; oy: number }>({ scale: 1, ox: 50, oy: 50 });

  useEffect(() => {
    setZoom({ scale: 1, ox: 50, oy: 50 });
  }, [state?.index, state?.images]);

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null);
      if (e.key === 'ArrowRight') onChange({ ...state, index: (state.index + 1) % state.images.length });
      if (e.key === 'ArrowLeft')  onChange({ ...state, index: (state.index - 1 + state.images.length) % state.images.length });
      if (e.key === '+' || e.key === '=') setZoom((z) => ({ ...z, scale: Math.min(z.scale + 0.5, 5) }));
      if (e.key === '-') setZoom((z) => ({ ...z, scale: Math.max(z.scale - 0.5, 1) }));
      if (e.key === '0') setZoom({ scale: 1, ox: 50, oy: 50 });
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [state, onChange]);

  if (!state) return null;

  return (
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр изображения"
      onClick={() => onChange(null)}
    >
      <button
        type="button"
        className={styles.lightboxClose}
        onClick={(e) => { e.stopPropagation(); onChange(null); }}
        aria-label="Закрыть"
      >✕</button>
      {state.images.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(e) => { e.stopPropagation(); onChange({ ...state, index: (state.index - 1 + state.images.length) % state.images.length }); }}
            aria-label="Предыдущее"
          >‹</button>
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => { e.stopPropagation(); onChange({ ...state, index: (state.index + 1) % state.images.length }); }}
            aria-label="Следующее"
          >›</button>
        </>
      )}
      <div className={styles.lightboxZoomControls} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.lightboxZoomBtn} onClick={() => setZoom((z) => ({ ...z, scale: Math.max(z.scale - 0.5, 1) }))} aria-label="Уменьшить" disabled={zoom.scale <= 1}>−</button>
        <span className={styles.lightboxZoomLevel}>{Math.round(zoom.scale * 100)}%</span>
        <button type="button" className={styles.lightboxZoomBtn} onClick={() => setZoom((z) => ({ ...z, scale: Math.min(z.scale + 0.5, 5) }))} aria-label="Увеличить" disabled={zoom.scale >= 5}>+</button>
        {zoom.scale !== 1 && (
          <button type="button" className={styles.lightboxZoomReset} onClick={() => setZoom({ scale: 1, ox: 50, oy: 50 })} aria-label="Сбросить">1:1</button>
        )}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={state.images[state.index]}
        alt=""
        className={styles.lightboxImg}
        style={{
          transform: `scale(${zoom.scale})`,
          transformOrigin: `${zoom.ox}% ${zoom.oy}%`,
          cursor: zoom.scale > 1 ? 'zoom-out' : 'zoom-in',
          transition: 'transform .12s ease-out',
        }}
        onClick={(e) => {
          e.stopPropagation();
          const rect = (e.currentTarget as HTMLImageElement).getBoundingClientRect();
          const ox = ((e.clientX - rect.left) / rect.width) * 100;
          const oy = ((e.clientY - rect.top) / rect.height) * 100;
          setZoom((z) => z.scale > 1 ? { scale: 1, ox: 50, oy: 50 } : { scale: 2.5, ox, oy });
        }}
        onMouseMove={(e) => {
          if (zoom.scale <= 1) return;
          const rect = (e.currentTarget as HTMLImageElement).getBoundingClientRect();
          const ox = ((e.clientX - rect.left) / rect.width) * 100;
          const oy = ((e.clientY - rect.top) / rect.height) * 100;
          setZoom((z) => ({ ...z, ox, oy }));
        }}
        onWheel={(e) => {
          e.stopPropagation();
          const rect = (e.currentTarget as HTMLImageElement).getBoundingClientRect();
          const ox = ((e.clientX - rect.left) / rect.width) * 100;
          const oy = ((e.clientY - rect.top) / rect.height) * 100;
          const delta = e.deltaY < 0 ? 0.3 : -0.3;
          setZoom((z) => {
            const next = Math.min(5, Math.max(1, z.scale + delta));
            return next === 1 ? { scale: 1, ox: 50, oy: 50 } : { scale: next, ox, oy };
          });
        }}
        draggable={false}
      />
      {state.images.length > 1 && (
        <div className={styles.lightboxCounter}>{state.index + 1} / {state.images.length}</div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import Lightbox, { type LightboxState } from '@/components/Lightbox/Lightbox';

interface Props {
  src: string;
  alt: string;
  wrapperClassName?: string;
  imgClassName?: string;
  ariaLabel?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

// Клиентский <img>-внутри-<button>, который по клику открывает lightbox
// поверх страницы (зум +/-, ESC закрывает). Используется в server components,
// где нельзя навешивать onClick прямо на JSX.
export default function ZoomableImage({
  src,
  alt,
  wrapperClassName,
  imgClassName,
  ariaLabel,
  loading = 'lazy',
  decoding = 'async',
}: Props) {
  const [state, setState] = useState<LightboxState | null>(null);
  const [broken, setBroken] = useState(false);

  if (broken) return null;

  return (
    <>
      <button
        type="button"
        className={wrapperClassName}
        onClick={() => setState({ images: [src], index: 0 })}
        aria-label={ariaLabel ?? `Открыть изображение: ${alt}`}
        // Сбрасываем дефолтные стили <button>, чтобы он визуально совпадал
        // с обычным <div>-контейнером карточки (рамка/padding/курсор).
        style={{ border: 0, padding: 0, background: 'transparent', cursor: 'zoom-in', font: 'inherit', textAlign: 'inherit' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={imgClassName}
          loading={loading}
          decoding={decoding}
          onError={() => setBroken(true)}
        />
      </button>
      <Lightbox state={state} onChange={setState} />
    </>
  );
}

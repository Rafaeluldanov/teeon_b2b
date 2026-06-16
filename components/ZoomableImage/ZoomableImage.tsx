'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Lightbox, { type LightboxState } from '@/components/Lightbox/Lightbox';

interface Props {
  src: string;
  alt: string;
  wrapperClassName?: string;
  imgClassName?: string;
  ariaLabel?: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
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
  width = 800,
  height = 600,
  sizes = '(max-width: 760px) 92vw, (max-width: 1100px) 44vw, 520px',
  loading = 'lazy',
}: Props) {
  const [state, setState] = useState<LightboxState | null>(null);
  const [broken, setBroken] = useState(false);
  // Portal-target должен браться только в браузере. На SSR document не существует.
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  useEffect(() => { setPortalTarget(document.body); }, []);

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
        <Image
          src={src}
          alt={alt}
          className={imgClassName}
          width={width}
          height={height}
          sizes={sizes}
          loading={loading}
          onError={() => setBroken(true)}
        />
      </button>
      {/* Рендерим Lightbox в <body>, чтобы position:fixed не ломался transition-transform
          и overflow:hidden у родительской карточки. Без портала лайтбокс открывался
          в пределах карточки и подрагивал при hover из-за contenting block ancestor. */}
      {portalTarget && state && createPortal(
        <Lightbox state={state} onChange={setState} />,
        portalTarget,
      )}
    </>
  );
}

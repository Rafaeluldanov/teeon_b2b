'use client';

import { ImgHTMLAttributes, useState } from 'react';

// Клиентский <img>, который сам прячется при ошибке загрузки.
// Нужен потому что server components не могут передавать onError в JSX.
// По умолчанию ленивая загрузка и асинхронное декодирование — большинство
// SafeImg ниже первого экрана (коллажи каталога, примеры, фолбэки). Любой вызов
// может переопределить loading/decoding явно (например loading="eager" под LCP).
export default function SafeImg({
  loading = 'lazy',
  decoding = 'async',
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [broken, setBroken] = useState(false);
  if (broken) return null;
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img loading={loading} decoding={decoding} {...props} onError={() => setBroken(true)} />;
}

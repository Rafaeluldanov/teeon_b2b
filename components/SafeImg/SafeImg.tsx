'use client';

import { ImgHTMLAttributes, useState } from 'react';

// Клиентский <img>, который сам прячется при ошибке загрузки.
// Нужен потому что server components не могут передавать onError в JSX.
export default function SafeImg(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [broken, setBroken] = useState(false);
  if (broken) return null;
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img {...props} onError={() => setBroken(true)} />;
}

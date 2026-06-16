'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

/**
 * Client-обёртка вокруг next/image, которая скрывает изображение при ошибке загрузки
 * (hide-on-error, как у SafeImg), но при этом отдаёт оптимизированные AVIF/WebP через /_next/image.
 *
 * Нужна потому, что next/image — Client Component, и передавать onError напрямую
 * из Server Component нельзя. Эта обёртка инкапсулирует onError, поэтому её можно
 * безопасно использовать внутри серверных компонентов.
 *
 * Просто прокидывает ImageProps. Сам не добавляет priority / fetchPriority / unoptimized
 * (но прозрачно прокинет их, если их передаст вызывающий код).
 */
export default function OptimizedImageWithFallback({
  alt,
  onError,
  ...props
}: ImageProps) {
  const [broken, setBroken] = useState(false);

  // Сбрасываем флаг ошибки при смене src: переиспользованный инстанс с новым
  // изображением не должен оставаться скрытым из-за прошлой неудачной загрузки.
  useEffect(() => {
    setBroken(false);
  }, [props.src]);

  if (broken) return null;

  return (
    <Image
      alt={alt}
      {...props}
      onError={(event) => {
        setBroken(true);
        onError?.(event);
      }}
    />
  );
}

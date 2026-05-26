'use client';

import { useState, useEffect } from 'react';
import { catalogModelsData, collectCategoryImages, type CatalogModelsMap } from '@/lib/catalogModels';
import styles from './CategoryMedia.module.css';

const ADMIN_MODELS_KEY = 'teeon_admin_catalog_models';

interface Props {
  categorySlug: string;
  fallback: React.ReactNode;
  max?: number;
}

export default function CategoryMedia({ categorySlug, fallback, max = 4 }: Props) {
  const [data, setData] = useState<CatalogModelsMap>(catalogModelsData);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ADMIN_MODELS_KEY);
      if (raw) setData(JSON.parse(raw) as CatalogModelsMap);
    } catch { /* ignore */ }
  }, []);

  const imgs = collectCategoryImages(categorySlug, max, data);
  if (imgs.length === 0) return <>{fallback}</>;

  return (
    <div className={styles.collage} data-count={Math.min(imgs.length, 4)}>
      {imgs.slice(0, 4).map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={src}
          alt=""
          className={styles.collageImg}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      ))}
    </div>
  );
}

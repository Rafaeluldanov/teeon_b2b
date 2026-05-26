'use client';

import { useEffect } from 'react';

// Одноразовая клиентская миграция: после серверной конвертации MinIO PNG/JPEG → WebP
// (выполнена 2026-05-26), URL-ы в браузерном localStorage админа остались битыми.
// Этот компонент рекурсивно обходит известные LS-ключи и переписывает
// MinIO-ссылки с расширением .jpg/.jpeg/.png на .webp.
//
// Запускается один раз за сессию (sessionStorage флаг). У не-админов LS пуст → no-op.

const KEYS = [
  'teeon_admin_catalog_models',
  'teeon_admin_portfolio_cases',
  'teeon_admin_home_banner',
  'teeon_admin_branding_methods',
  'teeon_admin_branding_samples',
  'teeon_admin_page_content',
  'teeon_admin_product_options',
  'teeon_admin_contacts',
];

const SESSION_FLAG = 'teeon_webp_migration_v1_done';
const MINIO_HOSTS = ['185.225.34.60:9000/teeon-images', '/teeon-images/'];

function looksLikeMinioImage(s: string): boolean {
  if (!/\.(jpe?g|png)$/i.test(s)) return false;
  return MINIO_HOSTS.some((h) => s.includes(h));
}

function toWebp(s: string): string {
  return s.replace(/\.(jpe?g|png)$/i, '.webp');
}

function walk(value: unknown): { value: unknown; changed: boolean } {
  if (typeof value === 'string') {
    if (looksLikeMinioImage(value)) return { value: toWebp(value), changed: true };
    return { value, changed: false };
  }
  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((v) => {
      const r = walk(v);
      if (r.changed) changed = true;
      return r.value;
    });
    return { value: changed ? next : value, changed };
  }
  if (value && typeof value === 'object') {
    let changed = false;
    const next: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const r = walk(v);
      if (r.changed) changed = true;
      next[k] = r.value;
    }
    return { value: changed ? next : value, changed };
  }
  return { value, changed: false };
}

function migrate(): { totalRewrites: number; touchedKeys: string[] } {
  let totalRewrites = 0;
  const touchedKeys: string[] = [];
  for (const key of KEYS) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      const before = JSON.stringify(parsed);
      const { value: next, changed } = walk(parsed);
      if (changed) {
        const after = JSON.stringify(next);
        const rewrites = (before.match(/\.(jpe?g|png)/g) ?? []).length -
                         (after.match(/\.(jpe?g|png)/g) ?? []).length;
        localStorage.setItem(key, after);
        totalRewrites += Math.max(0, rewrites);
        touchedKeys.push(key);
      }
    } catch {
      // невалидный JSON — пропускаем
    }
  }
  return { totalRewrites, touchedKeys };
}

export default function LocalStorageWebpMigration() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_FLAG)) return;
      const { totalRewrites, touchedKeys } = migrate();
      sessionStorage.setItem(SESSION_FLAG, '1');
      if (totalRewrites > 0) {
        // eslint-disable-next-line no-console
        console.info(
          `[teeon] WebP migration: rewrote ${totalRewrites} image URL(s) in localStorage`,
          touchedKeys,
        );
      }
    } catch {
      // localStorage недоступен (например, в режиме инкогнито с запретом) — игнорируем
    }
  }, []);
  return null;
}

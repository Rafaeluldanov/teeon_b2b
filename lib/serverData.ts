// Серверный слой данных: читает админский дамп с диска и мержит с дефолтами.
// Используется в server components / page.tsx чтобы SSR-HTML содержал актуальные
// картинки/описания, не дожидаясь клиентской гидрации из localStorage.
//
// Цикл жизни данных:
//   1. Дефолт лежит в lib/catalogModels.ts, lib/portfolio.ts (статические const).
//   2. Админ правит → localStorage → "Сохранить на сервер" → /api/admin/full-sync.
//   3. POST пишет /app/.tmp/admin-dump-all.json (volume).
//   4. Эта функция читает дамп, мержит, отдаёт server components.

import { promises as fs } from 'node:fs';
import { unstable_noStore as noStore } from 'next/cache';
import {
  catalogModelsData,
  type CatalogModelsMap,
} from './catalogModels';
import {
  portfolioCases as defaultPortfolioCases,
  type PortfolioCase,
} from './portfolio';

const DUMP_PATH = '/app/.tmp/admin-dump-all.json';

interface Dump {
  savedAt?: string;
  data?: {
    teeon_admin_catalog_models?: unknown;
    teeon_admin_portfolio_cases?: unknown;
    [k: string]: unknown;
  };
}

let cachedDump: Dump | null = null;
let cachedDumpMtime = 0;

async function loadDump(): Promise<Dump | null> {
  try {
    const st = await fs.stat(DUMP_PATH);
    const mtime = st.mtimeMs;
    if (cachedDump && cachedDumpMtime === mtime) return cachedDump;
    const raw = await fs.readFile(DUMP_PATH, 'utf8');
    cachedDump = JSON.parse(raw) as Dump;
    cachedDumpMtime = mtime;
    return cachedDump;
  } catch {
    return null;
  }
}

export async function getMergedCatalogModels(): Promise<CatalogModelsMap> {
  noStore();
  const dump = await loadDump();
  const admin = dump?.data?.teeon_admin_catalog_models;
  if (!admin || typeof admin !== 'object' || Array.isArray(admin)) {
    return catalogModelsData;
  }
  // Админ-дамп хранит ту же структуру, что catalogModelsData (Record<slug, CategoryModels>).
  // Мержим неглубоко: админ-категория полностью заменяет дефолтную, остальные дефолтные сохраняются.
  return { ...catalogModelsData, ...(admin as CatalogModelsMap) };
}

export async function getMergedPortfolioCases(): Promise<PortfolioCase[]> {
  noStore();
  const dump = await loadDump();
  const admin = dump?.data?.teeon_admin_portfolio_cases;
  if (!Array.isArray(admin)) return defaultPortfolioCases;
  // Если в админ-дампе есть кейсы — используем их как источник истины.
  // Дефолтные нужны только когда дамп пустой / отсутствует.
  return admin as PortfolioCase[];
}

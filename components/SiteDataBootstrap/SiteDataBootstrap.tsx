import { promises as fs } from 'node:fs';

const DUMP_PATH = '/app/.tmp/admin-dump-all.json';

const PUBLIC_KEYS = new Set([
  'teeon_admin_catalog_models',
  'teeon_admin_portfolio_cases',
  'teeon_admin_home_banner',
  'teeon_admin_branding_methods',
  'teeon_admin_branding_samples',
  'teeon_admin_page_content',
  'teeon_admin_contacts',
  'teeon_admin_product_options',
]);

async function readDumpForBrowser(): Promise<Record<string, string> | null> {
  try {
    const raw = await fs.readFile(DUMP_PATH, 'utf8');
    const parsed = JSON.parse(raw) as { data?: Record<string, unknown> };
    if (!parsed?.data || typeof parsed.data !== 'object') return null;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed.data)) {
      if (!PUBLIC_KEYS.has(k)) continue;
      out[k] = typeof v === 'string' ? v : JSON.stringify(v);
    }
    return Object.keys(out).length ? out : null;
  } catch {
    return null;
  }
}

// Рендерится на каждый SSR-запрос. Инлайн-скрипт выполняется в браузере
// синхронно при парсинге HTML — ДО React-гидратации, поэтому компоненты,
// читающие localStorage в useEffect, сразу увидят актуальные данные.
//
// Для админа (у которого localStorage уже заполнен) скрипт ничего не трогает —
// у каждого ключа проверяется !localStorage.getItem(k), иначе пропуск.
export default async function SiteDataBootstrap(): Promise<JSX.Element | null> {
  const data = await readDumpForBrowser();
  if (!data) return null;

  // JSON.stringify дважды: внешний даёт безопасную JS-строку, внутренний — содержимое.
  // Все спецсимволы (кавычки, переводы строк) корректно эскейпятся.
  const payload = JSON.stringify(data);

  return (
    <script
      id="teeon-data-bootstrap"
      dangerouslySetInnerHTML={{
        __html:
          '(function(){try{var d=' +
          payload +
          ';for(var k in d){if(localStorage.getItem(k)===null){localStorage.setItem(k,d[k]);}}}catch(e){}})();',
      }}
    />
  );
}

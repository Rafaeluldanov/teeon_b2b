#!/usr/bin/env node
/**
 * SEO-аудит сайта TEEON.
 * Запуск: node scripts/seo-audit.mjs
 * Требует работающего сервера (dev или production).
 * Результат: SEO_AUDIT_REPORT.md
 */

import { writeFileSync } from 'fs';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const REPORT_FILE = 'SEO_AUDIT_REPORT.md';

// Список страниц для аудита
const PAGES = [
  { url: '/', name: 'Главная' },
  { url: '/catalog/', name: 'Каталог' },
  { url: '/catalog/futbolki/', name: 'Каталог: Футболки' },
  { url: '/catalog/hudi/', name: 'Каталог: Худи' },
  { url: '/catalog/svitshoty/', name: 'Каталог: Свитшоты' },
  { url: '/catalog/longslivy/', name: 'Каталог: Лонгсливы' },
  { url: '/catalog/sumki/', name: 'Каталог: Сумки' },
  { url: '/catalog/zhiletki/', name: 'Каталог: Жилетки' },
  { url: '/catalog/kurtki/', name: 'Каталог: Куртки' },
  { url: '/catalog/dozhdeviki/', name: 'Каталог: Дождевики' },
  { url: '/branding/', name: 'Брендирование' },
  { url: '/branding/vyshivka/', name: 'Брендирование: Вышивка' },
  { url: '/branding/shevrony/', name: 'Брендирование: Шевроны' },
  { url: '/branding/shelkografiya/', name: 'Брендирование: Шелкография' },
  { url: '/branding/dtf-pechat/', name: 'Брендирование: DTF-печать' },
  { url: '/branding/dtg-pechat/', name: 'Брендирование: DTG-печать' },
  { url: '/branding/sublimaciya/', name: 'Брендирование: Сублимация' },
  { url: '/branding/tisnenie/', name: 'Брендирование: Тиснение' },
  { url: '/branding/gravirovka/', name: 'Брендирование: Гравировка' },
  { url: '/branding/birki/', name: 'Брендирование: Бирки' },
  { url: '/portfolio/', name: 'Портфолио' },
  { url: '/about/', name: 'О компании' },
  { url: '/contacts/', name: 'Контакты' },
  { url: '/suvenirnaya-produkciya/', name: 'Сувенирная продукция' },
  { url: '/privacy/', name: 'Политика конфиденциальности' },
  { url: '/requisites/', name: 'Реквизиты' },
];

const TYPOS = ['кексы', 'вышевка', 'теснение', 'свишот', 'лонгсливв'];

function extractMeta(html) {
  const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) ?? [])[1]?.trim() ?? '';
  const descMatch = html.match(/<meta\s+name=["']description["'][^>]*content=["']([^"']*)["']/i)
    ?? html.match(/<meta\s+content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const description = descMatch?.[1]?.trim() ?? '';
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)
    ?? html.match(/<link\s+href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  const canonical = canonicalMatch?.[1]?.trim() ?? '';
  const noindex = /content=["'][^"']*noindex[^"']*["']/i.test(html) || /noindex/i.test(html.slice(0, 2000));
  const ogTitle = (html.match(/<meta\s+property=["']og:title["'][^>]*content=["']([^"']*)["']/i)
    ?? html.match(/<meta\s+content=["']([^"']*)["'][^>]*property=["']og:title["']/i))?.[1]?.trim() ?? '';
  const ogDesc = (html.match(/<meta\s+property=["']og:description["'][^>]*content=["']([^"']*)["']/i)
    ?? html.match(/<meta\s+content=["']([^"']*)["'][^>]*property=["']og:description["']/i))?.[1]?.trim() ?? '';

  // Use lazy match + strip all tags/comments to handle React comment nodes like <!-- -->TEEON
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map(m => m[1].replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, '').trim())
    .filter(Boolean);

  const h2s = [...html.matchAll(/<h2[^>]*>/gi)];

  const jsonLdScripts = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map(m => m[1].trim());
  let jsonLdValid = true;
  for (const s of jsonLdScripts) {
    try { JSON.parse(s); } catch { jsonLdValid = false; }
  }

  return { title, description, canonical, noindex, ogTitle, ogDesc, h1s, h2Count: h2s.length, jsonLdValid, jsonLdCount: jsonLdScripts.length };
}

async function auditPage(page) {
  const url = `${BASE_URL}${page.url}`;
  const result = { url: page.url, name: page.name, issues: [], warnings: [], ok: [] };

  let html;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) {
      result.issues.push(`HTTP ${res.status}`);
      return result;
    }
    html = await res.text();
  } catch (e) {
    result.issues.push(`Ошибка запроса: ${e.message}`);
    return result;
  }

  const meta = extractMeta(html);

  // Title checks
  if (!meta.title) {
    result.issues.push('Нет <title>');
  } else {
    result.ok.push(`Title: "${meta.title}"`);
    if (meta.title.length < 20) result.warnings.push(`Title слишком короткий (${meta.title.length} симв.): "${meta.title}"`);
    if (meta.title.length > 70) result.warnings.push(`Title слишком длинный (${meta.title.length} симв.): "${meta.title}"`);
  }

  // Description checks
  if (!meta.description) {
    result.issues.push('Нет meta description');
  } else {
    result.ok.push(`Description (${meta.description.length} симв.)`);
    if (meta.description.length < 80) result.warnings.push(`Description слишком короткий (${meta.description.length} симв.)`);
    if (meta.description.length > 180) result.warnings.push(`Description слишком длинный (${meta.description.length} симв.)`);
  }

  // Canonical
  if (!meta.canonical) {
    result.issues.push('Нет canonical');
  } else {
    result.ok.push(`Canonical: ${meta.canonical}`);
  }

  // H1 checks
  if (meta.h1s.length === 0) {
    result.issues.push('Нет H1');
  } else if (meta.h1s.length > 1) {
    result.issues.push(`Несколько H1 (${meta.h1s.length}): ${meta.h1s.map(h => `"${h}"`).join(', ')}`);
  } else {
    result.ok.push(`H1: "${meta.h1s[0]}"`);
    if (meta.h1s[0].length < 5) result.warnings.push(`H1 слишком короткий: "${meta.h1s[0]}"`);
  }

  // H2 count
  if (meta.h2Count === 0) result.warnings.push('Нет H2');
  else result.ok.push(`H2: ${meta.h2Count} шт.`);

  // OG tags
  if (!meta.ogTitle) result.warnings.push('Нет og:title');
  else result.ok.push('og:title есть');
  if (!meta.ogDesc) result.warnings.push('Нет og:description');
  else result.ok.push('og:description есть');

  // noindex
  if (meta.noindex && !page.url.startsWith('/admin') && !page.url.startsWith('/privacy') && !page.url.startsWith('/requisites')) {
    result.warnings.push('Страница имеет noindex, но должна индексироваться');
  }

  // JSON-LD
  if (meta.jsonLdCount > 0) {
    if (!meta.jsonLdValid) result.issues.push('JSON-LD невалидный');
    else result.ok.push(`JSON-LD: ${meta.jsonLdCount} блок(а), валидный`);
  }

  // Typos
  const lowerHtml = html.toLowerCase();
  for (const typo of TYPOS) {
    if (lowerHtml.includes(typo)) {
      result.issues.push(`Опечатка: "${typo}"`);
    }
  }

  return result;
}

async function checkSitemap() {
  console.log('Проверяем /sitemap.xml...');
  try {
    const res = await fetch(`${BASE_URL}/sitemap.xml`);
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    const hasAdmin = urls.some(u => u.includes('/admin/') || u.includes('/api/'));
    return { ok: true, count: urls.length, hasAdmin, urls };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

async function checkRobots() {
  console.log('Проверяем /robots.txt...');
  try {
    const res = await fetch(`${BASE_URL}/robots.txt`);
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const text = await res.text();
    return {
      ok: true,
      hasSitemap: text.includes('Sitemap:'),
      blocksAdmin: text.includes('Disallow: /admin/') || text.includes('Disallow:/admin/'),
      blocksApi: text.includes('Disallow: /api/admin/'),
    };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

async function main() {
  console.log(`\nSEO Аудит TEEON`);
  console.log(`BASE_URL: ${BASE_URL}`);
  console.log(`Время: ${new Date().toLocaleString('ru-RU')}`);
  console.log('─'.repeat(60));

  const allResults = [];
  const titles = new Map();
  const descriptions = new Map();
  let totalIssues = 0;
  let totalWarnings = 0;

  for (const page of PAGES) {
    process.stdout.write(`Аудит: ${page.url}... `);
    const result = await auditPage(page);
    allResults.push(result);
    totalIssues += result.issues.length;
    totalWarnings += result.warnings.length;

    // Collect for duplicate check
    const meta = result.ok.find(s => s.startsWith('Title:'));
    if (meta) {
      const t = meta.replace('Title: ', '').replace(/^"(.*)"$/, '$1');
      if (titles.has(t)) titles.get(t).push(page.url);
      else titles.set(t, [page.url]);
    }
    const dMeta = result.ok.find(s => s.startsWith('Description'));
    if (dMeta && result.ok.find(s => s.startsWith('Description ('))) {
      // Can't easily extract value here, skip duplicate desc check for now
    }

    const emoji = result.issues.length > 0 ? '✗' : result.warnings.length > 0 ? '⚠' : '✓';
    console.log(`${emoji} (${result.issues.length} ош., ${result.warnings.length} пред.)`);
  }

  // Check duplicates
  const dupTitles = [...titles.entries()].filter(([, urls]) => urls.length > 1);

  const sitemap = await checkSitemap();
  const robots = await checkRobots();

  // Build report
  const lines = [];
  lines.push(`# SEO Аудит — TEEON`);
  lines.push(`\n**Дата:** ${new Date().toLocaleString('ru-RU')}`);
  lines.push(`**BASE_URL:** ${BASE_URL}`);
  lines.push(`**Страниц проверено:** ${PAGES.length}`);
  lines.push(`**Ошибок:** ${totalIssues} | **Предупреждений:** ${totalWarnings}`);

  lines.push(`\n## Итоги по страницам\n`);
  lines.push('| Страница | Ошибки | Предупреждения |');
  lines.push('|---|---|---|');
  for (const r of allResults) {
    const icon = r.issues.length > 0 ? '🔴' : r.warnings.length > 0 ? '🟡' : '🟢';
    lines.push(`| ${icon} ${r.name} (\`${r.url}\`) | ${r.issues.length} | ${r.warnings.length} |`);
  }

  lines.push(`\n## Детальные результаты\n`);
  for (const r of allResults) {
    lines.push(`### ${r.name} — \`${r.url}\``);
    if (r.issues.length > 0) {
      lines.push('\n**Ошибки:**');
      r.issues.forEach(i => lines.push(`- ❌ ${i}`));
    }
    if (r.warnings.length > 0) {
      lines.push('\n**Предупреждения:**');
      r.warnings.forEach(w => lines.push(`- ⚠️ ${w}`));
    }
    if (r.ok.length > 0) {
      lines.push('\n**OK:**');
      r.ok.forEach(o => lines.push(`- ✅ ${o}`));
    }
    lines.push('');
  }

  if (dupTitles.length > 0) {
    lines.push(`\n## Дублированные Title\n`);
    dupTitles.forEach(([t, urls]) => {
      lines.push(`- **"${t}"** — дублируется на: ${urls.join(', ')}`);
    });
  }

  lines.push(`\n## Sitemap (/sitemap.xml)\n`);
  if (!sitemap.ok) {
    lines.push(`- ❌ Ошибка: ${sitemap.error}`);
  } else {
    lines.push(`- ✅ Доступен, ${sitemap.count} URL`);
    if (sitemap.hasAdmin) lines.push(`- ❌ Содержит /admin/ или /api/ URL — нужно убрать`);
    else lines.push(`- ✅ Не содержит /admin/ и /api/`);
  }

  lines.push(`\n## Robots (/robots.txt)\n`);
  if (!robots.ok) {
    lines.push(`- ❌ Ошибка: ${robots.error}`);
  } else {
    lines.push(`- ✅ Доступен`);
    if (robots.hasSitemap) lines.push(`- ✅ Содержит Sitemap:`);
    else lines.push(`- ⚠️ Нет Sitemap: строки`);
    if (robots.blocksAdmin) lines.push(`- ✅ Блокирует /admin/`);
    else lines.push(`- ⚠️ Не блокирует /admin/`);
    if (robots.blocksApi) lines.push(`- ✅ Блокирует /api/admin/`);
  }

  const report = lines.join('\n');
  writeFileSync(REPORT_FILE, report, 'utf-8');

  console.log('\n─'.repeat(60));
  console.log(`✓ Отчёт сохранён: ${REPORT_FILE}`);
  console.log(`  Ошибок: ${totalIssues} | Предупреждений: ${totalWarnings}`);
  if (dupTitles.length > 0) console.log(`  Дубли title: ${dupTitles.length}`);
}

main().catch(e => { console.error(e); process.exitCode = 1; });

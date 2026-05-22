import { test, expect } from '@playwright/test';

const INDEXED_PAGES = [
  '/',
  '/catalog/',
  '/catalog/futbolki/',
  '/catalog/hudi/',
  '/catalog/svitshoty/',
  '/catalog/longslivy/',
  '/catalog/sumki/',
  '/catalog/zhiletki/',
  '/catalog/kurtki/',
  '/catalog/dozhdeviki/',
  '/branding/',
  '/branding/vyshivka/',
  '/branding/shelkografiya/',
  '/portfolio/',
  '/about/',
  '/contacts/',
  '/suvenirnaya-produkciya/',
  '/faq/',
];

test.describe('SEO — meta теги', () => {
  for (const path of INDEXED_PAGES) {
    test(`${path} — title, description, canonical`, async ({ page }) => {
      await page.goto(path);

      // Title
      const title = await page.title();
      expect(title.trim().length, `title пустой на ${path}`).toBeGreaterThan(10);

      // Meta description
      const desc = await page.getAttribute('meta[name="description"]', 'content');
      expect(desc?.trim().length, `description отсутствует или пуст на ${path}`).toBeGreaterThan(20);

      // Canonical
      const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
      expect(canonical, `canonical отсутствует на ${path}`).toBeTruthy();

      // OG title
      const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
      expect(ogTitle?.trim().length, `og:title отсутствует на ${path}`).toBeGreaterThan(5);
    });
  }
});

test.describe('SEO — H1', () => {
  for (const path of INDEXED_PAGES) {
    test(`${path} — ровно один H1`, async ({ page }) => {
      await page.goto(path);
      const h1s = page.locator('h1');
      const count = await h1s.count();
      expect(count, `На ${path} должен быть ровно 1 H1, найдено: ${count}`).toBe(1);
      const text = await h1s.first().textContent();
      expect(text?.trim().length, `H1 пустой на ${path}`).toBeGreaterThan(3);
    });
  }
});

test.describe('SEO — noindex', () => {
  test('/admin/login/ имеет noindex', async ({ page }) => {
    await page.goto('/admin/login/');
    const robots = await page.getAttribute('meta[name="robots"]', 'content');
    expect(robots?.toLowerCase()).toContain('noindex');
  });

  for (const path of INDEXED_PAGES.filter(p => p !== '/privacy/' && p !== '/requisites/')) {
    test(`${path} не имеет noindex`, async ({ page }) => {
      await page.goto(path);
      const robots = await page.getAttribute('meta[name="robots"]', 'content');
      if (robots) {
        expect(robots.toLowerCase(), `${path} неожиданно имеет noindex`).not.toContain('noindex');
      }
    });
  }
});

test.describe('SEO — JSON-LD', () => {
  for (const path of ['/', '/catalog/futbolki/', '/branding/vyshivka/', '/contacts/']) {
    test(`${path} — JSON-LD валидный`, async ({ page }) => {
      await page.goto(path);
      const scripts = await page.locator('script[type="application/ld+json"]').all();
      expect(scripts.length, `Нет JSON-LD блоков на ${path}`).toBeGreaterThan(0);
      for (const script of scripts) {
        const content = await script.textContent();
        expect(() => JSON.parse(content ?? ''), `JSON-LD невалидный на ${path}`).not.toThrow();
      }
    });
  }
});

test.describe('SEO — Sitemap и Robots', () => {
  test('/sitemap.xml — возвращает 200 и содержит URLs', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
    const content = await page.content();
    expect(content).toContain('<loc>');
    expect(content).not.toContain('/admin/');
    expect(content).not.toContain('/api/admin/');
  });

  test('/robots.txt — возвращает 200 и содержит Sitemap', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
    const content = await page.content();
    expect(content).toContain('Sitemap:');
    expect(content).toContain('Disallow');
  });
});

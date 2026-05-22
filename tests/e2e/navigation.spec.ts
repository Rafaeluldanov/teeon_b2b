import { test, expect } from '@playwright/test';

const CATALOG_SLUGS = [
  'futbolki', 'hudi', 'svitshoty', 'longslivy',
  'sumki', 'zhiletki', 'kurtki', 'dozhdeviki',
];

const BRANDING_SLUGS = [
  'vyshivka', 'shevrony', 'shelkografiya', 'dtf-pechat',
  'dtg-pechat', 'sublimaciya', 'tisnenie', 'gravirovka', 'birki',
];

// Actual slugs from lib/portfolio.ts
const PORTFOLIO_SLUGS = [
  'hudi-futbolki-komanda',
  'merch-konferenciya',
  'promo-odezhda-vistavka',
  'sumki-shopery-meropriyatie',
  'zhiletki-personal',
  'dozhdeviki-promoakciya',
  'svitshoty-sotrudniki',
  'welcome-pack',
  'kurtki-vyezdnaya-komanda',
];

const ALL_PAGES = [
  '/',
  '/catalog/',
  ...CATALOG_SLUGS.map(s => `/catalog/${s}/`),
  '/branding/',
  ...BRANDING_SLUGS.map(s => `/branding/${s}/`),
  '/portfolio/',
  ...PORTFOLIO_SLUGS.map(s => `/portfolio/${s}/`),
  '/about/',
  '/contacts/',
  '/privacy/',
  '/requisites/',
  '/suvenirnaya-produkciya/',
  '/faq/',
];

test.describe('Страница загружается (HTTP 200)', () => {
  for (const path of ALL_PAGES) {
    test(`GET ${path}`, async ({ page }) => {
      const response = await page.goto(path);
      // Follow redirects — accept 200 (could be 308/307 → 200)
      const status = response?.status() ?? 200;
      expect(status, `Страница ${path} должна отвечать 200`).toBe(200);
    });
  }
});

test.describe('Основные страницы — структура', () => {
  for (const path of ALL_PAGES) {
    test(`${path} — header, footer, h1`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', err => errors.push(err.message));

      await page.goto(path);

      // Header и footer есть
      await expect(page.locator('header'), `header отсутствует на ${path}`).toBeVisible();
      await expect(page.locator('footer'), `footer отсутствует на ${path}`).toBeVisible();

      // Ровно один H1
      const h1s = page.locator('h1');
      const h1Count = await h1s.count();
      expect(h1Count, `На ${path} должен быть ровно один H1, найдено ${h1Count}`).toBe(1);
      const h1Text = await h1s.first().textContent();
      expect(h1Text?.trim().length, `H1 пустой на ${path}`).toBeGreaterThan(0);

      // Нет JavaScript-ошибок страницы
      const jsErrors = errors.filter(e => !e.includes('404') && !e.includes('favicon'));
      expect(jsErrors, `JS-ошибки на ${path}: ${jsErrors.join('; ')}`).toHaveLength(0);
    });
  }
});

test.describe('Навигация — Header (прямые ссылки)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Логотип ведёт на /', async ({ page }) => {
    await page.locator('header a[href="/"]').first().click();
    await expect(page).toHaveURL('/');
  });

  test('Ссылка /catalog/futbolki/ доступна', async ({ page }) => {
    const response = await page.goto('/catalog/futbolki/');
    expect(response?.status()).toBe(200);
  });

  test('Ссылка /branding/vyshivka/ доступна', async ({ page }) => {
    const response = await page.goto('/branding/vyshivka/');
    expect(response?.status()).toBe(200);
  });

  test('Сувениры доступна', async ({ page }) => {
    const response = await page.goto('/suvenirnaya-produkciya/');
    expect(response?.status()).toBe(200);
    // Next.js strips trailing slash from Link hrefs
    await expect(page.locator('header a[href="/suvenirnaya-produkciya"], header a[href="/suvenirnaya-produkciya/"]').first()).toBeVisible();
  });

  test('Портфолио доступно', async ({ page }) => {
    const response = await page.goto('/portfolio/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('header a[href="/portfolio"], header a[href="/portfolio/"]').first()).toBeVisible();
  });

  test('О компании доступна', async ({ page }) => {
    const response = await page.goto('/about/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('header a[href="/about"], header a[href="/about/"]').first()).toBeVisible();
  });

  test('Контакты доступны', async ({ page }) => {
    const response = await page.goto('/contacts/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('header a[href="/contacts"], header a[href="/contacts/"]').first()).toBeVisible();
  });

  test('Header содержит ссылки каталога', async ({ page }) => {
    const links = await page.locator('header a[href^="/catalog"]').all();
    expect(links.length).toBeGreaterThan(0);
  });

  test('Header содержит ссылки брендирования', async ({ page }) => {
    const links = await page.locator('header a[href^="/branding"]').all();
    expect(links.length).toBeGreaterThan(0);
  });

  test('Кнопка Проконсультироваться есть в header', async ({ page }) => {
    const ctaBtn = page.locator('header a[href="/#request"]').first();
    await expect(ctaBtn).toBeVisible();
  });
});

test.describe('Главная страница — CTA-кнопки', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Есть CTA к форме заявки', async ({ page }) => {
    const cta = page.locator('a[href="/#request"], a[href="#request"]').first();
    await expect(cta).toBeVisible();
  });

  test('Есть ссылка на каталог', async ({ page }) => {
    // Next.js strips trailing slash; use ^= to match both /catalog and /catalog/
    const catalogLinks = page.locator('a[href="/catalog"], a[href="/catalog/"]');
    const count = await catalogLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Раздел #request есть на главной', async ({ page }) => {
    await page.locator('#request').scrollIntoViewIfNeeded();
    await expect(page.locator('#request')).toBeVisible();
  });
});

test.describe('Adminка закрыта', () => {
  test('/admin/catalog-editor/ без cookie → редирект на /admin/login/', async ({ page }) => {
    await page.goto('/admin/catalog-editor/');
    // After redirect chain, URL should contain /admin/login
    const finalUrl = page.url();
    expect(finalUrl, `Ожидался редирект на /admin/login/, получен: ${finalUrl}`).toContain('/admin/login');
  });

  test('/admin/login/ доступна (200)', async ({ page }) => {
    const response = await page.goto('/admin/login/');
    expect(response?.status()).toBe(200);
  });
});

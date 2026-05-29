import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } });

test('Мобильное меню открывается под кнопкой hamburger после скролла', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 1500);
  });

  await page.waitForFunction(() => window.scrollY > 500);

  const toggle = page.locator('[data-mobile-toggle="true"]');
  await expect(toggle).toBeVisible();

  const buttonBox = await toggle.boundingBox();
  const scrollBefore = await page.evaluate(() => window.scrollY);

  await toggle.click();

  const menu = page.locator('[data-mobile-menu="true"]');
  await expect(menu).toBeVisible();

  const menuBox = await menu.boundingBox();

  expect(buttonBox).not.toBeNull();
  expect(menuBox).not.toBeNull();
  if (!buttonBox || !menuBox) return;

  // Меню открывается ПОД нижним краем кнопки, в видимой области экрана.
  expect(menuBox.y).toBeGreaterThanOrEqual(buttonBox.y + buttonBox.height - 5);
  expect(menuBox.y).toBeLessThan(180);
  expect(menuBox.y).toBeGreaterThan(0);

  // Страница не прыгнула.
  const scrollAfter = await page.evaluate(() => window.scrollY);
  expect(Math.abs(scrollAfter - scrollBefore)).toBeLessThan(10);

  // Диагностика: меню — прямой потомок BODY и position: fixed.
  const diagnostics = await page.evaluate(() => {
    const m = document.querySelector('[data-mobile-menu="true"]') as HTMLElement | null;
    const b = document.querySelector('[data-mobile-toggle="true"]') as HTMLElement | null;
    return {
      parent: m?.parentElement?.tagName,
      position: m ? getComputedStyle(m).position : null,
      scrollY: window.scrollY,
      buttonBottom: b?.getBoundingClientRect().bottom,
      menuY: m?.getBoundingClientRect().y,
    };
  });
  console.log('DIAG', JSON.stringify(diagnostics));

  expect(diagnostics.parent).toBe('BODY');
  expect(diagnostics.position).toBe('fixed');
});

test('Мобильное меню после скролла раскрывает Каталог и Нанесение', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 1500);
  });

  await page.waitForFunction(() => window.scrollY > 500);

  await page.locator('[data-mobile-toggle="true"]').click();
  await expect(page.locator('[data-mobile-menu="true"]')).toBeVisible();

  await page.getByRole('button', { name: /Каталог/i }).click();
  await expect(page.getByRole('link', { name: /Футболки/i })).toBeVisible();

  await page.getByRole('button', { name: /Нанесение/i }).click();
  await expect(page.getByRole('link', { name: /Вышивка/i })).toBeVisible();
});

test('Мобильное меню фиксировано к viewport и вынесено порталом из <header>', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 1500);
  });
  await page.waitForFunction(() => window.scrollY > 500);

  await page.locator('[data-mobile-toggle="true"]').click();
  const menu = page.locator('[data-mobile-menu="true"]');
  await expect(menu).toBeVisible();

  expect(await menu.evaluate((el) => !!el.closest('header')), 'меню не должно быть внутри <header>').toBe(false);
  expect(await menu.evaluate((el) => el.parentElement?.tagName ?? '')).toBe('BODY');
  expect(await menu.evaluate((el) => getComputedStyle(el).position)).toBe('fixed');
});

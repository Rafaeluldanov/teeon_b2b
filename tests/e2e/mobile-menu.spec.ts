import { test, expect } from '@playwright/test';

// Бургер-меню показывается только на узких экранах (max-width: 860px).
test.use({ viewport: { width: 390, height: 844 } });

test.describe('Мобильное меню — позиция при скролле', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Открывается под прилипшим хедером, а не улетает наверх', async ({ page }) => {
    // Скроллим далеко вниз — хедер sticky, остаётся вверху вьюпорта.
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForFunction(() => window.scrollY > 1000);

    const header = page.locator('header');
    const headerBox = await header.boundingBox();
    expect(headerBox, 'header должен иметь bounding box').not.toBeNull();
    // Хедер визуально прилип к верху вьюпорта (sticky top:10px).
    expect(headerBox!.y).toBeLessThan(60);

    // Открываем меню кликом по бургеру.
    await page.getByRole('button', { name: 'Открыть меню' }).click();

    const menu = page.getByTestId('mobile-menu');
    await expect(menu).toBeVisible();

    const menuBox = await menu.boundingBox();
    expect(menuBox, 'меню должно иметь bounding box').not.toBeNull();

    const viewport = page.viewportSize()!;

    // Главная проверка регрессии: меню НЕ улетело над вьюпортом.
    expect(menuBox!.y).toBeGreaterThanOrEqual(0);
    // И открылось прямо под хедером (где пользователь нажал на бургер),
    // а не где-то в середине/низу экрана.
    const headerBottom = headerBox!.y + headerBox!.height;
    expect(menuBox!.y).toBeGreaterThanOrEqual(headerBottom - 20);
    expect(menuBox!.y).toBeLessThan(headerBottom + 40);
    // Меню в пределах вьюпорта.
    expect(menuBox!.y).toBeLessThan(viewport.height);
  });

  test('Оверлей перекрывает весь экран', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.getByRole('button', { name: 'Открыть меню' }).click();

    const menu = page.getByTestId('mobile-menu');
    await expect(menu).toBeVisible();

    // Оверлей — fixed, inset:0 → должен покрывать всю высоту вьюпорта.
    const overlayHeight = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('div'));
      const overlay = els.find((el) => {
        const s = getComputedStyle(el);
        return s.position === 'fixed' && s.inset === '0px';
      });
      return overlay ? overlay.getBoundingClientRect().height : 0;
    });
    expect(overlayHeight).toBeGreaterThan(700);
  });

  test('Подменю "Каталог" раскрывается внутри открытого меню', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.getByRole('button', { name: 'Открыть меню' }).click();

    const menu = page.getByTestId('mobile-menu');
    await expect(menu).toBeVisible();

    // Внутри меню жмём группу "Каталог".
    await menu.getByRole('button', { name: 'Каталог' }).click();

    // Появляется ссылка на весь каталог и категории.
    const allCatalog = menu.getByRole('link', { name: /Весь каталог/ });
    await expect(allCatalog).toBeVisible();

    const futbolki = menu.locator('a[href="/catalog/futbolki/"], a[href="/catalog/futbolki"]');
    await expect(futbolki.first()).toBeVisible();

    // Подменю осталось в пределах вьюпорта (не улетело наверх).
    const box = await allCatalog.boundingBox();
    expect(box!.y).toBeGreaterThanOrEqual(0);
  });
});

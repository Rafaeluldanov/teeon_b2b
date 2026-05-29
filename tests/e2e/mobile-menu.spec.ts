import { test, expect } from '@playwright/test';

// Бургер-меню показывается только на узких экранах (max-width: 860px).
test.use({ viewport: { width: 390, height: 844 } });

test.describe('Мобильное меню — позиция при скролле', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Открывается под видимой шапкой и не улетает наверх при скролле', async ({ page }) => {
    // 1. Скроллим далеко вниз.
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForFunction(() => window.scrollY > 1200);
    const scrollBefore = await page.evaluate(() => window.scrollY);

    // Шапка sticky — визуально остаётся вверху вьюпорта.
    const header = page.locator('header');
    const headerBox = await header.boundingBox();
    expect(headerBox, 'header должен иметь bounding box').not.toBeNull();
    expect(headerBox!.y, 'шапка должна быть прилеплена к верху вьюпорта').toBeLessThan(60);

    // 2-3. Нажимаем hamburger.
    await page.getByRole('button', { name: 'Открыть меню' }).click();

    const menu = page.getByTestId('mobile-menu');
    await expect(menu).toBeVisible();
    const menuBox = await menu.boundingBox();
    expect(menuBox, 'меню должно иметь bounding box').not.toBeNull();

    const viewport = page.viewportSize()!;
    const headerBottom = headerBox!.y + headerBox!.height;

    // 4. Меню видно во вьюпорте и расположено прямо под шапкой.
    expect(menuBox!.y, 'меню не должно улетать выше вьюпорта').toBeGreaterThanOrEqual(0);
    expect(menuBox!.y, 'меню должно открываться под нижним краем шапки')
      .toBeGreaterThanOrEqual(headerBottom - 4);
    expect(menuBox!.y, 'меню должно примыкать к шапке, а не висеть ниже по экрану')
      .toBeLessThan(headerBottom + 40);
    expect(menuBox!.y, 'верх меню должен быть внутри вьюпорта').toBeLessThan(viewport.height);
    // Видимая часть меню реально попадает в экран.
    expect(menuBox!.y + menuBox!.height, 'меню должно занимать видимую область')
      .toBeGreaterThan(headerBottom);

    // 5. Страница не прыгнула.
    const scrollAfter = await page.evaluate(() => window.scrollY);
    expect(scrollAfter, 'scrollY не должен меняться при открытии меню').toBe(scrollBefore);
  });

  test('Меню фиксировано к вьюпорту (position: fixed), а не к документу', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.getByRole('button', { name: 'Открыть меню' }).click();

    const menu = page.getByTestId('mobile-menu');
    await expect(menu).toBeVisible();

    const position = await menu.evaluate((el) => getComputedStyle(el).position);
    expect(position).toBe('fixed');

    // Портал: меню должно быть прямым потомком <body>, а не лежать внутри <header>.
    const parentTag = await menu.evaluate((el) => el.parentElement?.tagName ?? '');
    expect(parentTag).toBe('BODY');
    const insideHeader = await menu.evaluate((el) => !!el.closest('header'));
    expect(insideHeader, 'меню не должно быть внутри <header>').toBe(false);
  });

  test('Оверлей перекрывает весь экран', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.getByRole('button', { name: 'Открыть меню' }).click();
    await expect(page.getByTestId('mobile-menu')).toBeVisible();

    const overlayHeight = await page.evaluate(() => {
      const overlay = Array.from(document.querySelectorAll('div')).find((el) => {
        const s = getComputedStyle(el);
        return s.position === 'fixed' && s.inset === '0px';
      });
      return overlay ? overlay.getBoundingClientRect().height : 0;
    });
    expect(overlayHeight).toBeGreaterThan(700);
  });

  test('Подменю "Каталог" и "Нанесение" раскрываются внутри открытого меню', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.getByRole('button', { name: 'Открыть меню' }).click();

    const menu = page.getByTestId('mobile-menu');
    await expect(menu).toBeVisible();

    await menu.getByRole('button', { name: 'Каталог' }).click();
    await expect(menu.getByRole('link', { name: /Весь каталог/ })).toBeVisible();
    await expect(menu.locator('a[href="/catalog/futbolki/"], a[href="/catalog/futbolki"]').first()).toBeVisible();

    await menu.getByRole('button', { name: 'Нанесение' }).click();
    await expect(menu.getByRole('link', { name: /Все способы брендирования/ })).toBeVisible();
    await expect(menu.locator('a[href="/branding/vyshivka/"], a[href="/branding/vyshivka"]').first()).toBeVisible();
  });
});

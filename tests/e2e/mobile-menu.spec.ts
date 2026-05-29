import { test, expect } from '@playwright/test';

// Бургер-меню показывается только на узких экранах (max-width: 860px).
test.use({ viewport: { width: 390, height: 844 } });

// Прокрутка вниз на большое расстояние. scroll-behavior:smooth в globals.css
// делает scrollTo анимированным — для детерминизма отключаем его и ждём,
// пока позиция скролла перестанет меняться.
async function scrollDown(page: import('@playwright/test').Page, y: number) {
  await page.evaluate((target) => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, target);
  }, y);
  await page.waitForFunction(
    (target) => Math.abs(window.scrollY - Math.min(target, document.documentElement.scrollHeight - window.innerHeight)) < 2,
    y,
  );
}

test.describe('Мобильное меню — позиция при скролле', () => {
  test.beforeEach(async ({ page }) => {
    // Главная — самая длинная страница, есть куда скроллить.
    await page.goto('/');
  });

  test('Открывается под видимой шапкой и не улетает наверх при скролле', async ({ page }) => {
    await scrollDown(page, 5000);
    const scrollBefore = await page.evaluate(() => window.scrollY);
    expect(scrollBefore, 'страница должна реально прокрутиться вниз').toBeGreaterThan(1000);

    // Открываем меню.
    await page.getByRole('button', { name: 'Открыть меню' }).click();
    const menu = page.getByTestId('mobile-menu');
    await expect(menu).toBeVisible();

    // Снимаем геометрию шапки и меню в один момент.
    const geo = await page.evaluate(() => {
      const h = document.querySelector('header')!.getBoundingClientRect();
      const m = document.querySelector('[data-testid="mobile-menu"]')!.getBoundingClientRect();
      return { headerBottom: h.bottom, menuTop: m.top, menuBottom: m.bottom, vh: window.innerHeight };
    });

    // Меню не улетело над вьюпортом и видно на экране.
    expect(geo.menuTop, 'меню не должно улетать выше вьюпорта').toBeGreaterThanOrEqual(0);
    expect(geo.menuTop, 'верх меню должен быть внутри вьюпорта').toBeLessThan(geo.vh);
    // Меню открывается прямо под нижним краем видимой шапки.
    expect(geo.menuTop, 'меню должно примыкать к нижнему краю шапки')
      .toBeGreaterThanOrEqual(geo.headerBottom - 2);
    expect(geo.menuTop, 'меню не должно висеть далеко ниже шапки')
      .toBeLessThanOrEqual(geo.headerBottom + 24);
    // Меню реально занимает видимую область.
    expect(geo.menuBottom, 'меню должно быть видимым ниже шапки').toBeGreaterThan(geo.headerBottom);

    // Страница не прыгнула при открытии меню.
    const scrollAfter = await page.evaluate(() => window.scrollY);
    expect(scrollAfter, 'scrollY не должен меняться при открытии меню').toBe(scrollBefore);
  });

  test('Меню фиксировано к вьюпорту (position: fixed) и вынесено порталом из <header>', async ({ page }) => {
    await scrollDown(page, 3000);
    await page.getByRole('button', { name: 'Открыть меню' }).click();
    const menu = page.getByTestId('mobile-menu');
    await expect(menu).toBeVisible();

    expect(await menu.evaluate((el) => getComputedStyle(el).position)).toBe('fixed');
    // Портал: прямой потомок <body>, не внутри <header>.
    expect(await menu.evaluate((el) => el.parentElement?.tagName ?? '')).toBe('BODY');
    expect(await menu.evaluate((el) => !!el.closest('header')), 'меню не внутри <header>').toBe(false);
  });

  test('Оверлей перекрывает весь экран', async ({ page }) => {
    await scrollDown(page, 2000);
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
    await scrollDown(page, 2000);
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

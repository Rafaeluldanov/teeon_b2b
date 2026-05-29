import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

// Бургер-меню показывается только на узких экранах (max-width: 860px).
test.use({ viewport: { width: 390, height: 844 } });

// Прокрутка вниз на заданное расстояние. scroll-behavior:smooth в globals.css
// делает scrollTo анимированным — отключаем его для детерминизма и ждём, пока
// позиция скролла перестанет меняться.
async function scrollDown(page: Page, y: number) {
  await page.evaluate((target) => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, target);
  }, y);
  await page.waitForFunction(
    (target) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return Math.abs(window.scrollY - Math.min(target, max)) < 2;
    },
    y,
  );
}

// Открываем меню «как пользователь» — нативным click по кнопке. Используем
// dispatchEvent вместо locator.click(), потому что Playwright центрирует
// элемент через scroll-into-view и искусственно сдвигает scrollY (чего при
// реальном тапе пальцем не происходит). Видимость кнопки проверяем отдельно.
async function openMenu(page: Page) {
  const btn = page.getByRole('button', { name: 'Открыть меню' });
  await expect(btn).toBeVisible();
  await btn.dispatchEvent('click');
  await expect(page.getByTestId('mobile-menu')).toBeVisible();
}

test.describe('Мобильное меню — позиция при скролле', () => {
  test.beforeEach(async ({ page }) => {
    // Главная — самая длинная страница, есть куда скроллить.
    await page.goto('/');
  });

  test('Открывается под видимой шапкой, не улетает наверх и не двигает страницу', async ({ page }) => {
    await scrollDown(page, 5000);
    const scrollBefore = await page.evaluate(() => window.scrollY);
    expect(scrollBefore, 'страница должна реально прокрутиться вниз').toBeGreaterThan(1000);

    await openMenu(page);

    // Геометрия шапки и меню в один момент.
    const geo = await page.evaluate(() => {
      const h = document.querySelector('header')!.getBoundingClientRect();
      const m = document.querySelector('[data-testid="mobile-menu"]')!.getBoundingClientRect();
      return { headerTop: h.top, headerBottom: h.bottom, menuTop: m.top, menuBottom: m.bottom, vh: window.innerHeight };
    });

    // Шапка осталась прилеплена к верху вьюпорта (sticky не сломался от
    // блокировки скролла) — это и есть ключевая регрессия.
    expect(geo.headerTop, 'шапка должна остаться вверху вьюпорта').toBeLessThan(40);
    expect(geo.headerBottom, 'шапка должна быть видима вверху').toBeGreaterThan(20);

    // Меню не улетело над вьюпортом и видно на экране.
    expect(geo.menuTop, 'меню не должно улетать выше вьюпорта').toBeGreaterThanOrEqual(0);
    expect(geo.menuTop, 'верх меню должен быть внутри вьюпорта').toBeLessThan(geo.vh);
    // Меню открывается прямо под нижним краем видимой шапки.
    expect(geo.menuTop, 'меню должно примыкать к нижнему краю шапки')
      .toBeGreaterThanOrEqual(geo.headerBottom - 2);
    expect(geo.menuTop, 'меню не должно висеть далеко ниже шапки')
      .toBeLessThanOrEqual(geo.headerBottom + 24);
    expect(geo.menuBottom, 'меню должно быть видимым ниже шапки').toBeGreaterThan(geo.headerBottom);

    // Страница не прыгнула — scrollY не изменился при открытии меню.
    const scrollAfter = await page.evaluate(() => window.scrollY);
    expect(scrollAfter, 'scrollY не должен меняться при открытии меню').toBe(scrollBefore);
  });

  test('Меню фиксировано к вьюпорту (position: fixed) и вынесено порталом из <header>', async ({ page }) => {
    await scrollDown(page, 3000);
    await openMenu(page);
    const menu = page.getByTestId('mobile-menu');

    expect(await menu.evaluate((el) => getComputedStyle(el).position)).toBe('fixed');
    // Портал: прямой потомок <body>, не внутри <header>.
    expect(await menu.evaluate((el) => el.parentElement?.tagName ?? '')).toBe('BODY');
    expect(await menu.evaluate((el) => !!el.closest('header')), 'меню не внутри <header>').toBe(false);
  });

  test('Оверлей перекрывает весь экран', async ({ page }) => {
    await scrollDown(page, 2000);
    await openMenu(page);

    const overlayHeight = await page.evaluate(() => {
      const overlay = Array.from(document.querySelectorAll('div')).find((el) => {
        const s = getComputedStyle(el);
        return s.position === 'fixed' && s.inset === '0px';
      });
      return overlay ? overlay.getBoundingClientRect().height : 0;
    });
    expect(overlayHeight).toBeGreaterThan(700);
  });

  test('Закрытие меню восстанавливает позицию скролла', async ({ page }) => {
    await scrollDown(page, 4000);
    const before = await page.evaluate(() => window.scrollY);
    await openMenu(page);
    // Закрываем через бургер (теперь он "Закрыть меню").
    await page.getByRole('button', { name: 'Закрыть меню' }).dispatchEvent('click');
    await expect(page.getByTestId('mobile-menu')).toBeHidden();
    const after = await page.evaluate(() => window.scrollY);
    expect(after).toBe(before);
  });

  test('Подменю "Каталог" и "Нанесение" раскрываются внутри открытого меню', async ({ page }) => {
    await scrollDown(page, 2000);
    await openMenu(page);
    const menu = page.getByTestId('mobile-menu');

    await menu.getByRole('button', { name: 'Каталог' }).click();
    await expect(menu.getByRole('link', { name: /Весь каталог/ })).toBeVisible();
    await expect(menu.locator('a[href="/catalog/futbolki/"], a[href="/catalog/futbolki"]').first()).toBeVisible();

    await menu.getByRole('button', { name: 'Нанесение' }).click();
    await expect(menu.getByRole('link', { name: /Все способы брендирования/ })).toBeVisible();
    await expect(menu.locator('a[href="/branding/vyshivka/"], a[href="/branding/vyshivka"]').first()).toBeVisible();
  });
});

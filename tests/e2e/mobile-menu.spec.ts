import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } });

// Скроллим вниз. scroll-behavior:smooth в globals.css делает scrollTo
// анимированным — отключаем для детерминизма.
async function scrollDown(page: Page, y: number) {
  await page.evaluate((target) => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, target);
  }, y);
  await page.waitForFunction(() => window.scrollY > 500);
}

// Открываем меню «как пользователь» — нативным click по кнопке через
// dispatchEvent. Используем именно его, а НЕ locator.click(), потому что
// Playwright перед кликом делает scrollIntoViewIfNeeded и искусственно
// сдвигает scrollY (реальный тап пальцем этого не делает) — иначе проверка
// «страница не прыгнула» давала бы ложный провал. onClick-обработчик при этом
// вызывается полноценно и считает позицию от getBoundingClientRect() кнопки.
async function openMenu(page: Page) {
  const toggle = page.locator('[data-mobile-toggle="true"]');
  await expect(toggle).toBeVisible();
  await toggle.dispatchEvent('click');
  await expect(page.locator('[data-mobile-menu="true"]')).toBeVisible();
}

test('Мобильное меню открывается под кнопкой hamburger после скролла', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await scrollDown(page, 1500);

  const toggle = page.locator('[data-mobile-toggle="true"]');
  await expect(toggle).toBeVisible();

  const buttonBox = await toggle.boundingBox();
  const scrollBefore = await page.evaluate(() => window.scrollY);
  expect(scrollBefore, 'страница должна реально прокрутиться вниз').toBeGreaterThan(500);

  await toggle.dispatchEvent('click');

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
      buttonBottom: Math.round(b!.getBoundingClientRect().bottom),
      menuY: Math.round(m!.getBoundingClientRect().y),
    };
  });
  console.log('DIAG', JSON.stringify(diagnostics));

  expect(diagnostics.parent).toBe('BODY');
  expect(diagnostics.position).toBe('fixed');
});

test('Мобильное меню после скролла раскрывает Каталог и Нанесение', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await scrollDown(page, 1500);
  await openMenu(page);

  const menu = page.locator('[data-mobile-menu="true"]');
  // Запросы скоупим внутри меню — на странице тоже есть ссылки «Футболки».
  await menu.getByRole('button', { name: /Каталог/i }).click();
  await expect(menu.getByRole('link', { name: /Футболки/i })).toBeVisible();

  await menu.getByRole('button', { name: /Нанесение/i }).click();
  await expect(menu.getByRole('link', { name: /Вышивка/i })).toBeVisible();
});

test('Мобильное меню фиксировано к viewport и вынесено порталом из <header>', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await scrollDown(page, 1500);
  await openMenu(page);

  const menu = page.locator('[data-mobile-menu="true"]');
  expect(await menu.evaluate((el) => !!el.closest('header')), 'меню не должно быть внутри <header>').toBe(false);
  expect(await menu.evaluate((el) => el.parentElement?.tagName ?? '')).toBe('BODY');
  expect(await menu.evaluate((el) => getComputedStyle(el).position)).toBe('fixed');
});

test('Закрытие по оверлею не сбрасывает позицию скролла', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await scrollDown(page, 1500);
  const before = await page.evaluate(() => window.scrollY);
  await openMenu(page);

  await page.locator('[data-mobile-overlay="true"]').dispatchEvent('click');
  await expect(page.locator('[data-mobile-menu="true"]')).toHaveAttribute('aria-hidden', 'true');

  const after = await page.evaluate(() => window.scrollY);
  expect(Math.abs(after - before)).toBeLessThan(10);
});

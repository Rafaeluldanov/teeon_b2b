import { test, expect } from '@playwright/test';

/**
 * Регресс на горизонтальный overflow.
 *
 * body имеет `overflow-x: clip`, поэтому document.scrollWidth всегда равен
 * clientWidth и сам по себе ничего не ловит. Поэтому проверяем РЕАЛЬНЫЕ
 * границы элементов: ни один видимый элемент не должен выходить за правый
 * край viewport. Это ловит «уехавшую» сетку/контейнер даже под clip.
 */

const PAGES = [
  '/',
  '/catalog/',
  '/catalog/futbolki/',
  '/branding/',
  '/branding/vyshivka/',
  '/portfolio/',
  '/about/',
  '/contacts/',
  '/faq/',
  '/suvenirnaya-produkciya/',
];

// Ключевые ширины: десктоп, «опасная» зона шапки, планшет, мобайл, мелкий телефон.
const WIDTHS = [1440, 1280, 1024, 900, 768, 480, 375, 320];

// Допуск на субпиксельные округления.
const TOLERANCE = 1.5;

for (const path of PAGES) {
  for (const width of WIDTHS) {
    test(`${path} @ ${width}px — нет горизонтального overflow`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path, { waitUntil: 'networkidle' });

      const offenders = await page.evaluate((tol) => {
        const vw = document.documentElement.clientWidth;
        const out: { tag: string; cls: string; right: number; width: number }[] = [];
        for (const el of Array.from(document.querySelectorAll('body *'))) {
          const r = el.getBoundingClientRect();
          // Игнорируем намеренно спрятанные за экраном элементы (left:-9999px)
          // и нулевые/невидимые.
          if (r.left < -2000) continue;
          if (r.width === 0 || r.height === 0) continue;
          if (r.right > vw + tol) {
            out.push({
              tag: el.tagName,
              cls: String((el as HTMLElement).className).slice(0, 60),
              right: Math.round(r.right),
              width: Math.round(r.width),
            });
          }
        }
        return { vw, out };
      }, TOLERANCE);

      const msg = offenders.out
        .map((o) => `${o.tag}.${o.cls} right=${o.right} (vw=${offenders.vw})`)
        .join('\n');
      expect(offenders.out, `Элементы выходят за правый край на ${path} @ ${width}px:\n${msg}`).toEqual([]);
    });
  }
}

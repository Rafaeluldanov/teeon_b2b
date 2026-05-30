import { test, expect } from '@playwright/test';

/**
 * Регресс на горизонтальный overflow («сайт уезжает вправо»).
 *
 * Что и почему проверяем:
 *  1. На время теста снимаем `overflow-x: clip` с html/body. Это «защита»,
 *     которая прячет горизонтальный скролл, но не убирает причину. Сняв её,
 *     мы видим РЕАЛЬНУЮ ширину документа.
 *  2. Главная проверка — document.scrollWidth не больше clientWidth: страница
 *     не должна прокручиваться по горизонтали.
 *  3. Для диагностики дополнительно ищем конкретные элементы, выходящие за
 *     правый край. При этом игнорируем элементы, лежащие внутри контейнеров с
 *     overflow (hidden/auto/scroll/clip) — это намеренные декоративные круги и
 *     горизонтальные ленты-табы, которые сами по себе страницу не растягивают.
 *
 * Нижняя граница — 360px (покрывает все актуальные телефоны). Для совсем
 * легаси-ширин (<360px) остаётся `overflow-x: clip` как страховка.
 */

const PAGES = [
  '/',
  '/catalog/',
  '/catalog/futbolki/',
  '/branding/',
  '/branding/vyshivka/',
  '/portfolio/',
  '/portfolio/hudi-futbolki-komanda/',
  '/about/',
  '/contacts/',
  '/faq/',
  '/suvenirnaya-produkciya/',
  '/requisites/',
];

// Десктоп, «опасная» зона шапки, планшет, мобайл.
const WIDTHS = [1440, 1280, 1024, 960, 900, 768, 600, 480, 414, 375, 360];

const TOLERANCE = 1.5;

for (const path of PAGES) {
  for (const width of WIDTHS) {
    test(`${path} @ ${width}px — нет горизонтального overflow`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path, { waitUntil: 'networkidle' });

      // Снимаем clip, чтобы реальная ширина документа стала видимой.
      await page.addStyleTag({ content: 'html, body { overflow-x: visible !important; }' });

      const result = await page.evaluate((tol) => {
        const vw = document.documentElement.clientWidth;
        const scrollW = document.documentElement.scrollWidth;

        // Диагностика: элементы за правым краем, НЕ обрезанные overflow-предком.
        const offenders: string[] = [];
        for (const el of Array.from(document.querySelectorAll('body *'))) {
          const r = el.getBoundingClientRect();
          if (r.left < -2000 || r.width === 0 || r.height === 0) continue;
          if (r.right <= vw + tol) continue;
          let clipped = false;
          let p = el.parentElement;
          while (p && p !== document.documentElement) {
            const ox = getComputedStyle(p).overflowX;
            if (ox === 'hidden' || ox === 'auto' || ox === 'scroll' || ox === 'clip') {
              clipped = true;
              break;
            }
            p = p.parentElement;
          }
          if (clipped) continue;
          const cls = String((el as HTMLElement).className).slice(0, 60);
          offenders.push(`${el.tagName}.${cls} right=${Math.round(r.right)}`);
        }
        return { vw, scrollW, offenders };
      }, TOLERANCE);

      expect(
        result.scrollW,
        `Документ шире viewport на ${path} @ ${width}px ` +
          `(scrollWidth=${result.scrollW}, clientWidth=${result.vw}). ` +
          `Виновники:\n${result.offenders.join('\n')}`,
      ).toBeLessThanOrEqual(result.vw + TOLERANCE);

      expect(
        result.offenders,
        `Элементы выходят за правый край на ${path} @ ${width}px:\n${result.offenders.join('\n')}`,
      ).toEqual([]);
    });
  }
}

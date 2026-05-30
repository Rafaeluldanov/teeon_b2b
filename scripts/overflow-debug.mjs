import { chromium } from 'playwright';

const widths = [1440, 1280, 1024, 768, 480, 375];
const url = process.env.URL || 'http://localhost:3000/';

const browser = await chromium.launch();
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  const result = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out = [];
    for (const el of document.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 2 || r.left < -2) {
        out.push({
          tag: el.tagName,
          cls: String(el.className).slice(0, 80),
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
        });
      }
    }
    return { vw, scrollW: document.documentElement.scrollWidth, out };
  });
  console.log(`\n=== viewport ${w} | clientWidth=${result.vw} | scrollWidth=${result.scrollW} ===`);
  // only show the widest / outermost offenders
  for (const o of result.out.slice(0, 25)) {
    console.log(`${o.tag.padEnd(6)} L=${String(o.left).padStart(6)} R=${String(o.right).padStart(6)} W=${String(o.width).padStart(5)}  ${o.cls}`);
  }
  await ctx.close();
}
await browser.close();

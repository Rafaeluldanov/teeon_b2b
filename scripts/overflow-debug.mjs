import { chromium } from 'playwright';

const widths = [1440, 1280, 1100, 1024, 1000, 900, 768, 600, 480, 414, 375, 320];
const url = process.env.URL || 'http://localhost:3000/';

const browser = await chromium.launch();
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  // Disable the clip band-aid so true overflow surfaces in scrollWidth.
  await page.addStyleTag({ content: 'html,body{overflow-x:visible !important;}' });
  const result = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      // ignore intentionally off-screen (left:-9999px) hidden inputs
      if (r.left < -2000) continue;
      if (r.right > vw + 1) {
        out.push({
          tag: el.tagName,
          cls: String(el.className).slice(0, 70),
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
        });
      }
    }
    // keep the widest offenders
    out.sort((a, b) => b.right - a.right);
    return { vw, scrollW: document.documentElement.scrollWidth, out: out.slice(0, 10) };
  });
  const over = result.scrollW - result.vw;
  console.log(`\n=== vw=${w} | scrollWidth=${result.scrollW} | overflow=${over > 0 ? '+' + over : 0} ===`);
  for (const o of result.out) {
    console.log(`  ${o.tag.padEnd(6)} R=${String(o.right).padStart(6)} W=${String(o.width).padStart(5)}  ${o.cls}`);
  }
  await ctx.close();
}
await browser.close();

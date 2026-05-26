#!/usr/bin/env node
// Converts PNG/JPEG files under public/ to WebP (q=80) and deletes originals.
// Also updates references (src="/foo.png" -> src="/foo.webp") in app/, components/, lib/.
// Skips files that already have a sibling .webp.

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.env.PROJECT_ROOT || '/work';
const PUBLIC_DIR = path.join(ROOT, 'public');
const QUALITY = Number(process.env.WEBP_QUALITY || 80);
const DRY_RUN = process.env.DRY_RUN !== '0';
const SOURCE_DIRS = [path.join(ROOT, 'app'), path.join(ROOT, 'components'), path.join(ROOT, 'lib')];
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'design-about', 'design-faq', 'design-home', 'design-portfolio', 'branding-samples']);

async function walk(dir, out = []) {
  let entries;
  try { entries = await fs.readdir(dir, { withFileTypes: true }); }
  catch { return out; }
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

async function convertImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!/^\.(png|jpe?g)$/.test(ext)) return null;
  const target = filePath.replace(/\.(png|jpe?g)$/i, '.webp');
  try {
    await fs.access(target);
    return { skipped: true, filePath, target };
  } catch {}
  const input = await fs.readFile(filePath);
  const output = await sharp(input, { failOn: 'none' })
    .rotate()
    .webp({ quality: QUALITY, effort: 4 })
    .toBuffer();
  if (!DRY_RUN) {
    await fs.writeFile(target, output);
    await fs.unlink(filePath);
  }
  return { skipped: false, filePath, target, before: input.length, after: output.length };
}

async function rewriteReferences(mapping) {
  // mapping: { '/foo.png': '/foo.webp', ... } with public-relative URLs
  const files = [];
  for (const dir of SOURCE_DIRS) await walk(dir, files);
  const codeFiles = files.filter(f => /\.(tsx?|jsx?|css|mjs|json)$/.test(f));
  let totalEdits = 0;
  for (const file of codeFiles) {
    let txt;
    try { txt = await fs.readFile(file, 'utf8'); } catch { continue; }
    let edits = 0;
    for (const [from, to] of Object.entries(mapping)) {
      if (txt.includes(from)) {
        txt = txt.split(from).join(to);
        edits++;
      }
    }
    if (edits > 0) {
      if (!DRY_RUN) await fs.writeFile(file, txt);
      console.log(`  rewrote ${file} (${edits})`);
      totalEdits += edits;
    }
  }
  return totalEdits;
}

async function main() {
  console.log(`mode: ${DRY_RUN ? 'DRY-RUN' : 'EXECUTE'}`);
  console.log(`public dir: ${PUBLIC_DIR}`);
  const all = await walk(PUBLIC_DIR);
  const candidates = all.filter(f => /\.(png|jpe?g)$/i.test(f));
  console.log(`candidates: ${candidates.length}`);

  const mapping = {};
  let originalBytes = 0;
  let newBytes = 0;
  let skipped = 0;

  for (const file of candidates) {
    const res = await convertImage(file);
    if (!res) continue;
    if (res.skipped) {
      console.log(`skip (target exists): ${file}`);
      skipped++;
      continue;
    }
    const publicFrom = '/' + path.relative(PUBLIC_DIR, res.filePath).split(path.sep).join('/');
    const publicTo = '/' + path.relative(PUBLIC_DIR, res.target).split(path.sep).join('/');
    mapping[publicFrom] = publicTo;
    originalBytes += res.before;
    newBytes += res.after;
    console.log(`${publicFrom} -> ${publicTo}  ${(res.before / 1024).toFixed(0)}KB -> ${(res.after / 1024).toFixed(0)}KB`);
  }

  console.log('');
  console.log(`converted: ${Object.keys(mapping).length}, skipped: ${skipped}`);
  if (originalBytes) {
    console.log(`size: ${(originalBytes / 1024).toFixed(0)} KB -> ${(newBytes / 1024).toFixed(0)} KB  (-${((1 - newBytes / originalBytes) * 100).toFixed(1)}%)`);
  }

  if (Object.keys(mapping).length) {
    console.log('rewriting source references...');
    const edits = await rewriteReferences(mapping);
    console.log(`source edits: ${edits}`);
  }
}

main().catch(err => { console.error('fatal:', err); process.exit(1); });

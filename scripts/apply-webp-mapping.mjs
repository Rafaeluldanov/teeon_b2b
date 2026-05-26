#!/usr/bin/env node
// Reads /work/webp-mapping.json (produced by migrate-minio-to-webp.mjs)
// and rewrites image URLs (.jpg/.jpeg/.png -> .webp) in:
//   - lib/portfolio.ts
//   - leads/admin-dump-portfolio.json
// Idempotent: missing originals are ignored.

import fs from 'node:fs/promises';
import path from 'node:path';

const MAPPING_FILE = process.env.MAPPING_FILE || '/work/webp-mapping.json';
const ROOT = process.env.PROJECT_ROOT || '/work';
const TARGETS = [
  path.join(ROOT, 'lib/portfolio.ts'),
  path.join(ROOT, 'leads/admin-dump-portfolio.json'),
];

async function main() {
  const raw = await fs.readFile(MAPPING_FILE, 'utf8');
  const { entries, publicUrl } = JSON.parse(raw);
  if (!Array.isArray(entries) || entries.length === 0) {
    console.log('no entries in mapping; nothing to do');
    return;
  }

  // Build search/replace pairs. Both with and without publicUrl prefix
  // (covers absolute URLs and bare keys, though we currently only have absolute).
  const pairs = [];
  for (const e of entries) {
    const fromAbs = `${publicUrl}/${e.from}`;
    const toAbs = `${publicUrl}/${e.to}`;
    pairs.push([fromAbs, toAbs]);
    pairs.push([`/${e.from}`, `/${e.to}`]); // safety: catch any path-style ref
  }

  let totalRewrites = 0;
  for (const file of TARGETS) {
    let txt;
    try { txt = await fs.readFile(file, 'utf8'); }
    catch (err) {
      if (err.code === 'ENOENT') { console.log(`skip (missing): ${file}`); continue; }
      throw err;
    }
    let count = 0;
    for (const [from, to] of pairs) {
      if (txt.includes(from)) {
        const before = txt;
        txt = txt.split(from).join(to);
        count += (before.length !== txt.length || before !== txt) ? 1 : 0;
      }
    }
    if (count > 0) {
      await fs.writeFile(file + '.bak', await fs.readFile(file));
      await fs.writeFile(file, txt);
      console.log(`updated ${file} (${count} mappings matched, backup -> ${file}.bak)`);
      totalRewrites += count;
    } else {
      console.log(`no changes for ${file}`);
    }
  }
  console.log(`done. total rewrites: ${totalRewrites}`);
}

main().catch(err => { console.error('fatal:', err); process.exit(1); });

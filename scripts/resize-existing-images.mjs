// Одноразовый backfill: пересжимает все WebP в MinIO так,
// чтобы максимальная сторона была не больше MAX_WIDTH, qualtiy=82.
// Идемпотентен — повторный запуск пропустит уже сжатые.
//
// Запуск в one-shot контейнере с node_modules с хоста:
//   docker run --rm --network teeon_default \
//     -v /home/ivan/teeon:/work -w /work \
//     -e S3_ENDPOINT=http://minio:9000 \
//     -e S3_ACCESS_KEY=teeon -e S3_SECRET_KEY=... -e S3_BUCKET=teeon-images \
//     node:20-alpine node scripts/resize-existing-images.mjs

import {
  S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand,
} from '@aws-sdk/client-s3';
import sharp from 'sharp';

const BUCKET = process.env.S3_BUCKET ?? 'teeon-images';
const MAX_WIDTH = 2400;       // покрывает retina-десктоп
const QUALITY = 82;
const SKIP_BELOW = 250 * 1024; // не трогаем файлы меньше 250 КБ — они уже норм

const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION ?? 'us-east-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  forcePathStyle: true,
});

async function* listAll() {
  let token;
  do {
    const r = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET, ContinuationToken: token }));
    for (const o of r.Contents ?? []) if (o.Key && !o.Key.endsWith('/')) yield { key: o.Key, size: o.Size ?? 0 };
    token = r.IsTruncated ? r.NextContinuationToken : undefined;
  } while (token);
}

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const c of stream) chunks.push(c);
  return Buffer.concat(chunks);
}

const stats = { total: 0, resized: 0, skippedSmall: 0, skippedNotImage: 0, errors: 0, savedBytes: 0 };
const start = Date.now();

for await (const obj of listAll()) {
  stats.total++;
  if (!/\.(webp|jpe?g|png)$/i.test(obj.key)) {
    stats.skippedNotImage++;
    continue;
  }
  if (obj.size < SKIP_BELOW) {
    stats.skippedSmall++;
    continue;
  }
  try {
    const got = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: obj.key }));
    const input = await streamToBuffer(got.Body);
    const meta = await sharp(input).metadata();
    const needResize = (meta.width ?? 0) > MAX_WIDTH;
    if (!needResize && obj.size < 500 * 1024) {
      // не трогаем небольшие
      stats.skippedSmall++;
      continue;
    }
    const out = await sharp(input)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 4 })
      .toBuffer();
    if (out.length >= input.length * 0.95) {
      // сжатие не дало эффекта (<5%) — не перезаписываем
      stats.skippedSmall++;
      continue;
    }
    await s3.send(new PutObjectCommand({
      Bucket: BUCKET, Key: obj.key, Body: out,
      ContentType: 'image/webp',
      CacheControl: 'public, max-age=31536000, immutable',
    }));
    stats.resized++;
    stats.savedBytes += (input.length - out.length);
    const inKB = Math.round(input.length / 1024);
    const outKB = Math.round(out.length / 1024);
    const pct = Math.round((1 - out.length / input.length) * 100);
    console.log(`✓ ${obj.key.padEnd(70)} ${inKB}→${outKB} КБ (-${pct}%, ${meta.width}px → ${Math.min(meta.width ?? 0, MAX_WIDTH)}px)`);
  } catch (err) {
    stats.errors++;
    console.error('✗', obj.key, '-', err.message);
  }
}

const elapsed = Math.round((Date.now() - start) / 1000);
console.log('\n=== done in', elapsed, 's ===');
console.log(JSON.stringify({
  ...stats,
  savedMB: +(stats.savedBytes / 1024 / 1024).toFixed(1),
}, null, 2));

// Одноразовый бэкфилл Content-Type для существующих объектов в MinIO.
// Безопасен для повторного запуска: пропускает объекты, у которых ContentType уже правильный.
// Запуск изнутри контейнера teeon-app (где есть @aws-sdk/client-s3 и доступ к minio):
//   docker exec teeon-app node /tmp/backfill-content-type.mjs

import {
  S3Client,
  ListObjectsV2Command,
  HeadObjectCommand,
  CopyObjectCommand,
} from '@aws-sdk/client-s3';

const BUCKET = process.env.S3_BUCKET ?? 'teeon-images';

const EXT_TO_MIME = {
  webp: 'image/webp',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  gif: 'image/gif',
  avif: 'image/avif',
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
};

function mimeFor(key) {
  const m = key.toLowerCase().match(/\.([a-z0-9]+)$/);
  return m ? EXT_TO_MIME[m[1]] : undefined;
}

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
    for (const o of r.Contents ?? []) if (o.Key && !o.Key.endsWith('/')) yield o.Key;
    token = r.IsTruncated ? r.NextContinuationToken : undefined;
  } while (token);
}

const stats = { total: 0, fixed: 0, skipped: 0, unknownExt: 0, errors: 0 };

for await (const key of listAll()) {
  stats.total++;
  const wanted = mimeFor(key);
  if (!wanted) {
    console.warn('skip (unknown ext):', key);
    stats.unknownExt++;
    continue;
  }
  try {
    const head = await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    if (head.ContentType === wanted) {
      stats.skipped++;
      continue;
    }
    await s3.send(new CopyObjectCommand({
      Bucket: BUCKET,
      Key: key,
      CopySource: `/${BUCKET}/${encodeURIComponent(key).replace(/%2F/g, '/')}`,
      ContentType: wanted,
      MetadataDirective: 'REPLACE',
      CacheControl: 'public, max-age=31536000, immutable',
    }));
    stats.fixed++;
    if (stats.fixed % 20 === 0) console.log(`...fixed ${stats.fixed} so far`);
  } catch (err) {
    stats.errors++;
    console.error('error on', key, '-', err.message);
  }
}

console.log('\n=== done ===');
console.log(JSON.stringify(stats, null, 2));

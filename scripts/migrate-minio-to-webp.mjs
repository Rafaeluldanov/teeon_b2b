#!/usr/bin/env node
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ENDPOINT = process.env.S3_ENDPOINT || 'http://minio:9000';
const REGION = process.env.S3_REGION || 'us-east-1';
const ACCESS = process.env.S3_ACCESS_KEY;
const SECRET = process.env.S3_SECRET_KEY;
const BUCKET = process.env.S3_BUCKET || 'teeon-images';
const PUBLIC_URL = (process.env.NEXT_PUBLIC_S3_PUBLIC_URL || '').replace(/\/$/, '');
const DRY_RUN = process.env.DRY_RUN !== '0';
const QUALITY = Number(process.env.WEBP_QUALITY || 80);
const MAPPING_FILE = process.env.MAPPING_FILE || '/work/webp-mapping.json';

if (!ACCESS || !SECRET) {
  console.error('S3_ACCESS_KEY / S3_SECRET_KEY required');
  process.exit(1);
}

const s3 = new S3Client({
  endpoint: ENDPOINT,
  region: REGION,
  credentials: { accessKeyId: ACCESS, secretAccessKey: SECRET },
  forcePathStyle: true,
});

const CONVERTIBLE = /\.(jpe?g|png)$/i;

function newKey(key) {
  return key.replace(/\.(jpe?g|png)$/i, '.webp');
}

async function listAll() {
  const items = [];
  let token;
  do {
    const res = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET, ContinuationToken: token }));
    for (const o of res.Contents ?? []) {
      if (o.Key && !o.Key.endsWith('/')) items.push({ key: o.Key, size: o.Size ?? 0 });
    }
    token = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (token);
  return items;
}

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
}

async function main() {
  const all = await listAll();
  const convertible = all.filter(o => CONVERTIBLE.test(o.key));
  const already = all.filter(o => /\.webp$/i.test(o.key));

  console.log(`mode: ${DRY_RUN ? 'DRY-RUN (no changes)' : 'EXECUTE'}`);
  console.log(`bucket: ${BUCKET} @ ${ENDPOINT}`);
  console.log(`total objects: ${all.length}`);
  console.log(`already webp:  ${already.length}`);
  console.log(`to convert:    ${convertible.length}`);
  console.log(`quality:       ${QUALITY}`);
  console.log('');

  const mapping = [];
  let originalBytes = 0;
  let newBytes = 0;
  let ok = 0;
  let fail = 0;
  let skipped = 0;

  for (let i = 0; i < convertible.length; i++) {
    const { key, size } = convertible[i];
    const target = newKey(key);
    const tag = `[${i + 1}/${convertible.length}]`;
    try {
      const head = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
      const input = await streamToBuffer(head.Body);
      const output = await sharp(input, { failOn: 'none' })
        .rotate()
        .webp({ quality: QUALITY, effort: 4 })
        .toBuffer();

      originalBytes += input.length;
      newBytes += output.length;
      mapping.push({ from: key, to: target, before: input.length, after: output.length });

      const ratio = ((1 - output.length / input.length) * 100).toFixed(1);
      console.log(`${tag} ${key} -> ${target}  ${(input.length / 1024).toFixed(0)}KB -> ${(output.length / 1024).toFixed(0)}KB  (-${ratio}%)`);

      if (!DRY_RUN) {
        await s3.send(new PutObjectCommand({
          Bucket: BUCKET,
          Key: target,
          Body: output,
          ContentType: 'image/webp',
        }));
        await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
      }
      ok++;
    } catch (err) {
      console.error(`${tag} FAIL ${key}: ${err.message}`);
      fail++;
    }
  }

  console.log('');
  console.log(`done. ok=${ok} fail=${fail} skipped=${skipped}`);
  if (originalBytes) {
    const saved = originalBytes - newBytes;
    console.log(`size: ${(originalBytes / 1024 / 1024).toFixed(1)} MB -> ${(newBytes / 1024 / 1024).toFixed(1)} MB  (saved ${(saved / 1024 / 1024).toFixed(1)} MB, -${((saved / originalBytes) * 100).toFixed(1)}%)`);
  }

  if (mapping.length) {
    const out = {
      bucket: BUCKET,
      publicUrl: PUBLIC_URL,
      executed: !DRY_RUN,
      generatedAt: new Date().toISOString(),
      entries: mapping,
    };
    await fs.mkdir(path.dirname(MAPPING_FILE), { recursive: true });
    await fs.writeFile(MAPPING_FILE, JSON.stringify(out, null, 2));
    console.log(`mapping saved: ${MAPPING_FILE}`);
  }
}

main().catch(err => {
  console.error('fatal:', err);
  process.exit(1);
});

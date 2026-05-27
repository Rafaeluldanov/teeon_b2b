import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

function makeClient(): S3Client {
  return new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION ?? 'us-east-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY ?? '',
      secretAccessKey: process.env.S3_SECRET_KEY ?? '',
    },
    forcePathStyle: true, // required for MinIO
  });
}

const BUCKET = process.env.S3_BUCKET ?? 'teeon-images';
const PUBLIC_URL = (process.env.NEXT_PUBLIC_S3_PUBLIC_URL ?? '').replace(/\/$/, '');

export interface StorageFile {
  key: string;
  url: string;
  size: number;
  lastModified?: Date;
}

export async function uploadFile(
  key: string,
  body: Buffer,
  contentType: string,
): Promise<string> {
  // Long-lived cache: image/video filenames are timestamped (`${Date.now()}-...`),
  // so a fresh upload always gets a new URL — immutable is safe.
  const cacheControl = contentType.startsWith('image/') || contentType.startsWith('video/')
    ? 'public, max-age=31536000, immutable'
    : undefined;
  await makeClient().send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      ...(cacheControl ? { CacheControl: cacheControl } : {}),
    }),
  );
  return `${PUBLIC_URL}/${key}`;
}

export async function listFiles(prefix?: string): Promise<StorageFile[]> {
  const result = await makeClient().send(
    new ListObjectsV2Command({ Bucket: BUCKET, Prefix: prefix }),
  );
  return (result.Contents ?? [])
    .filter((o) => o.Key && !o.Key.endsWith('/'))
    .map((o) => ({
      key: o.Key!,
      url: `${PUBLIC_URL}/${o.Key}`,
      size: o.Size ?? 0,
      lastModified: o.LastModified,
    }));
}

export async function deleteFile(key: string): Promise<void> {
  await makeClient().send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

export async function getFile(key: string): Promise<{ content: Buffer; contentType: string } | null> {
  try {
    const res = await makeClient().send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
    if (!res.Body) return null;
    const chunks: Buffer[] = [];
    // SDK v3 streams the body — собираем в Buffer.
    for await (const chunk of res.Body as AsyncIterable<Uint8Array>) {
      chunks.push(Buffer.from(chunk));
    }
    return {
      content: Buffer.concat(chunks),
      contentType: res.ContentType ?? 'application/octet-stream',
    };
  } catch {
    return null;
  }
}

// Если URL — публичная ссылка на наш S3 (PUBLIC_URL/<key>), вернём ключ объекта,
// чтобы качать его через S3-клиент напрямую (по внутреннему S3_ENDPOINT внутри
// Docker-сети), а не через цикл teeon.ru → Caddy → MinIO.
export function extractS3KeyFromPublicUrl(url: string): string | null {
  if (!PUBLIC_URL) return null;
  if (!url.startsWith(PUBLIC_URL + '/')) return null;
  const key = url.slice(PUBLIC_URL.length + 1);
  // Чистим query / fragment / лишние сегменты.
  return key.split('?')[0]!.split('#')[0]!;
}

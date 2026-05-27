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

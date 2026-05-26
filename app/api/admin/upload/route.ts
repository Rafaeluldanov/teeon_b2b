import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth';
import { uploadFile } from '@/lib/storage';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const WEBP_QUALITY = 82;
const WEBP_MAX_WIDTH = 2400; // покрывает retina-десктоп; больше — пустая трата трафика

// Raster formats are transcoded to WebP server-side; SVG is preserved as-is.
const ALLOWED_IMAGE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
};
const TRANSCODE_TO_WEBP = new Set(['image/jpeg', 'image/png', 'image/webp']);
const ALLOWED_VIDEO: Record<string, string> = {
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/quicktime': 'mov',
};
const VALID_FOLDERS = new Set(['catalog', 'portfolio', 'branding', 'banner', 'pages', 'hero']);
const MAX_IMAGE = 50 * 1024 * 1024;  // 50 МБ
const MAX_VIDEO = 500 * 1024 * 1024; // 500 МБ

function isS3Configured(): boolean {
  return !!(process.env.S3_ENDPOINT && process.env.S3_ACCESS_KEY && process.env.S3_SECRET_KEY);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  // ── Авторизация ──
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    return NextResponse.json({ success: false, message: 'ADMIN_SESSION_SECRET не настроен в .env.local' }, { status: 500 });
  }
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!await verifyAdminToken(token, secret)) {
    return NextResponse.json({ success: false, message: 'Ошибка авторизации. Выйдите и войдите в админку заново.' }, { status: 401 });
  }

  // ── Форма ──
  let form: FormData;
  try { form = await request.formData(); }
  catch { return NextResponse.json({ success: false, message: 'Не удалось прочитать данные формы.' }, { status: 400 }); }

  const file = form.get('file') as File | null;
  const rawFolder = (form.get('folder') as string | null) ?? 'catalog';
  const folder = (VALID_FOLDERS.has(rawFolder) ? rawFolder : 'catalog');

  if (!file || file.size === 0) {
    return NextResponse.json({ success: false, message: 'Файл не выбран.' }, { status: 400 });
  }

  // ── Определяем тип ──
  const isImage = !!ALLOWED_IMAGE[file.type];
  const isVideo = !!ALLOWED_VIDEO[file.type];

  if (!isImage && !isVideo) {
    return NextResponse.json({ success: false, message: 'Недопустимый тип файла. Изображения: JPEG, PNG, WEBP, SVG. Видео: MP4, WebM, MOV.' }, { status: 400 });
  }

  const maxBytes = isVideo ? MAX_VIDEO : MAX_IMAGE;
  if (file.size > maxBytes) {
    return NextResponse.json({ success: false, message: `Файл слишком большой (${(file.size / 1024 / 1024).toFixed(1)} МБ). Максимум: ${isVideo ? '500' : '50'} МБ.` }, { status: 400 });
  }

  // Обрезаем basename отдельно, чтобы расширение никогда не терялось.
  const dot = file.name.lastIndexOf('.');
  const rawBase = dot > 0 ? file.name.slice(0, dot) : file.name;
  const rawExt = dot > 0 ? file.name.slice(dot + 1) : '';
  const sanitize = (s: string) => s.toLowerCase().replace(/[^a-z0-9._-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const safeBase = sanitize(rawBase).slice(0, 60) || 'file';
  const safeExt = sanitize(rawExt).slice(0, 10);
  const safeName = safeExt ? `${safeBase}.${safeExt}` : safeBase;
  let filename = `${Date.now()}-${safeName}`;
  let buffer: Buffer = Buffer.from(await file.arrayBuffer());
  let contentType = file.type;

  // Transcode raster images to WebP, downsize to retina-desktop max.
  if (isImage && TRANSCODE_TO_WEBP.has(file.type)) {
    try {
      const webp = await sharp(buffer, { failOn: 'none' })
        .rotate()
        .resize({ width: WEBP_MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toBuffer();
      buffer = Buffer.from(webp);
      contentType = 'image/webp';
      filename = filename.replace(/\.(jpe?g|png|webp)$/i, '') + '.webp';
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      return NextResponse.json({ success: false, message: `Не удалось обработать изображение: ${msg}` }, { status: 400 });
    }
  }

  const key = `${folder}/${filename}`;

  // ── S3/MinIO ──
  if (isS3Configured()) {
    try {
      const url = await uploadFile(key, buffer, contentType);
      return NextResponse.json({ success: true, url, filename, key, storage: 's3' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Ошибка загрузки';
      if (msg.includes('NoSuchBucket') || msg.includes('bucket') || msg.includes('connect')) {
        return NextResponse.json({ success: false, message: `MinIO/S3 недоступен. Проверьте бакет «${process.env.S3_BUCKET ?? 'teeon-images'}».` }, { status: 502 });
      }
      return NextResponse.json({ success: false, message: `Ошибка S3: ${msg}` }, { status: 500 });
    }
  }

  // ── Локальный fallback (только dev) ──
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ success: false, message: 'Для production настройте S3_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY.' }, { status: 500 });
  }

  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', folder);
    fs.mkdirSync(uploadsDir, { recursive: true });
    fs.writeFileSync(path.join(uploadsDir, filename), buffer);
    const url = `/uploads/${folder}/${filename}`;
    return NextResponse.json({ success: true, url, filename, key, storage: 'local' });
  } catch (err) {
    return NextResponse.json({ success: false, message: `Ошибка сохранения: ${err instanceof Error ? err.message : 'неизвестная ошибка'}` }, { status: 500 });
  }
}

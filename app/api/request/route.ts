import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendLeadEmail } from '@/lib/mail';

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
const MAX_SOURCE_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB — для фото товара/кейса хватит

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/svg+xml',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
  'application/x-zip-compressed',
]);

const ALLOWED_EXTENSIONS = /\.(pdf|png|jpe?g|webp|svg|txt|docx?|xlsx?|zip)$/i;

// Подгружает картинку источника заявки (товар из каталога / кейс из портфолио),
// чтобы приложить её к письму. Поддерживает локальные пути из /public и
// абсолютные URL (CDN). При любой ошибке возвращает undefined — заявка должна
// уйти даже если фото не удалось приложить.
async function loadSourceImage(rawUrl: string): Promise<{ filename: string; content: Buffer; contentType: string } | undefined> {
  if (!rawUrl) return undefined;
  try {
    const url = rawUrl.trim();
    let buffer: Buffer;
    let filename: string;
    let contentType = 'application/octet-stream';

    if (/^https?:\/\//i.test(url)) {
      // Защита от SSRF: только публичные http(s), не localhost.
      const u = new URL(url);
      if (['localhost', '127.0.0.1', '0.0.0.0', '::1'].includes(u.hostname)) return undefined;
      const res = await fetch(url, { signal: AbortSignal.timeout(7000) });
      if (!res.ok) return undefined;
      const ct = res.headers.get('content-type') ?? '';
      if (!ct.startsWith('image/')) return undefined;
      contentType = ct.split(';')[0]!.trim();
      const ab = await res.arrayBuffer();
      if (ab.byteLength > MAX_SOURCE_IMAGE_SIZE) return undefined;
      buffer = Buffer.from(ab);
      filename = path.basename(u.pathname) || 'source.jpg';
    } else if (url.startsWith('/')) {
      // Локальный путь относительно /public. Защита от path traversal.
      const safePath = url.replace(/\?.*$/, '').split('/').filter((seg) => seg && seg !== '..').join('/');
      const filePath = path.join(process.cwd(), 'public', safePath);
      if (!filePath.startsWith(path.join(process.cwd(), 'public'))) return undefined;
      if (!fs.existsSync(filePath)) return undefined;
      const stat = fs.statSync(filePath);
      if (!stat.isFile() || stat.size > MAX_SOURCE_IMAGE_SIZE) return undefined;
      buffer = fs.readFileSync(filePath);
      filename = path.basename(filePath);
      const ext = path.extname(filename).toLowerCase();
      const extMap: Record<string, string> = {
        '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
        '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml',
      };
      contentType = extMap[ext] ?? 'image/jpeg';
    } else {
      return undefined;
    }

    return { filename, content: buffer, contentType };
  } catch (err) {
    console.warn('[api/request] loadSourceImage failed:', err);
    return undefined;
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ success: false, message: 'Не удалось прочитать данные формы.' }, { status: 400 });
  }

  // Honeypot check
  const honeypot = formData.get('website');
  if (honeypot && String(honeypot).trim() !== '') {
    return NextResponse.json({ success: true, message: 'Заявка принята.' });
  }

  // Required fields
  const fullName = String(formData.get('name') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();

  const errors: string[] = [];
  if (!fullName) errors.push('ФИО обязательно.');
  if (!phone) errors.push('Телефон обязателен.');

  if (errors.length > 0) {
    return NextResponse.json({ success: false, message: errors.join(' ') }, { status: 400 });
  }

  // Optional fields
  const topic = String(formData.get('product') ?? '').trim() || 'Заявка с сайта';
  const company = String(formData.get('company') ?? '').trim() || undefined;
  const email = String(formData.get('email') ?? '').trim() || undefined;
  const messenger = String(formData.get('messenger') ?? '').trim() || undefined;
  const quantity = String(formData.get('qty') ?? '').trim() || undefined;
  const deadline = String(formData.get('deadline') ?? '').trim() || undefined;
  const comment = String(formData.get('comment') ?? '').trim() || undefined;

  // File handling
  const fileEntry = formData.get('file');
  let attachment: { filename: string; content: Buffer; contentType: string } | undefined;

  if (fileEntry && fileEntry instanceof File && fileEntry.size > 0) {
    if (fileEntry.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: `Файл слишком большой. Максимальный размер — 25 МБ. Ваш файл: ${(fileEntry.size / 1024 / 1024).toFixed(1)} МБ.` },
        { status: 400 }
      );
    }

    const mimeOk = ALLOWED_MIME_TYPES.has(fileEntry.type);
    const extOk = ALLOWED_EXTENSIONS.test(fileEntry.name);
    if (!mimeOk && !extOk) {
      return NextResponse.json(
        { success: false, message: 'Тип файла не разрешён. Допустимые форматы: PDF, PNG, JPG, WEBP, SVG, TXT, DOC, DOCX, XLS, XLSX, ZIP.' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await fileEntry.arrayBuffer());
    attachment = {
      filename: fileEntry.name,
      content: buffer,
      contentType: fileEntry.type || 'application/octet-stream',
    };
  }

  try {
    const result = await sendLeadEmail({
      fullName,
      company,
      phone,
      email,
      messenger,
      topic,
      quantity,
      deadline,
      comment,
      attachment,
    });

    const isDev = process.env.NODE_ENV !== 'production';

    return NextResponse.json({
      success: true,
      message: 'Заявка принята! Мы свяжемся с вами в течение рабочего дня.',
      ...(isDev && result.previewUrl ? { previewUrl: result.previewUrl } : {}),
    });
  } catch (err) {
    console.error('[api/request] sendLeadEmail error:', err);
    return NextResponse.json(
      { success: false, message: 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте снова или свяжитесь с нами напрямую.' },
      { status: 500 }
    );
  }
}

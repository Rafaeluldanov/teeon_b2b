import { NextRequest, NextResponse } from 'next/server';
import { sendLeadEmail } from '@/lib/mail';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

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
        { success: false, message: `Файл слишком большой. Максимальный размер — 10 МБ. Ваш файл: ${(fileEntry.size / 1024 / 1024).toFixed(1)} МБ.` },
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

import { NextResponse } from 'next/server';

// Публичного личного кабинета на сайте нет. /login отдаём как 410 Gone, чтобы
// убрать «битый» URL из индекса и гарантированно не возвращать 502/404.
// Вход в админку находится по адресу /admin/login и закрыт от индексации в robots.
export const dynamic = 'force-dynamic';

const GONE_BODY = 'Страница удалена. Личный кабинет на сайте TEEON не используется.';

export function GET(): NextResponse {
  return new NextResponse(GONE_BODY, {
    status: 410,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex',
    },
  });
}

export const HEAD = GET;

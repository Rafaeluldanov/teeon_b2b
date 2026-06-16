import { NextResponse } from 'next/server';

// Поиск на сайте не используется. Старый URL /search отдаём как 410 Gone,
// чтобы поисковые системы удалили его из индекса (а не держали как 404/«мягкую»
// ошибку) и не воспринимали как действующую SEO-страницу.
export const dynamic = 'force-dynamic';

const GONE_BODY =
  'Страница удалена. Поиск на сайте TEEON не используется — воспользуйтесь каталогом: https://teeon.ru/catalog/';

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

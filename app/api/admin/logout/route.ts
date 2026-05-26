import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, buildRedirectUrl } from '@/lib/adminAuth';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.redirect(buildRedirectUrl(request, '/admin/login/'));

  // Удаляем cookie для path '/' (текущий)
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  // Удаляем cookie для старого path '/admin' (если остались с предыдущей версии)
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/admin',
    maxAge: 0,
  });

  return response;
}

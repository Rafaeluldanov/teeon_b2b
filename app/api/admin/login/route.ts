import { NextRequest, NextResponse } from 'next/server';
import { createAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData();
  const username = (formData.get('username') as string | null) ?? '';
  const password = (formData.get('password') as string | null) ?? '';
  const rawNext = (formData.get('next') as string | null) ?? '';

  const envUsername = process.env.ADMIN_USERNAME;
  const envPassword = process.env.ADMIN_PASSWORD;
  const envSecret = process.env.ADMIN_SESSION_SECRET;

  // Config check
  if (!envUsername || !envPassword || !envSecret) {
    return NextResponse.redirect(new URL('/admin/login/?error=config', request.url));
  }

  // Credentials check
  if (username !== envUsername || password !== envPassword) {
    return NextResponse.redirect(new URL('/admin/login/?error=credentials', request.url));
  }

  // Validate next (open redirect protection)
  let nextPath = '/admin/catalog-editor/';
  if (rawNext && rawNext.startsWith('/admin/') && !rawNext.startsWith('//')) {
    nextPath = rawNext;
  }

  const token = await createAdminToken(username, envSecret);

  const response = NextResponse.redirect(new URL(nextPath, request.url));
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  return response;
}

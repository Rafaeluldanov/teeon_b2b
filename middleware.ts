import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_SESSION_COOKIE, verifyAdminToken } from '@/lib/adminAuth';

export const config = {
  matcher: ['/admin/:path*'],
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // Login page is always accessible
  if (pathname.startsWith('/admin/login')) {
    const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const secret = process.env.ADMIN_SESSION_SECRET;
    const valid = await verifyAdminToken(token, secret);
    // Already logged in → redirect to editor
    if (valid) {
      const dest = new URL('/admin/catalog-editor/', request.url);
      return NextResponse.redirect(dest);
    }
    return NextResponse.next();
  }

  // All other /admin/* routes require auth
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;
  const valid = await verifyAdminToken(token, secret);

  if (!valid) {
    const loginUrl = new URL('/admin/login/', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

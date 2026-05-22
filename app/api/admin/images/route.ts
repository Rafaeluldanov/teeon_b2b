import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, ADMIN_SESSION_COOKIE } from '@/lib/adminAuth';
import { listFiles, deleteFile } from '@/lib/storage';

async function auth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminToken(token, process.env.ADMIN_SESSION_SECRET);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!await auth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const folder = request.nextUrl.searchParams.get('folder') ?? '';
  const files = await listFiles(folder ? `${folder}/` : undefined);
  return NextResponse.json({ files: files.reverse() });
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  if (!await auth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const key = request.nextUrl.searchParams.get('key');
  if (!key) return NextResponse.json({ error: 'key обязателен' }, { status: 400 });

  await deleteFile(key);
  return NextResponse.json({ ok: true });
}

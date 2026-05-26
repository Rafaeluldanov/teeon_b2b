import { NextResponse } from 'next/server';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, verifyAdminToken } from '@/lib/adminAuth';

const DUMP_DIR = '/app/.tmp';
const DUMP_FILE = path.join(DUMP_DIR, 'admin-dump-portfolio.json');

async function isAuthed(): Promise<boolean> {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;
  return verifyAdminToken(token, secret);
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 });
  }
  await fs.mkdir(DUMP_DIR, { recursive: true });
  const payload = JSON.stringify(body, null, 2);
  await fs.writeFile(DUMP_FILE, payload, 'utf8');
  const arr = Array.isArray(body) ? body : [];
  return NextResponse.json({ ok: true, count: arr.length, bytes: payload.length });
}

export async function GET(): Promise<NextResponse> {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  try {
    const raw = await fs.readFile(DUMP_FILE, 'utf8');
    return NextResponse.json({ ok: true, data: JSON.parse(raw) });
  } catch {
    return NextResponse.json({ ok: true, data: null });
  }
}

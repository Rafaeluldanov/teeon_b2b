import { NextResponse } from 'next/server';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, verifyAdminToken } from '@/lib/adminAuth';

const DUMP_DIR = '/app/.tmp';
const DUMP_FILE = path.join(DUMP_DIR, 'admin-dump-all.json');

const ALLOWED_KEYS = new Set([
  'teeon_admin_catalog_models',
  'teeon_admin_portfolio_cases',
  'teeon_admin_home_banner',
  'teeon_admin_branding_methods',
  'teeon_admin_branding_samples',
  'teeon_admin_page_content',
  'teeon_admin_contacts',
  'teeon_admin_product_options',
]);

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
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: 'expected-object' }, { status: 400 });
  }
  const filtered: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(body as Record<string, unknown>)) {
    if (ALLOWED_KEYS.has(k)) filtered[k] = v;
  }
  await fs.mkdir(DUMP_DIR, { recursive: true });
  const payload = JSON.stringify({ savedAt: new Date().toISOString(), data: filtered }, null, 2);
  await fs.writeFile(DUMP_FILE, payload, 'utf8');
  return NextResponse.json({ ok: true, keys: Object.keys(filtered), bytes: payload.length });
}

export async function GET(): Promise<NextResponse> {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  try {
    const raw = await fs.readFile(DUMP_FILE, 'utf8');
    const parsed = JSON.parse(raw) as { savedAt?: string; data?: Record<string, unknown> };
    return NextResponse.json({ ok: true, savedAt: parsed.savedAt ?? null, data: parsed.data ?? {} });
  } catch {
    return NextResponse.json({ ok: true, savedAt: null, data: {} });
  }
}

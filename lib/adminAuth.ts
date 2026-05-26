// Edge-compatible admin session auth using Web Crypto HMAC-SHA256
// No Node.js crypto — works in middleware (Edge runtime) and route handlers

export const ADMIN_SESSION_COOKIE = 'teeon_admin_session';
const SESSION_DURATION_SECONDS = 8 * 60 * 60; // 8 hours

function encodeBase64Url(data: string | Uint8Array): string {
  let bytes: Uint8Array;
  if (typeof data === 'string') {
    bytes = new TextEncoder().encode(data);
  } else {
    bytes = data;
  }
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodeBase64UrlToBytes(value: string): Uint8Array {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '=='.slice(0, (4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function decodeBase64UrlToString(value: string): string {
  return new TextDecoder().decode(decodeBase64UrlToBytes(value));
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const keyBytes = new TextEncoder().encode(secret);
  return crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

async function hmacSign(data: string, secret: string): Promise<Uint8Array> {
  const key = await getHmacKey(secret);
  const dataBytes = new TextEncoder().encode(data);
  const sig = await crypto.subtle.sign('HMAC', key, dataBytes as unknown as BufferSource);
  return new Uint8Array(sig);
}

async function hmacVerify(data: string, signature: Uint8Array, secret: string): Promise<boolean> {
  const key = await getHmacKey(secret);
  const dataBytes = new TextEncoder().encode(data);
  return crypto.subtle.verify('HMAC', key, signature as unknown as BufferSource, dataBytes as unknown as BufferSource);
}

export async function createAdminToken(username: string, secret: string): Promise<string> {
  const payload = JSON.stringify({
    username,
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  });
  const encodedPayload = encodeBase64Url(payload);
  const sig = await hmacSign(encodedPayload, secret);
  const encodedSig = encodeBase64Url(sig);
  return `${encodedPayload}.${encodedSig}`;
}

export async function verifyAdminToken(
  token: string | undefined,
  secret: string | undefined
): Promise<boolean> {
  if (!token || !secret) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [encodedPayload, encodedSig] = parts;
  try {
    const sigBytes = decodeBase64UrlToBytes(encodedSig);
    const valid = await hmacVerify(encodedPayload, sigBytes, secret);
    if (!valid) return false;
    const payload = JSON.parse(decodeBase64UrlToString(encodedPayload)) as { username: string; exp: number };
    if (typeof payload.exp !== 'number') return false;
    return Math.floor(Date.now() / 1000) < payload.exp;
  } catch {
    return false;
  }
}

export function buildRedirectUrl(request: Request, pathWithQuery: string): URL {
  const reqUrl = new URL(request.url);
  const host = request.headers.get('host') ?? reqUrl.host;
  const proto = request.headers.get('x-forwarded-proto') ?? reqUrl.protocol.replace(':', '');
  return new URL(pathWithQuery, `${proto}://${host}`);
}

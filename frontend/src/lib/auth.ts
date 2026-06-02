const encoder = new TextEncoder();

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function generateSessionToken(): Promise<string> {
  const secret = process.env.SESSION_SECRET!;
  const password = process.env.ADMIN_PASSWORD!;
  return hmac(secret, password);
}

export async function verifySessionToken(token: string): Promise<boolean> {
  const expected = await generateSessionToken();
  return token === expected;
}

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
type Params = { params: Promise<{ lang: string }> };

function filePath(lang: string) {
  return path.join(process.cwd(), 'data', 'translations', `${lang}.json`);
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'fr') {
    return NextResponse.json({ error: 'Invalid lang' }, { status: 400 });
  }
  const content = fs.readFileSync(filePath(lang), 'utf-8');
  return NextResponse.json(JSON.parse(content));
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { lang } = await params;
  if (lang !== 'en' && lang !== 'fr') {
    return NextResponse.json({ error: 'Invalid lang' }, { status: 400 });
  }
  const body = await req.json();
  fs.writeFileSync(filePath(lang), JSON.stringify(body, null, 2), 'utf-8');
  return NextResponse.json({ success: true });
}

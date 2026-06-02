import { NextRequest, NextResponse } from 'next/server';
import { db, dbToPost } from '@/lib/db';
import type { DbBlogPost } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const rows = db.prepare('SELECT * FROM blog_posts ORDER BY date DESC').all() as DbBlogPost[];
  return NextResponse.json(rows.map(dbToPost));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { slug, date, tags, coverImage, coverAlt, translations, published = true } = body;

  if (!slug || !date || !translations) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const existing = db.prepare('SELECT id FROM blog_posts WHERE slug = ?').get(slug);
  if (existing) {
    return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
  }

  const result = db.prepare(`
    INSERT INTO blog_posts (slug, date, tags, cover_image, cover_alt, translations, published)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    slug,
    date,
    JSON.stringify(tags || []),
    coverImage || '',
    coverAlt || '',
    JSON.stringify(translations),
    published ? 1 : 0,
  );

  const row = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(result.lastInsertRowid) as DbBlogPost;
  return NextResponse.json(dbToPost(row), { status: 201 });
}

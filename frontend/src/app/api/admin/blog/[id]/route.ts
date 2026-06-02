import { NextRequest, NextResponse } from 'next/server';
import { db, dbToPost } from '@/lib/db';
import type { DbBlogPost } from '@/lib/db';

export const dynamic = 'force-dynamic';
type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const row = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(id) as DbBlogPost | undefined;
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(dbToPost(row));
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await req.json();
  const { slug, date, tags, coverImage, coverAlt, translations, published } = body;

  const existing = db.prepare('SELECT id FROM blog_posts WHERE slug = ? AND id != ?').get(slug, id);
  if (existing) {
    return NextResponse.json({ error: 'Slug already used by another post' }, { status: 409 });
  }

  db.prepare(`
    UPDATE blog_posts SET
      slug = ?, date = ?, tags = ?, cover_image = ?, cover_alt = ?,
      translations = ?, published = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(
    slug,
    date,
    JSON.stringify(tags || []),
    coverImage || '',
    coverAlt || '',
    JSON.stringify(translations),
    published ? 1 : 0,
    id,
  );

  const row = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(id) as DbBlogPost;
  return NextResponse.json(dbToPost(row));
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  db.prepare('DELETE FROM blog_posts WHERE id = ?').run(id);
  return NextResponse.json({ success: true });
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';
import { INITIAL_POSTS } from '@/lib/blog-seed';

export async function POST() {
  const count = (db.prepare('SELECT COUNT(*) as c FROM blog_posts').get() as { c: number }).c;

  if (count > 0) {
    return NextResponse.json({ message: 'Already seeded', count });
  }

  const insert = db.prepare(`
    INSERT INTO blog_posts (slug, date, tags, cover_image, cover_alt, translations, published)
    VALUES (?, ?, ?, ?, ?, ?, 1)
  `);

  const insertMany = db.transaction((posts: typeof INITIAL_POSTS) => {
    for (const post of posts) {
      insert.run(
        post.slug,
        post.date,
        JSON.stringify(post.tags),
        post.coverImage,
        post.coverAlt,
        JSON.stringify(post.translations),
      );
    }
  });

  insertMany(INITIAL_POSTS);

  return NextResponse.json({ message: 'Seeded', count: INITIAL_POSTS.length });
}

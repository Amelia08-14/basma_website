export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { db } = await import('./lib/db');
    const count = (db.prepare('SELECT COUNT(*) as c FROM blog_posts').get() as { c: number }).c;

    if (count === 0) {
      const { INITIAL_POSTS } = await import('./lib/blog-seed');
      const insert = db.prepare(`
        INSERT INTO blog_posts (slug, date, tags, cover_image, cover_alt, translations, published)
        VALUES (?, ?, ?, ?, ?, ?, 1)
      `);
      const seed = db.transaction((posts: typeof INITIAL_POSTS) => {
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
      seed(INITIAL_POSTS);
      console.log('[basma] DB seeded with', INITIAL_POSTS.length, 'posts');
    }
  }
}

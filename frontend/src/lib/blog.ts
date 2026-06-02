import 'server-only';
import { db, dbToPost } from './db';
import type { DbBlogPost } from './db';

export type BlogLang = 'en' | 'fr';

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] };

export type BlogPostTranslation = {
  title: string;
  description: string;
  blocks: BlogBlock[];
};

export type BlogPost = {
  slug: string;
  date: string;
  tags: string[];
  coverImage: string;
  coverAlt: string;
  translations: Record<BlogLang, BlogPostTranslation>;
};

export function getBlogPosts(lang: BlogLang) {
  const rows = db.prepare('SELECT * FROM blog_posts WHERE published = 1 ORDER BY date DESC').all() as DbBlogPost[];
  return rows.map((row) => {
    const post = dbToPost(row);
    const t = post.translations[lang];
    return {
      slug: post.slug,
      date: post.date,
      tags: post.tags,
      coverImage: post.coverImage,
      coverAlt: post.coverAlt,
      title: t.title,
      description: t.description,
    };
  });
}

export function getBlogPost(lang: BlogLang, slug: string) {
  const row = db.prepare('SELECT * FROM blog_posts WHERE slug = ? AND published = 1').get(slug) as DbBlogPost | undefined;
  if (!row) return null;
  const post = dbToPost(row);
  return {
    slug: post.slug,
    date: post.date,
    tags: post.tags,
    coverImage: post.coverImage,
    coverAlt: post.coverAlt,
    ...post.translations[lang],
  };
}

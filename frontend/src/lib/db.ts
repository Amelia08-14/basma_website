import Database from 'better-sqlite3';
import path from 'path';
import type { BlogPost } from './blog';

const DB_PATH = path.join(process.cwd(), 'data', 'blog.db');

declare global {
  // eslint-disable-next-line no-var
  var _db: Database.Database | undefined;
}

function createDb() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      date TEXT NOT NULL,
      tags TEXT NOT NULL,
      cover_image TEXT NOT NULL,
      cover_alt TEXT NOT NULL,
      translations TEXT NOT NULL,
      published INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS custom_pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      nav_label_fr TEXT NOT NULL DEFAULT '',
      nav_label_en TEXT NOT NULL DEFAULT '',
      show_in_nav INTEGER NOT NULL DEFAULT 0,
      nav_order INTEGER NOT NULL DEFAULT 0,
      published INTEGER NOT NULL DEFAULT 0,
      content TEXT NOT NULL DEFAULT '{"blocks":[]}',
      meta_title_fr TEXT NOT NULL DEFAULT '',
      meta_title_en TEXT NOT NULL DEFAULT '',
      meta_desc_fr TEXT NOT NULL DEFAULT '',
      meta_desc_en TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  return db;
}

export const db: Database.Database = global._db ?? createDb();

if (process.env.NODE_ENV !== 'production') global._db = db;

// Migration : crée custom_pages si la table n'existe pas encore
db.exec(`
  CREATE TABLE IF NOT EXISTS custom_pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    nav_label_fr TEXT NOT NULL DEFAULT '',
    nav_label_en TEXT NOT NULL DEFAULT '',
    show_in_nav INTEGER NOT NULL DEFAULT 0,
    nav_order INTEGER NOT NULL DEFAULT 0,
    published INTEGER NOT NULL DEFAULT 0,
    content TEXT NOT NULL DEFAULT '{"blocks":[]}',
    meta_title_fr TEXT NOT NULL DEFAULT '',
    meta_title_en TEXT NOT NULL DEFAULT '',
    meta_desc_fr TEXT NOT NULL DEFAULT '',
    meta_desc_en TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export type DbBlogPost = {
  id: number;
  slug: string;
  date: string;
  tags: string;
  cover_image: string;
  cover_alt: string;
  translations: string;
  published: number;
  created_at: string;
  updated_at: string;
};

export function dbToPost(row: DbBlogPost): BlogPost & { id: number; published: boolean } {
  return {
    id: row.id,
    slug: row.slug,
    date: row.date,
    tags: JSON.parse(row.tags),
    coverImage: row.cover_image,
    coverAlt: row.cover_alt,
    translations: JSON.parse(row.translations),
    published: row.published === 1,
  };
}

export function seedIfEmpty() {
  const count = (db.prepare('SELECT COUNT(*) as c FROM blog_posts').get() as { c: number }).c;
  if (count > 0) return;

  // Seed is done lazily by the blog API — see api/admin/blog/seed
}

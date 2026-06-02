import { db } from './db';

export type PageBlockType = 'hero' | 'text' | 'features' | 'cta_banner' | 'image_text';

export type HeroBlock = {
  id: string; type: 'hero';
  fr: { title: string; subtitle: string; btn_label?: string; btn_href?: string };
  en: { title: string; subtitle: string; btn_label?: string; btn_href?: string };
};
export type TextBlock = {
  id: string; type: 'text';
  fr: { heading?: string; body: string };
  en: { heading?: string; body: string };
};
export type FeaturesBlock = {
  id: string; type: 'features';
  fr: { heading?: string; items: string[] };
  en: { heading?: string; items: string[] };
};
export type CtaBannerBlock = {
  id: string; type: 'cta_banner';
  fr: { title: string; text?: string; btn_label: string; btn_href: string };
  en: { title: string; text?: string; btn_label: string; btn_href: string };
};
export type ImageTextBlock = {
  id: string; type: 'image_text';
  image: string;
  image_alt: string;
  side: 'left' | 'right';
  fr: { heading?: string; body: string };
  en: { heading?: string; body: string };
};

export type PageBlock = HeroBlock | TextBlock | FeaturesBlock | CtaBannerBlock | ImageTextBlock;
export type PageContent = { blocks: PageBlock[] };

export type CustomPage = {
  id: number;
  slug: string;
  nav_label_fr: string;
  nav_label_en: string;
  show_in_nav: boolean;
  nav_order: number;
  published: boolean;
  content: PageContent;
  meta_title_fr: string;
  meta_title_en: string;
  meta_desc_fr: string;
  meta_desc_en: string;
  created_at: string;
  updated_at: string;
};

type DbRow = {
  id: number; slug: string; nav_label_fr: string; nav_label_en: string;
  show_in_nav: number; nav_order: number; published: number; content: string;
  meta_title_fr: string; meta_title_en: string; meta_desc_fr: string; meta_desc_en: string;
  created_at: string; updated_at: string;
};

function rowToPage(r: DbRow): CustomPage {
  return {
    ...r,
    show_in_nav: r.show_in_nav === 1,
    published: r.published === 1,
    content: JSON.parse(r.content) as PageContent,
  };
}

export function getAllPages(): CustomPage[] {
  return (db.prepare('SELECT * FROM custom_pages ORDER BY nav_order ASC, created_at DESC').all() as DbRow[]).map(rowToPage);
}

export function getPublishedPage(slug: string): CustomPage | null {
  const row = db.prepare('SELECT * FROM custom_pages WHERE slug = ? AND published = 1').get(slug) as DbRow | undefined;
  return row ? rowToPage(row) : null;
}

export function getPageById(id: number): CustomPage | null {
  const row = db.prepare('SELECT * FROM custom_pages WHERE id = ?').get(id) as DbRow | undefined;
  return row ? rowToPage(row) : null;
}

export function getNavPages(): { slug: string; nav_label_fr: string; nav_label_en: string; nav_order: number }[] {
  return db.prepare(
    'SELECT slug, nav_label_fr, nav_label_en, nav_order FROM custom_pages WHERE show_in_nav = 1 AND published = 1 ORDER BY nav_order ASC'
  ).all() as { slug: string; nav_label_fr: string; nav_label_en: string; nav_order: number }[];
}

export function createPage(data: Omit<CustomPage, 'id' | 'created_at' | 'updated_at'>): number {
  const res = db.prepare(`
    INSERT INTO custom_pages (slug, nav_label_fr, nav_label_en, show_in_nav, nav_order, published, content, meta_title_fr, meta_title_en, meta_desc_fr, meta_desc_en)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    data.slug, data.nav_label_fr, data.nav_label_en,
    data.show_in_nav ? 1 : 0, data.nav_order,
    data.published ? 1 : 0,
    JSON.stringify(data.content),
    data.meta_title_fr, data.meta_title_en, data.meta_desc_fr, data.meta_desc_en
  );
  return res.lastInsertRowid as number;
}

export function updatePage(id: number, data: Omit<CustomPage, 'id' | 'created_at' | 'updated_at'>): void {
  db.prepare(`
    UPDATE custom_pages SET
      slug = ?, nav_label_fr = ?, nav_label_en = ?, show_in_nav = ?, nav_order = ?,
      published = ?, content = ?, meta_title_fr = ?, meta_title_en = ?,
      meta_desc_fr = ?, meta_desc_en = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(
    data.slug, data.nav_label_fr, data.nav_label_en,
    data.show_in_nav ? 1 : 0, data.nav_order,
    data.published ? 1 : 0,
    JSON.stringify(data.content),
    data.meta_title_fr, data.meta_title_en, data.meta_desc_fr, data.meta_desc_en,
    id
  );
}

export function deletePage(id: number): void {
  db.prepare('DELETE FROM custom_pages WHERE id = ?').run(id);
}

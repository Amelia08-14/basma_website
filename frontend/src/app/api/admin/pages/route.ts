import { NextRequest, NextResponse } from 'next/server';
import { getAllPages, createPage } from '@/lib/pages';

export const dynamic = 'force-dynamic';

export async function GET() {
  const pages = getAllPages();
  return NextResponse.json(pages);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.slug) return NextResponse.json({ error: 'slug requis' }, { status: 400 });
  try {
    const id = createPage({
      slug: body.slug,
      nav_label_fr: body.nav_label_fr ?? '',
      nav_label_en: body.nav_label_en ?? '',
      show_in_nav: Boolean(body.show_in_nav),
      nav_order: body.nav_order ?? 0,
      published: Boolean(body.published),
      content: body.content ?? { blocks: [] },
      meta_title_fr: body.meta_title_fr ?? '',
      meta_title_en: body.meta_title_en ?? '',
      meta_desc_fr: body.meta_desc_fr ?? '',
      meta_desc_en: body.meta_desc_en ?? '',
    });
    return NextResponse.json({ id }, { status: 201 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes('UNIQUE')) return NextResponse.json({ error: 'Ce slug existe déjà' }, { status: 409 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

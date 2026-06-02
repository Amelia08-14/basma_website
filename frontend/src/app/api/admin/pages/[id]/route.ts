import { NextRequest, NextResponse } from 'next/server';
import { getPageById, updatePage, deletePage } from '@/lib/pages';

export const dynamic = 'force-dynamic';
type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const page = getPageById(Number(id));
  if (!page) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });
  return NextResponse.json(page);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await req.json();
  if (!body.slug) return NextResponse.json({ error: 'slug requis' }, { status: 400 });
  try {
    updatePage(Number(id), {
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
    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes('UNIQUE')) return NextResponse.json({ error: 'Ce slug existe déjà' }, { status: 409 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  deletePage(Number(id));
  return NextResponse.json({ success: true });
}

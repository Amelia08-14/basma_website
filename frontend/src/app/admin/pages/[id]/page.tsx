export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import PageEditor from '@/components/admin/PageEditor';
import { getPageById } from '@/lib/pages';
import DeletePageButton from '@/components/admin/DeletePageButton';

export default async function EditPageAdmin({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = getPageById(Number(id));
  if (!page) return notFound();

  const { id: pageId, created_at, updated_at, ...rest } = page;

  return (
    <AdminShell>
      <div className="relative">
        <div className="absolute top-8 right-8 z-10">
          <DeletePageButton id={pageId} />
        </div>
        <PageEditor initial={rest} pageId={pageId} />
      </div>
    </AdminShell>
  );
}

export const dynamic = 'force-dynamic';
import AdminShell from '@/components/admin/AdminShell';
import BlogEditor from '@/components/admin/BlogEditor';
import { db, dbToPost } from '@/lib/db';
import type { DbBlogPost } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(id) as DbBlogPost | undefined;
  if (!row) notFound();

  const post = dbToPost(row);

  return (
    <AdminShell>
      <BlogEditor initial={post} />
    </AdminShell>
  );
}

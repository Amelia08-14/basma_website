import AdminShell from '@/components/admin/AdminShell';
import BlogEditor from '@/components/admin/BlogEditor';

export default function NewBlogPost() {
  return (
    <AdminShell>
      <BlogEditor />
    </AdminShell>
  );
}

export const dynamic = 'force-dynamic';
import AdminShell from '@/components/admin/AdminShell';
import { db, dbToPost } from '@/lib/db';
import type { DbBlogPost } from '@/lib/db';
import Link from 'next/link';
import BlogDeleteButton from '@/components/admin/BlogDeleteButton';

export default function BlogList() {
  const rows = db.prepare('SELECT * FROM blog_posts ORDER BY date DESC').all() as DbBlogPost[];
  const posts = rows.map(dbToPost);

  return (
    <AdminShell>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Articles</h1>
          <Link
            href="/admin/blog/new"
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            + Nouvel article
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-gray-400 text-center py-20">
            <p>Aucun article.</p>
            <Link href="/admin/blog/new" className="text-emerald-400 mt-2 inline-block">
              Créer le premier article
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-4 bg-gray-900 border border-white/10 rounded-xl px-5 py-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {post.translations.fr?.title || post.translations.en?.title || post.slug}
                  </p>
                  <p className="text-gray-400 text-sm mt-0.5">
                    {post.date} &nbsp;·&nbsp; {post.tags.join(', ')}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${post.published ? 'bg-emerald-800/40 text-emerald-300' : 'bg-gray-700 text-gray-400'}`}
                  >
                    {post.published ? 'Publié' : 'Brouillon'}
                  </span>
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Modifier
                  </Link>
                  <BlogDeleteButton id={post.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}

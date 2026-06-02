export const dynamic = 'force-dynamic';
import AdminShell from '@/components/admin/AdminShell';
import { db } from '@/lib/db';
import Link from 'next/link';

export default function AdminHome() {
  const totalPosts = (db.prepare('SELECT COUNT(*) as c FROM blog_posts').get() as { c: number }).c;
  const publishedPosts = (db.prepare('SELECT COUNT(*) as c FROM blog_posts WHERE published = 1').get() as { c: number }).c;
  const recent = db.prepare('SELECT slug, date, translations FROM blog_posts ORDER BY date DESC LIMIT 5').all() as { slug: string; date: string; translations: string }[];

  return (
    <AdminShell>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Tableau de bord</h1>

        <div className="grid grid-cols-2 gap-4 mb-8 max-w-lg">
          <div className="bg-gray-900 border border-white/10 rounded-xl p-5">
            <p className="text-3xl font-bold text-emerald-400">{publishedPosts}</p>
            <p className="text-gray-400 text-sm mt-1">Articles publiés</p>
          </div>
          <div className="bg-gray-900 border border-white/10 rounded-xl p-5">
            <p className="text-3xl font-bold text-gray-300">{totalPosts}</p>
            <p className="text-gray-400 text-sm mt-1">Total articles</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-white/10 rounded-xl p-6 max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Articles récents</h2>
            <Link href="/admin/blog/new" className="text-sm text-emerald-400 hover:text-emerald-300">
              + Nouvel article
            </Link>
          </div>
          <ul className="space-y-3">
            {recent.map((row) => {
              const t = JSON.parse(row.translations) as { fr?: { title: string }; en?: { title: string } };
              const title = t.fr?.title || t.en?.title || row.slug;
              return (
                <li key={row.slug} className="flex items-center justify-between text-sm">
                  <span className="text-gray-200 truncate mr-4">{title}</span>
                  <span className="text-gray-500 shrink-0">{row.date}</span>
                </li>
              );
            })}
            {recent.length === 0 && (
              <li className="text-gray-500 text-sm">Aucun article. <Link href="/admin/blog/new" className="text-emerald-400">Créer le premier.</Link></li>
            )}
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}

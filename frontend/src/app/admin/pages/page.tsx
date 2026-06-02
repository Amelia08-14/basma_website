export const dynamic = 'force-dynamic';
import AdminShell from '@/components/admin/AdminShell';
import { getAllPages } from '@/lib/pages';
import Link from 'next/link';

export default function AdminPagesIndex() {
  const pages = getAllPages();

  return (
    <AdminShell>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Pages</h1>
            <p className="text-gray-400 text-sm mt-1">Créez et gérez les pages de votre site</p>
          </div>
          <Link href="/admin/pages/new" className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors">
            + Nouvelle page
          </Link>
        </div>

        {pages.length === 0 ? (
          <div className="bg-gray-900 border border-white/10 rounded-xl p-12 text-center">
            <p className="text-gray-400 mb-4">Aucune page créée pour l'instant.</p>
            <Link href="/admin/pages/new" className="text-emerald-400 hover:text-emerald-300 text-sm">
              Créer la première page →
            </Link>
          </div>
        ) : (
          <div className="bg-gray-900 border border-white/10 rounded-xl divide-y divide-white/5">
            {pages.map(page => (
              <div key={page.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium font-mono">{page.slug}</span>
                      {page.published
                        ? <span className="text-xs bg-emerald-900/40 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">Publié</span>
                        : <span className="text-xs bg-gray-800 text-gray-500 border border-white/5 px-2 py-0.5 rounded-full">Brouillon</span>}
                      {page.show_in_nav && (
                        <span className="text-xs bg-blue-900/40 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">Nav</span>
                      )}
                    </div>
                    {(page.meta_title_fr || page.nav_label_fr) && (
                      <p className="text-gray-500 text-xs mt-0.5 truncate">{page.meta_title_fr || page.nav_label_fr}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-gray-600 text-xs">{page.content.blocks.length} bloc{page.content.blocks.length !== 1 ? 's' : ''}</span>
                  <Link
                    href={`/en/${page.slug}`}
                    target="_blank"
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    Voir ↗
                  </Link>
                  <Link
                    href={`/admin/pages/${page.id}`}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Modifier
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}

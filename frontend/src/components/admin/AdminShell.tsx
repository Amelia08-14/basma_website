'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clsx } from 'clsx';

const nav = [
  { href: '/admin', label: 'Tableau de bord', exact: true },
  { href: '/admin/blog', label: 'Articles' },
  { href: '/admin/translations', label: 'Traductions' },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 bg-gray-900 border-r border-white/10 flex flex-col">
        <div className="px-6 py-5 border-b border-white/10">
          <span className="text-emerald-400 font-bold text-lg">Basma</span>
          <span className="text-gray-400 text-sm block">Admin</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(({ href, label, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'block px-3 py-2 rounded-lg text-sm transition-colors',
                  active ? 'bg-emerald-700/30 text-emerald-300' : 'text-gray-300 hover:bg-white/5',
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

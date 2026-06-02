import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Dashboard – Basma Learning',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-950 text-gray-100 min-h-screen">{children}</body>
    </html>
  );
}

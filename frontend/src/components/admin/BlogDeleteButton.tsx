'use client';

import { useRouter } from 'next/navigation';

export default function BlogDeleteButton({ id }: { id: number }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Supprimer cet article ? Cette action est irréversible.')) return;

    const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-sm text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 px-3 py-1.5 rounded-lg transition-colors"
    >
      Supprimer
    </button>
  );
}

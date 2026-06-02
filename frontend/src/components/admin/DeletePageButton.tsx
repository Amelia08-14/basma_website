'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeletePageButton({ id }: { id: number }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' });
    router.push('/admin/pages');
    router.refresh();
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">Confirmer ?</span>
        <button onClick={handleDelete} disabled={deleting}
          className="text-xs bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg">
          {deleting ? 'Suppression…' : 'Oui, supprimer'}
        </button>
        <button onClick={() => setConfirming(false)} className="text-xs text-gray-500 hover:text-gray-300 px-2 py-1.5">
          Annuler
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => setConfirming(true)}
      className="text-xs text-red-500 hover:text-red-400 bg-gray-900 border border-red-500/20 px-3 py-1.5 rounded-lg transition-colors">
      Supprimer la page
    </button>
  );
}

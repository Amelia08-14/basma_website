'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { BlogBlock, BlogPostTranslation } from '@/lib/blog';

type Lang = 'fr' | 'en';

type PostData = {
  id?: number;
  slug: string;
  date: string;
  tags: string[];
  coverImage: string;
  coverAlt: string;
  published: boolean;
  translations: Record<Lang, BlogPostTranslation>;
};

const emptyTranslation = (): BlogPostTranslation => ({
  title: '',
  description: '',
  blocks: [],
});

const defaultPost = (): PostData => ({
  slug: '',
  date: new Date().toISOString().split('T')[0],
  tags: [],
  coverImage: '',
  coverAlt: '',
  published: true,
  translations: { fr: emptyTranslation(), en: emptyTranslation() },
});

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function BlockEditor({
  block,
  index,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  block: BlogBlock;
  index: number;
  onChange: (b: BlogBlock) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <div className="group flex gap-2 items-start">
      <div className="flex flex-col gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onMoveUp} className="text-gray-500 hover:text-gray-300 text-xs leading-none">▲</button>
        <button onClick={onMoveDown} className="text-gray-500 hover:text-gray-300 text-xs leading-none">▼</button>
      </div>
      <div className="flex-1 bg-gray-800 rounded-lg p-3 border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {block.type === 'p' ? 'Paragraphe' : block.type === 'h2' ? 'Titre H2' : 'Liste'}
          </span>
          <button
            onClick={onRemove}
            className="text-xs text-red-500 hover:text-red-400"
          >
            Supprimer
          </button>
        </div>

        {(block.type === 'p' || block.type === 'h2') && (
          <textarea
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            className="w-full bg-transparent text-gray-200 text-sm resize-none focus:outline-none min-h-[60px]"
            placeholder={block.type === 'h2' ? 'Titre de section…' : 'Contenu du paragraphe…'}
          />
        )}

        {block.type === 'ul' && (
          <div className="space-y-2">
            {block.items.map((item, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-emerald-400 mt-1">•</span>
                <textarea
                  value={item}
                  onChange={(e) => {
                    const items = [...block.items];
                    items[i] = e.target.value;
                    onChange({ ...block, items });
                  }}
                  className="flex-1 bg-transparent text-gray-200 text-sm resize-none focus:outline-none min-h-[40px]"
                  placeholder="Élément de liste…"
                />
                <button
                  onClick={() => {
                    const items = block.items.filter((_, j) => j !== i);
                    onChange({ ...block, items });
                  }}
                  className="text-red-500 hover:text-red-400 text-xs mt-1"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => onChange({ ...block, items: [...block.items, ''] })}
              className="text-xs text-emerald-400 hover:text-emerald-300"
            >
              + Ajouter un élément
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TranslationTab({
  data,
  onChange,
  lang,
  onAutoSlug,
}: {
  data: BlogPostTranslation;
  onChange: (t: BlogPostTranslation) => void;
  lang: Lang;
  onAutoSlug?: (title: string) => void;
}) {
  function addBlock(type: BlogBlock['type']) {
    const block: BlogBlock =
      type === 'ul' ? { type: 'ul', items: [''] } : { type, text: '' };
    onChange({ ...data, blocks: [...data.blocks, block] });
  }

  function updateBlock(i: number, b: BlogBlock) {
    const blocks = [...data.blocks];
    blocks[i] = b;
    onChange({ ...data, blocks });
  }

  function removeBlock(i: number) {
    onChange({ ...data, blocks: data.blocks.filter((_, j) => j !== i) });
  }

  function moveBlock(i: number, dir: -1 | 1) {
    const blocks = [...data.blocks];
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
    onChange({ ...data, blocks });
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-400 mb-1">Titre {lang.toUpperCase()}</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => {
            onChange({ ...data, title: e.target.value });
            if (lang === 'fr' && onAutoSlug) onAutoSlug(e.target.value);
          }}
          className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Titre de l'article…"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Description / Résumé</label>
        <textarea
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 min-h-[80px] resize-none"
          placeholder="Court résumé visible dans la liste des articles…"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm text-gray-400">Contenu de l'article</label>
          <div className="flex gap-2">
            {(['p', 'h2', 'ul'] as const).map((t) => (
              <button
                key={t}
                onClick={() => addBlock(t)}
                className="text-xs bg-gray-800 border border-white/10 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-colors"
              >
                + {t === 'p' ? 'Paragraphe' : t === 'h2' ? 'Titre' : 'Liste'}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {data.blocks.map((block, i) => (
            <BlockEditor
              key={i}
              block={block}
              index={i}
              onChange={(b) => updateBlock(i, b)}
              onRemove={() => removeBlock(i)}
              onMoveUp={() => moveBlock(i, -1)}
              onMoveDown={() => moveBlock(i, 1)}
            />
          ))}
          {data.blocks.length === 0 && (
            <div className="text-center text-gray-500 text-sm py-8 border border-dashed border-white/10 rounded-lg">
              Ajoutez des blocs de contenu ci-dessus
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BlogEditor({ initial }: { initial?: PostData }) {
  const router = useRouter();
  const [post, setPost] = useState<PostData>(initial ?? defaultPost());
  const [activeLang, setActiveLang] = useState<Lang>('fr');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [tagsInput, setTagsInput] = useState((initial?.tags ?? []).join(', '));

  const isEdit = Boolean(initial?.id);

  const handleAutoSlug = useCallback(
    (title: string) => {
      if (!isEdit) setPost((p) => ({ ...p, slug: slugify(title) }));
    },
    [isEdit],
  );

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    if (res.status === 413) {
      setError('Image trop lourde — limite nginx dépassée (max ~8 MB). Compressez l\'image et réessayez.');
      setUploading(false);
      return;
    }
    let data: { url?: string; error?: string } = {};
    try { data = await res.json(); } catch { /* réponse non-JSON */ }
    if (res.ok && data.url) setPost((p) => ({ ...p, coverImage: data.url! }));
    else setError(data.error || `Erreur upload (${res.status})`);
    setUploading(false);
  }

  async function handleSave() {
    setSaving(true);
    setError('');

    const payload = {
      ...post,
      tags: tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const url = isEdit ? `/api/admin/blog/${post.id}` : '/api/admin/blog';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push('/admin/blog');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Erreur lors de la sauvegarde');
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push('/admin/blog')}
          className="text-gray-400 hover:text-gray-200 text-sm"
        >
          ← Retour
        </button>
        <h1 className="text-xl font-bold text-white flex-1">
          {isEdit ? "Modifier l'article" : 'Nouvel article'}
        </h1>
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={post.published}
            onChange={(e) => setPost((p) => ({ ...p, published: e.target.checked }))}
            className="accent-emerald-500 w-4 h-4"
          />
          Publié
        </label>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
        >
          {saving ? 'Sauvegarde…' : 'Sauvegarder'}
        </button>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm mb-6">
          {error}
        </div>
      )}

      {/* Métadonnées */}
      <div className="bg-gray-900 border border-white/10 rounded-xl p-6 mb-6 grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm text-gray-400 mb-1">Slug (URL)</label>
          <input
            type="text"
            value={post.slug}
            onChange={(e) => setPost((p) => ({ ...p, slug: e.target.value }))}
            className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            placeholder="mon-article-url"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Date</label>
          <input
            type="date"
            value={post.date}
            onChange={(e) => setPost((p) => ({ ...p, date: e.target.value }))}
            className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Tags (séparés par virgule)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="L&D, Algeria, Performance"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Texte alt image</label>
          <input
            type="text"
            value={post.coverAlt}
            onChange={(e) => setPost((p) => ({ ...p, coverAlt: e.target.value }))}
            className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Description de l'image…"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm text-gray-400 mb-2">Image de couverture</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-gray-800 border border-white/10 hover:bg-gray-700 text-gray-300 text-sm px-4 py-2 rounded-lg transition-colors">
              {uploading ? 'Upload…' : 'Choisir une image'}
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </label>
            {post.coverImage && (
              <span className="text-emerald-400 text-sm font-mono truncate">{post.coverImage}</span>
            )}
          </div>
        </div>
      </div>

      {/* Contenu par langue */}
      <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="flex border-b border-white/10">
          {(['fr', 'en'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeLang === lang
                  ? 'text-emerald-300 border-b-2 border-emerald-500 bg-emerald-900/10'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {lang === 'fr' ? 'Français' : 'English'}
            </button>
          ))}
        </div>
        <div className="p-6">
          <TranslationTab
            key={activeLang}
            lang={activeLang}
            data={post.translations[activeLang]}
            onChange={(t) =>
              setPost((p) => ({
                ...p,
                translations: { ...p.translations, [activeLang]: t },
              }))
            }
            onAutoSlug={activeLang === 'fr' ? handleAutoSlug : undefined}
          />
        </div>
      </div>
    </div>
  );
}

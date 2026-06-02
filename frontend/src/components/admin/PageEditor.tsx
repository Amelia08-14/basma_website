'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { PageBlock, PageContent, CustomPage, HeroBlock, TextBlock, FeaturesBlock, CtaBannerBlock, ImageTextBlock } from '@/lib/pages';

type Lang = 'fr' | 'en';

type PageData = Omit<CustomPage, 'id' | 'created_at' | 'updated_at'>;

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Block field helpers ─────────────────────────────────────────────────────

function Field({ label, value, onChange, long }: { label: string; value: string; onChange: (v: string) => void; long?: boolean }) {
  const cls = 'w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500';
  return (
    <div className="space-y-1">
      <label className="block text-xs text-gray-500">{label}</label>
      {long
        ? <textarea value={value} onChange={e => onChange(e.target.value)} className={`${cls} min-h-[80px] resize-y`} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} className={cls} />}
    </div>
  );
}

function ItemsList({ items, onChange }: { items: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-start">
          <span className="text-emerald-400 mt-2 text-xs shrink-0">{i + 1}.</span>
          <textarea
            value={item}
            onChange={e => { const n = [...items]; n[i] = e.target.value; onChange(n); }}
            className="flex-1 bg-gray-800 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none min-h-[36px]"
          />
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-400 mt-2 text-xs">×</button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ''])} className="text-xs text-emerald-400 hover:text-emerald-300">+ Ajouter</button>
    </div>
  );
}

// ─── Per-block editors ────────────────────────────────────────────────────────

function HeroBlockEditor({ block, lang, onChange }: { block: HeroBlock; lang: Lang; onChange: (b: HeroBlock) => void }) {
  const d = block[lang];
  const set = (k: keyof typeof d, v: string) => onChange({ ...block, [lang]: { ...d, [k]: v } });
  return (
    <div className="space-y-3">
      <Field label="Titre" value={d.title} onChange={v => set('title', v)} />
      <Field label="Sous-titre" value={d.subtitle} onChange={v => set('subtitle', v)} long />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Texte bouton (optionnel)" value={d.btn_label ?? ''} onChange={v => set('btn_label', v)} />
        <Field label="Lien bouton (ex: /#contact)" value={d.btn_href ?? ''} onChange={v => set('btn_href', v)} />
      </div>
    </div>
  );
}

function TextBlockEditor({ block, lang, onChange }: { block: TextBlock; lang: Lang; onChange: (b: TextBlock) => void }) {
  const d = block[lang];
  const set = (k: keyof typeof d, v: string) => onChange({ ...block, [lang]: { ...d, [k]: v } });
  return (
    <div className="space-y-3">
      <Field label="Titre (optionnel)" value={d.heading ?? ''} onChange={v => set('heading', v)} />
      <Field label="Corps du texte" value={d.body} onChange={v => set('body', v)} long />
    </div>
  );
}

function FeaturesBlockEditor({ block, lang, onChange }: { block: FeaturesBlock; lang: Lang; onChange: (b: FeaturesBlock) => void }) {
  const d = block[lang];
  return (
    <div className="space-y-3">
      <Field label="Titre (optionnel)" value={d.heading ?? ''} onChange={v => onChange({ ...block, [lang]: { ...d, heading: v } })} />
      <div>
        <label className="block text-xs text-gray-500 mb-1">Éléments de la liste</label>
        <ItemsList items={d.items} onChange={items => onChange({ ...block, [lang]: { ...d, items } })} />
      </div>
    </div>
  );
}

function CtaBannerBlockEditor({ block, lang, onChange }: { block: CtaBannerBlock; lang: Lang; onChange: (b: CtaBannerBlock) => void }) {
  const d = block[lang];
  const set = (k: keyof typeof d, v: string) => onChange({ ...block, [lang]: { ...d, [k]: v } });
  return (
    <div className="space-y-3">
      <Field label="Titre" value={d.title} onChange={v => set('title', v)} />
      <Field label="Texte (optionnel)" value={d.text ?? ''} onChange={v => set('text', v)} long />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Texte bouton" value={d.btn_label} onChange={v => set('btn_label', v)} />
        <Field label="Lien bouton" value={d.btn_href} onChange={v => set('btn_href', v)} />
      </div>
    </div>
  );
}

function ImageTextBlockEditor({ block, lang, onChange }: { block: ImageTextBlock; lang: Lang; onChange: (b: ImageTextBlock) => void }) {
  const d = block[lang];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="URL image" value={block.image} onChange={v => onChange({ ...block, image: v })} />
        <Field label="Texte alt image" value={block.image_alt} onChange={v => onChange({ ...block, image_alt: v })} />
      </div>
      <div className="flex items-center gap-4">
        <label className="text-xs text-gray-500">Position image :</label>
        {(['left', 'right'] as const).map(s => (
          <label key={s} className="flex items-center gap-1.5 text-sm text-gray-300 cursor-pointer">
            <input type="radio" checked={block.side === s} onChange={() => onChange({ ...block, side: s })} className="accent-emerald-500" />
            {s === 'left' ? 'Gauche' : 'Droite'}
          </label>
        ))}
      </div>
      <Field label="Titre (optionnel)" value={d.heading ?? ''} onChange={v => onChange({ ...block, [lang]: { ...d, heading: v } })} />
      <Field label="Corps du texte" value={d.body} onChange={v => onChange({ ...block, [lang]: { ...d, body: v } })} long />
    </div>
  );
}

// ─── Block wrapper ────────────────────────────────────────────────────────────

const BLOCK_LABELS: Record<string, string> = {
  hero: 'Hero (titre + sous-titre)',
  text: 'Bloc texte',
  features: 'Liste de fonctionnalités',
  cta_banner: 'Bannière CTA',
  image_text: 'Image + texte',
};

function BlockWrapper({
  block, lang, onChange, onRemove, onMoveUp, onMoveDown,
}: {
  block: PageBlock; lang: Lang;
  onChange: (b: PageBlock) => void;
  onRemove: () => void; onMoveUp: () => void; onMoveDown: () => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-gray-800 border border-white/10 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/80 border-b border-white/5">
        <div className="flex flex-col gap-0.5">
          <button onClick={onMoveUp} className="text-gray-500 hover:text-gray-300 text-xs leading-none">▲</button>
          <button onClick={onMoveDown} className="text-gray-500 hover:text-gray-300 text-xs leading-none">▼</button>
        </div>
        <span className="flex-1 text-xs font-medium text-gray-400 uppercase tracking-wide">
          {BLOCK_LABELS[block.type] ?? block.type}
        </span>
        <button onClick={() => setOpen(o => !o)} className="text-gray-500 hover:text-gray-300 text-xs px-2 py-1">
          {open ? '▲ Réduire' : '▼ Ouvrir'}
        </button>
        <button onClick={onRemove} className="text-red-500 hover:text-red-400 text-xs">Supprimer</button>
      </div>
      {open && (
        <div className="p-4">
          {block.type === 'hero' && <HeroBlockEditor block={block} lang={lang} onChange={onChange as (b: HeroBlock) => void} />}
          {block.type === 'text' && <TextBlockEditor block={block} lang={lang} onChange={onChange as (b: TextBlock) => void} />}
          {block.type === 'features' && <FeaturesBlockEditor block={block} lang={lang} onChange={onChange as (b: FeaturesBlock) => void} />}
          {block.type === 'cta_banner' && <CtaBannerBlockEditor block={block} lang={lang} onChange={onChange as (b: CtaBannerBlock) => void} />}
          {block.type === 'image_text' && <ImageTextBlockEditor block={block} lang={lang} onChange={onChange as (b: ImageTextBlock) => void} />}
        </div>
      )}
    </div>
  );
}

// ─── Default block factories ──────────────────────────────────────────────────

function makeBlock(type: PageBlock['type']): PageBlock {
  const id = uid();
  const empty = { fr: {}, en: {} };
  switch (type) {
    case 'hero': return { id, type, fr: { title: '', subtitle: '' }, en: { title: '', subtitle: '' } };
    case 'text': return { id, type, fr: { body: '' }, en: { body: '' } };
    case 'features': return { id, type, fr: { items: [''] }, en: { items: [''] } };
    case 'cta_banner': return { id, type, fr: { title: '', btn_label: '', btn_href: '' }, en: { title: '', btn_label: '', btn_href: '' } };
    case 'image_text': return { id, type: 'image_text', image: '', image_alt: '', side: 'left', fr: { body: '' }, en: { body: '' } };
    default: return { id, type: 'text', ...empty, fr: { body: '' }, en: { body: '' } };
  }
}

// ─── Default page ─────────────────────────────────────────────────────────────

function defaultPage(): PageData {
  return {
    slug: '', nav_label_fr: '', nav_label_en: '', show_in_nav: false, nav_order: 0,
    published: false, content: { blocks: [] },
    meta_title_fr: '', meta_title_en: '', meta_desc_fr: '', meta_desc_en: '',
  };
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PageEditor({ initial, pageId }: { initial?: PageData; pageId?: number }) {
  const router = useRouter();
  const [page, setPage] = useState<PageData>(initial ?? defaultPage());
  const [lang, setLang] = useState<Lang>('fr');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const isEdit = Boolean(pageId);

  const blocks = page.content.blocks;

  const setBlocks = useCallback((blocks: PageBlock[]) => {
    setPage(p => ({ ...p, content: { blocks } }));
  }, []);

  function addBlock(type: PageBlock['type']) {
    setBlocks([...blocks, makeBlock(type)]);
  }

  function updateBlock(i: number, b: PageBlock) {
    const next = [...blocks]; next[i] = b; setBlocks(next);
  }

  function removeBlock(i: number) {
    setBlocks(blocks.filter((_, j) => j !== i));
  }

  function moveBlock(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks]; [next[i], next[j]] = [next[j], next[i]]; setBlocks(next);
  }

  async function handleSave() {
    setSaving(true); setError(''); setSaved(false);
    const url = isEdit ? `/api/admin/pages/${pageId}` : '/api/admin/pages';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(page) });
    const data = await res.json();
    if (res.ok) {
      if (!isEdit) { router.push(`/admin/pages/${data.id}`); router.refresh(); }
      else { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } else {
      setError(data.error || 'Erreur lors de la sauvegarde');
    }
    setSaving(false);
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.push('/admin/pages')} className="text-gray-400 hover:text-gray-200 text-sm">← Retour</button>
        <h1 className="text-xl font-bold text-white flex-1">{isEdit ? 'Modifier la page' : 'Nouvelle page'}</h1>
        {saved && <span className="text-emerald-400 text-sm">Sauvegardé ✓</span>}
        {error && <span className="text-red-400 text-sm">{error}</span>}
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" checked={page.published} onChange={e => setPage(p => ({ ...p, published: e.target.checked }))} className="accent-emerald-500 w-4 h-4" />
          Publié
        </label>
        <button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors">
          {saving ? 'Sauvegarde…' : 'Sauvegarder'}
        </button>
      </div>

      {/* Paramètres */}
      <div className="bg-gray-900 border border-white/10 rounded-xl p-6 mb-6 space-y-4">
        <h2 className="text-sm font-semibold text-white">Paramètres de la page</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Slug (URL)</label>
            <input
              type="text"
              value={page.slug}
              onChange={e => setPage(p => ({ ...p, slug: slugify(e.target.value) }))}
              className="w-full bg-gray-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              placeholder="ma-page"
            />
            <p className="text-xs text-gray-600 mt-1">URL : /{`{en|fr}`}/{page.slug || 'ma-page'}</p>
          </div>
          <div className="flex items-end gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-300 pb-2.5">
              <input type="checkbox" checked={page.show_in_nav} onChange={e => setPage(p => ({ ...p, show_in_nav: e.target.checked }))} className="accent-emerald-500 w-4 h-4" />
              Afficher dans la navigation
            </label>
            {page.show_in_nav && (
              <div>
                <label className="block text-sm text-gray-400 mb-1">Ordre</label>
                <input type="number" value={page.nav_order} onChange={e => setPage(p => ({ ...p, nav_order: Number(e.target.value) }))}
                  className="w-20 bg-gray-800 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
            )}
          </div>
        </div>
        {page.show_in_nav && (
          <div className="grid grid-cols-2 gap-4">
            <Field label="Label navigation (FR)" value={page.nav_label_fr} onChange={v => setPage(p => ({ ...p, nav_label_fr: v }))} />
            <Field label="Label navigation (EN)" value={page.nav_label_en} onChange={v => setPage(p => ({ ...p, nav_label_en: v }))} />
          </div>
        )}
        <div className="pt-2 border-t border-white/5">
          <p className="text-xs text-gray-500 mb-3">SEO (optionnel)</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Titre meta FR" value={page.meta_title_fr} onChange={v => setPage(p => ({ ...p, meta_title_fr: v }))} />
            <Field label="Titre meta EN" value={page.meta_title_en} onChange={v => setPage(p => ({ ...p, meta_title_en: v }))} />
            <Field label="Description meta FR" value={page.meta_desc_fr} onChange={v => setPage(p => ({ ...p, meta_desc_fr: v }))} long />
            <Field label="Description meta EN" value={page.meta_desc_en} onChange={v => setPage(p => ({ ...p, meta_desc_en: v }))} long />
          </div>
        </div>
      </div>

      {/* Éditeur de blocs */}
      <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
          <div className="flex">
            {(['fr', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-5 py-2 text-sm font-medium transition-colors ${lang === l ? 'text-emerald-300 border-b-2 border-emerald-500' : 'text-gray-400 hover:text-gray-200'}`}>
                {l === 'fr' ? 'Français' : 'English'}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {(['hero', 'text', 'features', 'cta_banner', 'image_text'] as const).map(t => (
              <button key={t} onClick={() => addBlock(t)}
                className="text-xs bg-gray-800 border border-white/10 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-colors">
                + {BLOCK_LABELS[t].split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
        <div className="p-6 space-y-4">
          {blocks.map((block, i) => (
            <BlockWrapper key={block.id} block={block} lang={lang}
              onChange={b => updateBlock(i, b)}
              onRemove={() => removeBlock(i)}
              onMoveUp={() => moveBlock(i, -1)}
              onMoveDown={() => moveBlock(i, 1)} />
          ))}
          {blocks.length === 0 && (
            <div className="text-center text-gray-500 text-sm py-12 border border-dashed border-white/10 rounded-lg">
              Ajoutez des blocs de contenu en cliquant sur les boutons ci-dessus
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

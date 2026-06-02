'use client';

import { useState } from 'react';

type DictValue = string | string[] | Record<string, unknown>;
type Dict = Record<string, DictValue>;

function isString(v: unknown): v is string {
  return typeof v === 'string';
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((i) => typeof i === 'string');
}

function isImageKey(key: string) {
  return key.endsWith('_image') || key === 'image' || key.endsWith('_img');
}

function ImageField({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (res.ok) onChange(data.url);
    setUploading(false);
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs text-gray-500 font-mono">{label}</label>
      <div className="flex items-center gap-3">
        {value && (
          <img src={value} alt="" className="h-16 w-24 object-cover rounded-lg border border-white/10 shrink-0" />
        )}
        <div className="flex-1 space-y-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
            placeholder="/chemin/image.png"
          />
          <label className="inline-flex items-center gap-1.5 cursor-pointer bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs px-3 py-1.5 rounded-lg transition-colors">
            {uploading ? 'Upload…' : '↑ Changer l\'image'}
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}

function StringField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  const isLong = value.length > 80 || value.includes('\n');
  return (
    <div className="space-y-1">
      <label className="block text-xs text-gray-500 font-mono">{label}</label>
      {isLong ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[80px] resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      )}
    </div>
  );
}

function StringArrayField({
  value,
  onChange,
  label,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  label: string;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-xs text-gray-500 font-mono">{label}</label>
      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="flex gap-2 items-start">
            <span className="text-emerald-500 mt-2 text-xs">{i + 1}.</span>
            <textarea
              value={item}
              onChange={(e) => {
                const next = [...value];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="flex-1 bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none min-h-[40px]"
            />
            <button
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="text-red-500 hover:text-red-400 mt-2 text-sm"
            >
              ×
            </button>
          </div>
        ))}
        <button
          onClick={() => onChange([...value, ''])}
          className="text-xs text-emerald-400 hover:text-emerald-300"
        >
          + Ajouter
        </button>
      </div>
    </div>
  );
}

function RecursiveEditor({
  data,
  onChange,
  prefix = '',
}: {
  data: Record<string, unknown>;
  onChange: (d: Record<string, unknown>) => void;
  prefix?: string;
}) {
  return (
    <div className="space-y-4">
      {Object.entries(data).map(([key, value]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (isString(value)) {
          if (isImageKey(key)) {
            return (
              <ImageField
                key={fullKey}
                label={fullKey}
                value={value}
                onChange={(v) => onChange({ ...data, [key]: v })}
              />
            );
          }
          return (
            <StringField
              key={fullKey}
              label={fullKey}
              value={value}
              onChange={(v) => onChange({ ...data, [key]: v })}
            />
          );
        }

        if (isStringArray(value)) {
          return (
            <StringArrayField
              key={fullKey}
              label={fullKey}
              value={value}
              onChange={(v) => onChange({ ...data, [key]: v })}
            />
          );
        }

        if (Array.isArray(value)) {
          // Array of objects (e.g. testimonials.items)
          return (
            <div key={fullKey} className="space-y-2">
              <label className="block text-xs text-gray-500 font-mono">{fullKey}</label>
              <div className="space-y-3 pl-4 border-l border-white/10">
                {(value as Record<string, unknown>[]).map((item, i) => (
                  <div key={i} className="bg-gray-800/50 rounded-lg p-3 space-y-3">
                    <RecursiveEditor
                      data={item}
                      prefix={`${fullKey}[${i}]`}
                      onChange={(updated) => {
                        const arr = [...(value as Record<string, unknown>[])];
                        arr[i] = updated;
                        onChange({ ...data, [key]: arr });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (typeof value === 'object' && value !== null) {
          return (
            <div key={fullKey} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-xs text-gray-600 font-mono uppercase tracking-wide">{key}</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <div className="pl-4 border-l border-white/10">
                <RecursiveEditor
                  data={value as Record<string, unknown>}
                  prefix={fullKey}
                  onChange={(updated) => onChange({ ...data, [key]: updated })}
                />
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

export default function TranslationEditor({
  initialEn,
  initialFr,
}: {
  initialEn: Dict;
  initialFr: Dict;
}) {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [en, setEn] = useState(initialEn);
  const [fr, setFr] = useState(initialFr);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const current = lang === 'fr' ? fr : en;
  const setCurrent = lang === 'fr' ? setFr : setEn;

  async function handleSave() {
    setSaving(true);
    setError('');
    setSaved(false);

    const res = await fetch(`/api/admin/translations/${lang}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(current),
    });

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError('Erreur lors de la sauvegarde');
    }
    setSaving(false);
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex rounded-lg border border-white/10 overflow-hidden">
          {(['fr', 'en'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-5 py-2 text-sm font-medium transition-colors ${
                lang === l ? 'bg-emerald-700/30 text-emerald-300' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {l === 'fr' ? 'Français' : 'English'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {saved && <span className="text-emerald-400 text-sm">Sauvegardé ✓</span>}
          {error && <span className="text-red-400 text-sm">{error}</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
          >
            {saving ? 'Sauvegarde…' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
        <RecursiveEditor
          data={current as Record<string, unknown>}
          onChange={(updated) => setCurrent(updated as Dict)}
        />
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
import AdminShell from '@/components/admin/AdminShell';
import TranslationEditor from '@/components/admin/TranslationEditor';
import fs from 'fs';
import path from 'path';

function loadJson(lang: string) {
  const filePath = path.join(process.cwd(), 'data', 'translations', `${lang}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export default function TranslationsPage() {
  const en = loadJson('en');
  const fr = loadJson('fr');

  return (
    <AdminShell>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Traductions</h1>
          <p className="text-gray-400 text-sm mt-1">
            Modifiez les textes du site en français et en anglais
          </p>
        </div>
        <TranslationEditor initialEn={en} initialFr={fr} />
      </div>
    </AdminShell>
  );
}

import 'server-only';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'translations');

export const getDictionary = (locale: string) => {
  const lang = locale === 'fr' ? 'fr' : 'en';
  const filePath = path.join(DATA_DIR, `${lang}.json`);
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
};

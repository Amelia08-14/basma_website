import { getNavPages } from '@/lib/pages';
import Navbar from './Navbar';

export default function NavbarServer({ dict, lang }: { dict: any; lang: string }) {
  const customPages = getNavPages();
  return <Navbar dict={dict} lang={lang} customPages={customPages} />;
}

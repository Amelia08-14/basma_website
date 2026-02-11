import { getDictionary } from '../../../dictionaries/get-dictionary';
import Navbar from '@/components/Navbar';
import Values from '@/components/Values';
import WhereWeHelp from '@/components/WhereWeHelp';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';

export default async function SolutionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen">
      <Navbar dict={dict.navbar} lang={lang} />
      <div className="pt-24 pb-12">
        <Experience dict={dict.experience} />
        <Values />
        <WhereWeHelp dict={dict.where_we_help} />
      </div>
      <Footer dict={dict.footer} />
    </main>
  );
}
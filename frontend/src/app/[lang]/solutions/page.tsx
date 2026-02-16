import { getDictionary } from '../../../dictionaries/get-dictionary';
import Navbar from '@/components/Navbar';
import Values from '@/components/Values';
import WhereWeHelp from '@/components/WhereWeHelp';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr ? "Nos Solutions de Formation - Basma" : "Our Learning Solutions - Basma",
    description: isFr 
      ? "Découvrez nos solutions de formation sur mesure pour les entreprises en Algérie. Développement des compétences, leadership, et formation technique."
      : "Explore our tailored corporate training solutions in Algeria. Skills development, leadership training, and technical upskilling.",
  };
}

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
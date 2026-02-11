import { getDictionary } from '../../dictionaries/get-dictionary';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import About from '../../components/About';
import WhatWeDo from '../../components/WhatWeDo';
import LearningCycle from '../../components/LearningCycle';
import Testimonials from '../../components/Testimonials';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen">
      <Navbar dict={dict.navbar} lang={lang} />
      <Hero dict={dict.hero} lang={lang} />
      <About dict={dict.about} />
      <WhatWeDo dict={dict.what_we_do} />
      <LearningCycle dict={dict.learning_cycle} />
      <Testimonials dict={dict.testimonials} />
      <Contact dict={dict.contact} />
      <Footer dict={dict.footer} />
    </main>
  );
}

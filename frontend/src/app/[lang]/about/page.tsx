import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/dictionaries/get-dictionary';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr
      ? "E-learning et Blended Learning pour les organisations en Algérie - Basma Learning"
      : 'E-Learning and Blended Learning for Organizations in Algeria - Basma Learning',
    description: isFr
      ? "Basma Learning conçoit des solutions e-learning et blended learning adaptées aux enjeux business : engagement, mise en pratique et impact sur la performance."
      : 'Basma Learning designs e-learning and blended learning solutions tailored to business needs: engagement, practical application, and measurable impact.',
    alternates: {
      canonical: `/${lang}/about`,
      languages: { 'en-US': '/en/about', 'fr-FR': '/fr/about' },
    },
    openGraph: {
      title: isFr
        ? "E-learning et Blended Learning pour les organisations en Algérie"
        : 'E-Learning and Blended Learning for Organizations in Algeria',
      description: isFr
        ? "Des solutions digitales et hybrides conçues pour développer les compétences et améliorer la performance."
        : 'Digital and blended solutions designed to build capabilities and improve business performance.',
      url: `https://basmalearning.com/${lang}/about`,
      siteName: 'Basma Learning',
      images: [{ url: '/blog/cover-2.jpg', width: 1200, height: 630, alt: 'Basma Learning' }],
      locale: isFr ? 'fr_FR' : 'en_US',
      type: 'website',
    },
  };
}

export default async function ELearningPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isFr = lang === 'fr';

  const title = isFr
    ? "E-learning et Blended Learning pour les organisations en Algérie"
    : 'E-Learning and Blended Learning for Organizations in Algeria';

  const intro = isFr
    ? "Le e-learning permet aux organisations de former leurs équipes de manière flexible, scalable et accessible. Basma Learning conçoit des solutions de digital learning adaptées aux besoins business réels, en combinant expertise pédagogique et approche orientée performance."
    : 'E-learning enables organizations to train their teams in a flexible, scalable, and accessible way. Basma Learning designs digital learning solutions tailored to real business needs, combining instructional expertise with a performance-driven approach.';

  const features = isFr
    ? [
        'Accès flexible, à tout moment',
        'Blocs courts et ciblés',
        'Situations réelles, pas seulement de la théorie',
        'Suivi clair de la progression',
      ]
    : ['Easy to access anytime, anywhere', 'Short, focused learning blocks', 'Real situations, not just theory', 'Clear progress tracking'];

  return (
    <main className="min-h-screen">
      <Navbar dict={dict.navbar} lang={lang} />
      <div className="pt-24 pb-12">
        <section className="py-16 2xl:py-20 relative overflow-hidden">
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl 2xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
                {title}
              </h1>
              <p className="mt-6 text-gray-400 max-w-3xl 2xl:max-w-4xl mx-auto text-lg 2xl:text-xl leading-relaxed tracking-wide">
                {intro}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-8">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="p-6 2xl:p-8 rounded-xl bg-gradient-to-r from-emerald-900/20 to-purple-900/20 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center min-h-[120px] 2xl:min-h-[160px]"
                >
                  <span className="font-semibold text-lg 2xl:text-2xl text-white text-center">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 2xl:py-20 relative overflow-hidden">
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 2xl:gap-20 items-start">
              <div className="space-y-8">
                <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 2xl:p-8">
                  <div className="text-xs tracking-widest text-gray-400 uppercase">
                    {isFr ? 'Positionnement' : 'Positioning'}
                  </div>
                  <div className="mt-3 text-xl 2xl:text-2xl font-semibold text-white">
                    {isFr
                      ? 'Formation corporate en Algérie, portée par des formats modernes'
                      : 'Corporate training in Algeria, delivered through modern learning formats'}
                  </div>
                  <div className="mt-4 text-gray-200 leading-8">
                    {isFr
                      ? "Nous combinons formation présentielle et solutions digitales : e-learning, blended learning et digital learning, toujours orientés performance et business impact."
                      : 'We combine instructor-led training with digital learning solutions: e-learning, blended learning, and digital learning, always focused on performance and business impact.'}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 2xl:p-8">
                  <h2 className="text-2xl 2xl:text-3xl font-bold text-white">
                    {isFr ? 'Pourquoi le e-learning est essentiel' : 'Why e-learning matters'}
                  </h2>
                  <p className="mt-4 text-gray-200 leading-8">
                    {isFr
                      ? "Le e-learning rend la formation accessible à tout moment et partout, tout en réduisant les contraintes de délivrance et en augmentant la capacité de déploiement à l’échelle. Il soutient l’auto-apprentissage et permet de déployer des solutions de formation plus efficacement."
                      : 'E-learning allows organizations to make training accessible anytime and anywhere, while reducing delivery constraints and increasing scalability across teams. It supports self-paced learning and enables companies to deploy learning solutions more efficiently.'}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 2xl:p-8">
                  <h2 className="text-2xl 2xl:text-3xl font-bold text-white">
                    {isFr ? 'Notre approche' : "Basma Learning’s approach"}
                  </h2>
                  <p className="mt-4 text-gray-200 leading-8">
                    {isFr
                      ? "Nous concevons des expériences de digital learning basées sur des situations de travail réelles, avec un focus fort sur l’engagement, la mise en pratique et la rétention. Notre approche combine ingénierie pédagogique et pertinence business pour créer des solutions qui délivrent de la valeur mesurable."
                      : 'We design digital learning experiences based on real workplace situations, with a strong focus on engagement, practical application, and knowledge retention. Our approach combines instructional design principles with business relevance to create learning solutions that deliver measurable value.'}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 2xl:p-8">
                  <h2 className="text-2xl 2xl:text-3xl font-bold text-white">
                    {isFr ? 'Offre blended learning' : 'Blended learning offer'}
                  </h2>
                  <p className="mt-4 text-gray-200 leading-8">
                    {isFr
                      ? "Le blended learning combine le meilleur du présentiel et du digital. En mixant sessions live, modules e-learning et activités pratiques, les organisations créent des parcours plus efficaces et plus engageants."
                      : 'Blended learning combines the strengths of live training and digital learning. By mixing facilitated sessions, e-learning modules, and practical activities, organizations can create more effective and engaging learning journeys.'}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 2xl:p-8">
                  <h2 className="text-2xl 2xl:text-3xl font-bold text-white">{isFr ? "Cas d'usage" : 'Use cases'}</h2>
                  <p className="mt-4 text-gray-200 leading-8">
                    {isFr
                      ? "Nos solutions e-learning et blended learning peuvent soutenir le développement des managers, l’onboarding, la formation soft skills et des initiatives d’upskilling plus larges. Chaque solution est conçue selon votre contexte, votre audience et vos objectifs."
                      : 'Our e-learning and blended learning solutions can support manager development, employee onboarding, soft skills training, and broader upskilling initiatives. Each solution is designed to fit the organization’s context, audience, and learning objectives.'}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="relative aspect-[16/10] w-full">
                    <Image src="/blog/cover-2.jpg" alt="E-learning" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5" />
                  </div>
                  <div className="p-6 2xl:p-8">
                    <div className="text-sm font-semibold text-white">{isFr ? 'Bénéfices' : 'Benefits'}</div>
                    <ul className="mt-4 space-y-3 text-sm 2xl:text-base text-gray-200">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-emerald-300" />
                        <span>{isFr ? 'Flexibilité et accessibilité' : 'Flexibility and accessibility'}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-emerald-300" />
                        <span>{isFr ? 'Scalabilité à grande échelle' : 'Scalability across teams'}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-emerald-300" />
                        <span>{isFr ? 'Engagement et mise en pratique' : 'Engagement and real-world application'}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-emerald-300" />
                        <span>{isFr ? 'Impact business et performance' : 'Business impact and performance'}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6 2xl:p-8">
                  <div className="text-xl 2xl:text-2xl font-semibold text-white">
                    {isFr ? 'Prêt à lancer un parcours digital ou hybride ?' : 'Ready to implement a digital or blended solution?'}
                  </div>
                  <p className="mt-3 text-gray-100/90 leading-7">
                    {isFr
                      ? "Vous souhaitez déployer une solution e-learning ou blended learning alignée sur vos objectifs business ? Parlons de vos besoins et concevons une expérience adaptée."
                      : 'Looking to implement an e-learning or blended learning solution tailored to your organization? Let’s discuss your needs and design a learning experience that fits your business goals.'}
                  </p>
                  <Link
                    href={`/${lang}/#contact`}
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-medium text-black hover:bg-emerald-300 transition-colors"
                  >
                    {isFr ? 'Nous contacter' : 'Contact us'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer dict={dict.footer} />
    </main>
  );
}

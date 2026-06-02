import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import NavbarServer from '@/components/NavbarServer';
import Footer from '@/components/Footer';
import { getDictionary } from '@/dictionaries/get-dictionary';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const p = dict.elearning_page;
  return {
    title: `${p.title} - Basma Learning`,
    alternates: {
      canonical: `/${lang}/about`,
      languages: { 'en-US': '/en/about', 'fr-FR': '/fr/about' },
    },
    openGraph: {
      title: p.title,
      url: `https://basmalearning.com/${lang}/about`,
      siteName: 'Basma Learning',
      images: [{ url: '/blog/cover-2.jpg', width: 1200, height: 630, alt: 'Basma Learning' }],
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
  };
}

export default async function ELearningPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const p = dict.elearning_page;

  return (
    <main className="min-h-screen">
      <NavbarServer dict={dict.navbar} lang={lang} />
      <div className="pt-24 pb-12">
        <section className="py-16 2xl:py-20 relative overflow-hidden">
          <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl 2xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
                {p.title}
              </h1>
              <p className="mt-6 text-gray-400 max-w-3xl 2xl:max-w-4xl mx-auto text-lg 2xl:text-xl leading-relaxed tracking-wide">
                {p.intro}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 2xl:gap-8">
              {p.features.map((feature: string) => (
                <div key={feature} className="p-6 2xl:p-8 rounded-xl bg-gradient-to-r from-emerald-900/20 to-purple-900/20 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center min-h-[120px] 2xl:min-h-[160px]">
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
                  <div className="text-xs tracking-widest text-gray-400 uppercase">{p.positioning_label}</div>
                  <div className="mt-3 text-xl 2xl:text-2xl font-semibold text-white">{p.positioning_title}</div>
                  <div className="mt-4 text-gray-200 leading-8">{p.positioning_body}</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 2xl:p-8">
                  <h2 className="text-2xl 2xl:text-3xl font-bold text-white">{p.why_title}</h2>
                  <p className="mt-4 text-gray-200 leading-8">{p.why_body}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 2xl:p-8">
                  <h2 className="text-2xl 2xl:text-3xl font-bold text-white">{p.approach_title}</h2>
                  <p className="mt-4 text-gray-200 leading-8">{p.approach_body}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 2xl:p-8">
                  <h2 className="text-2xl 2xl:text-3xl font-bold text-white">{p.blended_title}</h2>
                  <p className="mt-4 text-gray-200 leading-8">{p.blended_body}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 2xl:p-8">
                  <h2 className="text-2xl 2xl:text-3xl font-bold text-white">{p.usecases_title}</h2>
                  <p className="mt-4 text-gray-200 leading-8">{p.usecases_body}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <div className="relative aspect-[16/10] w-full">
                    <Image src={p.cover_image || '/blog/cover-2.jpg'} alt="E-learning" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5" />
                  </div>
                  <div className="p-6 2xl:p-8">
                    <div className="text-sm font-semibold text-white">{p.benefits_title}</div>
                    <ul className="mt-4 space-y-3 text-sm 2xl:text-base text-gray-200">
                      {p.benefits_items.map((item: string) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-emerald-300 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6 2xl:p-8">
                  <div className="text-xl 2xl:text-2xl font-semibold text-white">{p.cta_title}</div>
                  <p className="mt-3 text-gray-100/90 leading-7">{p.cta_body}</p>
                  <Link
                    href={`/${lang}/#contact`}
                    className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-medium text-black hover:bg-emerald-300 transition-colors"
                  >
                    {p.cta_button}
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

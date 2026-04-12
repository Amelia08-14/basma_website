import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { getBlogPosts } from '@/lib/blog';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr ? 'Blog - Basma Learning' : 'Blog - Basma Learning',
    description: isFr
      ? "Articles sur la formation corporate, le développement des compétences et l'apprentissage en entreprise en Algérie et dans la région MENA."
      : 'Articles on corporate training, skills development, and learning strategy across Algeria and the MENA region.',
    alternates: {
      canonical: `/${lang}/blog`,
      languages: { 'en-US': '/en/blog', 'fr-FR': '/fr/blog' },
    },
  };
}

function formatDate(date: string, lang: string) {
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(date));
}

export default async function BlogIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const posts = getBlogPosts(lang === 'fr' ? 'fr' : 'en');

  return (
    <main className="min-h-screen">
      <Navbar dict={dict.navbar} lang={lang} />
      <div className="pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold text-white">
              {lang === 'fr' ? 'Blog' : 'Blog'}
            </h1>
            <p className="mt-4 text-gray-300 text-lg">
              {lang === 'fr'
                ? "Analyses et idées sur la formation corporate, la performance et l'apprentissage en entreprise."
                : 'Insights on corporate training, performance, and modern learning.'}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${lang}/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors"
              >
                <div className="relative aspect-[16/9] w-full">
                  <Image src={post.coverImage} alt={post.coverAlt} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                  <div className="absolute left-4 right-4 bottom-4">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-200">
                      <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur-md">
                        {formatDate(post.date, lang)}
                      </span>
                      <span className="truncate rounded-full bg-white/10 px-3 py-1 backdrop-blur-md">
                        {post.tags.join(' · ')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-gray-300 leading-relaxed">{post.description}</p>
                  <div className="mt-5 text-sm font-medium text-emerald-400">
                    {lang === 'fr' ? 'Lire l’article' : 'Read article'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer dict={dict.footer} />
    </main>
  );
}

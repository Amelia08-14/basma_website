import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { getBlogPost } from '@/lib/blog';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getBlogPost(lang === 'fr' ? 'fr' : 'en', slug);
  if (!post) return {};

  return {
    title: `${post.title} - Basma Learning`,
    description: post.description,
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: {
        'en-US': `/en/blog/${slug}`,
        'fr-FR': `/fr/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://basmalearning.com/${lang}/blog/${slug}`,
      siteName: 'Basma Learning',
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.coverAlt }],
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: 'article',
    },
  };
}

function formatDate(date: string, lang: string) {
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
  return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(date));
}

function estimateReadingMinutes(blocks: { type: string; text?: string; items?: string[] }[]) {
  const text = blocks
    .map((b) => {
      if (b.type === 'ul') return (b.items || []).join(' ');
      return b.text || '';
    })
    .join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const post = getBlogPost(lang === 'fr' ? 'fr' : 'en', slug);

  if (!post) notFound();

  const headings = post.blocks
    .filter((b): b is { type: 'h2'; text: string } => b.type === 'h2' && typeof b.text === 'string')
    .map((h) => ({ text: h.text, id: slugify(h.text) }));

  const canonicalUrl = `https://basmalearning.com/${lang}/blog/${slug}`;

  return (
    <main className="min-h-screen">
      <Navbar dict={dict.navbar} lang={lang} />
      <div className="pt-24 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors"
            >
              {lang === 'fr' ? '← Retour au blog' : '← Back to blog'}
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                <div className="relative aspect-[16/9] w-full">
                  <Image src={post.coverImage} alt={post.coverAlt} fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
                </div>
                <div className="p-6 md:p-10">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-200">
                    <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur-md">
                      {formatDate(post.date, lang)}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 backdrop-blur-md">
                      {estimateReadingMinutes(post.blocks)} {lang === 'fr' ? 'min de lecture' : 'min read'}
                    </span>
                    <span className="truncate rounded-full bg-white/10 px-3 py-1 backdrop-blur-md">
                      {post.tags.join(' · ')}
                    </span>
                  </div>

                  <h1 className="mt-5 text-3xl md:text-5xl font-semibold text-white">{post.title}</h1>
                  <p className="mt-4 text-gray-200/90 text-lg md:text-xl leading-relaxed">{post.description}</p>
                </div>
              </div>

              <article className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-10">
                <div className="max-w-[72ch]">
                  <div className="text-[17px] md:text-lg leading-8 text-gray-200">
                    {post.blocks.map((block, idx) => {
                      if (block.type === 'h2') {
                        const id = slugify(block.text);
                        return (
                          <h2
                            id={id}
                            key={idx}
                            className="scroll-mt-28 mt-12 pt-8 border-t border-white/10 text-2xl md:text-3xl font-semibold text-white"
                          >
                            {block.text}
                          </h2>
                        );
                      }
                      if (block.type === 'ul') {
                        return (
                          <ul key={idx} className="mt-6 list-disc pl-6 space-y-3">
                            {block.items.map((item) => (
                              <li key={item} className="leading-7">
                                {item}
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      const text = block.text;
                      const isLead = idx === 0;
                      const isCallout = typeof text === 'string' && text.length <= 110;

                      if (isLead) {
                        return (
                          <p key={idx} className="text-xl md:text-2xl leading-9 text-white/90">
                            {text}
                          </p>
                        );
                      }

                      if (isCallout) {
                        return (
                          <div key={idx} className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                            <p className="text-lg md:text-xl leading-8 text-white/90">{text}</p>
                          </div>
                        );
                      }

                      return (
                        <p key={idx} className="mt-6 leading-8 text-gray-200">
                          {text}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </article>
            </div>

            <aside className="col-span-12 lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <div className="text-sm font-semibold text-white">{lang === 'fr' ? 'Sommaire' : 'Table of contents'}</div>
                  <div className="mt-4 space-y-3">
                    {headings.length === 0 ? (
                      <div className="text-sm text-gray-300">{lang === 'fr' ? 'Aucune section' : 'No sections'}</div>
                    ) : (
                      headings.map((h) => (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          className="block text-sm text-gray-300 hover:text-white transition-colors"
                        >
                          {h.text}
                        </a>
                      ))
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <div className="text-sm font-semibold text-white">{lang === 'fr' ? 'Partager' : 'Share'}</div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/10 px-4 py-2 text-sm text-gray-200 hover:bg-white/15 hover:text-white transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={canonicalUrl}
                      className="rounded-full bg-white/10 px-4 py-2 text-sm text-gray-200 hover:bg-white/15 hover:text-white transition-colors"
                    >
                      {lang === 'fr' ? 'Lien' : 'Link'}
                    </a>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6">
                  <div className="text-sm font-semibold text-white">
                    {lang === 'fr' ? 'Parlons de vos besoins' : 'Let’s talk about your needs'}
                  </div>
                  <p className="mt-3 text-sm text-gray-200 leading-6">
                    {lang === 'fr'
                      ? 'Vous cherchez une approche moderne, pratique et engageante pour former vos équipes ?'
                      : 'Looking for modern, practical, engaging training for your teams?'}
                  </p>
                  <Link
                    href={`/${lang}/#contact`}
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-300 transition-colors"
                  >
                    {lang === 'fr' ? 'Contacter Basma' : 'Contact Basma'}
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <Footer dict={dict.footer} />
    </main>
  );
}

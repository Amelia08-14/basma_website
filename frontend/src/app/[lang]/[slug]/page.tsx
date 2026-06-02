import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import NavbarServer from '@/components/NavbarServer';
import Footer from '@/components/Footer';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { getPublishedPage } from '@/lib/pages';
import type { PageBlock, HeroBlock, TextBlock, FeaturesBlock, CtaBannerBlock, ImageTextBlock } from '@/lib/pages';

type Props = { params: Promise<{ lang: string; slug: string }> };

// Prevent collision with static routes
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = getPublishedPage(slug);
  if (!page) return {};
  const isFr = lang === 'fr';
  const title = isFr ? page.meta_title_fr : page.meta_title_en;
  const description = isFr ? page.meta_desc_fr : page.meta_desc_en;
  return {
    title: title || undefined,
    description: description || undefined,
    metadataBase: new URL('https://basmalearning.com'),
    alternates: {
      canonical: `/${lang}/${slug}`,
      languages: { 'en-US': `/en/${slug}`, 'fr-FR': `/fr/${slug}` },
    },
  };
}

// ─── Block renderers ──────────────────────────────────────────────────────────

function RenderHero({ block, lang }: { block: HeroBlock; lang: string }) {
  const d = lang === 'fr' ? block.fr : block.en;
  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400 leading-tight"
          dangerouslySetInnerHTML={{ __html: d.title }}
        />
        {d.subtitle && (
          <p className="mt-6 text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">{d.subtitle}</p>
        )}
        {d.btn_label && d.btn_href && (
          <Link
            href={d.btn_href}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 transition-colors"
          >
            {d.btn_label}
          </Link>
        )}
      </div>
    </section>
  );
}

function RenderText({ block, lang }: { block: TextBlock; lang: string }) {
  const d = lang === 'fr' ? block.fr : block.en;
  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        {d.heading && <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{d.heading}</h2>}
        <p className="text-gray-300 leading-8 whitespace-pre-line">{d.body}</p>
      </div>
    </section>
  );
}

function RenderFeatures({ block, lang }: { block: FeaturesBlock; lang: string }) {
  const d = lang === 'fr' ? block.fr : block.en;
  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-6">
        {d.heading && <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">{d.heading}</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {d.items.filter(Boolean).map((item, i) => (
            <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
              <span className="font-medium text-white">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RenderCtaBanner({ block, lang }: { block: CtaBannerBlock; lang: string }) {
  const d = lang === 'fr' ? block.fr : block.en;
  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">{d.title}</h2>
          {d.text && <p className="mt-3 text-gray-200 leading-7">{d.text}</p>}
          {d.btn_label && d.btn_href && (
            <Link
              href={d.btn_href}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-400 hover:bg-emerald-300 text-black font-semibold px-7 py-2.5 transition-colors"
            >
              {d.btn_label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function RenderImageText({ block, lang }: { block: ImageTextBlock; lang: string }) {
  const d = lang === 'fr' ? block.fr : block.en;
  const imgFirst = block.side === 'left';
  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${imgFirst ? '' : 'lg:[&>*:first-child]:order-2'}`}>
          {block.image && (
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
              <Image src={block.image} alt={block.image_alt || ''} fill className="object-cover" />
            </div>
          )}
          <div>
            {d.heading && <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{d.heading}</h2>}
            <p className="text-gray-300 leading-8 whitespace-pre-line">{d.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RenderBlock({ block, lang }: { block: PageBlock; lang: string }) {
  switch (block.type) {
    case 'hero':       return <RenderHero block={block} lang={lang} />;
    case 'text':       return <RenderText block={block} lang={lang} />;
    case 'features':   return <RenderFeatures block={block} lang={lang} />;
    case 'cta_banner': return <RenderCtaBanner block={block} lang={lang} />;
    case 'image_text': return <RenderImageText block={block} lang={lang} />;
    default:           return null;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CustomPageRenderer({ params }: Props) {
  const { lang, slug } = await params;
  const page = getPublishedPage(slug);
  if (!page) return notFound();

  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen">
      <NavbarServer dict={dict.navbar} lang={lang} />
      <div className="pt-24">
        {page.content.blocks.map(block => (
          <RenderBlock key={block.id} block={block} lang={lang} />
        ))}
      </div>
      <Footer dict={dict.footer} />
    </main>
  );
}

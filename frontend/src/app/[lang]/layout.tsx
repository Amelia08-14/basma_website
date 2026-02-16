import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import FuturisticBackground from "@/components/FuturisticBackground";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});


export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const isFr = lang === 'fr';
  
  const title = isFr 
    ? "Basma - Formation Corporate en Algérie" 
    : "Basma - Corporate Training in Algeria";
    
  const description = isFr
    ? "Basma est une entreprise d'apprentissage et de développement tournée vers l'avenir, engagée à transformer la formation professionnelle en Algérie et dans la région MENA. Spécialiste en formation corporate."
    : "Basma is a forward-thinking learning and development enterprise committed to transforming professional education across Algeria and the MENA region. Your partner for corporate training.";

  return {
    title,
    description,
    keywords: isFr 
      ? ["Formation corporate Algérie", "Formation professionnelle", "E-learning Algérie", "Développement des compétences", "Basma Learning"]
      : ["Corporate training in Algeria", "Professional development", "E-learning Algeria", "Skills training", "Basma Learning"],
    metadataBase: new URL('https://basmalearning.com'),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en-US': '/en',
        'fr-FR': '/fr',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://basmalearning.com/${lang}`,
      siteName: 'Basma Learning',
      images: [
        {
          url: '/logo_basma.png',
          width: 800,
          height: 600,
          alt: 'Basma Logo',
        },
      ],
      locale: isFr ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    icons: {
      icon: '/logo_basma.png',
      shortcut: '/logo_basma.png',
      apple: '/logo_basma.png',
    },
  };
}


export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body
        className={`${poppins.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <FuturisticBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}

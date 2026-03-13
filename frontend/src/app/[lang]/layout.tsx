import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
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

  // JSON-LD for Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Basma Learning",
    "url": "https://basmalearning.com",
    "logo": "https://basmalearning.com/logo_basma.png",
    "description": lang === 'fr' 
      ? "Basma est une entreprise d'apprentissage et de développement tournée vers l'avenir, engagée à transformer la formation professionnelle en Algérie."
      : "Basma is a forward-thinking learning and development enterprise committed to transforming professional education across Algeria.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DZ",
      "addressLocality": "Algiers" // You can update this with a more specific address if needed
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@basma.education",
      "contactType": "customer service",
      "availableLanguage": ["English", "French", "Arabic"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/ba%E1%B9%A3ma-%D8%A8%D8%B5%D9%85%D8%A9/" // Add other social links here
    ]
  };

  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${poppins.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZD0N528TTM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZD0N528TTM');
          `}
        </Script>
        <FuturisticBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}

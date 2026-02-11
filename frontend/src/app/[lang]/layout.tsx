import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import FuturisticBackground from "@/components/FuturisticBackground";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Basma - Your Learning Partner",
  description: "Basma is a forward-thinking learning and development enterprise committed to transforming professional education across the Middle East and North Africa.",
  metadataBase: new URL('https://basmalearning.com'),
  openGraph: {
    title: "Basma - Your Learning Partner",
    description: "Basma is a forward-thinking learning and development enterprise committed to transforming professional education across the Middle East and North Africa.",
    url: 'https://basmalearning.com',
    siteName: 'Basma Learning',
    images: [
      {
        url: '/logo_basma.png', // Ensure this image is high quality and square or 1.91:1 ratio
        width: 800,
        height: 600,
        alt: 'Basma Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/logo_basma.png',
    shortcut: '/logo_basma.png',
    apple: '/logo_basma.png',
  },
};

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

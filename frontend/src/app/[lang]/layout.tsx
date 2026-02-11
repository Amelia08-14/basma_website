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
  description: "Your learning partner for business performance.",
  icons: {
    icon: '/logo_basma.png',
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

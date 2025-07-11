import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/style/globals.css";
import Script from 'next/script';
import AnalyticsProvider from "@/lib/analytics-provider";

// Font Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// SEO Metadata
export const metadata: Metadata = {
  title: "UPLIFT",
  description: "Uplift your Business with IT Solutions",
  keywords: ["UPLIFT", "CMS", "ระบบจัดการเว็บไซต์", "Next.js", "Prisma", "Tailwind"],
  authors: [{ name: "Uplift Team" }],
  creator: "UPLIFT",
  metadataBase: new URL("https://uplifttech.dev"),
  openGraph: {
    title: "UPLIFT CMS",
    description: "Uplift your Business with IT Solutions",
    url: "https://uplifttech.dev",
    siteName: "UPLIFT",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body
        className={`${inter.variable} antialiased w-full overflow-hidden`}
      >
        {/* Google Analytics - Global Site Tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <AnalyticsProvider />

        {/* Main content */}
        <div>
          {children}
        </div>

      </body>
    </html>
  );
}

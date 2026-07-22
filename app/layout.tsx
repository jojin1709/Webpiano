import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://webpiano-three.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Web Piano — Play, Learn, and Record Piano Online",
    template: "%s · Web Piano",
  },
  description:
    "Play piano directly from your keyboard. Learn songs, practice scales, record performances, and master piano online — free, in your browser.",
  keywords: [
    "web piano",
    "online piano",
    "virtual piano",
    "learn piano online",
    "piano keyboard app",
    "chord detector",
  ],
  authors: [{ name: "Web Piano" }],
  openGraph: {
    title: "Web Piano — Play, Learn, and Record Piano Online",
    description:
      "Play piano directly from your keyboard. Learn songs, practice scales, record performances, and master piano online.",
    url: SITE_URL,
    siteName: "Web Piano",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Piano — Play, Learn, and Record Piano Online",
    description:
      "Play piano directly from your keyboard. Learn songs, practice scales, record performances, and master piano online.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Web Piano",
    url: SITE_URL,
    applicationCategory: "MusicApplication",
    operatingSystem: "Any (web browser)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Play piano directly from your keyboard. Learn songs, practice scales, record performances, and master piano online.",
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#c89b5d" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Web Piano" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

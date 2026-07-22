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
    default: "Web Piano — Free Online Piano | Play, Learn & Record Piano in Browser",
    template: "%s | Web Piano — Free Online Piano",
  },
  description:
    "Play piano online for free directly from your keyboard. Learn songs with 28 built-in tracks, practice with scoring, record performances, detect chords in real time, and export as MIDI or MP3 — all in your browser, no download needed.",
  keywords: [
    // Primary keywords
    "piano",
    "online piano",
    "piano online",
    "web piano",
    "piano web",
    "play piano",
    "play piano online",
    "free piano",
    "free online piano",
    "virtual piano",
    "digital piano online",
    // Feature keywords
    "piano keyboard",
    "piano app",
    "piano app online",
    "learn piano",
    "learn piano online",
    "piano lessons",
    "piano lessons online",
    "piano tutorial",
    "piano practice",
    "piano practice online",
    "chord detector",
    "piano chords",
    "learn piano chords",
    "record piano",
    "record piano online",
    "MIDI piano",
    "piano MIDI",
    "piano sheet music",
    "piano notes",
    // Long-tail keywords
    "play piano online free",
    "free piano app online",
    "piano keyboard online free",
    "learn to play piano online",
    "piano for beginners",
    "online piano keyboard",
    "browser piano",
    "piano in browser",
    "no download piano",
    "piano without download",
    "music app online",
    "online music instrument",
    "interactive piano",
    "realistic piano online",
    // Misspellings & variations
    "pinano online",
    "pino online",
    "piano onlien",
    "piano onlie",
    "piano onlin",
    "pianoo",
    "piano",
    "piano app free",
    "free virtual piano",
    "online keyboard piano",
  ],
  authors: [{ name: "JOJIN JOHN", url: "https://www.linkedin.com/in/jojin-john-74386b34a/" }],
  creator: "JOJIN JOHN",
  publisher: "Web Piano",
  openGraph: {
    title: "Web Piano — Free Online Piano | Play, Learn & Record in Browser",
    description:
      "Play piano online for free. Learn 28 songs, practice with scoring, record and export as MIDI/MP3. Real piano sounds, chord detection, and sheet music — all in your browser.",
    url: SITE_URL,
    siteName: "Web Piano",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/screenshot.png`,
        width: 1200,
        height: 630,
        alt: "Web Piano - Free Online Piano App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Piano — Free Online Piano | Play, Learn & Record",
    description:
      "Play piano online for free. 28 songs, chord detection, recording, MIDI export. Learn piano in your browser.",
    images: [`${SITE_URL}/screenshot.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "",
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
      "Play piano online for free. Learn songs, practice scales, record performances, detect chords, and export as MIDI or MP3 — all in your browser.",
    featureList: [
      "Play piano with computer keyboard",
      "28 built-in songs across difficulty levels",
      "Chord and scale detection",
      "Record and export as MIDI, MP3, JSON, or CSV",
      "Sheet music display",
      "Practice mode with scoring",
      "Interactive piano lessons",
      "Dark mode and responsive design",
    ],
    screenshot: `${SITE_URL}/screenshot.png`,
    applicationSuite: "Web Piano",
    browserRequirements: "Requires a modern web browser with Web Audio API support",
    softwareVersion: "1.0",
    datePublished: "2026-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Web Piano free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every feature — songs, practice mode, recording, and lessons — is free forever, with no account required.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a MIDI keyboard?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Your computer keyboard plays the piano out of the box. A mouse or touchscreen works too, and MIDI-controller support is also available.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download my recordings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — the Recorder captures every note you play and lets you export as MIDI, MP3, JSON, or CSV files.",
        },
      },
      {
        "@type": "Question",
        name: "Does it work on mobile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Web Piano is fully responsive and touch-enabled. It also supports PWA installation on phones and tablets.",
        },
      },
      {
        "@type": "Question",
        name: "How realistic is the piano sound?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We use sampled recordings of a real grand piano across the full keyboard range, providing warm, realistic tone.",
        },
      },
    ],
  };

  const howToStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Play Piano Online for Free",
    description: "Learn to play piano online using your computer keyboard with Web Piano.",
    step: [
      {
        "@type": "HowToStep",
        name: "Open Web Piano",
        text: "Visit webpiano-three.vercel.app in your browser. No download or installation required.",
      },
      {
        "@type": "HowToStep",
        name: "Start Playing",
        text: "Press the keys A, W, S, E, D, F, T, G, Y, H, U, J on your keyboard to play piano notes.",
      },
      {
        "@type": "HowToStep",
        name: "Learn Songs",
        text: "Switch to the Songs tab to browse 28 songs or use the Learn tab for guided lessons.",
      },
      {
        "@type": "HowToStep",
        name: "Practice and Record",
        text: "Use Practice mode to play along with scoring, and the Recorder to capture and export your performances.",
      },
    ],
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#c89b5d" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Web Piano" />
        <meta name="application-name" content="Web Piano" />
        <meta name="msapplication-TileColor" content="#c89b5d" />
        <meta property="og:site_name" content="Web Piano" />
        <meta property="og:locale" content="en_US" />
        <meta name="apple-mobile-web-app-status-bar" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="canonical" href="https://webpiano-three.vercel.app" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

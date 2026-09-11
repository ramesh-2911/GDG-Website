/**
 * layout.tsx — GDG On Campus IIE
 * Root layout: fonts, metadata, viewport, and global providers
 */

import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// ---------------------------------------------------------------------------
// Font Configuration
// Note: Google Sans is not in next/font/google — we load it via @import in
// globals.css. Roboto is loaded here via next/font for optimal performance.
// ---------------------------------------------------------------------------
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

// ---------------------------------------------------------------------------
// Metadata — SEO & Open Graph
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://gdgiie.dev"
  ),
  title: {
    default: "GDG On Campus IIE — Build. Learn. Connect.",
    template: "%s | GDG On Campus IIE",
  },
  description:
    "Google Developer Groups On Campus at IIE — a community of passionate students building, learning, and connecting through Google technologies. Join us for workshops, hackathons, and tech talks.",
  keywords: [
    "GDG",
    "Google Developer Groups",
    "IIE",
    "developer community",
    "Flutter",
    "Firebase",
    "Android",
    "Google Cloud",
    "hackathon",
    "tech community",
    "student developers",
  ],
  authors: [{ name: "GDG On Campus IIE" }],
  creator: "GDG On Campus IIE",
  publisher: "GDG On Campus IIE",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://gdgiie.dev",
    siteName: "GDG On Campus IIE",
    title: "GDG On Campus IIE — Build. Learn. Connect.",
    description:
      "A community of passionate student developers at IIE building with Google technologies.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GDG On Campus IIE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GDG On Campus IIE",
    description: "Build. Learn. Connect. Join our developer community at IIE.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4285F4",
};

// ---------------------------------------------------------------------------
// Root Layout Component
// ---------------------------------------------------------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}

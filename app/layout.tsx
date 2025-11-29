import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageTransition } from "@/components/motion/PageTransition";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Debuild Architecture - Crafting Spaces That Inspire",
    template: "%s | Debuild Architecture"
  },
  description: "Award-winning architectural design firm specializing in residential, commercial, and sustainable building projects. Transform your vision into reality with Kenya's premier architects.",
  keywords: ["architecture", "architectural design", "residential", "commercial", "sustainable building", "kenya architecture", "building design"],
  authors: [{ name: "Debuild Architecture Team" }],
  creator: "Debuild Architecture",
  publisher: "Debuild Architecture",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: defaultUrl,
    title: "Debuild Architecture - Crafting Spaces That Inspire",
    description: "Award-winning architectural design firm specializing in residential, commercial, and sustainable building projects.",
    siteName: "Debuild Architecture",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Debuild Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Debuild Architecture - Crafting Spaces That Inspire",
    description: "Award-winning architectural design firm specializing in residential, commercial, and sustainable building projects.",
    images: ["/twitter-image.png"],
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
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased`}
        suppressHydrationWarning
      >
        <StructuredData type="organization" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <PageTransition>
              {children}
            </PageTransition>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}

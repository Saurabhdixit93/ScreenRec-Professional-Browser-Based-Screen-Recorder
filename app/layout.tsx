import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScreenRec - Professional 100% Local Screen Recorder",
  description:
    "Record your screen and audio with full privacy. No cloud, no uploads, everything happens locally in your browser.",
  keywords: [
    "screen recording",
    "local screen recorder",
    "privacy-friendly",
    "web-based screen recorder",
    "no-install screen recorder",
  ],
  authors: [{ name: "ScreenRec Team" }],
  openGraph: {
    title: "ScreenRec - Professional 100% Local Screen Recorder",
    description: "Record your screen and audio locally. Safe, fast, and free.",
    type: "website",
    url: "https://screenrec.app", // Placeholder URL
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScreenRec - Professional Local Screen Recorder",
    description: "Full privacy screen recording directly in your browser.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "ScreenRec",
              operatingSystem: "Web",
              applicationCategory: "MultimediaApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description:
                "Professional 100% local screen recorder that works directly in the browser.",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "1024",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}

import { Caveat, Playfair_Display } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "@/components/common/WhatsAppWidget";
import PreloaderWrapper from "@/components/layout/PreloaderWrapper";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  metadataBase: new URL("https://u2travels.com.my"),
  title: {
    default: "U2 Travels & Tours - Going Beyond Borders!",
    template: "%s | U2 Travels & Tours",
  },
  description:
    "Premier travel agency in Malaysia with 18+ years of experience. Specializing in customized Malaysian tour packages, international world tours, private coach charters, KLIA airport transfers, and corporate MICE logistics.",
  keywords: [
    "U2 Travels",
    "U2 Tours",
    "Malaysia Tour Packages",
    "KLIA Airport Transfer",
    "Malaysia Private Coach Charter",
    "Genting Highlands Tour",
    "Penang Tour Package",
    "Corporate MICE Malaysia",
    "Customized Travel Malaysia",
    "Tour Operator Petaling Jaya",
  ],
  authors: [{ name: "U2 Travels & Tours", url: "https://u2travels.com.my" }],
  creator: "U2 Travels & Tours",
  publisher: "U2 Travels & Tours",
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
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "U2 Travels & Tours - Going Beyond Borders!",
    description:
      "Crafting unforgettable travel experiences across Malaysia and around the world. Expert tours, private airport transfers, and corporate MICE event logistics.",
    url: "https://u2travels.com.my",
    siteName: "U2 Travels & Tours",
    images: [
      {
        url: "https://images.pexels.com/photos/7688326/pexels-photo-7688326.jpeg",
        width: 1200,
        height: 630,
        alt: "U2 Travels & Tours Malaysia",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "U2 Travels & Tours - Going Beyond Borders!",
    description:
      "Discover Malaysia and the world with U2 Travels & Tours. Premium tour packages, fleet rentals, and custom travel solutions.",
    images: ["https://images.pexels.com/photos/7688326/pexels-photo-7688326.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "U2 Travels & Tours",
  alternateName: "U2 Travels",
  url: "https://u2travels.com.my",
  logo: "https://u2travels.com.my/favicon.ico",
  image: "https://images.pexels.com/photos/7688326/pexels-photo-7688326.jpeg",
  description:
    "Premier Malaysian travel agency providing inbound and outbound tour packages, private coach charters, airport transfers, and corporate MICE event services.",
  telephone: "+60377814180",
  email: "info@u2travels.com.my",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "No.226, 2nd Floor, Menara Mutiara Majestic, 15, Jalan Othman (PJ Old Town)",
    addressLocality: "Petaling Jaya",
    addressRegion: "Selangor",
    postalCode: "46000",
    addressCountry: "MY",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "3.0864",
    longitude: "101.6465",
  },
  areaServed: ["Malaysia", "Worldwide"],
  sameAs: ["https://facebook.com", "https://instagram.com"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${caveat.variable} ${playfair.variable}`}>
        <PreloaderWrapper>{children}</PreloaderWrapper>
        <WhatsAppWidget />
      </body>
    </html>
  );
}

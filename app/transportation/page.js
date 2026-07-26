import Footer from "@/components/layout/Footer";
import Header2 from "@/components/layout/Header2";
import TransportationSection from "@/components/transportation/TransportationSection";

export const metadata = {
  title: "Transportation & Airport Transfers",
  description:
    "Book reliable KLIA airport transfers, luxury MPVs, private sedans, and 44-seater tour coaches across Malaysia (KL, Genting, Penang, Melaka, Langkawi). Direct rates & instant WhatsApp booking.",
  keywords: [
    "KLIA Airport Transfer",
    "Malaysia Coach Charter",
    "Genting Highlands Transport",
    "Penang Private Van Rental",
    "Luxury MPV Transfer KL",
    "Malaysia Bus Charter Services",
  ],
  alternates: {
    canonical: "https://u2travels.com.my/transportation",
  },
  openGraph: {
    title: "Transportation & Airport Transfers | U2 Travels & Tours",
    description:
      "Reliable airport transfers, private car rentals, and luxury coach charters across Malaysia. Easy route pricing and instant booking.",
    url: "https://u2travels.com.my/transportation",
  },
};

const transportJsonLd = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "U2 Travels Ground Transportation & Coach Rental",
  provider: {
    "@type": "TravelAgency",
    name: "U2 Travels & Tours",
    url: "https://u2travels.com.my",
  },
  areaServed: {
    "@type": "Country",
    name: "Malaysia",
  },
  serviceType: [
    "Airport Transfer",
    "Private Coach Charter",
    "Intercity Transfer",
    "Luxury MPV Rental",
  ],
  termsOfService: "https://u2travels.com.my/terms",
  url: "https://u2travels.com.my/transportation",
};

export default function TransportationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(transportJsonLd) }}
      />
      <Header2 />
      <main className="main-wrapper">
        <TransportationSection />
      </main>
      <Footer />
    </>
  );
}

import BottomCTASection from "@/components/home/BottomCTASection";
import Footer from "@/components/layout/Footer";
import Header2 from "@/components/layout/Header2";
import ToursPage from "@/components/tours/ToursPage";

import { tours as localTours } from "@/data/tours";

export const metadata = {
  title: "Tour Packages & Vacation Deals",
  description:
    "Explore top-rated Malaysia tour packages and international world holidays with U2 Travels & Tours. Sightseeing, highlands, beach getaways & custom itineraries.",
  keywords: [
    "Malaysia Tour Packages",
    "World Tour Packages",
    "Genting Highlands Holiday",
    "Penang Heritage Tour",
    "Kota Kinabalu Sabah Package",
    "Sightseeing Tours Malaysia",
  ],
  alternates: {
    canonical: "https://u2travels.com.my/tours",
  },
  openGraph: {
    title: "Tour Packages & Vacation Deals | U2 Travels & Tours",
    description:
      "Find your dream holiday with U2 Travels & Tours. Premium Malaysian sight-seeing, luxury island getaways, and world tour packages.",
    url: "https://u2travels.com.my/tours",
  },
};

export default async function ToursListingPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const category = resolvedParams?.category || resolvedParams?.type || "all";
  const search = resolvedParams?.search || resolvedParams?.destination || "";

  const toursListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "U2 Travels Featured Tour Packages",
    description: "Curated list of inbound and outbound tour packages.",
    numberOfItems: localTours.length,
    itemListElement: localTours.map((tour, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tour.name,
      url: `https://u2travels.com.my/tours/${tour.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toursListJsonLd) }}
      />
      <Header2 isSolid={true} />
      <main className="main-wrapper">
        <ToursPage initialCategory={category} initialSearch={search} />
        <BottomCTASection />
      </main>
      <Footer />
    </>
  );
}

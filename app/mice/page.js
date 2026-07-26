import BottomCTASection from "@/components/home/BottomCTASection";
import Footer from "@/components/layout/Footer";
import Header2 from "@/components/layout/Header2";
import MiceSection from "@/components/mice/MiceSection";

export const metadata = {
  title: "MICE Corporate Travel & Event Logistics",
  description:
    "End-to-end MICE (Meetings, Incentives, Conferences, Exhibitions) event planning, corporate retreats, VIP transfers, and trade show logistics in Malaysia by U2 Travels & Tours.",
  keywords: [
    "MICE Tourism Malaysia",
    "Corporate Event Travel Malaysia",
    "Company Incentive Trip KL",
    "Conference Logistics Malaysia",
    "Executive Board Retreat Planning",
  ],
  alternates: {
    canonical: "https://u2travels.com.my/mice",
  },
  openGraph: {
    title: "MICE Corporate Travel & Event Logistics | U2 Travels & Tours",
    description:
      "Premier MICE event planning and management in Malaysia. Board retreats, corporate conferences, incentive travel, and exhibition logistics.",
    url: "https://u2travels.com.my/mice",
  },
};

const miceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "U2 Travels Corporate MICE Services",
  provider: {
    "@type": "TravelAgency",
    name: "U2 Travels & Tours",
    url: "https://u2travels.com.my",
  },
  serviceType: "Corporate Event & Travel Management",
  description:
    "Professional management for Meetings, Incentives, Conferences, and Exhibitions (MICE) in Malaysia.",
  areaServed: {
    "@type": "Country",
    name: "Malaysia",
  },
  url: "https://u2travels.com.my/mice",
};

export default function MicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(miceJsonLd) }}
      />
      <Header2 />
      <main className="main-wrapper">
        <MiceSection />
        <BottomCTASection />
      </main>
      <Footer />
    </>
  );
}

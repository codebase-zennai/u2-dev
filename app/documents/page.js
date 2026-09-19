import Header2 from "@/components/layout/Header2";
import Footer from "@/components/layout/Footer";
import DocumentViewerSection from "@/components/documents/DocumentViewerSection";
import { getAvailableDocuments } from "@/lib/documents";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Official Documents & Transfer Rates",
  description:
    "View and download official U2 Travels & Tours transfer rates, airport transit tariffs, corporate coach charter tariffs, and company brochures.",
  keywords: [
    "U2 Travels Rates",
    "Transfer Rates Malaysia",
    "KLIA Airport Transfer Tariff",
    "Coach Charter Rates Malaysia",
    "U2 Travels Documents",
    "Official Rates PDF",
  ],
  alternates: {
    canonical: "https://u2travels.com.my/documents",
  },
  openGraph: {
    title: "Official Documents & Transfer Rates | U2 Travels & Tours",
    description:
      "Access official transfer rates, coach charter tariffs, and travel service sheets from U2 Travels & Tours Malaysia.",
    url: "https://u2travels.com.my/documents",
  },
};

const documentsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Official Documents & Transfer Rates | U2 Travels & Tours",
  url: "https://u2travels.com.my/documents",
  description:
    "Access, preview, and download official tariff sheets and travel documents from U2 Travels & Tours Malaysia.",
  publisher: {
    "@type": "TravelAgency",
    name: "U2 Travels & Tours",
    url: "https://u2travels.com.my",
  },
};

export default function DocumentsPage() {
  const documents = getAvailableDocuments();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(documentsJsonLd) }}
      />
      <Header2 isSolid={true} />
      <main className="main-wrapper">
        <DocumentViewerSection initialDocuments={documents} />
      </main>
      <Footer />
    </>
  );
}

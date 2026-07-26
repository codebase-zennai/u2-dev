import BottomCTASection from "@/components/home/BottomCTASection";
import ToursSection from "@/components/home/ToursSection";
import FAQsSection from "@/components/home/FAQsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HeroSection from "@/components/home/HeroSection";
import HeroSection2 from "@/components/home/HeroSection2";
import AboutUsSection from "@/components/home/AboutUsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import Footer from "@/components/layout/Footer";
import Header2 from "@/components/layout/Header2";

export const metadata = {
  title: "U2 Travels & Tours | Malaysia Tour Packages & Airport Transfers",
  description:
    "Explore Malaysia & global destinations with U2 Travels & Tours. 18+ years of trusted experience offering KLIA airport transfers, Genting Highlands tours, Penang packages, and corporate MICE travel.",
  keywords: [
    "U2 Travels",
    "Malaysia Tours",
    "KLIA Transfer",
    "Genting Tour",
    "Penang Travel Package",
    "Corporate Travel Malaysia",
  ],
  alternates: {
    canonical: "https://u2travels.com.my",
  },
  openGraph: {
    title: "U2 Travels & Tours | Malaysia Tour Packages & Airport Transfers",
    description:
      "Explore Malaysia & global destinations with U2 Travels & Tours. 18+ years of trusted experience offering airport transfers, tour packages, and private bus rentals.",
    url: "https://u2travels.com.my",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "U2 Travels & Tours",
  url: "https://u2travels.com.my",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://u2travels.com.my/tours?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <div className="page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Header2 />
      <main>
        <HeroSection2 />
        <NewsletterSection />
        <ToursSection />
        <AboutUsSection />
        <TestimonialsSection />
        <FAQsSection />
        <BottomCTASection />
      </main>
      <Footer />
    </div>
  );
}

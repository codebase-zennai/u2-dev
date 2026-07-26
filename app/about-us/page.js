import AboutHeroSection from "@/components/about/AboutHeroSection";
import HistorySection from "@/components/about/HistorySection";
import TeamSection from "@/components/about/TeamSection";
import GallerySection from "@/components/about/GallerySection";
import StaffSection from "@/components/about/StaffSection";
import BottomCTASection from "@/components/home/BottomCTASection";
import Footer from "@/components/layout/Footer";
import Header2 from "@/components/layout/Header2";

export const metadata = {
  title: "About Us",
  description:
    "Learn about U2 Travels & Tours, founded in 2008 by Executive Director K. Jai Kishen with 18+ years of expertise delivering seamless tours and logistics across Malaysia and globally.",
  keywords: [
    "About U2 Travels",
    "K. Jai Kishen",
    "Malaysian Tour Operator History",
    "MATTA License KPL 5834",
    "Travel Agency Petaling Jaya",
  ],
  alternates: {
    canonical: "https://u2travels.com.my/about-us",
  },
  openGraph: {
    title: "About Us | U2 Travels & Tours",
    description:
      "Founded in 2008, U2 Travels & Tours provides personalized travel, coach charters, and tour packages across Malaysia and worldwide.",
    url: "https://u2travels.com.my/about-us",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About U2 Travels & Tours",
  url: "https://u2travels.com.my/about-us",
  description:
    "U2 Travels & Tours was founded in 2008 with a mission to deliver personalized travel experiences across Malaysia and internationally.",
  mainEntity: {
    "@type": "Organization",
    name: "U2 Travels & Tours",
    founder: {
      "@type": "Person",
      name: "K. Jai Kishen",
      jobTitle: "Executive Director",
    },
    foundingDate: "2008-11-27",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Header2 isSolid={true} />
      <main className="main-wrapper">
        <AboutHeroSection />
        <HistorySection />
        <TeamSection />
        {/* <GallerySection /> */}
        <StaffSection />
        <BottomCTASection />
      </main>
      <Footer />
    </>
  );
}

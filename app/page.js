import BottomCTASection from "@/components/home/BottomCTASection";
import CoachesSection from "@/components/home/CoachesSection";
import FAQsSection from "@/components/home/FAQsSection";
import HeroSection from "@/components/home/HeroSection";
import HeroSection2 from "@/components/home/HeroSection2";
import LocationsSection from "@/components/home/LocationsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Header2 from "@/components/layout/Header2";

export default function Home() {
  return (
    <div className="page-wrapper">
      <Header2 />
      <main>
        <HeroSection2 />
        <NewsletterSection />
        <CoachesSection />
        <LocationsSection />
        <FAQsSection />
        <BottomCTASection />
      </main>
      <Footer />
    </div>
  );
}

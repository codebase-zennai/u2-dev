import BottomCTASection from "@/components/home/BottomCTASection";
import CoachesSection from "@/components/home/CoachesSection";
import FAQsSection from "@/components/home/FAQsSection";
import HeroSection from "@/components/home/HeroSection";
import LocationsSection from "@/components/home/LocationsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="page-wrapper">
      <Header />
      <main>
        <HeroSection />
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

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

export default function Home() {
  return (
    <div className="page-wrapper">
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

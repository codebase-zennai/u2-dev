import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import CoachesSection from '@/components/home/CoachesSection';
import LocationsSection from '@/components/home/LocationsSection';
import FAQsSection from '@/components/home/FAQsSection';
import BottomCTASection from '@/components/home/BottomCTASection';

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

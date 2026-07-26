import AboutHeroSection from "@/components/about/AboutHeroSection";
import HistorySection from "@/components/about/HistorySection";
import TeamSection from "@/components/about/TeamSection";
import GallerySection from "@/components/about/GallerySection";
import StaffSection from "@/components/about/StaffSection";
import BottomCTASection from "@/components/home/BottomCTASection";
import Footer from "@/components/layout/Footer";
import Header2 from "@/components/layout/Header2";

export const metadata = {
  title: "About Us | U2 Travels & Tours",
  description:
    "Learn about U2 Travels & Tours, founded in 2008 with 18+ years of experience in the travel industry. Going Beyond Borders!",
};

export default function AboutPage() {
  return (
    <>
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

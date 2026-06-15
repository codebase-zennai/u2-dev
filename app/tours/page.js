import BottomCTASection from "@/components/home/BottomCTASection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ToursPage from "@/components/tours/ToursPage";

export const metadata = {
  title: "Tour Packages | U2 Travels & Tours",
  description:
    "Discover our premium tour packages in Malaysia and around the world. Find your perfect travel gateway with U2 Travels & Tours.",
};

export default function ToursListingPage() {
  return (
    <>
      <Header />
      <main className="main-wrapper">
        <ToursPage />
        <BottomCTASection />
      </main>
      <Footer />
    </>
  );
}

import BottomCTASection from "@/components/home/BottomCTASection";
import Footer from "@/components/layout/Footer";
import Header2 from "@/components/layout/Header2";
import ToursPage from "@/components/tours/ToursPage";

export const metadata = {
  title: "Tour Packages | U2 Travels & Tours",
  description:
    "Discover our premium tour packages in Malaysia and around the world. Find your perfect travel gateway with U2 Travels & Tours.",
};

export default function ToursListingPage({ searchParams }) {
  const category = searchParams?.category || "all";
  return (
    <>
      <Header2 isSolid={true} />
      <main className="main-wrapper">
        <ToursPage initialCategory={category} />
        <BottomCTASection />
      </main>
      <Footer />
    </>
  );
}

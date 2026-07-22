import BottomCTASection from "@/components/home/BottomCTASection";
import Footer from "@/components/layout/Footer";
import Header2 from "@/components/layout/Header2";
import MiceSection from "@/components/mice/MiceSection";

export const metadata = {
  title: "MICE Services | U2 Travels & Tours",
  description:
    "Discover premier MICE (Meetings, Incentives, Conferences, Exhibitions) planning and execution services by U2 Travels & Tours. Tailored corporate travel and logistics.",
};

export default function MicePage() {
  return (
    <>
      <Header2 />
      <main className="main-wrapper">
        <MiceSection />
        <BottomCTASection />
      </main>
      <Footer />
    </>
  );
}

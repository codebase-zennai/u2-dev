import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/layout/Footer";
import Header2 from "@/components/layout/Header2";

export const metadata = {
  title: "Contact | U2 Travels & Tours",
  description:
    "Get in touch with U2 Travels & Tours. Book a tour, enquire about packages, or arrange transportation services in Malaysia.",
};

export default function ContactPage() {
  return (
    <>
      <Header2 isSolid={true} />
      <main className="main-wrapper">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

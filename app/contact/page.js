import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/layout/Footer";
import Header2 from "@/components/layout/Header2";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with U2 Travels & Tours in Petaling Jaya, Malaysia. Book tour packages, inquire about fleet charters, or request corporate travel quotes.",
  keywords: [
    "Contact U2 Travels",
    "U2 Travels Petaling Jaya Address",
    "U2 Travels Phone Number",
    "Malaysia Travel Agency Contact",
  ],
  alternates: {
    canonical: "https://u2travels.com.my/contact",
  },
  openGraph: {
    title: "Contact Us | U2 Travels & Tours",
    description:
      "Contact U2 Travels & Tours for enquiries, tour bookings, and custom travel solutions in Malaysia.",
    url: "https://u2travels.com.my/contact",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact U2 Travels & Tours",
  url: "https://u2travels.com.my/contact",
  mainEntity: {
    "@type": "TravelAgency",
    name: "U2 Travels & Tours",
    telephone: "+60377814180",
    email: "info@u2travels.com.my",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "No.226, 2nd Floor, Menara Mutiara Majestic, 15, Jalan Othman (PJ Old Town)",
      addressLocality: "Petaling Jaya",
      addressRegion: "Selangor",
      postalCode: "46000",
      addressCountry: "MY",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Header2 isSolid={true} />
      <main className="main-wrapper">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

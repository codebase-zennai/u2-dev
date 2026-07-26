import Footer from "@/components/layout/Footer";
import Header2 from "@/components/layout/Header2";
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Terms & Conditions for U2 Travels & Tours. Review booking policies, payments, and cancellation terms.",
  alternates: {
    canonical: "https://u2travels.com.my/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <Header2 isSolid={true} />
      <main className="main-wrapper">
        <section className="section is-hero-sub">
          <div className="container-large">
            <div className="max-width-700 margin-bottom-40 pt-24">
              <h1 className="heading-style-h1 text-color-white">
                Terms & Conditions
              </h1>
              <p className="text-size-large text-color-lightgrey">
                Last updated: October 2024
              </p>
            </div>
          </div>
        </section>
        <section className="section background-color-white">
          <div className="container-large">
            <div
              className="max-width-800 prose prose-lg"
              style={{ color: "var(--dark-grey)", padding: "4rem 0" }}
            >
              <h2 className="heading-style-h3 margin-bottom-24">
                1. Agreement to Terms
              </h2>
              <p className="margin-bottom-24">
                By accessing this website, you agree to be bound by these Terms
                and Conditions and agree that you are responsible for the
                agreement with any applicable local laws. If you disagree with
                any of these terms, you are prohibited from accessing this site.
              </p>

              <h2 className="heading-style-h3 margin-bottom-24">
                2. Booking and Payments
              </h2>
              <p className="margin-bottom-24">
                All bookings are subject to availability. A deposit is required
                to secure your booking. The remaining balance must be paid prior
                to the commencement of the tour as specified in your booking
                confirmation.
              </p>

              <h2 className="heading-style-h3 margin-bottom-24">
                3. Cancellations and Refunds
              </h2>
              <p className="margin-bottom-24">
                Cancellation policies vary depending on the tour package.
                Generally, cancellations made less than 14 days before departure
                are non-refundable. Please refer to your specific booking
                confirmation for exact cancellation terms.
              </p>

              <h2 className="heading-style-h3 margin-bottom-24">
                4. Liability
              </h2>
              <p className="margin-bottom-24">
                U2 Travels & Tours shall not be liable for any direct, indirect,
                incidental, consequential, or punitive damages arising out of
                your access to or use of the service. We are not responsible for
                any delays, changes in itinerary, or expenses incurred due to
                unforeseen circumstances such as weather conditions or flight
                delays.
              </p>

              <p className="margin-top-40">
                For questions regarding these terms, please contact us at{" "}
                <Link
                  href="mailto:info@u2travels.com.my"
                  className="text-color-green font-bold"
                >
                  info@u2travels.com.my
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

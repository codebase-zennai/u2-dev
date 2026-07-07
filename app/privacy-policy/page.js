import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | U2 Travels & Tours",
  description: "Privacy policy for U2 Travels & Tours.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="main-wrapper">
        <section className="section is-hero-sub">
          <div className="container-large">
            <div className="max-width-700 margin-bottom-40 pt-24">
              <h1 className="heading-style-h1 text-color-white">Privacy Policy</h1>
              <p className="text-size-large text-color-lightgrey">
                Last updated: October 2024
              </p>
            </div>
          </div>
        </section>
        <section className="section background-color-white">
          <div className="container-large">
            <div className="max-width-800 prose prose-lg" style={{ color: "var(--dark-grey)", padding: "4rem 0" }}>
              <h2 className="heading-style-h3 margin-bottom-24">1. Introduction</h2>
              <p className="margin-bottom-24">
                U2 Travels & Tours respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
              </p>

              <h2 className="heading-style-h3 margin-bottom-24">2. Data We Collect</h2>
              <p className="margin-bottom-24">
                We may collect, use, store and transfer different kinds of personal data about you, including:
              </p>
              <ul className="margin-bottom-24 list-disc pl-6">
                <li>Identity Data: First name, last name, title.</li>
                <li>Contact Data: Email address, telephone numbers.</li>
                <li>Transaction Data: Details about payments to and from you and other details of products and services you have purchased from us.</li>
              </ul>

              <h2 className="heading-style-h3 margin-bottom-24">3. How We Use Your Data</h2>
              <p className="margin-bottom-24">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to perform the contract we are about to enter into or have entered into with you, and to manage our relationship with you.
              </p>

              <h2 className="heading-style-h3 margin-bottom-24">4. Data Security</h2>
              <p className="margin-bottom-24">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed.
              </p>

              <p className="margin-top-40">
                For questions regarding this privacy policy, please contact us at <Link href="mailto:info@u2travels.com.my" className="text-color-green font-bold">info@u2travels.com.my</Link>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

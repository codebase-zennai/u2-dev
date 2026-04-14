import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/contact/ContactSection';

export const metadata = {
    title: 'Contact | U2 Tours & Travels',
    description: 'Get in touch with U2 Tours & Travels. Book a tour, enquire about packages, or arrange transportation services in Malaysia.',
};

export default function ContactPage() {
    return (
        <>
            <Header />
            <main className="main-wrapper">
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}

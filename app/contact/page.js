import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/contact/ContactSection';

export const metadata = {
    title: 'Contact | Elysian Tennis Academy',
    description: 'Get in touch with Elysian Tennis Academy. Book a court, join a class, or inquire about personalized coaching.',
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

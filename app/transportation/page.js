import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TransportationSection from '@/components/transportation/TransportationSection';

export const metadata = {
    title: 'Transportation & Transfers | U2 Tours & Travels',
    description: 'Airport transfers, city tours, and transportation services across Malaysia. Competitive rates from KLIA to KL, Genting, Melaka, and more.',
};

export default function TransportationPage() {
    return (
        <>
            <Header />
            <main className="main-wrapper">
                <TransportationSection />
            </main>
            <Footer />
        </>
    );
}

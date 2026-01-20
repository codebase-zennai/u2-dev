import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LocationsHeroSection from '@/components/locations/LocationsHeroSection';
import BottomCTASection from '@/components/home/BottomCTASection';

export const metadata = {
    title: 'Locations | Elysian Tennis Academy',
    description: 'Discover our tennis camp locations across the country. Find your perfect court at Elysian Tennis Academy.',
};

export default function LocationsPage() {
    return (
        <>
            <Header />
            <main className="main-wrapper">
                <LocationsHeroSection />
                <BottomCTASection />
            </main>
            <Footer />
        </>
    );
}

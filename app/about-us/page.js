import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AboutHeroSection from '@/components/about/AboutHeroSection';
import HistorySection from '@/components/about/HistorySection';
import StaffSection from '@/components/about/StaffSection';
import BottomCTASection from '@/components/home/BottomCTASection';

export const metadata = {
    title: 'About Us | U2 Tours & Travels',
    description: 'Learn about U2 Tours & Travels, founded in 2008 with over 25 years of experience in the travel industry. Going Beyond Borders!',
};

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="main-wrapper">
                <AboutHeroSection />
                <HistorySection />
                <StaffSection />
                <BottomCTASection />
            </main>
            <Footer />
        </>
    );
}

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AboutHeroSection from '@/components/about/AboutHeroSection';
import HistorySection from '@/components/about/HistorySection';
import StaffSection from '@/components/about/StaffSection';
import BottomCTASection from '@/components/home/BottomCTASection';

export const metadata = {
    title: 'About Us | Elysian Tennis Academy',
    description: 'Learn about Elysian Tennis Academy, our history, and meet our expert coaching staff.',
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

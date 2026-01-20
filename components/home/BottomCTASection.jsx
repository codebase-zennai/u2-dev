import Image from 'next/image';
import Link from 'next/link';

export default function BottomCTASection() {
    return (
        <section className="section is-bottom-cta">
            <div className="container-large">
                <div className="bottom-cta_wrap">
                    <div className="z-index-2 flex-center max-width-700">
                        <p className="text-size-eyebrow margin-bottom-20">Get Started</p>
                        <h2 className="heading-style-h2 margin-bottom-24">Ready to Rally?</h2>
                        <p className="text-size-large margin-bottom-40 max-width-440">
                            Join Elysian Tennis Academy and take your game to the next level. Book your first session today.
                        </p>
                        <div className="wrap_flex" style={{ gap: '1rem' }}>
                            <Link href="/contact" className="button">
                                Book a Session
                            </Link>
                            <Link href="/locations" className="button is-secondary">
                                View Locations
                            </Link>
                        </div>
                    </div>
                    <div className="bottom-cta_box">
                        <Image
                            src="/images/backgrounds/bg-cta.png"
                            alt="Tennis court CTA background"
                            fill
                            className="img-cover"
                            sizes="100vw"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

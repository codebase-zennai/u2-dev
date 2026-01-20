'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function BottomCTASection() {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate how far we've scrolled into the section
            const visibleAmount = windowHeight - rect.top;
            const sectionHeight = rect.height;
            const progress = Math.max(0, Math.min(1, visibleAmount / (sectionHeight * 0.7)));

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Image starts large (scale 1.3) and shrinks to normal (scale 1)
    const imageScale = 1.3 - (scrollProgress * 0.3);

    return (
        <section className="section is-bottom-cta" ref={sectionRef}>
            <div className="container-large">
                <div className="bottom-cta_wrap">
                    <div className="max-width-700">
                        <h2 className="heading-style-h1">
                            <span className="is-word is-1">Ready</span>{' '}
                            <span className="is-word is-2">to</span>
                            <br />
                            <span className="is-word is-3">Rally?</span>
                        </h2>
                    </div>
                    <div
                        className="bottom-cta_box"
                        style={{
                            transform: `scale(${imageScale})`,
                            transition: 'transform 0.1s ease-out'
                        }}
                    >
                        <div className="video_bg">
                            <div className="video_bg_overlay"></div>
                            <Image
                                src="/images/backgrounds/bg-cta.png"
                                alt="Tennis player"
                                fill
                                className="img-cover"
                                sizes="90vw"
                                priority
                            />
                        </div>
                    </div>
                    <div className="max-width-full">
                        <Link href="/contact" className="button is-secondary">
                            <p>Join a camp</p>
                            <Image
                                src="https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/670563f226883663736a6d20_icon-arrow-light.svg"
                                alt="Arrow"
                                width={16}
                                height={16}
                                className="icon-16"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

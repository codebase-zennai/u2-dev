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

            // Calculate scroll progress - starts when section enters viewport
            // Progress goes from 0 to 1 as we scroll through the section
            const sectionTop = rect.top;
            const triggerPoint = windowHeight * 0.8;

            if (sectionTop < triggerPoint) {
                const scrolled = triggerPoint - sectionTop;
                const maxScroll = windowHeight * 0.8;
                const progress = Math.min(1, scrolled / maxScroll);
                setScrollProgress(progress);
            } else {
                setScrollProgress(0);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // INVERSE of hero animation:
    // Image starts LARGE (filling the section) and SHRINKS to normal size on scroll
    // Initial scale: 1.15 (fills the section edge-to-edge)
    // Final scale: 0.85 (shows the image at proper size with rounded corners)
    const imageScale = 1.8 - (scrollProgress * 0.75); // 1.15 -> 0.85

    // Border radius INCREASES as we scroll (opposite of hero)
    const borderRadius = scrollProgress * 50; // 0px -> 50px

    return (
        <section className="section is-bottom-cta" ref={sectionRef}>
            <div className="container-large">
                <div className="bottom-cta_wrap">
                    <div className="max-width-700">
                        <h2 className="heading-style-h1">
                            <span className="is-word is-1">Ready</span>{' '}
                            <span className="is-word is-2">to</span>
                            <br />
                            <span className="is-word is-3">Travel?</span>
                        </h2>
                    </div>
                    <div
                        className="bottom-cta_box"
                        style={{
                            transform: `scale(${imageScale})`,
                            borderRadius: `${borderRadius}px`,
                            overflow: 'hidden'
                        }}
                    >
                        <div className="video_bg">
                            <div className="video_bg_overlay"></div>
                            <Image
                                src="https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/670953ea64560c0dcf25d3e5_tennis-image-08.avif"
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
                            <p>Book Now</p>
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

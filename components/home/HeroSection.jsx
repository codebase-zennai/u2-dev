'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function HeroSection() {
    const videoRef = useRef(null);
    const videoWallRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [titleVisible, setTitleVisible] = useState(false);

    useEffect(() => {
        // Animate title on load
        const timer = setTimeout(() => setTitleVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!videoWallRef.current) return;

            const rect = videoWallRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // video_wall is 300vh tall, sticky section is 100vh
            // Animation happens as we scroll through the extra 200vh
            const totalScrollDistance = windowHeight * 2; // 200vh of scroll
            const scrolled = Math.max(0, -rect.top);
            const progress = Math.min(1, scrolled / totalScrollDistance);

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // The video starts visible and smaller, then expands to fill the screen
    // Initial scale: 0.6 (shows video at 60% size with rounded corners visible)
    // Final scale: 1.15 (slightly larger than container to fill screen edge-to-edge)
    const videoScale = 0.6 + (scrollProgress * 0.55); // 0.6 -> 1.15

    // Border radius reduces as we scale up (rounded corners disappear)
    const borderRadius = (1 - scrollProgress) * 50; // 50px -> 0px

    return (
        <section className="section is-video">
            {/* Title section - OUTSIDE the video_wall */}
            <div className="container-large">
                <div className="flex-center">
                    <div className="max-width-700">
                        <h1 className="heading-style-h1">
                            <span
                                className="is-word is-1"
                                style={{
                                    opacity: titleVisible ? 1 : 0,
                                    transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                    transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
                                    display: 'inline-block'
                                }}
                            >
                                Swing
                            </span>{' '}
                            <span
                                className="is-word is-2"
                                style={{
                                    opacity: titleVisible ? 1 : 0,
                                    transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                    transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
                                    display: 'inline-block'
                                }}
                            >
                                with
                            </span>{' '}
                            <span
                                className="is-word is-3"
                                style={{
                                    opacity: titleVisible ? 1 : 0,
                                    transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                    transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
                                    display: 'inline-block'
                                }}
                            >
                                Confidence
                            </span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* Video wall with scroll animation */}
            <div className="video_wall" ref={videoWallRef}>
                <div className="video_section">
                    <div className="video_wrap">
                        <div
                            className="video_box"
                            style={{
                                transform: `scale(${videoScale})`,
                                borderRadius: `${borderRadius}px`,
                            }}
                        >
                            {/* Learn more button */}
                            <a href="#intro" className="video_btn">
                                <p className="heading-style-h3">Learn more</p>
                                <div className="video_play">
                                    <Image
                                        src="https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/6708ff6b2b6b950e69959c97_icon-arrow-down.svg"
                                        alt="Arrow down"
                                        width={16}
                                        height={16}
                                        className="icon-16"
                                    />
                                </div>
                            </a>

                            {/* Elevate your Game title */}
                            <div className="video_title">
                                <p className="heading-style-h2 is-title">
                                    <span
                                        className="is-word is-1"
                                        style={{
                                            opacity: titleVisible ? 1 : 0,
                                            transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                            transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
                                            display: 'inline-block'
                                        }}
                                    >
                                        Elevate
                                    </span>{' '}
                                    <span
                                        className="is-word is-2"
                                        style={{
                                            opacity: titleVisible ? 1 : 0,
                                            transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                            transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
                                            display: 'inline-block'
                                        }}
                                    >
                                        your
                                    </span>{' '}
                                    <span
                                        className="is-word is-3"
                                        style={{
                                            opacity: titleVisible ? 1 : 0,
                                            transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                            transition: 'opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s',
                                            display: 'inline-block'
                                        }}
                                    >
                                        Game
                                    </span>
                                </p>
                            </div>

                            {/* Video background */}
                            <div className="video_bg">
                                <div className="video_bg_overlay"></div>
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="video_bg_video"
                                    poster="https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b%2F670720d5112f313490c34fb9_5740607-uhd_4096_2160_25fps%20%281%29-poster-00001.jpg"
                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                >
                                    <source
                                        src="https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b%2F670720d5112f313490c34fb9_5740607-uhd_4096_2160_25fps%20%281%29-transcode.mp4"
                                        type="video/mp4"
                                    />
                                    <source
                                        src="https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b%2F670720d5112f313490c34fb9_5740607-uhd_4096_2160_25fps%20%281%29-transcode.webm"
                                        type="video/webm"
                                    />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

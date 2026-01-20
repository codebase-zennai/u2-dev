'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
    const videoRef = useRef(null);

    useEffect(() => {
        // Simple scroll-based scaling effect for the video box
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const videoWrap = document.querySelector('.video_wrap');
            if (videoWrap) {
                const scale = Math.max(0.9, 1 - scrollY * 0.0002);
                videoWrap.style.transform = `scale(${scale})`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="section is-video">
            <div className="video_wall">
                <div className="video_section">
                    <div className="video_wrap">
                        <div className="container-large flex-center margin-bottom-40">
                            <h1 className="heading-style-h1">
                                <span className="is-word">Swing</span>{' '}
                                <span className="is-word">with</span>{' '}
                                <span className="is-word">Confidence</span>
                            </h1>
                        </div>
                        <div className="video_box">
                            <div className="video_bg">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    poster="https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b%2F670720d5112f313490c34fb9_5740607-uhd_4096_2160_25fps%20%281%29-poster-00001.jpg"
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
                                <div className="video_bg_overlay"></div>
                            </div>
                            <a href="#" className="video_btn">
                                <div className="video_play">
                                    <div className="icon-16">
                                        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.5 2.5L12.5 8L3.5 13.5V2.5Z" fill="currentColor" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-size-small text-weight-medium">Play Video</div>
                            </a>
                            <h2 className="heading-style-h2 video_title">Elevate your Game</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

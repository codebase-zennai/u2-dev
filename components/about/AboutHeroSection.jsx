'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function AboutHeroSection() {
    const [titleVisible, setTitleVisible] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setTitleVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);
    return (
        <section className="section is-about-hero">
            <div className="container-large">
                <div className="about-hero_wrap">
                    <div className="about-hero_title-wrapper">
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
                                About
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
                                us
                            </span>
                        </h1>
                    </div>

                    {/* Hero Image */}
                    <div className="about-visual_wrap">
                        <div className="video_box">
                            <div className="video_bg">
                                <Image
                                    src="https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/67096674129bb1f7bfff8c3d_tennis-about.avif"
                                    alt="Tennis court"
                                    fill
                                    className="parallax-img is-full"
                                    sizes="(max-width: 991px) 81vw, 90vw"
                                    priority
                                    style={{ filter: 'brightness(1.15)' }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Description */}
                    <div className="w-layout-vflex flex-center" style={{ alignItems: 'center', textAlign: 'center' }}>
                        <div className="max-width-800" style={{ textAlign: 'center' }}>
                            <p
                                className="text-size-medium"
                                style={{
                                    opacity: titleVisible ? 1 : 0,
                                    transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                    transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
                                }}
                            >
                                Discover world-class tennis coaching, cutting-edge fitness training, and a supportive community dedicated to helping you succeed. Our expert team, top-tier facilities, and proven programs are designed to enhance your game at every level.
                            </p>
                        </div>
                        <div className="margin-top-24">
                            <Link
                                href="/contact"
                                className="button"
                                style={{
                                    opacity: titleVisible ? 1 : 0,
                                    transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                    transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
                                }}
                            >
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
            </div>
        </section>
    );
}
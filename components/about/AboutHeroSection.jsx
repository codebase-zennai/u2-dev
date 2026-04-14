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
                                U2
                            </span>
                        </h1>
                    </div>

                    {/* Hero Image */}
                    <div className="about-visual_wrap">
                        <div className="video_box">
                            <div className="video_bg">
                                <Image
                                    src="https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg"
                                    alt="Beautiful Malaysia travel destination"
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
                                Our main objective is to provide the most personalized service to ensure maximum customer satisfaction. With over 25 years of experience in the travel industry, U2 Travels delivers unforgettable tour experiences across Malaysia and the world.
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
                                <p>Contact Us</p>
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
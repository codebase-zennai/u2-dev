'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const historyItems = [
    {
        year: '2008',
        description: 'U2 Travels was born on 27th November under Executive Director K. Jai Kishen',
    },
    {
        year: '2010',
        description: 'Expanded inbound tour operations across all major Malaysian destinations',
    },
    {
        year: '2015',
        description: 'Launched world tour packages covering 9+ countries including Europe, Korea & Dubai',
    },
    {
        year: '2020',
        description: '60+ years collective management experience, serving groups from 2 to 500+ travelers',
    },
];

export default function HistorySection() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="section is-history" ref={sectionRef}>
            {/* Parallax Background */}
            <div className="parallax-wrap">
                <Image
                    src="https://images.pexels.com/photos/1538177/pexels-photo-1538177.jpeg"
                    alt="Malaysia landscape"
                    fill
                    className="parallax-img"
                    sizes="100vw"
                    style={{ filter: 'brightness(1.15)' }}
                />
                <div className="parallax-overlay is-full"></div>
            </div>

            <div className="z-index-2">
                <div className="container-large">
                    <div className="wrap_flex is-align-top">
                        {/* Title */}
                        <div className="max-width-440">
                            <h2>
                                <span
                                    className="is-word is-1 text-white"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                        transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
                                        display: 'inline-block'
                                    }}
                                >
                                    A
                                </span>{' '}
                                <span
                                    className="is-word is-2 text-white"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                        transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
                                        display: 'inline-block'
                                    }}
                                >
                                    Legacy
                                </span>{' '}
                                <span
                                    className="is-word is-3 text-white"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                        transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
                                        display: 'inline-block'
                                    }}
                                >
                                    of
                                </span>{' '}
                                <span
                                    className="is-word is-4 text-white"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                        transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
                                        display: 'inline-block'
                                    }}
                                >
                                    Travel
                                </span>{' '}
                                <span
                                    className="is-word is-5 text-white"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                        transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
                                        display: 'inline-block'
                                    }}
                                >
                                    Excellence
                                </span>
                            </h2>
                        </div>

                        {/* Content */}
                        <div className="max-width-440 is-full-responsive">
                            <div className="text-color-lightgrey">
                                <p
                                    className="text-size-medium"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                        transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
                                    }}
                                >
                                    The current management team has a collective experience of over 60 years in the travel & service industry. We are aggressively concentrating our efforts in promoting inbound tours to Malaysia — from cool hill stations and sunny beaches to lush green forest reserves and much more. U2 Travels can tailor-make tours to suit your heart&#39;s desire.
                                </p>

                                <div className="margin-top-40">
                                    <p
                                        className="text-size-eyebrow"
                                        style={{
                                            opacity: isVisible ? 1 : 0,
                                            transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                            transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
                                        }}
                                    >
                                        Our Journey
                                    </p>
                                    <div className="margin-top-16">
                                        <ul
                                            className="history_list"
                                            style={{
                                                opacity: isVisible ? 1 : 0,
                                                transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                                transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
                                            }}
                                        >
                                            {historyItems.map((item, index) => (
                                                <li key={index} className="history_item">
                                                    <div className="text-color-white">
                                                        <div className="heading-style-h4">{item.year}</div>
                                                    </div>
                                                    <p className="text-size-medium">{item.description}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

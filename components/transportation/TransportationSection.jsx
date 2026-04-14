'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const airportTransfers = [
    {
        id: 1,
        route: 'KLIA to Kuala Lumpur City Hotels',
        price: 'USD 28',
        description: 'Private transfer from KLIA/KLIA2 to any hotel in Kuala Lumpur city center.',
    },
    {
        id: 2,
        route: 'KLIA to Genting Highlands',
        price: 'USD 68',
        description: 'Direct transfer from the airport to the cool highlands of Genting.',
    },
    {
        id: 3,
        route: 'Kuala Lumpur to Melaka',
        price: 'USD 79',
        description: 'Comfortable transfer from KL to the historic UNESCO World Heritage city.',
    },
    {
        id: 4,
        route: 'Kuala Lumpur to Port Dickson',
        price: 'USD 58',
        description: 'Transfer to the beautiful beaches of Port Dickson from KL.',
    },
    {
        id: 5,
        route: 'Train Station to KL City Hotels',
        price: 'USD 19',
        description: 'Pick-up from KL Sentral or any major train station to your hotel.',
    },
];

const tourTransfers = [
    {
        id: 6,
        route: 'Genting Tours',
        duration: '8 Hrs',
        price: 'USD 68',
        description: 'Full day tour to Genting Highlands with flexible free time at the resort.',
        image: 'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        id: 7,
        route: 'Kuala Lumpur Night Tour',
        duration: '3 Hrs',
        price: 'USD 34',
        description: 'Experience the dazzling lights and vibrant nightlife of Kuala Lumpur.',
        image: 'https://images.pexels.com/photos/22804/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        id: 8,
        route: 'Kuala Lumpur City Tour',
        duration: '3.5 Hrs',
        price: 'USD 34',
        description: 'Discover iconic KL landmarks including Petronas Towers and Batu Caves.',
        image: 'https://images.pexels.com/photos/1538177/pexels-photo-1538177.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        id: 9,
        route: 'KL Country Tour',
        duration: '4 Hrs',
        price: 'USD 34',
        description: 'Explore the natural beauty and rural charm surrounding Kuala Lumpur.',
        image: 'https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        id: 10,
        route: 'Melaka Tour',
        duration: '8 Hrs',
        price: 'USD 113',
        description: 'Full day tour of Melaka covering Dutch Square, A Famosa, and Jonker Street.',
        image: 'https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        id: 11,
        route: 'Dinner Transfer',
        duration: 'Evening',
        price: 'USD 27',
        description: 'Round-trip transfer to popular dining destinations in KL.',
        image: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
];

export default function TransportationSection() {
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef(null);
    const transferRef = useRef(null);
    const tourRef = useRef(null);
    const [transferVisible, setTransferVisible] = useState(false);
    const [tourVisible, setTourVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === transferRef.current && entry.isIntersecting) {
                        setTransferVisible(true);
                    }
                    if (entry.target === tourRef.current && entry.isIntersecting) {
                        setTourVisible(true);
                    }
                });
            },
            { threshold: 0.15 }
        );
        if (transferRef.current) observer.observe(transferRef.current);
        if (tourRef.current) observer.observe(tourRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="tp-hero">
                <div className="tp-hero_bg">
                    <Image
                        src="https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        alt="Malaysia highway aerial view"
                        fill
                        className="img-cover"
                        sizes="100vw"
                        priority
                    />
                    <div className="tp-hero_overlay"></div>
                </div>
                <div className="container-large tp-hero_content">
                    <p
                        className="text-size-eyebrow tp-hero_eyebrow"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(1em)',
                            transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
                        }}
                    >
                        Getting You There
                    </p>
                    <h1
                        className="tp-hero_title"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(0.3em)',
                            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
                        }}
                    >
                        Transportation<br />&amp; Transfers
                    </h1>
                    <p
                        className="tp-hero_desc"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(1em)',
                            transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
                        }}
                    >
                        Reliable and comfortable transportation services across Malaysia.
                        From airport transfers to guided city tours.
                    </p>
                </div>
            </section>

            {/* Airport Transfers - Table Style */}
            <section className="section background-color-black" ref={transferRef}>
                <div className="container-large">
                    <div className="tp-section-header">
                        <div>
                            <p className="text-size-eyebrow margin-bottom-20" style={{ color: 'var(--green)' }}>
                                Airport &amp; City
                            </p>
                            <h2 className="heading-style-h2">Transfer Rates</h2>
                        </div>
                        <p className="text-size-medium text-color-lightgrey" style={{ maxWidth: '24rem' }}>
                            Hassle-free private transfers between airports, hotels, and popular destinations across Malaysia.
                        </p>
                    </div>

                    <div className="tp-transfer-table">
                        <div className="tp-transfer-table_header">
                            <span>Route</span>
                            <span>Details</span>
                            <span>Rate</span>
                        </div>
                        {airportTransfers.map((transfer, index) => (
                            <div
                                key={transfer.id}
                                className="tp-transfer-table_row"
                                style={{
                                    opacity: transferVisible ? 1 : 0,
                                    transform: transferVisible ? 'translateY(0)' : 'translateY(1.5em)',
                                    transition: `opacity 0.5s ease ${0.1 + index * 0.08}s, transform 0.5s ease ${0.1 + index * 0.08}s`,
                                }}
                            >
                                <div className="tp-transfer-table_route">
                                    <div className="tp-route-dot"></div>
                                    <h3 className="heading-style-h5">{transfer.route}</h3>
                                </div>
                                <p className="text-size-medium text-color-lightgrey tp-transfer-table_desc">
                                    {transfer.description}
                                </p>
                                <div className="tp-transfer-table_price">
                                    {transfer.price}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="tp-transfer-note">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <p className="text-size-small text-color-lightgrey">
                            All rates are per vehicle (up to 4 pax). Prices may vary during peak seasons.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tour Transfers - Card Grid */}
            <section className="section" ref={tourRef}>
                <div className="container-large">
                    <div className="tp-section-header">
                        <div>
                            <p className="text-size-eyebrow margin-bottom-20" style={{ color: 'var(--dark-grey)' }}>
                                Guided Tours
                            </p>
                            <h2 className="heading-style-h2">Sightseeing Tours</h2>
                        </div>
                        <p className="text-size-medium" style={{ maxWidth: '24rem', opacity: 0.6 }}>
                            Explore Malaysia with our professional drivers. All tours include hotel pick-up and drop-off.
                        </p>
                    </div>

                    <div className="tp-tour-grid">
                        {tourTransfers.map((transfer, index) => (
                            <div
                                key={transfer.id}
                                className="tp-tour-card"
                                style={{
                                    opacity: tourVisible ? 1 : 0,
                                    transform: tourVisible ? 'translateY(0)' : 'translateY(2em)',
                                    transition: `opacity 0.6s ease ${0.1 + index * 0.1}s, transform 0.6s ease ${0.1 + index * 0.1}s`,
                                }}
                            >
                                <div className="tp-tour-card_img">
                                    <Image
                                        src={transfer.image}
                                        alt={transfer.route}
                                        fill
                                        className="img-cover"
                                        sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
                                    />
                                    <div className="tp-tour-card_badge">{transfer.duration}</div>
                                </div>
                                <div className="tp-tour-card_body">
                                    <h3 className="heading-style-h4 margin-bottom-8">{transfer.route}</h3>
                                    <p className="text-size-medium" style={{ opacity: 0.6, marginBottom: '1.25rem' }}>
                                        {transfer.description}
                                    </p>
                                    <div className="tp-tour-card_footer">
                                        <span className="tp-tour-card_price">{transfer.price}</span>
                                        <span className="text-size-small" style={{ opacity: 0.4 }}>per vehicle</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex-center" style={{ marginTop: '3.5rem' }}>
                        <Link href="/contact" className="button">
                            <p>Book a Transfer</p>
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
            </section>
        </>
    );
}

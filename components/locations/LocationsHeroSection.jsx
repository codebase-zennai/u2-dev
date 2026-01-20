'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const locations = [
    {
        id: 1,
        name: 'Grandview Park Tennis Center',
        address: '123 Maplewood Drive, Riverton',
        image: 'https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/67095e0ccacd026f9eeab8cb_tennis-location-01%402x.avif',
    },
    {
        id: 2,
        name: 'Oakridge Sports Complex',
        address: '456 Oakridge Lane, Brookfield',
        image: 'https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/67095e0c6cba826697f73697_tennis-location-02%402x.avif',
    },
    {
        id: 3,
        name: 'Riverview Tennis Academy',
        address: '789 Pinecrest Avenue, Hillside',
        image: 'https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/67095e0dd36d63fe217b4700_tennis-location-06%402x.avif',
    },
    {
        id: 4,
        name: 'Pinecrest Court Club',
        address: '101 Grandview Road, Lakeshore',
        image: 'https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/67095f7ac618c30aad514866_tennis-location-07%402x.avif',
    },
];

export default function LocationsHeroSection() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="section is-location-hero">
            <div className="container-large">
                <div className="margin-bottom-72">
                    <div className="w-layout-vflex max-width-720">
                        <div className="margin-bottom-16">
                            <h1 className="heading-style-h1">
                                <span
                                    className="is-word is-1"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                        transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
                                        display: 'inline-block'
                                    }}
                                >
                                    Our
                                </span>{' '}
                                <span
                                    className="is-word is-2"
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                        transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
                                        display: 'inline-block'
                                    }}
                                >
                                    Locations
                                </span>
                            </h1>
                        </div>
                        <div className="margin-bottom-24">
                            <p
                                className="text-size-medium"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                    transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
                                }}
                            >
                                <strong>Discover Your Perfect Court</strong> – Ready to elevate your tennis game? Experience world-class coaching, state-of-the-art facilities, and a vibrant tennis community. Enroll now and be part of a legacy of excellence.
                            </p>
                        </div>
                        <Link
                            href="/contact"
                            className="button"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
                            }}
                        >
                            <p>Start today</p>
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

                <ul
                    className="locations_grid"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                        transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
                    }}
                >
                    {locations.map((location) => (
                        <li key={location.id} className="locations_card shadow-card">
                            <Image
                                src={location.image}
                                alt={location.name}
                                fill
                                className="img-cover"
                                sizes="(max-width: 767px) 90vw, 43vw"
                                style={{ filter: 'brightness(1.1)' }}
                            />
                            <div className="locations_card_overlay"></div>
                            <div className="z-index-3">
                                <p className="heading-style-h3">{location.name}</p>
                                <p>{location.address}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

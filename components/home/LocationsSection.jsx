'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const locations = [
    {
        id: 1,
        name: 'Grandview Park Tennis Center',
        address: '123 Maplewood Drive, Riverton',
        image: '/images/locations/locations-1.jpg',
    },
    {
        id: 2,
        name: 'Oakridge Sports Complex',
        address: '456 Oakridge Lane, Brookfield',
        image: '/images/locations/locations-2.jpg',
    },
    {
        id: 3,
        name: 'Riverview Tennis Academy',
        address: '789 Pinecrest Avenue, Hillside',
        image: '/images/locations/locations-3.jpg',
    },
    {
        id: 4,
        name: 'Pinecrest Court Club',
        address: '101 Grandview Road, Lakeshore',
        image: '/images/locations/locations-4.jpg',
    },
];

export default function LocationsSection() {
    const parallaxRef = useRef(null);
    const [parallaxY, setParallaxY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (parallaxRef.current) {
                const rect = parallaxRef.current.getBoundingClientRect();
                const scrollPosition = window.scrollY;
                const sectionTop = rect.top + scrollPosition;
                const relativeScroll = scrollPosition - sectionTop + window.innerHeight;

                if (relativeScroll > 0) {
                    const speed = 0.2;
                    setParallaxY(relativeScroll * speed);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="section is-location" ref={parallaxRef}>
            <div className="parallax-wrap">
                <Image
                    src="https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/67094c7f08fee1710d775ca6_tennis-location-background%402x.avif"
                    alt="Tennis court background"
                    fill
                    style={{
                        objectFit: 'cover',
                        transform: `translateY(${-parallaxY}px)`
                    }}
                    priority
                />
                <div className="parallax-overlay"></div>
            </div>
            <div className="container-large">
                <div className="locations_wrap">
                    <div className="max-width-700">
                        <h2 className="heading-style-h2 margin-bottom-24">Our Locations</h2>
                        <p className="text-size-large opacity-60 max-width-440 margin-bottom-24">
                            Ready to take your tennis game to the next level? Experience world-class coaching, state-of-the-art facilities, and a vibrant tennis community. Enroll today and become part of a legacy of excellence.
                        </p>
                        <div className="margin-top-32">
                            <Link href="/contact" className="button">
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
                    <ul className="locations_list">
                        {locations.map((location) => (
                            <li key={location.id} className="locations_item">
                                <div className="margin-bottom-20">
                                    <div className="locations_visual">
                                        <Image
                                            src={location.image}
                                            alt={location.name}
                                            fill
                                            className="img-cover"
                                            sizes="(max-width: 767px) 81vw, (max-width: 991px) 44vw, 20vw"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="margin-bottom-8">
                                        <p className="heading-style-h4">{location.name}</p>
                                    </div>
                                    <div className="text-color-lightgrey">
                                        <p className="text-size-eyebrow">{location.address}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const locations = [
    {
        id: 1,
        name: 'Westside Courts',
        city: 'Los Angeles',
        image: '/images/locations/locations-1.jpg',
    },
    {
        id: 2,
        name: 'Marina Bay',
        city: 'San Francisco',
        image: '/images/locations/locations-2.jpg',
    },
    {
        id: 3,
        name: 'Riverside Club',
        city: 'San Diego',
        image: '/images/locations/locations-3.jpg',
    },
    {
        id: 4,
        name: 'Palm Springs',
        city: 'Palm Springs',
        image: '/images/locations/locations-4.jpg',
    },
];

export default function LocationsSection() {
    const parallaxRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (parallaxRef.current) {
                const scrollPosition = window.scrollY;
                const parallaxElement = parallaxRef.current.querySelector('.parallax-img');
                if (parallaxElement) {
                    const speed = 0.3;
                    const yPos = -(scrollPosition * speed);
                    parallaxElement.style.transform = `translateY(${yPos}px)`;
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
                    src="/images/backgrounds/parallax_locations.png"
                    alt="Tennis court background"
                    fill
                    className="parallax-img"
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <div className="parallax-overlay"></div>
            </div>
            <div className="container-large">
                <div className="locations_wrap">
                    <div className="max-width-700">
                        <p className="text-size-eyebrow margin-bottom-20 opacity-60">Our Courts</p>
                        <h2 className="heading-style-h2 margin-bottom-24">Our Locations</h2>
                        <p className="text-size-large opacity-60 max-width-440">
                            Discover world-class tennis facilities across California, each designed to elevate your game.
                        </p>
                    </div>
                    <ul className="locations_list">
                        {locations.map((location) => (
                            <li key={location.id} className="locations_item">
                                <div className="locations_visual shadow-card margin-bottom-16">
                                    <Image
                                        src={location.image}
                                        alt={location.name}
                                        fill
                                        className="img-cover"
                                        sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 300px"
                                    />
                                </div>
                                <h4 className="heading-style-h4 margin-bottom-8">{location.name}</h4>
                                <p className="text-size-small opacity-60">{location.city}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

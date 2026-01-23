'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const locations = [
    {
        id: 1,
        name: '7D6N Nepal',
        address: 'Lorem Ipsum',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/7b044fe5d67560989c45483c87766040.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 2,
        name: '5D4N Dubai',
        address: 'Lorem Ipsum',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/25c5ee03fb8f651c50ae1d1a9358c98e.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 3,
        name: '5D4N Mauritius',
        address: 'Lorem Ipsum',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/f8342a2e832f93724a7a78c29f0d0b57.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 4,
        name: '4D3N Hanoi',
        address: 'Lorem Ipsum',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/a5455e21bfc749c27544850525c8ba11.jpg&w=540&h=350&zc=1&a=',
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
                                    World
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
                                    Tours
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
                                <strong>Discover Your Perfect Country</strong> – Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum arcu mauris, ac luctus est imperdiet a.  Donec congue varius ullamcorper. Nam a massa luctus, molestie sapien id, iaculis nulla. Fusce fringilla malesuada urna, in pulvinar magna ornare pharetra. Suspendisse potenti.
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
                <div className="margin-bottom-48"></div>

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

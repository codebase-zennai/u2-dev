'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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
                        <h2 className="heading-style-h2 margin-bottom-24">World Tours</h2>
                        <p className="text-size-large opacity-60 max-width-440 margin-bottom-24">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum arcu mauris, ac luctus est imperdiet a. Donec congue varius ullamcorper. Nam a massa luctus, molestie sapien id, iaculis nulla. Fusce fringilla malesuada urna, in pulvinar magna ornare pharetra.
                        </p>
                        <div className="margin-top-32">
                            <Link href="/contact" className="button">
                                <p>View All</p>
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

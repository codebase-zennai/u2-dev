'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const locations = [
    {
        id: 1,
        name: '7D6N Nepal',
        address: 'Kathmandu - Pokhara - Chitwan',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/7b044fe5d67560989c45483c87766040.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 2,
        name: '5D4N Dubai',
        address: 'Desert Safari - Burj Khalifa - Dubai Mall',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/25c5ee03fb8f651c50ae1d1a9358c98e.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 3,
        name: '5D4N Mauritius',
        address: 'Port Louis - Le Morne - Ile aux Cerfs',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/f8342a2e832f93724a7a78c29f0d0b57.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 4,
        name: '4D3N Hanoi',
        address: 'Old Quarter - Halong Bay - Temple of Literature',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/a5455e21bfc749c27544850525c8ba11.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 5,
        name: 'Eastern Europe',
        address: 'Prague - Vienna - Budapest',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/04d3f9a256d17ffb94ff38e3c7302527.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 6,
        name: 'Western Europe',
        address: 'Paris - Amsterdam - Brussels',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/b3580f9763a8c2fe47740f715b637039.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 7,
        name: 'Central Europe',
        address: 'Germany - Switzerland - Austria',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/90958e952f8628f4dd319b55211140bf.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 8,
        name: '3D2N Krabi',
        address: 'Ao Nang - Railay Beach - 4 Islands',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/1d1936591a77e01d7b7b36ecc74fb8d1.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 9,
        name: '3D2N Phuket',
        address: 'Patong Beach - Phi Phi Island - Old Town',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/329895e8e2e71a795a1e10ce956533c0.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 10,
        name: '5D4N Bali',
        address: 'Ubud - Kuta - Tanah Lot - Uluwatu',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/831e001edcc890d1491e97e4cef929d1.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 11,
        name: '5D4N Korea',
        address: 'Seoul - Nami Island - DMZ Tour',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/2404ccc9179d463f3c7e513ee78b3d96.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 12,
        name: '6D7N South Africa',
        address: 'Cape Town - Johannesburg - Safari',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/882140cb818dcb6795e18282bba0a875.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 13,
        name: '4D3N Ho Chi Minh',
        address: 'Cu Chi Tunnels - Mekong Delta - City Tour',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads/70869fd868d68a234ed8d70f9813be49.jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 14,
        name: '5D4N Chennai Shopping',
        address: 'T Nagar - Pondy Bazaar - Temples',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//a673c18d9270b084cc06b8763ecefaf2jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 15,
        name: '6D5N Bangkok - Phuket',
        address: 'Grand Palace - Floating Market - Beach',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//f476977a8a4c158b1d58afc1fca44b5ajpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 16,
        name: '5D4N Bangalore - Mysore',
        address: 'Mysore Palace - Brindavan Gardens',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//3a0245e31ab3425f799688cafa823702jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 17,
        name: '7D6N Mumbai Shirdi Pilgrimage',
        address: 'Mumbai - Shirdi - Nashik Temples',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//6244856ccbf5f0031edff16d289ca1bejpg&w=540&h=350&zc=1&a=',
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
                            Discover breathtaking destinations around the globe with our carefully curated world tour packages. From ancient temples to modern cities, we offer unforgettable travel experiences tailored to your preferences.
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

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const coaches = [
    {
        id: 1,
        name: '3D 2N Kota Kinabalu, Sabah',
        location: 'KKIA - Kota Kinabalu - KKIA',
        description: 'Explore the vibrant city of Kota Kinabalu with visits to local markets, islands, and Mount Kinabalu views.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//e9389c36f005a9373d7453887edc60fdjpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 2,
        name: '3D 2N Kuala Lumpur + Genting',
        location: 'KLIA - City - Genting - KLIA',
        description: 'Experience the best of KL city tours and the cool highlands of Genting with casino and theme parks.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//0531f419b44150f0190e168176e27a08jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 3,
        name: '4D 3N Kuala Lumpur + Penang',
        location: 'KLIA - Kul City - Genting - Penang - KLIA',
        description: 'Discover the heritage of Georgetown, delicious Penang food, and iconic KL landmarks in one trip.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//5d64d8e7f24743e6041539583ea375e3jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 4,
        name: '3D 2N Kuala Lumpur + Melaka',
        location: 'KLIA - Kuala Lumpur - Melaka - KLIA',
        description: 'Visit the historic UNESCO World Heritage site of Melaka with its Dutch and Portuguese influences.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//28e24a8cd171c76cd803507ee2e69fe9jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 5,
        name: '2D 1N Bukit Gambang, Kuantan',
        location: 'Kuantan - Bukit Gambang Resort',
        description: 'Family fun at Bukit Gambang Resort City with water park, safari, and adventure activities.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//e9389c36f005a9373d7453887edc60fdjpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 6,
        name: '2D 1N Cameron Highlands',
        location: 'KL - Cameron Highlands - KL',
        description: 'Escape to the cool climate of Cameron Highlands with tea plantations and strawberry farms.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//0531f419b44150f0190e168176e27a08jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 7,
        name: '6D 5N Kuala Lumpur + Langkawi + Penang',
        location: 'KLIA - KL - Langkawi - Penang - KLIA',
        description: 'Ultimate Malaysia experience covering KL, island paradise Langkawi, and heritage Penang.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//5d64d8e7f24743e6041539583ea375e3jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 8,
        name: '5D 4N Kuala Lumpur + Genting + Langkawi',
        location: 'KLIA - KL - Genting - Langkawi - KLIA',
        description: 'Combine city excitement, highland cool, and island relaxation in one amazing trip.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//28e24a8cd171c76cd803507ee2e69fe9jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 9,
        name: '5D 4N Kuala Lumpur + Langkawi',
        location: 'KLIA - Kuala Lumpur - Langkawi - KLIA',
        description: 'Perfect blend of city sightseeing and beach relaxation on duty-free Langkawi island.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//e9389c36f005a9373d7453887edc60fdjpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 10,
        name: '2D 1N A Famosa, Melaka',
        location: 'KL - A Famosa Resort - KL',
        description: 'Fun-filled getaway at A Famosa Resort with water park, safari, and cowboy town.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//0531f419b44150f0190e168176e27a08jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 11,
        name: '4D 3N Temple Tour',
        location: 'KL - Batu Caves - Ipoh - Penang',
        description: 'Spiritual journey visiting famous Hindu and Buddhist temples across Malaysia.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//5d64d8e7f24743e6041539583ea375e3jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 12,
        name: '3D 2N Honeymoon in Langkawi',
        location: 'Langkawi Island - Beach Resort',
        description: 'Romantic getaway with sunset cruises, spa treatments, and private beach dinners.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//28e24a8cd171c76cd803507ee2e69fe9jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 13,
        name: '3D 2N Kuching, Sarawak',
        location: 'Kuching Airport - City - Daytrips',
        description: 'Explore the charming city of Kuching with orangutan sanctuary and Sarawak cultural village.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//e9389c36f005a9373d7453887edc60fdjpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 14,
        name: '3D2N Mulu Caves, Sarawak',
        location: 'Miri - Mulu National Park',
        description: 'UNESCO World Heritage adventure exploring spectacular cave systems and rainforest.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//0531f419b44150f0190e168176e27a08jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 15,
        name: '4D 3N Kuala Lumpur + Genting',
        location: 'KLIA - KL City - Genting Highlands',
        description: 'Extended KL exploration with more time at Genting for theme parks and entertainment.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//5d64d8e7f24743e6041539583ea375e3jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 16,
        name: '3D 2N Cherating Beach Resort',
        location: 'Kuantan - Cherating Beach',
        description: 'Relax at pristine Cherating beach with turtle sanctuary visits and water sports.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//28e24a8cd171c76cd803507ee2e69fe9jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 17,
        name: 'Fun & Adventure Discovery Port Dickson',
        location: 'KL - Port Dickson Beach',
        description: 'Beach adventure with water sports, seafood, and Army Museum exploration.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//e9389c36f005a9373d7453887edc60fdjpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 18,
        name: 'Fullday Genting Tour (SIC)',
        location: 'KL - Genting Highlands - KL',
        description: 'Seat-in-coach day trip to Genting Highlands with flexible free time at the resort.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//0531f419b44150f0190e168176e27a08jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 19,
        name: 'Tioman Island 3D2N Full Board',
        location: 'Tanjung Gemok Jetty - Tioman Island',
        description: 'Island paradise with crystal clear waters, snorkeling, and marine life exploration.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//5d64d8e7f24743e6041539583ea375e3jpg&w=540&h=350&zc=1&a=',
    },
    {
        id: 20,
        name: 'Cameron Highland 3D2N',
        location: 'KL - Cameron Highlands - KL',
        description: 'Extended highland escape with tea plantation tours, mossy forest trek, and fresh produce.',
        image: 'https://www.u2travels.com.my/public/js/common/thumb.php?src=http://www.u2travels.com.my/traveldez/images/tp_thumbnail/uploads//28e24a8cd171c76cd803507ee2e69fe9jpg&w=540&h=350&zc=1&a=',
    },
];

export default function CoachesSection() {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [titleVisible, setTitleVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Start animation when section enters viewport
            // Progress from 0 to 1 as section scrolls into view
            const sectionTop = rect.top;
            const triggerPoint = windowHeight * 0.8; // Start when 20% of section is visible

            if (sectionTop < triggerPoint) {
                const scrolled = triggerPoint - sectionTop;
                const maxScroll = windowHeight * 0.6;
                const progress = Math.min(1, scrolled / maxScroll);
                setScrollProgress(progress);

                if (!titleVisible && progress > 0) {
                    setTitleVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call
        return () => window.removeEventListener('scroll', handleScroll);
    }, [titleVisible]);

    // Calculate image scale for each coach: starts at 1.3 (zoomed in) and scales to 1 (normal)
    const getImageScale = (index) => {
        // Stagger the animation for each coach
        const delay = index * 0.15;
        const adjustedProgress = Math.max(0, Math.min(1, (scrollProgress - delay) / (1 - delay)));
        return 1.3 - (adjustedProgress * 0.3); // 1.3 -> 1
    };

    return (
        <section className="section background-color-white" ref={sectionRef} id="intro">
            <div className="container-large">
                <div className="margin-bottom-48">
                    <div className="wrap_flex is-align-bottom">
                        <div className="max-width-440">
                            <h2 className="heading-style-h2">
                                <span
                                    className="is-word is-1"
                                    style={{
                                        opacity: titleVisible ? 1 : 0,
                                        transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                        transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
                                        display: 'inline-block'
                                    }}
                                >
                                    Malaysian
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
                                    Tours
                                </span>{' '}
                                {/* <span
                                    className="is-word is-3"
                                    style={{
                                        opacity: titleVisible ? 1 : 0,
                                        transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                        transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
                                        display: 'inline-block'
                                    }}
                                >
                                    Coaches
                                </span>{' '}
                                <span
                                    className="is-word is-5"
                                    style={{
                                        opacity: titleVisible ? 1 : 0,
                                        transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                        transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
                                        display: 'inline-block'
                                    }}
                                >
                                    Behind
                                </span>{' '}
                                <span
                                    className="is-word is-6"
                                    style={{
                                        opacity: titleVisible ? 1 : 0,
                                        transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                        transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
                                        display: 'inline-block'
                                    }}
                                >
                                    Elysian
                                </span> */}
                            </h2>
                        </div>
                        <Link
                            href="#"
                            className="button"
                            style={{
                                opacity: titleVisible ? 1 : 0,
                                transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                transition: 'opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s',
                            }}
                        >
                            <div className="z-index-2"><p>Explore Tours</p></div>
                            <div className="z-index-2">
                                <Image
                                    src="https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/670563f226883663736a6d20_icon-arrow-light.svg"
                                    alt="Arrow"
                                    width={16}
                                    height={16}
                                    className="icon-16"
                                />
                            </div>
                        </Link>
                    </div>
                </div>
                <ul className={`player_list ${!isExpanded ? 'is-collapsed' : ''}`}>
                    {coaches.map((coach, index) => {
                        const imageScale = getImageScale(index);
                        return (
                            <li
                                key={coach.id}
                                className="player_item"
                            >
                                <div className="margin-bottom-40">
                                    <div
                                        className="player_visual shadow-card"
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <Image
                                            src={coach.image}
                                            alt={coach.name}
                                            fill
                                            className="img-cover"
                                            sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 40vw"
                                            style={{
                                                transform: `scale(${imageScale})`,
                                                transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="max-width-440">
                                    <div className="w-layout-vflex">
                                        <div className="margin-bottom-16">
                                            <p className="text-size-eyebrow">{coach.location}</p>
                                        </div>
                                        <div className="margin-bottom-24">
                                            <p className="heading-style-h2">{coach.name}</p>
                                        </div>
                                        <div className="margin-bottom-24">
                                            <p className="text-size-medium">{coach.description}</p>
                                        </div>
                                        <Link href="/about-us" className="button is-secondary">
                                            <p>View Itinerary</p>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div className="flex-center margin-top-32">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="button is-secondary"
                        style={{ cursor: 'pointer' }}
                    >
                        <p>{isExpanded ? 'Show Less' : 'Show More'}</p>
                        <Image
                            src="https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/670563f226883663736a6d20_icon-arrow-light.svg"
                            alt="Arrow"
                            width={16}
                            height={16}
                            className="icon-16"
                            style={{
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease'
                            }}
                        />
                    </button>
                </div>
            </div>
        </section>
    );
}

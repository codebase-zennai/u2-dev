'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const coaches = [
    {
        id: 1,
        name: 'Sarah Thompson',
        location: 'Los Angeles, CA',
        description: 'With 18 years of coaching under her belt, Sarah is known for her ability to develop young talent, guiding players to reach their full potential on the court.',
        image: 'https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/67093f38a5337d5f28be5266_tennis-image-01%402x.avif',
    },
    {
        id: 2,
        name: 'Jessica Novak',
        location: 'Austin, TX',
        description: 'Jessica brings 22 years of experience to the table, specializing in refining advanced techniques and mental toughness in competitive players.',
        image: 'https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/67093f38bde340df4cbf31cf_tennis-image-04%402x.avif',
    },
    {
        id: 3,
        name: 'Martina Rojas',
        location: 'Miami, FL',
        description: 'A former collegiate athlete with 15 years of coaching experience, Martina is praised for her dynamic coaching style and her success in training elite junior players.',
        image: 'https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/67093f97c1a41c3ca80b6dd3_tennis-image-07%402x.avif',
    },
    {
        id: 4,
        name: "Kevin O'Connor",
        location: 'Chicago, IL',
        description: "With 20 years of experience, Kevin's passion for tennis has made him a favorite among players seeking to improve both their technical skills and strategic thinking.",
        image: 'https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/67093f38a6fdc3f1533d59be_tennis-image-03%402x.avif',
    },
];

export default function CoachesSection() {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [titleVisible, setTitleVisible] = useState(false);

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
                                    Meet
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
                                    the
                                </span>{' '}
                                <span
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
                                </span>
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
                            <div className="z-index-2"><p>Explore Academy</p></div>
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
                <ul className="player_list">
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
                                            <p>Learn More</p>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

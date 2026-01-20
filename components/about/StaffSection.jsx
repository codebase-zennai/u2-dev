'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const staffMembers = [
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

export default function StaffSection() {
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
        <section className="section background-color-black" ref={sectionRef}>
            <div className="container-large">
                <div className="margin-bottom-48">
                    <h2>
                        <span
                            className="is-word is-1"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
                                display: 'inline-block'
                            }}
                        >
                            Meet
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
                            our
                        </span>{' '}
                        <span
                            className="is-word is-3"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
                                display: 'inline-block'
                            }}
                        >
                            staff
                        </span>
                    </h2>
                </div>

                <ul
                    className="staff_list"
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                        transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
                    }}
                >
                    {staffMembers.map((staff) => (
                        <li key={staff.id} className="staff_item">
                            <Image
                                src={staff.image}
                                alt={staff.name}
                                width={80}
                                height={80}
                                className="staff_avatar"
                            />
                            <div className="w-layout-vflex">
                                <div className="margin-bottom-16">
                                    <p className="text-size-eyebrow">{staff.location}</p>
                                </div>
                                <div className="margin-bottom-16">
                                    <h3 className="heading-style-h3">{staff.name}</h3>
                                </div>
                                <p>{staff.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

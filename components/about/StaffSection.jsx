'use client';

import { useEffect, useRef, useState } from 'react';

const testimonials = [
    {
        id: 1,
        name: 'Ms Riya',
        location: 'Kuala Lumpur Tour',
        description: 'Hey, the tour was amazing, and the driver was so friendly and helpful. We had good service. I\'m looking forward to doing more business together. Thank you!',
    },
    {
        id: 2,
        name: 'Madam Nivari',
        location: 'City Tour',
        description: 'Thank you for giving us ride two days and showing the city. The experience was wonderful and the service was top-notch.',
    },
    {
        id: 3,
        name: 'Mr Apurva Joshi',
        location: 'Group Tour',
        description: 'Thanks a lot Vikasbhai and all team members, nice experience with all of you. Will definitely recommend U2 Travels to others.',
    },
    {
        id: 4,
        name: 'Mr Ashish',
        location: 'Langkawi + Kuala Lumpur',
        description: 'We booked through U2 and visited Langkawi and Kuala Lumpur — it was great! They managed all bookings and the entire process was done smoothly.',
    },
    {
        id: 5,
        name: 'Mr Bharath Nelluta',
        location: 'Malaysia Tour',
        description: 'Thank you very much. We really liked and enjoyed your service. Excellent service throughout our entire trip!',
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
                            What
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
                            Our
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
                            Clients
                        </span>{' '}
                        <span
                            className="is-word is-4"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
                                display: 'inline-block'
                            }}
                        >
                            Say
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
                    {testimonials.map((testimonial) => (
                        <li key={testimonial.id} className="staff_item">
                            <div className="testimonial_avatar">
                                <span className="testimonial_initial">{testimonial.name.charAt(0)}</span>
                            </div>
                            <div className="w-layout-vflex">
                                <div className="margin-bottom-16">
                                    <p className="text-size-eyebrow">{testimonial.location}</p>
                                </div>
                                <div className="margin-bottom-16">
                                    <h3 className="heading-style-h3">{testimonial.name}</h3>
                                </div>
                                <p>&ldquo;{testimonial.description}&rdquo;</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

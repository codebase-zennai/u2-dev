'use client';

import { useState } from 'react';

const faqs = [
    {
        id: 1,
        question: 'How do I book a tour package?',
        answer: 'You can book a tour package through our website by selecting your desired destination and filling out the enquiry form. Our team will contact you within 24 hours to confirm your booking and provide payment details.',
    },
    {
        id: 2,
        question: 'What is included in tour packages?',
        answer: 'Our tour packages typically include accommodation, transportation, guided tours, and selected meals. Specific inclusions vary by package and are clearly listed on each tour page. Flights are usually not included unless stated.',
    },
    {
        id: 3,
        question: 'Do you offer customized tours?',
        answer: 'Yes! We specialize in creating personalized travel experiences. Contact us with your preferences, group size, and budget, and our travel experts will design a custom itinerary just for you.',
    },
    {
        id: 4,
        question: 'What are your payment options?',
        answer: 'We accept bank transfers, credit cards, and online payment methods. A deposit is required to confirm your booking, with the remaining balance due before departure. Flexible payment plans are available for selected packages.',
    },
    {
        id: 5,
        question: 'Can I cancel or modify my booking?',
        answer: 'Yes, cancellations and modifications are possible subject to our terms and conditions. Cancellation fees may apply depending on how close to the departure date the request is made. Contact us as early as possible for any changes.',
    },
    {
        id: 6,
        question: 'Do you provide airport transfers?',
        answer: 'Yes, we offer airport transfer services for all our tour packages. Private and shared transfer options are available at competitive rates. Transfers can be arranged for both arrival and departure.',
    },
];

export default function FAQsSection() {
    const [openId, setOpenId] = useState(null);

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="section background-color-black">
            <div className="container-large">
                <div className="faqs_wrap">
                    <div className="max-width-700">
                        <p className="text-size-eyebrow margin-bottom-20 text-color-lightgrey">FAQs</p>
                        <h2 className="heading-style-h2 margin-bottom-24">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-size-large text-color-lightgrey max-width-440">
                            Find answers to common questions about our facilities, programs, and memberships.
                        </p>
                    </div>
                    <ul className="faqs_list">
                        {faqs.map((faq) => (
                            <li
                                key={faq.id}
                                className={`faqs_item ${openId === faq.id ? 'is-open' : ''}`}
                                onClick={() => toggleFAQ(faq.id)}
                            >
                                <div className="faqs_head">
                                    <h5 className="heading-style-h5">{faq.question}</h5>
                                    <div className="icon-24">
                                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="faqs_body">
                                    <p className="text-size-medium text-color-lightgrey" style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}>
                                        {faq.answer}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

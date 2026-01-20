'use client';

import { useState } from 'react';

const faqs = [
    {
        id: 1,
        question: 'What skill levels do you cater to?',
        answer: 'We welcome players of all skill levels, from complete beginners to advanced competitive players. Our coaching programs are tailored to meet your specific needs and help you improve at your own pace.',
    },
    {
        id: 2,
        question: 'How do I book a court or lesson?',
        answer: 'You can easily book a court or lesson through our online booking system or by calling our front desk. We recommend booking in advance, especially during peak hours and weekends.',
    },
    {
        id: 3,
        question: 'What equipment do I need to bring?',
        answer: 'We recommend bringing your own racket, appropriate tennis shoes, and comfortable athletic wear. We do have rackets available for rent if needed, and tennis balls are always provided.',
    },
    {
        id: 4,
        question: 'Do you offer group lessons?',
        answer: 'Yes! We offer group lessons for all ages and skill levels. Group lessons are a great way to learn, stay motivated, and meet other tennis enthusiasts. Check our schedule for available times.',
    },
    {
        id: 5,
        question: 'What are your membership options?',
        answer: 'We offer various membership tiers to suit different needs, from casual players to dedicated enthusiasts. Each membership includes court access, and higher tiers include additional perks like coaching discounts and priority booking.',
    },
    {
        id: 6,
        question: 'Can I try before committing to membership?',
        answer: 'Absolutely! We offer trial sessions and day passes so you can experience our facilities and coaching before making a commitment. Contact us to learn more about our trial options.',
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

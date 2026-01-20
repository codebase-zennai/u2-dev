'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const socialLinks = [
    { name: 'Instagram', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'TikTok', href: '#' },
];

export default function ContactSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('submitting');

        // Simulate form submission
        setTimeout(() => {
            setFormStatus('success');
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                message: '',
            });
        }, 1000);
    };

    return (
        <section className="section is-contact">
            <div className="container-large">
                <div className="contact_wrap">
                    <div className="contact_content">
                        <div className="margin-bottom-24">
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
                                    Contact
                                </span>
                            </h1>
                        </div>
                        <div className="max-width-440">
                            <p
                                className="text-size-medium"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                    transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
                                }}
                            >
                                Whether you want to book a court, join a class, or inquire about personalized coaching, fill out the form and we'll get back to you as soon as possible.
                            </p>
                        </div>
                        <div className="margin-top-24">
                            <ul
                                className="list_wrap"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                    transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
                                }}
                            >
                                {socialLinks.map((link, index) => (
                                    <li key={index} className="list_wrap-item">
                                        <a href={link.href} className="text-style-inlinelink">
                                            <div className="text-size-medium">{link.name}</div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="margin-top-64">
                            <div
                                className="contact_form-block"
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                    transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
                                }}
                            >
                                {formStatus === 'success' ? (
                                    <div className="form-success" style={{ display: 'block' }}>
                                        <div>Thank you! Your submission has been received!</div>
                                    </div>
                                ) : (
                                    <form className="contact_form" onSubmit={handleSubmit}>
                                        <div className="form-field-wrapper">
                                            <label htmlFor="first_name" className="field-label">First Name</label>
                                            <input
                                                className="form-input"
                                                maxLength={256}
                                                name="first_name"
                                                placeholder="First name"
                                                type="text"
                                                id="first_name"
                                                required
                                                value={formData.first_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-field-wrapper">
                                            <label htmlFor="last_name" className="field-label">Last Name</label>
                                            <input
                                                className="form-input"
                                                maxLength={256}
                                                name="last_name"
                                                placeholder="Last Name"
                                                type="text"
                                                id="last_name"
                                                required
                                                value={formData.last_name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-field-wrapper is-full-width">
                                            <label htmlFor="email" className="field-label">Email</label>
                                            <input
                                                className="form-input"
                                                maxLength={256}
                                                name="email"
                                                placeholder="email@example.com"
                                                type="email"
                                                id="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-field-wrapper is-full-width">
                                            <label htmlFor="phone" className="field-label">Phone</label>
                                            <input
                                                className="form-input"
                                                maxLength={256}
                                                name="phone"
                                                placeholder="Phone Number"
                                                type="tel"
                                                id="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-field-wrapper is-full-width">
                                            <label htmlFor="message" className="field-label">Message</label>
                                            <textarea
                                                required
                                                placeholder="Message"
                                                maxLength={5000}
                                                id="message"
                                                name="message"
                                                className="form-input is-text-area"
                                                value={formData.message}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="button is-full-width"
                                            disabled={formStatus === 'submitting'}
                                        >
                                            {formStatus === 'submitting' ? 'Please wait...' : 'Send Message'}
                                        </button>
                                    </form>
                                )}
                                {formStatus === 'error' && (
                                    <div className="form-error" style={{ display: 'block' }}>
                                        <div>Oops! Something went wrong while submitting the form.</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="contact_visual">
                        <div className="contact_img">
                            <Image
                                src="https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/67096f5370a967884be1bceb_tennis-contact.avif"
                                alt="Tennis contact"
                                fill
                                className="img-cover"
                                sizes="(max-width: 991px) 100vw, 50vw"
                                priority
                                style={{ filter: 'brightness(1.1)' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import { useState } from 'react';

export default function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your form submission logic here
        setStatus('success');
        setEmail('');
    };

    return (
        <section className="section background-color-black">
            <div className="container-large">
                <div className="wrap_flex is-align-bottom">
                    <div className="max-width-700">
                        <p className="text-size-eyebrow margin-bottom-20 text-color-lightgrey">Newsletter</p>
                        <h2 className="heading-style-h2 is-title">
                            Let's Explore the World Together
                        </h2>
                    </div>
                    <div className="email-form_wrap">
                        <form className="email_form" onSubmit={handleSubmit}>
                            <div className="form-field-wrapper">
                                <input
                                    type="email"
                                    className="form-input is-green"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="button">
                                Subscribe
                            </button>
                        </form>
                        {status === 'success' && (
                            <div className="form-success" style={{ display: 'block', marginTop: '1rem' }}>
                                <div>Thank you! Your submission has been received!</div>
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="form-error" style={{ display: 'block', marginTop: '1rem' }}>
                                <div>Oops! Something went wrong while submitting the form.</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

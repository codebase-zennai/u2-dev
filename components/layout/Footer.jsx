import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <section className="section is-footer background-color-white">
            <div className="container-large">
                <div className="wrap_flex is-align-top margin-bottom-64">
                    <div className="w-layout-vflex max-width-440">
                        <div className="margin-bottom-24">
                            <Link href="/" className="nav_brand" style={{ position: 'relative' }}>
                                <Image
                                    src="/images/web/site_logo.png"
                                    alt="U2 Travels"
                                    width={169}
                                    height={50}
                                    className="nav_logo"
                                    priority
                                />
                            </Link>
                        </div>
                        <p className="text-size-xs max-width-500" style={{ fontSize: '.75rem' }}>
                            839933 - V / KPL : 5834<br />
                            No.226, 2nd Floor, Menara Mutiara Majestic, 15, Jalan Othman (PJ Old Town)<br />
                            46000 Petaling Jaya, Selangor D.E. MALAYSIA <br />
                            +603 7781 4180 / +603 7781 4181<br />
                            +603 7781 4182<br />
                            info@u2travels.com.my<br />
                        </p>
                    </div>
                    <div className="w-layout-vflex max-width-440 is-full-responsive">
                        <nav>
                            <ul className="footer_links">
                                <li className="footer_link-item">
                                    <Link href="/locations" className="footer_link">
                                        Locations
                                        <div className="link_line"></div>
                                    </Link>
                                </li>
                                <li className="footer_link-item">
                                    <Link href="/fitness" className="footer_link">
                                        Fitness
                                        <div className="link_line"></div>
                                    </Link>
                                </li>
                                <li className="footer_link-item">
                                    <Link href="/about-us" className="footer_link">
                                        About
                                        <div className="link_line"></div>
                                    </Link>
                                </li>
                                <li className="footer_link-item">
                                    <Link href="/contact" className="footer_link">
                                        Contact
                                        <div className="link_line"></div>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="email-form_wrap margin-top-32">
                            <form className="email_form">
                                <div className="form-field-wrapper">
                                    <input
                                        type="email"
                                        className="form-input"
                                        placeholder="Your email"
                                        required
                                    />
                                </div>
                                <button type="submit" className="button">
                                    Subscribe
                                </button>
                            </form>
                            <div className="form-success">
                                <div>Thank you! Your submission has been received!</div>
                            </div>
                            <div className="form-error">
                                <div>Oops! Something went wrong while submitting the form.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_copyright">
                    <div className="footer_copyright-inner">
                        <p className="text-size-small text-color-darkgrey">
                            © 2024 U2 Travels. All rights reserved.
                        </p>
                        <div className="footer_bottom-links-container text-size-small text-color-darkgrey">
                            <Link href="/privacy-policy">Privacy Policy</Link>
                            <Link href="/terms">Terms & Conditions</Link>
                        </div>
                    </div>
                    <ul className="social-links">
                        <li className="social-links_item">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <div className="link-box"></div>
                                <div className="icon-24">
                                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="currentColor" />
                                    </svg>
                                </div>
                            </a>
                        </li>
                        <li className="social-links_item">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <div className="link-box"></div>
                                <div className="icon-24">
                                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor" />
                                    </svg>
                                </div>
                            </a>
                        </li>
                        <li className="social-links_item">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <div className="link-box"></div>
                                <div className="icon-24">
                                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
                                    </svg>
                                </div>
                            </a>
                        </li>
                        <li className="social-links_item">
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                <div className="link-box"></div>
                                <div className="icon-24">
                                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor" />
                                    </svg>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

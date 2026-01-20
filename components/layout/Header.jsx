'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="nav_wrapper">
            <nav className="navbar">
                <div className="nav_wrap">
                    <Link href="/" className="nav_brand">
                        <svg className="nav_logo" viewBox="0 0 169 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 49.2427V0.757324H26.8521V9.85494H10.0571V20.5495H24.7559V29.6471H10.0571V40.1451H26.8521V49.2427H0Z" fill="currentColor" />
                            <path d="M31.0039 49.2427V0.757324H41.061V40.1451H57.3637V49.2427H31.0039Z" fill="currentColor" />
                            <path d="M59.4629 49.2427V40.3423L72.7148 25.4936L59.7578 10.0521V0.757324H70.2109L79.3691 12.0463L88.5273 0.757324H99.0781V10.0521L86.0234 25.4936L99.2754 40.3423V49.2427H88.8223L79.3691 36.9537L69.916 49.2427H59.4629Z" fill="currentColor" />
                            <path d="M103.23 49.2427V40.1451L121.699 9.85494H103.723V0.757324H133.234V9.85494L114.766 40.1451H133.727V49.2427H103.23Z" fill="currentColor" />
                            <path d="M144.574 49.2427V19.4482L134.32 24.396V14.2074L144.574 9.16227V0.757324H154.631V5.11296L164.885 0.0678406V10.2565L154.631 15.3044V49.2427H144.574Z" fill="currentColor" />
                            <path d="M159.063 49.2427L168.32 0.757324H168.418L159.063 49.2427Z" fill="currentColor" />
                        </svg>
                        <div className="link_line"></div>
                    </Link>

                    <div className={`nav_menu-items ${isMenuOpen ? 'is-open' : ''}`}>
                        <div className="nav_menu-items-inner">
                            <div className="nav_menu-link-wrap is-left">
                                <Link href="/locations" className="nav_link">
                                    Locations
                                    <div className="link_line"></div>
                                </Link>
                                <Link href="/fitness" className="nav_link">
                                    Fitness
                                    <div className="link_line"></div>
                                </Link>
                            </div>
                            <div className="nav_menu-link-wrap">
                                <Link href="/about" className="nav_link">
                                    About
                                    <div className="link_line"></div>
                                </Link>
                                <Link href="/contact" className="nav_link">
                                    Contact
                                    <div className="link_line"></div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <button
                        className={`nav_button ${isMenuOpen ? 'is-open' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        <div className="nav_button-inner">
                            <div className="nav_button-line is-top"></div>
                            <div className="nav_button-line is-middle"></div>
                            <div className="nav_button-line is-bottom"></div>
                        </div>
                    </button>
                </div>
            </nav>
        </div>
    );
}

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
                        <span className="nav_brand-logo">
                            <span className="nav_brand-u2">U2</span>
                            <span className="nav_brand-divider"></span>
                            <span className="nav_brand-label">
                                <span className="nav_brand-label-top">Tours &amp;</span>
                                <span className="nav_brand-label-bottom">Travels</span>
                            </span>
                        </span>
                        <div className="link_line"></div>
                    </Link>

                    <div className={`nav_menu-items ${isMenuOpen ? 'is-open' : ''}`}>
                        <div className="nav_menu-items-inner">
                            <div className="nav_menu-link-wrap is-left">
                                <Link href="/locations" className="nav_link">
                                    <div className="z-index-2">Locations</div>
                                    <div className="link_line"></div>
                                </Link>
                                <Link href="/transportation" className="nav_link">
                                    <div className="z-index-2">Transportation</div>
                                    <div className="link_line"></div>
                                </Link>
                            </div>
                            <div className="nav_menu-link-wrap">
                                <Link href="/about-us" className="nav_link">
                                    <div className="z-index-2">About</div>
                                    <div className="link_line"></div>
                                </Link>
                                <Link href="/contact" className="nav_link">
                                    <div className="z-index-2">Contact</div>
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

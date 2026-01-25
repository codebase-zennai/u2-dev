'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
                        <Image
                            src="/images/web/site_logo.png"
                            alt="U2 Travels"
                            width={169}
                            height={50}
                            className="nav_logo"
                            priority
                        />
                        <div className="link_line"></div>
                    </Link>

                    <div className={`nav_menu-items ${isMenuOpen ? 'is-open' : ''}`}>
                        <div className="nav_menu-items-inner">
                            <div className="nav_menu-link-wrap is-left">
                                <Link href="/locations" className="nav_link">
                                    <div className="z-index-2">Locations</div>
                                    <div className="link_line"></div>
                                </Link>
                                <Link href="/fitness" className="nav_link">
                                    <div className="z-index-2">Fitness</div>
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

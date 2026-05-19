'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="nav_wrapper">
            <nav className="navbar">
                <div className="nav_wrap">

                    {/* Left — empty spacer */}
                    <div className="nav_col nav_col-left"></div>

                    {/* Center — brand + links */}
                    <div className="nav_col nav_col-center">

                        <Link href="/locations" className="nav_link">
                            <div className="z-index-2">Locations</div>
                            <div className="link_line"></div>
                        </Link>
                        <Link href="/transportation" className="nav_link">
                            <div className="z-index-2">Transportation</div>
                            <div className="link_line"></div>
                        </Link>
                        <Link href="/" className="nav_brand">
                            <span className="nav_brand-logo">
                                <span className="nav_brand-u2">U2</span>
                                <span className="nav_brand-divider"></span>
                                <span className="nav_brand-label">
                                    <span className="nav_brand-label-top">Tours &amp;</span>
                                    <span className="nav_brand-label-bottom">Travels</span>
                                </span>
                            </span>
                        </Link>
                        <Link href="/about-us" className="nav_link">
                            <div className="z-index-2">About</div>
                            <div className="link_line"></div>
                        </Link>
                        <Link href="/contact" className="nav_link">
                            <div className="z-index-2">Contact</div>
                            <div className="link_line"></div>
                        </Link>
                    </div>

                    {/* Right — Agent Login */}
                    <div className="nav_col nav_col-right">
                        <Link href="/agent-login" className="nav_agent-login">
                            Agent Login
                        </Link>
                    </div>

                    {/* Hamburger — mobile only */}
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

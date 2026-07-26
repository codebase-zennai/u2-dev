"use client";

import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Header2({ isSolid = false }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [isAgentDrawerOpen, setIsAgentDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Scroll visibility states
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Mobile Accordion States
  const [isMobileToursOpen, setIsMobileToursOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen to scroll direction to show/hide navbar and change transparency
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY <= 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollYRef.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Read login state on mount and listen for custom login events
  useEffect(() => {
    setIsAgent(localStorage.getItem("agentLoggedIn") === "true");

    const handleLoginChange = () => {
      setIsAgent(localStorage.getItem("agentLoggedIn") === "true");
    };

    window.addEventListener("agentLoginStatusChange", handleLoginChange);
    return () => {
      window.removeEventListener("agentLoginStatusChange", handleLoginChange);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAgentDrawer = () => {
    setIsAgentDrawerOpen(!isAgentDrawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("agentLoggedIn");
    setIsAgent(false);
    window.dispatchEvent(new Event("agentLoginStatusChange"));
    router.push("/");
  };

  return (
    <div className="header2-nav">
      {/* Scoped CSS styling to make header transparent and style link colors */}
      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: scoped CSS
        dangerouslySetInnerHTML={{
          __html: `
        .header2-nav .nav_wrapper {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 50 !important;
          transition: all 0.3s ease !important;
        }
        .header2-nav .nav_wrapper.is-at-top {
          background-color: transparent !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;
          box-shadow: none !important;
          padding-top: 1rem !important;
          padding-bottom: 1rem !important;
        }
        .header2-nav .nav_wrapper.is-at-top .nav_link {
          color: white !important;
        }
        .header2-nav .nav_wrapper.is-at-top .nav_link:hover {
          color: #dfa447 !important;
        }
        .header2-nav .nav_wrapper.is-at-top .link_line {
          background-color: #dfa447 !important;
        }
        .header2-nav .nav_wrapper.is-at-top .nav_brand {
          color: white !important;
        }
        .header2-nav .nav_wrapper.is-at-top button {
          color: white !important;
        }

        .header2-nav .nav_wrapper.is-at-top .nav_brand-label-top2,
        .header2-nav .nav_wrapper.is-at-top .nav_brand-label-bottom2 {
          color: white !important;
        }
        .header2-nav .nav_wrapper.is-scrolled {
          background-color: white !important;
          border-bottom: 1px solid var(--light-grey) !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
          padding-top: 0.75rem !important;
          padding-bottom: 0.75rem !important;
        }
        .header2-nav .nav_wrapper.is-scrolled .nav_link {
          color: #013b85 !important;
        }
        .header2-nav .nav_wrapper.is-scrolled .nav_link:hover {
          color: #dfa447 !important;
        }
        .header2-nav .nav_wrapper.is-scrolled .link_line {
          background-color: var(--green) !important;
        }
        .header2-nav .nav_wrapper.is-scrolled .nav_brand {
          color: #013b85 !important;
        }
        .header2-nav .nav_wrapper.is-scrolled button {
          color: #013b85 !important;
        }
      `,
        }}
      />

      {/* Main Navbar Bar */}
      <div
        className={`nav_wrapper ${
          isScrolled || isSolid ? "is-scrolled" : "is-at-top"
        }`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <nav className="navbar w-full">
          <div className="nav_wrap flex items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-8">
            {/* Left — Logo or Agent Hamburger */}
            {isAgent ? (
              <div className="nav_col nav_col-left flex justify-start flex-1 min-[992px]:flex-none">
                <button
                  type="button"
                  onClick={toggleAgentDrawer}
                  className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Menu className="h-4 w-4" />
                  <span className="hidden sm:inline">Agent Panel</span>
                </button>
              </div>
            ) : (
              <div className="nav_col nav_col-left flex justify-start flex-1 min-[992px]:flex-none">
                <Link href="/" className="nav_brand !no-underline">
                  <span className="nav_brand-logo">
                    <span className="nav_brand-u2 font-black">U2</span>
                    <span className="nav_brand-divider" />
                    <span className="nav_brand-label">
                      <span className="nav_brand-label-top2">
                        Travels &amp;
                      </span>
                      <span className="nav_brand-label-bottom2">Tours</span>
                    </span>
                  </span>
                </Link>
              </div>
            )}

            {/* Middle — Brand Logo (if Agent) or Desktop Links */}
            <div className="nav_col nav_col-center flex justify-center items-center">
              {isAgent ? (
                <Link href="/" className="nav_brand !no-underline">
                  <span className="nav_brand-logo">
                    <span className="nav_brand-u2 font-black">U2</span>
                    <span className="nav_brand-divider" />
                    <span className="nav_brand-label">
                      <span className="nav_brand-label-top2">
                        Travels &amp;
                      </span>
                      <span className="nav_brand-label-bottom2">Tours</span>
                    </span>
                  </span>
                </Link>
              ) : (
                <div className="hidden min-[992px]:flex items-center gap-8">
                  {/* Navigation Menu for Tours */}
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="nav_link border-none bg-transparent outline-none shadow-none focus:bg-transparent hover:bg-transparent font-bold text-sm tracking-wide uppercase p-0 h-auto cursor-pointer">
                          Tours
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-[580px] p-6 bg-white rounded-2xl shadow-2xl border border-slate-100 grid grid-cols-2 gap-6">
                            {/* Left Column: Malaysian Tours */}
                            <div>
                              <h4 className="text-xs font-black tracking-widest text-[#013b85] uppercase mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                                <span>Malaysian Tours</span>
                                <span className="text-[10px] bg-[#dfa447]/15 text-[#dfa447] px-2 py-0.5 rounded-full font-bold">
                                  Local
                                </span>
                              </h4>
                              <div className="flex flex-col gap-2">
                                <Link
                                  href="/tours?category=sightseeing"
                                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors group flex items-start gap-3 !no-underline"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-[#dfa447]/10 flex items-center justify-center shrink-0 group-hover:bg-[#dfa447] transition-colors">
                                    <Image
                                      src="/icons/icon-location.svg"
                                      alt="Day Tours"
                                      width={16}
                                      height={16}
                                      className="icon-16 opacity-70 group-hover:opacity-100 group-hover:brightness-200 transition-all"
                                    />
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold text-slate-800 group-hover:text-[#013b85] transition-colors">
                                      Day Tours
                                    </div>
                                    <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                                      Kuala Lumpur, Genting &amp; popular day
                                      trips
                                    </div>
                                  </div>
                                </Link>
                                <Link
                                  href="/tours?category=malaysian"
                                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors group flex items-start gap-3 !no-underline"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-[#013b85]/10 flex items-center justify-center shrink-0 group-hover:bg-[#013b85] transition-colors">
                                    <Image
                                      src="/icons/icon-location.svg"
                                      alt="Malaysian Packages"
                                      width={16}
                                      height={16}
                                      className="icon-16 opacity-70 group-hover:opacity-100 group-hover:brightness-200 transition-all"
                                    />
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold text-[#013b85] group-hover:text-[#013b85] transition-colors">
                                      All Malaysian Packages
                                    </div>
                                    <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                                      Langkawi, Penang, Sabah &amp; Sarawak
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>

                            {/* Right Column: World Tours */}
                            <div>
                              <h4 className="text-xs font-black tracking-widest text-[#013b85] uppercase mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                                <span>World Tours</span>
                                <span className="text-[10px] bg-[#013b85]/10 text-[#013b85] px-2 py-0.5 rounded-full font-bold">
                                  Global
                                </span>
                              </h4>
                              <div className="flex flex-col gap-2">
                                <Link
                                  href="/tours?category=world"
                                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors group flex items-start gap-3 !no-underline"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-[#7ff74b]/20 flex items-center justify-center shrink-0 group-hover:bg-[#013b85] transition-colors">
                                    <Image
                                      src="/icons/icon-location.svg"
                                      alt="International Destinations"
                                      width={16}
                                      height={16}
                                      className="icon-16 opacity-70 group-hover:opacity-100 group-hover:brightness-200 transition-all"
                                    />
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold text-slate-800 group-hover:text-[#013b85] transition-colors">
                                      International Packages
                                    </div>
                                    <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                                      Europe, Dubai, Bali, Thailand &amp; Asia
                                    </div>
                                  </div>
                                </Link>
                              </div>

                              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                <span className="text-[11px] font-bold text-slate-600">
                                  Explore all 150+ packages
                                </span>
                                <Link
                                  href="/tours"
                                  className="text-[11px] font-black text-[#013b85] hover:text-[#dfa447] uppercase tracking-wider no-underline"
                                >
                                  View All →
                                </Link>
                              </div>
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>

                  <Link href="/transportation" className="nav_link inline-flex">
                    <div className="z-index-2">Transportation</div>
                    <div className="link_line"></div>
                  </Link>

                  <Link href="/mice" className="nav_link inline-flex">
                    <div className="z-index-2">MICE</div>
                    <div className="link_line"></div>
                  </Link>

                  <Link href="/about-us" className="nav_link inline-flex">
                    <div className="z-index-2">About</div>
                    <div className="link_line"></div>
                  </Link>

                  <Link href="/contact" className="nav_link inline-flex">
                    <div className="z-index-2">Contact</div>
                    <div className="link_line"></div>
                  </Link>
                </div>
              )}
            </div>

            {/* Right — Sign Up & Hamburger */}
            <div className="nav_col nav_col-right flex items-center gap-3 justify-end min-[992px]:flex-1">
              {!isAgent && (
                <Link
                  href="/register"
                  className="hidden sm:inline-block bg-[#dfa447] hover:bg-[#013b85] text-white px-5 py-2 rounded-full font-bold text-xs tracking-wider uppercase transition-all shadow-sm hover:shadow-md !no-underline"
                >
                  Sign Up
                </Link>
              )}

              {/* Hamburger Toggle Button (Mobile) */}
              <button
                type="button"
                className={`min-[992px]:hidden p-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center border-none ${
                  isScrolled || isSolid || isMenuOpen
                    ? "text-[#013b85] hover:bg-slate-100"
                    : "text-white hover:bg-white/10"
                }`}
                onClick={toggleMenu}
                aria-label="Toggle Navigation Menu"
              >
                {isMenuOpen ? (
                  <X className="h-7 w-7 stroke-[2.5]" />
                ) : (
                  <Menu className="h-7 w-7 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Agent Left Drawer */}
      {isAgent && (
        <>
          {/* Backdrop overlay */}
          <button
            type="button"
            onClick={() => setIsAgentDrawerOpen(false)}
            aria-label="Close Agent Menu Backdrop"
            className={`fixed inset-0 top-[6rem] bg-slate-900/35 backdrop-blur-sm z-[97] transition-opacity duration-300 border-none outline-none cursor-default ${
              isAgentDrawerOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          />
          {/* Drawer Container */}
          <div
            className={`fixed top-[6rem] left-0 h-[calc(100vh-6rem)] w-80 bg-white border-r border-slate-200 z-[98] transition-transform duration-300 shadow-2xl flex flex-col p-6 justify-between ${
              isAgentDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex flex-col gap-8">
              {/* Drawer header */}
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block mb-1">
                  Agent Operations
                </span>
                <h4 className="text-lg font-black text-[#013b85] uppercase tracking-wide">
                  Navigation Menu
                </h4>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/agent"
                  onClick={() => setIsAgentDrawerOpen(false)}
                  className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-[#013b85] transition-all !no-underline"
                >
                  <LayoutDashboard className="h-5 w-5 text-slate-400 group-hover:text-[#013b85]" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/agent/profile"
                  onClick={() => setIsAgentDrawerOpen(false)}
                  className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 hover:text-[#013b85] transition-all !no-underline"
                >
                  <User className="h-5 w-5 text-slate-400 group-hover:text-[#013b85]" />
                  <span>Profile Settings</span>
                </Link>
              </div>
            </div>

            {/* Logout Action */}
            <div className="border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={() => {
                  setIsAgentDrawerOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer border border-rose-100 animate-none"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* REACT PORTAL: Mobile Full Screen Slide-in Drawer (Directly on document.body) */}
      {mounted &&
        createPortal(
          <div className="min-[992px]:hidden">
            {/* Backdrop Overlay */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Close menu backdrop"
              className={`fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[99998] transition-opacity duration-300 border-none outline-none cursor-default ${
                isMenuOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            />

            {/* Full Viewport Right Slide-in Panel */}
            <div
              className={`fixed top-0 right-0 bottom-0 h-screen w-full sm:w-[380px] bg-white z-[99999] transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-white shrink-0">
                <Link
                  href="/"
                  onClick={toggleMenu}
                  className="nav_brand !no-underline"
                >
                  <span className="nav_brand-logo">
                    <span className="nav_brand-u2 font-black">U2</span>
                    <span className="nav_brand-divider" />
                    <span className="nav_brand-label">
                      <span className="nav_brand-label-top">Travels &amp;</span>
                      <span className="nav_brand-label-bottom">Tours</span>
                    </span>
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={toggleMenu}
                  className="p-2 text-slate-600 hover:text-[#013b85] hover:bg-slate-100 rounded-xl transition-all cursor-pointer border-none"
                  aria-label="Close Menu"
                >
                  <X className="h-6 w-6 stroke-[2.5]" />
                </button>
              </div>

              {/* Drawer Navigation Links (Full Scrollable Area) */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                {isAgent ? (
                  <>
                    <Link
                      href="/agent"
                      onClick={toggleMenu}
                      className="text-slate-800 hover:text-[#013b85] font-extrabold text-lg py-3 border-b border-slate-100 no-underline transition-colors flex items-center justify-between"
                    >
                      <span>Dashboard</span>
                      <ChevronDown className="h-4 w-4 text-slate-400 -rotate-90" />
                    </Link>
                    <Link
                      href="/agent/profile"
                      onClick={toggleMenu}
                      className="text-slate-800 hover:text-[#013b85] font-extrabold text-lg py-3 border-b border-slate-100 no-underline transition-colors flex items-center justify-between"
                    >
                      <span>Profile Settings</span>
                      <ChevronDown className="h-4 w-4 text-slate-400 -rotate-90" />
                    </Link>
                    <div className="pt-4 w-full mt-auto">
                      <button
                        type="button"
                        onClick={() => {
                          handleLogout();
                          toggleMenu();
                        }}
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all border-none cursor-pointer shadow-md"
                      >
                        Log Out
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Tours Expandable Accordion */}
                    <div className="w-full border-b border-slate-100 pb-2">
                      <button
                        type="button"
                        onClick={() => setIsMobileToursOpen(!isMobileToursOpen)}
                        className="w-full text-left flex items-center justify-between border-none bg-transparent py-2.5 outline-none font-extrabold text-lg text-slate-800 hover:text-[#013b85] cursor-pointer"
                      >
                        <span>Tours &amp; Packages</span>
                        <ChevronDown
                          className={`h-5 w-5 text-[#dfa447] transition-transform duration-200 ${
                            isMobileToursOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isMobileToursOpen && (
                        <div className="pl-4 mt-2 flex flex-col gap-2.5 border-l-2 border-[#dfa447]/40 pb-2">
                          <Link
                            href="/tours"
                            onClick={toggleMenu}
                            className="text-[#013b85] font-black text-xs uppercase tracking-wider py-1 no-underline block"
                          >
                            All Tour Packages
                          </Link>
                          <Link
                            href="/tours?category=sightseeing"
                            onClick={toggleMenu}
                            className="text-slate-600 hover:text-[#013b85] text-sm font-bold py-1 no-underline transition-colors block"
                          >
                            Day Tours
                          </Link>
                          <Link
                            href="/tours?category=malaysian"
                            onClick={toggleMenu}
                            className="text-slate-600 hover:text-[#013b85] text-sm font-bold py-1 no-underline transition-colors block"
                          >
                            Malaysian Tours
                          </Link>
                          <Link
                            href="/tours?category=world"
                            onClick={toggleMenu}
                            className="text-slate-600 hover:text-[#013b85] text-sm font-bold py-1 no-underline transition-colors block"
                          >
                            World Tours
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Other Nav Links */}
                    <Link
                      href="/transportation"
                      onClick={toggleMenu}
                      className="text-slate-800 hover:text-[#013b85] font-extrabold text-lg py-3 border-b border-slate-100 no-underline transition-colors flex items-center justify-between"
                    >
                      <span>Transportation</span>
                      <ChevronDown className="h-4 w-4 text-slate-300 -rotate-90" />
                    </Link>

                    <Link
                      href="/mice"
                      onClick={toggleMenu}
                      className="text-slate-800 hover:text-[#013b85] font-extrabold text-lg py-3 border-b border-slate-100 no-underline transition-colors flex items-center justify-between"
                    >
                      <span>MICE Services</span>
                      <ChevronDown className="h-4 w-4 text-slate-300 -rotate-90" />
                    </Link>

                    <Link
                      href="/about-us"
                      onClick={toggleMenu}
                      className="text-slate-800 hover:text-[#013b85] font-extrabold text-lg py-3 border-b border-slate-100 no-underline transition-colors flex items-center justify-between"
                    >
                      <span>About Us</span>
                      <ChevronDown className="h-4 w-4 text-slate-300 -rotate-90" />
                    </Link>

                    <Link
                      href="/contact"
                      onClick={toggleMenu}
                      className="text-slate-800 hover:text-[#013b85] font-extrabold text-lg py-3 border-b border-slate-100 no-underline transition-colors flex items-center justify-between"
                    >
                      <span>Contact Us</span>
                      <ChevronDown className="h-4 w-4 text-slate-300 -rotate-90" />
                    </Link>

                    <div className="pt-6 w-full mt-auto">
                      <Link
                        href="/register"
                        onClick={toggleMenu}
                        className="bg-[#dfa447] hover:bg-[#013b85] text-white text-center w-full py-4 rounded-xl font-extrabold tracking-wider text-xs uppercase transition-all shadow-md !no-underline block"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

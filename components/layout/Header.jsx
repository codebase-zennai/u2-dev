"use client";

import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { tours } from "@/data/tours";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [isAgentDrawerOpen, setIsAgentDrawerOpen] = useState(false);

  // Scroll visibility states
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  // Mobile Accordion States
  const [isMobileToursOpen, setIsMobileToursOpen] = useState(false);
  const [isMobileMalaysianOpen, setIsMobileMalaysianOpen] = useState(false);

  // Listen to scroll direction to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
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
    <div 
      className="nav_wrapper fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <nav className="navbar w-full">
        <div className="nav_wrap flex items-center justify-between w-full max-w-7xl mx-auto px-4 py-3 md:px-8">
          {/* Left — Logo or Agent Hamburger */}
          {isAgent ? (
            <div className="nav_col nav_col-left flex justify-start flex-1 min-[992px]:flex-none">
              <button
                type="button"
                onClick={toggleAgentDrawer}
                className="p-2 -ml-2 text-slate-700 hover:text-[#013b85] hover:bg-slate-100 rounded-lg transition-all cursor-pointer flex items-center justify-center"
                aria-label="Toggle Agent Menu"
              >
                {isAgentDrawerOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          ) : (
            <div className="nav_col nav_col-left hidden min-[992px]:flex min-[992px]:flex-1"></div>
          )}

          {/* Center — brand + links */}
          <div className="nav_col nav_col-center flex-1 min-[992px]:flex-none min-[992px]:w-auto flex justify-start min-[992px]:justify-center gap-8 items-center">
            {isAgent ? (
              <div className="flex items-center gap-3 text-[#013b85] py-2">
                <span className="font-black text-base md:text-xl uppercase tracking-widest">
                  Agent Portal
                </span>
                <span className="text-slate-300 font-light text-base md:text-xl">
                  |
                </span>
                <Link
                  href="/agent"
                  className="nav_brand !no-underline flex items-center shrink-0"
                >
                  <span className="nav_brand-logo">
                    <span className="nav_brand-u2">U2</span>
                    <span className="nav_brand-divider"></span>
                    <span className="nav_brand-label">
                      <span className="nav_brand-label-top">Travels &amp;</span>
                      <span className="nav_brand-label-bottom">Tours</span>
                    </span>
                  </span>
                </Link>
              </div>
            ) : (
              <>
                {/* Desktop Left Links */}
                <div className="hidden min-[992px]:flex items-center gap-8">
                  {/* Desktop Tours Menu */}
                  <NavigationMenu className="relative">
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="nav_link bg-transparent border-none shadow-none cursor-pointer focus:bg-transparent hover:bg-transparent data-[state=open]:bg-transparent outline-none">
                          <span className="z-index-2 flex items-center gap-1.5">
                            Tours
                            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </span>
                          <div className="link_line"></div>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="w-[600px] p-6">
                          <div className="grid grid-cols-2 gap-8 text-left">
                            {/* Left Column: Malaysian Tours */}
                            <div className="flex flex-col gap-3">
                              <h4 className="text-xs font-black uppercase tracking-wider text-[#013b85] border-b border-slate-100 pb-2">
                                Malaysian Tours
                              </h4>
                              <div className="flex flex-col gap-4 pt-1">
                                <Link
                                  href="/tours?category=sightseeing"
                                  className="group/item flex flex-col gap-1 !no-underline"
                                >
                                  <span className="text-sm font-extrabold text-slate-800 group-hover/item:text-[#013b85] transition-colors">
                                    Day tours
                                  </span>
                                  <span className="text-xs text-slate-400 font-medium">
                                    Short sightseeing & local day trips
                                  </span>
                                </Link>
                                <Link
                                  href="/tours?category=malaysian"
                                  className="group/item flex flex-col gap-1 !no-underline"
                                >
                                  <span className="text-sm font-extrabold text-slate-800 group-hover/item:text-[#013b85] transition-colors">
                                    All Malaysian Tours
                                  </span>
                                  <span className="text-xs text-slate-400 font-medium">
                                    Multi-day domestic retreats & destinations
                                  </span>
                                </Link>
                              </div>
                            </div>

                            {/* Right Column: World Tours */}
                            <div className="flex flex-col gap-3 border-l border-slate-100 pl-8">
                              <h4 className="text-xs font-black uppercase tracking-wider text-[#013b85] border-b border-slate-100 pb-2">
                                World Tours
                              </h4>
                              <div className="flex flex-col gap-4 pt-1">
                                <Link
                                  href="/tours?category=world"
                                  className="group/item flex flex-col gap-1 !no-underline"
                                >
                                  <span className="text-sm font-extrabold text-slate-800 group-hover/item:text-[#013b85] transition-colors">
                                    World Tours
                                  </span>
                                  <span className="text-xs text-slate-400 font-medium">
                                    Curated international tour packages
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>

                  {/* Desktop Transportation Link */}
                  <Link
                    href="/transportation"
                    className="nav_link inline-flex"
                  >
                    <div className="z-index-2">Transportation</div>
                    <div className="link_line"></div>
                  </Link>
                </div>

                {/* Brand Logo (Visible in Center ONLY if Logged Out) */}
                {!isAgent && (
                  <Link href="/" className="nav_brand !no-underline flex items-center shrink-0">
                    <span className="nav_brand-logo">
                      <span className="nav_brand-u2">U2</span>
                      <span className="nav_brand-divider"></span>
                      <span className="nav_brand-label">
                        <span className="nav_brand-label-top">Travels &amp;</span>
                        <span className="nav_brand-label-bottom">Tours</span>
                      </span>
                    </span>
                  </Link>
                )}

                {/* Desktop Right Links */}
                <div className="hidden min-[992px]:flex items-center gap-8">
                  {/* Desktop MICE Link */}
                  <Link
                    href="/mice"
                    className="nav_link inline-flex"
                  >
                    <div className="z-index-2">MICE</div>
                    <div className="link_line"></div>
                  </Link>

                  {/* Desktop About Link */}
                  <Link
                    href="/about-us"
                    className="nav_link inline-flex"
                  >
                    <div className="z-index-2">About</div>
                    <div className="link_line"></div>
                  </Link>

                  {/* Desktop Contact Link */}
                  <Link
                    href="/contact"
                    className="nav_link inline-flex"
                  >
                    <div className="z-index-2">Contact</div>
                    <div className="link_line"></div>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Right — Agent Login / Profile */}
          <div
            className={`nav_col nav_col-right ${
              isAgent ? "flex" : "hidden min-[992px]:flex min-[992px]:flex-1"
            } items-center gap-4 justify-end`}
          >
          </div>

          {/* Hamburger — mobile only */}
          {!isAgent && (
            <button
              type="button"
              className="min-[992px]:hidden p-2 text-slate-700 hover:text-[#013b85] hover:bg-slate-100 rounded-lg transition-all cursor-pointer flex items-center justify-center"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Drawer (Nested Accordion Structure) */}
      <div
        className={`fixed inset-x-0 top-[60px] md:top-[70px] bottom-0 bg-white z-40 overflow-y-auto pb-24 transition-all duration-300 ease-in-out lg:hidden border-t border-slate-100 shadow-xl ${isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4 pointer-events-none"}`}
      >
        <div className="nav_menu-items-inner flex flex-col gap-6 pt-6 px-6">
          {isAgent ? (
            <>
              {/* Agent Mobile Links */}
              <Link
                href="/agent"
                onClick={toggleMenu}
                className="nav_link font-bold text-3xl no-underline"
              >
                Dashboard
              </Link>
              <Link
                href="/agent/profile"
                onClick={toggleMenu}
                className="nav_link font-bold text-3xl no-underline"
              >
                Profile
              </Link>
              <div className="pt-4 border-t border-slate-100 w-full mt-4 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="nav_agent-login inline-block text-center w-full cursor-pointer bg-rose-600 border-rose-600 !text-white"
                >
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Tours Expandable Item */}
              <div className="w-full">
                <button
                  type="button"
                  onClick={() => setIsMobileToursOpen(!isMobileToursOpen)}
                  className="nav_link w-full text-left flex items-center justify-between border-none bg-transparent py-2 outline-none font-bold text-3xl cursor-pointer"
                >
                  <span>Tours</span>
                  <ChevronDown
                    className={`h-6 w-6 transition-transform duration-200 ${isMobileToursOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isMobileToursOpen && (
                  <div className="pl-4 mt-2 flex flex-col gap-4 border-l border-slate-200">
                    {/* Level 2: Malaysian Tours */}
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setIsMobileMalaysianOpen(!isMobileMalaysianOpen)
                        }
                        className="w-full text-left flex items-center justify-between py-2 text-xl font-semibold text-slate-700 hover:text-[#013b85] outline-none cursor-pointer"
                      >
                        <span>Malaysian Tours</span>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${isMobileMalaysianOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isMobileMalaysianOpen && (
                        <div className="pl-4 mt-1.5 flex flex-col gap-3 border-l border-slate-100">
                          <Link
                            href="/tours?category=sightseeing"
                            onClick={toggleMenu}
                            className="text-slate-600 hover:text-[#013b85] text-base font-bold uppercase py-0.5 no-underline transition-colors block"
                          >
                            Day tours
                          </Link>
                          <Link
                            href="/tours?category=malaysian"
                            onClick={toggleMenu}
                            className="text-slate-600 hover:text-[#013b85] text-base font-bold uppercase py-0.5 no-underline transition-colors block"
                          >
                            All Malaysian Tours
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Level 2: World Tours */}
                    <Link
                      href="/tours?category=world"
                      onClick={toggleMenu}
                      className="text-slate-700 hover:text-[#013b85] text-xl font-semibold py-2 no-underline transition-colors block"
                    >
                      World Tours
                    </Link>
                  </div>
                )}
              </div>

              {/* Other Links */}
              <Link
                href="/transportation"
                onClick={toggleMenu}
                className="nav_link font-bold text-3xl no-underline"
              >
                Transportation
              </Link>
              <Link
                href="/mice"
                onClick={toggleMenu}
                className="nav_link font-bold text-3xl no-underline"
              >
                MICE
              </Link>
              <Link
                href="/about-us"
                onClick={toggleMenu}
                className="nav_link font-bold text-3xl no-underline"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={toggleMenu}
                className="nav_link font-bold text-3xl no-underline"
              >
                Contact
              </Link>

              {/* Agent Login / Logout inside mobile menu */}
              {/* <div className="pt-4 border-t border-slate-100 w-full mt-4 flex flex-col gap-3">
                <Link
                  href="/agent-login"
                  onClick={toggleMenu}
                  className="nav_agent-login inline-block text-center w-full no-underline"
                >
                  Agent Login
                </Link>
              </div> */}
            </>
          )}
        </div>
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
    </div>
  );
}

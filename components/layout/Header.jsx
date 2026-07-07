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
import { useEffect, useState } from "react";
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
  const [activeTab, setActiveTab] = useState("malaysian");
  const [isAgent, setIsAgent] = useState(false);
  const [isAgentDrawerOpen, setIsAgentDrawerOpen] = useState(false);

  // Mobile Accordion States
  const [isMobileToursOpen, setIsMobileToursOpen] = useState(false);
  const [isMobileMalaysianOpen, setIsMobileMalaysianOpen] = useState(false);
  const [isMobileWorldOpen, setIsMobileWorldOpen] = useState(false);

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

  // Shared tour list data for consistency
  const malaysianTours = tours
    .filter((t) => t.category === "malaysian")
    .map((t) => ({ name: t.name, href: `/tours/${t.slug}` }));

  const worldTours = tours
    .filter((t) => t.category === "world")
    .map((t) => ({ name: t.name, href: `/tours/${t.slug}` }));

  return (
    <div className="nav_wrapper">
      <nav className="navbar">
        <div className="nav_wrap">
          {/* Left — Logo or Agent Hamburger */}
          {isAgent ? (
            <div className="nav_col nav_col-left flex justify-start">
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
            <div className="nav_col nav_col-left hidden min-[992px]:flex"></div>
          )}

          {/* Center — brand + links */}
          <div className="nav_col nav_col-center w-full min-[992px]:w-auto justify-between min-[992px]:justify-center gap-8">
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
                {/* Desktop Tours Menu */}
                <div className="hidden min-[992px]:block">
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
                          <div className="grid grid-cols-[180px_1fr] gap-6 text-left">
                            {/* Left Panel - Categories */}
                            <div className="flex flex-col gap-2 border-r border-slate-100 pr-4 justify-between min-h-[220px]">
                              <div className="flex flex-col gap-2">
                                <button
                                  type="button"
                                  onMouseEnter={() => setActiveTab("malaysian")}
                                  onClick={() => setActiveTab("malaysian")}
                                  className={`w-full text-left px-3 py-2.5 rounded-lg text-lg font-bold transition-all cursor-pointer ${
                                    activeTab === "malaysian"
                                      ? "bg-slate-100 text-[#013b85]"
                                      : "text-slate-600 hover:bg-slate-50"
                                  }`}
                                >
                                  Malaysian Tours
                                </button>
                                <button
                                  type="button"
                                  onMouseEnter={() => setActiveTab("world")}
                                  onClick={() => setActiveTab("world")}
                                  className={`w-full text-left px-3 py-2.5 rounded-lg text-lg font-bold transition-all cursor-pointer ${
                                    activeTab === "world"
                                      ? "bg-slate-100 text-[#013b85]"
                                      : "text-slate-600 hover:bg-slate-50"
                                  }`}
                                >
                                  World Tours
                                </button>
                              </div>
                              <Link
                                href="/tours"
                                className="w-full text-center bg-[#013b85] hover:bg-[#7ff74b] hover:!text-black !text-white font-extrabold text-[11px] uppercase tracking-wider py-2.5 px-3 rounded-lg shadow-sm hover:shadow-md transition-all !no-underline block"
                              >
                                View All Tours
                              </Link>
                            </div>

                            {/* Right Panel - Submenus */}
                            <div className="min-h-[220px] flex items-center">
                              {activeTab === "malaysian" && (
                                <div className="grid grid-cols-3 gap-x-4 gap-y-3 w-full">
                                  {malaysianTours.map((tour) => (
                                    <Link
                                      key={tour.href}
                                      href={tour.href}
                                      className="text-slate-600 hover:text-[#013b85] hover:underline text-[11px] font-bold uppercase tracking-wider transition-colors"
                                    >
                                      {tour.name}
                                    </Link>
                                  ))}
                                </div>
                              )}

                              {activeTab === "world" && (
                                <div className="grid grid-cols-3 gap-x-4 gap-y-3 w-full">
                                  {worldTours.map((tour) => (
                                    <Link
                                      key={tour.href}
                                      href={tour.href}
                                      className="text-slate-600 hover:text-[#013b85] hover:underline text-[11px] font-bold uppercase tracking-wider transition-colors"
                                    >
                                      {tour.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>

                {/* Desktop Transportation Link */}
                <Link
                  href="/transportation"
                  className="nav_link hidden min-[992px]:inline-flex"
                >
                  <div className="z-index-2">Transportation</div>
                  <div className="link_line"></div>
                </Link>

                {/* Brand Logo (Visible in Center ONLY if Logged Out) */}
                {!isAgent && (
                  <Link href="/" className="nav_brand !no-underline">
                    
                    <span className="nav_brand-logo">
                      <span className="nav_brand-u2">U2</span>
                      <span className="nav_brand-divider"></span>
                      <span className="nav_brand-label">
                        <span className="nav_brand-label-top">Travels &amp;</span>
                        <span className="nav_brand-label-bottom">Tours</span>
                      </span>
                    </span>
                   
                    {/* <Image 
                      src="https://www.u2travels.com.my/public/images/u2_travels_malaysia.png"
                      alt="U2 Travels Malaysia Logo"
                      width={160}
                      height={50}
                      className="object-contain"
                      priority
                    /> */}
                  </Link>
                )}

                {/* Desktop About Link */}
                <Link
                  href="/about-us"
                  className="nav_link hidden min-[992px]:inline-flex"
                >
                  <div className="z-index-2">About</div>
                  <div className="link_line"></div>
                </Link>

                {/* Desktop Contact Link */}
                <Link
                  href="/contact"
                  className="nav_link hidden min-[992px]:inline-flex"
                >
                  <div className="z-index-2">Contact</div>
                  <div className="link_line"></div>
                </Link>
              </>
            )}
          </div>

          {/* Right — Agent Login / Profile */}
          <div
            className={`nav_col nav_col-right ${
              isAgent ? "flex" : "hidden min-[992px]:flex"
            } items-center gap-4 justify-end`}
          >
            {isAgent ? (
              <Link
                href="/agent/profile"
                className="flex items-center gap-2 bg-[#013b85]/10 hover:bg-[#013b85]/20 text-[#013b85] font-extrabold text-[11px] uppercase tracking-wider py-2.5 px-3 md:px-5 rounded-full transition-all border border-[#013b85]/20 !no-underline cursor-pointer"
              >
                <User className="h-4 w-4 shrink-0" />
                <span className="hidden md:inline">Profile</span>
              </Link>
            ) : (
              <Link
                href="/agent-login"
                className="nav_agent-login !no-underline"
              >
                Agent Login
              </Link>
            )}
          </div>

          {/* Hamburger — mobile only */}
          {!isAgent && (
            <button
              type="button"
              className={`nav_button ${isMenuOpen ? "is-open" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <div className="nav_button-inner">
                <div className="nav_button-line is-top"></div>
                <div className="nav_button-line is-middle"></div>
                <div className="nav_button-line is-bottom"></div>
              </div>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Drawer (Nested Accordion Structure) */}
      <div
        className={`nav_menu-items overflow-y-auto pb-24 ${isMenuOpen ? "is-open" : ""}`}
      >
        <div className="nav_menu-items-inner flex flex-col gap-6 pt-6">
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
                    <Link
                      href="/tours"
                      onClick={toggleMenu}
                      className="text-[#013b85] hover:underline text-lg font-bold uppercase py-1.5 no-underline transition-colors block"
                    >
                      View All Tours
                    </Link>

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
                          {malaysianTours.map((tour) => (
                            <Link
                              key={tour.href}
                              href={tour.href}
                              onClick={toggleMenu}
                              className="text-slate-600 hover:text-[#013b85] text-base font-bold uppercase py-0.5 no-underline transition-colors block"
                            >
                              {tour.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Level 2: World Tours */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setIsMobileWorldOpen(!isMobileWorldOpen)}
                        className="w-full text-left flex items-center justify-between py-2 text-xl font-semibold text-slate-700 hover:text-[#013b85] outline-none cursor-pointer"
                      >
                        <span>World Tours</span>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${isMobileWorldOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isMobileWorldOpen && (
                        <div className="pl-4 mt-1.5 flex flex-col gap-3 border-l border-slate-100">
                          {worldTours.map((tour) => (
                            <Link
                              key={tour.href}
                              href={tour.href}
                              onClick={toggleMenu}
                              className="text-slate-600 hover:text-[#013b85] text-base font-bold uppercase py-0.5 no-underline transition-colors block"
                            >
                              {tour.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
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
              <div className="pt-4 border-t border-slate-100 w-full mt-4 flex flex-col gap-3">
                <Link
                  href="/agent-login"
                  onClick={toggleMenu}
                  className="nav_agent-login inline-block text-center w-full no-underline"
                >
                  Agent Login
                </Link>
              </div>
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

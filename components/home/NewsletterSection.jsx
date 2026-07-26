"use client";

import { Check, ChevronDown, MapPin, Search, Sparkle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NewsletterSection() {
  const router = useRouter();

  // Search state
  const [destination, setDestination] = useState("All Locations");
  const [packageType, setPackageType] = useState("All Packages");

  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const destRef = useRef(null);
  const typeRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (destRef.current && !destRef.current.contains(e.target)) {
        setIsDestOpen(false);
      }
      if (typeRef.current && !typeRef.current.contains(e.target)) {
        setIsTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    // Package Type mapping
    if (packageType === "Day Tours") {
      params.set("category", "sightseeing");
    } else if (packageType === "Malaysian Tours") {
      params.set("category", "malaysian");
    } else if (packageType === "World Tours") {
      params.set("category", "world");
    } else {
      params.set("category", "all");
    }

    // Destination mapping
    if (
      destination &&
      destination !== "All Locations" &&
      destination !== "Where to?"
    ) {
      const searchVal =
        destination === "Sabah & Sarawak" ? "Sabah" : destination;
      params.set("search", searchVal);
    }

    router.push(`/tours?${params.toString()}`);
  };

  const DESTINATIONS = [
    "All Locations",
    "Kuala Lumpur",
    "Genting Highlands",
    "Langkawi",
    "Penang",
    "Melaka",
    "Kuantan",
    "Sabah & Sarawak",
    "Dubai",
    "Europe",
    "India",
    "Bali",
    "Korea",
    "Nepal",
    "Thailand",
    "Vietnam",
  ];

  const PACKAGE_TYPES = [
    "All Packages",
    "Day Tours",
    "Malaysian Tours",
    "World Tours",
  ];

  return (
    <section className="section background-color-black">
      <div className="container-large flex flex-col items-center gap-10">
        {/* Section Heading */}
        <div className="max-width-700 text-center">
          <p className="text-size-eyebrow margin-bottom-16 text-color-lightgrey">
            Find Your Journey
          </p>
          <h2 className="heading-style-h2 is-title">
            Let's Explore the World Together
          </h2>
        </div>

        {/* Dynamic Search Bar (Restored Original White Card Aesthetics) */}
        <div className="w-full max-w-3xl bg-white rounded-3xl p-2 md:p-3 shadow-2xl flex flex-col md:flex-row items-stretch gap-2 z-30 relative">
          {/* Destination Selector */}
          <div ref={destRef} className="relative flex-1">
            {/* biome-ignore lint/a11y/noStaticElementInteractions: click toggle */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: click toggle */}
            <div
              onClick={() => {
                setIsDestOpen(!isDestOpen);
                setIsTypeOpen(false);
              }}
              className="flex items-center gap-4 px-5 py-3 cursor-pointer hover:bg-slate-50 rounded-2xl transition-colors group text-left"
            >
              <MapPin className="h-5 w-5 text-[#dfa447] shrink-0" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[9px] font-bold tracking-[0.15em] text-[#013b85] uppercase leading-none mb-1.5">
                  Location / Destination
                </span>
                <span className="text-sm font-semibold text-slate-800 leading-none truncate">
                  {destination}
                </span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-transform duration-300 ${
                  isDestOpen ? "rotate-180 text-[#013b85]" : ""
                }`}
              />
            </div>

            {/* Custom Clean White Dropdown Menu */}
            {isDestOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 max-h-60 overflow-y-auto">
                {DESTINATIONS.map((dest) => {
                  const isSelected = destination === dest;
                  return (
                    // biome-ignore lint/a11y/noStaticElementInteractions: option select
                    // biome-ignore lint/a11y/useKeyWithClickEvents: option select
                    <div
                      key={dest}
                      onClick={() => {
                        setDestination(dest);
                        setIsDestOpen(false);
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-[#013b85] text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-[#013b85]"
                      }`}
                    >
                      <span>{dest}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#7ff74b]" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Divider on Desktop */}
          <div className="hidden md:block w-px bg-slate-100 self-stretch my-2"></div>

          {/* Package Type Selector */}
          <div ref={typeRef} className="relative flex-1">
            {/* biome-ignore lint/a11y/noStaticElementInteractions: click toggle */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: click toggle */}
            <div
              onClick={() => {
                setIsTypeOpen(!isTypeOpen);
                setIsDestOpen(false);
              }}
              className="flex items-center gap-4 px-5 py-3 cursor-pointer hover:bg-slate-50 rounded-2xl transition-colors group text-left"
            >
              <Sparkle className="h-5 w-5 text-[#dfa447] shrink-0" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[9px] font-bold tracking-[0.15em] text-[#013b85] uppercase leading-none mb-1.5">
                  Package Type
                </span>
                <span className="text-sm font-semibold text-slate-800 leading-none truncate">
                  {packageType}
                </span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-transform duration-300 ${
                  isTypeOpen ? "rotate-180 text-[#013b85]" : ""
                }`}
              />
            </div>

            {/* Custom Clean White Dropdown Menu */}
            {isTypeOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50">
                {PACKAGE_TYPES.map((type) => {
                  const isSelected = packageType === type;
                  return (
                    // biome-ignore lint/a11y/noStaticElementInteractions: option select
                    // biome-ignore lint/a11y/useKeyWithClickEvents: option select
                    <div
                      key={type}
                      onClick={() => {
                        setPackageType(type);
                        setIsTypeOpen(false);
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-[#013b85] text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-[#013b85]"
                      }`}
                    >
                      <span>{type}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#7ff74b]" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Search Button (Original Corporate Green Accent) */}
          <button
            type="button"
            onClick={handleSearch}
            className="bg-[#7ff74b] hover:bg-[#60d930] text-[#080808] rounded-2xl md:rounded-full px-8 py-3.5 flex items-center justify-center gap-2 font-bold text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:shadow-lg shrink-0 cursor-pointer border-none"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-4 pt-10 border-t border-white/10 w-full max-w-4xl">
          <div className="flex flex-col items-center text-center">
            <span
              className="text-4xl md:text-5xl font-bold text-[#7ff74b] tracking-tight leading-none mb-2"
              style={{
                fontFamily: "var(--font-playfair), serif",
                textTransform: "none",
              }}
            >
              50K+
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-white/70 uppercase tracking-widest">
              Happy Travellers
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span
              className="text-4xl md:text-5xl font-bold text-[#7ff74b] tracking-tight leading-none mb-2"
              style={{
                fontFamily: "var(--font-playfair), serif",
                textTransform: "none",
              }}
            >
              150+
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-white/70 uppercase tracking-widest">
              Curated Packages
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span
              className="text-4xl md:text-5xl font-bold text-[#7ff74b] tracking-tight leading-none mb-2"
              style={{
                fontFamily: "var(--font-playfair), serif",
                textTransform: "none",
              }}
            >
              25+
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-white/70 uppercase tracking-widest">
              Destinations
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span
              className="text-4xl md:text-5xl font-bold text-[#dfa447] tracking-tight leading-none mb-2 flex items-center gap-0.5"
              style={{
                fontFamily: "var(--font-playfair), serif",
                textTransform: "none",
              }}
            >
              4.9
              <span className="text-2xl md:text-3xl text-[#dfa447] align-middle">
                ★
              </span>
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-white/70 uppercase tracking-widest">
              Guest Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

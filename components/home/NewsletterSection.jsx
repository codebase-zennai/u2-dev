"use client";

import { Sparkle, MapPin, Calendar, Search, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewsletterSection() {
  const router = useRouter();

  // Search state
  const [destination, setDestination] = useState("Where to?");
  const [packageType, setPackageType] = useState("Any type");
  const [travelDate, setTravelDate] = useState("");

  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  // Close dropdowns on outer click
  useEffect(() => {
    const closeDropdowns = () => {
      setIsDestOpen(false);
      setIsTypeOpen(false);
    };
    document.addEventListener("click", closeDropdowns);
    return () => document.removeEventListener("click", closeDropdowns);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination && destination !== "Where to?")
      params.set("destination", destination);
    if (packageType && packageType !== "Any type")
      params.set("type", packageType);
    if (travelDate) params.set("date", travelDate);
    router.push(`/tours?${params.toString()}`);
  };

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

        {/* Dynamic Search Bar (Following Corporate Color Scheme) */}
        <div className="w-full max-w-4xl bg-white rounded-3xl p-2 md:p-3 shadow-2xl flex flex-col md:flex-row items-stretch gap-2 z-30">
          {/* Destination Selector */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsDestOpen(!isDestOpen);
              setIsTypeOpen(false);
            }}
            className="relative flex-1 flex items-center gap-4 px-5 py-3 cursor-pointer hover:bg-slate-50 rounded-2xl md:rounded-l-2xl transition-colors group"
          >
            <MapPin className="h-5 w-5 text-[#dfa447] shrink-0" />
            <div className="flex flex-col flex-1">
              <span className="text-[9px] font-bold tracking-[0.15em] text-[#013b85] uppercase leading-none mb-1.5">
                Destination
              </span>
              <span className="text-sm font-semibold text-slate-800 leading-none">
                {destination}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />

            {/* Dropdown Menu */}
            {isDestOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-40">
                {[
                  "Kuala Lumpur",
                  "Penang",
                  "Langkawi",
                  "Sabah & Sarawak",
                  "World Tour",
                ].map((dest) => (
                  <button
                    type="button"
                    key={dest}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDestination(dest);
                      setIsDestOpen(false);
                    }}
                    className="w-full text-left px-5 py-2 hover:bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-[#013b85] border-none bg-transparent cursor-pointer"
                  >
                    {dest}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider on Desktop */}
          <div className="hidden md:block w-px bg-slate-100 self-stretch my-2"></div>

          {/* Package Type Selector */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsTypeOpen(!isTypeOpen);
              setIsDestOpen(false);
            }}
            className="relative flex-1 flex items-center gap-4 px-5 py-3 cursor-pointer hover:bg-slate-50 rounded-2xl transition-colors group"
          >
            <Sparkle className="h-5 w-5 text-[#dfa447] shrink-0" />
            <div className="flex flex-col flex-1">
              <span className="text-[9px] font-bold tracking-[0.15em] text-[#013b85] uppercase leading-none mb-1.5">
                Package Type
              </span>
              <span className="text-sm font-semibold text-slate-800 leading-none">
                {packageType}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />

            {/* Dropdown Menu */}
            {isTypeOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-40">
                {[
                  "Malaysian Tours",
                  "World Tours",
                  "Sightseeing Tours",
                  "Any Type",
                ].map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPackageType(type);
                      setIsTypeOpen(false);
                    }}
                    className="w-full text-left px-5 py-2 hover:bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-[#013b85] border-none bg-transparent cursor-pointer"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider on Desktop */}
          <div className="hidden md:block w-px bg-slate-100 self-stretch my-2"></div>

          {/* Travel Date Selector */}
          <div className="relative flex-1 flex items-center gap-4 px-5 py-3 cursor-pointer hover:bg-slate-50 rounded-2xl md:rounded-r-none transition-colors group">
            <Calendar className="h-5 w-5 text-[#dfa447] shrink-0" />
            <div className="flex flex-col flex-1">
              <span className="text-[9px] font-bold tracking-[0.15em] text-[#013b85] uppercase leading-none mb-1.5">
                Travel Date
              </span>
              <span className="text-sm font-semibold text-slate-800 leading-none">
                {travelDate || "dd/mm/yyyy"}
              </span>
            </div>
            <Calendar className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />

            {/* Hidden Native Date Input Overlay */}
            <input
              type="date"
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                const dateVal = e.target.value; // yyyy-mm-dd
                if (dateVal) {
                  const [yy, mm, dd] = dateVal.split("-");
                  setTravelDate(`${dd}/${mm}/${yy}`);
                }
              }}
              className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
            />
          </div>

          {/* Search Button (Using Corporate Green Accent) */}
          <button
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

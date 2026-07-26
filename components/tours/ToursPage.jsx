"use client";

import { ArrowUpDown, Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { tours as localTours } from "@/data/tours";
import { supabase } from "@/lib/supabaseClient";

export default function ToursPage({
  initialCategory = "all",
  initialSearch = "",
}) {
  const [toursData, setToursData] = useState(localTours);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (
      ((initialCategory && initialCategory !== "all") || initialSearch) &&
      sectionRef.current
    ) {
      setTimeout(() => {
        sectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, [initialCategory, initialSearch]);

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch !== undefined) {
      setSearchTerm(initialSearch);
    }
  }, [initialSearch]);
  const [sortBy, setSortBy] = useState("name-asc");

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchTours() {
      try {
        const { data, error } = await supabase
          .from("tours")
          .select("*")
          .order("id", { ascending: true });

        if (!error && data && data.length > 0) {
          setToursData(data);
          console.log(`Loaded ${data.length} tours from Supabase!`);
        } else {
          console.log(
            "Supabase tours table empty or not found, using local fallback.",
          );
        }
      } catch (err) {
        console.warn(
          "Error checking Supabase tours, using local fallback:",
          err,
        );
      }
    }
    fetchTours();
  }, []);

  // Filter and Sort Logic
  const filteredPackages = useMemo(() => {
    let result = toursData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      return a.name.localeCompare(b.name); // name-asc
    });

    return result;
  }, [searchTerm, selectedCategory, sortBy, toursData]);

  // Helper for image src fallback
  const getTourImage = (img) => {
    if (!img) return "/images/locations/locations-1.jpg";
    if (
      img.startsWith("/images/") ||
      img.startsWith("http://") ||
      img.startsWith("https://")
    )
      return img;
    return "/images/locations/locations-1.jpg";
  };

  // Render package grid
  const renderGrid = () => (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {filteredPackages.map((tour, idx) => (
        <li
          key={`${tour.id}-${tour.slug || idx}`}
          className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full animate-fade-in"
        >
          {/* Visual Container */}
          <div className="aspect-[1.5] w-full relative overflow-hidden bg-slate-100">
            <Image
              src={getTourImage(tour.image)}
              alt={tour.name}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority={idx < 3}
            />
            {/* Category badge */}
            <div className="absolute left-4 top-4 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#013b85] shadow-sm">
              {tour.category === "malaysian"
                ? "Local Tour"
                : tour.category === "sightseeing"
                  ? "Day Tour"
                  : "International"}
            </div>
            {/* Duration overlay tag */}
            <div className="absolute right-4 bottom-4 bg-[#013b85]/90 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-sm">
              {tour.duration}
            </div>
          </div>

          {/* Content Details */}
          <div className="p-5 md:p-6 flex flex-col flex-1">
            <h3 className="font-extrabold text-[#013b85] text-lg mb-2 line-clamp-2 leading-snug group-hover:text-sky-800 transition-colors uppercase tracking-wide">
              {tour.name}
            </h3>
            <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-1">
              {tour.description}
            </p>

            {/* Footer action bar inside card */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                  Price From
                </span>
                <span className="text-xl font-black text-[#013b85]">
                  MYR {tour.price}
                </span>
              </div>
              <Link
                href={`/tours/${tour.slug}`}
                className="bg-[#013b85] hover:bg-[#7ff74b] !text-white hover:!text-black font-extrabold text-[11px] uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 !no-underline"
              >
                View Itinerary
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  const renderEmptyState = () => (
    <div className="text-center py-16 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
      <p className="text-slate-400 text-lg font-bold mb-2">
        No tour packages found
      </p>
      <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
        We couldn\'t find any packages matching your filters. Try checking your
        spelling or resetting filters.
      </p>
      <button
        type="button"
        onClick={() => {
          setSearchTerm("");
          setSelectedCategory("all");
          setSortBy("name-asc");
        }}
        className="bg-[#013b85] hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl transition-all cursor-pointer"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <section className="section is-location-hero">
      <div className="container-large">
        {/* Hero Header */}
        <div className="margin-bottom-48">
          <div className="w-layout-vflex max-width-720">
            <div className="margin-bottom-16">
              <h1 className="heading-style-h1">
                <span
                  className="is-word is-1"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0)"
                      : "translateY(0.5em)",
                    transition:
                      "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
                    display: "inline-block",
                  }}
                >
                  Tour
                </span>{" "}
                <span
                  className="is-word is-2"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0)"
                      : "translateY(0.5em)",
                    transition:
                      "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
                    display: "inline-block",
                  }}
                >
                  Packages
                </span>
              </h1>
            </div>
            <div className="margin-bottom-24">
              <p
                className="text-size-medium"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(0.5em)",
                  transition:
                    "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
                }}
              >
                <strong>Embark on Unforgettable Journeys</strong> – Explore our
                curated selection of Malaysian local gateways and spectacular
                global destinations. Filter by region and find the perfect
                package for your next adventure.
              </p>
            </div>
          </div>
        </div>

        <div
          ref={sectionRef}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(0.5em)",
            transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
          }}
        >
          {/* Filter Controls Panel */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-6 mb-12 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center shadow-sm">
            {/* Left: Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tours, countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#013b85] focus:ring-1 focus:ring-[#013b85] transition-all"
              />
            </div>

            {/* Center: Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <SlidersHorizontal className="text-slate-400 h-4 w-4 hidden md:block mr-1.5" />
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === "all"
                    ? "bg-[#013b85] text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("malaysian")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === "malaysian"
                    ? "bg-[#013b85] text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Malaysian
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("world")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === "world"
                    ? "bg-[#013b85] text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                World
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("sightseeing")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === "sightseeing"
                    ? "bg-[#013b85] text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Day Tours
              </button>
            </div>

            {/* Right: Sort Selection */}
            <div className="relative min-w-[180px]">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold uppercase tracking-wider text-slate-700 outline-none appearance-none cursor-pointer focus:border-[#013b85] transition-all"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-500 w-0 h-0" />
            </div>
          </div>

          {/* Grid list display */}
          {filteredPackages.length > 0 ? renderGrid() : renderEmptyState()}
        </div>
      </div>
    </section>
  );
}

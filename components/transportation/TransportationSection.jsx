"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import localRates from "@/data/transport_rates.json";
import {
  Bus,
  MapPin,
  Calendar,
  Search,
  ArrowLeftRight,
  Clock,
  Users,
  Info,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Phone,
  ShieldCheck,
  Check,
  Heart,
  AlertCircle,
} from "lucide-react";

// Hubs and location mapping constants
const HUB_KUALA_LUMPUR = "Kuala Lumpur (KLIA, City Hotels)";
const HUB_PENANG = "Penang";
const HUB_LANGKAWI = "Langkawi";

const HUBS = [HUB_KUALA_LUMPUR, HUB_PENANG, HUB_LANGKAWI];

export default function TransportationSection() {
  const [rates, setRates] = useState(localRates);
  const [loading, setLoading] = useState(true);
  const [isUsingSupabase, setIsUsingSupabase] = useState(false);

  // Search parameters state
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [selectedHub, setSelectedHub] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [journeyDate, setJourneyDate] = useState("2026-07-24");
  const [forWomen, setForWomen] = useState(false);

  // Autocomplete dropdown UI states
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  // Search results
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("ALL");
  const [selectedVehicleType, setSelectedVehicleType] = useState("ALL");

  // Accordion details states (index based)
  const [expandedDetails, setExpandedDetails] = useState({});

  // Booking Modal
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Booking Form State
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingPax, setBookingPax] = useState("2");
  const [bookingPick, setBookingPick] = useState("");
  const [bookingDrop, setBookingDrop] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");

  // Refs for closing dropdowns on click outside
  const fromRef = useRef(null);
  const toRef = useRef(null);

  // Fetch rates from Supabase on load
  useEffect(() => {
    async function fetchRates() {
      try {
        const { data, error } = await supabase
          .from("transport_rates")
          .select("*")
          .order("id", { ascending: true });

        if (!error && data && data.length > 0) {
          setRates(data);
          setIsUsingSupabase(true);
          console.log(`Loaded ${data.length} rates from Supabase!`);
        } else {
          console.log(
            "Supabase table not found or empty, using local JSON fallback.",
          );
        }
      } catch (err) {
        console.warn("Error checking Supabase, using local JSON data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRates();
  }, []);

  // Click outside listener for dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setShowToDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Set default values initially (Any to Any and All)
  useEffect(() => {
    // Set default date to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setJourneyDate(`${yyyy}-${mm}-${dd}`);

    // Default: Any to Any and All
    setFromInput("");
    setSelectedHub("");
    setToInput("");
    setSelectedDestination("");
    setSelectedVehicleType("ALL");

    // Auto trigger initial search showing all transfer packages
    setTimeout(() => {
      triggerSearch("", "", "ALL");
    }, 100);
  }, [rates]);

  // Clean destination names for consistent categorization
  const cleanDestination = (toLoc) => {
    if (!toLoc) return "";
    const loc = toLoc.toUpperCase();
    if (loc.includes("GEN ") || loc.includes("GENTING"))
      return "Genting Highlands";
    if (loc.includes("MELAKA") || loc.includes("MKZ")) return "Melaka";
    if (loc.includes("SINGAPORE")) return "Singapore";
    if (loc.includes("JOHOR") || loc.includes("LEGOLAND")) return "Johor Bahru";
    if (loc.includes("PENANG") || loc.includes("PNG")) return "Penang";
    if (loc.includes("IPOH")) return "Ipoh";
    if (loc.includes("PORT DICKSON")) return "Port Dickson";
    if (loc.includes("PORT KLANG")) return "Port Klang";
    if (loc.includes("PUTRAJAYA") || loc.includes("PUTRJAYA"))
      return "Putrajaya";
    if (
      loc.includes("B.CAVES") ||
      loc.includes("BT CAVES") ||
      loc.includes("BATU CAVES")
    )
      return "Batu Caves";
    if (loc.includes("SUNWAY")) return "Sunway Lagoon";
    if (loc.includes("I CITY") || loc.includes("SHAH ALAM"))
      return "i-City Shah Alam";
    if (loc.includes("SUBANG") || loc.includes("SZB")) return "Subang Airport";
    if (loc.includes("TBS")) return "TBS Coach Station";
    if (loc.includes("BERJAYA TIMES")) return "Berjaya Times Square";
    if (loc.includes("CAMERON")) return "Cameron Highlands";
    if (loc.includes("KUAH")) return "Kuah Area (Langkawi)";
    if (loc.includes("CENANG")) return "Cenang Area (Langkawi)";
    if (
      loc.includes("BERJAYA/RIZCARTON") ||
      loc.includes("DANNA") ||
      loc.includes("TG RHU")
    )
      return "Pantai Kok / Tanjung Rhu (Langkawi)";
    if (
      loc.includes("ANDAMAN") ||
      loc.includes("DATAI") ||
      loc.includes("ELS GOLF")
    )
      return "Datai Bay / Andaman (Langkawi)";

    return toLoc.replace(/hotel/gi, "Hotels").trim();
  };

  // Helper to check if a DB record matches a Hub
  const recordMatchesHub = (record, hub) => {
    const fromLoc = record.from_location.toUpperCase();
    if (hub === HUB_KUALA_LUMPUR) {
      return [
        "KUALA LUMPUR",
        "KLIA",
        "KUL HOTEL",
        "KUL",
        "KLIA/KL",
        "PORT KLANG CRUISE TERMINAL",
      ].some((key) => fromLoc.includes(key));
    }
    if (hub === HUB_PENANG) {
      return ["PENANG", "PNG", "PEN", "PENANG 1"].some((key) =>
        fromLoc.includes(key),
      );
    }
    if (hub === HUB_LANGKAWI) {
      return ["LANGKAWI", "LANGKAWI AIRPORT/JETTY"].some((key) =>
        fromLoc.includes(key),
      );
    }
    return false;
  };

  // Get available destinations for the currently selected hub
  // Return available destination options
  const getDestinationsForHub = (hub) => {
    let hubRecords = rates;
    if (hub && hub !== "" && hub !== "ANY") {
      hubRecords = rates.filter((r) => recordMatchesHub(r, hub));
    }
    const destSet = new Set();
    hubRecords.forEach((r) => {
      const cleaned = cleanDestination(r.to_location);
      if (
        cleaned &&
        cleaned.length > 2 &&
        !cleaned.includes("RATE INCLUSIVE") &&
        !cleaned.includes("EXCLUDES OF") &&
        !cleaned.includes("USD")
      ) {
        destSet.add(cleaned);
      }
    });
    return Array.from(destSet).sort();
  };

  // Swap From & To logic (updates form fields only)
  const handleSwap = () => {
    const toLower = toInput.toLowerCase();
    let matchedHub = "";
    if (toLower.includes("penang")) matchedHub = HUB_PENANG;
    else if (toLower.includes("langkawi")) matchedHub = HUB_LANGKAWI;
    else if (toLower.includes("kuala lumpur") || toLower.includes("klia"))
      matchedHub = HUB_KUALA_LUMPUR;

    if (matchedHub) {
      const prevHub = selectedHub;

      setSelectedHub(matchedHub);
      setFromInput(matchedHub);

      const newDest = prevHub === HUB_KUALA_LUMPUR ? "Kuala Lumpur" : prevHub;
      setSelectedDestination(newDest);
      setToInput(newDest);
    }
  };

  // Execute Search strictly on Search button click
  const handleSearchClick = (e) => {
    if (e) e.preventDefault();

    let currentHub = selectedHub;
    if (!currentHub && fromInput) {
      const matchedHub = HUBS.find(
        (h) => h.toLowerCase() === fromInput.toLowerCase(),
      );
      if (matchedHub) {
        currentHub = matchedHub;
        setSelectedHub(matchedHub);
      }
    }

    let currentDest = selectedDestination;
    if (currentHub && !currentDest && toInput) {
      const dests = getDestinationsForHub(currentHub);
      const matchedDest = dests.find(
        (d) => d.toLowerCase() === toInput.toLowerCase(),
      );
      if (matchedDest) {
        currentDest = matchedDest;
        setSelectedDestination(matchedDest);
      }
    }

    triggerSearch(currentHub || "", currentDest || "", selectedVehicleType);
  };

  const triggerSearch = (
    hub = selectedHub,
    destination = selectedDestination,
    vehicleType = selectedVehicleType,
  ) => {
    setLoading(true);

    setTimeout(() => {
      // Find all records matching selected hub (or all if empty/ANY)
      const hubRecords = rates.filter((r) => {
        if (!hub || hub === "" || hub === "ANY") return true;
        return recordMatchesHub(r, hub);
      });

      // Filter to those matching selected destination (or all if empty/ANY)
      const matched = hubRecords.filter((r) => {
        if (!destination || destination === "" || destination === "ANY")
          return true;
        const cleaned = cleanDestination(r.to_location);
        return cleaned.toLowerCase().includes(destination.toLowerCase());
      });

      // Filter by vehicle type (ALL, FIT, COACH)
      const finalResults = matched.filter((r) => {
        if (!vehicleType || vehicleType === "ALL") return true;
        return r.category.toUpperCase() === vehicleType.toUpperCase();
      });

      setSearchResults(finalResults);
      setActiveCategoryFilter(vehicleType);
      setSearched(true);
      setLoading(false);
    }, 200);
  };

  // Format date display (RedBus style)
  const formatDateLabel = (dateStr) => {
    if (!dateStr) return { formatted: "", relative: "" };

    // Parse date ensuring local timezone interpretation
    const parts = dateStr.split("-");
    const date = new Date(parts[0], parts[1] - 1, parts[2]);

    const options = { day: "numeric", month: "short", year: "numeric" };
    const formatted = date.toLocaleDateString("en-US", options);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(parts[0], parts[1] - 1, parts[2]);
    target.setHours(0, 0, 0, 0);

    let relative = "";
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) relative = "(Today)";
    else if (diffDays === 1) relative = "(Tomorrow)";
    else {
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      relative = `(${weekdays[target.getDay()]})`;
    }

    return { formatted, relative };
  };

  const { formatted: dateFormatted, relative: dateRelative } =
    formatDateLabel(journeyDate);

  // Toggle detail accordion
  const toggleDetails = (id, tab) => {
    setExpandedDetails((prev) => {
      const current = prev[id];
      if (current && current.tab === tab) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return {
        ...prev,
        [id]: { tab },
      };
    });
  };

  // Open booking modal
  const openBooking = (ticket) => {
    setSelectedTicket(ticket);
    setBookingPick(fromInput);
    setBookingDrop(toInput);
    setBookingDate(journeyDate);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone) {
      alert("Please fill in your Name and Contact Phone.");
      return;
    }

    // Build WhatsApp Message redirect
    const waNumber = "60377814180"; // U2 Travels office prefix / phone
    const formattedDate = formatDateLabel(bookingDate).formatted;
    const isWomenModeText = forWomen
      ? "✅ WOMEN SAFETY PREFERENCE MODE (Request Female Driver/Guide & Reserved Front Seats)"
      : "❌ Standard Transfer";

    const message = `*U2 Travels & Tours Booking Request*
----------------------------------------
🚗 *Service:* Private Transfer (${selectedTicket.category})
📍 *Route:* ${selectedTicket.route_raw}
📅 *Travel Date:* ${formattedDate} (${bookingDate})
👥 *Pax Size:* ${bookingPax} Pax
👤 *Customer Name:* ${bookingName}
📱 *Phone Number:* ${bookingPhone}
🛫 *Pick-up Location:* ${bookingPick}
🛬 *Drop-off Location:* ${bookingDrop}
⚠️ *Women Safety Mode:* ${isWomenModeText}
📝 *Special Notes:* ${bookingNotes || "None"}
💳 *Rates Listed:* ${JSON.stringify(selectedTicket.prices).replace(/[{}"]/g, " ").trim()}

Please confirm availability and booking. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    setSuccessMessage(
      "Your booking request has been formatted! Redirecting to WhatsApp...",
    );

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setSuccessMessage("");
      setBookingModalOpen(false);
      // Reset form
      setBookingName("");
      setBookingPhone("");
      setBookingNotes("");
    }, 2000);
  };

  // Render price columns with passenger size details
  const renderPriceOptions = (prices) => {
    if (!prices || Object.keys(prices).length === 0) {
      return (
        <span className="text-gray-500 font-medium text-xs">
          Contact for price
        </span>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {Object.entries(prices).map(([pax, val]) => {
          const usdVal = val;
          let myrVal = "";

          // Match numbers in the price string to show MYR conversion
          const numMatch = val.match(/[\d.]+/);
          if (numMatch) {
            const num = parseFloat(numMatch[0]);
            if (!isNaN(num)) {
              myrVal = `~RM ${Math.round(num * 4.4)}`;
            }
          }

          return (
            <div
              key={pax}
              className="flex justify-between items-center text-sm border-b border-gray-200/60 pb-1 last:border-0 last:pb-0"
            >
              <span className="text-gray-500 font-medium text-xs">{pax}</span>
              <div className="text-right">
                <span className="text-gray-800 font-semibold block">
                  {usdVal}
                </span>
                {myrVal && (
                  <span className="text-[10px] text-gray-400 block">
                    {myrVal}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Recommendations side list
  const getSidebarRecommendations = () => {
    // If Langkawi is chosen, show Langkawi activities
    if (selectedHub === HUB_LANGKAWI) {
      return rates
        .filter(
          (r) =>
            r.sheet_name === "2026 LGK FIT" &&
            r.section_header === "Langkawi Activities" &&
            Object.keys(r.prices).length > 0,
        )
        .slice(0, 5);
    }
    // If Penang is chosen, show Penang local tours
    if (selectedHub === HUB_PENANG) {
      return rates
        .filter(
          (r) =>
            r.sheet_name === "2026 PNG FIT" &&
            r.to_location.toLowerCase().includes("tour"),
        )
        .slice(0, 5);
    }
    // Fallback: KUL tours
    return rates
      .filter(
        (r) =>
          r.sheet_name === "2026 KUL FIT" &&
          r.section_header === "KUL/GEN/MELAKA Tours",
      )
      .slice(0, 5);
  };

  const recommendedTours = getSidebarRecommendations();

  // Searched ticket listings
  const filteredResults = searchResults;

  return (
    <>
      {/* Hero Header */}
      <section className="tp-hero relative h-[450px] flex items-center justify-center overflow-hidden">
        <div className="tp-hero_bg absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/12700835/pexels-photo-12700835.jpeg"
            alt="Malaysia highway aerial view"
            fill
            className="object-cover"
            sizes="100vw"
            priority
            unoptimized
          />
          {/* Black overlay for maximum text legibility */}
          <div className="absolute inset-0 bg-slate-950/75 backdrop-brightness-75 z-[1]" />
        </div>

        <div className="container px-6 relative z-10 text-center">
          <span className="font-extrabold text-[#7ff74b] tracking-[0.2em] text-xs sm:text-sm uppercase block mb-3 animate-fade-in drop-shadow-md">
            Going Beyond Borders
          </span>
          <p className="tp-hero_title text-3xl md:text-6xl text-white font-bold mb-4 tracking-tight leading-tight">
            Reliable Transfers, Exceptional Experiences
          </p>
          <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-lg font-light">
            Compare transfer rates of our fleet services across Malaysia.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="text-gray-800 pb-24 px-4 min-h-screen relative z-10">
        {/* RedBus Floating Search Container */}
        <div className="max-w-6xl w-full mx-auto relative -mt-16 z-20">
          <form
            onSubmit={handleSearchClick}
            className={`bg-white text-black p-5 lg:p-7 rounded-[24px] shadow-2xl relative border border-gray-100 transition-all duration-300 ${
              forWomen
                ? "shadow-[0_0_25px_rgba(244,143,177,0.35)] border-pink-200"
                : ""
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* FROM field */}
              <div
                ref={fromRef}
                className="lg:col-span-4 relative border-b lg:border-b-0 lg:border-r border-gray-200 pb-3 lg:pb-0 lg:pr-4 flex items-center gap-3 cursor-pointer"
                onClick={() => {
                  setShowFromDropdown(true);
                  setShowToDropdown(false);
                }}
              >
                <div className="p-2 bg-gray-100 rounded-full">
                  <MapPin className="text-[#013b85] w-5 h-5 flex-shrink-0" />
                </div>
                <div className="flex-grow">
                  <label className="text-xs text-gray-500 block font-semibold uppercase tracking-wider">
                    From
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-0 p-0 text-gray-800 text-sm font-bold focus:ring-0 focus:outline-none placeholder-gray-400 cursor-text"
                    placeholder="Any Origin (All Malaysia)"
                    value={fromInput}
                    onChange={(e) => {
                      setFromInput(e.target.value);
                      setShowFromDropdown(true);
                      const matchedHub = HUBS.find(
                        (h) => h.toLowerCase() === e.target.value.toLowerCase(),
                      );
                      if (matchedHub) {
                        setSelectedHub(matchedHub);
                      } else {
                        setSelectedHub("");
                      }
                    }}
                    onFocus={(e) => {
                      e.target.select();
                      setShowFromDropdown(true);
                      setShowToDropdown(false);
                    }}
                  />
                </div>

                {/* Hub Selection Dropdown */}
                {showFromDropdown && (
                  <div className="absolute left-0 top-full mt-3 bg-white w-full border border-gray-100 rounded-2xl shadow-xl z-30 overflow-hidden py-2 animate-slide-down">
                    <p className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                      Departure Hubs
                    </p>
                    <div
                      className="px-4 py-2.5 hover:bg-gray-50 font-bold text-sm text-[#013b85] cursor-pointer flex items-center gap-2 border-b border-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFromInput("");
                        setSelectedHub("");
                        setShowFromDropdown(false);
                      }}
                    >
                      <Bus className="w-4 h-4 text-[#013b85]" />
                      Any Origin (All Malaysia)
                    </div>
                    {(() => {
                      const hubsToShow = HUBS.filter((hub) => {
                        if (!fromInput) return true;
                        if (HUBS.includes(fromInput)) return true;
                        return hub
                          .toLowerCase()
                          .includes(fromInput.toLowerCase());
                      });
                      return hubsToShow.length === 0 ? (
                        <div className="px-4 py-3 text-xs text-gray-400">
                          No matching origins found
                        </div>
                      ) : (
                        hubsToShow.map((hub) => (
                          <div
                            key={hub}
                            className="px-4 py-3 hover:bg-gray-50 font-bold text-sm text-gray-700 cursor-pointer flex items-center gap-2 border-b border-gray-50 last:border-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFromInput(hub);
                              setSelectedHub(hub);
                              setShowFromDropdown(false);
                            }}
                          >
                            <Bus className="w-4 h-4 text-gray-400" />
                            {hub}
                          </div>
                        ))
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Swap Button */}
              <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors shadow-sm"
                  title="Swap Origin & Destination"
                >
                  <ArrowLeftRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* TO field */}
              <div
                ref={toRef}
                className="lg:col-span-4 relative border-b lg:border-b-0 lg:border-r border-gray-200 pb-3 lg:pb-0 lg:pl-2 lg:pr-4 flex items-center gap-3 cursor-pointer"
                onClick={() => {
                  setShowToDropdown(true);
                  setShowFromDropdown(false);
                }}
              >
                <div className="p-2 bg-gray-100 rounded-full">
                  <MapPin className="text-[#ceff65] fill-[#013b85] w-5 h-5 flex-shrink-0" />
                </div>
                <div className="flex-grow">
                  <label className="text-xs text-gray-500 block font-semibold uppercase tracking-wider">
                    To
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-0 p-0 text-gray-800 text-sm font-bold focus:ring-0 focus:outline-none placeholder-gray-400 cursor-text"
                    placeholder="Any Destination"
                    value={toInput}
                    onChange={(e) => {
                      setToInput(e.target.value);
                      setShowToDropdown(true);
                      const dests = getDestinationsForHub(selectedHub);
                      const matchedDest = dests.find(
                        (d) => d.toLowerCase() === e.target.value.toLowerCase(),
                      );
                      if (matchedDest) {
                        setSelectedDestination(matchedDest);
                      } else {
                        setSelectedDestination("");
                      }
                    }}
                    onFocus={(e) => {
                      e.target.select();
                      setShowToDropdown(true);
                      setShowFromDropdown(false);
                    }}
                  />
                </div>

                {/* Destinations Dropdown */}
                {showToDropdown && (
                  <div className="absolute left-0 top-full mt-3 bg-white w-full max-h-72 overflow-y-auto border border-gray-100 rounded-2xl shadow-xl z-30 py-2 animate-slide-down">
                    <p className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                      Popular Destinations
                    </p>
                    <div
                      className="px-4 py-2.5 hover:bg-gray-50 font-bold text-sm text-[#013b85] cursor-pointer flex items-center gap-2 border-b border-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setToInput("");
                        setSelectedDestination("");
                        setShowToDropdown(false);
                      }}
                    >
                      <MapPin className="w-4 h-4 text-[#013b85]" />
                      Any Destination
                    </div>
                    {(() => {
                      const allDests = getDestinationsForHub(selectedHub);
                      const destsToShow = allDests.filter((dest) => {
                        if (!toInput) return true;
                        if (allDests.includes(toInput)) return true;
                        return dest
                          .toLowerCase()
                          .includes(toInput.toLowerCase());
                      });
                      return destsToShow.length === 0 ? (
                        <div className="px-4 py-3 text-xs text-gray-400">
                          No matching destinations found
                        </div>
                      ) : (
                        destsToShow.map((dest) => (
                          <div
                            key={dest}
                            className="px-4 py-3 hover:bg-gray-50 text-sm font-bold text-gray-700 cursor-pointer flex items-center gap-2 border-b border-gray-50 last:border-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              setToInput(dest);
                              setSelectedDestination(dest);
                              setShowToDropdown(false);
                            }}
                          >
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {dest}
                          </div>
                        ))
                      );
                    })()}
                  </div>
                )}
              </div>

              {/* Category Selector field */}
              <div className="lg:col-span-3 relative pb-3 lg:pb-0 lg:pl-2 flex flex-col justify-center">
                <label className="text-xs text-gray-500 block font-semibold uppercase tracking-wider mb-1.5">
                  Vehicle Type
                </label>
                <div className="flex gap-1 bg-gray-100 p-1 rounded-xl text-xs w-full">
                  <button
                    type="button"
                    onClick={() => setSelectedVehicleType("ALL")}
                    className={`flex-1 py-2 lg:py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
                      selectedVehicleType === "ALL"
                        ? "bg-[#013b85] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedVehicleType("FIT")}
                    className={`flex-1 py-2 lg:py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
                      selectedVehicleType === "FIT"
                        ? "bg-[#013b85] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Private Car
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedVehicleType("COACH")}
                    className={`flex-1 py-2 lg:py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
                      selectedVehicleType === "COACH"
                        ? "bg-[#013b85] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Coach/Bus
                  </button>
                </div>
              </div>
            </div>

            {/* Responsive Search Button */}
            <div className="mt-4 lg:mt-0 flex justify-center w-full lg:w-auto">
              <button
                type="submit"
                className="w-full lg:w-auto lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:-bottom-6 bg-[#d82c34] text-white hover:bg-[#b02228] px-8 py-3.5 lg:py-3 rounded-2xl lg:rounded-full flex items-center justify-center gap-2 font-bold shadow-lg transition duration-200 z-20 cursor-pointer text-sm tracking-wider uppercase"
              >
                <Search className="w-4 h-4" />
                Search Transfers
              </button>
            </div>
          </form>
        </div>

        {/* Dynamic Women safety Banner */}
        {forWomen && (
          <div className="max-w-6xl mx-auto mt-12 bg-pink-50 border border-pink-200 rounded-2xl p-4 flex items-center gap-3 text-pink-700 animate-fade-in shadow-md">
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500 flex-shrink-0" />
            <p className="text-sm font-semibold">
              <strong className="text-pink-800">
                Women Safety Mode Active:
              </strong>{" "}
              Showing prioritized direct family transfers. Safe check-ins, front
              reserved seats, and optional female guide matching are active.
            </p>
          </div>
        )}

        {/* Database Status Indicator */}
        <div className="max-w-6xl mx-auto mt-4 text-right">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              isUsingSupabase
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-amber-100 text-amber-700 border border-amber-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${isUsingSupabase ? "bg-green-500" : "bg-amber-500"} animate-pulse`}
            ></span>
            {isUsingSupabase ? "Supabase Connected" : "Local Data Fallback"}
          </span>
        </div>

        {/* Main Grid: Listings + Recommendations */}
        <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Search Results Ticket List */}
          <div className="lg:col-span-8 space-y-6">
            {searched && (
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                  <p className="text-xs text-gray-500 mt-1">
                    Found {filteredResults.length} available transfer services
                  </p>
                </div>
              </div>
            )}

            {loading ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
                <div className="w-10 h-10 border-4 border-t-[#013b85] border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 font-medium">
                  Scanning transportation databases...
                </p>
              </div>
            ) : filteredResults.length > 0 ? (
              filteredResults.map((ticket, index) => {
                const isExpanded = expandedDetails[ticket.id];
                return (
                  <div
                    key={ticket.id || `ticket-${index}`}
                    className={`bg-white border transition-all duration-300 rounded-[20px] overflow-hidden group ${
                      forWomen
                        ? "border-pink-200 hover:border-pink-300 shadow-md shadow-pink-950/5"
                        : "border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg hover:shadow-black/5"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {/* Ticket Header card */}
                    <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Vehicle Category Representation */}
                      <div className="md:col-span-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              ticket.category === "FIT"
                                ? "bg-blue-50 text-blue-700 border border-blue-100"
                                : "bg-[#013b85]/10 text-[#013b85] border border-[#013b85]/20"
                            }`}
                          >
                            {ticket.category === "FIT"
                              ? "🚗 Private (FIT)"
                              : "🚌 Coach Group"}
                          </span>

                          {forWomen && (
                            <span className="bg-pink-50 text-pink-700 border border-pink-100 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                              👩 Safety Approved
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#013b85] transition-colors leading-tight">
                          {ticket.route_raw}
                        </h3>

                        <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] font-medium text-gray-600">
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            24/7 Support
                          </span>
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            Instant Confirmation
                          </span>
                          {ticket.notes && (
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200">
                              ℹ️ {ticket.notes}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Timeline/Journey details */}
                      <div className="md:col-span-4 flex items-center justify-center py-2 border-y md:border-y-0 md:border-x border-gray-200/60 px-4">
                        <div className="flex items-center gap-3 w-full max-w-[200px]">
                          <div className="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0"></div>
                          <div className="flex-grow flex flex-col items-center relative py-1">
                            <span className="text-[10px] text-gray-500 font-semibold block mb-1">
                              {ticket.category === "FIT"
                                ? "Flexible Schedule"
                                : "Standard Route"}
                            </span>
                            <div className="w-full border-t border-dashed border-gray-200 relative">
                              <Bus className="w-4 h-4 text-gray-400 absolute left-1/2 -translate-x-1/2 -top-2 bg-white px-0.5" />
                            </div>
                            <span className="text-[10px] text-gray-600 font-bold block mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#013b85]" />
                              Direct Transfer
                            </span>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-[#013b85] flex-shrink-0"></div>
                        </div>
                      </div>

                      {/* Pricing grid & Booking Button */}
                      <div className="md:col-span-4 space-y-4">
                        <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-2">
                            Available Capacity Rates
                          </p>
                          {renderPriceOptions(ticket.prices)}
                          {ticket.tipping && (
                            <div className="mt-2 text-[10px] text-gray-700 bg-gray-100 px-2 py-1 rounded border border-gray-200 flex items-center justify-between">
                              <span>Driver Tipping:</span>
                              <strong>{ticket.tipping}</strong>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => openBooking(ticket)}
                          className="w-full py-2.5 bg-[#013b85] hover:bg-[#012f6a] text-white font-bold rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 text-sm cursor-pointer"
                        >
                          Book Transfer
                        </button>
                      </div>
                    </div>

                    {/* Expandable Tabs footer (Inclusions, Exclusions, Policies) */}
                    <div className="bg-gray-50 border-t border-gray-100 px-5 py-2.5 flex flex-wrap gap-4 text-xs">
                      <button
                        onClick={() => toggleDetails(ticket.id, "inc")}
                        className={`flex items-center gap-1 font-bold ${
                          isExpanded && isExpanded.tab === "inc"
                            ? "text-[#013b85]"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        Inclusions & Info
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${isExpanded && isExpanded.tab === "inc" ? "rotate-180" : ""}`}
                        />
                      </button>

                      <button
                        onClick={() => toggleDetails(ticket.id, "rules")}
                        className={`flex items-center gap-1 font-bold ${
                          isExpanded && isExpanded.tab === "rules"
                            ? "text-[#013b85]"
                            : "text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        Policies & Surcharges
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${isExpanded && isExpanded.tab === "rules" ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Expandable Panel Body */}
                    {isExpanded && (
                      <div className="bg-white border-t border-gray-100 p-5 text-sm text-gray-600 space-y-3 animate-slide-down">
                        {isExpanded.tab === "inc" && (
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <ShieldCheck className="w-4 h-4 text-[#013b85] flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wide">
                                  Rate Includes
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">
                                  {ticket.sheet_name.includes("COACH")
                                    ? "Driver, toll & fuel fee, and Professional Tour Guide Fee."
                                    : "Private dedicated vehicle, experienced local driver, toll charges, and fuel fees."}
                                </p>
                              </div>
                            </div>

                            {forWomen && (
                              <div className="bg-pink-50 border border-pink-100 p-2.5 rounded-lg flex items-center gap-2 text-pink-700 text-xs">
                                <span>🌸</span>
                                <div>
                                  <strong>Women Safety Preference:</strong>{" "}
                                  Front reserved seating guaranteed. You may
                                  request a female tour guide or female driver
                                  in the booking form.
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {isExpanded.tab === "rules" && (
                          <div className="space-y-3 text-xs">
                            <div>
                              <h4 className="font-bold text-gray-800 uppercase tracking-wide text-[10px] mb-1">
                                Exclusions
                              </h4>
                              <p className="text-gray-500">
                                Accommodation for overland transfers & guide
                                services (unless explicitly stated otherwise).
                              </p>
                            </div>

                            <div>
                              <h4 className="font-bold text-gray-800 uppercase tracking-wide text-[10px] mb-1">
                                Peak Surcharges
                              </h4>
                              <ul className="list-disc pl-4 space-y-1 text-gray-500">
                                <li>
                                  <strong>Midnight Surcharge:</strong>{" "}
                                  {ticket.sheet_name.includes("COACH")
                                    ? "30% midnight surcharge"
                                    : "50% midnight surcharge"}{" "}
                                  applies for transfers between 11:00 PM and
                                  6:00 AM.
                                </li>
                                <li>
                                  <strong>Holiday Surcharge:</strong> Rates may
                                  vary during peak seasons (Chinese New Year,
                                  Hari Raya, Christmas).
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  No Direct Transfers Found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto text-sm">
                  We couldn&apos;t find direct database listings for &quot;
                  {fromInput}&quot; to &quot;{toInput}&quot;. Please try
                  selecting alternate hub points (Kuala Lumpur, Penang, or
                  Langkawi).
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: Recommendations Side Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200 rounded-[20px] p-5 md:p-6 space-y-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#013b85]" />
                <h3 className="text-lg font-bold text-[#013b85]">
                  Recommended Tours
                </h3>
              </div>

              <p className="text-xs text-gray-500">
                Enhance your travel with local sightseeing packages and overland
                tours managed by our own fleet.
              </p>

              <div className="space-y-4">
                {recommendedTours.map((tour, index) => {
                  const prices = tour.prices || {};
                  const entryPrice = Object.values(prices)[0] || "Contact Us";
                  return (
                    <div
                      key={tour.id || `tour-${index}`}
                      className="group border border-gray-100 p-3.5 rounded-xl bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-colors flex items-start justify-between gap-3 shadow-sm"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">
                          {tour.category} •{" "}
                          {tour.sheet_name.replace("2026", "").trim()}
                        </span>
                        <h4 className="text-sm font-bold text-gray-700 group-hover:text-[#013b85] transition-colors leading-tight">
                          {tour.route_raw}
                        </h4>
                        {tour.notes && (
                          <p className="text-[10px] text-gray-500">
                            {tour.notes}
                          </p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs text-[#013b85] font-bold block">
                          {entryPrice}
                        </span>
                        <button
                          onClick={() => openBooking(tour)}
                          className="mt-2 text-[10px] bg-[#013b85] hover:bg-[#012f6a] text-white px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-gray-100 text-center">
                <span className="text-xs text-gray-500 font-medium">
                  Looking for customized itineraries?
                </span>
                <Link
                  href="/contact"
                  className="block mt-2 text-xs text-[#013b85] font-bold underline hover:text-[#012f6a]"
                >
                  Contact our consultants
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Dialog Modal */}
      {bookingModalOpen && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-black max-w-lg w-full rounded-3xl p-6 md:p-8 relative shadow-2xl space-y-5 my-8 max-h-[90vh] flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute right-4 top-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-pink-500 tracking-wider">
                Booking Request Form
              </span>
              <h3 className="text-xl md:text-2xl font-bold leading-tight text-[#013b85]">
                {selectedTicket.route_raw}
              </h3>
              <p className="text-xs text-gray-500">
                Verify details below and complete the request to connect with
                our booking officer on WhatsApp.
              </p>
            </div>

            {/* Status indicator */}
            {successMessage ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3 text-sm animate-fade-in font-semibold">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                {successMessage}
              </div>
            ) : (
              <form
                onSubmit={handleBookingSubmit}
                className="space-y-4 overflow-y-auto flex-grow pr-1"
              >
                {/* Inputs grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">
                      Your Full Name*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#013b85] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">
                      WhatsApp Phone*
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +60123456789"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#013b85] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#013b85] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">
                      Passenger Count (Pax)
                    </label>
                    <select
                      value={bookingPax}
                      onChange={(e) => setBookingPax(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#013b85] focus:outline-none font-medium"
                    >
                      <option value="1">1 Pax</option>
                      <option value="2">2-3 Pax</option>
                      <option value="4">4-7 Pax</option>
                      <option value="8">8-12 Pax</option>
                      <option value="13">13-44 Pax (Coach)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">
                      Specific Pick-up Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Airport Terminal 1 / Hotel name"
                      value={bookingPick}
                      onChange={(e) => setBookingPick(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#013b85] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">
                      Specific Drop-off Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Resort Name / Hotel name"
                      value={bookingDrop}
                      onChange={(e) => setBookingDrop(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#013b85] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Surcharges warning if time selected */}
                <div className="bg-blue-50 text-blue-800 p-3 rounded-xl text-xs space-y-1 border border-blue-100 leading-relaxed">
                  <strong>💡 Peak Surcharges Notice:</strong> A midnight
                  surcharge (30% to 50%) applies to bookings scheduled between
                  11:00 PM and 6:00 AM. Inclusions cover fuel, driver, and
                  tolls.
                </div>

                {/* Female guide note if women mode is true */}
                {forWomen && (
                  <div className="bg-pink-50 border border-pink-200 text-pink-700 p-3 rounded-xl text-xs leading-relaxed">
                    🌸 <strong>Women Safety Mode Enabled:</strong> Your booking
                    is flagged for front reserved seating and prioritizes safety
                    arrangements. Feel free to request a female driver/guide in
                    the notes field.
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">
                    Special Notes / Flight Number / Requests
                  </label>
                  <textarea
                    rows="2"
                    placeholder="e.g. Need baby seat, flight number MH123, request female driver"
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#013b85] focus:outline-none"
                  ></textarea>
                </div>

                {/* Submit action */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#d82c34] hover:bg-[#b02228] text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Phone className="w-4 h-4 fill-white text-[#d82c34]" />
                  Confirm &amp; Message on WhatsApp
                </button>
              </form>
            )}

            <div className="text-[10px] text-center text-gray-400">
              U2 Travels &amp; Tours • Co. Reg No. 917024-V • 24/7 Helpline
              Support
            </div>
          </div>
        </div>
      )}
    </>
  );
}

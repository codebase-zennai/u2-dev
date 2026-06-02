"use client";

import { ArrowUpDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

// B2B Datasets
const packagesData = [
  {
    id: 1,
    slug: "genting-highlands",
    name: "3D2N Genting Highlands Getaway",
    category: "malaysian",
    price: 399,
    duration: "3 Days, 2 Nights",
    image: "https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg",
    description:
      "Escape to the cooling mountain resort of Genting Highlands. Experience theme parks, shopping, and high-altitude entertainment.",
  },
  {
    id: 2,
    slug: "gua-mulu",
    name: "5D4N Gua Mulu Cave Adventure",
    category: "malaysian",
    price: 899,
    duration: "5 Days, 4 Nights",
    image:
      "https://images.pexels.com/photos/46253/cave-subterranean-speleology-speleothem-46253.jpeg",
    description:
      "Explore the UNESCO World Heritage Mulu Caves. Walk through massive chambers and hike the spectacular razor-sharp pinnacles.",
  },
  {
    id: 3,
    slug: "johor",
    name: "4D3N Johor Heritage & Parks",
    category: "malaysian",
    price: 499,
    duration: "4 Days, 3 Nights",
    image: "https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg",
    description:
      "Perfect family fun at Legoland and Desaru Coast. Discover historical heritage and delicious southern culinary delights.",
  },
  {
    id: 4,
    slug: "kota-kinabalu",
    name: "5D4N Kota Kinabalu Mount Climb",
    category: "malaysian",
    price: 1199,
    duration: "5 Days, 4 Nights",
    image: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg",
    description:
      "Climb Mount Kinabalu, witness breathtaking peak sunrises, and relax on beautiful sandy islands of Sabah.",
  },
  {
    id: 5,
    slug: "kuala-lumpur",
    name: "4D3N Kuala Lumpur City Discovery",
    category: "malaysian",
    price: 450,
    duration: "4 Days, 3 Nights",
    image: "https://images.pexels.com/photos/2281566/pexels-photo-2281566.jpeg",
    description:
      "Marvel at the Petronas Twin Towers, explore ancient Batu Caves, and experience vibrant street food and shopping.",
  },
  {
    id: 6,
    slug: "kuantan",
    name: "3D2N Kuantan Beaches & Waterfalls",
    category: "malaysian",
    price: 299,
    duration: "3 Days, 2 Nights",
    image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg",
    description:
      "Relax on Cherating Beach, see the rainbow waterfalls of Sungai Lembing, and enjoy authentic seaside dining.",
  },
  {
    id: 7,
    slug: "langkawi",
    name: "3D2N Langkawi Tropical Retreat",
    category: "malaysian",
    price: 350,
    duration: "3 Days, 2 Nights",
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg",
    description:
      "Duty-free shopping, cable car skybridge rides, and gorgeous sun-drenched beaches at this legendary archipelago.",
  },
  {
    id: 8,
    slug: "melaka",
    name: "3D2N Melaka Historical Heritage",
    category: "malaysian",
    price: 299,
    duration: "3 Days, 2 Nights",
    image: "https://images.pexels.com/photos/1684188/pexels-photo-1684188.jpeg",
    description:
      "Take a trishaw ride through historical Dutch Square, cruise Melaka River, and enjoy unique Nyonya cuisine.",
  },
  {
    id: 9,
    slug: "pahang",
    name: "4D3N Pahang Jungle Expedition",
    category: "malaysian",
    price: 699,
    duration: "4 Days, 3 Nights",
    image: "https://images.pexels.com/photos/2400659/pexels-photo-2400659.jpeg",
    description:
      "Journey deep into Taman Negara, walk the canopy bridge, and witness rich tropical rainforest flora and fauna.",
  },
  {
    id: 10,
    slug: "penang",
    name: "4D3N Penang Culinary Heritage",
    category: "malaysian",
    price: 399,
    duration: "4 Days, 3 Nights",
    image: "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg",
    description:
      "Voted top food city globally. Walk down historic Georgetown streets, visit Kek Lok Si Temple, and indulge in street food.",
  },
  {
    id: 11,
    slug: "perak",
    name: "3D2N Perak Ipoh Heritage Tour",
    category: "malaysian",
    price: 299,
    duration: "3 Days, 2 Nights",
    image: "https://images.pexels.com/photos/1825708/pexels-photo-1825708.jpeg",
    description:
      "Discover cave temples, historical colonial structures, and sample famous Ipoh white coffee and local desserts.",
  },
  {
    id: 12,
    slug: "selangor",
    name: "3D2N Selangor Adventure & Theme Park",
    category: "malaysian",
    price: 250,
    duration: "3 Days, 2 Nights",
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    description:
      "Witness magical fireflies in Kuala Selangor, try white-water rafting, and explore the theme parks of Sunway Lagoon.",
  },
  {
    id: 13,
    slug: "tasik-widuri",
    name: "3D2N Tasik Widuri Lakeside Escape",
    category: "malaysian",
    price: 199,
    duration: "3 Days, 2 Nights",
    image: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg",
    description:
      "Unwind at the serene lakeside resort of Tasik Widuri. Great for boat tours, fishing, and peaceful retreats.",
  },
  {
    id: 14,
    slug: "dubai",
    name: "5D4N Dubai Desert Luxury Tour",
    category: "world",
    price: 1499,
    duration: "5 Days, 4 Nights",
    image: "https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg",
    description:
      "Ride camels in the Arabian desert, visit the Burj Khalifa observation deck, and explore grand shopping malls.",
  },
  {
    id: 15,
    slug: "europe",
    name: "10D9N Grand European Classics",
    category: "world",
    price: 3499,
    duration: "10 Days, 9 Nights",
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    description:
      "Experience the romance of Paris, the historic Colosseum of Rome, and the spectacular snowcapped Swiss Alps.",
  },
  {
    id: 16,
    slug: "india",
    name: "7D6N India Golden Triangle Heritage",
    category: "world",
    price: 1299,
    duration: "7 Days, 6 Nights",
    image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg",
    description:
      "Marvel at the majestic Taj Mahal in Agra, explore Jaipur's Pink City palaces, and experience bustling Old Delhi.",
  },
  {
    id: 17,
    slug: "indonesia",
    name: "6D5N Bali Exotic Island Retreat",
    category: "world",
    price: 799,
    duration: "6 Days, 5 Nights",
    image: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg",
    description:
      "Tour historic temples in Ubud, walk on volcanic black beaches, and witness stunning seaside cliff sunsets.",
  },
  {
    id: 18,
    slug: "korea",
    name: "6D5N Korea Seoul & Traditions",
    category: "world",
    price: 1599,
    duration: "6 Days, 5 Nights",
    image: "https://images.pexels.com/photos/2372977/pexels-photo-2372977.jpeg",
    description:
      "Explore historic palaces in Seoul, shop in Myeongdong, and experience the beautiful cherry blossoms of Jeju Island.",
  },
  {
    id: 19,
    slug: "nepal",
    name: "7D6N Nepal Himalayan Expedition",
    category: "world",
    price: 1099,
    duration: "7 Days, 6 Nights",
    image: "https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg",
    description:
      "Hike near Pokhara lake, see Mount Everest ranges, and tour ancient temples in the historic city of Kathmandu.",
  },
  {
    id: 20,
    slug: "south-africa",
    name: "8D7N South Africa Wildlife Safari",
    category: "world",
    price: 2499,
    duration: "8 Days, 7 Nights",
    image: "https://images.pexels.com/photos/52961/pexels-photo-52961.jpeg",
    description:
      "Go on big-game safaris at Kruger National Park and ride the cableway to the summit of Table Mountain.",
  },
  {
    id: 21,
    slug: "thailand",
    name: "5D4N Amazing Thailand Explorer",
    category: "world",
    price: 699,
    duration: "5 Days, 4 Nights",
    image: "https://images.pexels.com/photos/415708/pexels-photo-415708.jpeg",
    description:
      "Explore Bangkok's grand palaces and reclining Buddhas, then relax on the world-class beaches of Phuket.",
  },
  {
    id: 22,
    slug: "vietnam",
    name: "5D4N Vietnam Halong Bay Cruise",
    category: "world",
    price: 599,
    duration: "5 Days, 4 Nights",
    image: "https://images.pexels.com/photos/1031698/pexels-photo-1031698.jpeg",
    description:
      "Cruise through thousands of limestone islands in Halong Bay and walk heritage streets of Hanoi.",
  },
];

const unifiedTransportation = [
  {
    id: 1,
    route: "KLIA to Kuala Lumpur City Hotels",
    price: 28,
    description:
      "Private transfer from KLIA/KLIA2 to any hotel in Kuala Lumpur city center.",
    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
    duration: "1 Hr",
    type: "airport",
  },
  {
    id: 2,
    route: "KLIA to Genting Highlands",
    price: 68,
    description:
      "Direct transfer from the airport to the cool highlands of Genting.",
    image: "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg",
    duration: "2 Hrs",
    type: "airport",
  },
  {
    id: 3,
    route: "Kuala Lumpur to Melaka",
    price: 79,
    description:
      "Comfortable transfer from KL to the historic UNESCO World Heritage city.",
    image: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg",
    duration: "2.5 Hrs",
    type: "airport",
  },
  {
    id: 4,
    route: "Kuala Lumpur to Port Dickson",
    price: 58,
    description: "Transfer to the beautiful beaches of Port Dickson from KL.",
    image: "https://images.pexels.com/photos/973506/pexels-photo-973506.jpeg",
    duration: "1.5 Hrs",
    type: "airport",
  },
  {
    id: 5,
    route: "Train Station to KL City Hotels",
    price: 19,
    description:
      "Pick-up from KL Sentral or any major train station to your hotel.",
    image: "https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg",
    duration: "30 Mins",
    type: "airport",
  },
  {
    id: 6,
    route: "Genting Tours",
    duration: "8 Hrs",
    price: 68,
    description:
      "Full day tour to Genting Highlands with flexible free time at the resort.",
    image:
      "https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=600",
    type: "tour",
  },
  {
    id: 7,
    route: "Kuala Lumpur Night Tour",
    duration: "3 Hrs",
    price: 34,
    description:
      "Experience the dazzling lights and vibrant nightlife of Kuala Lumpur.",
    image:
      "https://images.pexels.com/photos/22804/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
    type: "tour",
  },
  {
    id: 8,
    route: "Kuala Lumpur City Tour",
    duration: "3.5 Hrs",
    price: 34,
    description:
      "Discover iconic KL landmarks including Petronas Towers and Batu Caves.",
    image:
      "https://images.pexels.com/photos/1538177/pexels-photo-1538177.jpeg?auto=compress&cs=tinysrgb&w=600",
    type: "tour",
  },
  {
    id: 9,
    route: "KL Country Tour",
    duration: "4 Hrs",
    price: 34,
    description:
      "Explore the natural beauty and rural charm surrounding Kuala Lumpur.",
    image:
      "https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=600",
    type: "tour",
  },
  {
    id: 10,
    route: "Melaka Tour",
    duration: "8 Hrs",
    price: 113,
    description:
      "Full day tour of Melaka covering Dutch Square, A Famosa, and Jonker Street.",
    image:
      "https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg?auto=compress&cs=tinysrgb&w=600",
    type: "tour",
  },
  {
    id: 11,
    route: "Dinner Transfer",
    duration: "Evening",
    price: 27,
    description: "Round-trip transfer to popular dining destinations in KL.",
    image:
      "https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=600",
    type: "tour",
  },
];

export default function AgentDashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [productType, setProductType] = useState("tours"); // "tours" or "transportation"

  // Unified Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all"); // Tours: regions, Trans: type
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("all"); // Tours only
  const [sortBy, setSortBy] = useState("name-asc");

  // Check login on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("agentLoggedIn") === "true";
    if (!loggedIn) {
      router.push("/agent-login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // Reset filters when toggling product type
  const handleProductTypeChange = (type) => {
    setProductType(type);
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceMin("");
    setPriceMax("");
    setSelectedDuration("all");
    setSortBy("name-asc");
  };

  // Filtered and sorted Tours dataset
  const filteredTours = useMemo(() => {
    if (productType !== "tours") return [];
    let result = packagesData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const minP = priceMin === "" ? 0 : Number(priceMin);
      const maxP = priceMax === "" ? Number.MAX_SAFE_INTEGER : Number(priceMax);
      const matchesPrice = item.price >= minP && item.price <= maxP;

      let matchesDuration = true;
      if (selectedDuration === "3d") {
        matchesDuration = item.duration.startsWith("3D");
      } else if (selectedDuration === "4-5d") {
        matchesDuration =
          item.duration.startsWith("4D") || item.duration.startsWith("5D");
      } else if (selectedDuration === "6d+") {
        matchesDuration =
          !item.duration.startsWith("3D") &&
          !item.duration.startsWith("4D") &&
          !item.duration.startsWith("5D");
      }

      return (
        matchesSearch && matchesCategory && matchesPrice && matchesDuration
      );
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [
    productType,
    searchTerm,
    selectedCategory,
    priceMin,
    priceMax,
    selectedDuration,
    sortBy,
  ]);

  // Filtered and sorted Transfers dataset
  const filteredTransfers = useMemo(() => {
    if (productType !== "transportation") return [];
    let result = unifiedTransportation.filter((item) => {
      const matchesSearch =
        item.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || item.type === selectedCategory;

      const minP = priceMin === "" ? 0 : Number(priceMin);
      const maxP = priceMax === "" ? Number.MAX_SAFE_INTEGER : Number(priceMax);
      const matchesPrice = item.price >= minP && item.price <= maxP;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-desc") return b.route.localeCompare(a.route);
      return a.route.localeCompare(b.route);
    });

    return result;
  }, [productType, searchTerm, selectedCategory, priceMin, priceMax, sortBy]);

  if (!authorized) {
    return null; // Prevent page flash before auth redirect
  }

  return (
    <>
      <Header />
      <main className="main-wrapper bg-slate-50 min-h-[90vh] pt-24 pb-0">
        <div className="w-full flex flex-col lg:flex-row items-stretch">
          {/* Left Sidebar filter panel */}
          <aside className="w-full lg:w-72 shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-6 sticky top-24 h-auto lg:h-[calc(100vh-6rem)] overflow-y-auto flex flex-col gap-6">
            {/* Product Category Toggle */}
            <div className="flex flex-col gap-2 border-b border-slate-100 pb-5">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider pl-1">
                Directory Category
              </span>
              <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => handleProductTypeChange("tours")}
                  className={`flex-1 text-center py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    productType === "tours"
                      ? "bg-[#013b85] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Tours
                </button>
                <button
                  type="button"
                  onClick={() => handleProductTypeChange("transportation")}
                  className={`flex-1 text-center py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    productType === "transportation"
                      ? "bg-[#013b85] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Transfers
                </button>
              </div>
            </div>

            {/* Title / Description is hidden, showing filters directly */}
            <div>
              <h3 className="font-extrabold text-[#013b85] text-base uppercase tracking-wide mb-1">
                Detailed Filters
              </h3>
              <p className="text-[10px] text-slate-400 font-bold">
                Configure rates criteria below.
              </p>
            </div>

            {/* Search */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider pl-1">
                {productType === "tours" ? "Search Packages" : "Search Routes"}
              </span>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#013b85] transition-all"
                />
              </div>
            </div>

            {/* Region / Transfer Type */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider pl-1">
                {productType === "tours" ? "Region" : "Service Type"}
              </span>
              <div className="flex flex-col gap-1.5">
                {productType === "tours"
                  ? [
                      { id: "all", label: "All Regions" },
                      { id: "malaysian", label: "Malaysian Tours" },
                      { id: "world", label: "World Tours" },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedCategory === cat.id
                            ? "bg-[#013b85] text-white shadow-sm font-black"
                            : "bg-slate-50 border border-slate-100 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))
                  : [
                      { id: "all", label: "All Service Types" },
                      { id: "airport", label: "Airport Pickups" },
                      { id: "tour", label: "Sightseeing Hires" },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedCategory === cat.id
                            ? "bg-[#013b85] text-white shadow-sm font-black"
                            : "bg-slate-50 border border-slate-100 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider pl-1">
                Price Range ({productType === "tours" ? "MYR" : "USD"})
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:border-[#013b85] transition-all font-bold text-slate-700"
                />
                <span className="text-slate-400 text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs outline-none focus:border-[#013b85] transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            {/* Duration (Tours Only) */}
            {productType === "tours" && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider pl-1">
                  Duration
                </span>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: "all", label: "All Durations" },
                    { id: "3d", label: "3 Days" },
                    { id: "4-5d", label: "4-5 Days" },
                    { id: "6d+", label: "6+ Days" },
                  ].map((dur) => (
                    <button
                      key={dur.id}
                      type="button"
                      onClick={() => setSelectedDuration(dur.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedDuration === dur.id
                          ? "bg-[#013b85] text-white shadow-sm font-black"
                          : "bg-slate-50 border border-slate-100 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sort Order */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider pl-1">
                Sort By
              </span>
              <div className="relative">
                <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold uppercase tracking-wider text-slate-700 outline-none appearance-none cursor-pointer focus:border-[#013b85] transition-all"
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-500 w-0 h-0" />
              </div>
            </div>

            {/* Reset Filters */}
            <button
              type="button"
              onClick={() => handleProductTypeChange(productType)}
              className="w-full bg-slate-50 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 text-slate-500 font-extrabold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </aside>

          {/* Right Product Grid */}
          <div className="flex-1 w-full p-6 md:p-8">
            {productType === "tours"
              ? filteredTours.length > 0
                ? <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredTours.map((tour) => (
                      <li
                        key={tour.id}
                        className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                      >
                        {/* Visual Container */}
                        <div className="aspect-[1.5] w-full relative overflow-hidden bg-slate-100">
                          <Image
                            src={tour.image}
                            alt={tour.name}
                            fill
                            sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute left-4 top-4 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#013b85] shadow-sm">
                            {tour.category === "malaysian"
                              ? "Local Tour"
                              : "International"}
                          </div>
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
                : <div className="text-center py-16 px-4 bg-white border border-slate-200 rounded-3xl">
                    <p className="text-slate-400 text-lg font-bold mb-2">
                      No tour packages found
                    </p>
                    <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
                      Try resetting filters to show matches.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleProductTypeChange("tours")}
                      className="bg-[#013b85] hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl transition-all cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
              : filteredTransfers.length > 0
                ? <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredTransfers.map((item) => (
                      <li
                        key={item.id}
                        className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                      >
                        {/* Visual Container */}
                        <div className="aspect-[1.5] w-full relative overflow-hidden bg-slate-100">
                          <Image
                            src={item.image}
                            alt={item.route}
                            fill
                            sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute left-4 top-4 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#013b85] shadow-sm">
                            {item.type === "airport"
                              ? "Airport Pickup"
                              : "Sightseeing Hire"}
                          </div>
                          <div className="absolute right-4 bottom-4 bg-[#013b85]/90 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-sm">
                            {item.duration}
                          </div>
                        </div>

                        {/* Content Details */}
                        <div className="p-5 md:p-6 flex flex-col flex-1">
                          <h3 className="font-extrabold text-[#013b85] text-lg mb-2 line-clamp-2 leading-snug group-hover:text-sky-800 transition-colors uppercase tracking-wide">
                            {item.route}
                          </h3>
                          <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-1">
                            {item.description}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                                Rate From
                              </span>
                              <span className="text-xl font-black text-[#013b85]">
                                USD {item.price}
                              </span>
                            </div>
                            <Link
                              href={`/contact?transfer=${encodeURIComponent(item.route)}`}
                              className="bg-[#013b85] hover:bg-[#7ff74b] !text-white hover:!text-black font-extrabold text-[11px] uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 !no-underline"
                            >
                              Book Transfer
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                : <div className="text-center py-16 px-4 bg-white border border-slate-200 rounded-3xl">
                    <p className="text-slate-400 text-lg font-bold mb-2">
                      No transfers found
                    </p>
                    <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
                      Try resetting filters to show matches.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleProductTypeChange("transportation")}
                      className="bg-[#013b85] hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl transition-all cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

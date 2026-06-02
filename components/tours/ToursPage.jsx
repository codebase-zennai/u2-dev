"use client";

import { ArrowUpDown, Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

export default function ToursPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Filter and Sort Logic
  const filteredPackages = useMemo(() => {
    let result = packagesData.filter((item) => {
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
  }, [searchTerm, selectedCategory, sortBy]);

  // Render package grid
  const renderGrid = () => (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {filteredPackages.map((tour) => (
        <li
          key={tour.id}
          className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full animate-fade-in"
        >
          {/* Visual Container */}
          <div className="aspect-[1.5] w-full relative overflow-hidden bg-slate-100">
            <Image
              src={tour.image}
              alt={tour.name}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority={tour.id <= 3}
            />
            {/* Category badge */}
            <div className="absolute left-4 top-4 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#013b85] shadow-sm">
              {tour.category === "malaysian" ? "Local Tour" : "International"}
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

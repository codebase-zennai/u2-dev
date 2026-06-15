export const DESTINATIONS = [
  { id: "my-kul", country: "Malaysia", state: "Selangor", city: "Kuala Lumpur" },
  { id: "my-lgk", country: "Malaysia", state: "Kedah", city: "Langkawi" },
  { id: "my-pen", country: "Malaysia", state: "Penang", city: "Penang" },
  { id: "sg-sin", country: "Singapore", state: "Singapore", city: "Singapore" },
  { id: "th-bkk", country: "Thailand", state: "Bangkok", city: "Bangkok" },
  { id: "th-hkt", country: "Thailand", state: "Phuket", city: "Phuket" },
  { id: "ae-dxb", country: "UAE", state: "Dubai", city: "Dubai" }
];

export const HOTELS = [
  {
    id: "h1",
    cityId: "my-kul",
    name: "Grand Hyatt Kuala Lumpur",
    rating: 5,
    description: "Luxury hotel overlooking the iconic Petronas Twin Towers.",
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    rooms: [
      { id: "h1-r1", type: "Standard Double", price: 250 },
      { id: "h1-r2", type: "Deluxe Twin", price: 280 },
      { id: "h1-r3", type: "Suite", price: 450 }
    ],
    mealPlans: [
      { id: "ro", name: "Room Only", price: 0 },
      { id: "bb", name: "Breakfast", price: 25 },
      { id: "hb", name: "Half Board", price: 60 }
    ]
  },
  {
    id: "h2",
    cityId: "my-kul",
    name: "Trader's Hotel KL",
    rating: 4,
    description: "Modern hotel located right in the heart of KLCC.",
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    rooms: [
      { id: "h2-r1", type: "Superior Double", price: 150 },
      { id: "h2-r2", type: "Executive Suite", price: 300 }
    ],
    mealPlans: [
      { id: "ro", name: "Room Only", price: 0 },
      { id: "bb", name: "Breakfast", price: 20 }
    ]
  },
  {
    id: "h3",
    cityId: "my-lgk",
    name: "The Ritz-Carlton, Langkawi",
    rating: 5,
    description: "Oceanfront resort enveloped by ancient jungle.",
    image: "https://images.pexels.com/photos/261326/pexels-photo-261326.jpeg",
    rooms: [
      { id: "h3-r1", type: "Rainforest Room", price: 350 },
      { id: "h3-r2", type: "Ocean Front Villa", price: 800 }
    ],
    mealPlans: [
      { id: "bb", name: "Breakfast", price: 40 },
      { id: "fb", name: "Full Board", price: 120 }
    ]
  }
];

export const TRANSPORT_OPTIONS = [
  { id: "t1", type: "Private Car", capacity: 3, basePrice: 50, pricePerKm: 2 },
  { id: "t2", type: "Luxury MPV", capacity: 6, basePrice: 80, pricePerKm: 3 },
  { id: "t3", type: "15-Seater Van", capacity: 12, basePrice: 120, pricePerKm: 4 },
  { id: "t4", type: "Mini Coach", capacity: 25, basePrice: 200, pricePerKm: 6 },
  { id: "t5", type: "Flight (Economy)", capacity: 1, basePrice: 100, pricePerKm: 0.1 }
];

export const ATTRACTIONS = [
  {
    id: "a1",
    cityId: "my-kul",
    name: "Petronas Twin Towers Skybridge",
    category: "Historical",
    durationHours: 2,
    price: 30,
    image: "https://images.pexels.com/photos/2281566/pexels-photo-2281566.jpeg",
    description: "Visit the iconic 88-story twin towers and walk the skybridge."
  },
  {
    id: "a2",
    cityId: "my-kul",
    name: "Batu Caves Tour",
    category: "Cultural",
    durationHours: 3,
    price: 15,
    image: "https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg",
    description: "Explore the ancient limestone caves and Hindu temples."
  },
  {
    id: "a3",
    cityId: "my-lgk",
    name: "Langkawi Cable Car & SkyBridge",
    category: "Adventure",
    durationHours: 4,
    price: 45,
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg",
    description: "Ride the steep cable car to the peak of Machinchang mountain."
  },
  {
    id: "a4",
    cityId: "my-lgk",
    name: "Mangrove Safari Tour",
    category: "Nature",
    durationHours: 5,
    price: 55,
    image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg",
    description: "Boat tour through the Kilim Karst Geoforest Park."
  }
];

export const ADDITIONAL_SERVICES = [
  { id: "s1", name: "Professional Tour Guide (English)", pricePerDay: 80 },
  { id: "s2", name: "Professional Tour Guide (Mandarin)", pricePerDay: 90 },
  { id: "s3", name: "Travel Insurance", pricePerDay: 5 },
  { id: "s4", name: "Visa Processing Assistance", pricePerDay: 0, flatFee: 50 },
  { id: "s5", name: "Local SIM Card (Unlimited Data)", pricePerDay: 0, flatFee: 15 },
  { id: "s6", name: "Airport Meet & Greet VIP", pricePerDay: 0, flatFee: 100 }
];

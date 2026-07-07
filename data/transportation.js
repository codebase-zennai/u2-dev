export const airportTransfers = [
  {
    id: 1,
    route: "KLIA to Kuala Lumpur City Hotels",
    price: 28,
    description:
      "Private transfer from KLIA/KLIA2 to any hotel in Kuala Lumpur city center.",
    image: "/images/transport/airport-1.jpg",
    duration: "1 Hr",
    type: "airport",
  },
  {
    id: 2,
    route: "KLIA to Genting Highlands",
    price: 68,
    description:
      "Direct transfer from the airport to the cool highlands of Genting.",
    image: "/images/transport/airport-2.jpg",
    duration: "2 Hrs",
    type: "airport",
  },
  {
    id: 3,
    route: "Kuala Lumpur to Melaka",
    price: 79,
    description:
      "Comfortable transfer from KL to the historic UNESCO World Heritage city.",
    image: "/images/transport/airport-3.jpg",
    duration: "2.5 Hrs",
    type: "airport",
  },
  {
    id: 4,
    route: "Kuala Lumpur to Port Dickson",
    price: 58,
    description: "Transfer to the beautiful beaches of Port Dickson from KL.",
    image: "/images/transport/airport-4.jpg",
    duration: "1.5 Hrs",
    type: "airport",
  },
  {
    id: 5,
    route: "Train Station to KL City Hotels",
    price: 19,
    description:
      "Pick-up from KL Sentral or any major train station to your hotel.",
    image: "/images/transport/airport-5.jpg",
    duration: "30 Mins",
    type: "airport",
  },
];

export const tourTransfers = [
  {
    id: 6,
    route: "Genting Tours",
    duration: "8 Hrs",
    price: 68,
    description:
      "Full day tour to Genting Highlands with flexible free time at the resort.",
    image: "/images/transport/tour-1.jpg",
    type: "tour",
  },
  {
    id: 7,
    route: "Kuala Lumpur Night Tour",
    duration: "3 Hrs",
    price: 34,
    description:
      "Experience the dazzling lights and vibrant nightlife of Kuala Lumpur.",
    image: "/images/transport/tour-2.jpg",
    type: "tour",
  },
  {
    id: 8,
    route: "Kuala Lumpur City Tour",
    duration: "3.5 Hrs",
    price: 34,
    description:
      "Discover iconic KL landmarks including Petronas Towers and Batu Caves.",
    image: "/images/transport/tour-3.jpg",
    type: "tour",
  },
  {
    id: 9,
    route: "KL Country Tour",
    duration: "4 Hrs",
    price: 34,
    description:
      "Explore the natural beauty and rural charm surrounding Kuala Lumpur.",
    image: "/images/transport/tour-4.jpg",
    type: "tour",
  },
  {
    id: 10,
    route: "Melaka Tour",
    duration: "8 Hrs",
    price: 113,
    description:
      "Full day tour of Melaka covering Dutch Square, A Famosa, and Jonker Street.",
    image: "/images/transport/tour-5.jpg",
    type: "tour",
  },
  {
    id: 11,
    route: "Dinner Transfer",
    duration: "Evening",
    price: 27,
    description: "Round-trip transfer to popular dining destinations in KL.",
    image: "/images/transport/tour-6.jpg",
    type: "tour",
  },
];

export const unifiedTransportation = [...airportTransfers, ...tourTransfers];

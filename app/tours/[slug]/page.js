import { Bed, Calendar, Car, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const toursDatabase = {
  "genting-highlands": {
    name: "3D2N Genting Highlands Getaway",
    category: "malaysian",
    price: 399,
    duration: "3 Days, 2 Nights",
    image: "https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg",
    description:
      "Escape to the cooling mountain resort of Genting Highlands. Experience theme parks, shopping, and high-altitude entertainment.",
    destination: "Pahang, Malaysia",
    accommodation: "4-Star Resort Hotel",
    meals: "Daily Breakfast",
    transport: "Return Shuttle Bus & Cable Car",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Awana Skyway",
        desc: "Depart from Kuala Lumpur and transfer to Genting Highlands. Enjoy a scenic ride on the Awana Skyway cable car, taking in the panoramic mountain breeze. Check in and spend your evening exploring SkyAvenue mall.",
      },
      {
        day: 2,
        title: "SkyWorlds Theme Park Adventure",
        desc: "Spend a thrilling day at Genting SkyWorlds Theme Park. Discover 9 uniquely themed worlds with state-of-the-art rides, dining, and live entertainment suitable for all ages.",
      },
      {
        day: 3,
        title: "Premium Outlets & Departure",
        desc: "Check out and head to the Genting Highlands Premium Outlets for a morning of shopping. Transfer back to Kuala Lumpur in the afternoon.",
      },
    ],
  },
  "gua-mulu": {
    name: "5D4N Gua Mulu Cave Adventure",
    category: "malaysian",
    price: 899,
    duration: "5 Days, 4 Nights",
    image:
      "https://images.pexels.com/photos/46253/cave-subterranean-speleology-speleothem-46253.jpeg",
    description:
      "Explore the UNESCO World Heritage Mulu Caves. Walk through massive chambers and hike the spectacular razor-sharp pinnacles.",
    destination: "Sarawak, Malaysia",
    accommodation: "Park Bungalows / Mulu Marriott",
    meals: "Full Board (Breakfast, Lunch, Dinner)",
    transport: "Longboat River Transfers & Guided Walks",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Deer & Lang Caves",
        desc: "Arrive at Mulu Airport and transfer to your lodge. In the afternoon, take a scenic jungle walk to explore Lang's Cave and the massive Deer Cave. Witness the spectacular bat exodus at dusk.",
      },
      {
        day: 2,
        title: "Wind Cave & Clearwater Cave",
        desc: "Board a traditional longboat up the Melinau River. Stop at Wind Cave to marvel at delicate stalactites, then visit Clearwater Cave to see the subterranean river systems. Enjoy a picnic lunch and swim in the spring waters.",
      },
      {
        day: 3,
        title: "Mulu Canopy Skywalk",
        desc: "Experience the world's longest tree-based canopy walk. Stroll 15 meters above the forest floor and spot unique birds, orchids, and canopy wildlife.",
      },
      {
        day: 4,
        title: "Fast Lane Adventure Trek",
        desc: "Embark on a challenging trek to the Fast Lane section of Lagangs Cave. Learn about cave geology and admire the unique rock formations.",
      },
      {
        day: 5,
        title: "Departure",
        desc: "Leisurely morning around the resort. Check out and transfer to Mulu Airport for your flight home.",
      },
    ],
  },
  johor: {
    name: "4D3N Johor Heritage & Parks",
    category: "malaysian",
    price: 499,
    duration: "4 Days, 3 Nights",
    image: "https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg",
    description:
      "Perfect family fun at Legoland and Desaru Coast. Discover historical heritage and delicious southern culinary delights.",
    destination: "Johor, Malaysia",
    accommodation: "4-Star City/Theme Park Hotel",
    meals: "Daily Breakfast & 1 Local Dinner",
    transport: "Private Ground Transfers",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Johor Bahru City Tour",
        desc: "Arrive in JB and check in. Visit the beautiful Sultan Abu Bakar State Mosque, take a walk down Tan Hiok Nee Heritage Street, and enjoy local street food.",
      },
      {
        day: 2,
        title: "Legoland Malaysia Resort",
        desc: "Enjoy a full day at Legoland Theme Park and Water Park. Experience interactive rides, shows, and LEGO building workshops, fun for the whole family.",
      },
      {
        day: 3,
        title: "Desaru Coast Beach Escape",
        desc: "Drive to Desaru Coast. Spend the day relaxing on sandy beaches, visiting the local fruit farm, or visiting the Desaru Coast Adventure Waterpark.",
      },
      {
        day: 4,
        title: "Shopping at JPO & Departure",
        desc: "Visit Johor Premium Outlets (JPO) for discounted luxury shopping. Transfer to the airport/station for departure.",
      },
    ],
  },
  "kota-kinabalu": {
    name: "5D4N Kota Kinabalu Mount Climb",
    category: "malaysian",
    price: 1199,
    duration: "5 Days, 4 Nights",
    image: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg",
    description:
      "Climb Mount Kinabalu, witness breathtaking peak sunrises, and relax on beautiful sandy islands of Sabah.",
    destination: "Sabah, Malaysia",
    accommodation: "Mountain Huts & KK Hotel",
    meals: "Full Board on Climb Days, Breakfast in KK",
    transport: "Airport Pickups & Park Vans",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kota Kinabalu",
        desc: "Arrive in KK, transfer to your hotel. Spend the day visiting the KK Waterfront and night market.",
      },
      {
        day: 2,
        title: "Kinabalu Park & Base Camp",
        desc: "Transfer to Kinabalu National Park. Take a guided walk around the botanic gardens and check into your park lodge to acclimate.",
      },
      {
        day: 3,
        title: "The Climb: Timpohon to Laban Rata",
        desc: "Start the hike from Timpohon Gate. Trek through beautiful mossy forests up to Laban Rata Resthouse (3,272m). Enjoy dinner and rest early.",
      },
      {
        day: 4,
        title: "Summit Sunrise & Return to KK",
        desc: "Wake up at 2:00 AM. Ascend to Low's Peak (4,095m) for a glorious sunrise. Descend to base camp, head back to KK, and celebrate at a local seafood dinner.",
      },
      {
        day: 5,
        title: "Island Hopping & Departure",
        desc: "Take a speed boat to Tunku Abdul Rahman Marine Park for snorkelling. Check out and head to KK airport for departure.",
      },
    ],
  },
  "kuala-lumpur": {
    name: "4D3N Kuala Lumpur City Discovery",
    category: "malaysian",
    price: 450,
    duration: "4 Days, 3 Nights",
    image: "https://images.pexels.com/photos/2281566/pexels-photo-2281566.jpeg",
    description:
      "Marvel at the Petronas Twin Towers, explore ancient Batu Caves, and experience vibrant street food and shopping.",
    destination: "Kuala Lumpur, Malaysia",
    accommodation: "4-Star City Center Hotel",
    meals: "Daily Breakfast & 1 High Tea",
    transport: "Hop-on Hop-off & Private Tours",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Petronas Towers",
        desc: "Arrive in KL. Visit the Skybridge at Petronas Twin Towers, then check out Bukit Bintang for shopping and dining.",
      },
      {
        day: 2,
        title: "Batu Caves & Heritage Landmarks",
        desc: "Climb the colorful 272 steps at Batu Caves. Later, tour Merdeka Square, Sultan Abdul Samad Building, and the National Mosque.",
      },
      {
        day: 3,
        title: "Chinatown, Petaling Street & Local Food",
        desc: "Discover historic Petaling Street, visit Kwai Chai Hong alleys, and enjoy a curated culinary tour testing local claypot rice and noodles.",
      },
      {
        day: 4,
        title: "KL Tower & Departure",
        desc: "Visit KL Tower Observation Deck for panoramic city photos. Shop at Central Market before transfer to KLIA.",
      },
    ],
  },
  kuantan: {
    name: "3D2N Kuantan Beaches & Waterfalls",
    category: "malaysian",
    price: 299,
    duration: "3 Days, 2 Nights",
    image: "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg",
    description:
      "Relax on Cherating Beach, see the rainbow waterfalls of Sungai Lembing, and enjoy authentic seaside dining.",
    destination: "Pahang, Malaysia",
    accommodation: "Beachfront Resort Hotel",
    meals: "Daily Breakfast",
    transport: "Private Vehicle Transfers",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Cherating Beach Sunset",
        desc: "Arrive in Kuantan, check in to your beachfront resort. Take a stroll along Cherating Beach, visit the Turtle Sanctuary, and watch fireflies in the evening.",
      },
      {
        day: 2,
        title: "Sungai Lembing Rainbow Waterfall",
        desc: "Wake up early to catch a 4WD to the trailhead. Hike to the famous Rainbow Waterfall where sunlight forms a perfect rainbow in the mist. Visit the historical tin mines later.",
      },
      {
        day: 3,
        title: "Teluk Cempedak & Departure",
        desc: "Visit Teluk Cempedak for seaside photos, check out local crafts at Kuantan Art Street, and transfer back.",
      },
    ],
  },
  langkawi: {
    name: "3D2N Langkawi Tropical Retreat",
    category: "malaysian",
    price: 350,
    duration: "3 Days, 2 Nights",
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg",
    description:
      "Duty-free shopping, cable car skybridge rides, and gorgeous sun-drenched beaches at this legendary archipelago.",
    destination: "Langkawi, Kedah, Malaysia",
    accommodation: "4-Star Beachside Resort",
    meals: "Daily Breakfast",
    transport: "Car Rental / Private Transfers",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Pantai Cenang",
        desc: "Arrive in Langkawi, check in at Cenang. Spend your afternoon relaxing on the beach or doing water sports. Stroll the duty-free malls in the evening.",
      },
      {
        day: 2,
        title: "Langkawi Cable Car & SkyBridge",
        desc: "Ride the Langkawi SkyCab up Machinchang Mountain. Walk on the SkyBridge suspended above the forest. Enjoy a mangrove boat tour in Kilim Geoforest Park afterwards.",
      },
      {
        day: 3,
        title: "Eagle Square & Departure",
        desc: "Take photos at the iconic Dataran Lang (Eagle Square) in Kuah Town. Shop for chocolates and souvenirs, then head to Langkawi Airport.",
      },
    ],
  },
  melaka: {
    name: "3D2N Melaka Historical Heritage",
    category: "malaysian",
    price: 299,
    duration: "3 Days, 2 Nights",
    image: "https://images.pexels.com/photos/1684188/pexels-photo-1684188.jpeg",
    description:
      "Take a trishaw ride through historical Dutch Square, cruise Melaka River, and enjoy unique Nyonya cuisine.",
    destination: "Melaka, Malaysia",
    accommodation: "Boutique Heritage Hotel",
    meals: "Daily Breakfast & 1 Peranakan Lunch",
    transport: "Walking Tours & River Cruise",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Jonker Street Night Market",
        desc: "Arrive in Melaka. Visit Jonker Street for shopping, antique hunting, and tasting local treats at the night market.",
      },
      {
        day: 2,
        title: "UNESCO Heritage Sites & River Cruise",
        desc: "Visit St. Paul's Hill, A Famosa fort, and Christ Church in Dutch Square. In the evening, take a relaxing 45-minute Melaka River Cruise.",
      },
      {
        day: 3,
        title: "Baba Nyonya Museum & Departure",
        desc: "Tour the Baba & Nyonya Heritage Museum. Savour chicken rice balls and Nyonya laksa before departure.",
      },
    ],
  },
  pahang: {
    name: "4D3N Pahang Jungle Expedition",
    category: "malaysian",
    price: 699,
    duration: "4 Days, 3 Nights",
    image: "https://images.pexels.com/photos/2400659/pexels-photo-2400659.jpeg",
    description:
      "Journey deep into Taman Negara, walk the canopy bridge, and witness rich tropical rainforest flora and fauna.",
    destination: "Taman Negara, Pahang, Malaysia",
    accommodation: "Eco-Resort Jungle Lodge",
    meals: "Full Board",
    transport: "Wooden Boat Transfers & Guided Treks",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Night Jungle Walk",
        desc: "Depart from KL, take a boat from Kuala Tembeling to Taman Negara. Check in, and explore the forest at night with a guide to spot nocturnal insects and glowing mushrooms.",
      },
      {
        day: 2,
        title: "Canopy Walkway & Bukit Teresek",
        desc: "Walk the world's longest canopy bridge. Hike up Bukit Teresek for a panoramic view of Mount Tahan. Take a boat to Lata Berkoh waterfalls in the afternoon.",
      },
      {
        day: 3,
        title: "Orang Asli Settlement & Rapid Shooting",
        desc: "Visit a local Bateq Orang Asli village to learn ancestral hunting and survival skills. Experience rapid shooting in a wooden boat.",
      },
      {
        day: 4,
        title: "Check Out & Departure",
        desc: "Leisurely breakfast listening to jungle sounds. Board the return boat and transfer back.",
      },
    ],
  },
  penang: {
    name: "4D3N Penang Culinary Heritage",
    category: "malaysian",
    price: 399,
    duration: "4 Days, 3 Nights",
    image: "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg",
    description:
      "Voted top food city globally. Walk down historic Georgetown streets, visit Kek Lok Si Temple, and indulge in street food.",
    destination: "Penang, Malaysia",
    accommodation: "4-Star Georgetown Heritage Hotel",
    meals: "Daily Breakfast & Street Food Tour voucher",
    transport: "Heritage Trishaw & Private Tours",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Street Art Hunt",
        desc: "Arrive in Penang, check in. Spend the afternoon finding the famous street art murals in Georgetown. Enjoy dinner at Gurney Drive hawker center.",
      },
      {
        day: 2,
        title: "Kek Lok Si Temple & Penang Hill",
        desc: "Visit Kek Lok Si, the largest Buddhist temple in Malaysia. Take the funicular train up Penang Hill for spectacular sunset views of the island.",
      },
      {
        day: 3,
        title: "Clan Jetties & Peranakan Mansion",
        desc: "Explore the historic Chew Jetty houses on stilts, then tour the green Pinang Peranakan Mansion. Take an evening trishaw ride.",
      },
      {
        day: 4,
        title: "Batu Ferringhi & Departure",
        desc: "Visit the beaches of Batu Ferringhi, shop for local pastries (Tau Sar Piah), and transfer to the airport.",
      },
    ],
  },
  perak: {
    name: "3D2N Perak Ipoh Heritage Tour",
    category: "malaysian",
    price: 299,
    duration: "3 Days, 2 Nights",
    image: "https://images.pexels.com/photos/1825708/pexels-photo-1825708.jpeg",
    description:
      "Discover cave temples, historical colonial structures, and sample famous Ipoh white coffee and local desserts.",
    destination: "Ipoh, Perak, Malaysia",
    accommodation: "Boutique Hotel",
    meals: "Daily Breakfast",
    transport: "Private Vehicle Transfers",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Concubine Lane",
        desc: "Arrive in Ipoh, check in. Walk through the historical Concubine Lane, tasting bean sprouts chicken and egg tarts.",
      },
      {
        day: 2,
        title: "Kek Lok Tong & Kellie's Castle",
        desc: "Visit the magnificent Kek Lok Tong Cave Temple. Drive out to Kellie's Castle, a mysterious unfinished mansion from the colonial era.",
      },
      {
        day: 3,
        title: "Old Town Heritage & Departure",
        desc: "Explore Birch Memorial Clock Tower, take photos at Ipoh Railway Station, and grab some Ipoh white coffee before heading home.",
      },
    ],
  },
  selangor: {
    name: "3D2N Selangor Adventure & Theme Park",
    category: "malaysian",
    price: 250,
    duration: "3 Days, 2 Nights",
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    description:
      "Witness magical fireflies in Kuala Selangor, try white-water rafting, and explore the theme parks of Sunway Lagoon.",
    destination: "Selangor, Malaysia",
    accommodation: "4-Star City Hotel",
    meals: "Daily Breakfast",
    transport: "Private Transfers",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Sunway Lagoon",
        desc: "Check into your hotel. Spend a full day at Sunway Lagoon Theme Park, enjoying water rides, wildlife encounters, and extreme parks.",
      },
      {
        day: 2,
        title: "Kuala Selangor Fireflies & Blue Tears",
        desc: "Drive to Kuala Selangor. Climb Bukit Melawati, then take an evening boat ride to witness synchronized fireflies and the glowing blue tears phenomenon.",
      },
      {
        day: 3,
        title: "Sky Mirror & Departure",
        desc: "Take a boat to Sky Mirror sandbar during low tide for amazing reflective photography. Transfer back to the airport.",
      },
    ],
  },
  "tasik-widuri": {
    name: "3D2N Tasik Widuri Lakeside Escape",
    category: "malaysian",
    price: 199,
    duration: "3 Days, 2 Nights",
    image: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg",
    description:
      "Unwind at the serene lakeside resort of Tasik Widuri. Great for boat tours, fishing, and peaceful retreats.",
    destination: "Perak, Malaysia",
    accommodation: "Lakeside Resort Villa",
    meals: "Daily Breakfast",
    transport: "Private Transfers",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Sunset Lake Cruise",
        desc: "Arrive at Tasik Widuri and check into your lakeside villa. Enjoy a peaceful sunset pontoon boat ride around the lake.",
      },
      {
        day: 2,
        title: "Fishing & Outdoor Recreational Activities",
        desc: "Spend your day fishing, cycling around the scenic lake path, and enjoying the resort's water park facilities.",
      },
      {
        day: 3,
        title: "Leisure Morning & Departure",
        desc: "Enjoy breakfast overlooking the mist rising from the lake. Relax and check out for departure.",
      },
    ],
  },
  dubai: {
    name: "5D4N Dubai Desert Luxury Tour",
    category: "world",
    price: 1499,
    duration: "5 Days, 4 Nights",
    image: "https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg",
    description:
      "Ride camels in the Arabian desert, visit the Burj Khalifa observation deck, and explore grand shopping malls.",
    destination: "Dubai, UAE",
    accommodation: "5-Star Luxury Hotel",
    meals: "Daily Breakfast & 1 Desert BBQ Dinner",
    transport: "4WD Vehicles & Airport Transfers",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Dhow Cruise Dinner",
        desc: "Arrive in Dubai, transfer to your hotel. In the evening, enjoy a buffet dinner on a traditional wooden Dhow cruise along Dubai Creek.",
      },
      {
        day: 2,
        title: "Burj Khalifa & Modern City Tour",
        desc: "Explore modern Dubai. Visit Dubai Marina, Palm Jumeirah, and head up to the 124th floor of the Burj Khalifa. Shop at Dubai Mall.",
      },
      {
        day: 3,
        title: "Desert Safari & BBQ Camp",
        desc: "Hop into a 4WD for dune bashing in the desert. Ride camels, try sandboarding, and enjoy a Middle Eastern BBQ dinner under the stars with belly dancing performances.",
      },
      {
        day: 4,
        title: "Old Dubai & Souk Exploration",
        desc: "Cross the Dubai Creek by abra water taxi. Explore the Gold Souk and Spice Souk. Afternoon leisure or shopping.",
      },
      {
        day: 5,
        title: "Miracle Garden & Departure",
        desc: "Visit the world's largest natural flower garden. Transfer to Dubai International Airport for departure.",
      },
    ],
  },
  europe: {
    name: "10D9N Grand European Classics",
    category: "world",
    price: 3499,
    duration: "10 Days, 9 Nights",
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    description:
      "Experience the romance of Paris, the historic Colosseum of Rome, and the spectacular snowcapped Swiss Alps.",
    destination: "France, Switzerland, Italy",
    accommodation: "4-Star Hotels throughout Europe",
    meals: "Daily Breakfast & 4 dinners",
    transport: "Luxury AC Tour Coach & Scenic Trains",
    itinerary: [
      {
        day: 1,
        title: "Arrive in Paris, France",
        desc: "Arrive in Paris, check in. Enjoy a scenic evening cruise along the Seine River to see the Eiffel Tower lit up.",
      },
      {
        day: 2,
        title: "Paris Landmarks & Louvre Museum",
        desc: "Guided tour of Arc de Triomphe, Champs-Élysées, and visit the Louvre Museum. Afternoon leisure.",
      },
      {
        day: 3,
        title: "Paris to Switzerland Scenic Drive",
        desc: "Drive through beautiful French vineyards and check into your Swiss alpine lodge.",
      },
      {
        day: 4,
        title: "Mount Titlis Snow Mountain",
        desc: "Ride the Rotair revolving cable car up Mount Titlis (3,020m). Walk the glacier cave and cross the Titlis Cliff Bridge. Visit Lucerne later.",
      },
      {
        day: 5,
        title: "Lucerne to Venice, Italy",
        desc: "Drive past Lake Lugano, cross the border into Italy, and head to Venice.",
      },
      {
        day: 6,
        title: "Venice Island Tour & Gondola Ride",
        desc: "Take a private boat to St. Mark's Square. Visit Doge's Palace, watch a glassblowing demonstration, and take a traditional gondola cruise.",
      },
      {
        day: 7,
        title: "Venice to Florence & Pisa",
        desc: "Travel to Florence, the cradle of the Renaissance. Visit the Cathedral. Stop by the Leaning Tower of Pisa.",
      },
      {
        day: 8,
        title: "Florence to Rome & Colosseum",
        desc: "Travel to Rome. Tour the iconic Colosseum and see the Roman Forum.",
      },
      {
        day: 9,
        title: "Vatican City & Trevi Fountain",
        desc: "Visit St. Peter's Basilica in the Vatican, throw a coin in the Trevi Fountain, and see the Spanish Steps.",
      },
      {
        day: 10,
        title: "Departure from Rome",
        desc: "Leisure morning for shopping. Transfer to Rome Fiumicino Airport for your flight back.",
      },
    ],
  },
  india: {
    name: "7D6N India Golden Triangle Heritage",
    category: "world",
    price: 1299,
    duration: "7 Days, 6 Nights",
    image: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg",
    description:
      "Marvel at the majestic Taj Mahal in Agra, explore Jaipur's Pink City palaces, and experience bustling Old Delhi.",
    destination: "Delhi, Agra, Jaipur, India",
    accommodation: "4-Star Heritage Hotels",
    meals: "Daily Breakfast & 2 Dinners",
    transport: "Private AC Chauffeured Sedan",
    itinerary: [
      {
        day: 1,
        title: "Arrival in New Delhi",
        desc: "Arrive in Delhi and transfer to hotel. Rest of the day is at leisure.",
      },
      {
        day: 2,
        title: "Delhi Sightseeing Tour",
        desc: "Explore Old Delhi: Rickshaw ride at Chandni Chowk, see the Red Fort and Jama Masjid. Explore New Delhi: Qutub Minar, India Gate, and drive past Parliament House.",
      },
      {
        day: 3,
        title: "Delhi to Agra & Agra Fort",
        desc: "Drive to Agra. Check in and visit the magnificent Agra Fort. Enjoy sunset views of the Taj Mahal from across the Yamuna River.",
      },
      {
        day: 4,
        title: "Taj Mahal Sunrise & Travel to Jaipur",
        desc: "Visit the Taj Mahal at sunrise for stunning photo opportunities. Return for breakfast, then drive to Jaipur, visiting the ghost city Fatehpur Sikri enroute.",
      },
      {
        day: 5,
        title: "Jaipur Pink City Palace Tour",
        desc: "Visit Amer Fort on elephant/jeep. Later, see the Hawa Mahal (Palace of Winds), City Palace, and Jantar Mantar Observatory.",
      },
      {
        day: 6,
        title: "Jaipur to Delhi & Shopping",
        desc: "Drive back to Delhi. Spend the evening shopping at Connaught Place or Dilli Haat craft bazaar.",
      },
      {
        day: 7,
        title: "Departure",
        desc: "Transfer to Delhi Indira Gandhi International Airport for departure.",
      },
    ],
  },
  indonesia: {
    name: "6D5N Bali Exotic Island Retreat",
    category: "world",
    price: 799,
    duration: "6 Days, 5 Nights",
    image: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg",
    description:
      "Tour historic temples in Ubud, walk on volcanic black beaches, and witness stunning seaside cliff sunsets.",
    destination: "Bali, Indonesia",
    accommodation: "Beachfront Resort & Ubud Villa",
    meals: "Daily Breakfast & 1 Jimbaran Seafood Dinner",
    transport: "Private English-Speaking Driver/Guide",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bali & Uluwatu Cliff Temple",
        desc: "Arrive in Denpasar, transfer to Kuta. In the afternoon, visit Uluwatu Temple perched on a 70m cliff, and watch a traditional Kecak fire dance.",
      },
      {
        day: 2,
        title: "Kintamani Volcano & Ubud Heritage",
        desc: "Trek up to Kintamani overlooking Mount Batur active volcano. Walk through Tegalalang Rice Terraces and explore Ubud Monkey Forest.",
      },
      {
        day: 3,
        title: "Waterfalls & Tanah Lot Temple Sunset",
        desc: "Visit Tegenungan Waterfall. Stop at the iconic Tanah Lot Temple, built on a rock out in the ocean, for a spectacular sunset.",
      },
      {
        day: 4,
        title: "Nusa Penida Island Tour",
        desc: "Take a speed boat to Nusa Penida. Visit Kelingking Beach (T-Rex Cliff), Broken Beach, and Angel's Billabong.",
      },
      {
        day: 5,
        title: "Ulun Danu Bratan Lake Temple",
        desc: "Drive to Bedugul highlands to see the Ulun Danu temple floating on Lake Bratan. Dinner at Jimbaran Beach.",
      },
      {
        day: 6,
        title: "Departure",
        desc: "Leisurely morning around Kuta. Transfer to airport for flight.",
      },
    ],
  },
  korea: {
    name: "6D5N Korea Seoul & Traditions",
    category: "world",
    price: 1599,
    duration: "6 Days, 5 Nights",
    image: "https://images.pexels.com/photos/2372977/pexels-photo-2372977.jpeg",
    description:
      "Explore historic palaces in Seoul, shop in Myeongdong, and experience the beautiful cherry blossoms of Jeju Island.",
    destination: "Seoul & Jeju Island, South Korea",
    accommodation: "4-Star City Hotels",
    meals: "Daily Breakfast & 2 Lunches",
    transport: "Domestic Flights & Subway Tours",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Seoul",
        desc: "Arrive at Incheon Airport, transfer to hotel in Seoul. Spend the evening visiting Namsan Seoul Tower.",
      },
      {
        day: 2,
        title: "Gyeongbokgung Palace & Bukchon Hanok",
        desc: "Watch the Changing of the Guard at Gyeongbokgung Palace, rent a traditional Hanbok, and stroll through Bukchon Hanok Village.",
      },
      {
        day: 3,
        title: "Fly to Jeju Island",
        desc: "Take a domestic flight to Jeju Island. Visit Yongduam Dragon Head Rock and stroll Hallasan park.",
      },
      {
        day: 4,
        title: "Jeju Sunrise Peak & Waterfalls",
        desc: "Climb Seongsan Ilchulbong (Sunrise Peak) for views of the crater. Visit Cheonjiyeon Waterfall and Seongeup Folk Village.",
      },
      {
        day: 5,
        title: "Return to Seoul & Myeongdong Shopping",
        desc: "Fly back to Seoul. Shop at Myeongdong market and enjoy local ginseng chicken soup.",
      },
      {
        day: 6,
        title: "Nami Island & Departure",
        desc: "Visit Nami Island (filming site of Winter Sonata) in Gapyeong. Transfer to Incheon Airport.",
      },
    ],
  },
  nepal: {
    name: "7D6N Nepal Himalayan Expedition",
    category: "world",
    price: 1099,
    duration: "7 Days, 6 Nights",
    image: "https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg",
    description:
      "Hike near Pokhara lake, see Mount Everest ranges, and tour ancient temples in the historic city of Kathmandu.",
    destination: "Kathmandu & Pokhara, Nepal",
    accommodation: "3-Star / 4-Star Resort Hotels",
    meals: "Daily Breakfast & 1 Cultural Dinner",
    transport: "Private Tourist Coach",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kathmandu",
        desc: "Arrive in Kathmandu, transfer to hotel. Enjoy a traditional Nepalese dinner and folk dances.",
      },
      {
        day: 2,
        title: "Kathmandu UNESCO Sites",
        desc: "Visit Boudhanath Stupa, Pashupatinath Hindu temple, and Swayambhunath (Monkey Temple).",
      },
      {
        day: 3,
        title: "Drive to Pokhara & Phewa Lake",
        desc: "Scenic drive along Trisuli River to Pokhara. In the evening, enjoy a tranquil boat ride on Phewa Lake.",
      },
      {
        day: 4,
        title: "Sarangkot Sunrise & Mountain views",
        desc: "Drive to Sarangkot at 4:30 AM to see sunrise over the Annapurna ranges. Visit Davis Falls and Gupteshwor Cave later.",
      },
      {
        day: 5,
        title: "Pokhara to Kathmandu & Patan City",
        desc: "Drive back to Kathmandu. Stop at Patan Durbar Square to see medieval arts and architecture.",
      },
      {
        day: 6,
        title: "Bhakthapur City Heritage",
        desc: "Visit Bhaktapur Durbar Square, famous for woodcarvings and pottery. Afternoon free for trekking shopping.",
      },
      {
        day: 7,
        title: "Departure",
        desc: "Transfer to Kathmandu Tribhuvan Airport for your flight.",
      },
    ],
  },
  "south-africa": {
    name: "8D7N South Africa Wildlife Safari",
    category: "world",
    price: 2499,
    duration: "8 Days, 7 Nights",
    image: "https://images.pexels.com/photos/52961/pexels-photo-52961.jpeg",
    description:
      "Go on big-game safaris at Kruger National Park and ride the cableway to the summit of Table Mountain.",
    destination: "Cape Town & Kruger Park, South Africa",
    accommodation: "4-Star Safari Lodges & Cape Town Hotel",
    meals: "Full Board on Safari, Breakfast in Cape Town",
    transport: "Open Safari Vehicles & Domestic Flights",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cape Town",
        desc: "Arrive in Cape Town and transfer to hotel. Rest of the day is at leisure.",
      },
      {
        day: 2,
        title: "Table Mountain & City Tour",
        desc: "Ride the Table Mountain Aerial Cableway (weather permitting) for views. Explore the Castle of Good Hope and colorful Bo-Kaap neighborhood.",
      },
      {
        day: 3,
        title: "Cape Peninsula & Penguins",
        desc: "Scenic drive along Chapman's Peak. Visit Cape Point and the Cape of Good Hope. Stop at Boulders Beach to see the African penguin colony.",
      },
      {
        day: 4,
        title: "Fly to Johannesburg & Kruger Lodge",
        desc: "Take a flight to Johannesburg, then drive to a safari lodge on the border of Kruger National Park. Take an evening game drive.",
      },
      {
        day: 5,
        title: "Full Day Kruger Safari",
        desc: "Go on a sunrise safari in open 4x4 vehicles. Search for the Big Five (lion, leopard, elephant, rhino, buffalo) with park rangers. Dinner around a traditional Boma fire.",
      },
      {
        day: 6,
        title: "Panorama Route Scenic Drive",
        desc: "Drive the Panorama Route. See Blyde River Canyon, Bourke's Luck Potholes, and God's Window viewpoint.",
      },
      {
        day: 7,
        title: "Johannesburg Soweto Tour",
        desc: "Drive back to Johannesburg. Tour Soweto township, visiting Nelson Mandela's former house.",
      },
      {
        day: 8,
        title: "Check Out & Departure",
        desc: "Visit the local craft market. Transfer to O.R. Tambo International Airport for departure.",
      },
    ],
  },
  thailand: {
    name: "5D4N Amazing Thailand Explorer",
    category: "world",
    price: 699,
    duration: "5 Days, 4 Nights",
    image: "https://images.pexels.com/photos/415708/pexels-photo-415708.jpeg",
    description:
      "Explore Bangkok's grand palaces and reclining Buddhas, then relax on the world-class beaches of Phuket.",
    destination: "Bangkok & Phuket, Thailand",
    accommodation: "4-Star Resort Hotels",
    meals: "Daily Breakfast",
    transport: "Domestic Flights & Private Vans",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bangkok & River Cruise",
        desc: "Arrive in Bangkok and transfer to hotel. Enjoy an evening dinner cruise along the Chao Phraya River.",
      },
      {
        day: 2,
        title: "Grand Palace & Wat Pho",
        desc: "Explore the Grand Palace and Emerald Buddha temple. Visit Wat Pho to see the massive Reclining Buddha. Afternoon shopping at MBK.",
      },
      {
        day: 3,
        title: "Fly to Phuket & Beachfront Sunset",
        desc: "Fly to Phuket. Check in at your resort and spend the evening watching the sunset over Patong Beach.",
      },
      {
        day: 4,
        title: "Phi Phi Islands Speedboat Tour",
        desc: "Board a speed boat to Phi Phi Ley. Snorkel in Maya Bay (filming site of The Beach), swim in Pileh Lagoon, and see Monkey Beach.",
      },
      {
        day: 5,
        title: "Phuket Town & Departure",
        desc: "Tour historic Sino-Portuguese Phuket Old Town. Transfer to Phuket Airport for your flight.",
      },
    ],
  },
  vietnam: {
    name: "5D4N Vietnam Halong Bay Cruise",
    category: "world",
    price: 599,
    duration: "5 Days, 4 Nights",
    image: "https://images.pexels.com/photos/1031698/pexels-photo-1031698.jpeg",
    description:
      "Cruise through thousands of limestone islands in Halong Bay and walk heritage streets of Hanoi.",
    destination: "Hanoi & Halong Bay, Vietnam",
    accommodation: "4-Star Boutique Hotel & Cruise Cabin",
    meals: "Daily Breakfast, 1 Lunch, 1 Seafood Dinner",
    transport: "Cruiser Ship & AC Coach Transfers",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Hanoi",
        desc: "Arrive in Hanoi, check into hotel. Take a rickshaw (cyclo) tour around the Old Quarter and watch a traditional water puppet show.",
      },
      {
        day: 2,
        title: "Hanoi City Tour & Travel to Halong Bay",
        desc: "Visit Ho Chi Minh Mausoleum, One Pillar Pagoda, and the Temple of Literature. In the afternoon, drive through rural villages to Halong Bay.",
      },
      {
        day: 3,
        title: "Halong Bay Overnight Cruise",
        desc: "Board a luxury wooden junk cruise ship. Cruise past stunning karst stone towers. Explore Sung Sot (Surprise) Cave and kayak in quiet lagoons.",
      },
      {
        day: 4,
        title: "Tai Chi & Return to Hanoi",
        desc: "Start the day with Tai Chi on the deck. Cruise back to harbor, transfer back to Hanoi. Spend the evening shopping at Dong Xuan Market.",
      },
      {
        day: 5,
        title: "Check Out & Departure",
        desc: "Enjoy Vietnamese drip coffee by Hoan Kiem Lake. Transfer to Noi Bai International Airport for departure.",
      },
    ],
  },
};

export default async function TourItineraryPage({ params }) {
  const { slug } = await params;
  const tour = toursDatabase[slug];

  if (!tour) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="main-wrapper bg-slate-50 pt-24 pb-16">
        <div className="container-large">
          {/* Back Link */}
          <div className="mb-6">
            <Link
              href="/tours"
              className="text-[#013b85] hover:underline text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 no-underline"
            >
              ← Back to all packages
            </Link>
          </div>

          {/* Itinerary Banner Card */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm mb-12 flex flex-col md:grid md:grid-cols-[1.2fr_1fr]">
            {/* Cover Image */}
            <div className="relative aspect-[1.6] md:aspect-auto w-full min-h-[300px] bg-slate-100">
              <Image
                src={tour.image}
                alt={tour.name}
                fill
                className="object-cover"
                priority
              />
              {/* Category badge */}
              <div className="absolute left-6 top-6 bg-white/95 backdrop-blur-sm border border-slate-100 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#013b85] shadow-sm">
                {tour.category === "malaysian" ? "Local Tour" : "International"}
              </div>
            </div>

            {/* Title details */}
            <div className="p-6 md:p-10 flex flex-col justify-between">
              <div>
                <h1 className="font-extrabold text-[#013b85] text-3xl md:text-4xl mb-4 leading-tight uppercase tracking-wide">
                  {tour.name}
                </h1>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  {tour.description}
                </p>
              </div>

              {/* Booking Block */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                    Price From
                  </span>
                  <span className="text-3xl font-black text-[#013b85]">
                    MYR {tour.price}
                  </span>
                </div>
                <Link
                  href={`/contact?tour=${encodeURIComponent(tour.name)}`}
                  className="bg-[#013b85] hover:bg-[#7ff74b] !text-white hover:!text-black font-extrabold text-[12px] uppercase tracking-widest py-3.5 px-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 !no-underline"
                >
                  Book This Tour
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="bg-[#013b85]/10 p-3 rounded-xl">
                <Calendar className="h-6 w-6 text-[#013b85]" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                  Duration
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {tour.duration}
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="bg-[#013b85]/10 p-3 rounded-xl">
                <MapPin className="h-6 w-6 text-[#013b85]" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                  Location
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {tour.destination}
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="bg-[#013b85]/10 p-3 rounded-xl">
                <Bed className="h-6 w-6 text-[#013b85]" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                  Accommodation
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {tour.accommodation}
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="bg-[#013b85]/10 p-3 rounded-xl">
                <Car className="h-6 w-6 text-[#013b85]" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                  Transport
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {tour.transport}
                </span>
              </div>
            </div>
          </div>

          {/* Layout Body - Left: Timeline, Right: Inclusions */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8">
            {/* Day-by-Day Timeline */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="font-extrabold text-[#013b85] text-2xl mb-8 uppercase tracking-wide">
                Detailed Itinerary
              </h2>
              <div className="relative pl-6 md:pl-8 border-l border-slate-200 flex flex-col gap-8 md:gap-10">
                {tour.itinerary.map((step) => (
                  <div key={step.day} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[35px] md:-left-[43px] top-1 bg-[#013b85] text-white font-extrabold text-xs h-6 w-6 md:h-7 md:w-7 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                      {step.day}
                    </div>
                    <h3 className="font-bold text-[#013b85] text-lg mb-2 uppercase tracking-wide">
                      Day {step.day}: {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Panel: Inclusions & Exclusions */}
            <div className="flex flex-col gap-6">
              {/* Inclusions Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
                <h3 className="font-extrabold text-emerald-600 text-xl mb-4 uppercase tracking-wide">
                  What's Included
                </h3>
                <ul className="flex flex-col gap-2.5 text-slate-600 text-sm list-disc pl-5">
                  <li>Accommodation sharing double/twin bed rooms</li>
                  <li>Meals specified under quick overview highlights</li>
                  <li>Ground transport with air-conditioned vehicles</li>
                  <li>
                    Entrance fees to sightseeing spots listed in itinerary
                  </li>
                  <li>Professional local tour guide / driver assistance</li>
                </ul>
              </div>

              {/* Exclusions Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
                <h3 className="font-extrabold text-rose-500 text-xl mb-4 uppercase tracking-wide">
                  What's Excluded
                </h3>
                <ul className="flex flex-col gap-2.5 text-slate-600 text-sm list-disc pl-5">
                  <li>
                    International and domestic airfares (unless specified)
                  </li>
                  <li>Personal travel insurance & medical coverage</li>
                  <li>Tipping for tour guides and drivers</li>
                  <li>Additional dining, beverages, or laundry expenses</li>
                  <li>Optional sightseeing tours or entry tickets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const coaches = [
  {
    id: 1,
    slug: "kota-kinabalu",
    name: "3D 2N Kota Kinabalu, Sabah",
    location: "KKIA - Kota Kinabalu - KKIA",
    description:
      "Explore the vibrant city of Kota Kinabalu with visits to local markets, islands, and Mount Kinabalu views.",
    image:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 2,
    slug: "genting-highlands",
    name: "3D 2N Kuala Lumpur + Genting",
    location: "KLIA - City - Genting - KLIA",
    description:
      "Experience the best of KL city tours and the cool highlands of Genting with casino and theme parks.",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 3,
    slug: "penang",
    name: "4D 3N Kuala Lumpur + Penang",
    location: "KLIA - Kul City - Genting - Penang - KLIA",
    description:
      "Discover the heritage of Georgetown, delicious Penang food, and iconic KL landmarks in one trip.",
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 4,
    slug: "melaka",
    name: "3D 2N Kuala Lumpur + Melaka",
    location: "KLIA - Kuala Lumpur - Melaka - KLIA",
    description:
      "Visit the historic UNESCO World Heritage site of Melaka with its Dutch and Portuguese influences.",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 5,
    slug: "kuantan",
    name: "2D 1N Bukit Gambang, Kuantan",
    location: "Kuantan - Bukit Gambang Resort",
    description:
      "Family fun at Bukit Gambang Resort City with water park, safari, and adventure activities.",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 6,
    slug: "pahang",
    name: "Cameron Highland 3D2N",
    location: "KL - Cameron Highlands - KL",
    description:
      "Escape to the cool climate of Cameron Highlands with tea plantations and strawberry farms.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 7,
    slug: "langkawi",
    name: "6D 5N Kuala Lumpur + Langkawi + Penang",
    location: "KLIA - KL - Langkawi - Penang - KLIA",
    description:
      "Ultimate Malaysia experience covering KL, island paradise Langkawi, and heritage Penang.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 8,
    slug: "genting-highlands",
    name: "5D 4N Kuala Lumpur + Genting + Langkawi",
    location: "KLIA - KL - Genting - Langkawi - KLIA",
    description:
      "Combine city excitement, highland cool, and island relaxation in one amazing trip.",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 9,
    slug: "langkawi",
    name: "5D 4N Kuala Lumpur + Langkawi",
    location: "KLIA - Kuala Lumpur - Langkawi - KLIA",
    description:
      "Perfect blend of city sightseeing and beach relaxation on duty-free Langkawi island.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 10,
    slug: "kuantan",
    name: "Sarang By The Brooke 2D1N",
    location: "Kuantan - Sungai Lembing",
    description:
      "Unique stay experience from RM 99 per person/night at the charming Sarang By The Brooke.",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 11,
    slug: "johor",
    name: "Tioman Island 3D2N Full Board",
    location: "Tanjung Gemok Jetty - Tioman Island",
    description:
      "Island paradise with crystal clear waters, snorkeling, and marine life from RM 505 per person.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 12,
    slug: "johor",
    name: "Tioman Island Honeymoon 3D2N",
    location: "Tioman Island - Beach Resort",
    description:
      "Romantic getaway with sunset views and private beach experiences from RM 539 per person.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 13,
    slug: "gua-mulu",
    name: "3D 2N Kuching, Sarawak",
    location: "Kuching Airport - City - Daytrips",
    description:
      "Explore the charming city of Kuching with orangutan sanctuary and Sarawak cultural village.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 14,
    slug: "gua-mulu",
    name: "3D2N Mulu Caves, Sarawak",
    location: "Miri - Mulu National Park",
    description:
      "UNESCO World Heritage adventure exploring spectacular cave systems and rainforest.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 15,
    slug: "kota-kinabalu",
    name: "3D 2N Mount Kinabalu, Sabah",
    location: "Kota Kinabalu - Mount Kinabalu",
    description:
      "Conquer Southeast Asia's highest peak with guided climbing and nature exploration.",
    image:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 16,
    slug: "kuantan",
    name: "3D 2N Cherating Beach Resort",
    location: "Kuantan - Cherating Beach",
    description:
      "Relax at pristine Cherating beach with turtle sanctuary visits and water sports.",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=540&q=80",
  },
  {
    id: 17,
    name: "Fun & Adventure Discovery Port Dickson",
    location: "KL - Port Dickson Beach",
    description:
      "Beach adventure with water sports, seafood, and Army Museum exploration.",
    image:
      "https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=540&h=350&dpr=1",
  },
  {
    id: 18,
    name: "Fullday Genting Tour (SIC)",
    location: "KL - Genting Highlands - KL",
    description:
      "Seat-in-coach day trip to Genting Highlands with flexible free time at the resort.",
    image:
      "https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg?auto=compress&cs=tinysrgb&w=540&h=350&dpr=1",
  },
  {
    id: 19,
    name: "Time Capsule Stay Sungai Lembing",
    location: "Kuantan - Sungai Lembing",
    description:
      "Unique time capsule accommodation from RM 320 for 2 persons with nature immersion.",
    image:
      "https://images.pexels.com/photos/2440061/pexels-photo-2440061.jpeg?auto=compress&cs=tinysrgb&w=540&h=350&dpr=1",
  },
  {
    id: 20,
    name: "3D 2N Kuala Lumpur",
    location: "KLIA - Kuala Lumpur City - KLIA",
    description:
      "Classic KL tour with Petronas Towers, Batu Caves, and vibrant street markets.",
    image:
      "https://images.pexels.com/photos/22804/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=540&h=350&dpr=1",
  },
];

export default function CoachesSection() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start animation when section enters viewport
      // Progress from 0 to 1 as section scrolls into view
      const sectionTop = rect.top;
      const triggerPoint = windowHeight * 0.8; // Start when 20% of section is visible

      if (sectionTop < triggerPoint) {
        const scrolled = triggerPoint - sectionTop;
        const maxScroll = windowHeight * 0.6;
        const progress = Math.min(1, scrolled / maxScroll);
        setScrollProgress(progress);

        if (!titleVisible && progress > 0) {
          setTitleVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, [titleVisible]);

  // Calculate image scale for each coach: starts at 1.3 (zoomed in) and scales to 1 (normal)
  const getImageScale = (index) => {
    // Stagger the animation for each coach
    const delay = index * 0.15;
    const adjustedProgress = Math.max(
      0,
      Math.min(1, (scrollProgress - delay) / (1 - delay)),
    );
    return 1.3 - adjustedProgress * 0.3; // 1.3 -> 1
  };

  return (
    <section
      className="section background-color-white"
      ref={sectionRef}
      id="intro"
    >
      <div className="container-large">
        <div className="margin-bottom-48">
          <div className="wrap_flex is-align-bottom">
            <div className="max-width-440">
              <h2 className="heading-style-h2">
                <span
                  className="is-word is-1"
                  style={{
                    opacity: titleVisible ? 1 : 0,
                    transform: titleVisible
                      ? "translateY(0)"
                      : "translateY(0.5em)",
                    transition:
                      "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
                    display: "inline-block",
                  }}
                >
                  Malaysian
                </span>{" "}
                <span
                  className="is-word is-2"
                  style={{
                    opacity: titleVisible ? 1 : 0,
                    transform: titleVisible
                      ? "translateY(0)"
                      : "translateY(0.5em)",
                    transition:
                      "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
                    display: "inline-block",
                  }}
                >
                  Tours
                </span>{" "}
                {/* <span
                                    className="is-word is-3"
                                    style={{
                                        opacity: titleVisible ? 1 : 0,
                                        transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                        transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
                                        display: 'inline-block'
                                    }}
                                >
                                    Coaches
                                </span>{' '}
                                <span
                                    className="is-word is-5"
                                    style={{
                                        opacity: titleVisible ? 1 : 0,
                                        transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                        transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
                                        display: 'inline-block'
                                    }}
                                >
                                    Behind
                                </span>{' '}
                                <span
                                    className="is-word is-6"
                                    style={{
                                        opacity: titleVisible ? 1 : 0,
                                        transform: titleVisible ? 'translateY(0)' : 'translateY(0.5em)',
                                        transition: 'opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s',
                                        display: 'inline-block'
                                    }}
                                >
                                    Elysian
                                </span> */}
              </h2>
            </div>
            <Link
              href="#"
              className="button"
              style={{
                opacity: titleVisible ? 1 : 0,
                transform: titleVisible ? "translateY(0)" : "translateY(0.5em)",
                transition: "opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s",
              }}
            >
              <div className="z-index-2">
                <p>Explore Tours</p>
              </div>
              <div className="z-index-2">
                <Image
                  src="/icons/icon-arrow-light.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                  className="icon-16"
                />
              </div>
            </Link>
          </div>
        </div>
        <ul className={`player_list ${!isExpanded ? "is-collapsed" : ""}`}>
          {coaches.map((coach, index) => {
            const imageScale = getImageScale(index);
            return (
              <li key={coach.id} className="player_item">
                <div className="margin-bottom-40">
                  <div
                    className="player_visual shadow-card"
                    style={{ overflow: "hidden" }}
                  >
                    <Image
                      src={coach.image}
                      alt={coach.name}
                      fill
                      className="img-cover"
                      sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 40vw"
                      style={{
                        transform: `scale(${imageScale})`,
                        transition:
                          "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      }}
                    />
                  </div>
                </div>
                <div className="max-width-440">
                  <div className="w-layout-vflex">
                    <div className="margin-bottom-16">
                      <p className="text-size-eyebrow">{coach.location}</p>
                    </div>
                    <div className="margin-bottom-24">
                      <p className="heading-style-h2">{coach.name}</p>
                    </div>
                    <div className="margin-bottom-24">
                      <p className="text-size-medium">{coach.description}</p>
                    </div>
                    <Link
                      href={`/tours/${coach.slug || coach.id}`}
                      className="button is-secondary"
                    >
                      <p>View Itinerary</p>
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex-center margin-top-32">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="button is-secondary"
            style={{ cursor: "pointer" }}
          >
            <p>{isExpanded ? "Show Less" : "Show More"}</p>
            <Image
              src="/icons/icon-arrow-light.svg"
              alt="Arrow"
              width={16}
              height={16}
              className="icon-16"
              style={{
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { tours } from "@/data/tours";

export default function LocationsSection() {
  const parallaxRef = useRef(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const rect = parallaxRef.current.getBoundingClientRect();
        const scrollPosition = window.scrollY;
        const sectionTop = rect.top + scrollPosition;
        const relativeScroll = scrollPosition - sectionTop + window.innerHeight;

        if (relativeScroll > 0) {
          const speed = 0.2;
          setParallaxY(relativeScroll * speed);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="section is-location" ref={parallaxRef}>
      <div className="parallax-wrap">
        <Image
          src="https://images.pexels.com/photos/7891927/pexels-photo-7891927.jpeg"
          alt="Dessert Landscape"
          fill
          style={{
            objectFit: "cover",
            transform: `translateY(${-parallaxY}px)`,
          }}
          priority
        />
        <div className="parallax-overlay"></div>
      </div>
      <div className="container-large">
        <div className="locations_wrap">
          <div className="max-width-700">
            <h2 className="heading-style-h2 margin-bottom-24">World Tours</h2>
            <p className="text-size-large opacity-60 max-width-440 margin-bottom-24">
              Discover breathtaking destinations around the globe with our
              carefully curated world tour packages. From ancient temples to
              modern cities, we offer unforgettable travel experiences tailored
              to your preferences.
            </p>
            <div className="margin-top-32">
              <Link href="/contact" className="button">
                <p>View All</p>
                <Image
                  src="https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/670563f226883663736a6d20_icon-arrow-light.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                  className="icon-16"
                />
              </Link>
            </div>
          </div>
          <ul className="locations_list">
            {tours
              .filter((t) => t.featured)
              .map((location) => (
                <li key={location.id} className="locations_item">
                  <Link
                    href={`/tours/${location.slug}`}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <div className="margin-bottom-20">
                      <div className="locations_visual">
                        <Image
                          src={location.image}
                          alt={location.name}
                          fill
                          className="img-cover"
                          sizes="(max-width: 767px) 81vw, (max-width: 991px) 44vw, 20vw"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="margin-bottom-8">
                        <p className="heading-style-h4">{location.name}</p>
                      </div>
                      <div className="text-color-lightgrey">
                        <p className="text-size-eyebrow">{location.duration}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

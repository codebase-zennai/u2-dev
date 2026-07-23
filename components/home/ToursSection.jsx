"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { tours } from "@/data/tours";
import TourCard from "./TourCard";

export default function ToursSection() {
  const sectionRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("malaysian"); // malaysian, world

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.85) {
        setTitleVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter tours by the active tab category
  const filteredTours = tours.filter((t) => t.category === activeCategory);

  return (
    <section
      className="section background-color-white"
      ref={sectionRef}
      id="tours-slider"
    >
      {/* Scoped CSS for Horizontal Scroll Row and Card layouts */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .tours_list {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          gap: 2rem !important;
          overflow-x: auto !important;
          scroll-snap-type: x mandatory !important;
          padding-bottom: 2rem !important;
          padding-left: 0 !important;
          margin-bottom: 0 !important;
          list-style-type: none !important;
          -webkit-overflow-scrolling: touch;
        }
        /* Custom styled scrollbar */
        .tours_list::-webkit-scrollbar {
          height: 6px !important;
        }
        .tours_list::-webkit-scrollbar-track {
          background: #f8fafc !important;
          border-radius: 10px !important;
        }
        .tours_list::-webkit-scrollbar-thumb {
          background: #cbd5e1 !important;
          border-radius: 10px !important;
        }
        .tours_list::-webkit-scrollbar-thumb:hover {
          background: #94a3b8 !important;
        }
        .tours_item {
          flex: 0 0 340px !important;
          max-width: 340px !important;
          scroll-snap-align: start !important;
          display: flex !important;
          flex-direction: column !important;
          height: auto !important;
          background-color: var(--white) !important;
          border: 1px solid rgba(8, 8, 8, 0.08) !important;
          border-radius: 2.2rem !important;
          padding: 1.25rem !important;
          transition: transform 0.4s ease, box-shadow 0.4s ease !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02) !important;
        }
        @media (max-width: 480px) {
          .tours_item {
            flex: 0 0 285px !important;
            max-width: 285px !important;
          }
        }
        .tours_item:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06) !important;
        }
        .tours_item .heading-style-h2 {
          font-size: 1.5rem !important;
          line-height: 1.2 !important;
          letter-spacing: -0.01em !important;
          color: var(--black) !important;
          margin-top: 0.5rem !important;
        }
        .tours_visual {
          aspect-ratio: 1.25 !important;
          border-radius: 1.6rem !important;
          width: 100% !important;
          position: relative !important;
          overflow: hidden !important;
        }
        /* Premium CSS Hover Zoom */
        .tours_item .img-cover {
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
        .tours_item:hover .img-cover {
          transform: scale(1.08) !important;
        }
      `,
        }}
      />

      <div className="container-large">
        {/* Title and Top Navigation Header */}
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
                  Featured
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
                </span>
              </h2>
            </div>

            {/* View All Button */}
            <Link
              href="/tours"
              className="button"
              style={{
                opacity: titleVisible ? 1 : 0,
                transform: titleVisible ? "translateY(0)" : "translateY(0.5em)",
                transition: "opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s",
              }}
            >
              <div className="z-index-2">
                <p>View All Tours</p>
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

        {/* Tab Buttons (Malaysian / World) */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveCategory("malaysian")}
            className={`px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer border-none ${
              activeCategory === "malaysian"
                ? "bg-[#013b85] text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Malaysian Tours
          </button>
          <button
            onClick={() => setActiveCategory("world")}
            className={`px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer border-none ${
              activeCategory === "world"
                ? "bg-[#013b85] text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            World Tours
          </button>
        </div>

        {/* Horizontal Scroll Row list */}
        <ul className="tours_list">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} imageScale={1} />
          ))}
        </ul>
      </div>
    </section>
  );
}

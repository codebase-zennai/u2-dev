"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { unifiedTransportation, airportTransfers, tourTransfers } from "@/data/transportation";

export default function TransportationSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [transferVisible, setTransferVisible] = useState(false);
  const [tourVisible, setTourVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Intersection observers for logged-out scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.target.classList.contains("is-transfer-sec") &&
            entry.isIntersecting
          ) {
            setTransferVisible(true);
          }
          if (
            entry.target.classList.contains("is-tour-sec") &&
            entry.isIntersecting
          ) {
            setTourVisible(true);
          }
        });
      },
      { threshold: 0.15 },
    );

    const transferSec = document.querySelector(".is-transfer-sec");
    const tourSec = document.querySelector(".is-tour-sec");

    if (transferSec) observer.observe(transferSec);
    if (tourSec) observer.observe(tourSec);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="tp-hero">
        <div className="tp-hero_bg">
          <Image
            src="https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Malaysia highway aerial view"
            fill
            className="img-cover"
            sizes="100vw"
            priority
          />
          <div className="tp-hero_overlay"></div>
        </div>
        <div className="container-large tp-hero_content">
          <p
            className="text-size-eyebrow tp-hero_eyebrow"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(1em)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            Getting You There
          </p>
          <h1
            className="tp-hero_title"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(0.3em)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            Transportation
            <br />
            &amp; Transfers
          </h1>
          <p
            className="tp-hero_desc"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(1em)",
              transition: "opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s",
            }}
          >
            Reliable and comfortable transportation services across Malaysia.
            From airport transfers to guided city tours.
          </p>
        </div>
      </section>

      {/* Airport Transfers - Table Style */}
      <section className="section background-color-black is-transfer-sec">
        <div className="container-large">
          <div className="tp-section-header">
            <div>
              <p
                className="text-size-eyebrow margin-bottom-20"
                style={{ color: "var(--green)" }}
              >
                Airport &amp; City
              </p>
              <h2 className="heading-style-h2">Transfer Rates</h2>
            </div>
            <p
              className="text-size-medium text-color-lightgrey"
              style={{ maxWidth: "24rem" }}
            >
              Hassle-free private transfers between airports, hotels, and
              popular destinations across Malaysia.
            </p>
          </div>

          <div className="tp-transfer-table">
            <div className="tp-transfer-table_header">
              <span>Route</span>
              <span>Details</span>
              <span>Rate</span>
            </div>
            {airportTransfers.map((transfer, index) => (
              <div
                key={transfer.id}
                className="tp-transfer-table_row"
                style={{
                  opacity: transferVisible ? 1 : 0,
                  transform: transferVisible
                    ? "translateY(0)"
                    : "translateY(1.5em)",
                  transition: `opacity 0.5s ease ${0.1 + index * 0.08}s, transform 0.5s ease ${0.1 + index * 0.08}s`,
                }}
              >
                <div className="tp-transfer-table_route">
                  <div className="tp-route-dot"></div>
                  <h3 className="heading-style-h5">{transfer.route}</h3>
                </div>
                <p className="text-size-medium text-color-lightgrey tp-transfer-table_desc">
                  {transfer.description}
                </p>
                <div className="tp-transfer-table_price">
                  USD {transfer.price}
                  <span className="text-size-small text-color-lightgrey" style={{ opacity: 0.6, marginLeft: "4px" }}>
                    (~RM{Math.round(transfer.price * 4.4)})
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="tp-transfer-note">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Note Icon</title>
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 16v-4M12 8h.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-size-small text-color-lightgrey">
              All rates are per vehicle (up to 4 pax). Prices may vary during
              peak seasons. <br />
              <strong className="text-white">Notice:</strong> Prices are shown in USD for international travellers. Local MYR pricing is available upon request.
            </p>
          </div>
        </div>
      </section>

      {/* Tour Transfers - Card Grid */}
      <section className="section is-tour-sec">
        <div className="container-large">
          <div className="tp-section-header">
            <div>
              <p
                className="text-size-eyebrow margin-bottom-20"
                style={{ color: "var(--dark-grey)" }}
              >
                Guided Tours
              </p>
              <h2 className="heading-style-h2">Sightseeing Tours</h2>
            </div>
            <p
              className="text-size-medium"
              style={{ maxWidth: "24rem", opacity: 0.6 }}
            >
              Explore Malaysia with our professional drivers. All tours include
              hotel pick-up and drop-off.
            </p>
          </div>

          <div className="tp-tour-grid">
            {tourTransfers.map((transfer, index) => (
              <div
                key={transfer.id}
                className="tp-tour-card"
                style={{
                  opacity: tourVisible ? 1 : 0,
                  transform: tourVisible ? "translateY(0)" : "translateY(2em)",
                  transition: `opacity 0.6s ease ${0.1 + index * 0.1}s, transform 0.6s ease ${0.1 + index * 0.1}s`,
                }}
              >
                <div className="tp-tour-card_img">
                  <Image
                    src={transfer.image}
                    alt={transfer.route}
                    fill
                    className="img-cover"
                    sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
                  />
                  <div className="tp-tour-card_badge">{transfer.duration}</div>
                </div>
                <div className="tp-tour-card_body">
                  <h3 className="heading-style-h4 margin-bottom-8">
                    {transfer.route}
                  </h3>
                  <p
                    className="text-size-medium"
                    style={{ opacity: 0.6, marginBottom: "1.25rem" }}
                  >
                    {transfer.description}
                  </p>
                  <div className="tp-tour-card_footer">
                    <span className="tp-tour-card_price">
                      USD {transfer.price}
                      <span className="text-size-small" style={{ opacity: 0.6, marginLeft: "4px", fontWeight: "normal" }}>
                        (~RM{Math.round(transfer.price * 4.4)})
                      </span>
                    </span>
                    <span className="text-size-small" style={{ opacity: 0.4 }}>
                      per vehicle
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-center" style={{ marginTop: "3.5rem" }}>
            <Link
              href="/contact"
              className="bg-[#013b85] hover:bg-[#7ff74b] !text-white hover:!text-black font-extrabold text-[12px] uppercase tracking-widest py-3.5 px-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 !no-underline flex items-center justify-center gap-2"
            >
              <span>Book a Transfer</span>
              <Image
                src="/icons/icon-arrow-light.svg"
                alt="Arrow"
                width={16}
                height={16}
                className="icon-16 brightness-0 invert group-hover:brightness-100 group-hover:invert-0"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

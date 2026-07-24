"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Compass, Award, Sparkles } from "lucide-react";

export default function AboutUsSection() {
  return (
    <section className="section is-location">
      <div className="parallax-wrap" style={{ overflow: "hidden" }}>
        <Image
          src="https://images.pexels.com/photos/36949767/pexels-photo-36949767.jpeg"
          alt="Batu Caves"
          fill
          style={{
            objectFit: "cover",
          }}
          priority
        />
        <div className="parallax-overlay"></div>
      </div>

      {/* Scoped styles for 2x2 grid and card formatting */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .locations_wrap {
          display: flex !important;
          flex-direction: column !important;
          gap: 3rem !important;
          align-items: stretch !important;
        }
        @media (min-width: 992px) {
          .locations_wrap {
            flex-direction: row !important;
            align-items: center !important;
            gap: 4.75rem !important;
          }
        }
        .about_left {
          flex: 1 !important;
          max-width: 100% !important;
        }
        @media (min-width: 992px) {
          .about_left {
            max-width: 440px !important;
          }
        }
        .about_grid {
          flex: 1.5 !important;
          display: grid !important;
          grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
          gap: 1.5rem !important;
        }
        @media (min-width: 640px) {
          .about_grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        .about_card {
          background: rgba(255, 255, 255, 0.04) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 2rem !important;
          padding: 2.25rem 2rem !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          text-align: left !important;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
        .about_card:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(127, 247, 75, 0.35) !important; /* Secondary Green accent */
          transform: translateY(-5px) !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2) !important;
        }
      `,
        }}
      />

      <div className="container-large">
        <div className="locations_wrap">
          {/* Left Column: Heading and Description */}
          <div className="about_left flex flex-col items-start pr-0 md:pr-4">
            <p className="text-size-eyebrow text-color-lightgrey margin-bottom-12">
              About Us
            </p>
            <h2 className="heading-style-h2 margin-bottom-24 text-white">
              Why Travel With Us?
            </h2>
            <p className="text-size-large text-white/70 margin-bottom-32 leading-relaxed">
              We are committed to crafting exceptional, hassle-free travel
              experiences designed around your needs. Discover why thousands of
              travelers trust us with their dream holidays.
            </p>
            <Link href="/contact" className="button">
              <p>Contact Us</p>
              <Image
                src="https://cdn.prod.website-files.com/67041c2a6a806901e0c7ed1b/670563f226883663736a6d20_icon-arrow-light.svg"
                alt="Arrow"
                width={16}
                height={16}
                className="icon-16"
              />
            </Link>
          </div>

          {/* Right Column: 2x2 Grid of Cards */}
          <div className="about_grid">
            {/* Card 1 */}
            <div className="about_card group">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-5 group-hover:bg-[#7ff74b]/15 group-hover:border-[#7ff74b]/40 transition-all duration-300">
                <ShieldCheck className="h-5.5 w-5.5 text-[#7ff74b]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                18+ Years Trusted
              </h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                Since 2008, thousands of unforgettable journeys crafted with
                care.
              </p>
            </div>

            {/* Card 2 */}
            <div className="about_card group">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-5 group-hover:bg-[#7ff74b]/15 group-hover:border-[#7ff74b]/40 transition-all duration-300">
                <Compass className="h-5.5 w-5.5 text-[#7ff74b]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Tailor-Made</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                Every itinerary shaped to your pace, preference, and budget.
              </p>
            </div>

            {/* Card 3 */}
            <div className="about_card group">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-5 group-hover:bg-[#7ff74b]/15 group-hover:border-[#7ff74b]/40 transition-all duration-300">
                <Award className="h-5.5 w-5.5 text-[#7ff74b]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Official Recognition
              </h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                Proudly affiliated with the Ministry of Tourism Malaysia, PATA,
                MATTA, MITA, and other trusted tourism organizations.
              </p>
            </div>

            {/* Card 4 */}
            <div className="about_card group">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-5 group-hover:bg-[#7ff74b]/15 group-hover:border-[#7ff74b]/40 transition-all duration-300">
                <Sparkles className="h-5.5 w-5.5 text-[#7ff74b]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Hassle-Free</h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                Flights, hotels, transfers — handled end-to-end by our team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

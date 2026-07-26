"use client";

import { Sparkle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Default values — shown immediately on load and used as fallback
const DEFAULTS = {
  hero_badge: "18+ Years of Curated Journeys",
  hero_subtitle:
    "Handcrafted Malaysian experiences and world tours designed to be affordable, effortless, and unforgettable.",
  hero_cta_primary: "View All Tours",
  hero_cta_secondary: "Contact Us",
};

export default function HeroSection2() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [settings, setSettings] = useState(DEFAULTS);

  useEffect(() => {
    setLoaded(true);

    // Fetch site settings from Supabase (graceful fallback)
    async function fetchSettings() {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value");

        if (!error && data && data.length > 0) {
          const map = {};
          data.forEach((row) => {
            map[row.key] = row.value;
          });
          // Merge fetched settings with defaults (keeps defaults for any missing keys)
          setSettings((prev) => ({ ...prev, ...map }));
        }
      } catch {
        // Keep defaults silently
      }
    }

    fetchSettings();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden pt-28 pb-16 md:pt-36">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/hero2_bg.png"
          alt="Twilight journeys background"
          fill
          priority
          quality={100}
          className="object-cover object-center scale-105 animate-[subtle-zoom_20s_ease-out_infinite]"
        />
        {/* Deep, moody gradients for text readability and aesthetic contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/30 to-[#080808]/75 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-transparent z-10" />
      </div>

      {/* Hero Content */}
      <div className="container-large relative z-20 w-full px-4 md:px-8">
        <div
          className="max-width-800 text-left flex flex-col items-start"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease-out, transform 1s ease-out",
          }}
        >
          {/* Curated Journeys Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5 backdrop-blur-md rounded-full mb-8 hover:bg-white/10 hover:border-white/35 transition-all duration-300">
            <Sparkle className="h-4 w-4 text-[#dfa447] animate-pulse" />
            <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.25em] text-white/90">
              {settings.hero_badge}
            </span>
          </div>

          {/* Large Serif Title with Cursive Accent — design is preserved */}
          <p
            className="text-white font-normal text-3xl md:text-6xl leading-[1.1] mb-6 tracking-tight select-none"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              textTransform: "none",
              letterSpacing: "-0.01em",
            }}
          >
            Going Beyond{" "}
            <span
              className="text-[#dfa447] px-2 italic font-normal inline-block relative"
              style={{
                fontFamily: "var(--font-caveat), cursive",
                textTransform: "none",
                transform: "rotate(-2deg)",
              }}
            >
              Borders
            </span>{" "}
            <br />
            Building Partnerships
          </p>

          {/* Subtitle Description */}
          <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed font-light tracking-wide mb-10">
            {settings.hero_subtitle}
          </p>

          {/* Call-to-action buttons */}
          <div className="flex mt-10 flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/tours")}
              className="group relative inline-flex items-center px-6 py-3 rounded-full overflow-hidden bg-white/90 text-[#013b85] font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-none cursor-pointer"
            >
              <span className="relative flex items-center gap-2">
                {settings.hero_cta_primary}
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <title>Arrow right</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>

            <button
              type="button"
              onClick={() => router.push("/contact")}
              className="inline-flex items-center px-6 py-3 rounded-full bg-transparent border-2 border-white text-white font-bold text-base md:text-lg hover:bg-white hover:text-[#013b85] transition-all duration-300 cursor-pointer"
            >
              {settings.hero_cta_secondary}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes subtle-zoom {
          0% {
            transform: scale(1.02);
          }
          50% {
            transform: scale(1.08);
          }
          100% {
            transform: scale(1.02);
          }
        }
      `}</style>
    </section>
  );
}

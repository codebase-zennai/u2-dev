"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

export default function BottomCTASection() {
  return (
    <section className="section is-bottom-cta relative py-12 sm:py-16 md:py-20 bg-slate-50/80">
      <div className="container-large max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bottom-cta_wrap flex flex-col items-center text-center space-y-6 sm:space-y-8">
          
          {/* Header Section */}
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#013b85]/10 text-[#013b85] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#013b85]" />
              Start Your Journey
            </span>
            <h2 className="heading-style-h1 text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#013b85] tracking-tight leading-tight">
              Ready to <span className="text-[#013b85] underline decoration-[#7ff74b] decoration-4">Travel?</span>
            </h2>
            <p className="text-slate-600 pt-10 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
              Book your custom tour package, airport transfer, or corporate travel with U2 Travels &amp; Tours today.
            </p>
          </div>

          {/* Clean White Poster Card - 100% visible, natural aspect ratio, NO black bars */}
          <div className="w-full max-w-4xl mx-auto bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-2 sm:p-3 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="w-full relative overflow-hidden rounded-xl md:rounded-2xl">
              <img
                src="/images/backgrounds/bg-cta-3.png"
                alt="U2 Travels Special Promotional Tour Package Poster"
                className="w-full h-auto block rounded-xl md:rounded-2xl"
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex items-center justify-center pt-2 w-full max-w-xs mx-auto">
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-[#7ff74b] hover:bg-[#6ee23d] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer !no-underline"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

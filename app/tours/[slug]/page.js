import { tours } from "@/data/tours";
import { Bed, Calendar, Car, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";



export default async function TourItineraryPage({ params }) {
  const { slug } = await params;
  const tour = tours.find(t => t.slug === slug);

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

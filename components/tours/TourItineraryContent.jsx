"use client";

import {
  Bed,
  Calendar,
  Car,
  Check,
  MapPin,
  MessageSquare,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/layout/Footer";
import Header2 from "@/components/layout/Header2";

export default function TourItineraryContent({ tour }) {
  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Form Input States
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingPax, setBookingPax] = useState("2");
  const [bookingPick, setBookingPick] = useState("");
  const [bookingDrop, setBookingDrop] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");

  const getTourImage = (img) => {
    if (!img) return "/images/locations/locations-1.jpg";
    if (
      img.startsWith("/images/") ||
      img.startsWith("http://") ||
      img.startsWith("https://")
    )
      return img;
    return "/images/locations/locations-1.jpg";
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "601111666872"; // WhatsApp support number

    let formattedDate = "Not specified";
    if (bookingDate) {
      const parts = bookingDate.split("-");
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      formattedDate = d.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

    const message = `*U2 Travels & Tours - Tour Booking Request*
----------------------------------------
🏖️ *Tour Package:* ${tour.name}
📍 *Location:* ${tour.destination}
⏱️ *Duration:* ${tour.duration}
💵 *Price From:* MYR ${tour.price}
----------------------------------------
👤 *Customer Name:* ${bookingName}
📱 *Phone Number:* ${bookingPhone}
📅 *Travel Date:* ${formattedDate} (${bookingDate || "Flexible"})
👥 *Pax Size:* ${bookingPax} Pax
🛫 *Pick-up Address / Hotel:* ${bookingPick || "Not specified"}
🛬 *Drop-off Address:* ${bookingDrop || "Not specified"}
📝 *Special Requests / Notes:* ${bookingNotes || "None"}

Please confirm availability and booking. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    setSuccessMessage(
      "Your booking request has been formatted! Redirecting to WhatsApp...",
    );

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setSuccessMessage("");
      setBookingModalOpen(false);
      setBookingName("");
      setBookingPhone("");
      setBookingNotes("");
      setBookingPick("");
      setBookingDrop("");
    }, 1800);
  };

  return (
    <>
      <Header2 isSolid={true} />
      <main className="main-wrapper bg-slate-50 pt-24 pb-16">
        <div className="container-large mt-10 px-4 md:px-8">
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
                src={getTourImage(tour.image)}
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
                <p className="text-slate-600 text-base leading-relaxed mb-6 font-light">
                  {tour.description}
                </p>
              </div>

              {/* Booking Block */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                    Price From
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#013b85]">
                    MYR {tour.price}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="bg-[#013b85] hover:bg-[#7ff74b] text-white hover:text-black font-extrabold text-xs uppercase tracking-widest py-4 px-6 sm:px-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-none cursor-pointer"
                >
                  Book This Tour
                </button>
              </div>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="bg-[#013b85]/10 p-3 rounded-xl shrink-0">
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
              <div className="bg-[#013b85]/10 p-3 rounded-xl shrink-0">
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
              <div className="bg-[#013b85]/10 p-3 rounded-xl shrink-0">
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
              <div className="bg-[#013b85]/10 p-3 rounded-xl shrink-0">
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
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed font-light">
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
                  <li>Personal travel insurance &amp; medical coverage</li>
                  <li>Tipping for tour guides and drivers</li>
                  <li>Additional dining, beverages, or laundry expenses</li>
                  <li>Optional sightseeing tours or entry tickets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[99999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-fade-in border border-slate-100">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] uppercase font-black text-[#7ff74b] tracking-wider bg-[#013b85] px-2.5 py-0.5 rounded-full">
                  Tour Reservation Request
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#013b85] mt-1.5 uppercase tracking-wide">
                  {tour.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setBookingModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors border-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content / Form */}
            <div className="p-6 overflow-y-auto flex-grow">
              {successMessage ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-5 rounded-2xl flex items-center gap-3 text-sm font-bold">
                  <Check className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="tour-booking-name"
                        className="text-xs font-bold text-slate-600 block mb-1"
                      >
                        Your Full Name *
                      </label>
                      <input
                        id="tour-booking-name"
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#013b85] outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="tour-booking-phone"
                        className="text-xs font-bold text-slate-600 block mb-1"
                      >
                        WhatsApp Phone *
                      </label>
                      <input
                        id="tour-booking-phone"
                        type="tel"
                        required
                        placeholder="e.g. +60123456789"
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#013b85] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="tour-booking-date"
                        className="text-xs font-bold text-slate-600 block mb-1"
                      >
                        Travel Date
                      </label>
                      <input
                        id="tour-booking-date"
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#013b85] outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="tour-booking-pax"
                        className="text-xs font-bold text-slate-600 block mb-1"
                      >
                        Passenger Count (Pax)
                      </label>
                      <select
                        id="tour-booking-pax"
                        value={bookingPax}
                        onChange={(e) => setBookingPax(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#013b85] outline-none font-medium"
                      >
                        <option value="1">1 Pax</option>
                        <option value="2">2-3 Pax</option>
                        <option value="4">4-7 Pax</option>
                        <option value="8">8-12 Pax</option>
                        <option value="13">13+ Pax (Group Tour)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="tour-booking-pick"
                        className="text-xs font-bold text-slate-600 block mb-1"
                      >
                        Pick-up Address / Hotel
                      </label>
                      <input
                        id="tour-booking-pick"
                        type="text"
                        placeholder="e.g. Shangri-La KL / Airport"
                        value={bookingPick}
                        onChange={(e) => setBookingPick(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#013b85] outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="tour-booking-drop"
                        className="text-xs font-bold text-slate-600 block mb-1"
                      >
                        Drop-off Address
                      </label>
                      <input
                        id="tour-booking-drop"
                        type="text"
                        placeholder="e.g. Hotel / Airport Terminal"
                        value={bookingDrop}
                        onChange={(e) => setBookingDrop(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#013b85] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="tour-booking-notes"
                      className="text-xs font-bold text-slate-600 block mb-1"
                    >
                      Special Notes / Requests
                    </label>
                    <textarea
                      id="tour-booking-notes"
                      rows="2"
                      placeholder="e.g. Vegetarian meals, room preferences, flight number"
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#013b85] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#d82c34] hover:bg-[#b02228] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-3 border-none"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Confirm &amp; Message on WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

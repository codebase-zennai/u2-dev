"use client";

import { Quote, Star, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Aishah Ahmad",
    location: "Kuala Lumpur, Malaysia",
    trip: "3D2N Kota Kinabalu Family Tour",
    quote: "Our trip to Kota Kinabalu was absolutely seamless. From the flight bookings to hotel transfers and guided tours, everything was taken care of. U2 Travels really makes traveling hassle-free for families!",
    avatarBg: "bg-teal-500",
    initials: "AA",
  },
  {
    id: 2,
    name: "Daniel Cooper",
    location: "Sydney, Australia",
    trip: "10D9N Grand European Classics",
    quote: "The Grand European Classics was worth every single dollar. Superb hotels, a premium tour coach, and an exceptionally knowledgeable tour guide. We will definitely book our next Asia tour with them!",
    avatarBg: "bg-blue-600",
    initials: "DC",
  },
  {
    id: 3,
    name: "Tan Wei Ming",
    location: "Penang, Malaysia",
    trip: "Customized Tioman Island Honeymoon",
    quote: "Amazing service from start to finish. They adapted the itinerary, hotels, and transfers to fit our exact pacing and budget. The private beach dinners they arranged made it truly unforgettable.",
    avatarBg: "bg-amber-500",
    initials: "TW",
  }
];

export default function TestimonialsSection() {
  return (
    <section className="section background-color-white border-b border-slate-100">
      <div className="container-large">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <p className="text-size-eyebrow text-[#013b85] uppercase tracking-[0.2em] font-bold mb-3">
            Guest Testimonials
          </p>
          <h2 className="heading-style-h2 margin-bottom-16">
            What Our Guests Say
          </h2>
          <p className="text-slate-500 font-light text-base md:text-lg max-w-lg leading-relaxed">
            Real travel stories and reviews from verified customers who went beyond borders with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div 
              key={item.id}
              className="bg-white border border-slate-100 rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Quote Icon watermark */}
              <Quote className="absolute right-8 top-8 h-10 w-10 text-slate-100 group-hover:text-slate-200 transition-colors" />

              <div>
                {/* Star Ratings */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-[#dfa447] text-[#dfa447]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed mb-8 italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                {/* Avatar Icon */}
                <div className={`w-12 h-12 rounded-full ${item.avatarBg} text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0`}>
                  {item.initials}
                </div>
                
                <div className="flex flex-col text-left min-w-0">
                  <span className="font-bold text-slate-800 text-sm md:text-base leading-tight truncate">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-[#013b85] font-semibold leading-normal truncate mt-0.5">
                    {item.trip}
                  </span>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    <span>Verified Booking</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

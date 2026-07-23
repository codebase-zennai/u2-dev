"use client";

import { useEffect, useRef, useState } from "react";
import { Quote, Star, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ms Riya",
    location: "Kuala Lumpur Tour",
    description:
      "Hey, the tour was amazing, and the driver was so friendly and helpful. We had good service. I'm looking forward to doing more business together. Thank you!",
  },
  {
    id: 2,
    name: "Madam Nivari",
    location: "City Tour",
    description:
      "Thank you for giving us ride two days and showing the city. The experience was wonderful and the service was top-notch.",
  },
  {
    id: 3,
    name: "Mr Apurva Joshi",
    location: "Group Tour",
    description:
      "Thanks a lot Vikasbhai and all team members, nice experience with all of you. Will definitely recommend U2 Travels to others.",
  },
  {
    id: 4,
    name: "Mr Ashish",
    location: "Langkawi + Kuala Lumpur",
    description:
      "We booked through U2 and visited Langkawi and Kuala Lumpur — it was great! They managed all bookings and the entire process was done smoothly.",
  },
  {
    id: 5,
    name: "Mr Bharath Nelluta",
    location: "Malaysia Tour",
    description:
      "Thank you very much. We really liked and enjoyed your service. Excellent service throughout our entire trip!",
  },
];

// Helper to generate a deterministic color based on name
const getColor = (name) => {
  const colors = [
    "#2ECC71",
    "#3498DB",
    "#9B59B6",
    "#E67E22",
    "#E74C3C",
    "#1ABC9C",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const getInitials = (name) => {
  const clean = name.replace(/^(Mr|Ms|Madam)\s+/i, "");
  const parts = clean.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
};

export default function StaffSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="section background-color-white border-b border-slate-100 animate-fade-in"
      ref={sectionRef}
    >
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
            Real travel stories and reviews from verified customers who went
            beyond borders with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(2rem)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
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
                    <Star
                      key={i}
                      className="h-4.5 w-4.5 fill-[#dfa447] text-[#dfa447]"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-600 font-light text-sm md:text-base leading-relaxed mb-8 italic">
                  "{item.description}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                {/* Avatar Icon */}
                <div
                  className="w-12 h-12 rounded-full text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0"
                  style={{ backgroundColor: getColor(item.name) }}
                >
                  {getInitials(item.name)}
                </div>

                <div className="flex flex-col text-left min-w-0">
                  <span className="font-bold text-slate-800 text-sm md:text-base leading-tight truncate">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-[#013b85] font-semibold leading-normal truncate mt-0.5">
                    {item.location}
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

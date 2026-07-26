"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const leaders = [
  {
    name: "Bhavani",
    role: "Founder & Managing Director",
    image: "/team/Bhavani Madam U2.png",
  },
  {
    name: "K. Jai Kishan",
    role: "Executive Director",
    image: "/team/Jai Profile pic.jpg.jpeg",
  },
];

const team = [
  {
    name: "Thayaalan",
    role: "Transport & Logistics Lead",
    image: "/team/Thayaalan U2.png",
  },
  {
    name: "Bhavika",
    role: "Director of Sales and Marketing",
    image: "/team/Bhavika U2.png",
  },
  {
    name: "Izwan",
    role: "Inbound Operations Manager",
    image: "/team/Izwan U2.png",
  },
  {
    name: "Bharathi",
    role: "Operations Support",
    image: "/team/Bharathi U2.jpg",
  },
  {
    name: "Danusha",
    role: "Tours Coordinator",
    image: "/team/Danusha U2.png",
  },
  {
    name: "Poorni",
    role: "Customer Relations Executive",
    image: "/team/Poorni U2.png",
  },
  {
    name: "Bes",
    role: "Accounts Head",
    image: "/team/Bes U2.png",
  },
];

export default function TeamSection() {
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
      className="section bg-slate-50 border-b border-slate-100"
      ref={sectionRef}
      style={{
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      <div className="container-large">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <p className="text-size-eyebrow text-[#013b85] uppercase tracking-[0.2em] font-bold mb-3">
            Our Team
          </p>
          <h2 className="heading-style-h2 margin-bottom-16">
            Meet the Minds Behind U2
          </h2>
          <p className="text-slate-500 font-light text-base md:text-lg max-w-lg leading-relaxed">
            The dedicated travel professionals working tirelessly to make your
            journeys seamless, safe, and truly unforgettable.
          </p>
        </div>

        {/* Leaders Grid (Founder & GM) */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16">
          {leaders.map((leader, index) => (
            <div
              key={leader.name}
              className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full max-w-[340px] group text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(2rem)",
                transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, box-transform 0.3s ease`,
              }}
            >
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-5">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 340px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1">
                {leader.name}
              </h3>
              <p className="text-sm font-semibold text-[#013b85] uppercase tracking-wider">
                {leader.role}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-16 h-1 bg-[#013b85]/10 mx-auto mb-16 rounded-full" />

        {/* Regular Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={member.name}
              className="bg-white border border-slate-100 rounded-[2rem] p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(2rem)",
                transition: `opacity 0.6s ease ${(index + leaders.length) * 0.05}s, transform 0.6s ease ${(index + leaders.length) * 0.05}s, box-transform 0.3s ease`,
              }}
            >
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 250px"
                />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-1">
                {member.name}
              </h4>
              <p className="text-xs font-semibold text-[#013b85] uppercase tracking-wider mt-auto">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

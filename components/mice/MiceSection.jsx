"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Award, Briefcase, Calendar, Users } from "lucide-react";

export default function MiceSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const pillars = [
    {
      icon: <Users className="h-8 w-8 text-[#dfa447]" />,
      title: "Meetings",
      description:
        "Execute corporate board meetings, brain-storming sessions, and executive workshops in private, high-end settings. We manage everything from booking premium boutique boardrooms to custom catering and high-speed AV setups.",
      bullets: [
        "Executive board retreats",
        "Confidential corporate assemblies",
        "Strategic planning seminars",
        "Seamless audiovisual & IT setup"
      ]
    },
    {
      icon: <Award className="h-8 w-8 text-[#dfa447]" />,
      title: "Incentives",
      description:
        "Reward your top performers with travel programs that inspire. We craft customized adventure trips, team-bonding challenges, private yacht charters, and beach galas across prime Malaysian islands and global hotspots.",
      bullets: [
        "Luxury team-building tours",
        "Private cruise and yacht dinners",
        "Custom sports & golf tournaments",
        "Award ceremonies & theme gala nights"
      ]
    },
    {
      icon: <Calendar className="h-8 w-8 text-[#dfa447]" />,
      title: "Conferences",
      description:
        "Deliver impactful messages through flawlessly executed corporate conferences, conventions, and seminars. We handle comprehensive delegate registrations, stage design, VIP routing, and ground transfers.",
      bullets: [
        "National & regional assemblies",
        "Product launches & press meets",
        "Delegate registry & check-in apps",
        "Luxury VIP ground logistics"
      ]
    },
    {
      icon: <Briefcase className="h-8 w-8 text-[#dfa447]" />,
      title: "Exhibitions",
      description:
        "Showcase your innovations in style. We support business exhibitions, trade shows, and expos with professional booth design coordination, crowd logistics management, and media relations.",
      bullets: [
        "Trade fair pavilion planning",
        "Product expo setups",
        "Exhibitor logistical support",
        "Media launches & networking cocktails"
      ]
    }
  ];

  const caseStudies = [
    {
      title: "350+ Delegate Incentive in Langkawi",
      client: "Leading Tech Multinational",
      image: "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg",
      desc: "U2 Travels managed a 4-day incentive program that culminated in a private yacht team-building competition, beachside themed BBQ gala dinner, and comprehensive resort accommodations for all delegates."
    },
    {
      title: "Regional Sales Conference in Kuala Lumpur",
      client: "Global Financial Services",
      image: "https://images.pexels.com/photos/2774576/pexels-photo-2774576.jpeg",
      desc: "We provided full end-to-end logistics including ground transfer management with a fleet of 25 luxury coaches, stage layout design, and VIP hosting services for executives arriving from 8 countries."
    },
    {
      title: "Executive Board Retreat in Cameron Highlands",
      client: "Aviation & Logistics Enterprise",
      image: "https://images.pexels.com/photos/3182796/pexels-photo-3182796.jpeg",
      desc: "Designed a tranquil, high-focus boardroom retreat set inside a historic tea plantation. The 3-day itinerary blended business strategy sessions with private tea-tasting events and high-altitude golf tournaments."
    }
  ];

  return (
    <div className="mice-page">
      {/* Hero Banner Section */}
      <section className="relative min-h-[60vh] flex items-center justify-start overflow-hidden pt-28 pb-16 md:pt-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
            alt="MICE Corporate Events Background"
            fill
            priority
            className="object-cover object-center scale-102 transition-transform duration-1000"
            style={{ filter: "brightness(0.15)" }}
          />
          {/* Deep dark gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950/70 z-10" />
        </div>

        <div className="container-large relative z-20 w-full px-4 md:px-8">
          <div 
            className="max-width-800 text-left flex flex-col items-start"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            <span className="text-[#dfa447] text-xs font-black uppercase tracking-[0.25em] mb-4">
              Corporate Travel & Events
            </span>
            <p 
              className="text-white text-3xl md:text-8xl font-normal leading-[1.1] mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              MICE<br></br> Services
            </p>
            <p className="text-slate-300 mt-5 text-lg md:text-xl max-w-2xl leading-relaxed font-light mb-8">
              Meetings, Incentives, Conferences, and Exhibitions custom-designed to inspire your team, showcase your brand, and elevate business connections.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 mt-10 bg-white text-[#013b85] hover:bg-[#7ff74b] hover:text-black font-extrabold text-sm uppercase tracking-wider py-3.5 px-7 rounded-full shadow-lg transition-all duration-300 !no-underline"
            >
              Request a Corporate Proposal
            </Link>
          </div>
        </div>
      </section>

      {/* Intro & Statistics */}
      <section className="py-20 bg-white">
        <div className="container-large px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Col: Creative Description */}
            <div className="flex flex-col gap-6 text-left">
              <h2 
                className="text-3xl md:text-4.5xl font-normal text-[#013b85] tracking-tight leading-tight"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Seamless Corporate Events, <br />
                <span className="text-[#dfa447] italic">Tailored to Perfection</span>
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
                At U2 Travels & Tours, we understand that corporate events are a major investment in your people and partners. With over 23 years of experience, we deliver tailored logistics, premium accommodations, and bespoke itineraries that support your corporate objectives.
              </p>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                Whether you need a confidential board session in a mountaintop resort or a high-capacity sales incentive for 500+ participants, our specialized events coordinators handle everything from flight arrangements and luxury coaches to staging, registration apps, and dining.
              </p>
            </div>

            {/* Right Col: Metric Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 hover:shadow-md transition-shadow flex flex-col gap-2">
                <span className="text-4xl font-black text-[#013b85]">500+</span>
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Peak Delegate Capacity</span>
                <p className="text-xs text-slate-500 mt-2">Flawlessly coordinated large-scale assemblies and charters.</p>
              </div>
              <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 hover:shadow-md transition-shadow flex flex-col gap-2">
                <span className="text-4xl font-black text-[#013b85]">23+</span>
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Years Industry Standing</span>
                <p className="text-xs text-slate-500 mt-2">Deep connections and trusted partnerships across hotels and venues.</p>
              </div>
              <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 hover:shadow-md transition-shadow flex flex-col gap-2">
                <span className="text-4xl font-black text-[#013b85]">100%</span>
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Custom Execution</span>
                <p className="text-xs text-slate-500 mt-2">Every plan built from the ground up matching your criteria.</p>
              </div>
              <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 hover:shadow-md transition-shadow flex flex-col gap-2">
                <span className="text-4xl font-black text-[#013b85]">24/7</span>
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">On-Site Liaison</span>
                <p className="text-xs text-slate-500 mt-2">Dedicated logistics managers and event teams at the site.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container-large px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-[#dfa447] text-xs font-black uppercase tracking-[0.25em]">
              The Core Disciplines
            </span>
            <h2 
              className="text-3xl md:text-5xl font-normal text-[#013b85] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Our MICE Capabilities
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              We leverage an extensive network of luxury ground transports, hotels, and expert vendor partners to deliver outstanding results across all four core MICE segments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      {pillar.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#013b85] uppercase tracking-wide">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">
                    {pillar.description}
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-6">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-500">
                    {pillar.bullets.map((bullet, bidx) => (
                      <li key={bidx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#dfa447] rounded-full shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies / Showcase Section */}
      <section className="py-20 bg-white">
        <div className="container-large px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-[#dfa447] text-xs font-black uppercase tracking-[0.25em]">
              Proven Track Record
            </span>
            <h2 
              className="text-3xl md:text-5xl font-normal text-[#013b85] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Events Successfully Managed
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              A glimpse into a few corporate journeys planned and managed end-to-end by U2 Travels & Tours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, idx) => (
              <div 
                key={idx} 
                className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="aspect-[1.5] w-full relative overflow-hidden bg-slate-100">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute left-4 top-4 bg-white/95 backdrop-blur-sm border border-slate-100 rounded-full px-3.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-[#013b85] shadow-sm">
                    {study.client}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="font-extrabold text-[#013b85] text-lg mb-3 uppercase tracking-wide group-hover:text-[#dfa447] transition-colors leading-snug">
                    {study.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {study.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Call To Action */}
      <section className="py-24 bg-[#013b85] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <Image
            src="https://images.pexels.com/photos/262669/pexels-photo-262669.jpeg"
            alt="Corporate pattern background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container-large relative z-10 px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
            <h2 
              className="text-3xl md:text-5.5xl font-normal tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Let’s Plan Your Next <br />
              <span className="text-[#dfa447] italic">Corporate Milestone</span>
            </h2>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed font-light max-w-2xl">
              Connect with our corporate events and MICE team to obtain a custom itinerary, cost estimation, and logistics breakdown for your upcoming event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                href="/contact"
                className="bg-white hover:bg-[#7ff74b] !text-[#013b85] hover:!text-black font-extrabold text-xs uppercase tracking-wider py-4 px-8 rounded-full shadow-md transition-all !no-underline"
              >
                Inquire Now
              </Link>
              <a
                href="mailto:mice@u2travels.com.my"
                className="bg-transparent hover:bg-white/10 text-white font-extrabold text-xs uppercase tracking-wider py-4 px-8 rounded-full border-2 border-white transition-all !no-underline"
              >
                Email Corporate Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

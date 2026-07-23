"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/1518500/pexels-photo-1518500.jpeg",
    title: "Petronas Twin Towers",
    location: "Kuala Lumpur",
    gridClass: "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/36949767/pexels-photo-36949767.jpeg",
    title: "Batu Caves Temple",
    location: "Selangor",
    gridClass: "aspect-square",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg",
    title: "Tea Plantations",
    location: "Cameron Highlands",
    gridClass: "aspect-square",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg",
    title: "Pantai Cenang Beach",
    location: "Langkawi",
    gridClass: "md:row-span-2 aspect-[3/4] md:aspect-auto",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg",
    title: "Juara Beach Lagoon",
    location: "Tioman Island",
    gridClass: "aspect-square",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg",
    title: "Tanjung Aru Sunset",
    location: "Kota Kinabalu",
    gridClass: "md:col-span-2 aspect-[2/1] md:aspect-auto",
  },
];

export default function GallerySection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

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

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "auto";
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

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
            Destinations Gallery
          </p>
          <h2 className="heading-style-h2 margin-bottom-16">
            Moments Beyond Borders
          </h2>
          <p className="text-slate-500 font-light text-base md:text-lg max-w-lg leading-relaxed">
            Take a visual tour of the stunning locations, pristine beaches, and
            heritage sites our guests explore.
          </p>
        </div>

        {/* Asymmetrical Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 md:grid-flow-row-dense gap-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(2rem)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {galleryImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              className={`relative overflow-hidden rounded-[2rem] group cursor-pointer border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${img.gridClass}`}
            >
              {/* Image */}
              <div className="relative w-full h-full min-h-[250px] md:min-h-0">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-8 text-left">
                <span className="text-xs font-bold text-[#7ff74b] uppercase tracking-wider mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {img.location}
                </span>
                <h3 className="text-xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  {img.title}
                </h3>
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-[9999] bg-slate-950/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm transition-opacity duration-300"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
            type="button"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={showPrev}
            className="absolute left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all"
            type="button"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Large Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].title}
                className="max-w-full max-h-[70vh] rounded-2xl object-contain shadow-2xl select-none"
              />
            </div>

            {/* Image Details */}
            <div className="text-center mt-6">
              <span className="text-xs font-bold text-[#7ff74b] uppercase tracking-wider">
                {galleryImages[lightboxIndex].location}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                {galleryImages[lightboxIndex].title}
              </h3>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={showNext}
            className="absolute right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all"
            type="button"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}

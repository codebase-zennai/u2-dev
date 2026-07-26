"use client";

import Image from "next/image";
import Link from "next/link";

export default function TourCard({ tour, imageScale }) {
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

  return (
    <li className="tours_item">
      <div className="tours_visual shadow-card">
        <Image
          src={getTourImage(tour.image)}
          alt={tour.name}
          fill
          className="img-cover"
          sizes="(max-width: 767px) 95vw, (max-width: 991px) 45vw, 30vw"
          style={{
            transform: `scale(${imageScale})`,
            transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      </div>

      {/* Content flex wrapper to ensure equal height alignment */}
      <div className="w-layout-vflex flex-grow flex flex-col justify-between mt-4">
        <div className="w-layout-vflex">
          <p className="heading-style-h2 margin-bottom-16">{tour.name}</p>
          <p className="text-size-regular text-color-darkgrey margin-bottom-24">
            {tour.description}
          </p>
        </div>
        <div className="mt-auto">
          <Link
            href="/about-us"
            className="button is-secondary w-full text-center"
          >
            <p>View Itinerary</p>
          </Link>
        </div>
      </div>
    </li>
  );
}

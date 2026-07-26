import { notFound } from "next/navigation";
import TourItineraryContent from "@/components/tours/TourItineraryContent";
import { tours as localTours } from "@/data/tours";
import { supabase } from "@/lib/supabaseClient";

async function getTour(slug) {
  let tour = null;
  try {
    const { data, error } = await supabase
      .from("tours")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) {
      tour = data;
    }
  } catch (err) {
    console.warn(
      "Failed to fetch tour from Supabase, falling back to local data:",
      err,
    );
  }

  if (!tour) {
    tour = localTours.find((t) => t.slug === slug);
  }
  return tour;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    return {
      title: "Tour Not Found",
    };
  }

  const title = tour.name;
  const description =
    tour.description ||
    `Experience ${tour.name} with U2 Travels & Tours. Complete itineraries, transport, and guided tours in ${tour.destination}.`;
  const imageUrl = tour.image || "https://images.pexels.com/photos/7688326/pexels-photo-7688326.jpeg";

  return {
    title: title,
    description: description,
    keywords: [
      tour.name,
      tour.destination || "Malaysia",
      "Malaysia Tour Package",
      "U2 Travels Holiday",
    ],
    alternates: {
      canonical: `https://u2travels.com.my/tours/${tour.slug}`,
    },
    openGraph: {
      title: `${title} | U2 Travels & Tours`,
      description: description,
      url: `https://u2travels.com.my/tours/${tour.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | U2 Travels & Tours`,
      description: description,
      images: [imageUrl],
    },
  };
}

export default async function TourItineraryPage({ params }) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    notFound();
  }

  const tourJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.description,
    touristType: ["Leisure", "Family", "Corporate"],
    offers: {
      "@type": "Offer",
      price: tour.price ? String(tour.price) : "Enquire",
      priceCurrency: "MYR",
      availability: "https://schema.org/InStock",
      url: `https://u2travels.com.my/tours/${tour.slug}`,
    },
    provider: {
      "@type": "TravelAgency",
      name: "U2 Travels & Tours",
      url: "https://u2travels.com.my",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }}
      />
      <TourItineraryContent tour={tour} />
    </>
  );
}

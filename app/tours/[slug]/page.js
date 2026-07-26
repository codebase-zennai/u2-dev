import { notFound } from "next/navigation";
import TourItineraryContent from "@/components/tours/TourItineraryContent";
import { tours as localTours } from "@/data/tours";
import { supabase } from "@/lib/supabaseClient";

export default async function TourItineraryPage({ params }) {
  const { slug } = await params;

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

  // Fallback
  if (!tour) {
    tour = localTours.find((t) => t.slug === slug);
  }

  if (!tour) {
    notFound();
  }

  return <TourItineraryContent tour={tour} />;
}

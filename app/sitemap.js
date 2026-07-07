import { tours } from "@/data/tours";

export default function sitemap() {
  const baseUrl = "https://u2travels.com.my";

  const staticRoutes = [
    "",
    "/about-us",
    "/contact",
    "/locations",
    "/transportation",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const dynamicRoutes = tours.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}

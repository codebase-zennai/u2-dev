/**
 * Document Configuration for U2 Travels & Tours
 *
 * To add a new document:
 * 1. Place the file into `public/documents/` (e.g. `public/documents/mice_brochure.pdf`)
 * 2. (Optional) Add an entry below to customize title, category, description, and badge.
 * Note: Any file placed in `public/documents/` will automatically appear even if not listed below!
 */

export const documentMetadataConfig = [
  {
    filename: "transfer_rates.pdf",
    id: "transfer-rates",
    title: "Official Transfer & Transportation Rates (2025/2026)",
    category: "Tariffs & Rates",
    badge: "Official Tariff",
    featured: true,
    description:
      "Comprehensive official tariff sheet for U2 Travels & Tours private transfers, airport pick-ups/drop-offs (KLIA 1 & 2, Subang), intercity transfers, and luxury coach charters across Peninsular Malaysia.",
    tags: ["Transfers", "Airport", "Coaches", "Malaysia", "Rates 2025/2026"],
    updatedAt: "2025 - 2026",
    order: 1,
  },
];

export default documentMetadataConfig;

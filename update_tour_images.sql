-- ============================================================
-- U2 Travels & Tours — Update Tour Images in Supabase Database
-- Run this in your Supabase SQL Editor to update all tour packages
-- with verified high-resolution destination travel photography.
-- ============================================================

-- 1. Genting Highlands Getaway
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'genting-highlands' OR id = 1;

-- 2. Gua Mulu Cave Adventure
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'gua-mulu' OR id = 2;

-- 3. Johor Heritage & Parks
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'johor' OR id = 3;

-- 4. Kota Kinabalu Mount Climb
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'kota-kinabalu' OR id = 4;

-- 5. Kuala Lumpur City Discovery
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'kuala-lumpur' OR id = 5;

-- 6. Kuantan Beaches & Waterfalls
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'kuantan' OR id = 6;

-- 7. Langkawi Tropical Retreat
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'langkawi' OR id = 7;

-- 8. Melaka Historical Heritage
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'melaka' OR id = 8;

-- 9. Pahang Jungle Expedition
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'pahang' OR id = 9;

-- 10. Penang Culinary Heritage
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'penang' OR id = 10;

-- 11. Perak Ipoh Heritage Tour
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'perak' OR id = 11;

-- 12. Selangor Adventure & Theme Park
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'selangor' OR id = 12;

-- 13. Tasik Widuri Lakeside Escape
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'tasik-widuri' OR id = 13;

-- 14. Dubai Desert Luxury Tour
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'dubai' OR id = 14;

-- 15. Grand European Classics
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'europe' OR id = 15;

-- 16. India Golden Triangle Heritage
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'india' OR id = 16;

-- 17. Bali Exotic Island Retreat
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'indonesia' OR id = 17;

-- 18. Korea Seoul & Traditions
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'korea' OR id = 18;

-- 19. Nepal Himalayan Expedition
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'nepal' OR id = 19;

-- 20. South Africa Wildlife Safari
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'south-africa' OR id = 20;

-- 21. Amazing Thailand Explorer
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'thailand' OR id = 21;

-- 22. Vietnam Halong Bay Cruise
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'vietnam' OR id = 22;

-- 23. Genting Tours
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'genting-tours' OR id = 23;

-- 24. Kuala Lumpur Night Tour
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'kuala-lumpur-night-tour' OR id = 24;

-- 25. Kuala Lumpur City Tour
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'kuala-lumpur-city-tour' OR id = 25;

-- 26. KL Country Tour
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'kl-country-tour' OR id = 26;

-- 27. Melaka Tour
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'melaka-tour' OR id = 27;

-- 28. Dinner Transfer
UPDATE public.tours 
SET image = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80' 
WHERE slug = 'dinner-transfer' OR id = 28;

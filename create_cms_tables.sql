-- ============================================================
-- U2 Travels & Tours — CMS Tables & Storage Bucket
-- Run this in your Supabase SQL Editor to enable the
-- Testimonials, FAQs, Site Settings, Image Storage Uploads,
-- and Tour Package Image updates.
-- ============================================================

-- ─── 1. Testimonials ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.testimonials (
  id         BIGSERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  location   TEXT,
  trip       TEXT,
  quote      TEXT NOT NULL,
  avatar_bg  TEXT DEFAULT 'bg-teal-500',
  initials   TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read"  ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Anon insert"  ON public.testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon update"  ON public.testimonials FOR UPDATE USING (true);
CREATE POLICY "Anon delete"  ON public.testimonials FOR DELETE USING (true);

-- Seed with existing hardcoded testimonials (optional)
INSERT INTO public.testimonials (name, location, trip, quote, avatar_bg, initials, sort_order) VALUES
  ('Aishah Ahmad',  'Kuala Lumpur, Malaysia', '3D2N Kota Kinabalu Family Tour',       'Our trip to Kota Kinabalu was absolutely seamless. From the flight bookings to hotel transfers and guided tours, everything was taken care of. U2 Travels really makes traveling hassle-free for families!',                                              'bg-teal-500', 'AA', 1),
  ('Daniel Cooper', 'Sydney, Australia',       '10D9N Grand European Classics',         'The Grand European Classics was worth every single dollar. Superb hotels, a premium tour coach, and an exceptionally knowledgeable tour guide. We will definitely book our next Asia tour with them!',                                                          'bg-blue-600', 'DC', 2),
  ('Tan Wei Ming',  'Penang, Malaysia',        'Customized Tioman Island Honeymoon',    'Amazing service from start to finish. They adapted the itinerary, hotels, and transfers to fit our exact pacing and budget. The private beach dinners they arranged made it truly unforgettable.',                                                              'bg-amber-500','TW', 3);


-- ─── 2. FAQs ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.faqs (
  id         BIGSERIAL PRIMARY KEY,
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read"  ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Anon insert"  ON public.faqs FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon update"  ON public.faqs FOR UPDATE USING (true);
CREATE POLICY "Anon delete"  ON public.faqs FOR DELETE USING (true);

-- Seed with existing hardcoded FAQs (optional)
INSERT INTO public.faqs (question, answer, sort_order) VALUES
  ('How do I book a tour package?',       'You can book a tour package through our website by selecting your desired destination and filling out the enquiry form. Our team will contact you within 24 hours to confirm your booking and provide payment details.',                                                               1),
  ('What is included in tour packages?',  'Our tour packages typically include accommodation, transportation, guided tours, and selected meals. Specific inclusions vary by package and are clearly listed on each tour page. Flights are usually not included unless stated.',                                                     2),
  ('Do you offer customized tours?',      'Yes! We specialize in creating personalized travel experiences. Contact us with your preferences, group size, and budget, and our travel experts will design a custom itinerary just for you.',                                                                                        3),
  ('What are your payment options?',      'We accept bank transfers, credit cards, and online payment methods. A deposit is required to confirm your booking, with the remaining balance due before departure. Flexible payment plans are available for selected packages.',                                                       4),
  ('Can I cancel or modify my booking?',  'Yes, cancellations and modifications are possible subject to our terms and conditions. Cancellation fees may apply depending on how close to the departure date the request is made. Contact us as early as possible for any changes.',                                                 5),
  ('Do you provide airport transfers?',   'Yes, we offer airport transfer services for all our tour packages. Private and shared transfer options are available at competitive rates. Transfers can be arranged for both arrival and departure.',                                                                                  6);


-- ─── 3. Site Settings (key-value store) ─────────────────────
CREATE TABLE IF NOT EXISTS public.site_settings (
  id         BIGSERIAL PRIMARY KEY,
  key        TEXT UNIQUE NOT NULL,
  value      TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read"  ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Anon insert"  ON public.site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon update"  ON public.site_settings FOR UPDATE USING (true);
CREATE POLICY "Anon delete"  ON public.site_settings FOR DELETE USING (true);

-- Seed with default homepage hero values (optional — can be edited from Admin CMS)
INSERT INTO public.site_settings (key, value) VALUES
  ('hero_badge',         '18+ Years of Curated Journeys'),
  ('hero_subtitle',      'Handcrafted Malaysian experiences and world tours designed to be affordable, effortless, and unforgettable.'),
  ('hero_cta_primary',   'View All Tours'),
  ('hero_cta_secondary', 'Contact Us')
ON CONFLICT (key) DO NOTHING;


-- ─── 4. Storage Bucket for Tour Images ──────────────────────
-- Create public bucket 'tour-images' for tour package uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('tour-images', 'tour-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public RLS policies for tour-images storage bucket
CREATE POLICY "Public Read Tour Images" ON storage.objects
  FOR SELECT USING (bucket_id = 'tour-images');

CREATE POLICY "Public Upload Tour Images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'tour-images');

CREATE POLICY "Public Update Tour Images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'tour-images');

CREATE POLICY "Public Delete Tour Images" ON storage.objects
  FOR DELETE USING (bucket_id = 'tour-images');


-- ─── 5. Update Tour Package Images ─────────────────────────
-- Updates all tour package images with verified travel photography
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'genting-highlands' OR id = 1;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'gua-mulu' OR id = 2;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'johor' OR id = 3;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'kota-kinabalu' OR id = 4;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'kuala-lumpur' OR id = 5;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'kuantan' OR id = 6;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'langkawi' OR id = 7;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'melaka' OR id = 8;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'pahang' OR id = 9;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'penang' OR id = 10;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'perak' OR id = 11;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'selangor' OR id = 12;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'tasik-widuri' OR id = 13;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'dubai' OR id = 14;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'europe' OR id = 15;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'india' OR id = 16;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'indonesia' OR id = 17;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'korea' OR id = 18;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'nepal' OR id = 19;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'south-africa' OR id = 20;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'thailand' OR id = 21;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'vietnam' OR id = 22;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'genting-tours' OR id = 23;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'kuala-lumpur-night-tour' OR id = 24;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'kuala-lumpur-city-tour' OR id = 25;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'kl-country-tour' OR id = 26;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'melaka-tour' OR id = 27;
UPDATE public.tours SET image = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80' WHERE slug = 'dinner-transfer' OR id = 28;


-- ─── 6. Contact Submissions ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id         BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert contact_submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read contact_submissions"   ON public.contact_submissions FOR SELECT USING (true);
CREATE POLICY "Public delete contact_submissions" ON public.contact_submissions FOR DELETE USING (true);


-- ─── 7. Agent Registrations ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.agent_registrations (
  id             BIGSERIAL PRIMARY KEY,
  first_name     TEXT NOT NULL,
  last_name      TEXT NOT NULL,
  business_name  TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT NOT NULL,
  agree_to_terms BOOLEAN DEFAULT true,
  status         TEXT DEFAULT 'pending',
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.agent_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert agent_registrations" ON public.agent_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read agent_registrations"   ON public.agent_registrations FOR SELECT USING (true);
CREATE POLICY "Public update agent_registrations" ON public.agent_registrations FOR UPDATE USING (true);
CREATE POLICY "Public delete agent_registrations" ON public.agent_registrations FOR DELETE USING (true);


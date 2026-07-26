-- ============================================================
-- U2 Travels & Tours — CMS Tables & Storage Bucket
-- Run this in your Supabase SQL Editor to enable the
-- Testimonials, FAQs, Site Settings, and Image Storage Uploads.
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

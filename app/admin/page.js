"use client";

import {
  AlertCircle,
  Bus,
  CheckCircle2,
  Compass,
  Edit2,
  Filter,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  MessageSquare,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import Header2 from "@/components/layout/Header2";
import { supabase } from "@/lib/supabaseClient";

// ─── Helper: Table Not Ready Banner ─────────────────────────────────────────
function TableNotReady({ tableName, sql, onRetry }) {
  return (
    <div className="bg-amber-950/30 border border-amber-800/50 rounded-2xl p-8 text-center">
      <HelpCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
      <p className="text-amber-300 font-bold text-sm mb-2">
        Database Table Not Found
      </p>
      <p className="text-slate-400 text-xs leading-relaxed mb-5 max-w-md mx-auto">
        The{" "}
        <code className="bg-slate-900 px-1.5 py-0.5 rounded text-amber-400 font-mono">
          {tableName}
        </code>{" "}
        table does not exist in your Supabase project yet. Run the SQL below in
        your Supabase SQL editor to enable this section.
      </p>
      <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-left text-slate-300 overflow-x-auto max-w-2xl mx-auto font-mono whitespace-pre leading-relaxed">
        {sql}
      </pre>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider py-2 px-5 rounded-xl border border-slate-700 cursor-pointer flex items-center gap-2 mx-auto transition-all"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Retry Connection
      </button>
    </div>
  );
}

// ─── SQL snippets for new tables ────────────────────────────────────────────
const TESTIMONIALS_SQL = `CREATE TABLE public.testimonials (
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
CREATE POLICY "Anon delete"  ON public.testimonials FOR DELETE USING (true);`;

const FAQS_SQL = `CREATE TABLE public.faqs (
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
CREATE POLICY "Anon delete"  ON public.faqs FOR DELETE USING (true);`;

const SETTINGS_SQL = `CREATE TABLE public.site_settings (
  id         BIGSERIAL PRIMARY KEY,
  key        TEXT UNIQUE NOT NULL,
  value      TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read"  ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Anon insert"  ON public.site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon update"  ON public.site_settings FOR UPDATE USING (true);
CREATE POLICY "Anon delete"  ON public.site_settings FOR DELETE USING (true);`;

// ─── Avatar colour palette ───────────────────────────────────────────────────
const AVATAR_COLORS = [
  { cls: "bg-teal-500", label: "Teal" },
  { cls: "bg-blue-600", label: "Blue" },
  { cls: "bg-amber-500", label: "Amber" },
  { cls: "bg-purple-600", label: "Purple" },
  { cls: "bg-rose-500", label: "Rose" },
  { cls: "bg-emerald-600", label: "Emerald" },
  { cls: "bg-indigo-500", label: "Indigo" },
  { cls: "bg-pink-500", label: "Pink" },
];

// ─── Main Page Component ─────────────────────────────────────────────────────
export default function AdminCMSPage() {
  /* ── Auth ──────────────────────────────────────────── */
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  /* ── Tab ───────────────────────────────────────────── */
  const [activeTab, setActiveTab] = useState("tours");

  /* ── Data ──────────────────────────────────────────── */
  const [tours, setTours] = useState([]);
  const [rates, setRates] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Flags for optional tables
  const [testimonialsReady, setTestimonialsReady] = useState(false);
  const [faqsReady, setFaqsReady] = useState(false);
  const [settingsReady, setSettingsReady] = useState(false);

  /* ── Search / Filters ──────────────────────────────── */
  const [tourSearch, setTourSearch] = useState("");
  const [tourCategory, setTourCategory] = useState("all");
  const [rateSearch, setRateSearch] = useState("");
  const [rateCategory, setRateCategory] = useState("all");
  const [rateSheet, setRateSheet] = useState("all");
  const [testimonialSearch, setTestimonialSearch] = useState("");
  const [faqSearch, setFaqSearch] = useState("");

  /* ── Tour modal ────────────────────────────────────── */
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [currentTour, setCurrentTour] = useState(null);

  /* ── Rate modal ────────────────────────────────────── */
  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [currentRate, setCurrentRate] = useState(null);
  const [pricePairs, setPricePairs] = useState([{ pax: "", val: "" }]);

  /* ── Testimonial modal ─────────────────────────────── */
  const [testimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);

  /* ── FAQ modal ─────────────────────────────────────── */
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [currentFaq, setCurrentFaq] = useState(null);

  /* ── Site settings ─────────────────────────────────── */
  const [heroSettings, setHeroSettings] = useState({
    hero_badge: "18+ Years of Curated Journeys",
    hero_subtitle:
      "Handcrafted Malaysian experiences and world tours designed to be affordable, effortless, and unforgettable.",
    hero_cta_primary: "View All Tours",
    hero_cta_secondary: "Contact Us",
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState({ type: "", text: "" });

  /* ── Shared form state ─────────────────────────────── */
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setFormError("");
    setFormSuccess("");

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `tours/${fileName}`;

      // Upload to Supabase bucket 'tour-images'
      const { error } = await supabase.storage
        .from("tour-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        throw new Error(
          `Supabase storage error: ${error.message}. Please ensure a public bucket named "tour-images" is created in Supabase Storage.`,
        );
      }

      // Get Public URL
      const { data: publicUrlData } = supabase.storage
        .from("tour-images")
        .getPublicUrl(filePath);

      if (publicUrlData?.publicUrl) {
        handleTourFieldChange("image", publicUrlData.publicUrl);
        setFormSuccess("Image uploaded successfully to Supabase Storage!");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setFormError(err.message || "Failed to upload image to Supabase.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  /* ───────────────────────────────────────────────────────────────
     FETCH DATA  — wrapped in useCallback to prevent infinite loops.
     The old code put fetchData directly in useEffect's dependency
     array without memoizing it, which caused a new function ref on
     every render → effect re-ran → infinite loop.
  ─────────────────────────────────────────────────────────────── */
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Tours (required table)
      const { data: toursData, error: toursError } = await supabase
        .from("tours")
        .select("*")
        .order("id", { ascending: true });
      if (toursError) throw toursError;
      setTours(toursData || []);

      // Transport Rates (required table)
      const { data: ratesData, error: ratesError } = await supabase
        .from("transport_rates")
        .select("*")
        .order("id", { ascending: true });
      if (ratesError) throw ratesError;
      setRates(ratesData || []);

      // Testimonials (optional — graceful fallback)
      try {
        const { data: testimonialsData, error: testimonialsError } =
          await supabase
            .from("testimonials")
            .select("*")
            .order("sort_order", { ascending: true });
        if (testimonialsError) {
          setTestimonialsReady(false);
        } else {
          setTestimonials(testimonialsData || []);
          setTestimonialsReady(true);
        }
      } catch {
        setTestimonialsReady(false);
      }

      // FAQs (optional — graceful fallback)
      try {
        const { data: faqsData, error: faqsError } = await supabase
          .from("faqs")
          .select("*")
          .order("sort_order", { ascending: true });
        if (faqsError) {
          setFaqsReady(false);
        } else {
          setFaqs(faqsData || []);
          setFaqsReady(true);
        }
      } catch {
        setFaqsReady(false);
      }

      // Site Settings (optional — graceful fallback)
      try {
        const { data: settingsData, error: settingsError } = await supabase
          .from("site_settings")
          .select("*");
        if (settingsError) {
          setSettingsReady(false);
        } else {
          setSettingsReady(true);
          const map = {};
          (settingsData || []).forEach((s) => {
            map[s.key] = s.value;
          });
          setHeroSettings((prev) => ({
            hero_badge: map.hero_badge ?? prev.hero_badge,
            hero_subtitle: map.hero_subtitle ?? prev.hero_subtitle,
            hero_cta_primary: map.hero_cta_primary ?? prev.hero_cta_primary,
            hero_cta_secondary:
              map.hero_cta_secondary ?? prev.hero_cta_secondary,
          }));
        }
      } catch {
        setSettingsReady(false);
      }
    } catch (error) {
      console.error("Error fetching CMS data:", error);
    } finally {
      setLoading(false);
    }
  }, []); // stable — no deps change

  // Restore session on mount
  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuthenticated") === "true";
    if (isAuth) setIsAuthenticated(true);
  }, []);

  // Fetch data after auth — safe because fetchData ref is stable
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchData();
  }, [isAuthenticated, fetchData]);

  /* ── Auth handlers ─────────────────────────────────── */
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError("");
    if (passcode === "u2admin2026") {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
    } else {
      setAuthError("Incorrect admin passcode. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
  };

  /* ── Tour CRUD ─────────────────────────────────────── */
  const openNewTourModal = () => {
    setCurrentTour({
      name: "",
      slug: "",
      category: "malaysian",
      price: "",
      duration: "",
      image: "/images/locations/genting.jpg",
      description: "",
      featured: false,
      destination: "",
      accommodation: "",
      meals: "",
      transport: "",
      itinerary: [{ day: 1, title: "", desc: "" }],
    });
    setFormError("");
    setFormSuccess("");
    setTourModalOpen(true);
  };

  const openEditTourModal = (tour) => {
    setCurrentTour({
      ...tour,
      itinerary:
        tour.itinerary && tour.itinerary.length > 0
          ? tour.itinerary
          : [{ day: 1, title: "", desc: "" }],
    });
    setFormError("");
    setFormSuccess("");
    setTourModalOpen(true);
  };

  const handleTourFieldChange = (field, value) => {
    setCurrentTour((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "name" && !prev.id) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
      }
      return updated;
    });
  };

  const addItineraryDay = () => {
    setCurrentTour((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        { day: prev.itinerary.length + 1, title: "", desc: "" },
      ],
    }));
  };

  const removeItineraryDay = (index) => {
    setCurrentTour((prev) => ({
      ...prev,
      itinerary: prev.itinerary
        .filter((_, i) => i !== index)
        .map((step, idx) => ({ ...step, day: idx + 1 })),
    }));
  };

  const handleItineraryChange = (index, field, val) => {
    setCurrentTour((prev) => {
      const updated = [...prev.itinerary];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, itinerary: updated };
    });
  };

  const saveTourSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    if (!currentTour.name || !currentTour.slug || !currentTour.price) {
      setFormError("Tour Name, Slug, and Price are required.");
      return;
    }
    setIsSaving(true);
    try {
      const payload = {
        name: currentTour.name,
        slug: currentTour.slug,
        category: currentTour.category,
        price: Number(currentTour.price),
        duration: currentTour.duration,
        image: currentTour.image,
        description: currentTour.description,
        featured: currentTour.featured,
        destination: currentTour.destination,
        accommodation: currentTour.accommodation,
        meals: currentTour.meals,
        transport: currentTour.transport,
        itinerary: currentTour.itinerary,
      };
      if (currentTour.id) {
        const { error } = await supabase
          .from("tours")
          .update(payload)
          .eq("id", currentTour.id);
        if (error) throw error;
        setFormSuccess("Tour package updated successfully!");
      } else {
        const { error } = await supabase.from("tours").insert([payload]);
        if (error) throw error;
        setFormSuccess("New tour package created successfully!");
      }
      await fetchData();
      setTimeout(() => setTourModalOpen(false), 1200);
    } catch (err) {
      setFormError(err.message || "Failed to save tour.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTour = async (id) => {
    if (!confirm("Delete this tour package? This action cannot be undone."))
      return;
    try {
      const { error } = await supabase.from("tours").delete().eq("id", id);
      if (error) throw error;
      fetchData();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  /* ── Rate CRUD ─────────────────────────────────────── */
  const openNewRateModal = () => {
    setCurrentRate({
      sheet_name: "2026 KUL FIT",
      category: "FIT",
      section_header: "",
      route_raw: "",
      from_location: "",
      to_location: "",
      tipping: "",
      notes: "",
    });
    setPricePairs([{ pax: "2-3 PAX", val: "USD" }]);
    setFormError("");
    setFormSuccess("");
    setRateModalOpen(true);
  };

  const openEditRateModal = (rate) => {
    setCurrentRate(rate);
    const pairs = Object.entries(rate.prices || {}).map(([pax, val]) => ({
      pax,
      val,
    }));
    setPricePairs(pairs.length > 0 ? pairs : [{ pax: "", val: "" }]);
    setFormError("");
    setFormSuccess("");
    setRateModalOpen(true);
  };

  const handleRateFieldChange = (field, value) =>
    setCurrentRate((prev) => ({ ...prev, [field]: value }));

  const addPricePair = () =>
    setPricePairs((prev) => [...prev, { pax: "", val: "" }]);

  const removePricePair = (idx) =>
    setPricePairs((prev) => prev.filter((_, i) => i !== idx));

  const handlePricePairChange = (idx, field, val) => {
    setPricePairs((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const saveRateSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    if (
      !currentRate.sheet_name ||
      !currentRate.route_raw ||
      !currentRate.from_location ||
      !currentRate.to_location
    ) {
      setFormError(
        "Sheet Name, Route Name, From, and To locations are required.",
      );
      return;
    }
    setIsSaving(true);
    try {
      const pricesObj = {};
      for (const pair of pricePairs) {
        if (pair.pax && pair.val) pricesObj[pair.pax.trim()] = pair.val.trim();
      }
      const payload = {
        sheet_name: currentRate.sheet_name,
        category: currentRate.category,
        section_header: currentRate.section_header,
        route_raw: currentRate.route_raw,
        from_location: currentRate.from_location,
        to_location: currentRate.to_location,
        tipping: currentRate.tipping || null,
        notes: currentRate.notes || null,
        prices: pricesObj,
      };
      if (currentRate.id) {
        const { error } = await supabase
          .from("transport_rates")
          .update(payload)
          .eq("id", currentRate.id);
        if (error) throw error;
        setFormSuccess("Transport rate updated successfully!");
      } else {
        const { error } = await supabase
          .from("transport_rates")
          .insert([payload]);
        if (error) throw error;
        setFormSuccess("New transport rate created successfully!");
      }
      await fetchData();
      setTimeout(() => setRateModalOpen(false), 1200);
    } catch (err) {
      setFormError(err.message || "Failed to save rate.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRate = async (id) => {
    if (!confirm("Delete this transport rate? This cannot be undone.")) return;
    try {
      const { error } = await supabase
        .from("transport_rates")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchData();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  /* ── Testimonial CRUD ──────────────────────────────── */
  const openNewTestimonialModal = () => {
    setCurrentTestimonial({
      name: "",
      location: "",
      trip: "",
      quote: "",
      avatar_bg: "bg-teal-500",
      initials: "",
      sort_order: testimonials.length + 1,
    });
    setFormError("");
    setFormSuccess("");
    setTestimonialModalOpen(true);
  };

  const openEditTestimonialModal = (t) => {
    setCurrentTestimonial({ ...t });
    setFormError("");
    setFormSuccess("");
    setTestimonialModalOpen(true);
  };

  const handleTestimonialFieldChange = (field, value) => {
    setCurrentTestimonial((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "name") {
        updated.initials = value
          .split(" ")
          .filter(Boolean)
          .map((w) => w[0].toUpperCase())
          .slice(0, 2)
          .join("");
      }
      return updated;
    });
  };

  const saveTestimonialSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    if (!currentTestimonial.name || !currentTestimonial.quote) {
      setFormError("Name and quote are required.");
      return;
    }
    setIsSaving(true);
    try {
      const payload = {
        name: currentTestimonial.name,
        location: currentTestimonial.location,
        trip: currentTestimonial.trip,
        quote: currentTestimonial.quote,
        avatar_bg: currentTestimonial.avatar_bg,
        initials: currentTestimonial.initials,
        sort_order: Number(currentTestimonial.sort_order) || 0,
      };
      if (currentTestimonial.id) {
        const { error } = await supabase
          .from("testimonials")
          .update(payload)
          .eq("id", currentTestimonial.id);
        if (error) throw error;
        setFormSuccess("Testimonial updated successfully!");
      } else {
        const { error } = await supabase.from("testimonials").insert([payload]);
        if (error) throw error;
        setFormSuccess("New testimonial added successfully!");
      }
      await fetchData();
      setTimeout(() => setTestimonialModalOpen(false), 1200);
    } catch (err) {
      setFormError(err.message || "Failed to save testimonial.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTestimonial = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchData();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  /* ── FAQ CRUD ──────────────────────────────────────── */
  const openNewFaqModal = () => {
    setCurrentFaq({
      question: "",
      answer: "",
      sort_order: faqs.length + 1,
    });
    setFormError("");
    setFormSuccess("");
    setFaqModalOpen(true);
  };

  const openEditFaqModal = (faq) => {
    setCurrentFaq({ ...faq });
    setFormError("");
    setFormSuccess("");
    setFaqModalOpen(true);
  };

  const handleFaqFieldChange = (field, value) =>
    setCurrentFaq((prev) => ({ ...prev, [field]: value }));

  const saveFaqSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    if (!currentFaq.question || !currentFaq.answer) {
      setFormError("Question and answer are required.");
      return;
    }
    setIsSaving(true);
    try {
      const payload = {
        question: currentFaq.question,
        answer: currentFaq.answer,
        sort_order: Number(currentFaq.sort_order) || 0,
      };
      if (currentFaq.id) {
        const { error } = await supabase
          .from("faqs")
          .update(payload)
          .eq("id", currentFaq.id);
        if (error) throw error;
        setFormSuccess("FAQ updated successfully!");
      } else {
        const { error } = await supabase.from("faqs").insert([payload]);
        if (error) throw error;
        setFormSuccess("New FAQ added successfully!");
      }
      await fetchData();
      setTimeout(() => setFaqModalOpen(false), 1200);
    } catch (err) {
      setFormError(err.message || "Failed to save FAQ.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteFaq = async (id) => {
    if (!confirm("Delete this FAQ?")) return;
    try {
      const { error } = await supabase.from("faqs").delete().eq("id", id);
      if (error) throw error;
      fetchData();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  /* ── Site Settings Save ────────────────────────────── */
  const saveHeroSettings = async (e) => {
    e.preventDefault();
    setSettingsMsg({ type: "", text: "" });
    setIsSavingSettings(true);
    try {
      const rows = Object.entries(heroSettings).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));
      const { error } = await supabase
        .from("site_settings")
        .upsert(rows, { onConflict: "key" });
      if (error) throw error;
      setSettingsMsg({
        type: "success",
        text: "Settings saved! Changes will appear on the homepage.",
      });
    } catch (err) {
      setSettingsMsg({
        type: "error",
        text: err.message || "Failed to save settings.",
      });
    } finally {
      setIsSavingSettings(false);
    }
  };

  /* ── Derived / Filtered Data ───────────────────────── */
  const filteredTours = tours.filter((tour) => {
    const s = tourSearch.toLowerCase();
    const matchSearch =
      (tour.name || "").toLowerCase().includes(s) ||
      (tour.description || "").toLowerCase().includes(s) ||
      (tour.destination || "").toLowerCase().includes(s);
    const matchCategory =
      tourCategory === "all" || tour.category === tourCategory;
    return matchSearch && matchCategory;
  });

  const filteredRates = rates.filter((rate) => {
    const s = rateSearch.toLowerCase();
    const matchSearch =
      (rate.route_raw || "").toLowerCase().includes(s) ||
      (rate.from_location || "").toLowerCase().includes(s) ||
      (rate.to_location || "").toLowerCase().includes(s);
    const matchCategory =
      rateCategory === "all" || rate.category === rateCategory;
    const matchSheet = rateSheet === "all" || rate.sheet_name === rateSheet;
    return matchSearch && matchCategory && matchSheet;
  });

  const filteredTestimonials = testimonials.filter((t) => {
    const s = testimonialSearch.toLowerCase();
    return (
      (t.name || "").toLowerCase().includes(s) ||
      (t.trip || "").toLowerCase().includes(s) ||
      (t.quote || "").toLowerCase().includes(s)
    );
  });

  const filteredFaqs = faqs.filter((faq) => {
    const s = faqSearch.toLowerCase();
    return (
      (faq.question || "").toLowerCase().includes(s) ||
      (faq.answer || "").toLowerCase().includes(s)
    );
  });

  const uniqueSheets = Array.from(
    new Set(rates.map((r) => r.sheet_name)),
  ).sort();

  /* ─────────────────────────────────────────────────────
     LOGIN SCREEN
  ───────────────────────────────────────────────────── */
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center font-sans bg-slate-950 text-slate-100 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-sky-900/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-950/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="w-full max-w-md mx-auto p-6 relative z-10">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="p-4 bg-sky-950/80 text-sky-400 rounded-2xl border border-sky-800/50 mb-4 shadow-inner">
                <Lock className="w-8 h-8 animate-pulse" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                Admin CMS Dashboard
              </h1>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed max-w-[280px]">
                Authorized access only. Enter the administrator passcode to
                manage content.
              </p>
            </div>
            {authError && (
              <div className="mb-6 bg-rose-950/50 border border-rose-900/50 text-rose-300 rounded-xl p-3 flex items-center gap-2 text-xs font-semibold">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{authError}</span>
              </div>
            )}
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                  Passcode
                </span>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white placeholder-slate-600 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-mono"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all mt-2 active:scale-[0.99] cursor-pointer"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────
     MAIN CMS DASHBOARD
  ───────────────────────────────────────────────────── */
  return (
    <>
      <Header2 isSolid={true} />
      <main className="min-h-screen bg-slate-900 font-sans text-slate-200 pt-28 pb-16 relative">
        <div className="container-large">
          {/* ── TOP BAR ─────────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1.5 text-xs text-sky-400 font-extrabold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>U2 Travels Management</span>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight uppercase">
                Content Management System
              </h1>
            </div>
            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                type="button"
                onClick={() => fetchData()}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl transition-all cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* ── STATS TILES ─────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-3">
              <div className="p-3 bg-sky-950/60 text-sky-400 rounded-xl shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-0.5">
                  Tours
                </span>
                <span className="text-2xl font-black text-white">
                  {tours.length}
                </span>
              </div>
            </div>
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-3">
              <div className="p-3 bg-emerald-950/60 text-emerald-400 rounded-xl shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-0.5">
                  Featured
                </span>
                <span className="text-2xl font-black text-white">
                  {tours.filter((t) => t.featured).length}
                </span>
              </div>
            </div>
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-3">
              <div className="p-3 bg-amber-950/60 text-amber-400 rounded-xl shrink-0">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-0.5">
                  Rates
                </span>
                <span className="text-2xl font-black text-white">
                  {rates.length}
                </span>
              </div>
            </div>
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-3">
              <div className="p-3 bg-indigo-950/60 text-indigo-400 rounded-xl shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-0.5">
                  Sheets
                </span>
                <span className="text-2xl font-black text-white">
                  {uniqueSheets.length}
                </span>
              </div>
            </div>
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-3">
              <div className="p-3 bg-purple-950/60 text-purple-400 rounded-xl shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-0.5">
                  Reviews
                </span>
                <span className="text-2xl font-black text-white">
                  {testimonials.length}
                </span>
              </div>
            </div>
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-3">
              <div className="p-3 bg-rose-950/60 text-rose-400 rounded-xl shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-0.5">
                  FAQs
                </span>
                <span className="text-2xl font-black text-white">
                  {faqs.length}
                </span>
              </div>
            </div>
          </div>

          {/* ── TAB NAVIGATION ──────────────────────── */}
          <div className="flex border-b border-slate-800 mb-8 overflow-x-auto gap-1">
            {[
              { id: "tours", label: "Tour Packages", Icon: Compass },
              { id: "rates", label: "Transport Rates", Icon: Bus },
              {
                id: "testimonials",
                label: "Testimonials",
                Icon: MessageSquare,
              },
              { id: "faqs", label: "FAQs", Icon: HelpCircle },
              { id: "settings", label: "Site Settings", Icon: Settings },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`pb-4 px-5 font-extrabold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTab === id
                    ? "border-sky-500 text-sky-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* ── CONTENT ─────────────────────────────── */}
          {loading
            ? <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
                <span className="text-slate-400 font-bold text-xs uppercase tracking-wider">
                  Connecting to Supabase...
                </span>
              </div>
            : <>
                {/* ════════════ TOURS TAB ════════════ */}
                {activeTab === "tours" && (
                  <div>
                    {/* Filter bar */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                      <div className="flex flex-1 flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                        <div className="relative flex-1 max-w-md">
                          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
                          <input
                            type="text"
                            placeholder="Search tours by name, destination..."
                            value={tourSearch}
                            onChange={(e) => setTourSearch(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-300 outline-none focus:border-sky-500 transition-all"
                          />
                        </div>
                        <div className="relative">
                          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
                          <select
                            value={tourCategory}
                            onChange={(e) => setTourCategory(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-6 text-xs font-bold uppercase tracking-wider text-slate-400 outline-none cursor-pointer focus:border-sky-500 appearance-none"
                          >
                            <option value="all">All Regions</option>
                            <option value="malaysian">Malaysian Local</option>
                            <option value="world">International World</option>
                            <option value="sightseeing">Day Tours</option>
                          </select>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={openNewTourModal}
                        className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        Add Tour Package
                      </button>
                    </div>

                    {/* Table */}
                    {filteredTours.length === 0
                      ? <div className="text-center py-16 bg-slate-950/20 border border-slate-800/80 rounded-2xl">
                          <p className="text-slate-500 text-sm font-bold">
                            No tour packages match your filters.
                          </p>
                        </div>
                      : <div className="bg-slate-950/30 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-950/60 border-b border-slate-800 text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">
                                  <th className="p-4 pl-6">Package Name</th>
                                  <th className="p-4">Region</th>
                                  <th className="p-4">Duration</th>
                                  <th className="p-4">Price (MYR)</th>
                                  <th className="p-4">Featured</th>
                                  <th className="p-4 pr-6 text-right">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-800/60">
                                {filteredTours.map((tour) => (
                                  <tr
                                    key={tour.id}
                                    className="hover:bg-slate-900/40 transition-colors"
                                  >
                                    <td className="p-4 pl-6">
                                      <div className="font-bold text-white text-sm">
                                        {tour.name}
                                      </div>
                                      <div className="text-xs text-slate-500 mt-0.5 font-mono">
                                        /{tour.slug}
                                      </div>
                                    </td>
                                    <td className="p-4 text-xs font-semibold capitalize text-slate-300">
                                      {tour.category}
                                    </td>
                                    <td className="p-4 text-xs text-slate-300 font-medium">
                                      {tour.duration}
                                    </td>
                                    <td className="p-4 text-sm font-bold text-sky-400">
                                      MYR {tour.price}
                                    </td>
                                    <td className="p-4">
                                      {tour.featured
                                        ? <span className="inline-block bg-emerald-950/50 border border-emerald-800/60 text-emerald-400 font-extrabold text-[9px] uppercase tracking-wider rounded-md px-2 py-0.5">
                                            Yes
                                          </span>
                                        : <span className="text-slate-600 text-xs">
                                            —
                                          </span>}
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                      <div className="flex items-center justify-end gap-2">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            openEditTourModal(tour)
                                          }
                                          className="p-2 bg-slate-800 hover:bg-sky-950 hover:text-sky-400 rounded-lg transition-colors border border-slate-700/60 hover:border-sky-800 cursor-pointer"
                                          title="Edit"
                                        >
                                          <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => deleteTour(tour.id)}
                                          className="p-2 bg-slate-800 hover:bg-rose-950 hover:text-rose-400 rounded-lg transition-colors border border-slate-700/60 hover:border-rose-900 cursor-pointer"
                                          title="Delete"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>}
                  </div>
                )}

                {/* ════════════ RATES TAB ════════════ */}
                {activeTab === "rates" && (
                  <div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                      <div className="flex flex-1 flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                        <div className="relative flex-1 max-w-sm">
                          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
                          <input
                            type="text"
                            placeholder="Search routes/locations..."
                            value={rateSearch}
                            onChange={(e) => setRateSearch(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-300 outline-none focus:border-sky-500 transition-all"
                          />
                        </div>
                        <select
                          value={rateCategory}
                          onChange={(e) => setRateCategory(e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-400 outline-none cursor-pointer focus:border-sky-500 appearance-none"
                        >
                          <option value="all">All Types</option>
                          <option value="FIT">Private Sedan/Vans (FIT)</option>
                          <option value="COACH">Bus Coaches (COACH)</option>
                        </select>
                        <select
                          value={rateSheet}
                          onChange={(e) => setRateSheet(e.target.value)}
                          className="bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-slate-400 outline-none cursor-pointer focus:border-sky-500 appearance-none"
                        >
                          <option value="all">All Sheets</option>
                          {uniqueSheets.map((sheet) => (
                            <option key={sheet} value={sheet}>
                              {sheet}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={openNewRateModal}
                        className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        Add Transport Rate
                      </button>
                    </div>

                    {filteredRates.length === 0
                      ? <div className="text-center py-16 bg-slate-950/20 border border-slate-800/80 rounded-2xl">
                          <p className="text-slate-500 text-sm font-bold">
                            No transport rates match your filters.
                          </p>
                        </div>
                      : <div className="bg-slate-950/30 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-950/60 border-b border-slate-800 text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">
                                  <th className="p-4 pl-6">Sheet / Category</th>
                                  <th className="p-4">Route Info</th>
                                  <th className="p-4">Prices (USD)</th>
                                  <th className="p-4">Tipping / Notes</th>
                                  <th className="p-4 pr-6 text-right">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-800/60">
                                {filteredRates.map((rate) => (
                                  <tr
                                    key={rate.id}
                                    className="hover:bg-slate-900/40 transition-colors"
                                  >
                                    <td className="p-4 pl-6">
                                      <div className="font-bold text-white text-xs">
                                        {rate.sheet_name}
                                      </div>
                                      <span className="inline-block bg-slate-800 text-slate-400 font-black text-[9px] uppercase tracking-wider rounded px-1.5 py-0.5 mt-1">
                                        {rate.category}
                                      </span>
                                    </td>
                                    <td className="p-4">
                                      <div className="text-sm font-bold text-slate-100">
                                        {rate.route_raw}
                                      </div>
                                      <div className="text-[11px] text-slate-400 mt-1">
                                        {rate.from_location}{" "}
                                        <span className="text-slate-600">
                                          →
                                        </span>{" "}
                                        {rate.to_location}
                                      </div>
                                      {rate.section_header && (
                                        <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wide">
                                          {rate.section_header}
                                        </div>
                                      )}
                                    </td>
                                    <td className="p-4 min-w-[180px]">
                                      <div className="flex flex-col gap-1 text-[11px]">
                                        {Object.entries(rate.prices || {}).map(
                                          ([pax, val]) => (
                                            <div
                                              key={pax}
                                              className="flex justify-between border-b border-slate-800/40 pb-0.5"
                                            >
                                              <span className="text-slate-500">
                                                {pax}:
                                              </span>
                                              <span className="text-amber-400 font-bold">
                                                {val}
                                              </span>
                                            </div>
                                          ),
                                        )}
                                        {Object.keys(rate.prices || {})
                                          .length === 0 && (
                                          <span className="text-slate-600 italic">
                                            No prices set
                                          </span>
                                        )}
                                      </div>
                                    </td>
                                    <td className="p-4 text-xs text-slate-400 max-w-[220px]">
                                      {rate.tipping && (
                                        <div className="mb-1 text-[11px]">
                                          <span className="text-slate-500 text-[9px] font-black uppercase">
                                            Tipping:
                                          </span>{" "}
                                          {rate.tipping}
                                        </div>
                                      )}
                                      {rate.notes && (
                                        <div
                                          className="text-slate-500 text-[11px] line-clamp-2"
                                          title={rate.notes}
                                        >
                                          {rate.notes}
                                        </div>
                                      )}
                                    </td>
                                    <td className="p-4 pr-6 text-right">
                                      <div className="flex items-center justify-end gap-2">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            openEditRateModal(rate)
                                          }
                                          className="p-2 bg-slate-800 hover:bg-sky-950 hover:text-sky-400 rounded-lg transition-colors border border-slate-700/60 hover:border-sky-800 cursor-pointer"
                                          title="Edit"
                                        >
                                          <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => deleteRate(rate.id)}
                                          className="p-2 bg-slate-800 hover:bg-rose-950 hover:text-rose-400 rounded-lg transition-colors border border-slate-700/60 hover:border-rose-900 cursor-pointer"
                                          title="Delete"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>}
                  </div>
                )}

                {/* ════════════ TESTIMONIALS TAB ════════════ */}
                {activeTab === "testimonials" && (
                  <div>
                    {!testimonialsReady
                      ? <TableNotReady
                          tableName="testimonials"
                          sql={TESTIMONIALS_SQL}
                          onRetry={fetchData}
                        />
                      : <>
                          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                            <div className="relative flex-1 max-w-md">
                              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
                              <input
                                type="text"
                                placeholder="Search testimonials..."
                                value={testimonialSearch}
                                onChange={(e) =>
                                  setTestimonialSearch(e.target.value)
                                }
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-300 outline-none focus:border-sky-500 transition-all"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={openNewTestimonialModal}
                              className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Plus className="w-4 h-4" />
                              Add Testimonial
                            </button>
                          </div>

                          {filteredTestimonials.length === 0
                            ? <div className="text-center py-16 bg-slate-950/20 border border-slate-800/80 rounded-2xl">
                                <p className="text-slate-500 text-sm font-bold">
                                  No testimonials yet. Add your first one!
                                </p>
                              </div>
                            : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredTestimonials.map((t) => (
                                  <div
                                    key={t.id}
                                    className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 flex flex-col gap-3"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`w-10 h-10 rounded-full ${t.avatar_bg || "bg-teal-500"} text-white flex items-center justify-center font-bold text-sm shrink-0`}
                                      >
                                        {t.initials}
                                      </div>
                                      <div className="min-w-0">
                                        <div className="font-bold text-white text-sm truncate">
                                          {t.name}
                                        </div>
                                        <div className="text-xs text-slate-400 truncate">
                                          {t.location}
                                        </div>
                                      </div>
                                    </div>
                                    {t.trip && (
                                      <div className="text-xs font-semibold text-sky-400">
                                        {t.trip}
                                      </div>
                                    )}
                                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 italic flex-1">
                                      &ldquo;{t.quote}&rdquo;
                                    </p>
                                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                                      <span className="text-[10px] text-slate-600 uppercase tracking-wider">
                                        Order: {t.sort_order}
                                      </span>
                                      <div className="flex gap-2">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            openEditTestimonialModal(t)
                                          }
                                          className="p-1.5 bg-slate-800 hover:bg-sky-950 hover:text-sky-400 rounded-lg transition-colors border border-slate-700/60 hover:border-sky-800 cursor-pointer"
                                          title="Edit"
                                        >
                                          <Edit2 className="w-3 h-3" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            deleteTestimonial(t.id)
                                          }
                                          className="p-1.5 bg-slate-800 hover:bg-rose-950 hover:text-rose-400 rounded-lg transition-colors border border-slate-700/60 hover:border-rose-900 cursor-pointer"
                                          title="Delete"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>}
                        </>}
                  </div>
                )}

                {/* ════════════ FAQs TAB ════════════ */}
                {activeTab === "faqs" && (
                  <div>
                    {!faqsReady
                      ? <TableNotReady
                          tableName="faqs"
                          sql={FAQS_SQL}
                          onRetry={fetchData}
                        />
                      : <>
                          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                            <div className="relative flex-1 max-w-md">
                              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
                              <input
                                type="text"
                                placeholder="Search FAQs..."
                                value={faqSearch}
                                onChange={(e) => setFaqSearch(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-300 outline-none focus:border-sky-500 transition-all"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={openNewFaqModal}
                              className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <Plus className="w-4 h-4" />
                              Add FAQ
                            </button>
                          </div>

                          {filteredFaqs.length === 0
                            ? <div className="text-center py-16 bg-slate-950/20 border border-slate-800/80 rounded-2xl">
                                <p className="text-slate-500 text-sm font-bold">
                                  No FAQs yet. Add your first one!
                                </p>
                              </div>
                            : <div className="flex flex-col gap-3">
                                {filteredFaqs.map((faq, idx) => (
                                  <div
                                    key={faq.id}
                                    className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-5 flex gap-4 items-start"
                                  >
                                    <div className="bg-sky-950 border border-sky-800/50 text-sky-400 font-extrabold text-xs h-7 w-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                      {idx + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-bold text-white text-sm mb-2">
                                        {faq.question}
                                      </div>
                                      <div className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                                        {faq.answer}
                                      </div>
                                      <div className="text-[10px] text-slate-600 mt-2 uppercase tracking-wider">
                                        Sort order: {faq.sort_order}
                                      </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => openEditFaqModal(faq)}
                                        className="p-1.5 bg-slate-800 hover:bg-sky-950 hover:text-sky-400 rounded-lg transition-colors border border-slate-700/60 hover:border-sky-800 cursor-pointer"
                                        title="Edit"
                                      >
                                        <Edit2 className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => deleteFaq(faq.id)}
                                        className="p-1.5 bg-slate-800 hover:bg-rose-950 hover:text-rose-400 rounded-lg transition-colors border border-slate-700/60 hover:border-rose-900 cursor-pointer"
                                        title="Delete"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>}
                        </>}
                  </div>
                )}

                {/* ════════════ SITE SETTINGS TAB ════════════ */}
                {activeTab === "settings" && (
                  <div>
                    {!settingsReady && (
                      <div className="mb-6">
                        <TableNotReady
                          tableName="site_settings"
                          sql={SETTINGS_SQL}
                          onRetry={fetchData}
                        />
                      </div>
                    )}

                    <div className="bg-slate-950/30 border border-slate-800/80 rounded-2xl p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-800">
                        <div className="p-2.5 bg-sky-950/60 text-sky-400 rounded-xl shrink-0">
                          <Globe className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-black text-white uppercase tracking-wide">
                            Homepage Hero Banner
                          </h3>
                          <p className="text-slate-500 text-xs mt-0.5">
                            Edit the hero section text on the homepage. Requires
                            the{" "}
                            <code className="text-amber-400 font-mono">
                              site_settings
                            </code>{" "}
                            table to be created.
                          </p>
                        </div>
                      </div>

                      {settingsMsg.text && (
                        <div
                          className={`mb-6 rounded-xl p-4 flex items-center gap-2 text-sm font-semibold ${
                            settingsMsg.type === "success"
                              ? "bg-emerald-950/50 border border-emerald-900/50 text-emerald-300"
                              : "bg-rose-950/50 border border-rose-900/50 text-rose-300"
                          }`}
                        >
                          {settingsMsg.type === "success"
                            ? <CheckCircle2 className="w-5 h-5 shrink-0" />
                            : <AlertCircle className="w-5 h-5 shrink-0" />}
                          <span>{settingsMsg.text}</span>
                        </div>
                      )}

                      <form
                        onSubmit={saveHeroSettings}
                        className="flex flex-col gap-5"
                      >
                        <div>
                          <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                            Badge Text (small label above the headline)
                          </span>
                          <input
                            type="text"
                            value={heroSettings.hero_badge}
                            onChange={(e) =>
                              setHeroSettings((p) => ({
                                ...p,
                                hero_badge: e.target.value,
                              }))
                            }
                            placeholder="e.g. 18+ Years of Curated Journeys"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
                          />
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                            Subtitle / Description Paragraph
                          </span>
                          <textarea
                            rows={3}
                            value={heroSettings.hero_subtitle}
                            onChange={(e) =>
                              setHeroSettings((p) => ({
                                ...p,
                                hero_subtitle: e.target.value,
                              }))
                            }
                            placeholder="A short description displayed below the main headline..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all leading-normal"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                              Primary Button Label
                            </span>
                            <input
                              type="text"
                              value={heroSettings.hero_cta_primary}
                              onChange={(e) =>
                                setHeroSettings((p) => ({
                                  ...p,
                                  hero_cta_primary: e.target.value,
                                }))
                              }
                              placeholder="e.g. View All Tours"
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                              Secondary Button Label
                            </span>
                            <input
                              type="text"
                              value={heroSettings.hero_cta_secondary}
                              onChange={(e) =>
                                setHeroSettings((p) => ({
                                  ...p,
                                  hero_cta_secondary: e.target.value,
                                }))
                              }
                              placeholder="e.g. Contact Us"
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            type="submit"
                            disabled={isSavingSettings || !settingsReady}
                            className="bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <Save className="w-4 h-4" />
                            {isSavingSettings ? "Saving..." : "Save Settings"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </>}
        </div>
      </main>

      {/* ══════════════════════════════════════════
          TOUR MODAL
      ══════════════════════════════════════════ */}
      {tourModalOpen && currentTour && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-start justify-center p-4 pt-16">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl p-6 md:p-8 mb-8">
            <div className="flex justify-between items-center pb-6 border-b border-slate-800 mb-6">
              <h3 className="text-xl font-black text-white uppercase tracking-wide">
                {currentTour.id
                  ? "Edit Tour Package"
                  : "Create New Tour Package"}
              </h3>
              <button
                type="button"
                onClick={() => setTourModalOpen(false)}
                className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-5 bg-rose-950/50 border border-rose-900/50 text-rose-300 rounded-xl p-4 flex items-center gap-2 text-sm font-semibold">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="mb-5 bg-emerald-950/50 border border-emerald-900/50 text-emerald-300 rounded-xl p-4 flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                {formSuccess}
              </div>
            )}

            <form onSubmit={saveTourSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Package Name *
                  </span>
                  <input
                    type="text"
                    value={currentTour.name}
                    onChange={(e) =>
                      handleTourFieldChange("name", e.target.value)
                    }
                    placeholder="e.g. 3D2N Tioman Beach Escape"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all font-semibold"
                    required
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    URL Slug (auto-generated) *
                  </span>
                  <input
                    type="text"
                    value={currentTour.slug}
                    onChange={(e) =>
                      handleTourFieldChange("slug", e.target.value)
                    }
                    placeholder="e.g. 3d2n-tioman-beach-escape"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all font-mono"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Region *
                  </span>
                  <select
                    value={currentTour.category}
                    onChange={(e) =>
                      handleTourFieldChange("category", e.target.value)
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
                  >
                    <option value="malaysian">Malaysian Local</option>
                    <option value="world">International World</option>
                    <option value="sightseeing">Day Tours</option>
                  </select>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Starting Price (MYR) *
                  </span>
                  <input
                    type="number"
                    value={currentTour.price}
                    onChange={(e) =>
                      handleTourFieldChange("price", e.target.value)
                    }
                    placeholder="399"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Duration
                  </span>
                  <input
                    type="text"
                    value={currentTour.duration}
                    onChange={(e) =>
                      handleTourFieldChange("duration", e.target.value)
                    }
                    placeholder="e.g. 3 Days, 2 Nights"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              <div className="bg-slate-950/60 p-5 border border-slate-800/80 rounded-2xl">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-3">
                  Tour Package Display Image *
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  {/* Option A: Upload File to Supabase Storage */}
                  <div className="bg-slate-900 border border-slate-800/90 rounded-xl p-4 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" /> Option A: Upload
                        Image File
                      </span>
                      <span className="text-[9px] bg-sky-950 text-sky-300 font-extrabold uppercase px-2 py-0.5 rounded border border-sky-800/50">
                        Supabase Storage
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Upload directly to your Supabase{" "}
                      <code className="text-amber-400 font-mono">
                        tour-images
                      </code>{" "}
                      bucket.
                    </p>
                    <label className="mt-1 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 shadow-md w-full text-center">
                      <Upload className="w-4 h-4" />
                      {isUploadingImage
                        ? "Uploading to Supabase..."
                        : "Choose Image File"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Option B: Paste External Link / URL */}
                  <div className="bg-slate-900 border border-slate-800/90 rounded-xl p-4 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" /> Option B: Add Image
                        Link / URL
                      </span>
                      <span className="text-[9px] bg-emerald-950 text-emerald-300 font-extrabold uppercase px-2 py-0.5 rounded border border-emerald-800/50">
                        Direct Link
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Paste any direct image URL (Unsplash, Pexels, CDN, or
                      local path).
                    </p>
                    <input
                      type="text"
                      value={currentTour.image}
                      onChange={(e) =>
                        handleTourFieldChange("image", e.target.value)
                      }
                      placeholder="e.g. https://images.unsplash.com/... or /images/..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white text-xs outline-none focus:border-emerald-500 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Active Image Preview Box */}
                {currentTour.image && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                      {/* biome-ignore lint/performance/noImgElement: admin preview thumbnail */}
                      <img
                        src={currentTour.image}
                        alt="Active Package Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/images/locations/locations-1.jpg";
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">
                        Active Image Link / Path
                      </span>
                      <span
                        className="text-xs text-sky-300 font-mono block truncate"
                        title={currentTour.image}
                      >
                        {currentTour.image}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                  Destinations (comma-separated)
                </span>
                <input
                  type="text"
                  value={currentTour.destination}
                  onChange={(e) =>
                    handleTourFieldChange("destination", e.target.value)
                  }
                  placeholder="e.g. Pahang, Malaysia"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Accommodation
                  </span>
                  <input
                    type="text"
                    value={currentTour.accommodation}
                    onChange={(e) =>
                      handleTourFieldChange("accommodation", e.target.value)
                    }
                    placeholder="e.g. 4-Star Beachside Villa"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Meals Plan
                  </span>
                  <input
                    type="text"
                    value={currentTour.meals}
                    onChange={(e) =>
                      handleTourFieldChange("meals", e.target.value)
                    }
                    placeholder="e.g. Daily Breakfast"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Transport Options
                  </span>
                  <input
                    type="text"
                    value={currentTour.transport}
                    onChange={(e) =>
                      handleTourFieldChange("transport", e.target.value)
                    }
                    placeholder="e.g. Return Shuttles & Ferry"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                  Short Description
                </span>
                <textarea
                  rows={3}
                  value={currentTour.description}
                  onChange={(e) =>
                    handleTourFieldChange("description", e.target.value)
                  }
                  placeholder="Summarize the tour package experience..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all leading-normal"
                />
              </div>

              <div className="flex items-center gap-3 bg-slate-950/60 p-4 border border-slate-800/80 rounded-xl">
                <input
                  type="checkbox"
                  id="tourFeaturedCk"
                  checked={currentTour.featured}
                  onChange={(e) =>
                    handleTourFieldChange("featured", e.target.checked)
                  }
                  className="w-4 h-4 rounded text-sky-500 bg-slate-900 border-slate-800 focus:ring-sky-500 cursor-pointer"
                />
                <label
                  htmlFor="tourFeaturedCk"
                  className="text-xs font-bold text-slate-200 select-none cursor-pointer"
                >
                  Feature this package on homepage hero sliders & recommended
                  items.
                </label>
              </div>

              {/* Itinerary Builder */}
              <div className="border-t border-slate-800 pt-6">
                <div className="flex justify-between items-center mb-5">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">
                    Day-by-Day Itinerary
                  </h4>
                  <button
                    type="button"
                    onClick={addItineraryDay}
                    className="bg-slate-800 hover:bg-slate-700 text-sky-400 font-extrabold text-[10px] uppercase tracking-wider py-1.5 px-3 rounded-lg border border-slate-700/60 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Day
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {currentTour.itinerary.map((step, index) => (
                    <div
                      key={`day-${step.day}`}
                      className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 flex gap-4 items-start"
                    >
                      <div className="bg-sky-950 border border-sky-800/50 text-sky-400 font-extrabold text-xs h-7 w-7 rounded-full flex items-center justify-center shrink-0">
                        {step.day}
                      </div>
                      <div className="flex-1 grid grid-cols-1 gap-3">
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) =>
                            handleItineraryChange(
                              index,
                              "title",
                              e.target.value,
                            )
                          }
                          placeholder="Day Title (e.g. Arrival & Check-in)"
                          className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white text-xs font-bold outline-none focus:border-sky-500 w-full"
                        />
                        <textarea
                          rows={2}
                          value={step.desc}
                          onChange={(e) =>
                            handleItineraryChange(index, "desc", e.target.value)
                          }
                          placeholder="Describe the activities, locations visited, meals planned..."
                          className="bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-white text-xs outline-none focus:border-sky-500 leading-normal w-full"
                        />
                      </div>
                      {currentTour.itinerary.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItineraryDay(index)}
                          className="p-1.5 text-slate-600 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-all shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800 pt-5 flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setTourModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl border border-slate-700/60 cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:opacity-60 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Save Tour Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          RATE MODAL
      ══════════════════════════════════════════ */}
      {rateModalOpen && currentRate && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-start justify-center p-4 pt-16">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl p-6 md:p-8 mb-8">
            <div className="flex justify-between items-center pb-6 border-b border-slate-800 mb-6">
              <h3 className="text-xl font-black text-white uppercase tracking-wide">
                {currentRate.id ? "Edit Transport Rate" : "Add Transport Rate"}
              </h3>
              <button
                type="button"
                onClick={() => setRateModalOpen(false)}
                className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-5 bg-rose-950/50 border border-rose-900/50 text-rose-300 rounded-xl p-4 flex items-center gap-2 text-sm font-semibold">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="mb-5 bg-emerald-950/50 border border-emerald-900/50 text-emerald-300 rounded-xl p-4 flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                {formSuccess}
              </div>
            )}

            <form onSubmit={saveRateSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Sheet Location *
                  </span>
                  <input
                    type="text"
                    value={currentRate.sheet_name}
                    onChange={(e) =>
                      handleRateFieldChange("sheet_name", e.target.value)
                    }
                    placeholder="e.g. 2026 KUL FIT"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-xs outline-none focus:border-sky-500 font-semibold"
                    required
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Vehicle Category *
                  </span>
                  <select
                    value={currentRate.category}
                    onChange={(e) =>
                      handleRateFieldChange("category", e.target.value)
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-xs outline-none focus:border-sky-500 cursor-pointer"
                  >
                    <option value="FIT">Private Sedan/Vans (FIT)</option>
                    <option value="COACH">Coaches/Buses (COACH)</option>
                  </select>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                  Section Header Grouping
                </span>
                <input
                  type="text"
                  value={currentRate.section_header}
                  onChange={(e) =>
                    handleRateFieldChange("section_header", e.target.value)
                  }
                  placeholder="e.g. KLIA Transfers"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-xs outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                  Route Display Label *
                </span>
                <input
                  type="text"
                  value={currentRate.route_raw}
                  onChange={(e) =>
                    handleRateFieldChange("route_raw", e.target.value)
                  }
                  placeholder="e.g. KLIA - KUL HOTEL"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-xs font-bold outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Origin Point *
                  </span>
                  <input
                    type="text"
                    value={currentRate.from_location}
                    onChange={(e) =>
                      handleRateFieldChange("from_location", e.target.value)
                    }
                    placeholder="e.g. KLIA"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-xs outline-none focus:border-sky-500"
                    required
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Destination Point *
                  </span>
                  <input
                    type="text"
                    value={currentRate.to_location}
                    onChange={(e) =>
                      handleRateFieldChange("to_location", e.target.value)
                    }
                    placeholder="e.g. KUL HOTEL"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-xs outline-none focus:border-sky-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Tipping (USD)
                  </span>
                  <input
                    type="text"
                    value={currentRate.tipping || ""}
                    onChange={(e) =>
                      handleRateFieldChange("tipping", e.target.value)
                    }
                    placeholder="e.g. USD7.00"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-xs outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Notes
                  </span>
                  <input
                    type="text"
                    value={currentRate.notes || ""}
                    onChange={(e) =>
                      handleRateFieldChange("notes", e.target.value)
                    }
                    placeholder="e.g. Max Capacity: 10 Pax"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-xs outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    Price Tiers by Pax Size
                  </h4>
                  <button
                    type="button"
                    onClick={addPricePair}
                    className="bg-slate-800 hover:bg-slate-700 text-sky-400 font-extrabold text-[9px] uppercase tracking-wider py-1 px-2.5 rounded border border-slate-700/60 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Tier
                  </button>
                </div>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                  {pricePairs.map((pair, idx) => (
                    <div
                      key={`${pair.pax || "pair"}-${idx}`}
                      className="flex gap-2 items-center"
                    >
                      <input
                        type="text"
                        value={pair.pax}
                        onChange={(e) =>
                          handlePricePairChange(idx, "pax", e.target.value)
                        }
                        placeholder="e.g. 2-3 PAX"
                        className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-white text-xs font-semibold flex-1 outline-none focus:border-sky-500"
                      />
                      <input
                        type="text"
                        value={pair.val}
                        onChange={(e) =>
                          handlePricePairChange(idx, "val", e.target.value)
                        }
                        placeholder="e.g. USD35.00"
                        className="bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-amber-400 text-xs font-bold flex-1 outline-none focus:border-sky-500"
                      />
                      {pricePairs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePricePair(idx)}
                          className="p-1.5 text-slate-600 hover:text-rose-400 rounded transition-all hover:bg-slate-950 shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800 pt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRateModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-xs uppercase tracking-wider py-3 px-5 rounded-xl border border-slate-700/60 cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:opacity-60 text-white font-extrabold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Save Transport Rate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          TESTIMONIAL MODAL
      ══════════════════════════════════════════ */}
      {testimonialModalOpen && currentTestimonial && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-start justify-center p-4 pt-16">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl p-6 md:p-8 mb-8">
            <div className="flex justify-between items-center pb-6 border-b border-slate-800 mb-6">
              <h3 className="text-xl font-black text-white uppercase tracking-wide">
                {currentTestimonial.id ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button
                type="button"
                onClick={() => setTestimonialModalOpen(false)}
                className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-5 bg-rose-950/50 border border-rose-900/50 text-rose-300 rounded-xl p-4 flex items-center gap-2 text-sm font-semibold">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="mb-5 bg-emerald-950/50 border border-emerald-900/50 text-emerald-300 rounded-xl p-4 flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                {formSuccess}
              </div>
            )}

            <form
              onSubmit={saveTestimonialSubmit}
              className="flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Customer Name *
                  </span>
                  <input
                    type="text"
                    value={currentTestimonial.name}
                    onChange={(e) =>
                      handleTestimonialFieldChange("name", e.target.value)
                    }
                    placeholder="e.g. Aishah Ahmad"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Initials (auto-generated)
                  </span>
                  <input
                    type="text"
                    value={currentTestimonial.initials}
                    onChange={(e) =>
                      handleTestimonialFieldChange("initials", e.target.value)
                    }
                    placeholder="e.g. AA"
                    maxLength={2}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all font-bold uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Location
                  </span>
                  <input
                    type="text"
                    value={currentTestimonial.location}
                    onChange={(e) =>
                      handleTestimonialFieldChange("location", e.target.value)
                    }
                    placeholder="e.g. Kuala Lumpur, Malaysia"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                    Tour / Trip Name
                  </span>
                  <input
                    type="text"
                    value={currentTestimonial.trip}
                    onChange={(e) =>
                      handleTestimonialFieldChange("trip", e.target.value)
                    }
                    placeholder="e.g. 3D2N Kota Kinabalu"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                  Review Quote *
                </span>
                <textarea
                  rows={4}
                  value={currentTestimonial.quote}
                  onChange={(e) =>
                    handleTestimonialFieldChange("quote", e.target.value)
                  }
                  placeholder="The customer's testimonial review..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all leading-normal"
                  required
                />
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-3">
                  Avatar Background Color
                </span>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_COLORS.map(({ cls, label }) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() =>
                        handleTestimonialFieldChange("avatar_bg", cls)
                      }
                      className={`w-8 h-8 rounded-full ${cls} border-2 transition-all cursor-pointer ${
                        currentTestimonial.avatar_bg === cls
                          ? "border-white scale-110 shadow-lg"
                          : "border-transparent hover:border-slate-400 hover:scale-105"
                      }`}
                      title={label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                  Sort Order (lower = shown first)
                </span>
                <input
                  type="number"
                  value={currentTestimonial.sort_order}
                  onChange={(e) =>
                    handleTestimonialFieldChange("sort_order", e.target.value)
                  }
                  min={0}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
                />
              </div>

              <div className="border-t border-slate-800 pt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setTestimonialModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-xs uppercase tracking-wider py-3 px-5 rounded-xl border border-slate-700/60 cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:opacity-60 text-white font-extrabold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          FAQ MODAL
      ══════════════════════════════════════════ */}
      {faqModalOpen && currentFaq && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-start justify-center p-4 pt-16">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl p-6 md:p-8 mb-8">
            <div className="flex justify-between items-center pb-6 border-b border-slate-800 mb-6">
              <h3 className="text-xl font-black text-white uppercase tracking-wide">
                {currentFaq.id ? "Edit FAQ" : "Add FAQ"}
              </h3>
              <button
                type="button"
                onClick={() => setFaqModalOpen(false)}
                className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-5 bg-rose-950/50 border border-rose-900/50 text-rose-300 rounded-xl p-4 flex items-center gap-2 text-sm font-semibold">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                {formError}
              </div>
            )}
            {formSuccess && (
              <div className="mb-5 bg-emerald-950/50 border border-emerald-900/50 text-emerald-300 rounded-xl p-4 flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                {formSuccess}
              </div>
            )}

            <form onSubmit={saveFaqSubmit} className="flex flex-col gap-5">
              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                  Question *
                </span>
                <input
                  type="text"
                  value={currentFaq.question}
                  onChange={(e) =>
                    handleFaqFieldChange("question", e.target.value)
                  }
                  placeholder="e.g. How do I book a tour package?"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all font-semibold"
                  required
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                  Answer *
                </span>
                <textarea
                  rows={5}
                  value={currentFaq.answer}
                  onChange={(e) =>
                    handleFaqFieldChange("answer", e.target.value)
                  }
                  placeholder="Provide a clear and helpful answer..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all leading-normal"
                  required
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block mb-2">
                  Sort Order (lower = shown first)
                </span>
                <input
                  type="number"
                  value={currentFaq.sort_order}
                  onChange={(e) =>
                    handleFaqFieldChange("sort_order", e.target.value)
                  }
                  min={0}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-white text-sm outline-none focus:border-sky-500 transition-all"
                />
              </div>
              <div className="border-t border-slate-800 pt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setFaqModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-xs uppercase tracking-wider py-3 px-5 rounded-xl border border-slate-700/60 cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:opacity-60 text-white font-extrabold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Save FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

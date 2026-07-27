"use client";

import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    phone: "",
    agreeToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("First and Last Name are required.");
      return;
    }
    if (!formData.businessName.trim()) {
      setError("Business Name is required.");
      return;
    }
    if (!formData.email.trim()) {
      setError("Email Address is required.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true);

    try {
      const { error: subErr } = await supabase
        .from("agent_registrations")
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            business_name: formData.businessName,
            email: formData.email,
            phone: formData.phone,
            agree_to_terms: formData.agreeToTerms,
          },
        ]);

      if (subErr) {
        console.error("Supabase insert error (agent_registrations):", subErr);
      }

      setIsLoading(false);
      setSuccess(
        "Registration successful! Our agent verification team will contact you shortly.",
      );

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        businessName: "",
        email: "",
        phone: "",
        agreeToTerms: false,
      });

      // Redirect home after delay
      setTimeout(() => {
        router.push("/");
      }, 3500);
    } catch (err) {
      console.error("Registration error:", err);
      setIsLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner fullScreen={true} />}
      <main className="w-full min-h-screen flex font-sans bg-white text-slate-900 overflow-x-hidden">
        {/* LEFT SIDE: Brand & Benefits (Langkawi / KL Parallax background) */}
        <div className="hidden lg:flex w-[45%] relative bg-[#013b85] flex-col justify-between p-16 xl:p-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.pexels.com/photos/28277444/pexels-photo-28277444.jpeg"
              alt="Malaysia Travel U2 Travels B2B Partnership"
              fill
              priority
              className="object-cover object-center scale-102"
              style={{ filter: "brightness(0.22) contrast(1.1)" }}
            />
            {/* Elegant overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-[#013b85]/40 to-slate-950/20 z-10" />
          </div>

          {/* Top Logo */}
          <div className="relative z-20">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-white no-underline group"
            >
              <ArrowLeft className="h-4 w-4 text-white group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest text-[#dfa447]">
                Back to Homepage
              </span>
            </Link>
          </div>

          {/* Title & Benefits */}
          <div className="relative z-20 max-w-md my-auto">
            <span className="text-[#dfa447] text-xs font-black uppercase tracking-[0.25em] mb-4 block">
              B2B Partner Network
            </span>
            <p
              className="text-white text-4xl xl:text-7xl font-normal leading-[1.1] mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Partner with <br />
              <span className="italic text-[#dfa447]">U2 Travels</span>
            </p>
            <p className="text-slate-300 text-sm leading-relaxed font-light mb-8">
              Become an authorized B2B partner and unlock exclusive wholesale
              rates, custom tour itineraries, and direct ground fleets across
              Malaysia.
            </p>

            {/* Benefits Checkbox List */}
            <div className="flex flex-col gap-5 pt-4 border-t border-white/10">
              <div className="flex items-start gap-4">
                <div className="bg-[#dfa447] text-white p-1 rounded-lg text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    Direct Agent Rates
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Access wholesale pricing on Malaysian & World Tours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#dfa447] text-white p-1 rounded-lg text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    Instant Quotation Builder
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Draft client itineraries, transport lists, and invoices in
                    seconds.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#dfa447] text-white p-1 rounded-lg text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    Luxury Transport Access
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Instantly reserve luxury MPVs, commuter vans, and coaches.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Footer */}
          <div className="relative z-20 text-slate-400/60 text-xs font-medium">
            © {new Date().getFullYear()} U2 Travels & Tours. All rights
            reserved.
          </div>
        </div>

        {/* RIGHT SIDE: Standalone Registration Form */}
        <div className="w-full lg:w-[55%] flex flex-col justify-start py-12 px-6 sm:px-12 md:px-16 xl:px-24 bg-slate-50 min-h-screen overflow-y-auto">
          {/* Top Navigation Row (Mobile/Desktop) */}
          <div className="flex justify-between items-center w-full mb-12">
            <Link
              href="/"
              className="nav_brand !no-underline flex items-center shrink-0"
            >
              <span className="nav_brand-logo scale-75 origin-left">
                <span className="nav_brand-u2">U2</span>
                <span className="nav_brand-divider"></span>
                <span className="nav_brand-label text-left">
                  <span className="nav_brand-label-top">Travels &amp;</span>
                  <span className="nav_brand-label-bottom">Tours</span>
                </span>
              </span>
            </Link>
            <span className="text-xs text-slate-500 font-medium">
              Already B2B partner?{" "}
              <Link
                href="/agent-login"
                className="text-[#013b85] font-black underline hover:text-[#dfa447] transition-colors no-underline"
              >
                Log In
              </Link>
            </span>
          </div>

          <div className="w-full max-w-lg mx-auto lg:mx-0 flex-grow flex flex-col justify-center">
            {/* Header info */}
            <div className="mb-8 text-left">
              <h2
                className="text-3xl md:text-4xl font-normal text-[#013b85] tracking-tight mb-2"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Agent Registration
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Fill out the application below to register your agency. Our
                verification team will review and approve your credentials.
              </p>
            </div>

            {/* Error / Success Notifications */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-100 text-red-600 rounded-xl p-4 flex items-center gap-3 text-xs font-bold text-left">
                <AlertCircle className="h-4.5 w-4.5 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-100 text-green-700 rounded-xl p-4 flex flex-col gap-1 text-xs font-semibold text-left animate-pulse">
                <div className="flex items-center gap-3 font-bold text-green-800">
                  <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-green-600" />
                  <span>{success}</span>
                </div>
                <p className="text-[10px] text-green-600 pl-7 mt-0.5">
                  Redirecting you to the home page in a few seconds...
                </p>
              </div>
            )}

            {/* Registration Form */}
            <form
              onSubmit={handleRegister}
              className="flex flex-col gap-5 text-left bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl"
            >
              {/* Name Fields Row */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider mb-2 text-slate-400">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="w-full bg-slate-50 text-slate-900 text-xs px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#013b85] focus:bg-white focus:ring-1 focus:ring-[#013b85] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="w-full bg-slate-50 text-slate-900 text-xs px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#013b85] focus:bg-white focus:ring-1 focus:ring-[#013b85] outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Business Name Field */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider mb-2 text-slate-400">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="e.g. Grand Travels Sdn Bhd"
                  className="w-full bg-slate-50 text-slate-900 text-xs px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#013b85] focus:bg-white focus:ring-1 focus:ring-[#013b85] outline-none transition-all"
                />
              </div>

              {/* Email Address Field */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider mb-2 text-slate-400">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@myemail.com"
                  className="w-full bg-slate-50 text-slate-900 text-xs px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#013b85] focus:bg-white focus:ring-1 focus:ring-[#013b85] outline-none transition-all"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider mb-2 text-slate-400">
                  Phone (with country code){" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. +60123456789"
                  className="w-full bg-slate-50 text-slate-900 text-xs px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#013b85] focus:bg-white focus:ring-1 focus:ring-[#013b85] outline-none transition-all"
                />
              </div>



              {/* Agreement Checkbox */}
              <div className="flex items-start gap-3 mt-2">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4.5 w-4.5 accent-[#dfa447] mt-0.5 rounded cursor-pointer shrink-0"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="text-[10px] text-slate-500 leading-normal select-none cursor-pointer"
                >
                  By proceeding ahead, you agree to our{" "}
                  <Link
                    href="/terms"
                    target="_blank"
                    className="text-[#013b85] font-bold underline hover:text-[#dfa447]"
                  >
                    terms of service
                  </Link>{" "}
                  and acknowledge you have read our{" "}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    className="text-[#013b85] font-bold underline hover:text-[#dfa447]"
                  >
                    privacy policy
                  </Link>
                  .
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-[#f3b027] hover:bg-[#dfa447] hover:shadow-lg hover:shadow-yellow-500/20 active:scale-[0.99] text-white font-extrabold uppercase tracking-widest text-xs py-4 rounded-xl mt-4 transition-all cursor-pointer border-none outline-none"
              >
                Register
              </button>
            </form>
          </div>

          {/* Mobile Footer */}
          <div className="lg:hidden text-center text-slate-400 text-xs mt-12">
            © {new Date().getFullYear()} U2 Travels & Tours. All rights
            reserved.
          </div>
        </div>
      </main>
    </>
  );
}

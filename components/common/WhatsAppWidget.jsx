"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const rawWaNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "601111666872";
  const waNumber = rawWaNumber.replace(/[^0-9]/g, "");
  const defaultMsg = encodeURIComponent(
    "Hello U2 Travels & Tours! 👋 I would like to inquire about your tour packages and transportation services.",
  );
  const whatsappUrl = `https://wa.me/${waNumber}?text=${defaultMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end gap-3 pointer-events-auto">
      {/* Pop-up Chat Card */}
      {isOpen && (
        <div className="bg-white rounded-2xl p-4 shadow-2xl border border-slate-100 max-w-[280px] sm:max-w-xs animate-slide-up relative flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors border-none cursor-pointer"
            aria-label="Close WhatsApp Popup"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-md p-2">
              <Image
                src="/whatsapp.svg"
                alt="WhatsApp"
                width={24}
                height={24}
                className="w-full h-full invert brightness-0 invert-100 text-white"
              />
            </div>
            <div>
              <p className="text-xs font-black text-[#013b85] uppercase tracking-wide">
                U2 Travel Support
              </p>
              <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Online &amp; Ready to Help!
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-normal bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            Need help planning your trip or booking transfers? Chat with us now!
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl text-center shadow-md hover:shadow-lg transition-all duration-200 !no-underline flex items-center justify-center gap-2"
          >
            <Image
              src="/whatsapp.svg"
              alt="WhatsApp"
              width={16}
              height={16}
              className="w-4 h-4 brightness-0 invert"
            />
            Start WhatsApp Chat
          </a>
        </div>
      )}

      {/* Main Floating Circle Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group bg-[#25D366] hover:bg-[#1faa50] text-white p-3.5 sm:p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.6)] transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-none cursor-pointer !no-underline"
        aria-label="Chat on WhatsApp"
      >
        {/* Glowing pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping -z-10"></span>
        <Image
          src="/whatsapp.svg"
          alt="WhatsApp"
          width={32}
          height={32}
          className="w-7 h-7 sm:w-8 sm:h-8 brightness-0 invert"
        />
      </a>
    </div>
  );
}

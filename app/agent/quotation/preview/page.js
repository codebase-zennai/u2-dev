"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Download, Mail, Send } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function QuotationPreviewPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("current_quote");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  if (!data) return <LoadingSpinner fullScreen={true} />;

  const markup = 15;
  const finalPrice = data.total * (1 + markup / 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-20">
      
      {/* Top Action Bar - Hidden during print */}
      <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 print:hidden shadow-lg">
        <Link href="/agent/builder" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
          <ArrowLeft size={20} /> Back to Builder
        </Link>
        <div className="flex gap-3">
          <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-bold transition-colors">
            <Printer size={16} /> Print PDF
          </button>
          <button onClick={() => alert("Email sent to client.")} className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold transition-colors">
            <Send size={16} /> Send to Client
          </button>
        </div>
      </div>

      {/* A4 Document Container */}
      <div className="max-w-[850px] mx-auto mt-8 bg-white shadow-xl print:shadow-none print:mt-0">
        
        {/* Header / Cover Section */}
        <div className="relative h-[300px] overflow-hidden flex flex-col justify-end p-12 bg-slate-900 text-white">
          <img 
            src="https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg" 
            alt="Cover" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <div className="text-sm font-bold tracking-widest text-blue-300 uppercase mb-2">Travel Proposal</div>
              <h1 className="text-5xl font-black tracking-tight leading-none mb-4">{data.client.name || "Custom Itinerary"}</h1>
              <p className="text-xl font-medium text-slate-200">{data.client.dates || "Dates TBD"} • {data.client.adults} Adults, {data.client.children} Children</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black">U2 Travels.</div>
              <div className="text-sm text-slate-300 mt-1">B2B Agent Portal</div>
            </div>
          </div>
        </div>

        <div className="p-12">
          {/* Quick Summary Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 pb-12 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Destinations</div>
              <div className="font-bold text-slate-900 text-lg">
                {data.destinations.length > 0 ? data.destinations.map(d=>d.city).join(', ') : "Custom"}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Travel Style</div>
              <div className="font-bold text-slate-900 text-lg">{data.client.style || "Standard"}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Pax</div>
              <div className="font-bold text-slate-900 text-lg">{data.client.adults + data.client.children}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Price</div>
              <div className="font-black text-blue-600 text-xl">${finalPrice.toFixed(2)}</div>
            </div>
          </div>

          {/* Accommodation */}
          {data.accommodations.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">1</span> 
                Accommodation
              </h3>
              <div className="flex flex-col gap-4">
                {data.accommodations.map((item, idx) => (
                  <div key={idx} className="flex gap-6 border border-slate-200 rounded-2xl p-4">
                    <img src={item.image} className="w-32 h-32 object-cover rounded-xl shrink-0" />
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-900 text-lg">{item.name}</h4>
                          <div className="text-xs text-yellow-500 mt-1">{"★".repeat(item.rating)}</div>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs text-slate-500 uppercase block">Room Type</span>
                          <span className="font-semibold text-slate-800">{item.selectedRoom}</span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 uppercase block">Meal Plan</span>
                          <span className="font-semibold text-slate-800">{item.selectedPlan}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attractions */}
          {data.attractions.length > 0 && (
            <div className="mb-12">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm">2</span> 
                Included Attractions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {data.attractions.map((item, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 flex gap-4">
                    <img src={item.image} className="w-16 h-16 object-cover rounded-lg" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-tight">{item.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transport & Services */}
          <div className="grid grid-cols-2 gap-12 mb-12">
            {data.transportation.length > 0 && (
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-4 border-b border-slate-200 pb-2">Transportation</h3>
                <ul className="flex flex-col gap-2">
                  {data.transportation.map((t, idx) => (
                    <li key={idx} className="text-sm text-slate-700 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> {t.type} (Cap: {t.capacity})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.services.length > 0 && (
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-4 border-b border-slate-200 pb-2">Additional Services</h3>
                <ul className="flex flex-col gap-2">
                  {data.services.map((s, idx) => (
                    <li key={idx} className="text-sm text-slate-700 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Quotation Total */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mt-12 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black text-slate-900">Total Package Price</h3>
              <p className="text-sm text-slate-500 mt-1">Valid for 14 days. Subject to availability.</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black text-blue-600">${finalPrice.toFixed(2)}</div>
              <div className="text-xs text-slate-500 mt-1 font-bold">ALL TAXES INCLUDED</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

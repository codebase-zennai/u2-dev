"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  Save,
  FileText,
  CheckCircle2,
  MapPin,
  Hotel,
  Car,
  Ticket,
  Utensils,
  Settings,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";
import Header2 from "@/components/layout/Header2";
import {
  DESTINATIONS,
  HOTELS,
  TRANSPORT_OPTIONS,
  ATTRACTIONS,
  ADDITIONAL_SERVICES,
} from "./data";

export default function BuilderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  // Global Itinerary State
  const [itinerary, setItinerary] = useState({
    client: {
      name: "",
      agency: "",
      adults: 2,
      children: 0,
      dates: "",
      style: "Standard",
    },
    destinations: [], // array of DESTINATIONS items
    accommodations: [],
    transportation: [],
    attractions: [],
    meals: [],
    services: [],
    timeline: [], // array of days, each with events
  });

  const updateItinerary = (field, value) => {
    setItinerary((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    { id: 1, name: "Client Info", icon: <FileText size={16} /> },
    { id: 2, name: "Destinations", icon: <MapPin size={16} /> },
    { id: 3, name: "Accommodation", icon: <Hotel size={16} /> },
    { id: 4, name: "Transportation", icon: <Car size={16} /> },
    { id: 5, name: "Attractions", icon: <Ticket size={16} /> },
    { id: 6, name: "Meals", icon: <Utensils size={16} /> },
    { id: 7, name: "Services", icon: <Settings size={16} /> },
    { id: 8, name: "Timeline", icon: <Calendar size={16} /> },
    { id: 9, name: "Costing", icon: <DollarSign size={16} /> },
  ];

  const handleNext = () => {
    if (currentStep < 9) setCurrentStep((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const calculateTotal = () => {
    let total = 0;
    // Basic mock calculation
    itinerary.accommodations.forEach((a) => (total += a.price || 0));
    itinerary.transportation.forEach((t) => (total += t.price || 0));
    itinerary.attractions.forEach((a) => (total += a.price || 0));
    itinerary.services.forEach((s) => (total += s.price || 0));
    return total;
  };

  const handleGenerateQuote = () => {
    setIsSaving(true);
    setTimeout(() => {
      // Mock saving to localstorage
      localStorage.setItem(
        "current_quote",
        JSON.stringify({ ...itinerary, total: calculateTotal() }),
      );
      router.push("/agent/quotation/preview");
    }, 1500);
  };

  return (
    <>
      <Header2 isSolid={true} />
      <div className="min-h-screen bg-slate-50 pt-20 flex flex-col font-sans">
        {/* Top bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-20 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <Link
              href="/agent"
              className="text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft size={24} />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Itinerary Builder
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Draft • {itinerary.client.name || "New Client"}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
              <Save size={16} /> Save Draft
            </button>
            <button
              onClick={handleGenerateQuote}
              className="px-5 py-2 bg-[#1a1a1a] hover:bg-black text-white rounded-lg text-sm font-bold transition-colors flex items-center gap-2 shadow-md"
            >
              {isSaving ? "Generating..." : "Generate Quote"}{" "}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto hidden md:block">
            <div className="p-4">
              <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4 ml-2">
                Wizard Steps
              </div>
              <div className="flex flex-col gap-1">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all w-full text-left
                      ${
                        currentStep === step.id
                          ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                          : currentStep > step.id
                            ? "text-slate-700 hover:bg-slate-50"
                            : "text-slate-400 hover:bg-slate-50"
                      }
                    `}
                  >
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full text-xs
                      ${currentStep === step.id ? "bg-blue-600 text-white" : currentStep > step.id ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"}
                    `}
                    >
                      {currentStep > step.id
                        ? <CheckCircle2 size={12} />
                        : step.id}
                    </span>
                    {step.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-10 relative">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[600px] flex flex-col">
              {/* Step Content */}
              <div className="flex-1 p-8">
                <StepHeader title={steps[currentStep - 1].name} />

                {currentStep === 1 && (
                  <Step1Client
                    itinerary={itinerary}
                    updateItinerary={updateItinerary}
                  />
                )}
                {currentStep === 2 && (
                  <Step2Destinations
                    itinerary={itinerary}
                    updateItinerary={updateItinerary}
                  />
                )}
                {currentStep === 3 && (
                  <Step3Accommodation
                    itinerary={itinerary}
                    updateItinerary={updateItinerary}
                  />
                )}
                {currentStep === 4 && (
                  <Step4Transportation
                    itinerary={itinerary}
                    updateItinerary={updateItinerary}
                  />
                )}
                {currentStep === 5 && (
                  <Step5Attractions
                    itinerary={itinerary}
                    updateItinerary={updateItinerary}
                  />
                )}
                {currentStep === 6 && (
                  <Step6Meals
                    itinerary={itinerary}
                    updateItinerary={updateItinerary}
                  />
                )}
                {currentStep === 7 && (
                  <Step7Services
                    itinerary={itinerary}
                    updateItinerary={updateItinerary}
                  />
                )}
                {currentStep === 8 && (
                  <Step8Timeline
                    itinerary={itinerary}
                    updateItinerary={updateItinerary}
                  />
                )}
                {currentStep === 9 && (
                  <Step9Costing
                    itinerary={itinerary}
                    total={calculateTotal()}
                  />
                )}
              </div>

              {/* Bottom Navigation */}
              <div className="border-t border-slate-100 p-6 flex justify-between bg-slate-50/50 rounded-b-2xl">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all
                    ${currentStep === 1 ? "opacity-50 cursor-not-allowed text-slate-400" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"}
                  `}
                >
                  <ChevronLeft size={18} /> Back
                </button>

                {currentStep < 9
                  ? <button
                      onClick={handleNext}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all active:scale-95"
                    >
                      Next Step <ChevronRight size={18} />
                    </button>
                  : <button
                      onClick={handleGenerateQuote}
                      className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-md shadow-green-500/20 transition-all active:scale-95"
                    >
                      Complete & Quote <CheckCircle2 size={18} />
                    </button>}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Cost Summary Panel */}
          <div className="w-72 bg-white border-l border-slate-200 hidden xl:flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <DollarSign size={18} className="text-blue-600" />
                Live Summary
              </h3>
            </div>
            <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">
                  Accommodations
                </span>
                <span className="font-bold text-slate-900">
                  $
                  {itinerary.accommodations.reduce(
                    (a, b) => a + (b.price || 0),
                    0,
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">
                  Transportation
                </span>
                <span className="font-bold text-slate-900">
                  $
                  {itinerary.transportation.reduce(
                    (a, b) => a + (b.price || 0),
                    0,
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Attractions</span>
                <span className="font-bold text-slate-900">
                  $
                  {itinerary.attractions.reduce(
                    (a, b) => a + (b.price || 0),
                    0,
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">
                  Extra Services
                </span>
                <span className="font-bold text-slate-900">
                  ${itinerary.services.reduce((a, b) => a + (b.price || 0), 0)}
                </span>
              </div>
              <div className="my-2 border-t border-dashed border-slate-200"></div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  Est. Total
                </span>
                <span className="text-2xl font-black text-blue-600">
                  ${calculateTotal()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const StepHeader = ({ title }) => (
  <div className="mb-8 border-b border-slate-100 pb-4">
    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
      {title}
    </h2>
  </div>
);

// --- STEPS COMPONENTS ---

const Step1Client = ({ itinerary, updateItinerary }) => {
  const client = itinerary.client;
  const updateClient = (field, val) =>
    updateItinerary("client", { ...client, [field]: val });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-500 uppercase">
          Client Name
        </label>
        <input
          type="text"
          value={client.name}
          onChange={(e) => updateClient("name", e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-blue-500 outline-none"
          placeholder="e.g. John Doe"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-500 uppercase">
          Agency / Company
        </label>
        <input
          type="text"
          value={client.agency}
          onChange={(e) => updateClient("agency", e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-blue-500 outline-none"
          placeholder="e.g. Acme Corp"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-500 uppercase">
          Travel Dates
        </label>
        <input
          type="text"
          value={client.dates}
          onChange={(e) => updateClient("dates", e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-blue-500 outline-none"
          placeholder="12 Dec - 20 Dec 2026"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-500 uppercase">
          Travel Style
        </label>
        <select
          value={client.style}
          onChange={(e) => updateClient("style", e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-blue-500 outline-none"
        >
          <option>Budget</option>
          <option>Standard</option>
          <option>Premium</option>
          <option>Luxury</option>
          <option>Ultra Luxury</option>
        </select>
      </div>
      <div className="flex gap-4 md:col-span-2">
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase">
            Adults
          </label>
          <input
            type="number"
            min="1"
            value={client.adults}
            onChange={(e) => updateClient("adults", parseInt(e.target.value))}
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase">
            Children
          </label>
          <input
            type="number"
            min="0"
            value={client.children}
            onChange={(e) => updateClient("children", parseInt(e.target.value))}
            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:border-blue-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

const Step2Destinations = ({ itinerary, updateItinerary }) => {
  const addDest = (dest) => {
    if (!itinerary.destinations.find((d) => d.id === dest.id)) {
      updateItinerary("destinations", [...itinerary.destinations, dest]);
    }
  };
  const removeDest = (id) => {
    updateItinerary(
      "destinations",
      itinerary.destinations.filter((d) => d.id !== id),
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-3">
          Available Destinations
        </h3>
        <div className="flex flex-wrap gap-2">
          {DESTINATIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => addDest(d)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all flex items-center gap-2"
            >
              <Plus size={14} /> {d.city}, {d.country}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <MapPin size={16} className="text-blue-500" /> Selected Route
        </h3>
        {itinerary.destinations.length === 0
          ? <p className="text-sm text-slate-400 font-medium">
              No destinations selected yet.
            </p>
          : <div className="flex flex-col gap-3">
              {itinerary.destinations.map((d, idx) => (
                <div
                  key={d.id}
                  className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200"
                >
                  <GripVertical
                    size={20}
                    className="text-slate-300 cursor-grab"
                  />
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 font-bold text-slate-900">
                    {d.city}{" "}
                    <span className="text-slate-400 font-medium">
                      ({d.country})
                    </span>
                  </div>
                  <button
                    onClick={() => removeDest(d.id)}
                    className="text-red-400 hover:text-red-600 p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>}
      </div>
    </div>
  );
};

const Step3Accommodation = ({ itinerary, updateItinerary }) => {
  // Simplified for mock: list all hotels for selected destinations
  const relevantHotels = HOTELS.filter((h) =>
    itinerary.destinations.some((d) => d.id === h.cityId),
  );

  const addHotel = (hotel, room, plan) => {
    const entry = {
      ...hotel,
      selectedRoom: room.type,
      selectedPlan: plan.name,
      price: room.price + plan.price,
      uniqueId: Math.random().toString(36).substr(2, 9),
    };
    updateItinerary("accommodations", [...itinerary.accommodations, entry]);
  };

  return (
    <div className="flex flex-col gap-8">
      {itinerary.destinations.length === 0 && (
        <p className="text-slate-500 text-sm">
          Please select a destination first.
        </p>
      )}

      {relevantHotels.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relevantHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="h-32 bg-slate-200 relative">
                <img
                  src={hotel.image}
                  className="w-full h-full object-cover"
                  alt={hotel.name}
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold shadow-sm">
                  {"★".repeat(hotel.rating)}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h4 className="font-bold text-slate-900">{hotel.name}</h4>
                <p className="text-xs text-slate-500 mt-1 mb-4 flex-1 line-clamp-2">
                  {hotel.description}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      addHotel(hotel, hotel.rooms[0], hotel.mealPlans[0])
                    }
                    className="w-full bg-slate-100 hover:bg-blue-50 text-blue-600 font-bold text-xs py-2 rounded-lg transition-colors"
                  >
                    Add Base Room (${hotel.rooms[0].price})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {itinerary.accommodations.length > 0 && (
        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 mt-4">
          <h3 className="font-bold text-slate-900 mb-3">Selected Hotels</h3>
          <div className="flex flex-col gap-2">
            {itinerary.accommodations.map((a) => (
              <div
                key={a.uniqueId}
                className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 text-sm"
              >
                <div>
                  <span className="font-bold">{a.name}</span>
                  <span className="text-slate-500 ml-2">
                    ({a.selectedRoom} - {a.selectedPlan})
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-black text-blue-600">${a.price}</span>
                  <button
                    onClick={() => {
                      updateItinerary(
                        "accommodations",
                        itinerary.accommodations.filter(
                          (item) => item.uniqueId !== a.uniqueId,
                        ),
                      );
                    }}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Step4Transportation = ({ itinerary, updateItinerary }) => {
  const addTransport = (t) => {
    updateItinerary("transportation", [
      ...itinerary.transportation,
      { ...t, price: t.basePrice, uniqueId: Math.random().toString() },
    ]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TRANSPORT_OPTIONS.map((t) => (
          <div
            key={t.id}
            className="border border-slate-200 p-4 rounded-xl bg-white hover:border-blue-300 transition-colors flex justify-between items-center"
          >
            <div>
              <h4 className="font-bold text-slate-900">{t.type}</h4>
              <p className="text-xs text-slate-500 mt-1">
                Capacity: {t.capacity} Pax
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-black text-blue-600">${t.basePrice}</span>
              <button
                onClick={() => addTransport(t)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-100 text-blue-600 flex items-center justify-center"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {itinerary.transportation.length > 0 && (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-4">
          <h3 className="font-bold text-slate-900 mb-3">Selected Transport</h3>
          <div className="flex flex-col gap-2">
            {itinerary.transportation.map((t) => (
              <div
                key={t.uniqueId}
                className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 text-sm"
              >
                <span className="font-bold">{t.type}</span>
                <div className="flex items-center gap-4">
                  <span className="font-black text-slate-700">${t.price}</span>
                  <button
                    onClick={() => {
                      updateItinerary(
                        "transportation",
                        itinerary.transportation.filter(
                          (item) => item.uniqueId !== t.uniqueId,
                        ),
                      );
                    }}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Step5Attractions = ({ itinerary, updateItinerary }) => {
  const addAttr = (a) => {
    updateItinerary("attractions", [
      ...itinerary.attractions,
      { ...a, uniqueId: Math.random().toString() },
    ]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ATTRACTIONS.map((a) => (
          <div
            key={a.id}
            className="border border-slate-200 p-4 rounded-xl bg-white hover:shadow-md transition-all flex gap-4"
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-100">
              <img
                src={a.image}
                alt={a.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm leading-tight">
                  {a.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {a.durationHours} Hours • {a.category}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-black text-blue-600 text-sm">
                  ${a.price}
                </span>
                <button
                  onClick={() => addAttr(a)}
                  className="text-xs font-bold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-slate-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {itinerary.attractions.length > 0 && (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-4">
          <h3 className="font-bold text-slate-900 mb-3">Included Activities</h3>
          <div className="flex flex-col gap-2">
            {itinerary.attractions.map((a) => (
              <div
                key={a.uniqueId}
                className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 text-sm"
              >
                <span className="font-bold">{a.name}</span>
                <button
                  onClick={() => {
                    updateItinerary(
                      "attractions",
                      itinerary.attractions.filter(
                        (item) => item.uniqueId !== a.uniqueId,
                      ),
                    );
                  }}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Step6Meals = ({ itinerary, updateItinerary }) => (
  <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl">
    <Utensils className="w-12 h-12 text-slate-300 mx-auto mb-4" />
    <h3 className="text-lg font-bold text-slate-700">Meal Planning Module</h3>
    <p className="text-slate-500 text-sm mt-2">
      Integrates with daily timeline to specify included vs excluded meals and
      dietary requirements.
    </p>
  </div>
);

const Step7Services = ({ itinerary, updateItinerary }) => {
  const addService = (s) => {
    updateItinerary("services", [
      ...itinerary.services,
      {
        ...s,
        price: s.pricePerDay > 0 ? s.pricePerDay * 3 : s.flatFee,
        uniqueId: Math.random().toString(),
      },
    ]);
  };

  return (
    <div className="flex flex-col gap-4">
      {ADDITIONAL_SERVICES.map((s) => (
        <div
          key={s.id}
          className="flex justify-between items-center p-4 border border-slate-200 rounded-xl bg-white"
        >
          <span className="font-bold text-slate-700">{s.name}</span>
          <button
            onClick={() => addService(s)}
            className="px-4 py-2 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-600 text-xs font-bold rounded-lg transition-colors"
          >
            Add Service
          </button>
        </div>
      ))}

      {itinerary.services.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold text-slate-900 mb-3">Added Services</h3>
          {itinerary.services.map((s) => (
            <div
              key={s.uniqueId}
              className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200 text-sm mb-2"
            >
              <span className="font-bold">{s.name}</span>
              <span className="font-black text-slate-700">${s.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Step8Timeline = ({ itinerary }) => (
  <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl">
    <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
    <h3 className="text-lg font-bold text-slate-700">Day-by-Day Timeline</h3>
    <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
      This module automatically compiles your selected hotels, transportation,
      and attractions into an interactive drag-and-drop calendar.
    </p>
  </div>
);

const Step9Costing = ({ itinerary, total }) => {
  const markup = 15; // 15% markup
  const finalPrice = total * (1 + markup / 100);

  return (
    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
      <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-6">
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Final Costing
          </h3>
          <p className="text-slate-500 mt-1">
            Review internal costs and set client pricing.
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            Total Net Cost
          </div>
          <div className="text-3xl font-black text-slate-900">
            ${total.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
            Markup %
          </label>
          <div className="text-xl font-bold text-slate-700">{markup}%</div>
        </div>
        <div className="bg-blue-600 p-4 rounded-xl border border-blue-700 text-white shadow-lg shadow-blue-500/20">
          <label className="text-xs font-bold text-blue-200 uppercase mb-2 block">
            Client Selling Price
          </label>
          <div className="text-3xl font-black">${finalPrice.toFixed(2)}</div>
        </div>
      </div>

      <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 flex items-center justify-between">
        <span className="font-bold">Estimated Profit Margin</span>
        <span className="text-xl font-black text-green-700">
          ${(finalPrice - total).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

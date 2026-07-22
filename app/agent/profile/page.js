"use client";

import {
  ArrowLeft,
  Award,
  BarChart3,
  Building,
  Calendar,
  CheckCircle,
  LogOut,
  Mail,
  Receipt,
  User,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";
import Header2 from "@/components/layout/Header2";

export default function AgentProfilePage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  // Check login on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem("agentLoggedIn") === "true";
    if (!loggedIn) {
      router.push("/agent-login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("agentLoggedIn");
    // Notify Header instantly
    window.dispatchEvent(new Event("agentLoginStatusChange"));
    router.push("/");
  };

  if (!authorized) {
    return null; // Avoid render flash
  }

  return (
    <>
      <Header2 />
      <main className="main-wrapper bg-slate-50 min-h-[85vh] pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back to Dashboard Link */}
          <div className="mb-6">
            <Link
              href="/agent"
              className="text-[#013b85] hover:underline text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 no-underline"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Agent Dashboard</span>
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-[#013b85]/10 p-4 rounded-full border border-[#013b85]/20">
                  <User className="h-8 w-8 text-[#013b85]" />
                </div>
                <div>
                  <h1 className="font-extrabold text-[#013b85] text-2xl md:text-3xl uppercase tracking-wide">
                    Agent Profile
                  </h1>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-0.5">
                    Authorized B2B Partner
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="bg-rose-600 hover:bg-rose-700 !text-white font-extrabold text-xs uppercase tracking-widest py-3 px-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border-none outline-none"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            </div>

            {/* Profile Info Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-start gap-4">
                <Building className="h-5 w-5 text-[#013b85] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                    Agency Name
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    Grand Travels Sdn Bhd
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-start gap-4">
                <Mail className="h-5 w-5 text-[#013b85] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                    Registered Email
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    1234@mail.com
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-start gap-4">
                <Award className="h-5 w-5 text-[#013b85] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                    Account Tier
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    Gold Level Partner
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                    Account Status
                  </span>
                  <span className="text-sm font-bold text-emerald-600 uppercase tracking-wide">
                    Active / Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Stats Section */}
            <div>
              <h2 className="font-extrabold text-[#013b85] text-lg uppercase tracking-wide mb-5 border-b border-slate-100 pb-3">
                Monthly Performance Metrics
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border border-slate-200 rounded-2xl p-4 flex flex-col justify-between min-h-[110px] shadow-sm">
                  <BarChart3 className="h-5 w-5 text-[#013b85]" />
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">
                      Total Bookings
                    </span>
                    <span className="text-2xl font-black text-[#013b85]">
                      48
                    </span>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl p-4 flex flex-col justify-between min-h-[110px] shadow-sm">
                  <Receipt className="h-5 w-5 text-[#013b85]" />
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">
                      Pending Quotes
                    </span>
                    <span className="text-2xl font-black text-[#013b85]">
                      3
                    </span>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl p-4 flex flex-col justify-between min-h-[110px] shadow-sm">
                  <Wallet className="h-5 w-5 text-[#013b85]" />
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">
                      Commission Earned
                    </span>
                    <span className="text-lg font-black text-[#013b85]">
                      MYR 4,850
                    </span>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl p-4 flex flex-col justify-between min-h-[110px] shadow-sm">
                  <Calendar className="h-5 w-5 text-[#013b85]" />
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">
                      Next Payout
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      15 Jun 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

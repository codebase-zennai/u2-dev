"use client";

import {
  FileText,
  Users,
  CreditCard,
  CalendarDays,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header2 from "@/components/layout/Header2";

export default function AgentDashboardPage() {
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

  if (!authorized) {
    return null; // Prevent page flash before auth redirect
  }

  const kpis = [
    {
      title: "Total Revenue",
      value: "$45,231",
      icon: <CreditCard className="w-5 h-5" />,
      trend: "+12.5%",
      positive: true,
    },
    {
      title: "Active Itineraries",
      value: "24",
      icon: <FileText className="w-5 h-5" />,
      trend: "+4",
      positive: true,
    },
    {
      title: "Confirmed Bookings",
      value: "18",
      icon: <CheckCircle className="w-5 h-5" />,
      trend: "+2",
      positive: true,
    },
    {
      title: "Pending Quotes",
      value: "7",
      icon: <Clock className="w-5 h-5" />,
      trend: "-1",
      positive: false,
    },
  ];

  const recentRequests = [
    {
      id: "REQ-001",
      client: "The Smith Family",
      destination: "Malaysia (KL & Langkawi)",
      dates: "12 Dec - 20 Dec 2026",
      status: "Draft",
      budget: "$4,500",
    },
    {
      id: "REQ-002",
      client: "Corp Events LLC",
      destination: "Dubai",
      dates: "05 Nov - 10 Nov 2026",
      status: "Under Review",
      budget: "$12,000",
    },
    {
      id: "REQ-003",
      client: "Sarah & John",
      destination: "Bali, Indonesia",
      dates: "14 Feb - 21 Feb 2027",
      status: "Quoted",
      budget: "$3,200",
    },
    {
      id: "REQ-004",
      client: "Williams Group",
      destination: "Thailand (Phuket)",
      dates: "10 Jan - 15 Jan 2027",
      status: "Confirmed",
      budget: "$8,500",
    },
  ];

  return (
    <>
      <Header2 isSolid={true} />
      <main className="w-full min-h-screen bg-slate-50 pt-24 pb-12 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Agent Dashboard
              </h1>
              <p className="text-slate-500 mt-1">
                Welcome back. Here's what's happening with your clients today.
              </p>
            </div>
            <Link
              href="/agent/builder"
              className="bg-[#293ee6] hover:bg-[#1e30c4] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Create New Itinerary
            </Link>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    {kpi.icon}
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${kpi.positive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                  >
                    {kpi.trend}
                  </span>
                </div>
                <h3 className="text-slate-500 text-sm font-semibold mb-1">
                  {kpi.title}
                </h3>
                <div className="text-2xl font-black text-slate-900">
                  {kpi.value}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Client Requests */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Itineraries & Requests
                </h2>
                <button className="text-blue-600 text-sm font-semibold hover:underline">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="p-4 font-semibold">ID / Client</th>
                      <th className="p-4 font-semibold">Destination</th>
                      <th className="p-4 font-semibold">Travel Dates</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold">Budget</th>
                      <th className="p-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentRequests.map((req, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="text-sm font-bold text-slate-900">
                            {req.client}
                          </div>
                          <div className="text-xs text-slate-500">{req.id}</div>
                        </td>
                        <td className="p-4 text-sm font-medium text-slate-700">
                          {req.destination}
                        </td>
                        <td className="p-4 text-sm text-slate-600">
                          {req.dates}
                        </td>
                        <td className="p-4">
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full 
                            ${req.status === "Draft" ? "bg-slate-100 text-slate-700" : ""}
                            ${req.status === "Under Review" ? "bg-amber-100 text-amber-700" : ""}
                            ${req.status === "Quoted" ? "bg-blue-100 text-blue-700" : ""}
                            ${req.status === "Confirmed" ? "bg-green-100 text-green-700" : ""}
                          `}
                          >
                            {req.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm font-bold text-slate-900">
                          {req.budget}
                        </td>
                        <td className="p-4 text-right">
                          <button className="text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming Departures / Tasks */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                Upcoming Departures
              </h2>

              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="bg-blue-50 text-blue-600 p-3 rounded-lg flex flex-col items-center justify-center min-w-[60px]">
                    <span className="text-xs font-bold uppercase">Nov</span>
                    <span className="text-xl font-black leading-none mt-1">
                      05
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Corp Events LLC
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Dubai • 15 Pax
                    </p>
                    <div className="mt-2 text-xs font-semibold text-amber-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Final Payment Due
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="bg-blue-50 text-blue-600 p-3 rounded-lg flex flex-col items-center justify-center min-w-[60px]">
                    <span className="text-xs font-bold uppercase">Dec</span>
                    <span className="text-xl font-black leading-none mt-1">
                      12
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      The Smith Family
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Malaysia • 4 Pax
                    </p>
                    <div className="mt-2 text-xs font-semibold text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Fully Paid
                    </div>
                  </div>
                </div>
              </div>

              <button className="mt-6 w-full py-3 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                View Calendar
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

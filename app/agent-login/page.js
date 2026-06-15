"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AgentLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("agentLoggedIn") === "true";
    if (loggedIn) {
      router.push("/agent");
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (email === "1234@mail.com" && password === "1234") {
      setSuccess("Login successful! Redirecting...");
      setIsRedirecting(true);
      localStorage.setItem("agentLoggedIn", "true");
      // Dispatch custom event to notify Header immediately
      window.dispatchEvent(new Event("agentLoginStatusChange"));
      setTimeout(() => {
        router.push("/agent");
      }, 1500);
    } else {
      setError("Invalid credentials. Use 1234@mail.com / 1234.");
    }
  };

  return (
    <>
      {isRedirecting && <LoadingSpinner fullScreen={true} />}
      <main className="w-full min-h-screen flex font-sans bg-white text-slate-900 overflow-hidden">
        
        {/* LEFT SIDE: Brand / Marketing (Blue Gradient) */}
        <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-[#293ee6] via-[#3a4ce8] to-[#1627b0] flex-col justify-center px-16 xl:px-24 overflow-hidden">
          {/* Abstract Line Pattern overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0, 50 0, 100 100" fill="none" stroke="white" strokeWidth="0.2" />
              <path d="M-10 100 C 10 -10, 60 -10, 110 100" fill="none" stroke="white" strokeWidth="0.2" />
              <path d="M-20 100 C 0 -20, 70 -20, 120 100" fill="none" stroke="white" strokeWidth="0.2" />
              <path d="M-30 100 C -10 -30, 80 -30, 130 100" fill="none" stroke="white" strokeWidth="0.2" />
            </svg>
          </div>

          <div className="relative z-10 max-w-lg">
            {/* Logo / Icon */}
            <div className="mb-12">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7" />
              </svg>
            </div>

            {/* Headline */}
            <h1 className="text-white text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Hello<br />
              U2 Travels!<span className="inline-block ml-2 wave-emoji">👋</span>
            </h1>

            {/* Subheadline */}
            <p className="text-blue-100 text-lg md:text-xl font-medium leading-relaxed max-w-md">
              Skip the manual booking process. Build customized, professional itineraries instantly and close more deals!
            </p>
          </div>

          {/* Footer Copyright */}
          <div className="absolute bottom-8 left-16 xl:left-24 z-10 text-blue-200/60 text-sm font-medium">
            © {new Date().getFullYear()} U2 Travels. All rights reserved.
          </div>
          
          {/* Edge shadow for depth */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
        </div>

        {/* RIGHT SIDE: Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-32 relative bg-white min-h-screen">
          
          {/* Brand Logo for Mobile (Hidden on Desktop) */}
          <div className="lg:hidden absolute top-8 left-8">
            <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">
              U2 Travels.
            </Link>
          </div>

          {/* Brand Logo Top Left (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-16 xl:left-32">
            <Link href="/" className="text-2xl font-black tracking-tight text-slate-900 hover:opacity-80 transition-opacity">
              U2 Travels
            </Link>
          </div>

          <div className="w-full max-w-md mx-auto lg:mx-0 pt-12">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Welcome Back!</h2>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Don't have an account? <Link href="#" className="text-slate-900 font-bold underline hover:text-blue-600 transition-colors">Create a new account now</Link>, it's FREE! Takes less than a minute.
              </p>
            </div>

            {/* Alerts */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-100 text-red-600 rounded-lg p-3 flex items-center gap-2 text-sm font-medium">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-100 text-green-600 rounded-lg p-3 flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="relative">
                <input
                  type="email"
                  placeholder="agent@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-base text-slate-900 placeholder-slate-400 outline-none focus:border-slate-900 transition-colors font-medium"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-base text-slate-900 placeholder-slate-400 outline-none focus:border-slate-900 transition-colors font-medium"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1a1a1a] hover:bg-black active:scale-[0.99] text-white font-bold text-sm py-4 rounded-lg shadow-md transition-all mt-4"
              >
                Login Now
              </button>

              <button
                type="button"
                onClick={() => alert("Google login coming soon.")}
                className="w-full bg-white border border-slate-200 hover:bg-slate-50 active:scale-[0.99] text-slate-700 font-bold text-sm py-3.5 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Login with Google
              </button>

              <div className="text-center mt-4">
                <span className="text-sm text-slate-500 font-medium">
                  Forget password{" "}
                  <Link href="#" className="text-slate-900 font-bold hover:underline">
                    Click here
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Global styles for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave {
          0% { transform: rotate(0.0deg) }
          10% { transform: rotate(14.0deg) }
          20% { transform: rotate(-8.0deg) }
          30% { transform: rotate(14.0deg) }
          40% { transform: rotate(-4.0deg) }
          50% { transform: rotate(10.0deg) }
          60% { transform: rotate(0.0deg) }
          100% { transform: rotate(0.0deg) }
        }
        .wave-emoji {
          animation: wave 2s infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }
      `}} />
    </>
  );
}


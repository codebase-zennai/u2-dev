"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AgentLoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login"); // "login" or "signup"
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Login form fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form fields
  const [agencyName, setAgencyName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    if (loginEmail === "1234@mail.com" && loginPassword === "1234") {
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

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!agencyName || !signupEmail || !signupPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (signupPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSuccess("Account created! Toggling to Login...");
    // Auto-fill login fields for the user
    setLoginEmail(signupEmail);
    setLoginPassword(signupPassword);

    setTimeout(() => {
      setActiveTab("login");
      setSuccess("");
    }, 1500);
  };

  return (
    <>
      {isRedirecting && <LoadingSpinner fullScreen={true} />}
      <main className="w-full min-h-screen bg-gradient-to-br from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">
        {/* Wave Background SVGs */}
        <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none overflow-hidden h-32 md:h-48 z-0">
          <svg
            viewBox="0 0 1440 320"
            className="absolute bottom-0 w-full h-full text-white/10 fill-current"
          >
            <title>Ocean wave backdrop 1</title>
            <path d="M0,224L60,202.7C120,181,240,139,360,138.7C480,139,600,181,720,202.7C840,224,960,224,1080,202.7C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          </svg>
          <svg
            viewBox="0 0 1440 320"
            className="absolute bottom-0 w-full h-full text-white/20 fill-current translate-y-4"
          >
            <title>Ocean wave backdrop 2</title>
            <path d="M0,96L60,112C120,128,240,160,360,160C480,160,600,128,720,122.7C840,117,960,139,1080,165.3C1200,192,1320,224,1380,240L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
          </svg>
        </div>

        {/* Floating Split-Screen Card */}
        <div className="w-full max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/20 flex flex-col md:flex-row min-h-[580px] z-10 relative">
          {/* Left Side: Form Panel */}
          <div className="w-full md:w-[48%] bg-white p-8 md:p-12 flex flex-col justify-between relative">
            {/* Top Floating Alerts */}
            {error && (
              <div className="absolute top-4 left-4 right-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs font-semibold shadow-md z-30">
                <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="absolute top-4 left-4 right-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs font-semibold shadow-md z-30">
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Heading */}
            <div className="mb-6 mt-4">
              <h1 className="font-[family-name:var(--font-caveat)] text-7xl md:text-8xl font-bold select-none leading-none tracking-tight">
                <span className="text-[#0ea5e9]">Wel</span>
                <span className="text-[#f97316]">come</span>
              </h1>
            </div>

            {/* Form Content */}
            <div className="flex-1 flex flex-col justify-center">
              {activeTab === "login"
                ? <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    {/* Email Field */}
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="agent@company.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-4 pr-12 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0ea5e9] focus:bg-white transition-all font-semibold"
                        required
                      />
                      {loginEmail.includes("@") && loginEmail.includes(".") && (
                        <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 h-5 w-5" />
                      )}
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-4 pr-20 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0ea5e9] focus:bg-white transition-all font-semibold"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          alert("Password reset criteria sent to agent email.")
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-[#0ea5e9] hover:underline cursor-pointer"
                      >
                        Forgot?
                      </button>
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="w-full bg-[#00b0ff] hover:bg-[#0091ea] active:scale-[0.98] text-white font-extrabold text-sm py-4 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center"
                    >
                      Log in
                    </button>
                  </form>
                : <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    {/* Agency Name */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Agency Name"
                        value={agencyName}
                        onChange={(e) => setAgencyName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-4 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0ea5e9] focus:bg-white transition-all font-semibold"
                        required
                      />
                    </div>

                    {/* Business Email */}
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Business Email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-4 pr-12 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0ea5e9] focus:bg-white transition-all font-semibold"
                        required
                      />
                      {signupEmail.includes("@") &&
                        signupEmail.includes(".") && (
                          <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 h-5 w-5" />
                        )}
                    </div>

                    {/* Create Password */}
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Create Password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-4 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0ea5e9] focus:bg-white transition-all font-semibold"
                        required
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-4 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#0ea5e9] focus:bg-white transition-all font-semibold"
                        required
                      />
                    </div>

                    {/* Register Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#00b0ff] hover:bg-[#0091ea] active:scale-[0.98] text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center"
                    >
                      Register
                    </button>
                  </form>}
            </div>

            {/* Social login divider and buttons */}
            <div className="mt-6">
              <div className="relative flex items-center justify-center my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100" />
                </div>
                <span className="relative px-3 bg-white text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                  or continue with
                </span>
              </div>

              {/* Social pills */}
              <div className="flex gap-3 justify-center mb-5">
                {/* Facebook */}
                <button
                  type="button"
                  onClick={() => alert("Social login coming soon.")}
                  className="w-20 h-11 rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100/80 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Log in with Facebook"
                >
                  <svg
                    className="h-4.5 w-4.5 text-[#1877f2]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Facebook logo</title>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>

                {/* Google */}
                <button
                  type="button"
                  onClick={() => alert("Social login coming soon.")}
                  className="w-20 h-11 rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100/80 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Log in with Google"
                >
                  <svg className="h-4.5 w-4.5" viewBox="0 0 24 24">
                    <title>Google logo</title>
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>

                {/* Apple */}
                <button
                  type="button"
                  onClick={() => alert("Social login coming soon.")}
                  className="w-20 h-11 rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100/80 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Log in with Apple"
                >
                  <svg
                    className="h-4.5 w-4.5 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>Apple logo</title>
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.62.71-1.16 1.85-1.01 2.96 1.12.09 2.27-.58 2.96-1.41z" />
                  </svg>
                </button>
              </div>

              {/* Register toggle link */}
              <div className="text-center">
                {activeTab === "login"
                  ? <button
                      type="button"
                      onClick={() => {
                        setActiveTab("signup");
                        setError("");
                        setSuccess("");
                      }}
                      className="text-xs text-slate-500 hover:text-[#0ea5e9] font-bold transition-colors cursor-pointer"
                    >
                      Don't have an agency account?{" "}
                      <span className="text-[#0ea5e9] hover:underline">
                        Register here
                      </span>
                    </button>
                  : <button
                      type="button"
                      onClick={() => {
                        setActiveTab("login");
                        setError("");
                        setSuccess("");
                      }}
                      className="text-xs text-slate-500 hover:text-[#0ea5e9] font-bold transition-colors cursor-pointer"
                    >
                      Already registered?{" "}
                      <span className="text-[#0ea5e9] hover:underline">
                        Log in
                      </span>
                    </button>}
              </div>
            </div>
          </div>

          {/* Right Side: Image Illustration Panel */}
          <div className="w-full md:w-[52%] relative overflow-hidden bg-slate-50 hidden md:block min-h-[550px]">
            {/* Overlay U2 Travels Brand Logo */}
            <div className="absolute top-6 left-6 z-20 select-none bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/40 shadow-sm">
              <Link
                href="/"
                className="nav_brand !no-underline flex items-center shrink-0"
              >
                <span className="nav_brand-logo">
                  <span className="nav_brand-u2">U2</span>
                  <span className="nav_brand-divider" />
                  <span className="nav_brand-label">
                    <span className="nav_brand-label-top">Travels &amp;</span>
                    <span className="nav_brand-label-bottom">Tours</span>
                  </span>
                </span>
              </Link>
            </div>

            {/* Surfer Illustration Background */}
            <Image
              src="/images/agent_login_beach.png"
              alt="Beach Surfer Illustration"
              fill
              className="object-cover pointer-events-none"
              sizes="(max-width: 768px) 100vw, 55vw"
              priority
            />
          </div>
        </div>
      </main>
    </>
  );
}

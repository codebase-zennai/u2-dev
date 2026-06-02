"use client";

export default function LoadingSpinner({ fullScreen = false }) {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 bg-white/90 backdrop-blur-md z-[9999] flex flex-col items-center justify-center gap-6"
          : "flex flex-col items-center justify-center p-8 gap-6 w-full"
      }
    >
      {/* Stylesheet inline for animation to keep component completely modular */}
      <style>{`
        @keyframes loadingLine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .animate-loading-line {
          animation: loadingLine 1.5s infinite ease-in-out;
        }
      `}</style>

      <div className="flex flex-col items-center gap-6 select-none">
        {/* Navbar U2 Logo exactly as styled in globals.css */}
        <div className="nav_brand !no-underline flex items-center scale-110 md:scale-125 transition-transform">
          <span className="nav_brand-logo">
            <span className="nav_brand-u2">U2</span>
            <span className="nav_brand-divider" />
            <span className="nav_brand-label">
              <span className="nav_brand-label-top">Tours &amp;</span>
              <span className="nav_brand-label-bottom">Travels</span>
            </span>
          </span>
        </div>

        {/* Horizontal Loading Line */}
        <div className="w-28 md:w-36 h-[3px] bg-slate-100 rounded-full overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 bg-[#013b85] w-1/2 rounded-full animate-loading-line" />
        </div>
      </div>
    </div>
  );
}

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

function PreloaderContent({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // Instant trigger when user clicks any internal navigation link (like View Itinerary)
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest("a");
      if (target) {
        const href = target.getAttribute("href");
        if (
          href?.startsWith("/") &&
          !href.startsWith("#") &&
          target.getAttribute("target") !== "_blank"
        ) {
          setIsLoading(true);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, {
        capture: true,
      });
    };
  }, []);

  // Fade out screen on route change complete
  // biome-ignore lint/correctness/useExhaustiveDependencies: trigger loading transition on route/search changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <>
      {isLoading && <LoadingSpinner fullScreen={true} />}
      <div
        className={`transition-opacity duration-500 ease-out ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}

export default function PreloaderWrapper({ children }) {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen={true} />}>
      <PreloaderContent>{children}</PreloaderContent>
    </Suspense>
  );
}

"use client";

import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function PreloaderWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fade out function with a slight delay for smooth visual transition
    const fadeOut = () => {
      setTimeout(() => setIsLoading(false), 650);
    };

    // If document is already fully loaded on client mount
    if (document.readyState === "complete") {
      fadeOut();
      return;
    }

    const handleLoad = () => {
      fadeOut();
    };

    window.addEventListener("load", handleLoad);

    // Safety timeout: never block the user for more than 4 seconds
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner fullScreen={true} />}
      <div
        className={`transition-opacity duration-700 ease-out ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}

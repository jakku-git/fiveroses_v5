"use client";
import { useEffect, useState } from "react";

export function BackgroundChanger({ children }: { children: React.ReactNode }) {
  // Start with a black background.
  const [bgClass, setBgClass] = useState("bg-black");

  useEffect(() => {
    const handleScroll = () => {
      // When scrollY is more than 3 times the viewport height (300vh),
      // we consider the hero "finished".
      if (window.scrollY > window.innerHeight * 3) {
        // Change background to blue-900 (or any color you like)
        setBgClass("bg-blue-900");
      } else {
        // Otherwise, keep it black.
        setBgClass("bg-black");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div className={`${bgClass}`}>{children}</div>;
}

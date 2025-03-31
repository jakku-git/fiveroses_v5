"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const World = dynamic(() => import("./github-globe").then((m) => m.World), {
  ssr: false,
});

export function GithubGlobeDemo() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 2,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 3,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 4,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 5,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 6,
      startLat: -27.4698,  // Brisbane
      startLng: 153.0251,
      endLat: 39.9042,    // Beijing
      endLng: 116.4074,
      arcAlt: 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 7,
      startLat: -33.8688,  // Sydney
      startLng: 151.2093,
      endLat: 45.5017,    // Montreal
      endLng: -73.5673,
      arcAlt: 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 8,
      startLat: -37.8136,  // Melbourne
      startLng: 144.9631,
      endLat: 31.2304,    // Shanghai
      endLng: 121.4737,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 9,
      startLat: 43.6532,   // Toronto
      startLng: -79.3832,
      endLat: 23.1291,    // Guangzhou
      endLng: 113.2644,
      arcAlt: 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 10,
      startLat: 49.2827,   // Vancouver
      startLng: -123.1207,
      endLat: 22.5431,    // Shenzhen
      endLng: 114.0579,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 11,
      startLat: -33.8688,  // Sydney
      startLng: 151.2093,
      endLat: -37.8136,   // Melbourne
      endLng: 144.9631,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 12,
      startLat: 39.9042,   // Beijing
      startLng: 116.4074,
      endLat: 31.2304,    // Shanghai
      endLng: 121.4737,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 13,
      startLat: 23.1291,   // Guangzhou
      startLng: 113.2644,
      endLat: 22.5431,    // Shenzhen
      endLng: 114.0579,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 14,
      startLat: 43.6532,   // Toronto
      startLng: -79.3832,
      endLat: 45.5017,    // Montreal
      endLng: -73.5673,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 15,
      startLat: -27.4698,  // Brisbane
      startLng: 153.0251,
      endLat: -33.8688,   // Sydney
      endLng: 151.2093,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 16,
      startLat: 40.7128,   // New York
      startLng: -74.0060,
      endLat: -33.8688,   // Sydney
      endLng: 151.2093,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 17,
      startLat: 41.8781,   // Chicago
      startLng: -87.6298,
      endLat: 31.2304,    // Shanghai
      endLng: 121.4737,
      arcAlt: 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 18,
      startLat: 34.0522,   // Los Angeles
      startLng: -118.2437,
      endLat: 39.9042,    // Beijing
      endLng: 116.4074,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 19,
      startLat: 40.7128,   // New York
      startLng: -74.0060,
      endLat: 41.8781,    // Chicago
      endLng: -87.6298,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 20,
      startLat: 41.8781,   // Chicago
      startLng: -87.6298,
      endLat: 34.0522,    // Los Angeles
      endLng: -118.2437,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    },
    {
      order: 21,
      startLat: 34.0522,   // Los Angeles
      startLng: -118.2437,
      endLat: 40.7128,    // New York
      endLng: -74.0060,
      arcAlt: 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }
  ];

  return (
    <div className="flex flex-col items-center justify-start py-12 h-[70vh] md:h-[80vh] dark:bg-black bg-white relative w-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full px-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="relative z-20 pt-8 md:pt-12 pb-16"
        >
          <h2 className="text-center text-3xl md:text-5xl font-bold text-black dark:text-white mb-6">
            Connect With Us
          </h2>
          <p className="text-center text-lg md:text-xl font-normal text-neutral-700 dark:text-neutral-200 max-w-2xl mt-4 mx-auto">
            Our network spans across continents, connecting people and ideas worldwide.
          </p>
        </motion.div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
        <div className="absolute inset-0 w-full h-full z-10 translate-y-[20%]">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
} 
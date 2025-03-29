"use client";
import React from "react";
import { LayoutGrid } from "../ui/layout-grid";

// LayoutGridDemo Component – now using a full-width container so that the grid stretches fully
export function LayoutGridDemo() {
  console.log("LayoutGridDemo mounted");
  return (
    <div className="w-full py-1 bg-black">
      {/* Removed max-w-7xl and mx-auto to allow full width */}
      <LayoutGrid cards={cards} />
    </div>
  );
}

// ----------------------------------------------------------------------------
// Skeleton Components – sample content for each card
// ----------------------------------------------------------------------------
const SkeletonOne = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      Ceramics
    </p>
    <p className="font-normal text-base text-white"></p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
    This campaign centers on the unique artistry of handcrafted ceramics, highlighting sustainable production methods and timeless design.
    </p>
  </div>
);

const SkeletonTwo = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      Heat
    </p>
    <p className="font-normal text-base text-white"></p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
    The campaign spotlights the vibrant essence of summer with a fresh clothing brand featuring lightweight fabrics and bold, breezy designs.
    </p>
  </div>
);

const SkeletonThree = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      Social Distance
    </p>
    <p className="font-normal text-base text-white"></p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
    This campaign emphasizes the importance of social distancing through clear, relatable messaging.
    </p>
  </div>
);

const SkeletonFour = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      Rivers Are Serene
    </p>
    <p className="font-normal text-base text-white"></p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      A tranquil abode by the river, where gentle waters create a soothing vibe.
    </p>
  </div>
);

const SkeletonFive = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      Deep Dive
    </p>
    <p className="font-normal text-base text-white"></p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
    Using compelling narratives through engaging storytelling and expert interviews.
    </p>
  </div>
);

const SkeletonSix = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      Image
    </p>
    <p className="font-normal text-base text-white"></p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
    This campaign invites a deeper reflection on the gap between self-representation and public perception.
    </p>
  </div>
);

const SkeletonSeven = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      Mountain Escape
    </p>
    <p className="font-normal text-base text-white"></p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      A rugged mountain cabin offering a retreat into nature’s raw beauty.
    </p>
  </div>
);

const SkeletonEight = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      Desert Mirage
    </p>
    <p className="font-normal text-base text-white"></p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      A striking home set in the desert, where minimalism meets breathtaking horizons.
    </p>
  </div>
);

// ----------------------------------------------------------------------------
// Cards Array – eight cards to fill the grid nicely
// ----------------------------------------------------------------------------
const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "ceramics.webp",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "heat.webp",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "socialdistance.webp",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "river.webp",
  },
  {
    id: 5,
    content: <SkeletonFive />,
    className: "col-span-1",
    thumbnail:
      "podcast.webp",
  },
  {
    id: 6,
    content: <SkeletonSix />,
    className: "col-span-1",
    thumbnail:
      "power.webp",
  },
  {
    id: 7,
    content: <SkeletonSeven />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=3540&auto=format&fit=crop",
  },
  {
    id: 8,
    content: <SkeletonEight />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=3540&auto=format&fit=crop",
  },
];

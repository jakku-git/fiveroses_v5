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
      House in the Woods
    </p>
    <p className="font-normal text-base text-white"></p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      A serene retreat set amidst towering trees, offering peaceful solitude.
    </p>
  </div>
);

const SkeletonTwo = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      House Above the Clouds
    </p>
    <p className="font-normal text-base text-white"></p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Perched high above, this dwelling offers breathtaking, expansive views.
    </p>
  </div>
);

const SkeletonThree = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      Greens All Over
    </p>
    <p className="font-normal text-base text-white"></p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      A house surrounded by lush, vibrant nature—an idyllic escape.
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
      Urban Oasis
    </p>
    <p className="font-normal text-base text-white"></p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      A modern retreat blending city energy with natural comfort.
    </p>
  </div>
);

const SkeletonSix = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">
      Coastal Charm
    </p>
    <p className="font-normal text-base text-white"></p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      A stunning seaside home where ocean breezes and scenic views abound.
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
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop",
  },
  {
    id: 5,
    content: <SkeletonFive />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62?q=80&w=3540&auto=format&fit=crop",
  },
  {
    id: 6,
    content: <SkeletonSix />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=3540&auto=format&fit=crop",
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

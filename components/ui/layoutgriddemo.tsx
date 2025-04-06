"use client";
import React from "react";
import { LayoutGrid } from "../ui/layout-grid";

type CardContent = {
  title: string;
  subtitle: string;
  description: string;
};

type Card = {
  id: number;
  content: React.ReactNode | CardContent;
  className: string;
  thumbnail: string;
  href?: string;
};

// LayoutGridDemo Component – now using a full-width container so that the grid stretches fully
export function LayoutGridDemo() {
  console.log("LayoutGridDemo mounted");
  return (
    <div className="w-full py-12 bg-black">
      {/* Removed max-w-7xl and mx-auto to allow full width */}
      <LayoutGrid cards={cards} />
    </div>
  );
}

// ----------------------------------------------------------------------------
// Skeleton Components – sample content for each card
// ----------------------------------------------------------------------------
const SkeletonOne = () => (
  <div className="space-y-2">
    <p className="font-medium text-lg tracking-tight text-white/90">
      terra&tone
    </p>
    <p className="font-light text-sm text-white/70">
      Handmade Harmony
    </p>
    <p className="font-normal text-sm mt-3 max-w-lg text-white/60">
      We crafted a serene brand identity and eCommerce experience for terra&tone, a modern ceramics studio blending tradition with minimalism.
    </p>
  </div>
);

const SkeletonTwo = () => (
  <div className="space-y-2">
    <p className="font-medium text-lg tracking-tight text-white/90">
      Solstice Bloom
    </p>
    <p className="font-light text-sm text-white/70">
      Summer, Styled
    </p>
    <p className="font-normal text-sm mt-3 max-w-lg text-white/60">
      A sun-soaked launch campaign for a fresh fashion label, blending spontaneous visuals with Gen Z appeal.
    </p>
  </div>
);

const SkeletonThree = () => (
  <div className="space-y-2">
    <p className="font-medium text-lg tracking-tight text-white/90">
      NEON DUSK
    </p>
    <p className="font-light text-sm text-white/70">
      Future Vision
    </p>
    <p className="font-normal text-sm mt-3 max-w-lg text-white/60">
      We built the visual identity and landing experience for NEON DUSK, an indie VR brand merging cyberpunk aesthetics with immersive tech.
    </p>
  </div>
);

const SkeletonFour = () => (
  <div className="space-y-2">
    <p className="font-medium text-lg tracking-tight text-white/90">
      Forge & Hide
    </p>
    <p className="font-light text-sm text-white/70">
      Craft in Every Cut
    </p>
    <p className="font-normal text-sm mt-3 max-w-lg text-white/60">
      We documented the artisanal process and created a brand story for Forge & Hide, a heritage leather workshop blending timeless craftsmanship with modern storytelling.
    </p>
  </div>
);

const SkeletonFive = () => (
  <div className="space-y-2">
    <p className="font-medium text-lg tracking-tight text-white/90">
      Lūma Glassworks
    </p>
    <p className="font-light text-sm text-white/70">
      Clarity in Motion
    </p>
    <p className="font-normal text-sm mt-3 max-w-lg text-white/60">
      From product photography to digital presence, we helped Lūma Glassworks showcase the delicate art of modern glass craftsmanship.
    </p>
  </div>
);

const SkeletonSix = () => (
  <div className="space-y-2">
    <p className="font-medium text-lg tracking-tight text-white/90">
      Zesteo
    </p>
    <p className="font-light text-sm text-white/70">
      Citrus-Forward Refreshment
    </p>
    <p className="font-normal text-sm mt-3 max-w-lg text-white/60">
      We created a bold, juicy brand identity for Zesteo, a sparkling lime & lemon drinks company with a punchy presence.
    </p>
  </div>
);

const SkeletonSeven = () => (
  <div className="space-y-2">
    <p className="font-medium text-lg tracking-tight text-white/90">
      Little Mess Makers
    </p>
    <p className="font-light text-sm text-white/70">
      Where Creativity Begins
    </p>
    <p className="font-normal text-sm mt-3 max-w-lg text-white/60">
      We developed playful branding and visuals for Little Mess Makers, a kids' art class program designed to spark imagination.
    </p>
  </div>
);

const SkeletonEight = () => (
  <div className="space-y-2">
    <p className="font-medium text-lg tracking-tight text-white/90">
      NAILPOP
    </p>
    <p className="font-light text-sm text-white/70">
      Color Outside the Lines
    </p>
    <p className="font-normal text-sm mt-3 max-w-lg text-white/60">
      We helped NAILPOP launch a vibrant digital campaign celebrating bold self-expression through nail art and playful design.
    </p>
  </div>
);

const SkeletonNine = () => (
  <div className="space-y-2">
    <p className="font-medium text-lg tracking-tight text-white/90">
      Verdella Farms
    </p>
    <p className="font-light text-sm text-white/70">
      Rooted in Realness
    </p>
    <p className="font-normal text-sm mt-3 max-w-lg text-white/60">
      We told the story of Verdella Farms through authentic imagery and brand storytelling that connects earth, women, and growth.
    </p>
  </div>
);

const SkeletonTen = () => (
  <div className="space-y-2">
    <p className="font-medium text-lg tracking-tight text-white/90">
      Syntech Industries
    </p>
    <p className="font-light text-sm text-white/70">
      Precision at Scale
    </p>
    <p className="font-normal text-sm mt-3 max-w-lg text-white/60">
      We designed a futuristic visual identity and microsite for Syntech Industries, showcasing innovation in automation and robotics.
    </p>
  </div>
);

const SkeletonEleven = () => (
  <div className="space-y-2">
    <p className="font-medium text-lg tracking-tight text-white/90">
      AEROVANT
    </p>
    <p className="font-light text-sm text-white/70">
      Flight, Reimagined
    </p>
    <p className="font-normal text-sm mt-3 max-w-lg text-white/60">
      From naming to narrative, we helped AEROVANT present their next-gen aviation concept with sleek visuals and brand positioning.
    </p>
  </div>
);

const SkeletonTwelve = () => (
  <div className="space-y-2">
    <p className="font-medium text-lg tracking-tight text-white/90">
      Moss & Mineral
    </p>
    <p className="font-light text-sm text-white/70">
      Clean Beauty, Naturally
    </p>
    <p className="font-normal text-sm mt-3 max-w-lg text-white/60">
      We created the brand identity and packaging concept for Moss & Mineral, a gentle care line for skin, hair, and earth.
    </p>
  </div>
);

// ----------------------------------------------------------------------------
// Cards Array – twelve cards to fill the grid
// ----------------------------------------------------------------------------
const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: "https://pub-af52e145b46f4643840668ef5bf23952.r2.dev/ceramics%20(4).webp",
    href: "/work/terra-and-tone-ceramics"
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail: "https://pub-2634c5482cbc49329e9902214d332db6.r2.dev/heat%20(4).webp",
    href: "/work/solstice-bloom-fashion"
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail: "https://pub-e08ddc6efc2944bb84b7982b6e8825b4.r2.dev/cyberpunkvr%20(1).webp",
    href: "/work/neon-dusk-vr-branding"
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail: "https://pub-bef823910dc44973941ddebcc9ec07c8.r2.dev/leather%20(1).webp",
    href: "/work/forge-and-hide-leather"
  },
  {
    id: 5,
    content: <SkeletonFive />,
    className: "col-span-1",
    thumbnail: "https://pub-5d7c3f192a6844559ecb0366466f8b3e.r2.dev/glass%20(4).webp",
    href: "/work/luma-glassworks-visuals"
  },
  {
    id: 6,
    content: <SkeletonSix />,
    className: "col-span-1",
    thumbnail: "https://pub-a74269ab9d1140f4b9b01e4b98c35bc7.r2.dev/drinks%20(6).webp",
    href: "/work/zesteo-drink-brand"
  },
  {
    id: 7,
    content: {
      title: "Little Mess Makers",
      subtitle: "Identity / Strategy",
      description: "Brand Identity & Experience Design",
    },
    className: "md:col-span-2",
    thumbnail: "https://pub-762008b27cff430289f9cb812010d371.r2.dev/artscraft%20(2).webp",
    href: "/work/little-mess-makers-brand"
  },
  {
    id: 8,
    content: <SkeletonEight />,
    className: "col-span-1",
    thumbnail: "https://pub-ad061bfadf884f598139510ae71023ba.r2.dev/nails%20(4).webp",
    href: "/work/nailpop-brand-campaign"
  },
  {
    id: 9,
    content: <SkeletonNine />,
    className: "col-span-1",
    thumbnail: "https://pub-a9a5f35f84584290a9de003cf86faf37.r2.dev/farm%20(5).webp",
    href: "/work/verdella-farms-brand"
  },
  {
    id: 10,
    content: <SkeletonTen />,
    className: "col-span-1",
    thumbnail: "https://pub-c9720308467542c7bced018c5417e470.r2.dev/cyborg%20(1).webp",
    href: "/work/syntech-industries-brand"
  },
  {
    id: 11,
    content: <SkeletonEleven />,
    className: "col-span-1",
    thumbnail: "https://pub-31835f4925254f16ad9ce47bfe082f11.r2.dev/btstourists%20(5).webp",
    href: "/work/aerovant-aviation-brand"
  },
  {
    id: 12,
    content: <SkeletonTwelve />,
    className: "md:col-span-2",
    thumbnail: "https://pub-89ed998cc2bc412db543bb4b8c57e662.r2.dev/soapstory%20(6).webp",
    href: "/work/moss-and-mineral-brand"
  }
];

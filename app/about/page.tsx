"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import only the components we're using
const BackgroundBoxes = dynamic(() => import("@/components/ui/background-boxes").then(mod => mod.BackgroundBoxes), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />
});

const ServicesAccordion = dynamic(() => import("@/components/ui/services-accordion").then(mod => mod.ServicesAccordion), {
  ssr: false,
  loading: () => <div className="w-full h-[60vh] bg-[#4A148C]/50 animate-pulse" />
});

const AboutAccordion = dynamic(() => import("@/components/ui/about-accordion").then(mod => mod.AboutAccordion), {
  ssr: false,
  loading: () => <div className="w-full h-[60vh] bg-black animate-pulse" />
});

export default function AboutPage() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Only show heavy components after initial load
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full h-screen relative bg-black text-white">
        {isVisible && <BackgroundBoxes className="absolute inset-0" />}
      </section>

      {/* About Section */}
      <div className="w-full bg-black text-white">
        <div className="w-[80%] mx-auto pt-24">
          <h1 className="text-3xl md:text-5xl font-light tracking-tighter mb-8">About fiveroses</h1>
          <div className="space-y-6 max-w-3xl mb-16">
            <p className="text-xl font-light text-white/70 leading-relaxed">
              At fiveroses, we're more than a creative studio. We're a collective of makers, thinkers, and storytellers driven by one goal: to turn ideas & imagination into execution. We exist to craft meaningful experiences that don't just look beautiful, but feel unforgettable.
            </p>
            <p className="text-xl font-light text-white/70 leading-relaxed">
              We believe creativity should make you feel something. It should stir curiosity, spark conversation, and leave a lasting imprint. Whether we're building brands, crafting content, or coding immersive digital experiences, our work is rooted in emotion and powered by intention.
            </p>
          </div>
        </div>
      </div>

      {/* About Accordion Section */}
      {isVisible && <AboutAccordion />}

      {/* Services Accordion Section */}
      <div className="w-full bg-black text-white pt-24">
        {isVisible && <ServicesAccordion />}
      </div>
    </main>
  );
} 
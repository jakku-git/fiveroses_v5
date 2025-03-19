"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { SparklesCore } from "../ui/sparkles";

interface FlowerProps {
  left: string;
  top: string;
  size?: number;
  petals?: number;
}

const Flower = ({
  left,
  top,
  size = 150,
  petals = 8,
}: FlowerProps) => {
  const petalClipPath =
    "path('M50 0 C65 10, 100 35, 50 100 C0 35, 35 10, 50 0 Z')";
  const generateRandomColor = () => {
    const colors = ["#FF5F6D", "#FFC371", "#FF9A8B", "#FF6A88", "#FF99AC"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      className="absolute"
      style={{
        width: size,
        height: size,
        left: left,
        top: top,
        transform: "translate(-50%, -50%)",
      }}
    >
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (360 / petals) * i;
        return (
          <motion.div
            key={i}
            style={{
              clipPath: petalClipPath,
              transform: `rotate(${angle}deg) translateY(-110%)`,
            }}
            className="absolute inset-0 bg-white/[0.01] border border-white/[0.05]"
            initial={{ opacity: 0 }}
            whileHover={{
              opacity: 0.8,
              backgroundColor: generateRandomColor(),
              transition: { duration: 0 },
            }}
          />
        );
      })}
    </div>
  );
};

interface BackgroundBoxesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const BackgroundBoxes = ({ className, ...props }: BackgroundBoxesProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Build a grid of flowers.
  const flowerRows = 12;
  const flowerCols = 16;
  const flowerSize = 150;
  const offsetX = 3; // percentage offset on left/right
  const offsetY = 3; // percentage offset on top/bottom
  const flowers = [];
  for (let row = 0; row < flowerRows; row++) {
    for (let col = 0; col < flowerCols; col++) {
      const left = `${(col / (flowerCols - 1)) * 100 - offsetX}%`;
      const top = `${(row / (flowerRows - 1)) * 100 - offsetY}%`;
      flowers.push({ left, top });
    }
  }

  // Create a custom sparkle colors array:
  // 83% white, 10% pastel red, and 7% pastel orange.
  const customSparkleColors = useMemo(() => {
    const colors = [];
    for (let i = 0; i < 83; i++) colors.push("#FFFFFF");
    for (let i = 0; i < 10; i++) colors.push("#FF9AA2");
    for (let i = 0; i < 7; i++) colors.push("#FFD1A9");
    return colors;
  }, []);

  return (
    <div
      {...props}
      className={`absolute inset-0 overflow-hidden ${className || ""}`}
    >
      {mounted && (
        <>
          {/* Sparkles effect layer */}
          <div className="absolute inset-0 w-full h-full">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="w-full h-full"
              particleColor={customSparkleColors}
            />
          </div>

          {/* Flower background layer */}
          <div className="relative h-full w-full">
            {flowers.map((flower, i) => (
              <Flower
                key={i}
                left={flower.left}
                top={flower.top}
                size={flowerSize}
                petals={8}
              />
            ))}
          </div>
        </>
      )}

      {/* Text overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center px-6">
          <TextGenerateEffect
            words="a creative digital agency focused on growing brands through strategic and innovative marketing solutions."
            className="text-5xl md:text-6xl font-bold text-white max-w-screen-xl mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

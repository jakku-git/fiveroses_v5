"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
// Removed TextHoverEffect import since it's no longer used in the overlay.

const Flower = ({
  left,
  top,
  size = 150,
  petals = 8,
}: {
  left: string
  top: string
  size?: number
  petals?: number
}) => {
  // Define a petal shape using an SVG path.
  const petalClipPath = "path('M50 0 C65 10, 100 35, 50 100 C0 35, 35 10, 50 0 Z')"

  const generateRandomColor = () => {
    const colors = ["#FF5F6D", "#FFC371", "#FF9A8B", "#FF6A88", "#FF99AC"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

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
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            whileHover={{
              backgroundColor: generateRandomColor(),
              opacity: 0.8,
              transition: { duration: 0 },
            }}
          />
        )
      })}
    </div>
  )
}

export const BackgroundBoxes = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Grid settings to cover the background.
  const flowerRows = 12
  const flowerCols = 16
  const flowerSize = 150

  // Compute positions for each flower with a slight negative offset to cover gaps.
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

  return (
    <div {...props} className={`absolute inset-0 ${props.className || ""}`}>
      {mounted && (
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
      )}
      {/* Text overlay – using only TextGenerateEffect as the headline */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center px-6">
          <TextGenerateEffect
            words="a creative digital agency focused on growing brands through strategic and innovative marketing solutions."
            className="text-5xl md:text-6xl font-bold text-white max-w-2xl mx-auto"
          />
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FocusCardsProps {
  items: {
    title: string
    description: string
    icon?: string
  }[]
  className?: string
}

export function FocusCards({ items, className }: FocusCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            className="absolute inset-0 bg-neutral-900 rounded-lg"
            layoutId={`card-${idx}`}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
          <motion.div
            className={cn(
              "relative z-10 p-8 rounded-lg border border-white/10 h-full",
              hoveredIndex === idx ? "border-accent/50" : "border-white/10",
            )}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          >
            {item.icon && <div className="text-4xl mb-4">{item.icon}</div>}
            <h3 className="text-xl font-light mb-2">{item.title}</h3>
            <p className="text-neutral-300 text-sm">{item.description}</p>
          </motion.div>
        </div>
      ))}
    </div>
  )
}


"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export const EvervaultCard = ({
  text = "fiveroses",
  className,
}: {
  text?: string
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePosition({ x, y })
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const calculateRotation = () => {
    if (!containerRef.current) return { x: 0, y: 0 }

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (mousePosition.y - centerY) / 20
    const rotateY = (centerX - mousePosition.x) / 20

    return { x: rotateX, y: rotateY }
  }

  const rotation = calculateRotation()

  return (
    <div
      ref={containerRef}
      className={`relative h-60 w-96 rounded-xl bg-neutral-900 border border-white/10 overflow-hidden ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

        <div className="text-center z-10">
          <h3 className="text-2xl font-light mb-2">{text}</h3>
          <p className="text-neutral-300 text-sm">Web Development</p>
        </div>

        <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-0.5 p-4">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="bg-white/[0.01] rounded-sm border border-white/[0.05]" />
          ))}
        </div>
      </motion.div>
    </div>
  )
}


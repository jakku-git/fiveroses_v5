"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export const BackgroundGradientAnimation = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const colors = [
    "rgba(255, 182, 193, 0.6)", // Light pink (rose)
    "rgba(255, 182, 193, 0.3)", // Lighter pink
    "rgba(0, 0, 0, 0.8)", // Dark background
  ]

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-black ${className}`} style={{ minHeight: "100vh" }}>
      <div className="absolute inset-0 overflow-hidden">
        {/* Static gradient background */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colors[0]} 0%, ${colors[2]} 70%)`,
          }}
        />

        {/* Animated gradients */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              `radial-gradient(circle at 30% 40%, ${colors[0]} 0%, transparent 50%)`,
              `radial-gradient(circle at 70% 60%, ${colors[0]} 0%, transparent 50%)`,
              `radial-gradient(circle at 40% 80%, ${colors[0]} 0%, transparent 50%)`,
              `radial-gradient(circle at 60% 30%, ${colors[0]} 0%, transparent 50%)`,
              `radial-gradient(circle at 30% 40%, ${colors[0]} 0%, transparent 50%)`,
            ],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />

        {/* Mouse follower gradient */}
        {dimensions.width > 0 && (
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${colors[0]} 0%, transparent 40%)`,
            }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}


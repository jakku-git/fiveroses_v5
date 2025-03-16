"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: 0.3 },
    })
  }, [controls])

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-black ${className}`}
      style={{ minHeight: "100vh" }}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 z-0 bg-black"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 182, 193, 0.15) 0%, rgba(0, 0, 0, 0.95) 50%)`,
          }}
        />
      </div>

      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <div className="w-56 h-56 md:w-96 md:h-96 rounded-full bg-accent/20 blur-3xl" />
      </motion.div>

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={controls} className="relative z-10">
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}


"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export const AuroraBackground = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative w-full min-h-screen overflow-hidden bg-black ${className}`}>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[100px] opacity-50"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(255, 182, 193, 0.3) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 60% 40%, rgba(255, 182, 193, 0.3) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 40% 60%, rgba(255, 182, 193, 0.3) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 50% 50%, rgba(255, 182, 193, 0.3) 0%, rgba(0, 0, 0, 0) 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -inset-[100px] opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 70% 30%, rgba(148, 0, 211, 0.3) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 30% 70%, rgba(148, 0, 211, 0.3) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 60% 50%, rgba(148,  0, 211, 0.3) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 60% 50%, rgba(148, 0, 211, 0.3) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 70% 30%, rgba(148, 0, 211, 0.3) 0%, rgba(0, 0, 0, 0) 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -inset-[100px] opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 182, 193, 0.5) 0%, rgba(0, 0, 0, 0) 50%)`,
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}


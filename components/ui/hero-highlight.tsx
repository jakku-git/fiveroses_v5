"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

export const HeroHighlight = ({
  title,
  description,
  highlightColor = "#ffd700",
}: {
  title: string
  description: string
  highlightColor?: string
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

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
    const animateCursor = () => {
      setCursorPosition((prev) => {
        return {
          x: prev.x + (mousePosition.x - prev.x) * 0.1,
          y: prev.y + (mousePosition.y - prev.y) * 0.1,
        }
      })
      requestAnimationFrame(animateCursor)
    }

    const animationFrame = requestAnimationFrame(animateCursor)
    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [mousePosition])

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: cursorPosition.x - 150,
          y: cursorPosition.y - 150,
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        style={{
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle at center, ${highlightColor} 0%, rgba(0, 0, 0, 0) 70%)`,
          filter: "blur(40px)",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-7xl font-light tracking-tighter mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-neutral-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-accent transition-all duration-300"
          >
            Explore our services
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  )
}


"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

export const Lens = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setPosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-neutral-900 rounded-lg overflow-hidden">
        <img
          ref={imageRef}
          src="/placeholder.svg?height=800&width=600"
          alt="Marketing Strategy"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {isHovered && (
        <motion.div
          className="absolute pointer-events-none"
          animate={{
            x: position.x - 100,
            y: position.y - 100,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.3)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url('/placeholder.svg?height=800&width=600')`,
              backgroundSize: "cover",
              backgroundPosition: `${-position.x + 100}px ${-position.y + 100}px`,
              transform: "scale(1.5)",
            }}
          />
        </motion.div>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-8 bg-black/60 rounded-lg max-w-md">
          <h3 className="text-2xl font-light mb-4">Strategic Marketing</h3>
          <p className="text-neutral-300">
            Our data-driven approach ensures your marketing efforts deliver measurable results and ROI.
          </p>
        </div>
      </div>
    </div>
  )
}


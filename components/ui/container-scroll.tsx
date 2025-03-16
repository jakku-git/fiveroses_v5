"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight)
    }
    updateViewportHeight()
    window.addEventListener("resize", updateViewportHeight)
    return () => {
      window.removeEventListener("resize", updateViewportHeight)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const position = useTransform(scrollYProgress, (pos) => {
    return pos === 1 ? "relative" : "fixed"
  })

  return (
    <motion.div ref={containerRef} className="relative mb-[-100vh] h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-20 overflow-hidden">
        <motion.div style={{ opacity, scale, position }} className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          {titleComponent}
        </motion.div>

        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5], [0, 1]),
          }}
          className="w-full h-full flex items-center justify-center"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  )
}


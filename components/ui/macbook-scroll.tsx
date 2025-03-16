"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export const MacbookScroll = ({
  title,
  src,
  showGradient = false,
}: {
  title?: string | React.ReactNode
  src: string
  showGradient?: boolean
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.3, 1, 0.6])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 0])
  const titleTranslate = useTransform(scrollYProgress, [0, 0.3, 0.6], [50, 0, -50])

  return (
    <div
      ref={containerRef}
      className="relative h-[180vh] flex flex-col items-center py-0 [perspective:1000px] [transform-style:preserve-3d]"
    >
      <div className="h-screen sticky top-0 flex flex-col items-center justify-start pt-20 md:pt-32">
        {title && (
          <motion.div
            style={{
              opacity: titleOpacity,
              y: titleTranslate,
            }}
            className="text-center max-w-4xl px-4 md:px-0"
          >
            <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-6">{title}</h2>
            <p className="text-neutral-300 text-lg md:text-xl max-w-2xl mx-auto">
              Our development process ensures your project is delivered on time, on budget, and exceeds expectations.
            </p>
          </motion.div>
        )}

        <motion.div
          style={{
            scale: imageScale,
            opacity: imageOpacity,
          }}
          className="relative w-full max-w-5xl mt-10 md:mt-20 [transform-style:preserve-3d]"
        >
          <div className="macbook-container">
            <img src="/macbook-frame.png" alt="MacBook Frame" className="w-full h-auto relative z-10" />
            <div className="absolute inset-[3.5%] top-[3.5%] bottom-[18%] rounded-t-lg overflow-hidden">
              <img src={src || "/placeholder.svg"} alt="Website Preview" className="w-full h-full object-cover" />
              {showGradient && <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


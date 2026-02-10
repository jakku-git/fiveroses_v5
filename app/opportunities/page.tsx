"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Lenis from "@studio-freight/lenis"
import Link from "next/link"

export default function OpportunitiesPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <main ref={containerRef} className="relative w-full min-h-screen bg-black overflow-x-hidden">
      <motion.div 
        style={{ opacity, scale }}
        className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 py-24"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-[-0.04em] text-white mb-6">
              {"Opportunities".split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.03,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-white/70 font-light tracking-wide"
            >
              Choose your path forward.
            </motion.p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Investors Card */}
            <Link href="/investors">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredCard("investors")}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative h-[500px] bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Background Gradient */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === "investors" ? 0.1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
                />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-10 md:p-12">
                  <div>
                    <motion.div
                      animate={{ 
                        x: hoveredCard === "investors" ? 10 : 0,
                        y: hoveredCard === "investors" ? -10 : 0
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-8"
                    >
                      <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                      Investors
                    </h2>
                    <p className="text-lg text-white/70 font-light leading-relaxed mb-6">
                      Strategic capital for scaling an integrated creative platform bridging international markets.
                    </p>

                    <div className="space-y-3 text-white/60 text-sm font-light">
                      <div className="flex items-start gap-2">
                        <span className="text-white/40 mt-1">•</span>
                        <span>Proven business model with strong unit economics</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-white/40 mt-1">•</span>
                        <span>Defensible competitive advantages across markets</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-white/40 mt-1">•</span>
                        <span>Clear path to $8.5M revenue within 5 years</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={{ 
                      x: hoveredCard === "investors" ? 5 : 0,
                      y: hoveredCard === "investors" ? -5 : 0
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 text-white/80 group-hover:text-white transition-colors"
                  >
                    <span className="text-lg font-medium">View Investment Opportunity</span>
                    <svg className="w-6 h-6 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </motion.div>
                </div>

                {/* Hover Border Effect */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredCard === "investors" ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white origin-left"
                />
              </motion.div>
            </Link>

            {/* Partnerships Card */}
            <Link href="/partnerships">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredCard("partnerships")}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative h-[500px] bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Background Gradient */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === "partnerships" ? 0.1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
                />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-10 md:p-12">
                  <div>
                    <motion.div
                      animate={{ 
                        x: hoveredCard === "partnerships" ? 10 : 0,
                        y: hoveredCard === "partnerships" ? -10 : 0
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-8"
                    >
                      <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                      Partnerships
                    </h2>
                    <p className="text-lg text-white/70 font-light leading-relaxed mb-6">
                      Collaborate with us as a creative or technical specialist on world-class projects.
                    </p>

                    <div className="space-y-3 text-white/60 text-sm font-light">
                      <div className="flex items-start gap-2">
                        <span className="text-white/40 mt-1">•</span>
                        <span>Work with premium clients across international markets</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-white/40 mt-1">•</span>
                        <span>Focus on craft while we handle client management</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-white/40 mt-1">•</span>
                        <span>Consistent work flow with portfolio-grade projects</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={{ 
                      x: hoveredCard === "partnerships" ? 5 : 0,
                      y: hoveredCard === "partnerships" ? -5 : 0
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 text-white/80 group-hover:text-white transition-colors"
                  >
                    <span className="text-lg font-medium">Explore Partnership Opportunities</span>
                    <svg className="w-6 h-6 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </motion.div>
                </div>

                {/* Hover Border Effect */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredCard === "partnerships" ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white origin-left"
                />
              </motion.div>
            </Link>
          </div>

          {/* Footer Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-20"
          >
            <p className="text-white/50 font-light text-sm tracking-wide">
              Both paths lead to the same destination: building something exceptional together.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}

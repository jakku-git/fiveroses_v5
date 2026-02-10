"use client"

import React, { useEffect, useRef, useState, useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Lenis from "@studio-freight/lenis"
import Link from "next/link"

export default function OpportunitiesPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

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

  const words = ["Two", "paths.", "One", "vision."]
  
  const randomValues = useMemo(() => {
    const values: { x: number; y: number; rotate: number }[] = []
    words.forEach(word => {
      word.split('').forEach(() => {
        values.push({
          x: (Math.random() - 0.5) * 150,
          y: (Math.random() - 0.5) * 150,
          rotate: (Math.random() - 0.5) * 60
        })
      })
    })
    return values
  }, [words.length])

  return (
    <main ref={containerRef} className="relative w-full min-h-screen bg-black overflow-x-hidden">
      <motion.div 
        style={{ opacity, y }}
        className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 py-24"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.95] tracking-[-0.04em] text-white mb-8">
              {words.map((word, wordIndex) => {
                let charOffset = 0
                for (let i = 0; i < wordIndex; i++) {
                  charOffset += words[i].length
                }
                
                return (
                  <React.Fragment key={wordIndex}>
                    <span className="inline-block mr-[0.2em] whitespace-nowrap">
                      {word.split('').map((char, charIndex) => {
                        const globalIndex = charOffset + charIndex
                        const { x, y, rotate } = randomValues[globalIndex]
                        
                        return (
                          <motion.span
                            key={charIndex}
                            initial={{ 
                              x,
                              y,
                              rotate,
                              opacity: 0,
                              scale: 0
                            }}
                            animate={{ 
                              x: 0,
                              y: 0,
                              rotate: 0,
                              opacity: 1,
                              scale: 1
                            }}
                            transition={{
                              duration: 0.8,
                              delay: globalIndex * 0.02,
                              ease: [0.16, 1, 0.3, 1]
                            }}
                            className="inline-block"
                          >
                            {char}
                          </motion.span>
                        )
                      })}
                    </span>
                    {word === "paths." && <br />}
                  </React.Fragment>
                )
              })}
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-white/70 font-light tracking-wide max-w-3xl mx-auto"
            >
              Whether you're looking to invest in our growth or collaborate on world-class work, <span className="font-semibold">fiveroses</span> offers a path forward.
            </motion.p>
          </motion.div>

          {/* Cards - SWAPPED ORDER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mt-20">
            {/* Partnership Card - NOW ON LEFT */}
            <Link href="/partnership">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredCard("partnership")}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative h-[600px] bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer overflow-hidden"
              >

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-10 md:p-12">
                  <div>
                    <motion.div
                      animate={{ 
                        x: hoveredCard === "partnership" ? 10 : 0,
                        y: hoveredCard === "partnership" ? -10 : 0,
                        rotate: hoveredCard === "partnership" ? 5 : 0
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-8"
                    >
                      <svg className="w-20 h-20 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </motion.div>

                    <motion.h2 
                      className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight"
                      animate={{
                        x: hoveredCard === "partnership" ? 5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Partnership
                    </motion.h2>
                    
                    <motion.p 
                      className="text-lg text-white/70 font-light leading-relaxed mb-8"
                      animate={{
                        x: hoveredCard === "partnership" ? 5 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                    >
                      Join our network of exceptional creative and technical specialists. Work on portfolio-grade projects with premium clients across international markets.
                    </motion.p>

                    <div className="space-y-4 text-white/60 text-sm font-light">
                      <motion.div 
                        className="flex items-start gap-3"
                        animate={{
                          x: hoveredCard === "partnership" ? 10 : 0
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                        <span>Fair compensation with transparent profit sharing</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-start gap-3"
                        animate={{
                          x: hoveredCard === "partnership" ? 10 : 0
                        }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                        <span>Zero client management—focus 100% on craft</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-start gap-3"
                        animate={{
                          x: hoveredCard === "partnership" ? 10 : 0
                        }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                        <span>Meritocratic system: good work, good reward</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-start gap-3"
                        animate={{
                          x: hoveredCard === "partnership" ? 10 : 0
                        }}
                        transition={{ duration: 0.3, delay: 0.25 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                        <span>Path to retainer and equity partnerships</span>
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    animate={{ 
                      x: hoveredCard === "partnership" ? 8 : 0,
                      y: hoveredCard === "partnership" ? -8 : 0
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 text-white/80 group-hover:text-white transition-colors"
                  >
                    <span className="text-lg font-medium">Explore Partnership</span>
                    <motion.svg 
                      className="w-6 h-6"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{
                        x: hoveredCard === "partnership" ? 5 : 0,
                        y: hoveredCard === "partnership" ? -5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </motion.svg>
                  </motion.div>
                </div>

                {/* Animated Border Effect */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredCard === "partnership" ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white origin-left"
                />
              </motion.div>
            </Link>

            {/* Investors Card - NOW ON RIGHT */}
            <Link href="/investors">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredCard("investors")}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative h-[600px] bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer overflow-hidden"
              >

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-10 md:p-12">
                  <div>
                    <motion.div
                      animate={{ 
                        x: hoveredCard === "investors" ? 10 : 0,
                        y: hoveredCard === "investors" ? -10 : 0,
                        rotate: hoveredCard === "investors" ? -5 : 0
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mb-8"
                    >
                      <svg className="w-20 h-20 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </motion.div>

                    <motion.h2 
                      className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight"
                      animate={{
                        x: hoveredCard === "investors" ? 5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      Investors
                    </motion.h2>
                    
                    <motion.p 
                      className="text-lg text-white/70 font-light leading-relaxed mb-8"
                      animate={{
                        x: hoveredCard === "investors" ? 5 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                    >
                      Strategic capital for scaling an integrated creative platform bridging international markets. Proven model with defensible advantages.
                    </motion.p>

                    <div className="space-y-4 text-white/60 text-sm font-light">
                      <motion.div 
                        className="flex items-start gap-3"
                        animate={{
                          x: hoveredCard === "investors" ? 10 : 0
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                        <span>Proven business model with strong unit economics</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-start gap-3"
                        animate={{
                          x: hoveredCard === "investors" ? 10 : 0
                        }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                        <span>Defensible competitive advantages across markets</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-start gap-3"
                        animate={{
                          x: hoveredCard === "investors" ? 10 : 0
                        }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                        <span>Clear path to $8.5M revenue within 5 years</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-start gap-3"
                        animate={{
                          x: hoveredCard === "investors" ? 10 : 0
                        }}
                        transition={{ duration: 0.3, delay: 0.25 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 flex-shrink-0" />
                        <span>Government supplier status and media relationships</span>
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    animate={{ 
                      x: hoveredCard === "investors" ? 8 : 0,
                      y: hoveredCard === "investors" ? -8 : 0
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 text-white/80 group-hover:text-white transition-colors"
                  >
                    <span className="text-lg font-medium">View Investment Opportunity</span>
                    <motion.svg 
                      className="w-6 h-6"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{
                        x: hoveredCard === "investors" ? 5 : 0,
                        y: hoveredCard === "investors" ? -5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </motion.svg>
                  </motion.div>
                </div>

                {/* Animated Border Effect */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredCard === "investors" ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white origin-left"
                />
              </motion.div>
            </Link>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-24 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <motion.div 
                  className="text-4xl md:text-5xl font-light text-white mb-2"
                  whileInView={{ scale: [1, 1.05, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  $8.5M
                </motion.div>
                <div className="text-sm text-white/70 font-light">Year 5 Revenue Target</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-4xl md:text-5xl font-light text-white mb-2"
                  whileInView={{ scale: [1, 1.05, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  $473B
                </motion.div>
                <div className="text-sm text-white/70 font-light">Global Market Size</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-4xl md:text-5xl font-light text-white mb-2"
                  whileInView={{ scale: [1, 1.05, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  16+
                </motion.div>
                <div className="text-sm text-white/70 font-light">Platform Ecosystems</div>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-4xl md:text-5xl font-light text-white mb-2"
                  whileInView={{ scale: [1, 1.05, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  5-8
                </motion.div>
                <div className="text-sm text-white/70 font-light">Partner Network (2026)</div>
              </div>
            </div>
          </motion.div>

          {/* Footer Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-12"
          >
            <p className="text-white/50 font-light text-lg tracking-wide max-w-2xl mx-auto leading-relaxed mb-8">
              Both paths lead to the same destination: building something exceptional together. Choose the one that fits your goals.
            </p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover="hover"
                className="group min-h-[44px] text-lg md:text-xl text-white/80 hover:text-white active:text-white/90 inline-flex items-center gap-3 transition-colors duration-300 touch-manipulation px-2 py-2"
              >
                <motion.span 
                  className="relative inline-block"
                  variants={{
                    hover: {
                      backgroundSize: "100% 2px"
                    }
                  }}
                  style={{
                    background: "linear-gradient(currentColor, currentColor) no-repeat 0 100%",
                    backgroundSize: "0% 2px",
                    transition: "background-size 0.3s ease-out"
                  }}
                >
                  Request Access
                </motion.span>
                <motion.div
                  variants={{
                    hover: {
                      x: 5,
                      y: -5,
                      transition: { type: "spring", stiffness: 300, damping: 10 }
                    }
                  }}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Request Access Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-black border border-white/20 p-10 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light leading-none transition-colors"
            >
              ×
            </button>

            {!isSubmitted ? (
              <>
                <h3 className="text-4xl font-light text-white mb-3 tracking-tight">Request Access</h3>
                <p className="text-white/60 font-light mb-10 text-lg">Tell us about your interest and we'll be in touch within 24 hours.</p>
              </>
            ) : (
              <>
                <h3 className="text-4xl font-light text-white mb-3 tracking-tight">Thank You</h3>
                <p className="text-white/60 font-light mb-10 text-lg">We'll be in touch within 24 hours.</p>
              </>
            )}

            {!isSubmitted ? (
              <form 
                onSubmit={async (e) => {
                  e.preventDefault()
                  setIsSubmitting(true)
                  
                  const formData = new FormData(e.currentTarget)
                  const data = Object.fromEntries(formData.entries())
                  
                  try {
                    const response = await fetch('/api/contact', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        firstName: String(data.name || ''),
                        lastName: '',
                        email: String(data.email || ''),
                        jobTitle: `Opportunity Request - ${String(data.interest || '')}`,
                        company: String(data.company || ''),
                        location: String(data.phone || ''),
                        market: String(data.interest || 'Not specified'),
                        comment: `Interest: ${String(data.interest || '')}\n\nMessage:\n${String(data.message || '')}`
                      })
                    })

                    if (response.ok) {
                      setIsSubmitted(true)
                      setTimeout(() => {
                        setIsModalOpen(false)
                        setIsSubmitted(false)
                      }, 3000)
                    } else {
                      alert('Something went wrong. Please try again.')
                    }
                  } catch (error) {
                    alert('Something went wrong. Please try again.')
                  } finally {
                    setIsSubmitting(false)
                  }
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-light">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-light">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-light">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-light">Company/Organization</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-light">I'm Interested In *</label>
                  <select
                    name="interest"
                    required
                    className="w-full bg-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors font-light [&>option]:bg-black [&>option]:text-white"
                  >
                    <option value="">Select your interest</option>
                    <option value="Investment Opportunity">Investment Opportunity</option>
                    <option value="Partnership Opportunity">Partnership Opportunity</option>
                    <option value="Both">Both Investment & Partnership</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm font-light">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40 transition-colors font-light resize-none"
                    placeholder="Tell us more about your interest..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black py-4 font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6"
                >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}


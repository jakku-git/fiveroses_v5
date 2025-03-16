"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Item {
  title: string
  description: string
  content: string
  image: string
}

export const StickyScrollReveal = ({ items }: { items: Item[] }) => {
  const [activeCard, setActiveCard] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex((ref) => ref === entry.target)
            if (index !== -1) {
              setActiveCard(index)
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex flex-col md:flex-row">
        {/* Left side - sticky content */}
        <div className="w-full md:w-1/2 md:sticky md:top-32 md:h-[calc(100vh-8rem)] flex flex-col justify-center">
          <div className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden">
            <motion.img
              key={activeCard}
              src={items[activeCard].image}
              alt={items[activeCard].title}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <motion.h3
                key={`title-${activeCard}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl font-light mb-2"
              >
                {items[activeCard].title}
              </motion.h3>
              <motion.p
                key={`desc-${activeCard}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/80"
              >
                {items[activeCard].description}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Right side - scrolling content */}
        <div className="w-full md:w-1/2 space-y-24 py-12 md:py-0 md:pl-12">
          {items.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`p-6 rounded-lg transition-colors ${
                activeCard === index ? "bg-neutral-900/80 border border-accent/20" : "bg-transparent"
              }`}
            >
              <h3 className="text-2xl font-light mb-4">{item.title}</h3>
              <p className="text-neutral-300 mb-4">{item.description}</p>
              <p className="text-white/80">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


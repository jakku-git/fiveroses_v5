"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

interface Item {
  title: string
  description: string
  link: string
  image: string
}

export const ParallaxScroll = ({ items }: { items: Item[] }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex flex-col gap-16">
        {items.map((item, index) => (
          <ParallaxItem key={index} item={item} index={index} progress={scrollYProgress} />
        ))}
      </div>
    </div>
  )
}

const ParallaxItem = ({
  item,
  index,
  progress,
}: {
  item: Item
  index: number
  progress: any
}) => {
  const isEven = index % 2 === 0

  // Create different transform values for even and odd items
  const translateX = useTransform(progress, [0, 1], isEven ? [-100, 0] : [100, 0])

  const opacity = useTransform(progress, [0, 0.3, 0.6, 1], [0, 1, 1, 0.8])

  return (
    <motion.div
      style={{ opacity }}
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
    >
      <motion.div style={{ x: translateX }} className="w-full md:w-1/2">
        <div className="rounded-lg overflow-hidden">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            className="w-full h-auto object-cover aspect-[16/9]"
          />
        </div>
      </motion.div>
      <div className="w-full md:w-1/2 space-y-4">
        <h3 className="text-2xl md:text-3xl font-light">{item.title}</h3>
        <p className="text-neutral-300">{item.description}</p>
        <Link
          href={item.link}
          className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors"
        >
          Learn more
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
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  )
}


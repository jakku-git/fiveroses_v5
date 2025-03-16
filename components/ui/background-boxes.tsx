"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Box = {
  value: number
  title?: string
  icon?: string
}

export const BackgroundBoxes = ({
  className,
  boxes,
}: {
  className?: string
  boxes?: Box[]
}) => {
  const [hovered, setHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const boxesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const defaultBoxes: Box[] = boxes || [
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
  ]

  return (
    <div
      ref={boxesRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn("p-4 bg-black relative flex items-center justify-center", className)}
    >
      {mounted && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full h-full">
          {defaultBoxes.map((box, i) => (
            <motion.div
              key={i}
              className="relative flex items-center justify-center h-full w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: hovered ? 1 : 0.8,
                scale: hovered ? 1 : 0.8,
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
              }}
            >
              <div className="h-full w-full bg-neutral-900 rounded-lg p-4 flex flex-col items-center justify-center border border-white/[0.08] group-hover:border-white/[0.2] transition-colors">
                {box.icon && <div className="text-4xl mb-2">{box.icon}</div>}
                {box.title && <div className="text-white font-light text-lg md:text-xl text-center">{box.title}</div>}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}


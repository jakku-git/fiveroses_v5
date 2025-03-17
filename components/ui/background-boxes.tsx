"use client"

import { useEffect, useState } from "react"
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
  const [mounted, setMounted] = useState(false)

  // Use provided boxes or create 12 default boxes
  const defaultBoxes: Box[] = boxes && boxes.length > 0
    ? boxes
    : Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        title: "",
        icon: "",
      }))

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className={cn("relative w-full h-full p-4", className)}>
      {mounted && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 w-full h-full">
          {defaultBoxes.map((box, i) => (
            <motion.div
              key={i}
              className="relative w-full h-full"
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              <div
                className="rounded-lg p-1 shadow-lg"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, var(--purple-500), var(--pink-500))",
                }}
              >
                <div className="bg-black rounded-lg p-4 flex flex-col items-center justify-center min-h-[80px]">
                  {box.icon && <div className="text-2xl mb-2">{box.icon}</div>}
                  {box.title && (
                    <div className="text-sm font-medium text-white text-center">
                      {box.title}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

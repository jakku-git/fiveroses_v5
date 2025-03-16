"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface Person {
  id: number
  name: string
  designation: string
  image: string
}

export const AnimatedTooltip = ({ item }: { item: Person }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.div className="w-24 h-24 rounded-full overflow-hidden cursor-pointer" whileHover={{ scale: 1.05 }}>
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
      </motion.div>

      {isHovered && (
        <motion.div
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10 min-w-max"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-neutral-800 p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-light">{item.name}</p>
                <p className="text-sm text-neutral-300">{item.designation}</p>
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-4 h-4 overflow-hidden">
            <div className="absolute w-2 h-2 bg-neutral-800 rotate-45 transform origin-top-left translate-x-1/2"></div>
          </div>
        </motion.div>
      )}
    </div>
  )
}


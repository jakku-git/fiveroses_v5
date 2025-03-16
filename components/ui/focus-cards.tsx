"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function FocusCards({
  items,
  className = "",
}: {
  items: { title: string; description: string; icon?: string; image?: string }[]
  className?: string
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="relative bg-white/10 backdrop-blur-lg p-6 rounded-lg text-white shadow-lg hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
        >
          {/* If an image exists, display it */}
          {item.image && (
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          )}

          {/* If an icon exists, display it */}
          {item.icon && <div className="text-4xl mb-4">{item.icon}</div>}

          <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
          <p className="text-sm text-gray-300">{item.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

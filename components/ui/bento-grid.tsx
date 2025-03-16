"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type React from "react"
import { useState } from "react"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>{children}</div>
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-neutral-900 border border-neutral-800 justify-between flex flex-col space-y-4",
        className,
      )}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="group-hover/bento:translate-x-2 transition duration-200">{header}</div>
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-light text-white mb-2 mt-2">{title}</div>
        <div className="font-normal text-neutral-300 text-sm">{description}</div>
      </div>
      {icon && (
        <motion.div className="text-neutral-300" animate={{ x: hovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
          {icon}
        </motion.div>
      )}
    </motion.div>
  )
}


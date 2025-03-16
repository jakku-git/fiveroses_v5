"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"
import type { ReactNode } from "react"
import { useState } from "react"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  return <div className={cn("grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>{children}</div>
}

export const BentoGridItem = ({
  className,
  title,
  description,
  icon,
}: {
  className?: string
  title?: string | ReactNode
  description?: string | ReactNode
  icon?: ReactNode
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
      {/* ✅ Added Image */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <Image
          src="/pexels-carrie-johnson-444447-1202849.jpg"
          alt={typeof title === "string" ? title : "Bento Grid Item"}
          fill
          className="object-cover"
        />
      </div>

      {/* ✅ Title & Description */}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-light text-white mb-2 mt-2">{title}</div>
        <div className="font-normal text-neutral-300 text-sm">{description}</div>
      </div>

      {/* ✅ Hover Icon Effect */}
      {icon && (
        <motion.div className="text-neutral-300" animate={{ x: hovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
          {icon}
        </motion.div>
      )}
    </motion.div>
  )
}

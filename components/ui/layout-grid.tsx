"use client"

import React, { JSX, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Create a motion-enabled version of Next.js Image for better optimization.
const MotionImage = motion(Image)

type Card = {
  id: number
  content: JSX.Element | React.ReactNode | string
  className: string
  thumbnail: string
}

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null)
  const [lastSelected, setLastSelected] = useState<Card | null>(null)

  const handleClick = (card: Card) => {
    setLastSelected(selected)
    setSelected(card)
  }

  const handleOutsideClick = () => {
    setLastSelected(selected)
    setSelected(null)
  }

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative layout-grid">
      {cards.map((card, i) => (
        <div key={i} className={cn("layout-grid-item", card.className)}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden",
              selected?.id === card.id
                ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col bg-transparent"
                : lastSelected?.id === card.id
                ? "z-40 bg-transparent rounded-xl h-full w-full"
                : "bg-transparent rounded-xl h-full w-full"
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}

      <AnimatePresence>
        {selected && (
          <motion.div
            onClick={handleOutsideClick}
            className="absolute inset-0 bg-transparent z-40 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <MotionImage
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height={500}
      width={500}
      className={cn(
        "layout-grid-image object-cover object-top absolute inset-0 h-full w-full transition duration-200"
      )}
      alt="thumbnail"
      loading="lazy"
    />
  )
}

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60] bg-transparent">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 h-full w-full bg-transparent z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  )
}

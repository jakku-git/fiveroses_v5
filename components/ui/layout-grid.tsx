"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Card {
  id: number
  content: React.ReactNode
  className?: string
  thumbnail?: string
}

interface LayoutGridProps {
  cards: Card[]
  className?: string
}

export const LayoutGrid = ({ cards, className }: LayoutGridProps) => {
  const [selected, setSelected] = useState<Card | null>(null)
  const [lastSelected, setLastSelected] = useState<Card | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = (card: Card) => {
    if (selected === card) {
      setSelected(null)
    } else {
      setLastSelected(selected)
      setSelected(card)
    }
  }

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [selected])

  const getCardPosition = (index: number) => {
    if (!containerRef.current) return { column: 0, row: 0 }

    const columns = window.innerWidth >= 768 ? 3 : 1
    const column = index % columns
    const row = Math.floor(index / columns)

    return { column, row }
  }

  return (
    <div
      ref={containerRef}
      className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-0", className)}
    >
      {cards.map((card, i) => {
        const { column, row } = getCardPosition(i)
        return (
          <motion.div
            key={card.id}
            className={cn("relative cursor-pointer rounded-xl overflow-hidden", card.className)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => handleClick(card)}
            layout
          >
            <div className="relative z-10 h-full">{card.content}</div>
          </motion.div>
        )
      })}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={() => setSelected(null)}
          >
            <motion.div
              layoutId={`card-${selected.id}`}
              className="w-full max-w-3xl h-auto max-h-[80vh] overflow-auto rounded-xl bg-neutral-900 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {selected.content}
              <button
                onClick={() => setSelected(null)}
                className="mt-4 px-4 py-2 bg-white text-black rounded-full hover:bg-accent transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const AnimatePresence = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <>{children}</>
}


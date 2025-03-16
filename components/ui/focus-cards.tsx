"use client"

import Image from "next/image"
import React from "react"

export type CardType = {
  title: string
  src: string
}

export function FocusCards({ cards = [] }: { cards?: CardType[] }) {
  if (!cards || cards.length === 0) {
    return <p className="text-center text-white">No cards available.</p>
  }

  return (
    <div className="focus-cards-container grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card) => (
        <div
          key={card.title}
          className="focus-card rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full"
        >
          <Image
            src={card.src}
            alt={card.title}
            fill
            className="object-cover absolute inset-0"
            loading="lazy"
          />
          <div className="overlay absolute inset-0 bg-black/50 flex items-end py-8 px-4">
            <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
              {card.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

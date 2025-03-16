"use client";

import Image from "next/image";
import React from "react";

export type CardType = {
  title: string;
  src: string;
};

export function FocusCards({ cards = [] }: { cards?: CardType[] }) {
  if (!cards || cards.length === 0) {
    return <p className="text-center text-white">No cards available.</p>;
  }

  return (
    <div className="focus-cards-container grid grid-cols-1 md:grid-cols-3 gap-10 w-full px-0 md:px-0">
      {cards.map((card) => (
        <div
          key={card.title}
          className="focus-card rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300"
        >
          <Image
            src={card.src}
            alt={card.title}
            fill
            className="object-cover absolute inset-0"
            loading="lazy"
          />
          <div className="absolute bottom-8 left-4 text-xl md:text-2xl font-medium text-white drop-shadow-md">
            {card.title}
          </div>
        </div>
      ))}
    </div>
  );
}

/* Double Blur Effect on Unfocused Cards */
const style = document.createElement('style');
style.innerHTML = `
  .focus-cards-container:hover .focus-card:not(:hover) {
    filter: blur(8px); /* Increased blur intensity */
    transform: scale(0.95); /* Optional: Slightly reduce size for stronger effect */
  }
`;
document.head.appendChild(style);

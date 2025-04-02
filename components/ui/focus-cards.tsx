"use client";

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
    <div className="focus-cards-container grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {cards.map((card) => (
        <div
          key={card.title}
          className="focus-card rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-200"
          onMouseEnter={(e) => {
            const video = e.currentTarget.querySelector("video") as HTMLVideoElement;
            if (video) {
              video.play();
            }
          }}
          onMouseLeave={(e) => {
            const video = e.currentTarget.querySelector("video") as HTMLVideoElement;
            if (video) {
              video.pause();
              video.currentTime = 0;
            }
          }}
        >
          <video
            className="absolute inset-0 object-cover w-full h-full"
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={card.src} type="video/mp4" loading="lazy" />
          </video>
          <div className="absolute bottom-8 left-4 text-xl md:text-2xl font-medium text-white drop-shadow-md">
            {card.title}
          </div>
        </div>
      ))}
    </div>
  );
}

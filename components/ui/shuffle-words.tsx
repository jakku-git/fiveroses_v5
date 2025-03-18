"use client";

import React, { useState, useEffect } from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getRandomLetter() {
  return LETTERS[Math.floor(Math.random() * LETTERS.length)];
}

export function ShuffleWords({
  words,
  interval = 3000,
  scrambleDuration = 1000,
}: {
  words: string[];
  interval?: number;
  scrambleDuration?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState("");

  useEffect(() => {
    const target = words[currentIndex];
    const start = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / scrambleDuration, 1);
      let result = "";

      for (let i = 0; i < target.length; i++) {
        result += Math.random() < progress ? target[i] : getRandomLetter();
      }

      setDisplayedWord(result);

      if (progress === 1) {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % words.length);
        }, interval - scrambleDuration);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [currentIndex, words, scrambleDuration, interval]);

  return <span>{displayedWord}</span>;
}

"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

interface CouxAnimationProps {
  text?: string;
  words?: string[];
  interval?: number; // time per word in ms, default 3000
}

export function CouxAnimation({ text, words, interval = 3000 }: CouxAnimationProps) {
  // If an array of words is provided, cycle through them.
  const [currentIndex, setCurrentIndex] = useState(0);

  // Determine the text to display.
  const displayText = words && words.length > 0 ? words[currentIndex] : text || "";

  useEffect(() => {
    if (words && words.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [words, interval]);

  return (
    <span className="inline-flex">
      {displayText.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: index * 0.2,
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}

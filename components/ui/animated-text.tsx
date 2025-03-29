"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

interface AnimatedTextProps {
  words: string[];
  className?: string;
}

export function AnimatedText({ words, className }: AnimatedTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ml4 = {
      opacityIn: [0, 1],
      scaleIn: [0.2, 1],
      scaleOut: 3,
      durationIn: 800,
      durationOut: 600,
      delay: 500,
    };

    const timeline = anime.timeline({ loop: true });

    words.forEach((_, index) => {
      const letterClass = `.letters-${index + 1}`;
      
      timeline
        .add({
          targets: letterClass,
          opacity: ml4.opacityIn,
          scale: ml4.scaleIn,
          duration: ml4.durationIn,
        })
        .add({
          targets: letterClass,
          opacity: 0,
          scale: ml4.scaleOut,
          duration: ml4.durationOut,
          easing: "easeInExpo",
          delay: ml4.delay,
        });
    });

    timeline.add({
      targets: ".ml4",
      opacity: 0,
      duration: 500,
      delay: 500,
    });

    return () => {
      timeline.pause();
    };
  }, [words]);

  return (
    <div ref={containerRef} className={`ml4 text-center w-full ${className}`}>
      {words.map((word, index) => (
        <span key={word} className={`letters letters-${index + 1} block text-center`}>
          {word}
        </span>
      ))}
    </div>
  );
} 
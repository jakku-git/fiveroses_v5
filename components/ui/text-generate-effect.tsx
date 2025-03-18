"use client";
import { useEffect } from "react";
import { motion, useAnimate, stagger } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  // Use a regex to split on whitespace so newline characters are preserved within words.
  const wordsArray = words.split(" ");

  useEffect(() => {
    let isCancelled = false;
    let mounted = false;

    const runLoop = async () => {
      // Wait for the component to be mounted
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (isCancelled) return;
      
      try {
        // Check if elements exist before starting animation
        const elements = scope.current?.querySelectorAll("span");
        if (!elements || elements.length === 0) {
          console.warn("No elements found to animate");
          return;
        }

        // Animate to visible state and remove blur.
        await animate(
          "span",
          {
            opacity: 1,
            filter: filter ? "blur(0px)" : "none",
          },
          {
            duration: duration,
            delay: stagger(0.2),
          }
        );
        
        if (isCancelled) return;
        
        // Add a 500ms pause before looping.
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        if (isCancelled) return;
        
        // Animate back to the initial state: hidden text with blur.
        await animate(
          "span",
          {
            opacity: 0,
            filter: filter ? "blur(10px)" : "none",
          },
          {
            duration: duration,
            delay: stagger(0.2),
          }
        );
      } catch (error) {
        console.error("Animation error:", error);
        // Wait a bit before retrying if there's an error
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    };

    runLoop();

    return () => {
      isCancelled = true;
    };
  }, [animate, filter, duration, scope]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} style={{ whiteSpace: "pre-wrap" }}>
        {wordsArray.map((word, idx) => {
          // If the word contains a newline, split it and insert a <br /> between parts.
          if (word.includes("\n")) {
            const parts = word.split("\n");
            return parts.map((part, j) => (
              <motion.span
                key={`${word}-${idx}-${j}`}
                className="text-white opacity-0"
                style={{
                  filter: filter ? "blur(10px)" : "none",
                }}
              >
                {part}
                {j < parts.length - 1 && <br />}
                {" "}
              </motion.span>
            ));
          }
          return (
            <motion.span
              key={`${word}-${idx}`}
              className="text-white opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black text-5xl leading-snug tracking-normal max-w-screen-xl mx-auto">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

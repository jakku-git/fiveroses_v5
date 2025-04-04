"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 700,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePosition = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const updateMousePosition = (e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      lastMousePosition.current = mousePosition;
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  useEffect(() => {
    containerRef.current?.addEventListener("mousemove", updateMousePosition);
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, []);

  let maskSize = isHovered ? revealSize : size * 2.5;

  // Calculate the distance between current and last mouse position
  const getDistance = () => {
    if (!lastMousePosition.current.x || !lastMousePosition.current.y || !mousePosition.x || !mousePosition.y) {
      return 0;
    }
    return Math.sqrt(
      Math.pow(mousePosition.x - lastMousePosition.current.x, 2) +
      Math.pow(mousePosition.y - lastMousePosition.current.y, 2)
    );
  };

  // Adjust transition duration based on mouse movement speed
  const getTransitionDuration = () => {
    const distance = getDistance();
    return Math.max(0.05, Math.min(0.2, distance * 0.001));
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative h-screen", className)}
      animate={{
        backgroundColor: isHovered ? "var(--slate-900)" : "var(--white)",
      }}
      transition={{
        backgroundColor: { duration: 0.3 },
      }}
    >
      <motion.div
        className="absolute flex h-full w-full items-center justify-center bg-black text-6xl [mask-image:url(/mask.svg)] [-webkit-mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat] [mask-size:40px] [-webkit-mask-size:40px] dark:bg-white"
        animate={{
          maskPosition: `${mousePosition.x! - maskSize / 2}px ${mousePosition.y! - maskSize / 2}px`,
          WebkitMaskPosition: `${mousePosition.x! - maskSize / 2}px ${mousePosition.y! - maskSize / 2}px`,
          maskSize: `${maskSize}px`,
          WebkitMaskSize: `${maskSize}px`,
        }}
        transition={{
          maskSize: { duration: 0.3, ease: "easeInOut" },
          maskPosition: { 
            duration: getTransitionDuration(),
            ease: [0.25, 0.1, 0.25, 1] // Custom easing for smoother movement
          },
        }}
      >
        <div className="absolute inset-0 z-0 h-full w-full bg-black opacity-50 dark:bg-white" />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-20 mx-auto max-w-4xl text-center text-4xl font-bold"
        >
          {children}
        </div>
      </motion.div>

      <div className="flex h-full w-full items-center justify-center">
        {revealText}
      </div>
    </motion.div>
  );
};

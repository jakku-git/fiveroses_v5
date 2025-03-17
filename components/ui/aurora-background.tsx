"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const AuroraBackground = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-screen overflow-hidden bg-black ${className}`}
    >
      {/* Starry Mist Layer for Extra Depth */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `url('/noise-texture.png') repeat`,
          backgroundSize: "400px 400px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Layered Aurora Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Animated Aurora */}
        <motion.div
          className="absolute inset-0 opacity-75 mix-blend-difference blur-[10px]"
          animate={{
            background: [
              "repeating-linear-gradient(100deg, #3b82f6 10%, #a5b4fc 15%, #93c5fd 20%, #f9d423 25%, #b8e986 30%)",
              "repeating-linear-gradient(120deg, #2563eb 10%, #818cf8 15%, #93c5fd 20%, #a78bfa 25%, #7dd3fc 30%)",
            ],
            scale: [1, 1.05, 1], // Smooth pulsing effect
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
          style={{
            backgroundSize: "300% 300%",
            backgroundPosition: "50% 50%",
          }}
        />

        {/* Additional Moving Layer for Depth */}
        <motion.div
          className="absolute inset-0 opacity-50 mix-blend-difference blur-[20px]"
          animate={{
            background: [
              "repeating-linear-gradient(160deg, rgba(255, 255, 255, 0.15) 10%, rgba(0, 0, 0, 0) 20%)",
              "repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.2) 15%, rgba(0, 0, 0, 0) 30%)",
            ],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
          style={{
            backgroundSize: "250% 250%",
          }}
        />

        {/* Extra Moving Depth Layer */}
        <motion.div
          className="absolute inset-0 opacity-40 mix-blend-difference blur-[30px]"
          animate={{
            background: [
              "radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0) 50%)",
              "radial-gradient(circle at 70% 40%, rgba(255, 255, 255, 0.25) 0%, rgba(0, 0, 0, 0) 50%)",
            ],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />

        {/* MASSIVELY Increased Mouse Glow Effect */}
        <div
          className="absolute"
          style={{
            left: `${mousePosition.x - 350}px`, // Centered large glow
            top: `${mousePosition.y - 350}px`,
            background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0) 80%)`,
            filter: "blur(100px)", // More diffusion
            width: "700px", // 7x Bigger
            height: "700px",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

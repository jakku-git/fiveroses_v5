"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { FuzzyOverlay } from "./fuzzy-overlay";

interface SnapScrollProps {
  className?: string;
}

export const SnapScroll = ({ className }: SnapScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create multiple text instances with different scroll positions and colors
  const textInstances = [
    { 
      bgColor: "bg-[#382C41]", // Deep purple
      textColor: "text-white", // Pure white for contrast
      title: "Create",
      subtitle: "Fearlessly.",
      description: "Where creativity meets a little chaos.",
      link: "Contact",
      bgImage: "bg-[url('/images/pattern-1.svg')]"
    },
    { 
      bgColor: "bg-[#524C73]", // Muted purple
      textColor: "text-white", // Pure white for contrast
      title: "Break",
      subtitle: "Boundaries.",
      description: "For brands that want to stand out, not fit in.",
      link: "Learn More",
      bgImage: "bg-[url('/images/pattern-2.svg')]"
    },
    { 
      bgColor: "bg-[#65B2A0]", // Sage
      textColor: "text-white", // Pure white for contrast
      title: "Strategize",
      subtitle: "Success.",
      description: "Making your brand the main character.",
      link: "Explore",
      bgImage: "bg-[url('/images/pattern-3.svg')]"
    },
    { 
      bgColor: "bg-[#ADDEC1]", // Light sage
      textColor: "text-black", // Changed to black for better contrast on light background
      title: "Craft",
      subtitle: "Magic.",
      description: "We brand. You bloom.",
      link: "Get Started",
      bgImage: "bg-[url('/images/pattern-4.svg')]"
    },
  ].map((instance, index) => {
    const start = index * 0.25;
    const end = (index + 1) * 0.25;
    return {
      ...instance,
      opacity: useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]),
      scale: useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0.95, 1, 1, 0.95]),
      y: useTransform(scrollYProgress, [start, end], [0, -50]),
    };
  });

  return (
    <ParallaxProvider>
      <motion.div
        ref={containerRef}
        className={cn("relative h-[400vh] w-full", className)}
      >
        {textInstances.map((instance, index) => (
          <div key={index} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
            <div className={cn("relative w-full h-full", instance.bgColor, instance.bgImage, "bg-cover bg-center")}>
              {/* Background gradient */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-b",
                instance.bgColor === "bg-[#382C41]" 
                  ? "from-[#382C41] via-[#382C41]/95 to-[#382C41]/90" 
                  : instance.bgColor === "bg-[#524C73]"
                  ? "from-[#524C73] via-[#524C73]/95 to-[#524C73]/90"
                  : instance.bgColor === "bg-[#65B2A0]"
                  ? "from-[#65B2A0] via-[#65B2A0]/95 to-[#65B2A0]/90"
                  : "from-[#ADDEC1] via-[#ADDEC1]/95 to-[#ADDEC1]/90"
              )} />
              
              {/* Fuzzy Overlay */}
              <FuzzyOverlay />
              
              {/* Content */}
              <motion.div 
                className={cn(
                  "relative z-20 flex flex-col items-center justify-center h-full",
                  instance.textColor
                )}
                style={{ 
                  opacity: instance.opacity, 
                  scale: instance.scale, 
                  y: instance.y
                }}
              >
                <Parallax translateY={[-10, 10]} speed={-5}>
                  <div className="flex flex-col items-center">
                    <motion.h1 
                      className="text-[12vw] font-black tracking-tighter text-center leading-[0.85] drop-shadow-[0_0_15px_rgba(255,255,255,0.3),0_0_30px_rgba(255,255,255,0.2),0_0_45px_rgba(255,255,255,0.1)]"
                      initial={{ x: -100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      {instance.title}
                    </motion.h1>
                    <motion.h1 
                      className="text-[16vw] font-black tracking-tighter text-center leading-[0.85] -mt-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3),0_0_30px_rgba(255,255,255,0.2),0_0_45px_rgba(255,255,255,0.1)]"
                      initial={{ x: 100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    >
                      {instance.subtitle}
                    </motion.h1>
                  </div>
                </Parallax>
                
                <Parallax translateY={[-5, 5]} speed={-2}>
                  <motion.p 
                    className={cn(
                      instance.bgColor === "bg-[#ADDEC1]" ? "mt-32" : "mt-24",
                      "text-xl font-light",
                      instance.bgColor === "bg-[#ADDEC1]" ? "text-black/90" : "text-white/90"
                    )}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  >
                    {instance.description}
                  </motion.p>
                </Parallax>
                
                <Parallax translateY={[-3, 3]} speed={-1}>
                  <motion.a
                    href="/contact"
                    className={cn(
                      "group text-xl font-light inline-flex items-center gap-2",
                      instance.bgColor === "bg-[#ADDEC1]" ? "mt-12" : "mt-8",
                      instance.bgColor === "bg-[#ADDEC1]" 
                        ? "text-black/80 hover:text-black"
                        : "text-white/80 hover:text-white",
                      "transition-all duration-300 hover:scale-105"
                    )}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                  >
                    {instance.link}
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.a>
                </Parallax>
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>
    </ParallaxProvider>
  );
}; 
"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

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
      bgColor: "bg-[#FF6B6B]", // Vibrant coral
      textColor: "text-white", // Pure white for contrast
      title: "Create",
      subtitle: "Fearlessly.",
      description: "Where creativity meets a little chaos.",
      link: "Contact",
      bgImage: "bg-[url('/images/pattern-1.svg')]"
    },
    { 
      bgColor: "bg-[#2D3436]", // Deep charcoal
      textColor: "text-white", // Pure white for contrast
      title: "Break",
      subtitle: "Boundaries.",
      description: "For brands that want to stand out, not fit in.",
      link: "Learn More",
      bgImage: "bg-[url('/images/pattern-2.svg')]"
    },
    { 
      bgColor: "bg-[#00B894]", // Fresh mint
      textColor: "text-white", // Pure white for contrast
      title: "Strategize",
      subtitle: "Success.",
      description: "Making your brand the main character.",
      link: "Explore",
      bgImage: "bg-[url('/images/pattern-3.svg')]"
    },
    { 
      bgColor: "bg-[#6C5CE7]", // Rich purple
      textColor: "text-white", // Pure white for contrast
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
                instance.bgColor === "bg-[#FF6B6B]" 
                  ? "from-[#FF6B6B] via-[#FF6B6B]/95 to-[#FF6B6B]/90" 
                  : instance.bgColor === "bg-[#2D3436]"
                  ? "from-[#2D3436] via-[#2D3436]/95 to-[#2D3436]/90"
                  : instance.bgColor === "bg-[#00B894]"
                  ? "from-[#00B894] via-[#00B894]/95 to-[#00B894]/90"
                  : "from-[#6C5CE7] via-[#6C5CE7]/95 to-[#6C5CE7]/90"
              )} />
              
              {/* Content */}
              <motion.div 
                className={cn(
                  "relative z-10 flex flex-col items-center justify-center h-full",
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
                    <h1 className="text-[12vw] font-black tracking-tighter text-center leading-[0.85] drop-shadow-sm">
                      {instance.title}
                    </h1>
                    <h1 className="text-[16vw] font-black tracking-tighter text-center leading-[0.85] -mt-4 drop-shadow-sm">
                      {instance.subtitle}
                    </h1>
                  </div>
                </Parallax>
                
                <Parallax translateY={[-5, 5]} speed={-2}>
                  <p className={cn(
                    "mt-24 text-xl font-light",
                    "text-white/90"
                  )}>
                    {instance.description}
                  </p>
                </Parallax>
                
                <Parallax translateY={[-3, 3]} speed={-1}>
                  <a
                    href="/contact"
                    className={cn(
                      "group mt-8 text-xl font-light inline-flex items-center gap-2",
                      "text-white/80 hover:text-white",
                      "transition-all duration-300 hover:scale-105"
                    )}
                  >
                    {instance.link}
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </Parallax>
              </motion.div>
            </div>
          </div>
        ))}
      </motion.div>
    </ParallaxProvider>
  );
}; 
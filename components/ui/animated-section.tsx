'use client';

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { animationConfig } from "./animation-config";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedSection = ({ children, className = "" }: AnimatedSectionProps) => {
  const [ref, inView] = useInView(animationConfig);

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 60,
        }}
        transition={{
          duration: 1.2,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}; 
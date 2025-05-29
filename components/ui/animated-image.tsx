'use client';

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image, { ImageProps } from "next/image";
import { animationConfig, imageConfig } from "./animation-config";

interface AnimatedImageProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedImage = ({ children, className = "" }: AnimatedImageProps) => {
  const [ref, inView] = useInView(animationConfig);

  return (
    <div ref={ref} className={`w-full overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{
          opacity: inView ? 1 : 0,
          scale: inView ? 1 : 1.1,
        }}
        transition={{
          duration: 1.8,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const OptimizedImage = ({ src, alt, className = "", width, height, ...props }: OptimizedImageProps) => (
  <Image
    src={src}
    alt={alt}
    className={`object-cover ${className}`}
    {...imageConfig}
    {...props}
    {...(!width && !height ? { fill: true } : { width, height })}
  />
); 
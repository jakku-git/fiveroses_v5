import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { useRef } from "react";

export const VelocityText = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["-0.2 start", "0.2 start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  // Base spring configuration
  const springConfig = { 
    mass: 1,
    stiffness: 400,
    damping: 30
  };

  // Different skew angles for each line
  const skewXRaw1 = useTransform(scrollVelocity, [-0.2, 0.2], ["30deg", "-30deg"]);
  const skewXRaw2 = useTransform(scrollVelocity, [-0.2, 0.2], ["-25deg", "25deg"]);
  const skewXRaw3 = useTransform(scrollVelocity, [-0.2, 0.2], ["20deg", "-20deg"]);
  const skewXRaw4 = useTransform(scrollVelocity, [-0.2, 0.2], ["-15deg", "15deg"]);
  const skewXRaw5 = useTransform(scrollVelocity, [-0.2, 0.2], ["35deg", "-35deg"]);
  const skewXRaw6 = useTransform(scrollVelocity, [-0.2, 0.2], ["-20deg", "20deg"]);
  const skewXRaw7 = useTransform(scrollVelocity, [-0.2, 0.2], ["25deg", "-25deg"]);

  const skewX1 = useSpring(skewXRaw1, springConfig);
  const skewX2 = useSpring(skewXRaw2, springConfig);
  const skewX3 = useSpring(skewXRaw3, springConfig);
  const skewX4 = useSpring(skewXRaw4, springConfig);
  const skewX5 = useSpring(skewXRaw5, springConfig);
  const skewX6 = useSpring(skewXRaw6, springConfig);
  const skewX7 = useSpring(skewXRaw7, springConfig);

  // Different x movements for each line
  const xRaw1 = useTransform(scrollYProgress, [0, 1], [-1500, -6000]);
  const xRaw2 = useTransform(scrollYProgress, [0, 1], [-2000, -7000]);
  const xRaw3 = useTransform(scrollYProgress, [0, 1], [-1800, -6500]);
  const xRaw4 = useTransform(scrollYProgress, [0, 1], [-2200, -7500]);
  const xRaw5 = useTransform(scrollYProgress, [0, 1], [-1700, -6200]);
  const xRaw6 = useTransform(scrollYProgress, [0, 1], [-1900, -6800]);
  const xRaw7 = useTransform(scrollYProgress, [0, 1], [-2100, -7300]);

  const x1 = useSpring(xRaw1, springConfig);
  const x2 = useSpring(xRaw2, springConfig);
  const x3 = useSpring(xRaw3, springConfig);
  const x4 = useSpring(xRaw4, springConfig);
  const x5 = useSpring(xRaw5, springConfig);
  const x6 = useSpring(xRaw6, springConfig);
  const x7 = useSpring(xRaw7, springConfig);

  // Different opacities for each line - significantly decreased base opacity values
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 0.25, 0.25, 0.2]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.18, 0.23, 0.23, 0.18]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.15, 0.2, 0.2, 0.15]);
  const opacity4 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.12, 0.17, 0.17, 0.12]);
  const opacity5 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.1, 0.15, 0.15, 0.1]);
  const opacity6 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.08, 0.12, 0.12, 0.08]);
  const opacity7 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.05, 0.1, 0.1, 0.05]);

  const repeatedText = Array(6).fill(
    "create. design. think. imagine. build. craft. develop. scale."
  );

  return (
    <section
      ref={targetRef}
      className="h-[2000vh] bg-transparent text-white"
    >
      <div className="sticky top-0 flex flex-col h-screen items-center justify-center gap-8 overflow-hidden">
        <motion.p
          style={{ skewX: skewX1, x: x1, scaleY: 1.4, opacity: opacity1 }}
          className="origin-bottom-left whitespace-nowrap text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tight [-webkit-text-stroke:2px_white] [text-stroke:2px_white] [text-fill-color:transparent] [-webkit-text-fill-color:transparent]"
        >
          {repeatedText.join(" ")}
        </motion.p>
        <motion.p
          style={{ skewX: skewX2, x: x2, scaleY: 1.4, opacity: opacity2 }}
          className="origin-bottom-left whitespace-nowrap text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tight [-webkit-text-stroke:2px_white] [text-stroke:2px_white] [text-fill-color:transparent] [-webkit-text-fill-color:transparent]"
        >
          {repeatedText.join(" ")}
        </motion.p>
        <motion.p
          style={{ skewX: skewX3, x: x3, scaleY: 1.4, opacity: opacity3 }}
          className="origin-bottom-left whitespace-nowrap text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tight [-webkit-text-stroke:2px_white] [text-stroke:2px_white] [text-fill-color:transparent] [-webkit-text-fill-color:transparent]"
        >
          {repeatedText.join(" ")}
        </motion.p>
        <motion.p
          style={{ skewX: skewX4, x: x4, scaleY: 1.4, opacity: opacity4 }}
          className="origin-bottom-left whitespace-nowrap text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tight [-webkit-text-stroke:2px_white] [text-stroke:2px_white] [text-fill-color:transparent] [-webkit-text-fill-color:transparent]"
        >
          {repeatedText.join(" ")}
        </motion.p>
        <motion.p
          style={{ skewX: skewX5, x: x5, scaleY: 1.4, opacity: opacity5 }}
          className="origin-bottom-left whitespace-nowrap text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tight [-webkit-text-stroke:2px_white] [text-stroke:2px_white] [text-fill-color:transparent] [-webkit-text-fill-color:transparent]"
        >
          {repeatedText.join(" ")}
        </motion.p>
        <motion.p
          style={{ skewX: skewX6, x: x6, scaleY: 1.4, opacity: opacity6 }}
          className="origin-bottom-left whitespace-nowrap text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tight [-webkit-text-stroke:2px_white] [text-stroke:2px_white] [text-fill-color:transparent] [-webkit-text-fill-color:transparent]"
        >
          {repeatedText.join(" ")}
        </motion.p>
        <motion.p
          style={{ skewX: skewX7, x: x7, scaleY: 1.4, opacity: opacity7 }}
          className="origin-bottom-left whitespace-nowrap text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tight [-webkit-text-stroke:2px_white] [text-stroke:2px_white] [text-fill-color:transparent] [-webkit-text-fill-color:transparent]"
        >
          {repeatedText.join(" ")}
        </motion.p>
      </div>
    </section>
  );
}; 
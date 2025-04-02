"use client";

import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

interface ParallaxImgProps {
  className: string;
  alt: string;
  src: string;
  videoSrc?: string;
  start: number;
  end: number;
}

export const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-950 w-full">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Hero />
      </ReactLenis>
    </div>
  );
};

const SECTION_HEIGHT = 3500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterVideo />

      <ParallaxImages />

      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterVideo = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 3500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 3500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const scale = useTransform(
    scrollY,
    [0, 3500 + 500],
    [1.7, 1]
  );
  const opacity = useTransform(
    scrollY,
    [3500, 3500 + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full overflow-hidden"
      style={{
        clipPath,
        opacity,
      }}
    >
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        <source src="/media/hero/heroscrollvideo.webm" type="video/webm" />
        <source src="/media/hero/main.mp4" type="video/mp4" />
      </motion.video>
    </motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="w-full px-2 md:px-4 pt-[100px] md:pt-[200px]">
      <ParallaxImg
        src="/media/hero/heroscroll2.webp"
        videoSrc="/media/hero/scroll3.webm"
        alt="First parallax image"
        start={-200}
        end={200}
        className="w-full md:w-1/3"
      />
      <ParallaxImg
        src="/media/hero/heroscroll4.webp"
        videoSrc="/media/hero/scroll1.webm"
        alt="Second parallax image"
        start={200}
        end={-250}
        className="mx-auto w-full md:w-2/3"
      />
      <ParallaxImg
        src="/media/hero/heroscroll1.webp"
        videoSrc="/media/hero/scroll2.webm"
        alt="Third parallax image"
        start={-200}
        end={200}
        className="ml-auto w-full md:w-1/3"
      />
      <ParallaxImg
        src="/media/hero/heroscroll3.webp"
        videoSrc="/media/hero/scroll4.webm"
        alt="Fourth parallax image"
        start={0}
        end={-500}
        className="ml-0 md:ml-24 w-full md:w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, videoSrc, start, end }: ParallaxImgProps) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.5, 0.75], [0.7, 0]);
  const scale = useTransform(scrollYProgress, [0.5, 0.75], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transform, opacity }}
    >
      {videoSrc ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/webm" />
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </video>
      ) : (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      )}
    </motion.div>
  );
}; 
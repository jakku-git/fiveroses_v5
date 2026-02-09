'use client';

import { useEffect, useRef, useState, memo, useCallback } from 'react';
import { useTransform, useScroll, motion, useSpring, useMotionValueEvent, MotionValue } from 'framer-motion';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';
import styles from './styles.module.scss';
import { FuzzyOverlay } from '../ui/fuzzy-overlay';

// Memoize the images array to prevent unnecessary re-renders
const images = [
    "https://pub-762008b27cff430289f9cb812010d371.r2.dev/artscraft%20(3).webp",
    "https://pub-31835f4925254f16ad9ce47bfe082f11.r2.dev/btstourists%20(1).webp",
    "https://pub-31835f4925254f16ad9ce47bfe082f11.r2.dev/btstourists%20(4).webp",
    "https://pub-af52e145b46f4643840668ef5bf23952.r2.dev/ceramics%20(5).webp",
    "https://pub-e08ddc6efc2944bb84b7982b6e8825b4.r2.dev/cyberpunkvr%20(7).webp",
    "https://pub-e08ddc6efc2944bb84b7982b6e8825b4.r2.dev/cyberpunkvr%20(1).webp",
    "https://pub-e08ddc6efc2944bb84b7982b6e8825b4.r2.dev/cyberpunkvr%20(2).webp",
    "https://pub-a9a5f35f84584290a9de003cf86faf37.r2.dev/farm%20(5).webp",
    "https://pub-5d7c3f192a6844559ecb0366466f8b3e.r2.dev/glass%20(2).webp",
    "https://pub-5d7c3f192a6844559ecb0366466f8b3e.r2.dev/glass%20(4).webp",
    "https://pub-89ed998cc2bc412db543bb4b8c57e662.r2.dev/soapstory%20(3).webp",
    "https://pub-89ed998cc2bc412db543bb4b8c57e662.r2.dev/soapstory%20(6).webp"
] as const;

// Memoize the spring config
const springConfig = { stiffness: 100, damping: 30 } as const;

interface ColumnProps {
    images: string[];
    y: any;
    index: number;
}

// Memoize the Column component with proper type checking
const Column = memo(({images, y, index}: ColumnProps) => {
    const columnRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: columnRef,
        offset: ['start end', 'end start']
    });

    // Memoize transforms to prevent unnecessary recalculations
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
    const imageRotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -1 : 1, index % 2 === 0 ? 1 : -1]);
    const columnScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

    // Memoize hover animation
    const hoverAnimation = {
        scale: 1.02,
        transition: { duration: 0.2 }
    } as const;

    return (
        <motion.div 
            ref={columnRef}
            className={styles.column}
            style={{
                y,
                rotate: imageRotate,
                scale: columnScale,
                willChange: 'transform'
            }}
        >
            {images.map((src: string, i: number) => (
                <motion.div 
                    key={i} 
                    className={styles.imageContainer}
                    style={{
                        scale: imageScale,
                        opacity: imageOpacity,
                        rotate: useTransform(scrollYProgress, [0, 1], [i, -i]),
                        willChange: 'transform, opacity'
                    }}
                    whileHover={hoverAnimation}
                >
                    <Image 
                        src={src}
                        alt='Gallery image'
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={i === 0 ? 75 : 60}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        priority={i === 0}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        className="transform-gpu"
                    />
                </motion.div>
            ))}
        </motion.div>
    );
});

Column.displayName = 'Column';

// Optimize animation configs for better performance
const textAnimationConfig = {
    stiffness: 50, // Reduced from 100 for smoother scrolling
    damping: 20,   // Reduced from 30 for smoother scrolling
    mass: 0.8      // Increased from 0.5 for smoother movement
} as const;

// Optimize hover animation for better performance
const hoverAnimationConfig = {
    scale: 1.05,
    transition: { 
        duration: 0.2,  // Reduced from 0.3 for snappier response
        ease: "easeOut"
    }
} as const;

interface SpacerProps {
    ref: React.RefObject<HTMLDivElement>;
    type: 'before' | 'after';
    progress: MotionValue<number>;
    className?: string;
}

// Memoize the Spacer component with optimized animations
const Spacer = memo(({ ref, type, progress, className }: SpacerProps) => {
    // Optimize transform calculations by using simpler ranges
    const textY = useTransform(
        progress,
        type === 'before' ? [0, 0.2] : [0.8, 1], // Simplified ranges
        type === 'before' ? ["50px", "0px"] : ["0px", "50px"] // Reduced movement distance
    );
    
    // Optimize opacity transitions
    const textOpacity = useTransform(
        progress,
        type === 'before' ? [0, 0.1] : [0.9, 1], // Faster fade in/out
        type === 'before' ? [0, 1] : [1, 0]
    );
    
    // Simplify scale animation
    const textScale = useTransform(
        progress,
        type === 'before' ? [0, 0.1] : [0.9, 1],
        type === 'before' ? [0.9, 1] : [1, 0.9] // Reduced scale range
    );
    
    // Optimize rotation for better performance
    const textRotate = useTransform(
        progress,
        [0, 1],
        type === 'before' ? [5, -5] : [-5, 5] // Reduced rotation angle
    );

    // Use spring with optimized config
    const springY = useSpring(textY, textAnimationConfig);
    
    // Optimize background position transform
    const bgPosition = useTransform(
        progress,
        [0, 1],
        type === 'before' ? ['0% 0%', '100% 100%'] : ['100% 100%', '0% 0%'] // Reduced movement range
    );

    return (
        <div 
            ref={ref} 
            className={`${styles.spacer} ${styles[type]} ${className} transform-gpu`}
            style={{ willChange: 'transform' }}
        >
            <FuzzyOverlay />
            <motion.div 
                className={`${styles.textContainer} transform-gpu`}
                style={{ 
                    y: springY,
                    opacity: textOpacity,
                    scale: textScale,
                    willChange: 'transform, opacity'
                }}
            >
                <motion.h2 
                    className={`${styles.text} transform-gpu`}
                    data-text={type === 'before' ? "this is fiveroses" : "creativity without limits"}
                    style={{
                        rotateX: textRotate,
                        backgroundPosition: bgPosition,
                        willChange: 'transform, background-position'
                    }}
                    whileHover={hoverAnimationConfig}
                >
                    <span className="block">{type === 'before' ? 'this is' : 'creativity'}</span>
                    <span className="block">{type === 'before' ? 'fiveroses' : 'without limits'}</span>
                </motion.h2>
            </motion.div>
        </div>
    );
});

Spacer.displayName = 'Spacer';

export default function ParallaxGallery() {
    const gallery = useRef<HTMLDivElement>(null);
    const firstSpacerRef = useRef<HTMLDivElement>(null);
    const secondSpacerRef = useRef<HTMLDivElement>(null);
    const [dimension, setDimension] = useState({width:0, height:0});
    const rafRef = useRef<number | undefined>(undefined);

    // Memoize scroll progress calculations
    const { scrollYProgress } = useScroll({
        target: gallery,
        offset: ['start end', 'end start']
    });

    const { scrollYProgress: firstSpacerProgress } = useScroll({
        target: firstSpacerRef,
        offset: ['start end', 'end start']
    });

    const { scrollYProgress: secondSpacerProgress } = useScroll({
        target: secondSpacerRef,
        offset: ['start end', 'end start']
    });

    // Memoize transforms
    const { height } = dimension;
    const y = useTransform(scrollYProgress, [0, 1], [0, height * 2], { clamp: true });
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3], { clamp: true });
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25], { clamp: true });
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3], { clamp: true });

    // Use spring animations with memoized config
    const springY = useSpring(y, springConfig);
    const springY2 = useSpring(y2, springConfig);
    const springY3 = useSpring(y3, springConfig);
    const springY4 = useSpring(y4, springConfig);

    // Memoize resize handler
    const handleResize = useCallback(() => {
        setDimension({width: window.innerWidth, height: window.innerHeight});
    }, []);

    // Optimize Lenis scroll configuration
    useEffect(() => {
        const lenis = new Lenis({
            wrapper: window,
            content: document.documentElement,
            duration: 1.0, // Reduced from 1.2 for snappier scrolling
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)), // Simplified easing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1.0, // Increased from 0.8 for more responsive scrolling
            touchMultiplier: 2.0, // Increased from 1.5 for better touch response
            infinite: false,
            lerp: 0.08, // Reduced from 0.1 for snappier movement
        });

        // Optimize RAF handling
        const raf = (time: number) => {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        };

        rafRef.current = requestAnimationFrame(raf);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            lenis.destroy();
        };
    }, []);

    // Optimize RAF and resize handling
    useEffect(() => {
        const raf = (time: number) => {
            rafRef.current = requestAnimationFrame(raf);
        };

        window.addEventListener("resize", handleResize, { passive: true });
        rafRef.current = requestAnimationFrame(raf);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [handleResize]);

    return (
        <div className={styles.main}>
            <Spacer 
                ref={firstSpacerRef}
                type="before"
                progress={firstSpacerProgress}
                className="transform-gpu"
            />
            <div ref={gallery} className={`${styles.gallery} transform-gpu`}>
                <div className={styles.galleryWrapper}>
                    <Column images={[images[0], images[1], images[2]]} y={springY} index={0} />
                    <Column images={[images[3], images[4], images[5]]} y={springY2} index={1} />
                    <Column images={[images[6], images[7], images[8]]} y={springY3} index={2} />
                    <Column images={[images[9], images[10], images[11]]} y={springY4} index={3} />
                </div>
            </div>
            <Spacer 
                ref={secondSpacerRef}
                type="after"
                progress={secondSpacerProgress}
                className="transform-gpu"
            />
        </div>
    );
} 
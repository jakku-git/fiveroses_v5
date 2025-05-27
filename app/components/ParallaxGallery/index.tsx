'use client';

import { useEffect, useRef, useState, memo } from 'react';
import { useTransform, useScroll, motion, useSpring, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';
import styles from './styles.module.scss';
import { FuzzyOverlay } from '../ui/fuzzy-overlay';
import { VelocityText } from '../VelocityText';

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
];

interface ColumnProps {
    images: string[];
    y: any;
    index: number;
}

export default function ParallaxGallery() {
    const gallery = useRef<HTMLDivElement>(null);
    const firstSpacerRef = useRef<HTMLDivElement>(null);
    const secondSpacerRef = useRef<HTMLDivElement>(null);
    const [dimension, setDimension] = useState({width:0, height:0});
    const rafRef = useRef<number | undefined>(undefined);

    // Gallery scroll progress
    const { scrollYProgress } = useScroll({
        target: gallery,
        offset: ['start end', 'end start']
    });

    // First spacer scroll progress
    const { scrollYProgress: firstSpacerProgress } = useScroll({
        target: firstSpacerRef,
        offset: ['start end', 'end start']
    });

    // Second spacer scroll progress
    const { scrollYProgress: secondSpacerProgress } = useScroll({
        target: secondSpacerRef,
        offset: ['start end', 'end start']
    });

    // Gallery animations
    const { height } = dimension;
    const y = useTransform(scrollYProgress, [0, 1], [0, height * 2], { clamp: true });
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3], { clamp: true });
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25], { clamp: true });
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3], { clamp: true });

    const springY = useSpring(y, { stiffness: 100, damping: 30 });
    const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });
    const springY3 = useSpring(y3, { stiffness: 100, damping: 30 });
    const springY4 = useSpring(y4, { stiffness: 100, damping: 30 });

    // First spacer animations
    const firstTextY = useTransform(firstSpacerProgress, [0, 0.15], ["100px", "0px"]);
    const firstTextOpacity = useTransform(firstSpacerProgress, [0, 0.15], [0, 1]);
    const firstTextScale = useTransform(firstSpacerProgress, [0, 0.15], [0.8, 1]);
    const firstTextRotate = useTransform(firstSpacerProgress, [0, 0.5, 1], [15, 0, -15]);

    // Second spacer animations
    const secondTextY = useTransform(secondSpacerProgress, [0.7, 0.95], ["0px", "100px"]);
    const secondTextOpacity = useTransform(secondSpacerProgress, [0.7, 0.95], [1, 0]);
    const secondTextScale = useTransform(secondSpacerProgress, [0.7, 0.95], [1, 0.8]);
    const secondTextRotate = useTransform(secondSpacerProgress, [0, 0.5, 1], [-15, 0, 15]);

    // Spring animations
    const springConfig = { stiffness: 100, damping: 30 };
    const springFirstY = useSpring(firstTextY, springConfig);
    const springSecondY = useSpring(secondTextY, springConfig);

    useEffect(() => {
        const lenis = new Lenis({
            wrapper: window,
            content: document.documentElement,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 1.5,
            infinite: false,
            lerp: 0.1,
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        const raf = (time: number) => {
            rafRef.current = requestAnimationFrame(raf);
        };

        const resize = () => {
            setDimension({width: window.innerWidth, height: window.innerHeight});
        };

        window.addEventListener("resize", resize, { passive: true });
        rafRef.current = requestAnimationFrame(raf);
        resize();

        return () => {
            window.removeEventListener("resize", resize);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        <div className={styles.main}>
            <div ref={firstSpacerRef} className={`${styles.spacer} ${styles.before}`}>
                <FuzzyOverlay />
                <div className={styles.velocityTextContainer}>
                    <VelocityText />
                </div>
                <motion.div 
                    className={styles.textContainer}
                    style={{ 
                        y: springFirstY,
                        opacity: firstTextOpacity,
                        scale: firstTextScale
                    }}
                >
                    <motion.h2 
                        className={styles.text}
                        data-text="this is fiveroses"
                        style={{
                            rotateX: firstTextRotate,
                            backgroundPosition: useTransform(
                                firstSpacerProgress,
                                [0, 1],
                                ['0% 0%', '200% 200%']
                            )
                        }}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.3 }
                        }}
                    >
                        <span className="block">this is</span>
                        <span className="block">fiveroses</span>
                    </motion.h2>
                </motion.div>
            </div>
            <div ref={gallery} className={styles.gallery}>
                <div className={styles.galleryWrapper}>
                    <Column images={[images[0], images[1], images[2]]} y={springY} index={0} />
                    <Column images={[images[3], images[4], images[5]]} y={springY2} index={1} />
                    <Column images={[images[6], images[7], images[8]]} y={springY3} index={2} />
                    <Column images={[images[9], images[10], images[11]]} y={springY4} index={3} />
                </div>
            </div>
            <div ref={secondSpacerRef} className={`${styles.spacer} ${styles.after}`}>
                <FuzzyOverlay />
                <div className={styles.velocityTextContainer}>
                    <VelocityText />
                </div>
                <motion.div 
                    className={styles.textContainer}
                    style={{ 
                        y: springSecondY,
                        opacity: secondTextOpacity,
                        scale: secondTextScale
                    }}
                >
                    <motion.h2 
                        className={styles.text}
                        data-text="a place of endless possibilities"
                        style={{
                            rotateX: secondTextRotate,
                            backgroundPosition: useTransform(
                                secondSpacerProgress,
                                [0, 1],
                                ['200% 200%', '0% 0%']
                            )
                        }}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.3 }
                        }}
                    >
                        <span className="block">a place of</span>
                        <span className="block">endless possibilities</span>
                    </motion.h2>
                </motion.div>
            </div>
        </div>
    );
}

const Column = memo(({images, y, index}: ColumnProps) => {
    const columnRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: columnRef,
        offset: ['start end', 'end start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
    const imageRotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -1 : 1, index % 2 === 0 ? 1 : -1]);

    return (
        <motion.div 
            ref={columnRef}
            className={styles.column}
            style={{
                y,
                rotate: imageRotate,
                scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]),
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
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
                >
                    <Image 
                        src={src}
                        alt='image'
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={i === 0 ? 75 : 60}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        priority={i === 0}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj4+Oj7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                </motion.div>
            ))}
        </motion.div>
    );
});

Column.displayName = 'Column'; 
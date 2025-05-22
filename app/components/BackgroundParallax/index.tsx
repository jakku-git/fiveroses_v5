'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import Image from 'next/image';
import styles from './styles.module.scss';

export default function BackgroundParallax() {
    const container = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    });

    // Adjusted transform values for better timing
    const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1.1, 1.1, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
    
    // Adjusted spring configurations for smoother movement
    const springY = useSpring(y, { stiffness: 50, damping: 20 });
    const springScale = useSpring(scale, { stiffness: 50, damping: 20 });
    
    // Adjusted line animations with better timing
    const line1X = useTransform(scrollYProgress, [0, 0.3], ["-100%", "0%"]);
    const line2X = useTransform(scrollYProgress, [0.1, 0.4], ["100%", "0%"]);
    const line3Y = useTransform(scrollYProgress, [0.2, 0.5], ["50px", "0px"]);
    const line4Y = useTransform(scrollYProgress, [0.3, 0.6], ["-50px", "0px"]);
    
    // Adjusted spring configurations for text lines
    const springConfig = { stiffness: 70, damping: 25 };
    const springLine1X = useSpring(line1X, springConfig);
    const springLine2X = useSpring(line2X, springConfig);
    const springLine3Y = useSpring(line3Y, springConfig);
    const springLine4Y = useSpring(line4Y, springConfig);

    return (
        <div
            ref={container} 
            className={styles.container}
        >
            <motion.div 
                className={styles.textContainer}
                style={{ opacity }}
            >
                <div className={styles.text}>
                    <motion.span 
                        className={styles.line1}
                        style={{ 
                            x: springLine1X,
                            scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1.05, 1.05, 1]),
                            opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
                        }}
                    >
                        Bold ideas
                    </motion.span>
                    <motion.span 
                        className={styles.line2}
                        data-text="into beautiful realities."
                        style={{ 
                            x: springLine2X,
                            scale: useTransform(scrollYProgress, [0.1, 0.4, 0.8, 1], [0.8, 1.05, 1.05, 1]),
                            opacity: useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [0, 1, 1, 0])
                        }}
                    >
                        into beautiful realities.
                    </motion.span>
                    <motion.span 
                        className={styles.line3}
                        style={{ 
                            y: springLine3Y,
                            opacity: useTransform(scrollYProgress, [0.2, 0.4, 0.8, 1], [0, 1, 1, 0]),
                            scale: useTransform(scrollYProgress, [0.2, 0.5, 0.8, 1], [0.9, 1, 1, 0.95])
                        }}
                    >
                        Creative strategy, design, and storytelling
                    </motion.span>
                    <motion.span 
                        className={styles.line4}
                        style={{ 
                            y: springLine4Y,
                            opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.8, 1], [0, 1, 1, 0]),
                            scale: useTransform(scrollYProgress, [0.3, 0.6, 0.8, 1], [0.9, 1, 1, 0.95])
                        }}
                    >
                        that moves people and brands forward.
                    </motion.span>
                </div>
            </motion.div>

            <motion.div 
                className={styles.imageContainer}
                style={{ 
                    y: springY, 
                    scale: springScale
                }}
            >
                <motion.div 
                    className={styles.imageWrapper}
                    style={{
                        rotate: useTransform(scrollYProgress, [0, 1], [0, 3])
                    }}
                >
                    <Image 
                        src="https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/morehome%20(3)_compressed.webp" 
                        alt="background" 
                        fill
                        style={{objectFit: "cover"}}
                        priority
                    />
                </motion.div>
            </motion.div>
        </div>
    );
} 
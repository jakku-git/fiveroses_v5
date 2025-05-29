'use client'

import { useTransform, useScroll, motion } from 'framer-motion';
import { useRef, memo } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

interface CardProps {
    title: string;
    description: string;
    src: string;
    link: string;
    color: string;
    i: number;
    progress: any;
    range: [number, number];
    targetScale: number;
}

// Custom comparison function for memo
const arePropsEqual = (prevProps: CardProps, nextProps: CardProps) => {
    return (
        prevProps.title === nextProps.title &&
        prevProps.description === nextProps.description &&
        prevProps.src === nextProps.src &&
        prevProps.link === nextProps.link &&
        prevProps.color === nextProps.color &&
        prevProps.i === nextProps.i &&
        prevProps.range[0] === nextProps.range[0] &&
        prevProps.range[1] === nextProps.range[1] &&
        prevProps.targetScale === nextProps.targetScale
    );
};

function Card({ title, description, src, link, color, i, progress, range, targetScale }: CardProps) {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start']
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    const cardStyle = {
        '--card-color': color,
        top: `calc(-5vh + ${i * 25}px)`,
        transform: `scale(${scale.get()})`
    } as React.CSSProperties;

    return (
        <div ref={container} className={styles.cardContainer}>
            <motion.div 
                className={styles.card}
                style={cardStyle}
            >
                <h2>{title}</h2>
                <div className={styles.body}>
                    <div className={styles.description}>
                        <p>{description}</p>
                        <span>
                            <a href={link} target="_blank">See more</a>
                            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="currentColor"/>
                            </svg>
                        </span>
                    </div>
                    <div className={styles.imageContainer}>
                        <motion.div 
                            className={styles.inner}
                            style={{scale: imageScale}}
                        >
                            <Image
                                src={src}
                                alt={title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                quality={85}
                                priority={i === 0}
                                loading={i === 0 ? "eager" : "lazy"}
                                className="object-cover"
                                style={{
                                    transform: 'translateZ(0)',
                                    willChange: 'transform'
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

// Export memoized version with custom comparison
export default memo(Card, arePropsEqual); 
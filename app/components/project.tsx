'use client'

import styles from './Style.module.css'
import { motion } from 'framer-motion'
import { useState, memo, useEffect, useRef } from 'react'
import Image from 'next/image'

const anim = {
    initial: { width: 0 },
    open: { 
        width: "12vw",
        transition: { 
            duration: 0.4, 
            ease: [0.23, 1, 0.32, 1]
        }
    },
    closed: { width: 0 }
}

interface ProjectProps {
  project: {
    title1: string;
    title2: string;
    src: string;
    width?: number;
    height?: number;
  }
}

// Custom comparison function for memo
const arePropsEqual = (prevProps: ProjectProps, nextProps: ProjectProps) => {
    return (
        prevProps.project.title1 === nextProps.project.title1 &&
        prevProps.project.title2 === nextProps.project.title2 &&
        prevProps.project.src === nextProps.project.src &&
        prevProps.project.width === nextProps.project.width &&
        prevProps.project.height === nextProps.project.height
    );
};

function Project({ project }: ProjectProps) {
    const [isActive, setIsActive] = useState(false);
    const [isVisible, setIsVisible] = useState(true); // Start as visible
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { title1, title2, src } = project;

    useEffect(() => {
        // Check if mobile
        setIsMobile(window.innerWidth < 768);
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '50px',
                threshold: 0.1
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);
    
    return (
        <div 
            ref={containerRef}
            onMouseEnter={() => !isMobile && setIsActive(true)}
            onMouseLeave={() => !isMobile && setIsActive(false)}
            onTouchStart={() => isMobile && setIsActive(true)}
            onTouchEnd={() => isMobile && setIsActive(false)}
            className={styles.project}
        >
            <p>{title1}</p>
            <motion.div 
                variants={anim} 
                initial="initial"
                animate={isActive ? "open" : "closed"}
                className={styles.imgContainer}
                style={{
                    willChange: 'width',
                    transform: 'translateZ(0)'
                }}
            >
                <Image 
                    src={src}
                    alt={`${title1} ${title2}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 12vw"
                    quality={85}
                    loading="lazy"
                    className="object-cover"
                    onError={(e) => console.error('Image failed to load:', e)}
                />
            </motion.div>
            <p>{title2}</p>
        </div>
    )
}

// Export memoized version with custom comparison
export default memo(Project, arePropsEqual); 
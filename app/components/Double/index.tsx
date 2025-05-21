'use client';

import styles from './style.module.css';
import Image from 'next/image';
import { useRef } from 'react';

interface Project {
    name: string;
    client: string;
    description: string;
    src: string;
    year: number;
}

interface DoubleProps {
    projects: [Project, Project];
    reversed?: boolean;
}

export default function Double({ projects, reversed }: DoubleProps) {
    const firstImage = useRef<HTMLDivElement>(null);
    const secondImage = useRef<HTMLDivElement>(null);
    let requestAnimationFrameId: number | null = null;
    let xPercent = reversed ? 100 : 0;
    let currentXPercent = reversed ? 100 : 0;
    const speed = 0.15;

    const manageMouseMove = (e: React.MouseEvent) => {
        const { clientX } = e;
        xPercent = (clientX / window.innerWidth) * 100;

        if (!requestAnimationFrameId) {
            requestAnimationFrameId = window.requestAnimationFrame(animate);
        }
    }

    const animate = () => {
        // Add easing to the animation
        const xPercentDelta = xPercent - currentXPercent;
        currentXPercent = currentXPercent + (xPercentDelta * speed);

        // Change width of images between 33.33% and 66.66% based on cursor
        const firstImagePercent = 66.66 - (currentXPercent * 0.33);
        const secondImagePercent = 33.33 + (currentXPercent * 0.33);

        if (firstImage.current && secondImage.current) {
            firstImage.current.style.width = `${firstImagePercent}%`;
            secondImage.current.style.width = `${secondImagePercent}%`;
        }

        if (Math.round(xPercent) === Math.round(currentXPercent)) {
            window.cancelAnimationFrame(requestAnimationFrameId!);
            requestAnimationFrameId = null;
        } else {
            window.requestAnimationFrame(animate);
        }
    }

    return (
        <div onMouseMove={manageMouseMove} className={styles.double}>
            <div ref={firstImage} className={styles.imageContainer}>
                <div className={styles.stretchyWrapper}>
                    <Image
                        src={`/${projects[0].src}`}
                        fill={true}
                        alt={projects[0].name}
                    />
                    <div className={styles.body}>
                        <h3>{projects[0].name}</h3>
                        <p>{projects[0].description}</p>
                        <p>{projects[0].year}</p>
                    </div>
                </div>
            </div>

            <div ref={secondImage} className={styles.imageContainer}>
                <div className={styles.stretchyWrapper}>
                    <Image
                        src={`/${projects[1].src}`}
                        fill={true}
                        alt={projects[1].name}
                    />
                    <div className={styles.body}>
                        <h3>{projects[1].name}</h3>
                        <p>{projects[1].description}</p>
                        <p>{projects[1].year}</p>
                    </div>
                </div>
            </div>
        </div>
    )
} 
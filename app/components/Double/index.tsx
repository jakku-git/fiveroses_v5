'use client';

import styles from './style.module.css';
import Image from 'next/image';
import { useRef, useState, useEffect, memo } from 'react';

interface Project {
    name: string;
    client: string;
    description: string;
    src: string;
    year: number;
}

interface DoubleProps {
    projects: Project[];
    reversed?: boolean;
}

// Custom comparison function for memo
const arePropsEqual = (prevProps: DoubleProps, nextProps: DoubleProps) => {
    if (prevProps.reversed !== nextProps.reversed) return false;
    if (prevProps.projects.length !== nextProps.projects.length) return false;
    
    return prevProps.projects.every((project, index) => {
        const nextProject = nextProps.projects[index];
        return (
            project.name === nextProject.name &&
            project.client === nextProject.client &&
            project.description === nextProject.description &&
            project.src === nextProject.src &&
            project.year === nextProject.year
        );
    });
};

export default memo(function Double({ projects, reversed }: DoubleProps) {
    const firstImage = useRef<HTMLDivElement>(null);
    const secondImage = useRef<HTMLDivElement>(null);
    const [themes, setThemes] = useState<['light' | 'dark', 'light' | 'dark']>(['light', 'light']);
    let requestAnimationFrameId: number | null = null;
    let xPercent = reversed ? 100 : 0;
    let currentXPercent = reversed ? 100 : 0;
    const speed = 0.15;

    useEffect(() => {
        const checkImageBrightness = async (src: string, index: number) => {
            const img = new window.Image();
            img.crossOrigin = "anonymous";
            img.src = src;
            
            await new Promise<void>((resolve) => {
                img.onload = () => resolve();
            });

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Draw image to canvas
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Get image data from bottom third of the image (where text will be)
            const imageData = ctx.getImageData(0, canvas.height * 0.66, canvas.width, canvas.height * 0.33);
            const data = imageData.data;

            // Calculate average brightness
            let totalBrightness = 0;
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                // Calculate perceived brightness using the formula: (0.299*R + 0.587*G + 0.114*B)
                totalBrightness += (0.299 * r + 0.587 * g + 0.114 * b);
            }
            const averageBrightness = totalBrightness / (data.length / 4);

            // Set theme based on brightness (threshold at 128)
            setThemes(prev => {
                const newThemes = [...prev] as ['light' | 'dark', 'light' | 'dark'];
                newThemes[index] = averageBrightness < 128 ? 'light' : 'dark';
                return newThemes;
            });
        };

        projects.forEach((project, index) => {
            checkImageBrightness(project.src, index);
        });
    }, [projects]);

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
                        src={projects[0].src}
                        fill
                        alt={projects[0].name}
                        sizes="(max-width: 768px) 100vw, 66vw"
                        quality={85}
                        priority={!reversed}
                        loading={reversed ? "lazy" : "eager"}
                        className="object-cover"
                        style={{
                            transform: 'translateZ(0)',
                            willChange: 'transform'
                        }}
                    />
                    <div className={styles.body} data-theme={themes[0]}>
                        <h3>{projects[0].name}</h3>
                        <p>{projects[0].description}</p>
                        <p>{projects[0].year}</p>
                    </div>
                </div>
            </div>

            <div ref={secondImage} className={styles.imageContainer}>
                <div className={styles.stretchyWrapper}>
                    <Image
                        src={projects[1].src}
                        fill
                        alt={projects[1].name}
                        sizes="(max-width: 768px) 100vw, 66vw"
                        quality={85}
                        priority={reversed}
                        loading={reversed ? "eager" : "lazy"}
                        className="object-cover"
                        style={{
                            transform: 'translateZ(0)',
                            willChange: 'transform'
                        }}
                    />
                    <div className={styles.body} data-theme={themes[1]}>
                        <h3>{projects[1].name}</h3>
                        <p>{projects[1].description}</p>
                        <p>{projects[1].year}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}, arePropsEqual); 
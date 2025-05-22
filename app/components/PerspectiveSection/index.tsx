'use client';

import { motion, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface PerspectiveSectionProps {
    scrollYProgress: any;
    isFirstSection?: boolean;
    imageSrc: string;
    title?: string;
    ctaText?: string;
    ctaLink?: string;
}

export default function PerspectiveSection({ 
    scrollYProgress, 
    isFirstSection = false, 
    imageSrc,
    title,
    ctaText,
    ctaLink 
}: PerspectiveSectionProps) {
    const scale = useTransform(scrollYProgress, [0, 1], isFirstSection ? [1, 0.8] : [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], isFirstSection ? [0, -5] : [5, 0]);
    
    // Different timing for first and second sections
    const textOpacity = useTransform(
        scrollYProgress,
        isFirstSection 
            ? [-0.1, 0, 0.5, 1] // First section: appears as soon as section starts becoming visible
            : [0, 0.5, 1.1, 1.2], // Second section: appears halfway, stays until next section is fully in view
        isFirstSection 
            ? [0, 1, 1, 0] // First section fade values
            : [0, 0, 1, 1] // Second section fade values - stays at 1 until next section
    );
    
    const textY = useTransform(
        scrollYProgress,
        isFirstSection 
            ? [-0.1, 0, 0.5, 1] // First section movement timing
            : [0, 0.5, 1.1, 1.2], // Second section movement timing
        isFirstSection 
            ? [20, 0, 0, -20] // First section movement values
            : [20, 20, 0, 0] // Second section movement values - stays at 0 until next section
    );

    return (
        <motion.div 
            style={{ 
                scale,
                rotate,
                position: isFirstSection ? 'sticky' : 'relative',
                top: isFirstSection ? 0 : undefined,
                height: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <div className="relative h-full w-full">
                <Image
                    src={imageSrc}
                    alt="Perspective section image"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Text Overlay */}
                <motion.div 
                    className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4"
                    style={{
                        opacity: textOpacity,
                        y: textY
                    }}
                >
                    {title && (
                        <motion.h2 
                            className="text-6xl md:text-8xl font-black tracking-tighter text-center mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: 0 }}
                        >
                            {title}
                        </motion.h2>
                    )}
                    
                    {ctaText && ctaLink && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                        >
                            <Link 
                                href={ctaLink}
                                className="group inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
                            >
                                <span className="text-3xl md:text-5xl font-extralight tracking-tight leading-none text-white relative after:absolute after:bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                                    {ctaText}
                                </span>
                                <ArrowUpRight className="w-8 h-8 text-white" />
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
} 
'use client';

import { motion, useTransform } from 'framer-motion';
import Image from 'next/image';

interface PerspectiveSectionProps {
    scrollYProgress: any;
    isFirstSection?: boolean;
    imageSrc: string;
}

export default function PerspectiveSection({ scrollYProgress, isFirstSection = false, imageSrc }: PerspectiveSectionProps) {
    const scale = useTransform(scrollYProgress, [0, 1], isFirstSection ? [1, 0.8] : [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], isFirstSection ? [0, -5] : [5, 0]);

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
            </div>
        </motion.div>
    );
} 
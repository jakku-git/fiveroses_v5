'use client'

import styles from './styles.module.css'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef, memo } from 'react'
import Image from 'next/image'

const pictures = [
    {
        src: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/home%20(4).webp",
        scale: 4,
        position: {
            top: "0",
            left: "0",
            width: "25vw",
            height: "25vh"
        }
    },
    {
        src: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/home%20(6).webp",
        scale: 5,
        position: {
            top: "-30vh",
            left: "5vw",
            width: "35vw",
            height: "30vh"
        }
    },
    {
        src: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/home%20(1).webp",
        scale: 6,
        position: {
            top: "-10vh",
            left: "-25vw",
            width: "20vw",
            height: "45vh"
        }
    },
    {
        src: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/home%20(5).webp",
        scale: 8,
        position: {
            left: "27.5vw",
            width: "25vw",
            height: "25vh"
        }
    },
    {
        src: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/home%20(7).webp",
        scale: 9,
        position: {
            top: "27.5vh",
            left: "5vw",
            width: "20vw",
            height: "25vh"
        }
    }
]

const ZoomParallax = memo(function ZoomParallax() {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const scales = pictures.map(pic => 
        useTransform(scrollYProgress, [0, 1], [1, pic.scale])
    );

    return (
        <div ref={container} className={styles.container}>
            <div className={styles.sticky}>
                {pictures.map(({src, position}, index) => {
                    return (
                        <motion.div 
                            key={index} 
                            style={{scale: scales[index]}} 
                            className={styles.el}
                        >
                            <div 
                                className={styles.imageContainer}
                                style={{
                                    top: position.top,
                                    left: position.left,
                                    width: position.width,
                                    height: position.height
                                }}
                            >
                                <Image
                                    src={src}
                                    alt="parallax image"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    quality={index === 0 ? 85 : 75}
                                    loading={index === 0 ? "eager" : "lazy"}
                                    priority={index === 0}
                                    className="object-cover"
                                    style={{
                                        transform: 'translateZ(0)',
                                        willChange: 'transform'
                                    }}
                                />
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
});

export default ZoomParallax; 
'use client'

import styles from './styles.module.css'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

const pictures = [
    {
        src: "/ceramics.webp",
        scale: 4,
        position: {
            top: "0",
            left: "0",
            width: "25vw",
            height: "25vh"
        }
    },
    {
        src: "/heat.webp",
        scale: 5,
        position: {
            top: "-30vh",
            left: "5vw",
            width: "35vw",
            height: "30vh"
        }
    },
    {
        src: "/power.webp",
        scale: 6,
        position: {
            top: "-10vh",
            left: "-25vw",
            width: "20vw",
            height: "45vh"
        }
    },
    {
        src: "/river.webp",
        scale: 8,
        position: {
            left: "27.5vw",
            width: "25vw",
            height: "25vh"
        }
    },
    {
        src: "/podcast.webp",
        scale: 9,
        position: {
            top: "27.5vh",
            left: "5vw",
            width: "20vw",
            height: "25vh"
        }
    }
]

export default function ZoomParallax() {
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
                                <img
                                    src={src}
                                    alt="parallax image"
                                />
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
} 
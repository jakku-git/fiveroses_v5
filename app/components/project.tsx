'use client'

import styles from './Style.module.css'
import { motion } from 'framer-motion'
import { useState } from 'react'

const anim = {
    initial: { width: 0 },
    open: { 
        width: "15vw", 
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
  }
}

export default function Project({ project }: ProjectProps) {
    const [isActive, setIsActive] = useState(false);
    const { title1, title2, src } = project;
    
    console.log('Image path:', src);
    console.log('Is active:', isActive);
    
    return (
        <div 
            onMouseEnter={() => {
                console.log('Mouse entered');
                setIsActive(true);
            }} 
            onMouseLeave={() => {
                console.log('Mouse left');
                setIsActive(false);
            }} 
            className={styles.project}
        >
            <p>{title1}</p>
            <motion.div 
                variants={anim} 
                animate={isActive ? "open" : "closed"} 
                className={styles.imgContainer}
                style={{
                    willChange: 'width',
                    transform: 'translateZ(0)'
                }}
            >
                <img src={src} alt={`${title1} ${title2}`} onError={(e) => console.error('Image failed to load:', e)} />
            </motion.div>
            <p>{title2}</p>
        </div>
    )
} 
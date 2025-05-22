"use client"

import styles from './page.module.css'
import Double from './components/Double'
import Project from './components/project'
import ZoomParallax from './components/ZoomParallax'
import Card from './components/Card'
import { cards } from './data/cards'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import ParallaxGallery from './components/ParallaxGallery'
import BackgroundParallax from './components/BackgroundParallax'
import { Inter } from "next/font/google"
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import PerspectiveSection from './components/PerspectiveSection'
import { VelocityText } from './components/VelocityText'

const originalProjects = [
    {
        title1: "Jomor",
        title2: "Design",
        src: "ceramics.webp"
    },
    {
        title1: "La",
        title2: "Grange",
        src: "heat.webp"
    },
    {
        title1: "Deux Huit",
        title2: "Huit",
        src: "power.webp"
    },
    {
        title1: "Nothing",
        title2: "Design Studio",
        src: "river.webp"
    },
    {
        title1: "Mambo",
        title2: "Mambo",
        src: "podcast.webp"
    }
]

const galleryProjects = [
    {
        name: "CTRL Collective",
        client: "Bitwave Studio",
        description: "An immersive visual identity and event microsite for a retro tech convention celebrating 90s gaming culture, youth creativity, and analog nostalgia—brought to life with CRT-era aesthetics and rebellious motion design.",
        src: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/morehome%20(1)_compressed.webp",
        year: 2024,
    },
    {
        name: "Wild & Woven",
        client: "Storytree Kids",
        description: "Brand identity, packaging, and eCommerce design for a sustainable children's toy brand. Playful earth-tones, hand-illustrated textures, and tactile storytelling bring the magic of nature-inspired learning to life.",
        src: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/morehome%20(2)_compressed.webp",
        year: 2024,
    },
    {
        name: "Stacks & Stories",
        client: "Luma Library Co.",
        description: "Creative direction and visual content series for a modern urban library chain. This campaign focused on reimagining libraries as cultural sanctuaries—with an emphasis on light, curiosity, and the quiet poetry of public space.",
        src: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/morehome%20(4)_compressed.webp",
        year: 2024,
    },
    {
        name: "Circuit Bloom",
        client: "Brightbyte Labs",
        description: "Art direction and campaign visuals for a youth innovation initiative merging art and engineering. We captured the poetic tension between glowing ambition and gritty experimentation in the quiet moments of making.",
        src: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/morehome%20(5)_compressed.webp",
        year: 2024,
    }
]

// Dynamically import heavy components
const CanvasRevealEffect = dynamic(() => import("@/components/ui/canvas-reveal-effect").then(mod => mod.CanvasRevealEffect), {
    ssr: false,
    loading: () => <div className="h-screen w-full relative z-10" />
})

const inter = Inter({ 
    subsets: ["latin"], 
    weight: ["100", "300", "400", "700", "900"],
    display: 'swap',
    preload: true
})

export default function Home() {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);

    return (
        <>
            {/* 1. Hero Section */}
            <section className="w-full min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-black via-black/95 to-black/90 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
                <Suspense fallback={<div className="h-screen w-full relative z-10" />}>
                    <CanvasRevealEffect
                        animationSpeed={0.5}
                        containerClassName="h-screen w-full relative z-10"
                        revealText="fiveroses"
                        textClassName="text-[8vw] tracking-tighter font-black text-white"
                        videoUrls={{
                            video1: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/deepmind1.webm",
                            video2: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/deepmind3.webm",
                            video3: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/deepmind2.webm"
                        }}
                    />
                </Suspense>
            </section>

            <main className={`${inter.className} ${styles.main}`}>
                {/* 6. Background Parallax Section */}
                <BackgroundParallax />

                {/* 7. Parallax Gallery Section */}
                <ParallaxGallery />

                {/* 2. Zoom Parallax Section */}
                <ZoomParallax />

                {/* 5. Cards Section */}
                <section className={styles.cardsSection}>
                    {cards.map((card, i) => {
                        const targetScale = 1 - ((cards.length - i) * 0.05);
                        return (
                            <Card 
                                key={i} 
                                i={i} 
                                progress={scrollYProgress} 
                                range={[i * 0.16, 1]} 
                                targetScale={targetScale}
                                {...card}
                            />
                        )
                    })}
                </section>

                {/* 3. Perspective Section */}
                <div ref={container} className={styles.perspectiveContainer}>
                    <PerspectiveSection
                        scrollYProgress={scrollYProgress}
                        isFirstSection={true}
                        imageSrc="https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/home%20(3).webp"
                        title="What are you waiting for?"
                    />
                    <PerspectiveSection
                        scrollYProgress={scrollYProgress}
                        imageSrc="https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/home%20(2).webp"
                        title="Let's create something."
                        ctaText="Let's Talk."
                        ctaLink="/contact"
                    />
                </div>

                {/* 4. Gallery Section */}
                <section className={styles.gallerySection}>
                    <h1 className="text-3xl md:text-5xl font-light tracking-tighter mb-8">Previous Works</h1>
                    <div className={styles.gallery}>
                        <Double projects={[galleryProjects[0], galleryProjects[1]]} />
                        <Double projects={[galleryProjects[2], galleryProjects[3]]} reversed={true} />
                    </div>
                </section>

                {/* 8. Original Projects Section */}
                <section className={styles.originalSection}>
                    <h1 className="text-3xl md:text-5xl font-light tracking-tighter mb-8">Recent Works</h1>
                    <div className={styles.projectList}>
                        {originalProjects.map((project, index) => (
                            <Project key={index} project={project} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    )
}

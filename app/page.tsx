"use client"

import styles from './page.module.css'
import { cards } from './data/cards'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Inter } from "next/font/google"
import Card from './components/Card'
import { VelocityText } from './components/VelocityText'
import { useIsMobile } from '@/components/ui/use-mobile'
import { IconBrandInstagram, IconBrandTwitter, IconBrandLinkedin, IconBrandYoutube } from '@tabler/icons-react'

const originalProjects = [
    {
        title1: "Human",
        title2: "Rights",
        src: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/partners%20(3).webp"
    },
    {
        title1: "La",
        title2: "Grange",
        src: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/partners%20(2).webp"
    },
    {
        title1: "Dix Sept",
        title2: "Sept",
        src: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/partners%20(1).webp"
    },
    {
        title1: "Nothing",
        title2: "Studio",
        src: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/partners%20(5).webp"
    },
    {
        title1: "Tiki",
        title2: "Miki",
        src: "https://pub-172cf25c478a4ad6ab218ee60b1a4b4f.r2.dev/partners%20(4).webp"
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

// Dynamically import all heavy components
const Double = dynamic(() => import('./components/Double'), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-black/50" />
});

const Project = dynamic(() => import('./components/project'), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-black/50" />
});

const ZoomParallax = dynamic(() => import('./components/ZoomParallax'), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-black/50" />
});

const ParallaxGallery = dynamic(() => import('./components/ParallaxGallery'), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-black/50" />
});

const BackgroundParallax = dynamic(() => import('./components/BackgroundParallax'), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-black/50" />
});

const PerspectiveSection = dynamic(() => import('./components/PerspectiveSection'), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-black/50" />
});

const CanvasRevealEffect = dynamic(() => import("@/components/ui/canvas-reveal-effect").then(mod => mod.CanvasRevealEffect), {
  ssr: false,
  loading: () => <div className="h-screen w-full relative z-10" />
});

const inter = Inter({ 
    subsets: ["latin"], 
    weight: ["100", "300", "400", "700", "900"],
    display: 'swap',
    preload: true
})

const MobileMessage = () => (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Desktop Experience Required</h2>
            <p className="text-white/80 text-lg mb-6">
                For the best experience, please view this website on a desktop device. The interactive elements and animations are optimized for larger screens.
            </p>
            <div className="text-white/60 text-sm mb-8">
                <p>In the meantime, follow us on social media to stay updated with our latest work and announcements.</p>
            </div>
            <div className="flex items-center justify-center gap-6">
                <button 
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="Instagram"
                >
                    <IconBrandInstagram className="w-8 h-8" />
                </button>
                <button 
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="Twitter"
                >
                    <IconBrandTwitter className="w-8 h-8" />
                </button>
                <button 
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                >
                    <IconBrandLinkedin className="w-8 h-8" />
                </button>
                <button 
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="YouTube"
                >
                    <IconBrandYoutube className="w-8 h-8" />
                </button>
            </div>
        </div>
    </div>
);

export default function Home() {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });
    const isMobile = useIsMobile();

    // Optimize Lenis scroll
    useEffect(() => {
        if (!isMobile) {  // Only initialize Lenis on desktop
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                touchMultiplier: 2,
            });

            function raf(time: number) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);

            return () => {
                lenis.destroy();
            };
        }
    }, [isMobile]);

    // Memoize expensive computations
    const cardScales = useMemo(() => 
        cards.map((_, i) => 1 - ((cards.length - i) * 0.05)),
        [cards.length]
    );

    if (isMobile) {
        return <MobileMessage />;
    }

    return (
        <>
            {/* 1. Hero Section */}
            <section className="w-full min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-black via-black/95 to-black/90 text-white overflow-hidden transform-gpu">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
                <Suspense fallback={<div className="h-screen w-full relative z-10" />}>
                    <CanvasRevealEffect
                        animationSpeed={0.5}
                        containerClassName="h-screen w-full relative z-10 transform-gpu"
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

            <main className={`${inter.className} ${styles.main} transform-gpu`}>
                {/* 6. Background Parallax Section */}
                <BackgroundParallax />

                {/* 7. Parallax Gallery Section */}
                <ParallaxGallery />

                {/* 2. Zoom Parallax Section */}
                <ZoomParallax />

                {/* 5. Cards Section - Optimized with memoized scales */}
                <section className={styles.cardsSection}>
                    {cards.map((card, i) => (
                        <Card 
                            key={i} 
                            i={i} 
                            progress={scrollYProgress} 
                            range={[i * 0.16, 1]} 
                            targetScale={cardScales[i]}
                            {...card}
                        />
                    ))}
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
                    <h1 className="text-3xl md:text-5xl font-light tracking-tighter mb-8">Partnerships</h1>
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

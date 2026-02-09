"use client"

import styles from './page.module.css'
import { cards } from './data/cards'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useMemo } from 'react'
import Lenis from '@studio-freight/lenis'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
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

// Optimize loading states with skeleton loaders
const LoadingSkeleton = () => (
  <div className="w-full h-full bg-black/20 animate-pulse" />
);

// Dynamically import all heavy components with optimized loading states
const Double = dynamic(() => import('./components/Double'), {
  ssr: false,
  loading: () => <LoadingSkeleton />
});

const Project = dynamic(() => import('./components/project'), {
  ssr: false,
  loading: () => <LoadingSkeleton />
});

const ZoomParallax = dynamic(() => import('./components/ZoomParallax'), {
  ssr: false,
  loading: () => <LoadingSkeleton />
});

const ParallaxGallery = dynamic(() => import('./components/ParallaxGallery'), {
  ssr: false,
  loading: () => <LoadingSkeleton />
});

const PerspectiveSection = dynamic(() => import('./components/PerspectiveSection'), {
  ssr: false,
  loading: () => <LoadingSkeleton />
});

const CanvasRevealEffect = dynamic(() => import("@/components/ui/canvas-reveal-effect").then(mod => mod.CanvasRevealEffect), {
  ssr: false,
  loading: () => <LoadingSkeleton />
});

const MobileMessage = () => (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-6 text-center">
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
    const isMobile = useIsMobile();
    
    // Initialize useScroll - it will handle null refs gracefully
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });

    // Optimize Lenis scroll with better performance settings
    useEffect(() => {
        if (typeof window === 'undefined' || isMobile) return;

        try {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                touchMultiplier: 2,
                infinite: false, // Disable infinite scroll
                lerp: 0.1, // Lower lerp value for better performance
            });

            // Optimize RAF loop
            let rafId: number;
            const raf = (time: number) => {
                lenis.raf(time);
                rafId = requestAnimationFrame(raf);
            };
            rafId = requestAnimationFrame(raf);

            return () => {
                if (rafId) cancelAnimationFrame(rafId);
                lenis.destroy();
            };
        } catch (error) {
            console.error('Error initializing Lenis:', error);
        }
    }, [isMobile]);

    // Memoize expensive computations
    const cardScales = useMemo(() => 
        cards.map((_, i) => 1 - ((cards.length - i) * 0.05)),
        [cards.length]
    );

    return (
        <>
            {/* 1. Hero Section */}
            <section className="w-full min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-black via-black/95 to-black/90 text-white overflow-hidden transform-gpu will-change-transform">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
                <Suspense fallback={<LoadingSkeleton />}>
                    <CanvasRevealEffect
                        animationSpeed={0.5}
                        containerClassName="h-screen w-full relative z-10 transform-gpu will-change-transform"
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

            <main className={`${styles.main} transform-gpu will-change-transform`}>
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

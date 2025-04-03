"use client"

import { Inter } from "next/font/google"
import dynamic from 'next/dynamic'
import { Suspense, memo } from 'react'
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from 'next/image'

// Dynamically import heavy components with better loading states
const ThreeDMarquee = dynamic(() => import("@/components/ui/3d-marquee").then(mod => mod.ThreeDMarquee), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-black/5 animate-pulse rounded-lg" />
})

const SnapScroll = dynamic(() => import("@/components/ui/snap-scroll").then(mod => mod.SnapScroll), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-black/5 animate-pulse" />
})

const CanvasRevealEffect = dynamic(() => import("@/components/ui/canvas-reveal-effect").then(mod => mod.CanvasRevealEffect), {
  ssr: false,
  loading: () => <div className="h-screen w-full relative z-10 bg-black/5 animate-pulse" />
})

const MaskContainer = dynamic(() => import("@/components/ui/svg-mask-effect").then(mod => mod.MaskContainer), {
  ssr: false,
  loading: () => <div className="w-full h-[35rem] bg-black/5 animate-pulse" />
})

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["100", "300", "400", "700", "900"],
  display: 'swap',
  preload: true
})

// Memoized components
const CallToAction = memo(function CallToAction() {
  return (
    <section className="w-full py-20 bg-black text-white">
      <div className="w-full px-4 md:px-6 text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-light tracking-tighter mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Ready to Grow Your Business?
        </motion.h2>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full hover:bg-accent transition-all duration-300"
        >
          Get in Touch
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
})

const HeroSection = memo(function HeroSection() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-black via-black/95 to-black/90 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
      <Suspense fallback={<div className="h-screen w-full relative z-10 bg-black/5 animate-pulse" />}>
        <CanvasRevealEffect
          animationSpeed={0.5}
          containerClassName="h-screen w-full relative z-10"
          revealText="fiveroses"
          textClassName="text-[8vw] tracking-tighter font-black"
        />
      </Suspense>
    </section>
  )
})

export default function Home() {
  const marqueeImages = [
    "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
    "https://assets.aceternity.com/animated-modal.png",
    "https://assets.aceternity.com/animated-testimonials.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
    "https://assets.aceternity.com/github-globe.png",
    "https://assets.aceternity.com/glare-card.png",
    "https://assets.aceternity.com/layout-grid.png",
    "https://assets.aceternity.com/flip-text.png",
    "https://assets.aceternity.com/hero-highlight.png",
    "https://assets.aceternity.com/carousel.webp",
    "https://assets.aceternity.com/placeholders-and-vanish-input.png",
    "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
    "https://assets.aceternity.com/signup-form.png",
    "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
    "https://assets.aceternity.com/spotlight-new.webp",
    "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
    "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
    "https://assets.aceternity.com/tabs.png",
    "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
    "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
    "https://assets.aceternity.com/glowing-effect.webp",
    "https://assets.aceternity.com/hover-border-gradient.png",
    "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
    "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
    "https://assets.aceternity.com/macbook-scroll.png",
    "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
    "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
    "https://assets.aceternity.com/multi-step-loader.png",
    "https://assets.aceternity.com/vortex.png",
    "https://assets.aceternity.com/wobble-card.png",
    "https://assets.aceternity.com/world-map.webp",
  ]

  return (
    <main className={`${inter.className} flex min-h-screen flex-col items-center justify-between`}>
      <HeroSection />

      {/* Snap Scroll Section */}
      <section className="w-full bg-transparent">
        <Suspense fallback={<div className="h-screen w-full bg-black/5 animate-pulse" />}>
          <SnapScroll />
        </Suspense>
      </section>

      {/* SVG Mask Effect Section */}
      <section className="w-full py-20 bg-white">
        <div className="flex h-[35rem] w-full items-center justify-center overflow-hidden">
          <Suspense fallback={<div className="w-full h-[35rem] bg-black/5 animate-pulse" />}>
            <MaskContainer
              revealText={
                <div className="mx-auto max-w-5xl text-center">
                  <h2 className="text-5xl font-black text-slate-800 dark:text-white whitespace-nowrap">
                    IGNITE. ENGAGE. ELEVATE.
                  </h2>
                  <p className="mt-4 text-xl font-light text-slate-800 dark:text-white">
                    Where bold ideas spark breakthrough campaigns that redefine success.
                  </p>
                  <p className="mt-2 text-xl font-light text-slate-800 dark:text-white">
                    Unleash the full potential of your brand with fiveroses.
                  </p>
                </div>
              }
              className="w-full h-[35rem] text-white dark:text-black"
            >
              <div className="mx-auto max-w-5xl text-center">
                <h1 className="text-5xl font-black whitespace-nowrap">
                  CREATIVITY MEETS STRATEGY
                </h1>
                <p className="mt-4 text-xl font-light">
                  We transform visionary concepts into real growth by harnessing innovative marketing techniques.
                </p>
              </div>
            </MaskContainer>
          </Suspense>
        </div>
        <div className="flex justify-center mt-8">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full hover:bg-accent transition-all duration-300"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* 3D Marquee Section */}
      <section className="w-full py-20 bg-black">
        <Suspense fallback={<div className="h-[400px] w-full bg-black/5 animate-pulse rounded-lg" />}>
          <ThreeDMarquee images={marqueeImages} />
        </Suspense>
      </section>

      <CallToAction />
    </main>
  )
}

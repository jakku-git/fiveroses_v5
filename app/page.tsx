"use client"

import { Inter } from "next/font/google"
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SnapScroll } from "@/components/ui/snap-scroll"
import { MorphingText } from "@/components/ui/morphing-text"

// Dynamically import heavy components
const CanvasRevealEffect = dynamic(() => import("@/components/ui/canvas-reveal-effect").then(mod => mod.CanvasRevealEffect), {
  ssr: false,
  loading: () => <div className="h-screen w-full relative z-10" />
})
const MaskContainer = dynamic(() => import("@/components/ui/svg-mask-effect").then(mod => mod.MaskContainer), {
  ssr: false,
  loading: () => <div className="w-full h-[35rem]" />
})

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["100", "300", "400", "700", "900"],
  display: 'swap',
  preload: true
})

export default function Home() {
  return (
    <main className={`${inter.className} flex min-h-screen flex-col items-center justify-between`}>
      {/* Hero Section */}
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

      {/* Snap Scroll Section */}
      <section className="w-full bg-transparent">
        <SnapScroll />
      </section>

      {/* SVG Mask Effect Section */}
      <section className="w-full py-20 bg-white">
        <div className="flex h-[35rem] w-full items-center justify-center overflow-hidden">
          <Suspense fallback={<div className="w-full h-[35rem]" />}>
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

      {/* Call to Action Section */}
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
    </main>
  )
}

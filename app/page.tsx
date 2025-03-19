"use client"

import { Inter } from "next/font/google"
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Dynamically import heavy components
const CanvasRevealEffect = dynamic(() => import("@/components/ui/canvas-reveal-effect").then(mod => mod.CanvasRevealEffect), {
  ssr: false,
  loading: () => <div className="h-screen w-full relative z-10" />
})
const FocusCards = dynamic(() => import("@/components/ui/focus-cards").then(mod => mod.FocusCards), {
  ssr: false,
  loading: () => <div className="w-full h-[400px]" />
})
const LayoutGrid = dynamic(() => import("@/components/ui/layout-grid").then(mod => mod.LayoutGrid), {
  ssr: false,
  loading: () => <div className="w-full h-[400px]" />
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
  const focusCardsData = [
    {
      title: "Marketing Strategy",
      src: "https://videos.pexels.com/video-files/4630097/4630097-uhd_2560_1440_25fps.mp4",
    },
    {
      title: "Web Development",
      src: "https://videos.pexels.com/video-files/5483085/5483085-uhd_2732_1440_25fps.mp4",
    },
    {
      title: "Creative Production",
      src: "https://videos.pexels.com/video-files/9810701/9810701-uhd_2732_1440_25fps.mp4",
    },
    {
      title: "Brand Identity",
      src: "https://videos.pexels.com/video-files/5310858/5310858-uhd_2560_1440_25fps.mp4",
    },
    {
      title: "Content Strategy",
      src: "https://videos.pexels.com/video-files/4994039/4994039-uhd_2560_1440_25fps.mp4",
    },
    {
      title: "Social Media Management",
      src: "https://videos.pexels.com/video-files/7793361/7793361-uhd_2732_1440_25fps.mp4",
    },
  ]

  const layoutGridData = [
    {
      id: 1,
      content: <p className="text-white text-lg font-light">Media Buying Campaign</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-evonics-1058276.jpg",
    },
    {
      id: 2,
      content: <p className="text-white text-lg font-light">Metro Banners</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-carrie-johnson-444447-1202849.jpg",
    },
    {
      id: 3,
      content: <p className="text-white text-lg font-light">AIS Campaign</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-freestockpro-1031700.jpg",
    },
    {
      id: 4,
      content: <p className="text-white text-lg font-light">Use Your Voice Campaign</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-polina-kovaleva-6185245.jpg",
    },
    {
      id: 5,
      content: <p className="text-white text-lg font-light">DKNY Campaign</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-garrison-gao-56316964-31165586.jpg",
    },
    {
      id: 6,
      content: <p className="text-white text-lg font-light">Flipkart Campaign</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-twotriangles-14647786.jpg",
    },
  ]

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
            textClassName="text-[8vw] tracking-tighter font-black"
          />
        </Suspense>
      </section>

      {/* SVG Mask Effect Section */}
      <section className="w-full py-20 bg-black">
        <div className="flex h-[35rem] w-full items-center justify-center overflow-hidden">
          <Suspense fallback={<div className="w-full h-[35rem]" />}>
            <MaskContainer
              revealText={
                <div className="mx-auto max-w-5xl text-center">
                  <h2 className="text-5xl font-black text-slate-00 dark:text-white whitespace-nowrap">
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
      </section>

      {/* Grow Your Brand Section */}
      <section className="w-full py-20 bg-black text-white">
        <div className="w-full px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-12 text-left">
            Grow Your Brand
          </h2>
          <Suspense fallback={<div className="w-full h-[400px]" />}>
            <FocusCards cards={focusCardsData} />
          </Suspense>
        </div>
      </section>

      {/* Layout Grid Section */}
      <section className="w-full py-20 bg-white text-black">
        <div className="w-full px-4 md:px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-light tracking-tighter mb-12 text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Work
          </motion.h2>
          <Suspense fallback={<div className="w-full h-[400px]" />}>
            <LayoutGrid cards={layoutGridData} />
          </Suspense>
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

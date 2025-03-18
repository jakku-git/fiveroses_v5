"use client"

import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"], weight: ["100", "900", "400", "700"] })

import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { FocusCards } from "@/components/ui/focus-cards"
import { LayoutGrid } from "@/components/ui/layout-grid"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { MaskContainer } from "@/components/ui/svg-mask-effect"

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
      <section className="w-full min-h-screen flex flex-col items-center justify-center relative bg-black text-white">
        <CanvasRevealEffect
          animationSpeed={0.5}
          containerClassName="h-screen w-full"
          revealText="fiveroses"
          textClassName="text-[8vw] tracking-tighter"
        />
      </section>

      {/* SVG Mask Effect Section - Full Edge-to-Edge */}
      <section className="w-full">
        <div className="flex h-[40rem] w-full items-center justify-center overflow-hidden">
          <MaskContainer
            revealText={
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-6xl font-black text-slate-00 dark:text-white">
                  IGNITE. ENGAGE. ELEVATE.
                </h2>
                <p className="mt-4 text-2xl font-thin text-slate-800 dark:text-white">
                  Where bold ideas spark breakthrough campaigns that redefine success.
                </p>
                <p className="mt-2 text-2xl font-thin text-slate-800 dark:text-white">
                  Unleash the full potential of your brand with fiveroses.
                </p>
              </div>
            }
            className="w-full h-[40rem] text-white dark:text-black"
          >
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-6xl font-black whitespace-nowrap">
                CREATIVITY MEETS STRATEGY
              </h1>
              <p className="mt-4 text-2xl font-thin">
                We transform visionary concepts into real growth by harnessing innovative marketing techniques.
              </p>
            </div>
          </MaskContainer>
        </div>
      </section>

      {/* Grow Your Brand Section */}
      <section className="w-full py-24 bg-black text-white">
        <h2 className="text-3xl md:text-5xl font-light tracking-tighter mb-12 text-left pl-10">
          Grow Your Brand
        </h2>
        <div className="pl-10">
          <FocusCards cards={focusCardsData} />
        </div>
      </section>

      {/* Layout Grid Section */}
      <section className="w-full py-24 bg-white text-black">
        <motion.h2
          className="text-3xl md:text-5xl font-light tracking-tighter mb-12 text-left pl-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Work
        </motion.h2>
        <LayoutGrid cards={layoutGridData} />
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white text-center">
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
          className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-accent transition-all duration-300"
        >
          Get in Touch
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </main>
  )
}

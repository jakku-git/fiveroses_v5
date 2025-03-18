"use client"

import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { FocusCards } from "@/components/ui/focus-cards"
import { LayoutGrid } from "@/components/ui/layout-grid"
import { FlipWords } from "@/components/ui/flip-words"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

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
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center relative bg-black text-white">
        <CanvasRevealEffect
          animationSpeed={0.5}
          containerClassName="h-screen w-full"
          revealText="fiveroses"
          textClassName="text-[8vw] tracking-tighter"
        />
      </section>

      {/* Discover Section */}
      <section className="w-full py-24 bg-black text-white">
        <h1 className="text-4xl md:text-6xl font-light tracking-tighter text-left pl-10 mb-10">
          Discover{" "}
          <FlipWords
            words={[
              "Expertise",
              "Innovation",
              "Solutions",
              "Strategy",
              "Creativity",
              "Excellence",
              "Insight",
              "Agility",
              "Vision",
              "Performance",
              "Optimization",
            ]}
          />
        </h1>

        {/* Intro Text Block */}
        <div className="max-w-3xl mx-auto bg-white text-black p-12 md:p-16 rounded-2xl shadow-lg mb-16">
          <p className="text-sm uppercase tracking-widest font-semibold mb-4">
            We’re an independent, award‑winning Australian agency.
          </p>
          <p className="text-lg md:text-xl font-light mb-6 leading-relaxed">
            Our team of thinkers, dreamers and doers move ambitious brands forward using deep research, high technology, rare creativity, and trust.
          </p>
          <p className="text-lg md:text-xl font-medium">
            If you think we’re a fit,{" "}
            <Link href="/contact" className="underline hover:text-accent">
              say hello.
            </Link>
          </p>
        </div>

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

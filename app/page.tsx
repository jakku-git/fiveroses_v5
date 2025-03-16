"use client"

import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { FocusCards } from "@/components/ui/focus-cards"
import { LayoutGrid } from "@/components/ui/layout-grid"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const focusCardsData = [
    {
      title: "Marketing Strategy",
      src: "/pexels-carrie-johnson-444447-1202849.jpg",
    },
    {
      title: "Web Development",
      src: "/pexels-carrie-johnson-444447-1202849.jpg",
    },
    {
      title: "Creative Production",
      src: "/pexels-carrie-johnson-444447-1202849.jpg",
    },
    {
      title: "Brand Identity",
      src: "/pexels-carrie-johnson-444447-1202849.jpg",
    },
    {
      title: "Content Strategy",
      src: "/pexels-carrie-johnson-444447-1202849.jpg",
    },
    {
      title: "Social Media Management",
      src: "/pexels-carrie-johnson-444447-1202849.jpg",
    },
  ]

  const layoutGridData = [
    {
      id: 1,
      content: <p className="text-white text-lg font-light">Marketing Strategy</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-carrie-johnson-444447-1202849.jpg", // ✅ Ensure this file exists in `/public/`
    },
    {
      id: 2,
      content: <p className="text-white text-lg font-light">Web Development</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-carrie-johnson-444447-1202849.jpg",
    },
    {
      id: 3,
      content: <p className="text-white text-lg font-light">Creative Production</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-carrie-johnson-444447-1202849.jpg",
    },
    {
      id: 4,
      content: <p className="text-white text-lg font-light">Brand Identity</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-carrie-johnson-444447-1202849.jpg",
    },
    {
      id: 5,
      content: <p className="text-white text-lg font-light">Content Strategy</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-carrie-johnson-444447-1202849.jpg",
    },
    {
      id: 6,
      content: <p className="text-white text-lg font-light">Social Media Management</p>,
      className: "h-64 bg-transparent text-white flex items-center justify-center",
      thumbnail: "/pexels-carrie-johnson-444447-1202849.jpg",
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
          textClassName="text-[8vw] font-light tracking-tighter"
        />
      </section>

      {/* Focus Cards Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-light tracking-tighter text-center mb-10">
            Discover Our <span className="text-accent">Expertise</span>
          </h1>

          <FocusCards cards={focusCardsData} />
        </div>
      </section>

      {/* Layout Grid (Now Uses the Correct Image) */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-light tracking-tighter mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Work
          </motion.h2>

          <LayoutGrid cards={layoutGridData} />
        </div>
      </section>

      {/* Call to Action */}
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

"use client"

import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { FocusCards } from "@/components/ui/focus-cards"
import { BentoGrid } from "@/components/ui/bento-grid"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
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

      {/* Focus Cards Section (Now Above BentoGrid) */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-light tracking-tighter text-center mb-10">
            Discover Our <span className="text-accent">Expertise</span>
          </h1>

          <FocusCards
            items={[
              {
                title: "Marketing Strategy",
                description: "Helping brands grow with tailored marketing solutions.",
                image: "/pexels-carrie-johnson-444447-1202849.jpg",
              },
              {
                title: "Web Development",
                description: "Building high-performance websites and apps.",
                image: "/pexels-carrie-johnson-444447-1202849.jpg",
              },
              {
                title: "Creative Production",
                description: "Bringing ideas to life with stunning visuals.",
                image: "/pexels-carrie-johnson-444447-1202849.jpg",
              },
              {
                title: "Brand Identity",
                description: "Crafting unique brand stories and visuals.",
                image: "/pexels-carrie-johnson-444447-1202849.jpg",
              },
              {
                title: "Content Strategy",
                description: "Developing engaging content for maximum impact.",
                image: "/pexels-carrie-johnson-444447-1202849.jpg",
              },
              {
                title: "Social Media Management",
                description: "Driving engagement and growth on all platforms.",
                image: "/pexels-carrie-johnson-444447-1202849.jpg",
              },
            ]}
            className="max-w-5xl mx-auto"
          />
        </div>
      </section>

      {/* BentoGrid (Below Focus Cards) */}
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

          <BentoGrid />
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

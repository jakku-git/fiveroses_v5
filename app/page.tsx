"use client"

import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { FocusCards } from "@/components/ui/focus-cards"
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
          colors={["#000000", "#ffffff"]}
        />
      </section>

      {/* About Section (Replaced ContainerScroll with FocusCards) */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-light tracking-tighter text-center mb-10">
            We are <span className="text-accent">fiveroses</span>
            <br />A full-service marketing agency
          </h1>
          
          <FocusCards
            items={[
              {
                title: "Marketing Strategy",
                description: "Helping brands grow with tailored marketing solutions.",
                icon: "📈",
              },
              {
                title: "Web Development",
                description: "Building high-performance websites and apps.",
                icon: "💻",
              },
              {
                title: "Creative Production",
                description: "Bringing ideas to life with stunning visuals.",
                icon: "🎬",
              },
            ]}
            className="max-w-5xl mx-auto"
          />

          <div className="flex flex-col items-center justify-center mt-12">
            <p className="text-xl md:text-2xl max-w-2xl text-center mb-8 font-light">
              We offer comprehensive marketing services, innovative web development, and a startup incubator to help
              your business bloom.
            </p>
            <Link
              href="/work"
              className="group flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-accent transition-all duration-300"
            >
              Explore our work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-light tracking-tighter mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Featured Work
          </motion.h2>
          
          <img
            src="/pexels-carrie-johnson-444447-1202849.jpg"
            alt="Focus Background"
            className="w-full h-96 object-cover rounded-lg mb-8"
          />

          <div className="flex justify-center mt-12">
            <Link
              href="/work"
              className="group flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-accent transition-all duration-300"
            >
              View all projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

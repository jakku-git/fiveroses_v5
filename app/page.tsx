"use client"

import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"
import { ContainerScroll } from "@/components/ui/container-scroll"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
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

      {/* About Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <ContainerScroll
            titleComponent={
              <h1 className="text-4xl md:text-6xl font-light tracking-tighter">
                We are <span className="text-accent">fiveroses</span>
                <br />A full-service marketing agency
              </h1>
            }
          >
            <div className="flex flex-col items-center justify-center w-full h-[50vh] mt-20">
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
          </ContainerScroll>
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
          <BentoGrid className="max-w-7xl mx-auto">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={item.className}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
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

// Sample data for the bento grid
const items = [
  {
    title: "Brand Strategy",
    description: "Comprehensive brand strategy for a tech startup that increased market recognition by 45%.",
    header: (
      <div className="flex w-full h-full min-h-[6rem] bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg">
        <img
          src="/placeholder.svg?height=400&width=600"
          alt="Brand Strategy Project"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    ),
    className: "md:col-span-2",
    icon: <ArrowRight className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Web Development",
    description: "Custom e-commerce platform with 99.9% uptime and 2.3s average load time.",
    header: (
      <div className="flex w-full h-full min-h-[6rem] bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg">
        <img
          src="/placeholder.svg?height=400&width=600"
          alt="Web Development Project"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: <ArrowRight className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Creative Production",
    description: "Award-winning video campaign that generated 2.4M views and 15K conversions.",
    header: (
      <div className="flex w-full h-full min-h-[6rem] bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg">
        <img
          src="/placeholder.svg?height=400&width=600"
          alt="Creative Production Project"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    ),
    className: "md:col-span-1",
    icon: <ArrowRight className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Startup Incubation",
    description: "Mentored 12 startups with 8 securing Series A funding within 18 months.",
    header: (
      <div className="flex w-full h-full min-h-[6rem] bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg">
        <img
          src="/placeholder.svg?height=400&width=600"
          alt="Startup Incubation Project"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    ),
    className: "md:col-span-2",
    icon: <ArrowRight className="h-4 w-4 text-neutral-500" />,
  },
]


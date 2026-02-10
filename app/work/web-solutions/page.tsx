'use client';

import { HeroParallax } from "@/components/ui/hero-parallax"
import { FlipWords } from "@/components/ui/flip-words"
import { MacbookScroll } from "@/components/ui/macbook-scroll"
import { LayoutGrid } from "@/components/ui/layout-grid"
import { EvervaultCard } from "@/components/ui/evervault-card"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { AnimatedSection } from "@/components/ui/animated-section"
import { AnimatedImage, OptimizedImage } from "@/components/ui/animated-image"
import { useIsMobile } from "@/hooks/use-mobile"

export default function WebSolutionsPage() {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, isMobile ? 400 : 800], [0, isMobile ? -30 : -100]);
  const gradientOpacity = useTransform(scrollY, [0, isMobile ? 400 : 800], [1, isMobile ? 0.7 : 0.5]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full">
        {!isMobile && <HeroParallax products={products} />}
        {isMobile && (
          <section className="w-full min-h-[60vh] flex flex-col items-center justify-center relative bg-black text-white px-4">
            <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} md:text-6xl font-bold tracking-tighter mb-4 text-center`}>
              We build{" "}
              <FlipWords words={["websites", "applications", "e-commerce", "platforms", "experiences"]} duration={1500} />
            </h1>
            <p className={`${isMobile ? 'text-base' : 'text-xl'} text-neutral-300 max-w-2xl mx-auto text-center`}>
              Our web solutions are designed to deliver exceptional user experiences, drive conversions,
              and help your business grow online.
            </p>
          </section>
        )}
      </section>

      {/* Intro Section */}
      <section className={`w-full ${isMobile ? 'py-12' : 'py-24'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 bg-black text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}>
            {!isMobile && (
              <>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                  We build{" "}
                  <FlipWords words={["websites", "applications", "e-commerce", "platforms", "experiences"]} duration={1500} />
                </h1>
                <p className="text-xl text-neutral-300 max-w-2xl mx-auto mb-12">
                  Our web solutions are designed to deliver exceptional user experiences, drive conversions,
                  and help your business grow online.
                </p>
              </>
            )}
            <div className={`flex flex-wrap justify-center ${isMobile ? 'gap-3' : 'gap-4'} ${isMobile ? 'mb-8' : 'mb-16'}`}>
              <Link
                href="/contact"
                className={`inline-flex items-center gap-2 ${isMobile ? 'px-5 py-2.5' : 'px-6 py-3'} bg-white text-black rounded-full hover:bg-rose-200 active:bg-rose-300 transition-all duration-300 touch-manipulation min-h-[44px]`}
              >
                Start your project
                <ArrowRight className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
              </Link>
              <Link
                href="#services"
                className={`inline-flex items-center gap-2 ${isMobile ? 'px-5 py-2.5' : 'px-6 py-3'} bg-transparent text-white border border-white rounded-full hover:bg-white/10 active:bg-white/20 transition-all duration-300 touch-manipulation min-h-[44px]`}
              >
                Explore services
                <ArrowRight className={`${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
              </Link>
            </div>
          </div>

          {/* Technology Section */}
          <div className={`grid grid-cols-1 md:grid-cols-2 ${isMobile ? 'gap-8' : 'gap-16'} items-center`}>
            <div>
              <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} md:text-5xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'}`}>Cutting-Edge Technology</h2>
              <p className={`${isMobile ? 'text-base' : 'text-lg'} text-neutral-300 ${isMobile ? 'mb-6' : 'mb-8'}`}>
                We leverage the latest technologies to build fast, secure, and scalable web solutions that drive results
                for your business.
              </p>
              <ul className={isMobile ? 'space-y-3' : 'space-y-4'}>
                {technologies.map((tech: { name: string; description: string }, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className={`${isMobile ? 'h-5 w-5 text-xs' : 'h-6 w-6 text-sm'} rounded-full bg-rose-200 text-black flex items-center justify-center font-bold mt-0.5 flex-shrink-0`}>
                      {index + 1}
                    </span>
                    <div>
                      <h3 className={`font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>{tech.name}</h3>
                      <p className={`text-neutral-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>{tech.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`w-full ${isMobile ? 'h-[250px] mt-6' : 'h-[400px]'} relative`}>
              {!isMobile && <EvervaultCard text="fiveroses" className="absolute inset-0" />}
            </div>
          </div>
        </div>
      </section>

      {/* Macbook Demo */}
      <section className={`w-full ${isMobile ? 'py-8' : 'py-12'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 bg-neutral-950 text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center ${isMobile ? 'mb-6' : 'mb-4'}`}>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} md:text-5xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'}`}>Our Development Process</h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} text-neutral-300 max-w-2xl mx-auto`}>
              We follow a proven development process to ensure your project is delivered on time, on budget,
              and exceeds expectations.
            </p>
          </div>

          {!isMobile && (
            <MacbookScroll
              title={
                <span>
                  Building <span className="text-rose-200">exceptional</span> web experiences
                </span>
              }
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000&h=1200"
              showGradient={true}
            />
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className={`w-full ${isMobile ? 'py-12' : 'py-24'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 bg-black text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} md:text-5xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'}`}>Our Web Services</h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} text-neutral-300 max-w-2xl mx-auto`}>
              Comprehensive web development solutions tailored to your business needs.
            </p>
          </div>

          <LayoutGrid cards={webServices} />
        </div>
      </section>

      {/* CTA Section */}
      <section className={`w-full ${isMobile ? 'py-12' : 'py-24'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 bg-black text-white`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} md:text-5xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'}`}>
            Ready to build your next web project?
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-neutral-300 ${isMobile ? 'mb-6' : 'mb-8'}`}>
            Let's work together to create a web solution that drives results for your business.
          </p>
          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 ${isMobile ? 'px-6 py-3' : 'px-8 py-4'} bg-white text-black rounded-full hover:bg-rose-200 active:bg-rose-300 transition-all duration-300 font-medium touch-manipulation min-h-[44px]`}
          >
            Get in touch
            <ArrowRight className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
          </Link>
        </div>
      </section>
    </main>
  )
}

const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail: "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
]

const webServices = [
  {
    id: 1,
    content: (
      <div className="flex flex-col justify-between h-full p-6 bg-neutral-900 rounded-lg border border-white/10">
        <div>
          <h3 className="text-xl font-bold mb-2">Website Design & UI/UX</h3>
          <p className="text-sm text-neutral-300">
            Beautiful, user-friendly designs that engage visitors and drive conversions.
          </p>
        </div>
        <img src="/placeholder.svg?height=300&width=400" alt="Website Design" className="mt-4 rounded-lg" />
      </div>
    ),
    className: "",
    thumbnail: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    content: (
      <div className="flex flex-col justify-between h-full p-6 bg-neutral-900 rounded-lg border border-white/10">
        <div>
          <h3 className="text-xl font-bold mb-2">Web Development & Custom Applications</h3>
          <p className="text-sm text-neutral-300">
            Custom web applications tailored to your specific business needs and requirements.
          </p>
        </div>
        <img src="/placeholder.svg?height=300&width=400" alt="Web Development" className="mt-4 rounded-lg" />
      </div>
    ),
    className: "",
    thumbnail: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    content: (
      <div className="flex flex-col justify-between h-full p-6 bg-neutral-900 rounded-lg border border-white/10">
        <div>
          <h3 className="text-xl font-bold mb-2">E-Commerce & CMS Integration</h3>
          <p className="text-sm text-neutral-300">
            Powerful e-commerce solutions and content management systems for seamless online operations.
          </p>
        </div>
        <img src="/placeholder.svg?height=300&width=400" alt="E-Commerce" className="mt-4 rounded-lg" />
      </div>
    ),
    className: "",
    thumbnail: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    content: (
      <div className="flex flex-col justify-between h-full p-6 bg-neutral-900 rounded-lg border border-white/10">
        <div>
          <h3 className="text-xl font-bold mb-2">Mobile Responsive & SEO-Friendly Design</h3>
          <p className="text-sm text-neutral-300">
            Websites that look great on all devices and are optimized for search engines.
          </p>
        </div>
        <img src="/placeholder.svg?height=300&width=400" alt="Responsive Design" className="mt-4 rounded-lg" />
      </div>
    ),
    className: "",
    thumbnail: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    content: (
      <div className="flex flex-col justify-between h-full p-6 bg-neutral-900 rounded-lg border border-white/10">
        <div>
          <h3 className="text-xl font-bold mb-2">Website Maintenance & Security</h3>
          <p className="text-sm text-neutral-300">
            Ongoing maintenance and security updates to keep your website running smoothly and securely.
          </p>
        </div>
        <img src="/placeholder.svg?height=300&width=400" alt="Website Maintenance" className="mt-4 rounded-lg" />
      </div>
    ),
    className: "",
    thumbnail: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 6,
    content: (
      <div className="flex flex-col justify-between h-full p-6 bg-neutral-900 rounded-lg border border-white/10">
        <div>
          <h3 className="text-xl font-bold mb-2">Conversion Optimization & Analytics</h3>
          <p className="text-sm text-neutral-300">
            Data-driven strategies to improve conversion rates and track website performance.
          </p>
        </div>
        <img src="/placeholder.svg?height=300&width=400" alt="Analytics" className="mt-4 rounded-lg" />
      </div>
    ),
    className: "",
    thumbnail: "/placeholder.svg?height=300&width=400",
  },
]

const technologies = [
  {
    name: "Next.js & React",
    description: "Modern JavaScript frameworks for building fast, interactive web applications.",
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development with consistent design.",
  },
  {
    name: "Headless CMS",
    description: "Flexible content management systems that separate content from presentation.",
  },
  {
    name: "Serverless Architecture",
    description: "Scalable, cost-effective infrastructure that automatically scales with demand.",
  },
  {
    name: "Progressive Web Apps",
    description: "Web applications that provide app-like experiences with offline capabilities.",
  },
]

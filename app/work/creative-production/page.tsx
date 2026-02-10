'use client';

import { AuroraBackground } from "@/components/ui/aurora-background"
import { ParallaxScroll } from "@/components/ui/parallax-scroll"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { AnimatedSection } from "@/components/ui/animated-section"
import { AnimatedImage, OptimizedImage } from "@/components/ui/animated-image"
import { useIsMobile } from "@/hooks/use-mobile"

export default function CreativeProductionPage() {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, isMobile ? 400 : 800], [0, isMobile ? -30 : -100]);
  const gradientOpacity = useTransform(scrollY, [0, isMobile ? 400 : 800], [1, isMobile ? 0.7 : 0.5]);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      {/* Hero Section */}
      <section className={`w-full flex flex-col items-center justify-center relative ${isMobile ? 'min-h-[60vh]' : 'min-h-screen'}`}>
        {!isMobile ? (
          <AuroraBackground>
            <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen">
              <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6">Creative Production</h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8">
                Stunning creative assets that capture attention and communicate your message.
              </p>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-rose-200 transition-all duration-300"
              >
                Explore our services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AuroraBackground>
        ) : (
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-black via-purple-900/20 to-black">
            <h1 className="text-3xl md:text-7xl font-bold tracking-tighter mb-4 text-white">Creative Production</h1>
            <p className="text-base md:text-2xl text-white/80 mb-6">
              Stunning creative assets that capture attention and communicate your message.
            </p>
            <Link
              href="#services"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full hover:bg-rose-200 active:bg-rose-300 transition-all duration-300 touch-manipulation min-h-[44px]"
            >
              Explore our services
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>

      {/* Services Section */}
      <section id="services" className={`w-full ${isMobile ? 'py-12' : 'py-24'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 bg-black text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} md:text-5xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'}`}>Our Creative Services</h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} text-neutral-300 max-w-2xl mx-auto`}>
              We offer a wide range of creative services to help your brand stand out and connect with your audience.
            </p>
          </div>

          <ParallaxScroll items={creativeServices} />
        </div>
      </section>

      {/* Process Section */}
      <section className={`w-full ${isMobile ? 'py-12' : 'py-24'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 relative overflow-hidden`}>
        {!isMobile ? (
          <BackgroundGradientAnimation>
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Our Creative Process</h2>
                  <p className="text-lg text-white/80 mb-8">
                    We follow a proven creative process to ensure your project exceeds expectations and achieves your
                    business goals.
                  </p>
                  <div className="space-y-6">
                    {creativeProcess.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-200 text-black flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                          <p className="text-white/70">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
                  <Image
                    src="/media/creative-production/process/creative-process.jpg"
                    alt="Creative Process"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </BackgroundGradientAnimation>
        ) : (
          <div className="relative z-10 max-w-7xl mx-auto bg-gradient-to-br from-purple-900/30 to-black">
            <div className="grid grid-cols-1 gap-8 items-center">
              <div>
                <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} md:text-5xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'} text-white`}>Our Creative Process</h2>
                <p className={`${isMobile ? 'text-base' : 'text-lg'} text-white/80 ${isMobile ? 'mb-6' : 'mb-8'}`}>
                  We follow a proven creative process to ensure your project exceeds expectations and achieves your
                  business goals.
                </p>
                <div className={isMobile ? 'space-y-4' : 'space-y-6'}>
                  {creativeProcess.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 ${isMobile ? 'w-8 h-8 text-sm' : 'w-10 h-10'} rounded-full bg-rose-200 text-black flex items-center justify-center font-bold`}>
                        {index + 1}
                      </div>
                      <div>
                        <h3 className={`${isMobile ? 'text-base' : 'text-xl'} font-bold ${isMobile ? 'mb-1' : 'mb-2'} text-white`}>{step.title}</h3>
                        <p className={`${isMobile ? 'text-sm' : ''} text-white/70`}>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`relative ${isMobile ? 'h-[250px]' : 'h-[500px]'} w-full rounded-lg overflow-hidden`}>
                <Image
                  src="/media/creative-production/process/creative-process.jpg"
                  alt="Creative Process"
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Portfolio Section */}
      <section className={`w-full ${isMobile ? 'py-12' : 'py-24'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 bg-black text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} md:text-5xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'}`}>Our Creative Portfolio</h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} text-neutral-300 max-w-2xl mx-auto`}>
              Explore our latest creative projects and see how we've helped our clients achieve their goals.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${isMobile ? 'gap-4' : 'gap-6'}`}>
            {portfolioItems.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg touch-manipulation">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
                    <h3 className={`${isMobile ? 'text-base' : 'text-xl'} font-bold ${isMobile ? 'mb-1' : 'mb-2'}`}>{item.title}</h3>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white/70 ${isMobile ? 'mb-3' : 'mb-4'}`}>{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, i) => (
                        <span key={i} className={`${isMobile ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-1'} bg-white/10 rounded-full`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`w-full ${isMobile ? 'py-12' : 'py-24'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 bg-neutral-950 text-white`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} md:text-5xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'}`}>
            Ready to bring your creative vision to life?
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-neutral-300 ${isMobile ? 'mb-6' : 'mb-8'}`}>
            Let's work together to create stunning assets that capture attention and communicate your message.
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

const creativeServices = [
  {
    title: "Graphic & Branding Design",
    description:
      "Comprehensive brand identity design including logos, color palettes, typography, and brand guidelines.",
    link: "#",
    image: "/media/creative-production/services/design.webp",
  },
  {
    title: "Video Production & Animation",
    description:
      "High-quality video production and animation services for commercials, explainer videos, and social media content.",
    link: "#",
    image: "/media/creative-production/services/production.webp",
  },
  {
    title: "Content Creation & Copywriting",
    description:
      "Engaging content creation and copywriting services for websites, social media, and marketing materials.",
    link: "#",
    image: "/media/creative-production/services/copywriting.webp",
  },
  {
    title: "Photography & Illustration",
    description: "Professional photography and illustration services to enhance your brand's visual identity.",
    link: "#",
    image: "/media/creative-production/services/photography.webp",
  },
  {
    title: "Interactive & Multimedia Design",
    description: "Interactive and multimedia design services for websites, apps, and digital experiences.",
    link: "#",
    image: "/media/creative-production/services/multimedia-design.webp",
  },
  {
    title: "Audio Production",
    description: "Professional audio production services for podcasts, commercials, and other audio content.",
    link: "#",
    image: "/media/creative-production/services/audio-production.webp",
  },
]

const creativeProcess = [
  {
    title: "Discovery",
    description:
      "We start by understanding your brand, goals, and target audience to ensure our creative solutions align with your business objectives.",
  },
  {
    title: "Strategy",
    description:
      "We develop a creative strategy that outlines the approach, messaging, and visual direction for your project.",
  },
  {
    title: "Creation",
    description:
      "Our team of creative professionals brings your vision to life through design, writing, photography, video, and more.",
  },
  {
    title: "Refinement",
    description:
      "We refine and iterate on our creative work based on your feedback to ensure it meets your expectations.",
  },
  {
    title: "Delivery",
    description:
      "We deliver the final creative assets in the formats you need for your marketing channels and campaigns.",
  },
]

const portfolioItems = [
  {
    title: "Bloom Brand Identity",
    description: "Complete brand identity design for a sustainable skincare brand",
    image: "/media/creative-production/portfolio/bloom-brand.jpg",
    tags: ["Branding", "Graphic Design", "Packaging"],
  },
  {
    title: "Horizon Video Series",
    description: "Award-winning educational video series for environmental awareness",
    image: "/media/creative-production/portfolio/horizon-video.jpg",
    tags: ["Video Production", "Animation", "Storytelling"],
  },
  {
    title: "Pulse Campaign",
    description: "Integrated marketing campaign for a health tech startup",
    image: "/media/creative-production/portfolio/pulse-campaign.jpg",
    tags: ["Campaign", "Content", "Social Media"],
  },
  {
    title: "Nova Photography",
    description: "Product photography for a luxury watch brand",
    image: "/media/creative-production/portfolio/nova-photography.jpg",
    tags: ["Photography", "Product", "Luxury"],
  },
  {
    title: "Echo Podcast Branding",
    description: "Brand identity and audio production for a business podcast",
    image: "/media/creative-production/portfolio/echo-podcast.jpg",
    tags: ["Audio", "Branding", "Podcast"],
  },
  {
    title: "Spark Social Content",
    description: "Ongoing social media content creation for a lifestyle brand",
    image: "/media/creative-production/portfolio/spark-social.jpg",
    tags: ["Social Media", "Content", "Photography"],
  },
]


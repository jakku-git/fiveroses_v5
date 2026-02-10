'use client';

import { Lens } from "@/components/ui/lens"
import { FocusCards } from "@/components/ui/focus-cards"
import { Vortex } from "@/components/ui/vortex"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { AnimatedSection } from "@/components/ui/animated-section"
import { AnimatedImage, OptimizedImage } from "@/components/ui/animated-image"
import { useIsMobile } from "@/hooks/use-mobile"

export default function MarketingPage() {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, isMobile ? 400 : 800], [0, isMobile ? -30 : -100]);
  const gradientOpacity = useTransform(scrollY, [0, isMobile ? 400 : 800], [1, isMobile ? 0.7 : 0.5]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      {/* Hero Section */}
      <section className={`w-full ${isMobile ? 'min-h-[60vh]' : 'min-h-[70vh]'} flex flex-col items-center justify-center relative bg-black text-white`}>
        <Vortex
          backgroundColor="black"
          className={`flex items-center flex-col justify-center ${isMobile ? 'px-4' : 'px-2'} md:px-10 ${isMobile ? 'py-6' : 'py-4'} w-full h-full`}
        >
          <h2 className={`text-white ${isMobile ? 'text-3xl' : 'text-2xl'} md:text-6xl font-bold text-center`}>
            Marketing & Strategy
          </h2>
          <p className={`text-white ${isMobile ? 'text-base' : 'text-sm'} md:text-2xl max-w-xl ${isMobile ? 'mt-4' : 'mt-6'} text-center`}>
            Comprehensive marketing strategies to elevate your brand and drive growth.
          </p>
          <div className={`flex flex-col sm:flex-row items-center ${isMobile ? 'gap-3' : 'gap-4'} ${isMobile ? 'mt-4' : 'mt-6'}`}>
            <Link
              href="/contact"
              className={`${isMobile ? 'px-6 py-3' : 'px-4 py-2'} bg-rose-200 hover:bg-rose-300 active:bg-rose-400 transition duration-200 rounded-lg text-black shadow-[0px_2px_0px_0px_#FFFFFF40_inset] touch-manipulation min-h-[44px] flex items-center justify-center`}
            >
              Get in touch
            </Link>
            <Link href="#services" className={`${isMobile ? 'px-6 py-3' : 'px-4 py-2'} text-white touch-manipulation min-h-[44px] flex items-center justify-center`}>
              Explore services
            </Link>
          </div>
        </Vortex>
      </section>

      {/* Services Section */}
      <section id="services" className={`w-full ${isMobile ? 'py-12' : 'py-24'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 bg-black text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-2 ${isMobile ? 'gap-8' : 'gap-16'} items-center`}>
            <div>
              <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} md:text-5xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'}`}>Our Marketing Services</h2>
              <p className={`${isMobile ? 'text-base' : 'text-lg'} text-neutral-300 ${isMobile ? 'mb-6' : 'mb-8'}`}>
                We offer comprehensive marketing services designed to help your business grow and thrive in today's
                competitive landscape. Our team of experts will work with you to develop a customized strategy that
                meets your unique needs and goals.
              </p>
              <ul className={isMobile ? 'space-y-3' : 'space-y-4'}>
                {marketingServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className={`${isMobile ? 'h-5 w-5 text-xs' : 'h-6 w-6 text-sm'} rounded-full bg-rose-200 text-black flex items-center justify-center font-bold mt-0.5 flex-shrink-0`}>
                      {index + 1}
                    </span>
                    <div>
                      <h3 className={`font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>{service.title}</h3>
                      <p className={`text-neutral-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>{service.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`relative ${isMobile ? 'h-[300px]' : 'h-[500px]'} w-full ${isMobile ? 'mt-6' : ''}`}>
              {!isMobile && <Lens />}
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className={`w-full ${isMobile ? 'py-12' : 'py-24'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 bg-neutral-950 text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} md:text-5xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'}`}>Our Focus Areas</h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} text-neutral-300 max-w-2xl mx-auto`}>
              We specialize in these key marketing areas to help your business reach its full potential.
            </p>
          </div>

          <FocusCards cards={focusAreas} />
        </div>
      </section>

      {/* CTA Section */}
      <section className={`w-full ${isMobile ? 'py-12' : 'py-24'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 bg-black text-white`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} md:text-5xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'}`}>Ready to elevate your marketing?</h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-neutral-300 ${isMobile ? 'mb-6' : 'mb-8'}`}>
            Let's work together to create a marketing strategy that drives results for your business.
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

const marketingServices = [
  {
    title: "Marketing & Digital Strategy",
    description: "Comprehensive marketing strategies tailored to your business goals and target audience.",
  },
  {
    title: "Brand & Campaign Strategy",
    description: "Strategic brand positioning and campaign development to build brand awareness and loyalty.",
  },
  {
    title: "Content & Data Strategy",
    description: "Data-driven content strategies that engage your audience and drive conversions.",
  },
  {
    title: "Customer Experience Strategy",
    description: "Creating seamless customer experiences across all touchpoints to build lasting relationships.",
  },
  {
    title: "Social Media & SEO/SEM Strategy",
    description: "Optimizing your online presence to increase visibility and drive qualified traffic.",
  },
  {
    title: "Email & Partnership Strategy",
    description: "Leveraging email marketing and strategic partnerships to nurture leads and expand your reach.",
  },
]

const focusAreas = [
  {
    title: "Digital Marketing",
    description: "Comprehensive digital marketing strategies to reach your target audience online.",
    icon: "🌐",
    src: "https://videos.pexels.com/video-files/4630097/4630097-uhd_2560_1440_25fps.mp4"
  },
  {
    title: "Content Marketing",
    description: "Engaging content that resonates with your audience and drives conversions.",
    icon: "📝",
    src: "https://videos.pexels.com/video-files/5483085/5483085-uhd_2732_1440_25fps.mp4"
  },
  {
    title: "Social Media",
    description: "Strategic social media management to build community and increase engagement.",
    icon: "📱",
    src: "https://videos.pexels.com/video-files/9810701/9810701-uhd_2732_1440_25fps.mp4"
  },
  {
    title: "SEO & SEM",
    description: "Search engine optimization and marketing to improve visibility and drive traffic.",
    icon: "🔍",
    src: "https://videos.pexels.com/video-files/5310858/5310858-uhd_2560_1440_25fps.mp4"
  },
  {
    title: "Email Marketing",
    description: "Targeted email campaigns to nurture leads and maintain customer relationships.",
    icon: "📧",
    src: "https://videos.pexels.com/video-files/4994039/4994039-uhd_2560_1440_25fps.mp4"
  },
  {
    title: "Analytics & Reporting",
    description: "Data-driven insights to measure performance and optimize marketing efforts.",
    icon: "📊",
    src: "https://videos.pexels.com/video-files/7793361/7793361-uhd_2732_1440_25fps.mp4"
  },
]


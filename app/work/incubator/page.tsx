"use client";

import { LampContainer } from "@/components/ui/lamp-effect"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { Timeline } from "@/components/ui/timeline"
import { Compare } from "@/components/ui/compare"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { AnimatedSection } from "@/components/ui/animated-section"
import { AnimatedImage, OptimizedImage } from "@/components/ui/animated-image"
import { useIsMobile } from "@/hooks/use-mobile"

const timelineData = [
  {
    title: "2024",
    content: (
      <div>
        <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Launched our incubator program with a focus on AI and Web3 startups
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            alt="Mentorship program"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            alt="Workshop session"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "Early 2023",
    content: (
      <div>
        <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Expanded our mentorship network and launched new programs
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            alt="Office space"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            alt="Networking event"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div>
        <p className="text-neutral-200 text-xs md:text-sm font-normal mb-4">
          Key milestones achieved:
        </p>
        <div className="mb-8">
          <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-sm">
            ✅ Launched first cohort of startups
          </div>
          <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-sm">
            ✅ Secured partnerships with major investors
          </div>
          <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-sm">
            ✅ Expanded to new locations
          </div>
          <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-sm">
            ✅ Launched mentorship program
          </div>
          <div className="flex gap-2 items-center text-neutral-300 text-xs md:text-sm">
            ✅ Hosted first demo day
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            alt="Demo day"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
            alt="First cohort"
            width={500}
            height={500}
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
];

const imageVariants = {
  enter: {
    opacity: 0,
    filter: "blur(10px)",
  },
  center: {
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    filter: "blur(10px)",
  }
}

export default function IncubatorPage() {
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, isMobile ? 400 : 800], [0, isMobile ? -30 : -100]);
  const gradientOpacity = useTransform(scrollY, [0, isMobile ? 400 : 800], [1, isMobile ? 0.7 : 0.5]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      {/* Hero Section */}
      <section className={`w-full ${isMobile ? 'min-h-[60vh]' : 'min-h-screen'} flex flex-col items-center justify-center relative`}>
        {!isMobile ? (
          <LampContainer>
            <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6">Startup Incubator</h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8">
                Comprehensive support to help your startup grow and succeed.
              </p>
              <Link
                href="#apply"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-rose-200 transition-all duration-300"
              >
                Apply now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </LampContainer>
        ) : (
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto bg-gradient-to-b from-black via-amber-900/20 to-black min-h-[60vh] flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-7xl font-bold tracking-tighter mb-4 text-white">Startup Incubator</h1>
            <p className="text-base md:text-2xl text-white/80 mb-6">
              Comprehensive support to help your startup grow and succeed.
            </p>
            <Link
              href="#apply"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-full hover:bg-rose-200 active:bg-rose-300 transition-all duration-300 touch-manipulation min-h-[44px]"
            >
              Apply now
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>

      {/* Timeline Section */}
      <section className={`w-full ${isMobile ? 'py-12' : 'py-24'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 bg-black text-white`}>
        <div className="max-w-[90rem] mx-auto">
          <div className={isMobile ? 'mb-8' : 'mb-16'}>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-4xl'} md:text-7xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'}`}>Our Journey</h2>
            <p className={`${isMobile ? 'text-base' : 'text-xl'} md:text-2xl text-white/80 max-w-3xl`}>
              Follow our timeline to see how we've grown and evolved over the years.
            </p>
          </div>
          <Timeline data={timelineData} />
        </div>
      </section>

      {/* Comparison Section */}
      <section className={`w-full ${isMobile ? 'py-12' : 'py-24'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 bg-neutral-950 text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} md:text-5xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'}`}>Why Choose Our Incubator?</h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} text-neutral-300 max-w-2xl mx-auto`}>
              See how our incubator program compares to going it alone.
            </p>
          </div>

          <Compare
            before={
              <div className={`h-full w-full bg-neutral-900 ${isMobile ? 'p-4' : 'p-8'} rounded-lg`}>
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold ${isMobile ? 'mb-3' : 'mb-4'}`}>Without Our Incubator</h3>
                <ul className={isMobile ? 'space-y-3' : 'space-y-4'}>
                  <li className="flex items-start gap-3">
                    <span className={`text-red-500 ${isMobile ? 'text-lg' : 'text-xl'} flex-shrink-0`}>✗</span>
                    <p className={isMobile ? 'text-sm' : ''}>Limited access to funding opportunities</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`text-red-500 ${isMobile ? 'text-lg' : 'text-xl'} flex-shrink-0`}>✗</span>
                    <p className={isMobile ? 'text-sm' : ''}>No dedicated mentorship or guidance</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`text-red-500 ${isMobile ? 'text-lg' : 'text-xl'} flex-shrink-0`}>✗</span>
                    <p className={isMobile ? 'text-sm' : ''}>Isolated from potential partners and collaborators</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`text-red-500 ${isMobile ? 'text-lg' : 'text-xl'} flex-shrink-0`}>✗</span>
                    <p className={isMobile ? 'text-sm' : ''}>Higher costs for office space and resources</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`text-red-500 ${isMobile ? 'text-lg' : 'text-xl'} flex-shrink-0`}>✗</span>
                    <p className={isMobile ? 'text-sm' : ''}>Limited networking opportunities</p>
                  </li>
                </ul>
              </div>
            }
            after={
              <div className={`h-full w-full bg-gradient-to-br from-rose-900/50 to-neutral-900 ${isMobile ? 'p-4' : 'p-8'} rounded-lg`}>
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold ${isMobile ? 'mb-3' : 'mb-4'}`}>With Our Incubator</h3>
                <ul className={isMobile ? 'space-y-3' : 'space-y-4'}>
                  <li className="flex items-start gap-3">
                    <span className={`text-green-500 ${isMobile ? 'text-lg' : 'text-xl'} flex-shrink-0`}>✓</span>
                    <p className={isMobile ? 'text-sm' : ''}>Direct access to investors and funding opportunities</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`text-green-500 ${isMobile ? 'text-lg' : 'text-xl'} flex-shrink-0`}>✓</span>
                    <p className={isMobile ? 'text-sm' : ''}>Personalized mentorship from industry experts</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`text-green-500 ${isMobile ? 'text-lg' : 'text-xl'} flex-shrink-0`}>✓</span>
                    <p className={isMobile ? 'text-sm' : ''}>Collaborative environment with like-minded founders</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`text-green-500 ${isMobile ? 'text-lg' : 'text-xl'} flex-shrink-0`}>✓</span>
                    <p className={isMobile ? 'text-sm' : ''}>Affordable co-working space and shared resources</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className={`text-green-500 ${isMobile ? 'text-lg' : 'text-xl'} flex-shrink-0`}>✓</span>
                    <p className={isMobile ? 'text-sm' : ''}>Regular networking events and workshops</p>
                  </li>
                </ul>
              </div>
            }
          />
        </div>
      </section>

      {/* Team Section */}
      <section className={`w-full ${isMobile ? 'py-12' : 'py-24'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 bg-black text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} md:text-5xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'}`}>Meet Our Mentors</h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} text-neutral-300 max-w-2xl mx-auto`}>
              Our team of experienced mentors is dedicated to helping your startup succeed.
            </p>
          </div>

          <div className={`flex flex-wrap justify-center ${isMobile ? 'gap-4' : 'gap-8'}`}>
            {mentors.map((person, idx) => (
              <AnimatedTooltip key={idx} item={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section id="apply" className={`w-full ${isMobile ? 'py-12' : 'py-24'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 bg-neutral-950 text-white`}>
        <div className="max-w-3xl mx-auto">
          <div className={`text-center ${isMobile ? 'mb-8' : 'mb-12'}`}>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} md:text-5xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'}`}>Apply to Our Incubator</h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} text-neutral-300`}>
              Ready to take your startup to the next level? Apply to our incubator program today.
            </p>
          </div>

          <PlaceholdersAndVanishInput />
        </div>
      </section>

      {/* Success Stories */}
      <section className={`w-full ${isMobile ? 'py-12' : 'py-24'} ${isMobile ? 'px-4' : 'px-4'} md:px-6 bg-black text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}>
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} md:text-5xl font-bold tracking-tighter ${isMobile ? 'mb-4' : 'mb-6'}`}>Success Stories</h2>
            <p className={`${isMobile ? 'text-base' : 'text-lg'} text-neutral-300 max-w-2xl mx-auto`}>
              See how we've helped startups like yours achieve their goals.
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 ${isMobile ? 'gap-4' : 'gap-8'}`}>
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-neutral-900 rounded-lg overflow-hidden border border-white/10 hover:border-rose-200/50 transition-colors touch-manipulation"
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.company}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={isMobile ? 'p-4' : 'p-6'}>
                  <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold ${isMobile ? 'mb-1.5' : 'mb-2'}`}>{story.company}</h3>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-neutral-300 ${isMobile ? 'mb-3' : 'mb-4'}`}>{story.description}</p>
                  <div className="flex items-center gap-2">
                    <span className={`${isMobile ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-1'} bg-rose-900/30 rounded-full`}>{story.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

const mentors = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "Startup Advisor",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Michael Chen",
    designation: "Tech Investor",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Jessica Williams",
    designation: "Marketing Expert",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "David Rodriguez",
    designation: "Product Strategist",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Emily Patel",
    designation: "Financial Advisor",
    image: "/placeholder.svg?height=300&width=300",
  },
]

const successStories = [
  {
    company: "TechNova",
    description:
      "AI-powered customer service platform that raised $5M in Series A funding after graduating from our incubator.",
    result: "$5M Series A",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    company: "GreenGrow",
    description:
      "Sustainable agriculture startup that expanded to 3 countries within 18 months of joining our program.",
    result: "International Expansion",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    company: "HealthPulse",
    description:
      "Health tech startup that secured partnerships with 5 major hospital networks through our connections.",
    result: "Major Partnerships",
    image: "/placeholder.svg?height=400&width=600",
  },
]


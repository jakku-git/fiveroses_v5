"use client";

import { LampContainer } from "@/components/ui/lamp-effect"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { Timeline } from "@/components/ui/timeline"
import { Compare } from "@/components/ui/compare"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

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
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center relative">
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
      </section>

      {/* Timeline Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-[90rem] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6">Our Journey</h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl">
              Follow our timeline to see how we've grown and evolved over the years.
            </p>
          </div>
          <Timeline data={timelineData} />
        </div>
      </section>

      {/* Comparison Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Why Choose Our Incubator?</h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              See how our incubator program compares to going it alone.
            </p>
          </div>

          <Compare
            before={
              <div className="h-full w-full bg-neutral-900 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Without Our Incubator</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">✗</span>
                    <p>Limited access to funding opportunities</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">✗</span>
                    <p>No dedicated mentorship or guidance</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">✗</span>
                    <p>Isolated from potential partners and collaborators</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">✗</span>
                    <p>Higher costs for office space and resources</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">✗</span>
                    <p>Limited networking opportunities</p>
                  </li>
                </ul>
              </div>
            }
            after={
              <div className="h-full w-full bg-gradient-to-br from-rose-900/50 to-neutral-900 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">With Our Incubator</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <p>Direct access to investors and funding opportunities</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <p>Personalized mentorship from industry experts</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <p>Collaborative environment with like-minded founders</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <p>Affordable co-working space and shared resources</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <p>Regular networking events and workshops</p>
                  </li>
                </ul>
              </div>
            }
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Meet Our Mentors</h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Our team of experienced mentors is dedicated to helping your startup succeed.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {mentors.map((person, idx) => (
              <AnimatedTooltip key={idx} item={person} />
            ))}
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section id="apply" className="w-full py-24 px-4 md:px-6 bg-neutral-950 text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Apply to Our Incubator</h2>
            <p className="text-lg text-neutral-300">
              Ready to take your startup to the next level? Apply to our incubator program today.
            </p>
          </div>

          <PlaceholdersAndVanishInput />
        </div>
      </section>

      {/* Success Stories */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Success Stories</h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              See how we've helped startups like yours achieve their goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-neutral-900 rounded-lg overflow-hidden border border-white/10 hover:border-rose-200/50 transition-colors"
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.company}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{story.company}</h3>
                  <p className="text-sm text-neutral-300 mb-4">{story.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-rose-900/30 rounded-full">{story.result}</span>
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


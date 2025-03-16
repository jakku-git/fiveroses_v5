import { LampContainer } from "@/components/ui/lamp-effect"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { StickyScrollReveal } from "@/components/ui/sticky-scroll-reveal"
import { Compare } from "@/components/ui/compare"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

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

      {/* Services Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Our Incubator Services</h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              We offer a comprehensive suite of services to help startups at every stage of their journey.
            </p>
          </div>

          <StickyScrollReveal items={incubatorServices} />
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

const incubatorServices = [
  {
    title: "Mentorship & Business Coaching",
    description: "One-on-one mentorship and coaching from experienced entrepreneurs and industry experts.",
    content:
      "Our mentors provide personalized guidance to help you navigate the challenges of building a startup. From refining your business model to scaling your operations, our mentors are there every step of the way.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Office Space & Co-working",
    description: "Modern co-working space with all the amenities you need to run your business.",
    content:
      "Our state-of-the-art co-working space provides a professional environment for your team to work and collaborate. With high-speed internet, meeting rooms, and common areas, you have everything you need to succeed.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Networking & Workshops",
    description:
      "Regular networking events and workshops to help you connect with other entrepreneurs and learn new skills.",
    content:
      "Our networking events and workshops provide opportunities to connect with other founders, investors, and industry experts. Learn new skills, share experiences, and build relationships that can help your business grow.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Funding Access & Investor Pitching",
    description: "Direct access to investors and funding opportunities, plus help preparing your pitch.",
    content:
      "We connect you with our network of investors and help you prepare a compelling pitch. Our team will work with you to refine your pitch deck, financial projections, and presentation skills to maximize your chances of securing funding.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Legal, Accounting & Marketing Support",
    description: "Professional services to help you with legal, accounting, and marketing challenges.",
    content:
      "Our network of legal, accounting, and marketing professionals provides the support you need to navigate complex business challenges. From incorporation and contracts to financial planning and marketing strategy, we've got you covered.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Technical Support & Accelerator Programs",
    description: "Technical expertise and accelerator programs to help you build and scale your product.",
    content:
      "Our technical team provides guidance on product development, technology stack, and scaling your infrastructure. Our accelerator programs offer intensive support to help you rapidly grow your business and achieve your goals.",
    image: "/placeholder.svg?height=600&width=800",
  },
]

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


import { AuroraBackground } from "@/components/ui/aurora-background"
import { ParallaxScroll } from "@/components/ui/parallax-scroll"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CreativeProductionPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center relative">
        <AuroraBackground>
          <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto">
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
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Our Creative Services</h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              We offer a wide range of creative services to help your brand stand out and connect with your audience.
            </p>
          </div>

          <ParallaxScroll items={creativeServices} />
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full py-24 px-4 md:px-6 relative overflow-hidden">
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
                <img
                  src="/placeholder.svg?height=800&width=600"
                  alt="Creative Process"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </BackgroundGradientAnimation>
      </section>

      {/* Portfolio Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Our Creative Portfolio</h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Explore our latest creative projects and see how we've helped our clients achieve their goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/70 mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-white/10 rounded-full">
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
      <section className="w-full py-24 px-4 md:px-6 bg-neutral-950 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
            Ready to bring your creative vision to life?
          </h2>
          <p className="text-lg text-neutral-300 mb-8">
            Let's work together to create stunning assets that capture attention and communicate your message.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full hover:bg-rose-200 transition-all duration-300 font-medium"
          >
            Get in touch
            <ArrowRight className="w-5 h-5" />
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
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Video Production & Animation",
    description:
      "High-quality video production and animation services for commercials, explainer videos, and social media content.",
    link: "#",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Content Creation & Copywriting",
    description:
      "Engaging content creation and copywriting services for websites, social media, and marketing materials.",
    link: "#",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Photography & Illustration",
    description: "Professional photography and illustration services to enhance your brand's visual identity.",
    link: "#",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Interactive & Multimedia Design",
    description: "Interactive and multimedia design services for websites, apps, and digital experiences.",
    link: "#",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Audio Production",
    description: "Professional audio production services for podcasts, commercials, and other audio content.",
    link: "#",
    image: "/placeholder.svg?height=600&width=800",
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
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Branding", "Graphic Design", "Packaging"],
  },
  {
    title: "Horizon Video Series",
    description: "Award-winning educational video series for environmental awareness",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Video Production", "Animation", "Storytelling"],
  },
  {
    title: "Pulse Campaign",
    description: "Integrated marketing campaign for a health tech startup",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Campaign", "Content", "Social Media"],
  },
  {
    title: "Nova Photography",
    description: "Product photography for a luxury watch brand",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Photography", "Product", "Luxury"],
  },
  {
    title: "Echo Podcast Branding",
    description: "Brand identity and audio production for a business podcast",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Audio", "Branding", "Podcast"],
  },
  {
    title: "Spark Social Content",
    description: "Ongoing social media content creation for a lifestyle brand",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Social Media", "Content", "Photography"],
  },
]


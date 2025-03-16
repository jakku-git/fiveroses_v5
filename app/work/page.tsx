import { BackgroundBoxes } from "@/components/ui/background-boxes"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function WorkPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      {/* Hero Section */}
      <section className="w-full min-h-[60vh] flex flex-col items-center justify-center relative bg-black text-white">
        <BackgroundBoxes
          className="absolute inset-0 z-0"
          boxes={[
            {
              value: 1,
              title: "Marketing",
              icon: "📊",
            },
            {
              value: 2,
              title: "Web Solutions",
              icon: "💻",
            },
            {
              value: 3,
              title: "Creative Production",
              icon: "🎨",
            },
            {
              value: 4,
              title: "Startup Incubator",
              icon: "🚀",
            },
          ]}
        />
        <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Our Work</h1>
          <p className="text-xl md:text-2xl text-neutral-300 mb-8">
            Comprehensive marketing services, innovative web development, and a startup incubator to help your business
            bloom.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-12">Our Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group relative overflow-hidden rounded-lg border border-white/10 p-8 hover:border-rose-200/50 transition-colors"
              >
                <div className="flex flex-col h-full">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-rose-200 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-300 mb-6">{service.description}</p>
                  <ul className="space-y-2 mb-8">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-200"></span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center text-sm font-medium">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="w-full py-24 px-4 md:px-6 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-12">Featured Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-white/10 hover:border-rose-200/50 transition-colors"
              >
                <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-rose-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-neutral-900 rounded-full">
                        {tag}
                      </span>
                    ))}
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

const services = [
  {
    title: "Marketing",
    description: "Comprehensive marketing strategies to elevate your brand and drive growth.",
    href: "/work/marketing",
    items: [
      "Marketing & Digital Strategy",
      "Brand & Campaign Strategy",
      "Content & Data Strategy",
      "Customer Experience Strategy",
      "Social Media & SEO/SEM Strategy",
      "Email & Partnership Strategy",
    ],
  },
  {
    title: "Web Solutions",
    description: "Innovative web development solutions tailored to your business needs.",
    href: "/work/web-solutions",
    items: [
      "Website Design & UI/UX",
      "Web Development & Custom Applications",
      "E-Commerce & CMS Integration",
      "Mobile Responsive & SEO-Friendly Design",
      "Website Maintenance, Hosting & Security",
      "Conversion Optimization & Analytics",
    ],
  },
  {
    title: "Creative Production",
    description: "Stunning creative assets that capture attention and communicate your message.",
    href: "/work/creative-production",
    items: [
      "Graphic & Branding Design",
      "Video Production & Animation",
      "Content Creation & Copywriting",
      "Photography, Illustration & Iconography",
      "Interactive & Multimedia Design",
      "Audio Production",
    ],
  },
  {
    title: "Startup Incubator",
    description: "Comprehensive support to help your startup grow and succeed.",
    href: "/work/incubator",
    items: [
      "Mentorship & Business Coaching",
      "Office Space & Co-working",
      "Networking & Workshops",
      "Funding Access & Investor Pitching Preparation",
      "Legal, Accounting & Marketing Support",
      "Technical Support & Accelerator Programs",
    ],
  },
]

const projects = [
  {
    title: "Bloom Tech Rebrand",
    description: "Complete brand overhaul for a tech education platform",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Branding", "Strategy", "Design"],
  },
  {
    title: "Evergreen E-commerce",
    description: "Custom e-commerce platform for sustainable products",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Web Development", "E-commerce", "UI/UX"],
  },
  {
    title: "Pulse Marketing Campaign",
    description: "Multi-channel marketing campaign for health tech startup",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Marketing", "Content", "Social Media"],
  },
  {
    title: "Nova Startup Accelerator",
    description: "Mentorship program for early-stage tech startups",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Incubator", "Mentorship", "Funding"],
  },
  {
    title: "Horizon Video Series",
    description: "Award-winning educational video series for environmental awareness",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Video Production", "Content", "Animation"],
  },
  {
    title: "Spark Social Campaign",
    description: "Viral social media campaign for nonprofit organization",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Social Media", "Strategy", "Content"],
  },
]


import { HeroHighlight } from "@/components/ui/hero-highlight"
import { Lens } from "@/components/ui/lens"
import { FocusCards } from "@/components/ui/focus-cards"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function MarketingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      {/* Hero Section */}
      <section className="w-full min-h-[70vh] flex flex-col items-center justify-center relative bg-black text-white">
        <HeroHighlight
          title="Marketing & Strategy"
          description="Comprehensive marketing strategies to elevate your brand and drive growth."
          highlightColor="rgb(253, 224, 224)"
        />
      </section>

      {/* Services Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Our Marketing Services</h2>
              <p className="text-lg text-neutral-300 mb-8">
                We offer comprehensive marketing services designed to help your business grow and thrive in today's
                competitive landscape. Our team of experts will work with you to develop a customized strategy that
                meets your unique needs and goals.
              </p>
              <ul className="space-y-4">
                {marketingServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="h-6 w-6 rounded-full bg-rose-200 text-black flex items-center justify-center text-sm font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-lg">{service.title}</h3>
                      <p className="text-neutral-300 text-sm">{service.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[500px] w-full">
              <Lens />
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="w-full py-24 px-4 md:px-6 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Our Focus Areas</h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              We specialize in these key marketing areas to help your business reach its full potential.
            </p>
          </div>

          <FocusCards items={focusAreas} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Ready to elevate your marketing?</h2>
          <p className="text-lg text-neutral-300 mb-8">
            Let's work together to create a marketing strategy that drives results for your business.
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
  },
  {
    title: "Content Marketing",
    description: "Engaging content that resonates with your audience and drives conversions.",
    icon: "📝",
  },
  {
    title: "Social Media",
    description: "Strategic social media management to build community and increase engagement.",
    icon: "📱",
  },
  {
    title: "SEO & SEM",
    description: "Search engine optimization and marketing to improve visibility and drive traffic.",
    icon: "🔍",
  },
  {
    title: "Email Marketing",
    description: "Targeted email campaigns to nurture leads and maintain customer relationships.",
    icon: "📧",
  },
  {
    title: "Analytics & Reporting",
    description: "Data-driven insights to measure performance and optimize marketing efforts.",
    icon: "📊",
  },
]


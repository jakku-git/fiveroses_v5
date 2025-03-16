"use client"

import { StickyScrollReveal } from "@/components/ui/sticky-scroll-reveal"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SustainableBrandPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      {/* Hero Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Link>
          </div>

          <div className="mb-6">
            <span className="inline-block bg-neutral-800 text-white px-3 py-1 rounded-full text-xs font-medium">
              Branding
            </span>
            <span className="ml-4 text-sm text-neutral-400">May 15, 2023</span>
          </div>

          <motion.h1
            className="text-4xl md:text-6xl font-light tracking-tighter mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Building a Sustainable Brand in 2023
          </motion.h1>

          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Jessica Williams"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Jessica Williams</p>
                <p className="text-sm text-neutral-400">Brand Strategist</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="aspect-[21/9] w-full overflow-hidden rounded-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="Sustainable Branding"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.p
            className="text-xl leading-relaxed text-neutral-300 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Sustainability is no longer just a buzzword—it's a business imperative. Today's consumers are increasingly
            environmentally conscious, with 78% of shoppers more likely to purchase from brands that demonstrate
            sustainable practices. In this article, we explore how to build a truly sustainable brand that resonates
            with environmentally conscious consumers while driving business growth.
          </motion.p>
        </div>
      </section>

      {/* Article Content with Sticky Scroll Reveal */}
      <section className="w-full py-24 px-4 md:px-6 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto">
          <StickyScrollReveal items={articleSections} />
        </div>
      </section>

      {/* Conclusion Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-8">Conclusion</h2>
          <p className="text-lg text-neutral-300 mb-8">
            Building a sustainable brand in 2023 requires more than surface-level commitments or greenwashing. It
            demands authentic action, transparent communication, and a willingness to continuously improve. The brands
            that will thrive in this new era are those that embed sustainability into their core business model and use
            it as a driver of innovation and competitive advantage.
          </p>
          <p className="text-lg text-neutral-300 mb-12">
            While the journey toward true sustainability is challenging, it offers tremendous opportunities for brands
            to connect more deeply with consumers, attract and retain top talent, reduce costs, and create lasting
            positive impact. By following the principles outlined in this article, brands can build sustainability into
            their DNA and position themselves for long-term success in an increasingly conscious marketplace.
          </p>

          <div className="border-t border-neutral-800 pt-12">
            <h3 className="text-xl font-light mb-6">Share this article</h3>
            <div className="flex gap-4">
              <button className="p-3 bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </button>
              <button className="p-3 bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </button>
              <button className="p-3 bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </button>
              <button className="p-3 bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="w-full py-24 px-4 md:px-6 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-12">Related Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((article, index) => (
              <Link key={index} href={article.slug} className="group">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-lg mb-4">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-light mb-2 group-hover:text-accent transition-colors">{article.title}</h3>
                <p className="text-sm text-neutral-400">{article.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

const articleSections = [
  {
    title: "Authentic Purpose and Values",
    description: "Building sustainability into your brand's foundation",
    content:
      "Sustainable brands start with a clear purpose that goes beyond profit. This purpose should articulate how the brand aims to create positive environmental and social impact while delivering value to customers. The most successful sustainable brands align their business model with their environmental values, ensuring that sustainability isn't just a marketing initiative but is embedded in the company's DNA. This authentic approach resonates with consumers who can quickly distinguish between genuine commitment and greenwashing. Start by defining your brand's sustainability purpose and values, then ensure they inform every aspect of your business from product development to marketing.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Sustainable Product Design",
    description: "Creating products with environmental impact in mind",
    content:
      "Truly sustainable brands consider environmental impact throughout the entire product lifecycle. This means designing products that minimize resource use, eliminate harmful materials, reduce waste, and can be easily repaired, recycled, or composted at end-of-life. Circular design principles—where products and materials are kept in use rather than discarded—are becoming increasingly important. Leading brands are innovating with recycled and renewable materials, designing for durability and repairability, and creating closed-loop systems where products can be returned and remanufactured. The goal is to create products that meet customer needs while minimizing environmental footprint.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Responsible Supply Chain",
    description: "Ensuring ethical and sustainable sourcing practices",
    content:
      "A brand is only as sustainable as its supply chain. This means looking beyond your own operations to understand and improve the environmental and social impacts of your suppliers and partners. Start by mapping your supply chain to identify hotspots where environmental or social impacts are greatest. Then work collaboratively with suppliers to set standards, improve practices, and increase transparency. Leading brands are using technologies like blockchain to verify sustainable sourcing claims and provide consumers with visibility into product origins. Remember that building a sustainable supply chain is a journey—focus on continuous improvement rather than perfection.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Transparent Communication",
    description: "Building trust through honest sustainability messaging",
    content:
      "Transparency is essential for building trust with today's skeptical consumers. This means being open about both your sustainability achievements and challenges. Avoid vague claims like 'eco-friendly' or 'green' without specific evidence to back them up. Instead, share concrete data about your environmental impact, set measurable goals, and report regularly on your progress. When you encounter setbacks or discover negative impacts in your business, acknowledge them openly and explain how you're addressing them. This honest approach builds credibility and demonstrates your genuine commitment to improvement, even when the journey is challenging.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Community Engagement",
    description: "Involving customers in your sustainability journey",
    content:
      "Sustainable brands recognize that they can achieve greater impact by engaging their community in their environmental mission. This means creating opportunities for customers to participate in sustainability initiatives, whether through product take-back programs, repair services, or community clean-up events. Some brands are using digital platforms to create communities where customers can share tips for extending product life or reducing environmental impact. By involving customers in your sustainability journey, you not only amplify your positive impact but also build stronger emotional connections with your audience and turn customers into brand advocates.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Measuring Impact and Continuous Improvement",
    description: "Using data to drive sustainability progress",
    content:
      "What gets measured gets managed. Sustainable brands establish clear metrics to track their environmental impact and set ambitious targets for improvement. This might include measuring carbon emissions, water usage, waste generation, or chemical inputs across your operations and supply chain. Leading brands are using science-based targets to ensure their environmental goals align with what's needed to address global challenges like climate change. Regular measurement allows you to identify areas for improvement, track progress over time, and demonstrate accountability to stakeholders. Remember that sustainability is not a destination but a continuous journey of improvement.",
    image: "/placeholder.svg?height=600&width=800",
  },
]

const relatedArticles = [
  {
    title: "The Art of Brand Storytelling",
    date: "April 8, 2023",
    image: "/placeholder.svg?height=400&width=600",
    slug: "/news/brand-storytelling",
  },
  {
    title: "Building Customer Loyalty Through Values",
    date: "March 12, 2023",
    image: "/placeholder.svg?height=400&width=600",
    slug: "/news/customer-loyalty-values",
  },
  {
    title: "How Gen Z is Reshaping Brand Expectations",
    date: "February 28, 2023",
    image: "/placeholder.svg?height=400&width=600",
    slug: "/news/gen-z-brand-expectations",
  },
]


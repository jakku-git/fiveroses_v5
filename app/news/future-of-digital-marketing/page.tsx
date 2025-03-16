"use client"

import { StickyScrollReveal } from "@/components/ui/sticky-scroll-reveal"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function FutureOfDigitalMarketingPage() {
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
            <span className="inline-block bg-accent text-black px-3 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
            <span className="ml-4 text-sm text-neutral-400">June 15, 2023</span>
          </div>

          <motion.h1
            className="text-4xl md:text-6xl font-light tracking-tighter mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            The Future of Digital Marketing in 2025
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
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-neutral-400">Marketing Director</p>
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
              alt="The Future of Digital Marketing"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.p
            className="text-xl leading-relaxed text-neutral-300 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            As we approach 2025, the digital marketing landscape continues to evolve at an unprecedented pace. Emerging
            technologies, changing consumer behaviors, and new platforms are reshaping how brands connect with their
            audiences. In this article, we explore the key trends and technologies that will define the future of
            digital marketing in the coming years.
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
            The future of digital marketing in 2025 will be defined by personalization, automation, immersive
            experiences, and ethical considerations. Brands that embrace these trends while maintaining a human touch
            will thrive in the evolving digital landscape. As marketers, our challenge is to leverage these new
            technologies and approaches while staying true to the core principles of authentic connection and value
            creation.
          </p>
          <p className="text-lg text-neutral-300 mb-12">
            By preparing now for these emerging trends, marketers can position themselves at the forefront of innovation
            and create more meaningful, effective campaigns that resonate with tomorrow's consumers.
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
    title: "AI-Powered Personalization",
    description: "How artificial intelligence will transform personalized marketing",
    content:
      "By 2025, AI will enable hyper-personalization at a scale previously unimaginable. Marketers will leverage advanced machine learning algorithms to analyze vast amounts of data and create truly individualized experiences. From dynamic website content that adapts in real-time to a visitor's behavior, to predictive email campaigns that anticipate customer needs before they arise, AI will make generic marketing obsolete. The most successful brands will be those that can balance personalization with privacy, using AI ethically to create value while respecting consumer boundaries.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Voice and Visual Search Dominance",
    description: "The shift from text-based to voice and image-based search",
    content:
      "As voice assistants and visual search technologies mature, optimizing for these modalities will become essential. By 2025, experts predict that over 50% of all searches will be either voice or image-based. This shift requires marketers to rethink SEO strategies, focusing on conversational keywords, question-based queries, and visual content optimization. Brands will need to ensure their digital assets are discoverable through voice commands and image recognition, creating new challenges and opportunities for visibility in a post-text search world.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Immersive Marketing Experiences",
    description: "How AR, VR, and mixed reality will reshape customer engagement",
    content:
      "Augmented reality (AR) and virtual reality (VR) will move from novelty to necessity in the marketing toolkit. By 2025, consumers will expect immersive experiences that blend digital and physical worlds. From virtual product try-ons and AR-enhanced packaging to fully immersive brand environments, these technologies will create deeper emotional connections with consumers. The metaverse will emerge as a significant marketing channel, with brands creating persistent virtual spaces where customers can interact with products and each other in entirely new ways.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Privacy-First Marketing",
    description: "Navigating a cookieless future with ethical data practices",
    content:
      "The deprecation of third-party cookies and stricter privacy regulations will completely transform data collection and targeting by 2025. Marketers will shift to first-party and zero-party data strategies, building direct relationships with consumers based on trust and transparency. Contextual advertising will see a renaissance, with advanced AI making it nearly as effective as behavioral targeting. Brands that develop ethical data practices and clearly communicate their value exchange with consumers will gain a significant competitive advantage in this privacy-first landscape.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Automated Content Creation",
    description: "The rise of AI-generated content and its impact on marketing",
    content:
      "AI-powered content generation will reach new levels of sophistication by 2025. From writing compelling copy to creating custom images and videos, automation will handle an increasing share of content production. This will free marketers to focus on strategy and creative direction rather than execution. However, the most successful brands will find the right balance between automation and human creativity, using AI to scale content while maintaining authentic voice and emotional resonance. The ability to effectively direct and edit AI-generated content will become a crucial skill for marketers.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Decentralized Marketing Platforms",
    description: "How blockchain and Web3 will disrupt traditional marketing channels",
    content:
      "Blockchain technology and Web3 concepts will begin to disrupt traditional marketing platforms by 2025. Decentralized social networks, content platforms, and marketplaces will emerge as alternatives to today's tech giants, changing how brands reach and engage audiences. Token-based loyalty programs will create new ways to reward customers and build communities. Smart contracts will enable more transparent influencer marketing and affiliate programs. Forward-thinking brands will experiment with these technologies early, positioning themselves for success as the internet continues its evolution toward greater decentralization.",
    image: "/placeholder.svg?height=600&width=800",
  },
]

const relatedArticles = [
  {
    title: "How AI is Transforming Content Creation",
    date: "May 28, 2023",
    image: "/placeholder.svg?height=400&width=600",
    slug: "/news/ai-transforming-content-creation",
  },
  {
    title: "Social Media Trends to Watch",
    date: "April 22, 2023",
    image: "/placeholder.svg?height=400&width=600",
    slug: "/news/social-media-trends",
  },
  {
    title: "Measuring Marketing ROI",
    date: "March 22, 2023",
    image: "/placeholder.svg?height=400&width=600",
    slug: "/news/measuring-marketing-roi",
  },
]


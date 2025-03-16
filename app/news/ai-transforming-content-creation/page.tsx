"use client"

import { StickyScrollReveal } from "@/components/ui/sticky-scroll-reveal"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AITransformingContentCreationPage() {
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
              Technology
            </span>
            <span className="ml-4 text-sm text-neutral-400">May 28, 2023</span>
          </div>

          <motion.h1
            className="text-4xl md:text-6xl font-light tracking-tighter mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            How AI is Transforming Content Creation
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
                  alt="Michael Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">Michael Chen</p>
                <p className="text-sm text-neutral-400">Technology Analyst</p>
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
              alt="AI Content Creation"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.p
            className="text-xl leading-relaxed text-neutral-300 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Artificial intelligence is revolutionizing the way brands create and distribute content. From generating
            written articles to designing graphics and editing videos, AI tools are becoming increasingly sophisticated,
            enabling marketers to produce more content faster than ever before. In this article, we explore how AI is
            transforming content creation and what it means for marketers, creators, and brands.
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
            AI is not replacing human creativity but rather augmenting it, enabling content creators to work more
            efficiently and focus on higher-level strategic thinking. As these technologies continue to evolve, the most
            successful marketers will be those who learn to effectively collaborate with AI tools, using them to enhance
            their creative capabilities while maintaining the human touch that resonates with audiences.
          </p>
          <p className="text-lg text-neutral-300 mb-12">
            The future of content creation lies in this human-AI partnership, where artificial intelligence handles
            repetitive tasks and data analysis, while humans provide creative direction, emotional intelligence, and
            ethical oversight. By embracing this collaborative approach, brands can create more engaging, personalized
            content at scale while maintaining authenticity and connection with their audiences.
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
    title: "Text Generation and Copywriting",
    description: "How AI is changing the way we write marketing copy",
    content:
      "AI-powered text generation tools have made significant strides in recent years. From crafting email subject lines to writing full blog posts, these tools can now produce content that's increasingly difficult to distinguish from human-written text. Marketers are using these technologies to generate first drafts, overcome writer's block, and scale content production. While AI excels at creating data-driven content like product descriptions and financial reports, human editors remain essential for adding brand voice, emotional nuance, and fact-checking. The most effective approach combines AI efficiency with human creativity and oversight.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Visual Content Creation",
    description: "AI tools for generating images, graphics, and designs",
    content:
      "The emergence of AI image generators has democratized visual content creation. Tools like DALL-E, Midjourney, and Stable Diffusion can create stunning visuals from text prompts, enabling brands to produce custom imagery without expensive photo shoots or graphic designers. These technologies are particularly valuable for creating conceptual illustrations, product visualizations, and branded graphics at scale. While AI-generated visuals may not completely replace professional photography and design, they're becoming an essential part of the content creator's toolkit, especially for rapid prototyping and generating visual variations.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Video Production and Editing",
    description: "How AI is streamlining video content creation",
    content:
      "Video has traditionally been the most resource-intensive content format, but AI is changing that equation. From script generation to automated editing and even synthetic presenters, artificial intelligence is making video production faster and more accessible. Tools can now automatically generate b-roll footage, create captions, optimize for different platforms, and even suggest edits based on audience engagement data. For marketers, this means the ability to produce more video content with smaller teams and budgets, enabling video strategies that would have been prohibitively expensive just a few years ago.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Personalization at Scale",
    description: "Creating customized content experiences with AI",
    content:
      "Perhaps the most powerful application of AI in content creation is enabling true personalization at scale. By analyzing user data and behavior patterns, AI can help brands create dynamically personalized content experiences for each individual. This goes beyond simple variable substitution to include tailored recommendations, adaptive messaging, and content that evolves based on the user's journey. The result is more relevant, engaging content experiences that drive higher conversion rates and customer satisfaction, all without requiring massive increases in content production resources.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Content Optimization and Testing",
    description: "Using AI to improve content performance",
    content:
      "AI isn't just creating content—it's also making it better. Advanced analytics and machine learning algorithms can now predict how content will perform before it's published, recommend improvements, and continuously optimize based on real-world results. These tools analyze factors like readability, emotional impact, SEO potential, and conversion likelihood, providing actionable insights to content creators. By implementing AI-driven testing and optimization, brands can systematically improve content effectiveness over time, leading to better ROI on content investments.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Ethical Considerations and Challenges",
    description: "Navigating the complexities of AI-generated content",
    content:
      "As AI content creation tools become more prevalent, they raise important ethical questions. Issues around copyright, attribution, bias, and authenticity require careful consideration. Who owns the rights to AI-generated content? How should brands disclose when content is created by AI? How can we ensure AI tools don't perpetuate harmful stereotypes or misinformation? Responsible marketers are developing policies and practices to address these concerns, recognizing that maintaining trust with audiences requires transparency and ethical use of these powerful technologies.",
    image: "/placeholder.svg?height=600&width=800",
  },
]

const relatedArticles = [
  {
    title: "The Future of Digital Marketing in 2025",
    date: "June 15, 2023",
    image: "/placeholder.svg?height=400&width=600",
    slug: "/news/future-of-digital-marketing",
  },
  {
    title: "The Art of Brand Storytelling",
    date: "April 8, 2023",
    image: "/placeholder.svg?height=400&width=600",
    slug: "/news/brand-storytelling",
  },
  {
    title: "Content Marketing Strategies That Drive Results",
    date: "February 15, 2023",
    image: "/placeholder.svg?height=400&width=600",
    slug: "/news/content-marketing-strategies",
  },
]


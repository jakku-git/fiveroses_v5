"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const articleSections = [
  {
    title: "The Evolution of AI in Content Creation",
    description: "How artificial intelligence is transforming the way we create and distribute content",
    content: `The landscape of content creation is undergoing a profound transformation, driven by advances in artificial intelligence. As we navigate this new era, the intersection of human creativity and machine intelligence is reshaping how we approach content creation, distribution, and engagement.

## The Creative Revolution

In the past decade, we've witnessed a remarkable evolution in how content is created and consumed. What began as simple automated text generation has blossomed into sophisticated AI systems capable of understanding context, tone, and audience preferences. The implications for content creators, marketers, and businesses are profound.

Take, for example, the case of a leading digital marketing agency that recently integrated AI into their content creation workflow. By leveraging AI-powered tools for initial research and content structuring, their team was able to focus more on creative storytelling and strategic direction. The result? A 40% increase in content production efficiency while maintaining, and often improving, content quality.

## The Human-AI Partnership

The most successful content strategies today don't rely solely on AI or human creativity—they leverage the strengths of both. AI excels at processing vast amounts of data, identifying patterns, and generating initial content frameworks. Humans, meanwhile, bring emotional intelligence, creative vision, and strategic thinking to the table.

Consider how modern content teams are working with AI:

Content ideation has become more data-driven, with AI analyzing trends, audience behavior, and market dynamics to suggest topics that resonate with target audiences. However, the final creative direction still comes from human strategists who understand brand voice and audience psychology.

Writing and editing processes have evolved significantly. AI tools can now generate initial drafts, suggest improvements, and even adapt content for different platforms. But human editors remain crucial for maintaining brand voice, ensuring emotional resonance, and making strategic decisions about content direction.

## The Impact on Content Strategy

The integration of AI into content creation is fundamentally changing how we approach content strategy. Traditional linear processes are giving way to more dynamic, iterative approaches that leverage both human creativity and machine efficiency.

One of the most significant shifts is in content personalization. AI systems can now analyze individual user behavior and preferences to deliver highly tailored content experiences. This isn't just about inserting a name into an email—it's about creating content that adapts to each user's interests, needs, and engagement patterns.

Distribution and optimization have also evolved dramatically. AI-powered systems can now determine the optimal timing, platform, and format for content delivery, maximizing engagement and impact. This level of precision was unimaginable just a few years ago.

## Navigating the Future

As we look ahead, the role of AI in content creation will only grow more sophisticated. The key to success lies in understanding how to effectively integrate AI tools while maintaining the human touch that makes content truly engaging.

Content creators must develop new skills and adapt their workflows to make the most of AI capabilities. This includes understanding AI's strengths and limitations, learning to work effectively with AI tools, and focusing on the uniquely human aspects of content creation that AI cannot replicate.

The future of content creation isn't about choosing between human creativity and AI—it's about creating a powerful partnership that leverages the best of both worlds.`,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2938&auto=format&fit=crop",
    imageAlt: "AI content creation visualization showing the creative process"
  },
  {
    title: "The Future of AI Content Creation",
    description: "Emerging trends and predictions for the next decade",
    content: `As we stand at the cusp of a new era in content creation, the future promises unprecedented opportunities and challenges. The rapid advancement of AI technology is not just changing how we create content—it's redefining what's possible in digital storytelling and audience engagement.

## The Next Wave of Innovation

The coming years will see AI technology evolve in ways that will fundamentally transform content creation. We're moving beyond simple text generation to systems that can understand and create across multiple media types, adapt to real-time audience feedback, and generate truly personalized content experiences.

Recent developments in multimodal AI systems are particularly exciting. These advanced models can now work seamlessly across text, images, and video, creating cohesive content experiences that were previously impossible to automate. For instance, a leading media company recently implemented a multimodal AI system that can generate complete content packages—including articles, supporting visuals, and social media assets—from a single creative brief.

## Industry Transformation

The impact of these advancements is being felt across industries, each adapting in unique ways to the AI revolution:

In marketing and advertising, we're seeing a shift toward hyper-personalization at scale. AI systems can now analyze individual user behavior and preferences to create content that resonates on a personal level, even when reaching millions of users. This isn't just about efficiency—it's about creating more meaningful connections with audiences.

The education sector is experiencing its own transformation. AI-powered content creation tools are enabling the development of personalized learning materials that adapt to each student's learning style and pace. This represents a fundamental shift in how educational content is created and delivered.

Entertainment and media companies are exploring new frontiers in content creation. From AI-assisted storytelling to dynamic content generation, these organizations are finding innovative ways to engage audiences while maintaining creative quality and brand integrity.

## Preparing for the Future

Success in this evolving landscape requires more than just technical knowledge—it demands a new approach to content creation and strategy. Content creators and organizations must:

Develop a deep understanding of AI capabilities and limitations. This includes staying current with technological developments while maintaining a critical eye toward implementation.

Focus on uniquely human creative skills. As AI handles more routine content tasks, human creators should concentrate on strategic direction, creative vision, and emotional storytelling.

Build ethical frameworks for AI use. This includes establishing guidelines for AI-generated content, ensuring transparency in content creation, and maintaining editorial standards.

Embrace continuous learning and adaptation. The field is evolving rapidly, and success depends on staying current with both technological and creative developments.

## The Human Element

Despite the rapid advancement of AI technology, the human element remains crucial in content creation. The most successful content strategies will be those that effectively balance AI capabilities with human creativity and judgment.

The future of content creation isn't about replacing human creators with AI—it's about empowering them with new tools and capabilities. By understanding how to effectively integrate AI into their workflows, content creators can focus on what they do best: telling compelling stories and building meaningful connections with audiences.

As we look to the future, the most successful content creators will be those who can effectively navigate this new landscape, leveraging AI capabilities while maintaining the human touch that makes content truly engaging and meaningful.`,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2938&auto=format&fit=crop",
    imageAlt: "Futuristic visualization of AI content creation technologies"
  }
];

const relatedArticles = [
  {
    title: "The Future of Digital Marketing in 2025",
    date: "June 15, 2023",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2938&auto=format&fit=crop",
    slug: "/news/future-of-digital-marketing",
    excerpt: "Explore the key trends and technologies that will define digital marketing in the coming years."
  },
  {
    title: "Social Media Trends to Watch",
    date: "April 22, 2023",
    image: "https://images.unsplash.com/photo-1675285410608-ddd6bb430b19?q=80&w=2938&auto=format&fit=crop",
    slug: "/news/social-media-trends",
    excerpt: "Stay ahead of the curve with these emerging social media trends that are shaping digital marketing."
  },
  {
    title: "The Future of Web Design",
    date: "March 15, 2023",
    image: "https://images.unsplash.com/photo-1675285410608-ddd6bb430b19?q=80&w=2938&auto=format&fit=crop",
    slug: "/news/web-design-future",
    excerpt: "Discover how AI and new technologies are transforming the web design landscape."
  }
];

export default function ArticlePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0, 0]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <motion.div
          ref={containerRef}
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 to-black/50 backdrop-blur-sm" />
          <Image
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2938&auto=format&fit=crop"
            alt="AI Content Creation"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div 
          className="relative z-10 container mx-auto px-4 md:px-8 h-full flex items-end pb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl space-y-6">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to News</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 bg-rose-500/20 text-rose-400 rounded-full text-sm font-medium tracking-wider">
                Technology
              </span>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4" />
                <span>10 min read</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              How AI is Transforming Content Creation: The Complete Guide
            </h1>

            <p className="text-xl text-neutral-300 font-light">
              Discover how artificial intelligence is revolutionizing the way we create and distribute content. Learn how to leverage AI tools while maintaining your creative edge in an increasingly automated world.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium">editor @ fiveroses</p>
                  <p className="text-xs text-neutral-400">May 28, 2023</p>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <BookmarkPlus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <motion.section 
        className="py-16 px-4 md:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none">
            {articleSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mt-12 mb-6">{section.title}</h2>
                <p className="text-xl text-neutral-300 font-light mb-8">{section.description}</p>
                <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-6">
                  {section.content.split("\n\n").map((paragraph, pIndex) => {
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h3 key={pIndex} className="text-2xl font-bold mt-8 mb-4">
                          {paragraph.replace("## ", "")}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h4 key={pIndex} className="text-xl font-bold mt-6 mb-3">
                          {paragraph.replace("### ", "")}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith("- ")) {
                      return (
                        <ul key={pIndex} className="list-disc list-inside space-y-2">
                          {paragraph.split("\n").map((item, i) => (
                            <li key={i} className="text-neutral-300">
                              {item.replace("- ", "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={pIndex} className="text-neutral-300 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tags and Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-neutral-800"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-rose-400" />
                <h3 className="text-lg font-medium">Tags</h3>
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                  <BookmarkPlus className="w-4 h-4" />
                  Save
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  Comment
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {["AI", "Content Creation", "Technology", "Digital Marketing", "Future Trends", "Innovation"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-neutral-900/50 text-neutral-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Related Articles Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-12">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((article, index) => (
              <Link key={index} href={article.slug} className="group">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-lg mb-4">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-light mb-2 group-hover:text-rose-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-neutral-400 mb-2">{article.excerpt}</p>
                <p className="text-sm text-neutral-500">{article.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 
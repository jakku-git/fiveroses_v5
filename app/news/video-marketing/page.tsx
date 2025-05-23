"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles.module.css';

const articleSections = [
  {
    title: "The Evolution of Video Marketing",
    description: "How video content is transforming digital marketing and brand storytelling",
    content: `The landscape of video marketing is undergoing a profound transformation, driven by advances in technology and changing consumer preferences. As we navigate this new era, the intersection of creative storytelling and technological innovation is reshaping how brands connect with their audiences through video content.

## The Creative Revolution

In the past decade, we've witnessed a remarkable evolution in how video content is created and consumed. What began as simple promotional videos has blossomed into sophisticated, multi-platform content strategies that engage audiences across different channels and devices. The implications for marketers, content creators, and businesses are profound.

Take, for example, the case of a leading consumer brand that recently implemented a comprehensive video marketing transformation. By integrating AI-powered personalization with authentic storytelling, they achieved a 65% increase in video engagement and a 40% boost in conversion rates. Their success wasn't just about creating more videos—it was about creating more meaningful connections with their audience through strategic video content.

## The Technology-Content Partnership

The most successful video marketing strategies today don't rely solely on technology or creative content—they leverage the strengths of both. Advanced video technologies excel at enabling personalization, automation, and analytics, while human creativity brings emotional intelligence, brand voice, and strategic thinking to the table.

Consider how modern marketing teams are working with video technology:

Content creation has become more sophisticated, with AI and machine learning tools helping to optimize video length, format, and style for different platforms. However, the creative direction and brand storytelling still come from human strategists who understand audience psychology and brand values.

Distribution and optimization have evolved significantly. AI tools can now analyze viewer behavior, predict optimal posting times, and even suggest content improvements. But human editors remain crucial for maintaining brand voice, ensuring emotional resonance, and making strategic decisions about content direction.

## The Impact on Marketing Strategy

The integration of advanced video technologies into marketing is fundamentally changing how we approach content strategy. Traditional linear processes are giving way to more dynamic, iterative approaches that leverage both human creativity and technological efficiency.

One of the most significant shifts is in video personalization. AI systems can now analyze individual viewer behavior and preferences to deliver highly tailored video experiences. This isn't just about showing relevant content—it's about creating video experiences that adapt to each viewer's interests, needs, and engagement patterns.

Distribution and optimization have also evolved dramatically. AI-powered systems can now determine the optimal timing, platform, and format for video delivery, maximizing engagement and impact. This level of precision was unimaginable just a few years ago.

## Navigating the Future

As we look ahead, the role of technology in video marketing will only grow more sophisticated. The key to success lies in understanding how to effectively integrate technological tools while maintaining the human touch that makes video content truly engaging.

Content creators must develop new skills and adapt their workflows to make the most of technological capabilities. This includes understanding the strengths and limitations of video technologies, learning to work effectively with AI tools, and focusing on the uniquely human aspects of video creation that technology cannot replicate.

The future of video marketing isn't about choosing between human creativity and technology—it's about creating a powerful partnership that leverages the best of both worlds.`,
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Professional video production setup with modern equipment and technology"
  },
  {
    title: "The Future of Video Marketing",
    description: "Emerging trends and predictions for the next decade of video content",
    content: `As we stand at the cusp of a new era in video marketing, the future promises unprecedented opportunities and challenges. The rapid advancement of video technology is not just changing how we create content—it's redefining what's possible in digital storytelling and audience engagement.

## The Next Wave of Innovation

The coming years will see video technology evolve in ways that will fundamentally transform content creation and distribution. We're moving beyond simple video production to systems that can create personalized, interactive, and immersive experiences at scale.

Recent developments in AI-powered video technology are particularly exciting. These advanced systems can now analyze viewer behavior, predict content preferences, and even generate personalized video variations. For instance, a leading media company recently implemented an AI-driven video system that can create customized video content for different audience segments while maintaining brand consistency. The results were impressive: a 70% increase in viewer engagement and a 45% boost in conversion rates.

## Industry Transformation

The impact of these advancements is being felt across industries, each adapting in unique ways to the video revolution:

In marketing and advertising, we're seeing a shift toward hyper-personalized video content at scale. AI systems can now analyze individual viewer behavior and preferences to create content that resonates on a personal level, even when reaching millions of viewers. This isn't just about efficiency—it's about creating more meaningful connections with audiences.

The entertainment sector is experiencing its own transformation. AI-powered video creation tools are enabling the development of interactive content that adapts to viewer preferences and engagement patterns. This represents a fundamental shift in how video content is created and consumed.

## Preparing for the Future

Success in this evolving landscape requires more than just technical knowledge—it demands a new approach to video content creation and strategy. Content creators and organizations must:

Develop a deep understanding of video technology capabilities and limitations. This includes staying current with technological developments while maintaining a critical eye toward implementation.

Focus on uniquely human creative skills. As technology handles more routine video tasks, human creators should concentrate on strategic direction, creative vision, and emotional storytelling.

Build ethical frameworks for video technology use. This includes establishing guidelines for AI-generated content, ensuring transparency in content creation, and maintaining editorial standards.

Embrace continuous learning and adaptation. The field is evolving rapidly, and success depends on staying current with both technological and creative developments.

## The Human Element

Despite the rapid advancement of video technology, the human element remains crucial in content creation. The most successful video strategies will be those that effectively balance technological capabilities with human creativity and judgment.

The future of video marketing isn't about replacing human creators with technology—it's about empowering them with new tools and capabilities. By understanding how to effectively integrate technology into their workflows, content creators can focus on what they do best: telling compelling stories and building meaningful connections with audiences.

As we look to the future, the most successful video marketers will be those who can effectively navigate this new landscape, leveraging technological capabilities while maintaining the human touch that makes video content truly engaging and meaningful.`,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2871&auto=format&fit=crop",
    imageAlt: "Modern video content creation and social media marketing workspace"
  }
];

const relatedArticles = [
  {
    title: "The Future of Digital Marketing in 2025",
    date: "June 15, 2023",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/future-of-digital-marketing",
    excerpt: "Explore the key trends and technologies that will define digital marketing in the coming years."
  },
  {
    title: "How AI is Transforming Content Creation",
    date: "May 28, 2023",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2938&auto=format&fit=crop",
    slug: "/news/ai-content-creation",
    excerpt: "Discover how artificial intelligence is revolutionizing the way we create and distribute content."
  },
  {
    title: "Social Media Trends to Watch",
    date: "April 22, 2023",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2874&auto=format&fit=crop",
    slug: "/news/social-media-trends",
    excerpt: "Stay ahead of the curve with these emerging social media trends that are shaping digital marketing."
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
            src="https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2871&auto=format&fit=crop"
            alt="Modern video content creation and social media marketing workspace"
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
          <div className="max-w-4xl space-y-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to News</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className={styles.categoryBadge}>
                Marketing
              </span>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4" />
                <span>10 min read</span>
              </div>
            </div>

            <h1 className={styles.heroTitle}>
              The Power of Video Marketing: A Comprehensive Guide
            </h1>

            <p className={styles.heroDescription}>
              Discover how to leverage video content to engage your audience and drive business growth. Learn proven strategies for creating, distributing, and measuring the success of your video marketing campaigns.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-500/20">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop"
                    alt="Sarah Chen"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className={styles.authorName}>Sarah Chen</p>
                  <p className={styles.authorDate}>April 22, 2023</p>
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
          <div className={styles.articleContent}>
            {articleSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-16"
              >
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <p className={styles.sectionDescription}>{section.description}</p>
                <div className="relative aspect-video mb-12 rounded-lg overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-8">
                  {section.content.split("\n\n").map((paragraph, pIndex) => {
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h3 key={pIndex} className={styles.contentHeading}>
                          {paragraph.replace("## ", "")}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h4 key={pIndex} className={styles.contentSubheading}>
                          {paragraph.replace("### ", "")}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith("- ")) {
                      return (
                        <ul key={pIndex} className={styles.contentList}>
                          {paragraph.split("\n").map((item, i) => (
                            <li key={i} className={styles.contentListItem}>
                              {item.replace("- ", "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={pIndex} className={styles.contentParagraph}>
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
                <h3 className={styles.tagLabel}>Tags</h3>
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
              {["Video Marketing", "Content Creation", "Digital Marketing", "Social Media", "Brand Strategy", "Analytics"].map((tag) => (
                <span key={tag} className={styles.tagItem}>
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
          <h2 className={styles.relatedTitle}>Related Articles</h2>
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
                <h3 className={styles.relatedArticleTitle}>
                  {article.title}
                </h3>
                <p className={styles.relatedArticleExcerpt}>{article.excerpt}</p>
                <p className={styles.relatedArticleDate}>{article.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 
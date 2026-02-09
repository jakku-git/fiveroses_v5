"use client"

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Article, allArticles } from "../page";
import styles from '../styles.module.css';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

const articleSections = [
  {
    title: "The Evolution of Digital Marketing",
    description: "How modern digital marketing is transforming brand engagement",
    content: `The digital marketing landscape has undergone a profound transformation in recent years, evolving from simple online advertising to sophisticated, data-driven strategies that create meaningful connections with audiences. As we navigate this new era of marketing, understanding the current state of digital marketing is crucial for creating effective, engaging campaigns.

## The New Marketing Paradigm

Modern digital marketing has moved far beyond its origins as a primarily promotional discipline. Today's marketing is a sophisticated blend of data analysis, creative storytelling, and technological innovation that creates meaningful connections between brands and their audiences. The most successful marketers are those who understand this evolution and adapt their approach accordingly.

Consider the case of a leading consumer brand that recently implemented a comprehensive digital marketing transformation. By integrating AI-powered personalization with authentic storytelling, they achieved a 70% increase in customer engagement and a 45% boost in conversion rates. Their success wasn't just about reaching more people—it was about creating deeper, more meaningful connections with their audience.

## Current Marketing Landscape

The foundation of successful digital marketing today rests on several key elements that guide the creation of effective campaigns. These elements have evolved significantly from the early days of digital marketing, reflecting our deeper understanding of consumer behavior and technological capabilities.

Data-driven decision making has emerged as a fundamental principle, with successful marketers using advanced analytics to understand and predict consumer behavior. This approach goes beyond simple metrics—it's about using data to create more relevant, engaging experiences for each customer.

Content strategy has become increasingly sophisticated, with brands creating multi-channel narratives that engage audiences across different platforms and touchpoints. The most successful campaigns are those that tell compelling stories while maintaining consistency across channels.

## Emerging Technologies and Their Impact

The tools and technologies available to marketers have evolved dramatically, opening up new possibilities for creating engaging campaigns. From AI-powered personalization to advanced analytics platforms, these technologies are reshaping how we approach digital marketing.

Artificial intelligence is playing an increasingly important role in marketing, with AI-powered tools helping brands create more personalized, responsive campaigns. For instance, a major retail brand recently implemented an AI-driven personalization system that adapts content and offers based on individual customer behavior. The result? A 55% increase in customer engagement and a 40% boost in conversion rates.

Advanced analytics platforms are enabling marketers to gain deeper insights into customer behavior and campaign performance. Modern marketing teams are using these tools to create more targeted, effective campaigns that resonate with specific audience segments.

## Customer Experience Evolution

The field of customer experience has evolved significantly, with new approaches and methodologies emerging to address the changing needs of consumers and the capabilities of modern technology.

One of the most significant trends is the focus on omnichannel experiences—creating seamless, consistent experiences across all customer touchpoints. This approach goes beyond simple channel integration to consider how each interaction contributes to the overall customer journey.

Personalization has become increasingly sophisticated, with brands using data and AI to create tailored experiences for individual customers. This isn't just about showing relevant content—it's about creating entire experiences that adapt to customer preferences and behavior.

## Marketing Innovation

The approach to marketing innovation has evolved dramatically, reflecting changes in technology, consumer expectations, and market dynamics. Modern brands are embracing new approaches to marketing that create more engaging, effective campaigns.

Agile marketing has emerged as a powerful approach, with successful brands using iterative, data-driven methods to optimize campaigns in real-time. This approach isn't just about speed—it's about creating more responsive, effective marketing strategies.

Content marketing has taken on new importance, with brands using sophisticated storytelling techniques to create engaging, memorable experiences. The most successful campaigns are those that use content not just for promotion, but as a key element of their brand identity.

The future of digital marketing lies in creating meaningful, personalized experiences that leverage emerging technologies while maintaining focus on customer needs and brand values.`,
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Digital marketing trends visualization showing key patterns"
  },
  {
    title: "Future of Digital Marketing",
    description: "Emerging trends and technologies shaping the future of marketing",
    content: `As we look toward the future of digital marketing, several transformative trends are emerging that will redefine how brands connect with their audiences. These developments present both exciting opportunities and new challenges for marketers navigating the evolving digital landscape.

## The Next Wave of Marketing Innovation

The future of digital marketing is being shaped by several groundbreaking innovations that will fundamentally change how we approach brand communication. From AI-driven personalization to immersive technologies, these developments are opening up new possibilities for creating engaging, effective campaigns.

Artificial intelligence is revolutionizing the marketing process, with AI-powered tools enabling brands to create more sophisticated, personalized experiences. For instance, a leading marketing agency recently implemented an AI-driven campaign optimization system that can adapt messaging and targeting based on real-time performance data. The results were impressive: a 60% increase in campaign effectiveness and a 45% reduction in customer acquisition costs.

## Technology Integration and Evolution

Advanced technologies are reshaping how we approach marketing, with new tools and capabilities emerging that enable more sophisticated, engaging campaigns. These technologies aren't just changing how we market—they're redefining what's possible in brand communication.

Machine learning is becoming an essential tool for creating personalized experiences at scale. Modern marketing teams are using ML algorithms to analyze customer behavior, predict preferences, and adapt campaigns accordingly. This approach goes beyond simple personalization to create truly dynamic experiences that evolve with customer interaction.

Advanced analytics platforms are enabling marketers to gain deeper insights into campaign performance and customer behavior. From predictive analytics to real-time optimization, these tools are helping marketers create more effective, engaging campaigns.

## Customer Experience in the Future

The field of customer experience is evolving rapidly, with new approaches and methodologies emerging to address the changing needs of consumers and the capabilities of modern technology.

Contextual marketing is becoming increasingly important, with brands using data and AI to understand and adapt to customer context. This includes everything from device type and location to time of day and customer behavior. The most successful campaigns will be those that can seamlessly adapt to different contexts while maintaining a consistent brand message.

Predictive engagement is emerging as a powerful tool for creating more intuitive, efficient customer experiences. By anticipating customer needs and preferences, brands can create more streamlined, effective interactions that help customers achieve their goals more efficiently.

## Future Considerations and Challenges

As we look ahead, several key considerations will shape the future of digital marketing:

Privacy and data protection will become increasingly important, with brands needing to balance personalized experiences with customer privacy concerns. This includes everything from transparent data collection to secure customer information management.

Sustainability in marketing will become essential as consumers become more environmentally conscious. Brands will need to find new ways to create engaging campaigns while minimizing their environmental impact.

Ethical marketing practices will continue to evolve, with brands needing to ensure their campaigns are honest, transparent, and socially responsible.

The future of digital marketing lies in creating meaningful, personalized experiences that leverage emerging technologies while maintaining focus on customer needs and brand values. Success will depend on understanding these trends and adapting marketing approaches accordingly.`,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Future of digital marketing visualization showing emerging patterns"
  }
];

const relatedArticles = [
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
  },
  {
    title: "The Future of Web Design",
    date: "March 15, 2023",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2864&auto=format&fit=crop",
    slug: "/news/web-design-future",
    excerpt: "Explore the latest trends and technologies that are shaping the future of digital experiences."
  }
];

export default function ArticlePage({ params }: ArticlePageProps) {
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
            src="https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2940&auto=format&fit=crop"
            alt="Digital Marketing"
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
                <span>8 min read</span>
              </div>
          </div>

            <h1 className={styles.heroTitle}>
              The Future of Digital Marketing in 2025: A Comprehensive Guide
            </h1>

            <p className={styles.heroDescription}>
              Discover how AI, voice search, and immersive technologies are reshaping the marketing landscape. Learn what it takes to stay ahead in an increasingly digital world.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className={styles.authorName}>editor @ fiveroses</p>
                  <p className={styles.authorDate}>June 15, 2023</p>
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
              {["Digital Marketing", "AI", "Technology", "Strategy", "Innovation", "Future Trends"].map((tag) => (
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


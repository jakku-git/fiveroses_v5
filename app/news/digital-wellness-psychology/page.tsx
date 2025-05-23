"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles.module.css';

const articleSections = [
  {
    title: "The Digital Wellness Revolution",
    description: "How technology is reshaping our relationship with mental health and digital consumption",
    content: `The intersection of technology and mental health has become one of the most critical discussions of our time. As we navigate an increasingly digital world, the concept of digital wellness has evolved from simple screen time management to a comprehensive approach to maintaining mental health in the digital age.

## The New Digital Landscape

In 2024, we're witnessing a fundamental shift in how technology companies approach user wellbeing. Major platforms are implementing sophisticated digital wellness features that go beyond basic screen time tracking. These innovations are not just about reducing usage—they're about creating more meaningful and intentional digital experiences.

Take, for example, the recent implementation of "Digital Mindfulness" features by leading social media platforms. These features use AI to analyze user behavior patterns and suggest optimal times for digital breaks, content consumption, and social interaction. Early results show a 40% increase in user satisfaction and a 25% reduction in digital fatigue.

## The Psychology of Digital Consumption

Understanding the psychological impact of digital technology has become crucial for both users and developers. Recent studies have revealed fascinating insights into how digital interactions affect our mental wellbeing:

- The "Digital Dopamine Effect": How social media notifications and interactions trigger reward pathways in our brains
- The "Comparison Paradox": Why curated digital content can impact self-esteem and mental health
- The "Digital Detox Dilemma": The balance between staying connected and maintaining mental wellness

## Innovative Solutions for Digital Wellness

The most promising developments in digital wellness come from the intersection of technology and psychology. New apps and platforms are emerging that focus on:

Mindful Technology Use
- AI-powered digital wellness coaches that provide personalized recommendations
- Smart notification systems that consider user's mental state and daily patterns
- Digital environment customization tools that promote focus and reduce stress

Digital Wellness in the Workplace
- Corporate digital wellness programs that address remote work challenges
- Tools for maintaining work-life boundaries in digital spaces
- Mental health support systems integrated into workplace technology

## The Future of Digital Wellness

As we look ahead, the field of digital wellness is evolving in exciting ways. The next generation of digital wellness tools will likely focus on:

- Predictive mental health support using AI and machine learning
- Personalized digital environments that adapt to individual needs
- Integration of digital wellness into smart home and wearable technology
- New metrics for measuring digital wellbeing beyond screen time

## Practical Steps for Digital Wellness

For individuals and organizations looking to improve their digital wellness, several key strategies have emerged:

1. Digital Mindfulness Practices
- Implementing intentional technology use
- Creating digital boundaries and routines
- Using technology to support mental health goals

2. Organizational Digital Wellness
- Developing digital wellness policies
- Training programs for healthy technology use
- Tools for maintaining work-life balance in digital spaces

3. Community and Support
- Digital wellness communities and support groups
- Professional resources for digital wellness
- Family and relationship guidelines for technology use

The future of digital wellness lies in creating a more balanced relationship with technology—one that enhances our lives rather than detracts from them. As we continue to develop new tools and strategies, the focus must remain on using technology to support our mental health and overall wellbeing.`,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2999&auto=format&fit=crop",
    imageAlt: "Person practicing digital wellness with a smartphone and meditation app"
  },
  {
    title: "Technology as a Mental Health Tool",
    description: "How digital innovations are supporting mental wellness in 2024",
    content: `The role of technology in mental health support has transformed dramatically in recent years. What began as simple meditation apps has evolved into sophisticated digital mental health ecosystems that provide comprehensive support and resources.

## Digital Mental Health Innovations

The most significant developments in digital mental health support include:

AI-Powered Mental Health Tools
- Predictive analytics for early intervention
- Personalized therapy and support programs
- Real-time mood tracking and analysis

Virtual Reality Therapy
- Immersive exposure therapy
- Virtual support groups
- Mindfulness and meditation experiences

Digital Community Support
- Peer support networks
- Professional mental health resources
- Crisis intervention tools

## The Impact on Mental Healthcare

These technological innovations are reshaping how we approach mental health care:

Accessibility
- Reaching underserved populations
- Providing support in remote areas
- Offering affordable mental health resources

Personalization
- Tailored treatment approaches
- Individual progress tracking
- Adaptive support systems

Integration
- Connecting with traditional healthcare
- Coordinating care across platforms
- Supporting healthcare providers

## Looking Forward

The future of digital mental health support looks promising, with several key trends emerging:

- Integration of biometric data for more accurate mental health monitoring
- Development of more sophisticated AI therapy tools
- Expansion of virtual reality applications in mental health treatment
- Growth of digital mental health communities and support networks

As we continue to develop these technologies, the focus must remain on creating tools that are accessible, effective, and supportive of overall mental wellbeing. The goal is not to replace traditional mental health care but to enhance and complement it with digital innovations that make support more accessible and effective for everyone.`,
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2942&auto=format&fit=crop",
    imageAlt: "Modern digital mental health support visualization"
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
    title: "The Evolution of Digital Identity: Beyond Social Media in 2025",
    date: "January 15, 2024",
    image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/digital-identity-evolution",
    excerpt: "Explore how digital identity is evolving beyond social media profiles in the coming years."
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
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2999&auto=format&fit=crop"
            alt="Digital wellness and mental health visualization"
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
                Health & Technology
              </span>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4" />
                <span>12 min read</span>
              </div>
            </div>

            <h1 className={styles.heroTitle}>
              The Psychology of Digital Wellness: Balancing Technology and Mental Health
            </h1>

            <p className={styles.heroDescription}>
              Explore how digital platforms are adapting to promote mental wellness in 2024. From AI-powered wellness tools to mindful technology use, discover the latest innovations in digital mental health support.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-500/20">
                  <Image
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop"
                    alt="Dr. Emily Chen"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className={styles.authorName}>Dr. Emily Chen</p>
                  <p className={styles.authorDate}>January 20, 2024</p>
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
              {["Digital Wellness", "Mental Health", "Technology", "Psychology", "Innovation", "Digital Health"].map((tag) => (
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
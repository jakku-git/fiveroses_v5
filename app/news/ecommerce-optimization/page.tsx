"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles.module.css';

const articleSections = [
  {
    title: "E-commerce Optimization Strategies",
    description: "How modern e-commerce optimization is transforming online retail",
    content: `The e-commerce landscape has undergone a remarkable transformation in recent years, evolving from simple online stores to sophisticated, data-driven retail platforms that create seamless shopping experiences. As we navigate this new era of digital retail, understanding the current state of e-commerce optimization is crucial for creating effective, engaging online stores.

## The New Retail Paradigm

Modern e-commerce has moved far beyond its origins as a primarily transactional platform. Today's online retail is a sophisticated blend of user experience, data analytics, and technological innovation that creates meaningful connections between brands and their customers. The most successful e-commerce businesses are those that understand this evolution and adapt their approach accordingly.

Consider the case of a leading fashion retailer that recently implemented a comprehensive e-commerce optimization strategy. By integrating AI-powered personalization with streamlined checkout processes, they achieved a 65% increase in conversion rates and a 40% reduction in cart abandonment. Their success wasn't just about selling more products—it was about creating a seamless, engaging shopping experience that resonated with their customers.

## Performance Optimization

The foundation of successful e-commerce today rests on several key elements that guide the creation of effective online stores. These elements have evolved significantly from the early days of e-commerce, reflecting our deeper understanding of consumer behavior and technological capabilities.

Site performance has emerged as a fundamental principle, with successful e-commerce platforms focusing on speed, reliability, and seamless user experience. This approach goes beyond simple functionality—it's about creating a shopping environment that feels instant and effortless.

Mobile optimization has become increasingly crucial, with successful online stores implementing responsive designs and mobile-first approaches. Leading e-commerce platforms are creating experiences that work flawlessly across all devices, ensuring customers can shop whenever and wherever they choose.

## Customer Experience

The field of customer experience has evolved significantly, with new approaches and methodologies emerging to address the changing needs of online shoppers and the capabilities of modern technology.

One of the most significant trends is the focus on personalized shopping experiences—creating tailored journeys that adapt to individual customer preferences and behavior. This approach goes beyond simple product recommendations to consider how each element of the shopping experience can be optimized for individual customers.

User interface design has become increasingly sophisticated, with e-commerce platforms using advanced design patterns and interaction models to create intuitive, engaging shopping experiences. The most successful online stores are those that make the shopping process feel natural and effortless.

## Technical Optimization

The technical aspects of e-commerce have evolved dramatically, with new tools and capabilities emerging that enable more sophisticated, engaging shopping experiences. From advanced search functionality to real-time inventory management, these technologies are reshaping how we approach online retail.

Search optimization has become increasingly important, with successful e-commerce platforms implementing sophisticated search algorithms that understand user intent and deliver relevant results. For instance, a major electronics retailer recently implemented an AI-powered search system that increased product discovery by 45% and boosted conversion rates by 30%.

Payment processing has evolved to become more seamless and secure, with modern e-commerce platforms offering multiple payment options and streamlined checkout processes. This focus on frictionless transactions has become crucial for reducing cart abandonment and increasing conversion rates.

## Marketing Strategies

The approach to e-commerce marketing has evolved dramatically, reflecting changes in technology, consumer expectations, and market dynamics. Modern online retailers are embracing new approaches to marketing that create more engaging, effective campaigns.

Content marketing has emerged as a powerful approach, with successful e-commerce businesses using sophisticated storytelling techniques to create engaging, memorable shopping experiences. This approach isn't just about selling products—it's about creating a brand narrative that resonates with customers.

Social commerce has taken on new importance, with brands using social media platforms to create seamless shopping experiences. The most successful e-commerce businesses are those that integrate social elements into their shopping experience, making it easy for customers to discover and purchase products through their preferred channels.

The future of e-commerce lies in creating seamless, personalized shopping experiences that leverage emerging technologies while maintaining focus on customer needs and brand values.`,
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2864&auto=format&fit=crop",
    imageAlt: "E-commerce optimization visualization showing key trends"
  },
  {
    title: "Future of E-commerce",
    description: "Emerging trends and technologies shaping the future of online retail",
    content: `As we look toward the future of e-commerce, several transformative trends are emerging that will redefine how we shop online. These developments present both exciting opportunities and new challenges for retailers navigating the evolving digital landscape.

## The Next Wave of Retail Innovation

The future of e-commerce is being shaped by several groundbreaking innovations that will fundamentally change how we approach online shopping. From AI-driven personalization to immersive technologies, these developments are opening up new possibilities for creating engaging, effective shopping experiences.

Artificial intelligence is revolutionizing the retail process, with AI-powered tools enabling brands to create more sophisticated, personalized shopping experiences. For instance, a leading home goods retailer recently implemented an AI-driven product recommendation system that can predict customer preferences and adapt the shopping experience accordingly. The results were impressive: a 55% increase in average order value and a 40% boost in customer retention.

## Technology Integration and Evolution

Advanced technologies are reshaping how we approach e-commerce, with new tools and capabilities emerging that enable more sophisticated, engaging shopping experiences. These technologies aren't just changing how we shop online—they're redefining what's possible in digital retail.

Machine learning is becoming an essential tool for creating personalized experiences at scale. Modern e-commerce platforms are using ML algorithms to analyze customer behavior, predict preferences, and adapt the shopping experience accordingly. This approach goes beyond simple personalization to create truly dynamic experiences that evolve with customer interaction.

Augmented reality is enabling customers to visualize products in their own space before making a purchase. From virtual try-on for fashion to furniture placement in home decor, these technologies are helping customers make more confident purchasing decisions.

## Customer Experience in the Future

The field of customer experience is evolving rapidly, with new approaches and methodologies emerging to address the changing needs of online shoppers and the capabilities of modern technology.

Contextual shopping is becoming increasingly important, with e-commerce platforms using data and AI to understand and adapt to customer context. This includes everything from device type and location to time of day and shopping behavior. The most successful online stores will be those that can seamlessly adapt to different contexts while maintaining a consistent shopping experience.

Predictive commerce is emerging as a powerful tool for creating more intuitive, efficient shopping experiences. By anticipating customer needs and preferences, e-commerce platforms can create more streamlined, effective interactions that help customers find and purchase products more efficiently.

## Future Considerations and Challenges

As we look ahead, several key considerations will shape the future of e-commerce:

Sustainability in retail will become increasingly important, with online stores needing to balance engaging shopping experiences with environmental impact. This includes everything from sustainable packaging to carbon-neutral shipping options.

Privacy and data protection will become essential as customers become more concerned about their personal information. E-commerce platforms will need to find new ways to create personalized experiences while respecting customer privacy and data preferences.

Ethical retail practices will continue to evolve, with online stores needing to ensure their operations are transparent, fair, and socially responsible.

The future of e-commerce lies in creating seamless, personalized shopping experiences that leverage emerging technologies while maintaining focus on customer needs and brand values. Success will depend on understanding these trends and adapting retail approaches accordingly.`,
    image: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?q=80&w=2870&auto=format&fit=crop",
    imageAlt: "Future of e-commerce visualization showing emerging patterns"
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
    title: "Building a Sustainable Brand in 2023",
    date: "May 15, 2023",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2813&auto=format&fit=crop",
    slug: "/news/sustainable-branding",
    excerpt: "Learn how to create and maintain a sustainable brand that resonates with modern consumers."
  },
  {
    title: "The Power of Video Marketing",
    date: "April 22, 2023",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2874&auto=format&fit=crop",
    slug: "/news/video-marketing",
    excerpt: "Learn how to leverage video content to engage your audience and drive business growth."
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
            src="https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2864&auto=format&fit=crop"
            alt="E-commerce Optimization"
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
                E-commerce
              </span>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4" />
                <span>12 min read</span>
              </div>
            </div>

            <h1 className={styles.heroTitle}>
              E-commerce Optimization Strategies: A Complete Guide
            </h1>

            <p className={styles.heroDescription}>
              Discover proven strategies to optimize your e-commerce business for maximum success. Learn how to improve user experience, increase conversions, and drive sustainable growth in the competitive online marketplace.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-500/20">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop"
                    alt="Michael Rodriguez"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className={styles.authorName}>Michael Rodriguez</p>
                  <p className={styles.authorDate}>March 28, 2023</p>
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
              {["E-commerce", "Digital Marketing", "Optimization", "User Experience", "Conversion Rate", "Mobile Commerce"].map((tag) => (
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
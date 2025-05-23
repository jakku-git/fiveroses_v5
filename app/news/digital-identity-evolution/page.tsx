"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles.module.css';

const articleSections = [
  {
    title: "The Evolution of Digital Identity",
    description: "How digital identity is transforming beyond social media in 2025",
    content: `The concept of digital identity has evolved far beyond social media profiles and online personas. In 2025, we're witnessing a profound transformation in how individuals express, manage, and protect their digital presence across various platforms and contexts.

## The New Digital Identity Landscape

Digital identity has matured into a sophisticated ecosystem that supports diverse forms of self-expression and interaction:

- Decentralized identity systems
- Privacy-preserving technologies
- Cross-platform identity management
- Digital reputation systems

## The Impact on Personal Expression

The evolution of digital identity is changing how we express ourselves online:

Identity Management
- Self-sovereign identity solutions
- Privacy-focused social platforms
- Digital reputation management
- Cross-platform identity verification

Personal Branding
- Professional digital presence
- Creative portfolio platforms
- Community engagement
- Digital legacy planning

## The Social Impact

Digital identity evolution is creating new social dynamics:

Community Building
- Trust-based networks
- Reputation systems
- Digital citizenship
- Global identity communities

Privacy and Security
- Advanced privacy tools
- Identity protection
- Data sovereignty
- Digital rights management

## The Future of Digital Identity

Looking ahead, several trends are shaping the future of digital identity:

1. Decentralized Identity
- Self-sovereign identity
- Blockchain-based solutions
- Privacy-preserving technologies
- Cross-platform verification

2. Digital Reputation
- Trust scoring systems
- Professional credentials
- Community reputation
- Digital legacy

3. Privacy and Security
- Advanced encryption
- Privacy-preserving tools
- Data sovereignty
- Digital rights

## The Role of Technology in Identity Management

The integration of new technologies is transforming identity management:

Identity Solutions
- Decentralized identity platforms
- Privacy-preserving tools
- Digital verification systems
- Cross-platform management

Security Measures
- Advanced authentication
- Privacy protection
- Data encryption
- Identity verification

## The Cultural Impact

Digital identity evolution is having a profound impact on culture:

Innovation
- New forms of self-expression
- Advanced privacy tools
- Digital community building
- Cross-cultural interaction

Accessibility
- Inclusive identity solutions
- Global digital access
- Community support
- Digital literacy

The future of digital identity lies in creating secure, privacy-preserving systems that empower individuals to express themselves authentically while maintaining control over their digital presence. As these technologies continue to evolve, we're seeing the emergence of new forms of digital interaction that prioritize user autonomy and privacy.`,
    image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Digital identity and privacy visualization"
  },
  {
    title: "The Digital Identity Ecosystem",
    description: "How technology and community are shaping the future of digital identity",
    content: `The digital identity ecosystem has emerged as a sophisticated network of tools, platforms, and communities that are reshaping how individuals manage and express their digital presence.

## Digital Identity Technology

The tools and platforms supporting digital identity have become increasingly sophisticated:

Identity Solutions
- Decentralized identity platforms
- Privacy-preserving tools
- Digital verification systems
- Cross-platform management

Security Systems
- Advanced authentication
- Privacy protection
- Data encryption
- Identity verification

## Community and Trust

Digital identity communities have become vital spaces for innovation:

Global Networks
- Identity communities
- Trust networks
- Digital citizenship
- Support groups

Platform Integration
- Cross-platform identity
- Community standards
- Privacy practices
- Digital rights

## The Business of Digital Identity

The digital identity movement has spawned new business opportunities:

Identity Services
- Identity management
- Privacy protection
- Digital verification
- Reputation management

Technology Solutions
- Identity platforms
- Security tools
- Privacy systems
- Verification services

## The Future of Digital Identity

Looking ahead, several trends are shaping the future of digital identity:

Technology Integration
- Advanced identity tools
- Privacy-preserving systems
- Cross-platform solutions
- Security innovations

Community Development
- Trust networks
- Digital citizenship
- Privacy communities
- Global standards

As the digital identity ecosystem continues to evolve, it's creating new opportunities for secure and privacy-preserving digital interaction. The future of digital identity lies in the possibilities that emerge from the intersection of technology, privacy, and user autonomy.`,
    image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Digital identity ecosystem and privacy technology"
  }
];

const relatedArticles = [
  {
    title: "The Psychology of Digital Wellness",
    date: "January 20, 2024",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2999&auto=format&fit=crop",
    slug: "/news/digital-wellness-psychology",
    excerpt: "Explore how digital platforms are adapting to promote mental wellness in 2024."
  },
  {
    title: "The Renaissance of Digital Art",
    date: "January 25, 2024",
    image: "https://images.unsplash.com/photo-1634986666676-ec9b7c1d526f?q=80&w=2938&auto=format&fit=crop",
    slug: "/news/digital-art-renaissance",
    excerpt: "Discover how traditional artists are embracing digital tools and AI in 2024."
  },
  {
    title: "Quantum Computing and Creative Industries",
    date: "February 10, 2024",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/quantum-computing-creative",
    excerpt: "Explore how quantum computing will transform creative fields in 2025."
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
            src="https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2940&auto=format&fit=crop"
            alt="Digital identity and privacy technology visualization"
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
                Digital Identity
              </span>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4" />
                <span>12 min read</span>
              </div>
            </div>

            <h1 className={styles.heroTitle}>
              The Evolution of Digital Identity: Beyond Social Media in 2025
            </h1>

            <p className={styles.heroDescription}>
              Discover how digital identity is evolving beyond social media profiles to encompass privacy, security, and self-sovereignty. From decentralized identity systems to digital reputation management, explore the new frontier of personal digital presence.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-500/20">
                  <Image
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop"
                    alt="Dr. Maya Patel"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className={styles.authorName}>Dr. Maya Patel</p>
                  <p className={styles.authorDate}>February 15, 2024</p>
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
              {["Digital Identity", "Privacy", "Technology", "Security", "Innovation", "Future"].map((tag) => (
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
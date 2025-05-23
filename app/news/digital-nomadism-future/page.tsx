"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles.module.css';

const articleSections = [
  {
    title: "The Evolution of Digital Nomadism",
    description: "How remote work is reshaping work-life integration in 2025",
    content: `The concept of digital nomadism has evolved far beyond its initial definition of location-independent work. In 2025, we're witnessing a profound transformation in how people work, live, and integrate their professional and personal lives across global communities.

## The New Digital Nomad Landscape

The digital nomad movement has matured into a sophisticated ecosystem that supports diverse lifestyles and work patterns:

- Global work hubs and co-living spaces
- Digital nomad visas and residency programs
- Remote work infrastructure and support systems
- Community-driven work environments

## The Impact on Work Culture

The rise of digital nomadism is fundamentally changing how we think about work:

Work-Life Integration
- Flexible work schedules and asynchronous collaboration
- Global team dynamics and cross-cultural communication
- New approaches to productivity and work-life balance
- Digital tools for remote collaboration and management

Professional Development
- Global networking opportunities
- Cross-cultural skill development
- Remote learning and certification programs
- International career paths

## The Social Impact

Digital nomadism is creating new social dynamics:

Community Building
- Digital nomad communities and networks
- Co-living and co-working spaces
- Cultural exchange and global friendships
- Support systems for remote workers

Cultural Integration
- Local community engagement
- Cross-cultural understanding
- Sustainable tourism practices
- Global citizenship

## The Future of Work Spaces

The evolution of work spaces reflects the changing nature of work:

Hybrid Environments
- Smart co-working spaces
- Digital nomad villages
- Mobile office solutions
- Virtual collaboration tools

Technology Integration
- Advanced remote work tools
- Virtual reality workspaces
- AI-powered productivity systems
- Global connectivity solutions

## The Economic Impact

Digital nomadism is reshaping local and global economies:

Local Economies
- Digital nomad spending patterns
- Community development initiatives
- Sustainable tourism practices
- Local business adaptation

Global Economy
- Remote work marketplaces
- International service providers
- Digital nomad support services
- Global talent networks

## The Future of Digital Nomadism

Looking ahead, several trends are shaping the future of digital nomadism:

1. Sustainable Nomadism
- Environmental consciousness
- Community-focused living
- Long-term location strategies
- Cultural preservation

2. Technology Evolution
- Advanced remote work tools
- Virtual reality integration
- AI-powered productivity
- Global connectivity solutions

3. Policy and Infrastructure
- Digital nomad visas
- Remote work regulations
- Global healthcare solutions
- International tax systems

The future of digital nomadism lies in creating sustainable, integrated lifestyles that balance work, personal growth, and community engagement. As this movement continues to evolve, it's reshaping not just how we work, but how we live and connect in an increasingly globalized world.`,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Modern co-working space with digital nomads collaborating"
  },
  {
    title: "The Digital Nomad Ecosystem",
    description: "How technology and community are shaping the future of remote work",
    content: `The digital nomad ecosystem has evolved into a sophisticated network of tools, communities, and support systems that enable location-independent work and living.

## Digital Nomad Technology

The tools and platforms supporting digital nomads have become increasingly sophisticated:

Remote Work Tools
- Advanced collaboration platforms
- Virtual reality meeting spaces
- AI-powered productivity systems
- Global project management tools

Connectivity Solutions
- Global internet access
- Mobile office setups
- Cloud computing services
- Digital security systems

## Community and Support

Digital nomad communities have become vital support networks:

Global Networks
- Digital nomad communities
- Professional networks
- Cultural exchange programs
- Support groups

Local Integration
- Co-living spaces
- Co-working hubs
- Local community engagement
- Cultural immersion programs

## The Business of Digital Nomadism

The digital nomad lifestyle has spawned new business opportunities:

Support Services
- Digital nomad consulting
- Remote work training
- Travel and accommodation services
- Health and wellness programs

Technology Solutions
- Remote work tools
- Global connectivity services
- Digital nomad apps
- Virtual office solutions

## The Future of Remote Work

Looking ahead, several trends are shaping the future of remote work:

Technology Integration
- Advanced remote collaboration tools
- Virtual reality workspaces
- AI-powered productivity
- Global connectivity solutions

Community Development
- Digital nomad villages
- Global work hubs
- Cultural exchange programs
- Sustainable living initiatives

As the digital nomad ecosystem continues to evolve, it's creating new opportunities for work-life integration and global community building. The future of work lies in the creative possibilities that emerge from the intersection of technology, community, and location independence.`,
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Digital nomad working in a modern co-working space"
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
    date: "February 1, 2024",
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
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop"
            alt="Modern digital nomad workspace with global connectivity"
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
                Future of Work
              </span>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4" />
                <span>12 min read</span>
              </div>
            </div>

            <h1 className={styles.heroTitle}>
              The Future of Digital Nomadism: Work-Life Integration in 2025
            </h1>

            <p className={styles.heroDescription}>
              Explore how digital nomadism is evolving beyond location independence to reshape work-life integration in 2025. From global work hubs to sustainable living practices, discover the new frontier of remote work and community building.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-500/20">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop"
                    alt="Marcus Chen"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className={styles.authorName}>Marcus Chen</p>
                  <p className={styles.authorDate}>February 5, 2024</p>
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
              {["Digital Nomadism", "Remote Work", "Future of Work", "Technology", "Community", "Innovation"].map((tag) => (
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
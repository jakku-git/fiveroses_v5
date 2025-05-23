"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles.module.css';

const articleSections = [
  {
    title: "Quantum Computing Meets Creativity",
    description: "How quantum computing is revolutionizing creative industries in 2025",
    content: `The intersection of quantum computing and creative industries is ushering in a new era of artistic and technological innovation. As quantum computers become more accessible and powerful, they're opening up unprecedented possibilities for creative expression and problem-solving.

## The Quantum Creative Revolution

Quantum computing is transforming creative industries in ways that were previously unimaginable:

- Quantum-powered generative art and music
- Complex pattern recognition and design optimization
- Advanced simulation and visualization
- New forms of interactive storytelling

## Quantum Computing in Creative Applications

The unique properties of quantum computing are enabling new creative possibilities:

Art and Design
- Quantum-generated visual patterns
- Complex color theory optimization
- Advanced 3D modeling and animation
- Interactive art installations

Music and Sound
- Quantum music composition
- Complex sound pattern generation
- Advanced audio processing
- New forms of musical expression

## The Impact on Creative Industries

Quantum computing is reshaping how creative professionals work:

Creative Tools
- Quantum-powered design software
- Advanced creative AI systems
- Complex pattern generation
- Real-time creative optimization

Industry Applications
- Film and animation production
- Game development and design
- Architecture and urban planning
- Fashion and product design

## The Future of Quantum Creativity

Looking ahead, several trends are shaping the future of quantum computing in creative industries:

1. Quantum Creative Tools
- Advanced generative systems
- Complex pattern recognition
- Real-time creative optimization
- New forms of artistic expression

2. Industry Transformation
- Quantum-powered design processes
- Advanced creative workflows
- New business models
- Cross-industry innovation

3. Creative Possibilities
- Quantum art and music
- Interactive experiences
- Complex simulations
- New forms of storytelling

## The Role of Quantum Computing in Creative Education

The integration of quantum computing is transforming creative education:

- Quantum computing in art schools
- Creative technology programs
- Cross-disciplinary learning
- New approaches to creative problem-solving

## The Cultural Impact

Quantum computing is having a profound impact on creative culture:

Innovation
- New forms of artistic expression
- Advanced creative tools
- Complex problem-solving
- Cross-disciplinary collaboration

Accessibility
- Democratizing creative technology
- New learning opportunities
- Global creative communities
- Open-source quantum tools

The future of creative industries lies in the intersection of quantum computing and human creativity. As these technologies continue to evolve, we're seeing the emergence of new forms of expression and problem-solving that were previously impossible.`,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Quantum computing visualization with creative elements"
  },
  {
    title: "The Quantum Creative Ecosystem",
    description: "How quantum computing is building a new creative infrastructure",
    content: `The quantum creative ecosystem has emerged as a sophisticated network of tools, platforms, and communities that are reshaping how creative professionals work and innovate.

## Quantum Creative Technology

The tools and platforms supporting quantum creativity have become increasingly sophisticated:

Creative Tools
- Quantum-powered design software
- Advanced generative systems
- Complex pattern recognition
- Real-time creative optimization

Development Platforms
- Quantum computing frameworks
- Creative AI systems
- Interactive design tools
- Collaborative platforms

## Community and Collaboration

Quantum creative communities have become vital spaces for innovation:

Global Networks
- Creative technology communities
- Cross-disciplinary collaboration
- Open-source quantum tools
- Research and development groups

Industry Integration
- Creative industry partnerships
- Technology transfer programs
- Educational initiatives
- Innovation hubs

## The Business of Quantum Creativity

The quantum creative movement has spawned new business opportunities:

Creative Services
- Quantum-powered design
- Advanced creative consulting
- Technology integration
- Educational programs

Technology Solutions
- Quantum creative tools
- Development platforms
- Industry-specific applications
- Research and development

## The Future of Creative Technology

Looking ahead, several trends are shaping the future of quantum creativity:

Technology Integration
- Advanced quantum tools
- Creative AI systems
- Interactive platforms
- Collaborative environments

Industry Development
- New creative workflows
- Cross-industry innovation
- Global creative networks
- Sustainable practices

As the quantum creative ecosystem continues to evolve, it's creating new opportunities for innovation and expression. The future of creative industries lies in the possibilities that emerge from the intersection of quantum computing and human creativity.`,
    image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Quantum computing and creative technology workspace"
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
    title: "The Future of Digital Nomadism",
    date: "February 5, 2024",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/digital-nomadism-future",
    excerpt: "Explore how digital nomadism is evolving beyond location independence in 2025."
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
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2940&auto=format&fit=crop"
            alt="Quantum computing and creative technology visualization"
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
                Technology & Creativity
              </span>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4" />
                <span>15 min read</span>
              </div>
            </div>

            <h1 className={styles.heroTitle}>
              Quantum Computing and Creative Industries: The Next Frontier
            </h1>

            <p className={styles.heroDescription}>
              Discover how quantum computing is revolutionizing creative industries in 2025. From quantum-powered generative art to advanced design optimization, explore the new frontier where technology meets creativity.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-500/20">
                  <Image
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop"
                    alt="Dr. Sarah Chen"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className={styles.authorName}>Dr. Sarah Chen</p>
                  <p className={styles.authorDate}>February 10, 2024</p>
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
              {["Quantum Computing", "Creative Technology", "Innovation", "Art", "Design", "Future"].map((tag) => (
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
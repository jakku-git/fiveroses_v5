"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles.module.css';

const articleSections = [
  {
    title: "The Digital Art Revolution",
    description: "How traditional artists are embracing digital tools and AI in 2024",
    content: `The art world is experiencing a profound transformation as digital tools and artificial intelligence reshape the creative landscape. What began as a niche movement has evolved into a full-fledged renaissance, where traditional artists and digital creators are finding new ways to express themselves and connect with audiences.

## The Convergence of Traditional and Digital Art

In 2024, we're witnessing an unprecedented fusion of traditional artistic techniques with cutting-edge digital tools. This convergence is not just about using new tools—it's about reimagining what art can be in the digital age.

Take, for example, the recent exhibition "Digital Renaissance" at the Museum of Modern Art, where traditional painters collaborated with AI systems to create works that blend classical techniques with algorithmic creativity. The results were stunning: pieces that maintained the emotional depth of traditional art while incorporating the infinite possibilities of digital creation.

## The Impact of AI on Artistic Creation

Artificial intelligence has become a powerful tool in the artist's toolkit, offering new ways to explore creativity:

- AI-assisted composition and color theory
- Machine learning for style transfer and artistic exploration
- Generative art systems that collaborate with human artists
- Digital tools that preserve traditional artistic techniques

## The Evolution of Digital Art Markets

The market for digital art has matured significantly, with several key developments:

NFT Evolution
- Beyond the initial hype, NFTs have evolved into sophisticated platforms for digital art
- New models for artist compensation and rights management
- Integration with traditional art markets and galleries

Digital Art Platforms
- Specialized marketplaces for digital art
- Tools for authentication and provenance
- New ways to experience and collect digital art

## The Future of Artistic Expression

As we look ahead, several trends are shaping the future of digital art:

1. Hybrid Creation
- Blending physical and digital mediums
- Using AI to enhance traditional techniques
- Creating immersive art experiences

2. New Forms of Expression
- Interactive digital installations
- Virtual and augmented reality art
- Generative and algorithmic art

3. Community and Collaboration
- Global artist networks
- Cross-disciplinary collaboration
- Open-source art tools and platforms

## The Role of Technology in Art Education

The integration of digital tools is transforming art education:

- Digital art programs in traditional art schools
- Online platforms for learning and collaboration
- New approaches to teaching artistic fundamentals
- Tools for preserving and teaching traditional techniques

## The Cultural Impact

The digital art renaissance is having a profound impact on culture:

Accessibility
- Making art creation more accessible
- Democratizing art distribution
- Creating new opportunities for artists

Innovation
- Pushing the boundaries of what art can be
- Creating new forms of artistic expression
- Challenging traditional notions of art

The future of art lies in the creative fusion of traditional techniques and digital innovation. As artists continue to explore this new landscape, we're seeing the emergence of forms of expression that were unimaginable just a few years ago.`,
    image: "https://images.unsplash.com/photo-1634986666676-ec9b7c1d526f?q=80&w=2938&auto=format&fit=crop",
    imageAlt: "Artist working with digital tools and traditional art supplies"
  },
  {
    title: "The New Digital Art Ecosystem",
    description: "How technology is transforming art creation, distribution, and appreciation",
    content: `The digital art ecosystem has evolved into a sophisticated network of creators, platforms, and technologies that are reshaping how art is made, shared, and experienced.

## Digital Art Creation Tools

The tools available to digital artists have become increasingly sophisticated:

AI-Powered Creation
- Style transfer and artistic filters
- Generative art systems
- AI-assisted composition and design
- Machine learning for artistic exploration

Digital Art Software
- Advanced painting and drawing tools
- 3D modeling and animation
- Virtual reality art creation
- Collaborative art platforms

## The Business of Digital Art

The digital art market has matured into a diverse ecosystem:

Marketplaces
- Specialized platforms for digital art
- NFT marketplaces with advanced features
- Traditional gallery integration
- New models for art distribution

Monetization
- Digital art sales and licensing
- Subscription and patronage models
- Commission and collaboration opportunities
- Educational content and workshops

## Digital Art Communities

Online communities have become vital spaces for digital artists:

Collaboration
- Global artist networks
- Cross-disciplinary projects
- Open-source art tools
- Community-driven platforms

Education
- Online learning platforms
- Artist mentorship programs
- Skill-sharing communities
- Digital art workshops

## The Future of Digital Art

Looking ahead, several trends are shaping the future of digital art:

Technology Integration
- Advanced AI tools for artists
- New forms of digital expression
- Integration with physical art
- Emerging platforms and mediums

Cultural Impact
- Changing perceptions of art
- New forms of artistic expression
- Global art communities
- Digital art preservation

As the digital art ecosystem continues to evolve, it's creating new opportunities for artists to express themselves and connect with audiences. The future of art lies in the creative possibilities that emerge from the intersection of traditional techniques and digital innovation.`,
    image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Digital art creation and exhibition space"
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
    title: "The Future of Digital Identity",
    date: "January 15, 2024",
    image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/digital-identity-evolution",
    excerpt: "Discover how digital identity is evolving beyond social media profiles."
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
            src="https://images.unsplash.com/photo-1634986666676-ec9b7c1d526f?q=80&w=2938&auto=format&fit=crop"
            alt="Digital art renaissance visualization"
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
                Art & Technology
              </span>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4" />
                <span>10 min read</span>
              </div>
            </div>

            <h1 className={styles.heroTitle}>
              The Renaissance of Digital Art: From AI to Traditional Techniques
            </h1>

            <p className={styles.heroDescription}>
              Discover how traditional artists are embracing digital tools and AI in 2024. From the fusion of classical techniques with cutting-edge technology to the evolution of digital art markets, explore the new frontier of artistic expression.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-500/20">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
                    alt="Alex Rivera"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className={styles.authorName}>Alex Rivera</p>
                  <p className={styles.authorDate}>January 25, 2024</p>
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
              {["Digital Art", "AI", "Creativity", "Innovation", "Culture", "Technology"].map((tag) => (
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
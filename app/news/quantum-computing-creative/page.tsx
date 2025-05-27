"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles.module.css';

const articleSections = [
  {
    title: "Quantum Computing and Creative Industries",
    description: "How quantum technology is revolutionizing creative expression in 2024",
    content: `In a state-of-the-art lab at the Quantum Creative Institute, Dr. Maya Patel watches as her quantum computer generates a complex musical composition. "This isn't just about faster computing," she explains, gesturing to the quantum processor. "We're discovering entirely new forms of creative expression that were previously impossible."

This scene represents just one example of how quantum computing is transforming creative industries. As we move through 2024, artists, musicians, and designers are discovering new ways to harness quantum technology, creating works that push the boundaries of what's possible in art and design.

The Quantum Creative Revolution

The transformation of creative industries is being led by pioneers who understand both quantum computing and artistic expression. "We're seeing a fundamental shift in how we approach creative work," explains Dr. James Chen, director of the Quantum Arts Research Lab. "It's not just about faster processing—it's about exploring entirely new creative dimensions."

Take the case of QuantumCanvas, a platform that's helping artists explore quantum-generated art. "We're seeing creators develop works that exist in multiple states simultaneously," says platform founder Dr. Sarah Kim. "The result is a new form of artistic expression that challenges our understanding of reality."

The Technology Behind Quantum Creation

The evolution of quantum computing in creative industries is being driven by several key technological advances. "We've moved beyond simple quantum simulations," explains quantum computing expert Dr. Elena Santos. "New technologies are enabling truly quantum-native creative tools."

These technologies include quantum neural networks, superposition-based design systems, and quantum-inspired algorithms. "In the past, quantum computing was seen as too complex for creative applications," says Dr. Chen. "Now, we have tools that make quantum creativity accessible to artists and designers."

The Impact on Creative Expression

The implications of this evolution extend far beyond the tools themselves. In music, for example, composers are pioneering new approaches to sound design. "We're seeing musicians create compositions that exist in multiple harmonic states," says quantum music expert Dr. Lisa Wong. "They're developing a new language of musical expression."

In visual arts, quantum computing is enabling new forms of generative art. "We can now create works that evolve based on quantum states," explains digital art expert Dr. Michael Chang. "This is transforming how artists think about time, space, and viewer interaction."

The Future of Quantum Creativity

Looking ahead, the potential of quantum computing in creative industries is vast. "We're just beginning to understand what's possible," says Dr. Kim. "As these tools become more sophisticated, we'll see entirely new forms of creative expression emerge."

For creators like Dr. Patel, this evolution represents a fundamental shift in how we think about art and technology. "It's not about choosing between traditional and quantum approaches," she says. "It's about using quantum computing to expand our creative horizons." As quantum computing continues to evolve, it's clear that the future of creative expression will be increasingly complex, dynamic, and boundary-pushing.`,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Quantum computing lab with creative visualization"
  },
  {
    title: "The Quantum Creative Ecosystem",
    description: "How artists and technologists are building the future of quantum creativity",
    content: `The transformation of creative industries through quantum computing isn't just about individual tools—it's about how artists, technologists, and researchers are coming together to build a new ecosystem for quantum creativity.

The Creative Partnership

When QuantumCanvas first launched its artist-in-residence program, it brought together an unlikely mix of participants: quantum physicists, traditional artists, and digital creators. "We had to think deeply about how to bridge these different worlds," recalls Dr. Kim. "It's not just about giving artists access to quantum computers—it's about creating a shared language for quantum creativity."

This collaborative approach has led to innovative projects. "We're seeing artists use quantum computing to explore new creative possibilities," says Dr. Santos. "They might use quantum states to generate variations of their work, create interactive installations, or develop entirely new forms of expression."

The Professional Landscape

The evolution of quantum creativity is transforming how artists work and collaborate. "We're moving beyond the traditional studio model," explains Dr. Chen. "Artists can now work with quantum systems to create works that exist in multiple states simultaneously."

Take the case of Quantum Design Studio, a collaborative platform that connects artists with quantum computing resources. "Our users are creating works that would be impossible without quantum technology," says platform director Dr. James Wilson. "But the human element—the artistic vision and emotional depth—remains central to the process."

The Cultural Shift

This evolution is also changing how we think about art and technology. "We're seeing a cultural shift in how people view quantum art," says Dr. Wong. "It's no longer seen as purely technical—it's becoming a new medium for artistic expression."

Educational institutions are adapting to this shift. The Quantum Arts Academy, for example, offers programs that combine artistic training with quantum computing education. "Our students learn to think critically about both artistic and quantum concepts," says school director Dr. Maria Rodriguez. "They understand how to use quantum technology to enhance their creative vision."

The Future of Quantum Innovation

Looking ahead, the possibilities for quantum creativity are expanding. "We're just beginning to explore what's possible," says Dr. Kim. "As these tools and collaborations become more sophisticated, we'll see new forms of creative expression that we can't even imagine today."

For the creative community, this represents an exciting frontier. "We're not just adopting new tools," says Dr. Chen. "We're participating in the evolution of artistic expression itself." As this transformation continues, it's clear that the future of creativity will be increasingly quantum-enabled, collaborative, and innovative.`,
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2944&auto=format&fit=crop",
    imageAlt: "Artist working with quantum computing visualization"
  }
];

const relatedArticles = [
  {
    title: "The Renaissance of Digital Art: From AI to Traditional Techniques",
    date: "January 25, 2024",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop",
    slug: "/news/digital-art-renaissance",
    excerpt: "Discover how traditional artists are embracing digital tools and AI."
  },
  {
    title: "The Evolution of Digital Identity: Beyond Social Media in 2025",
    date: "January 15, 2024",
    image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/digital-identity-evolution",
    excerpt: "Discover how digital identity is evolving beyond social media profiles."
  },
  {
    title: "The Future of Digital Nomadism: Work-Life Integration in 2025",
    date: "February 5, 2024",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/digital-nomadism-future",
    excerpt: "Explore how digital nomadism is evolving beyond location independence."
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
            alt="Quantum computing lab with creative visualization"
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
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to News</span>
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-white/60">
                <span className="px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">
                  Technology & Art
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>14 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>February 10, 2024</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-light tracking-tighter">
                Quantum Computing and Creative Industries: The Next Frontier
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                Discover how quantum computing is revolutionizing creative industries. From quantum-generated art to new forms of musical expression, explore the cutting edge where technology meets creativity.
              </p>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop"
                    alt="Dr. Maya Patel"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">Dr. Maya Patel</div>
                    <div className="text-sm text-white/60">Quantum Arts Researcher</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <BookmarkPlus className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Content Sections */}
      <section className="py-24 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl space-y-24">
          {articleSections.map((section, index) => (
            <motion.article
              key={index}
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="space-y-4">
                <h2 className={styles.sectionTitle}>
                  {section.title}
                </h2>
                <p className={styles.sectionDescription}>
                  {section.description}
                </p>
              </div>

              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={section.image}
                  alt={section.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-8">
                {section.content.split("\n\n").map((paragraph, pIndex) => {
                  // Check if the paragraph is a heading (single line and relatively short)
                  if (paragraph.split("\n").length === 1 && paragraph.length < 100) {
                    return (
                      <h3 key={pIndex} className={styles.contentHeading}>
                        {paragraph}
                      </h3>
                    );
                  }
                  return (
                    <p key={pIndex} className={styles.contentParagraph}>
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

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
          {["Quantum Computing", "Creative Technology", "Digital Art", "Innovation", "Future of Art", "Technology"].map((tag) => (
            <span key={tag} className={styles.tagItem}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

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
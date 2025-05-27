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
    description: "How our online presence is transforming beyond social media in 2024",
    content: `In a Tokyo café, Yuki Tanaka opens her digital identity app, revealing a complex web of connections that extends far beyond her social media profiles. "My digital identity isn't just about what I post online anymore," she explains, showing how her professional credentials, creative portfolio, and personal interests are seamlessly integrated. "It's about how I exist and interact in the digital world."

This scene represents just one example of how digital identity is evolving beyond simple social media profiles. As we move through 2024, individuals are discovering new ways to express and manage their digital presence, creating more nuanced and authentic representations of themselves online.

The New Digital Self

The transformation of digital identity is being led by pioneers who understand both technology and human connection. "We're seeing a fundamental shift in how people approach their online presence," explains Dr. Marcus Chen, director of the Digital Identity Research Institute. "It's not just about curating a perfect profile—it's about creating authentic digital representations of ourselves."

Take the case of Digital Self, a platform that's helping people build comprehensive digital identities. "We're seeing users create truly integrated online personas," says platform founder Dr. Emily Wong. "They're not just managing separate profiles—they're building cohesive digital identities that reflect their full selves."

The Technology Behind Digital Identity

The evolution of digital identity is being driven by several key technological advances. "We've moved beyond simple profile management," explains digital identity expert Dr. Sarah Kim. "New technologies are enabling truly personalized and secure digital presence."

These technologies include advanced identity verification systems, decentralized identity platforms, and AI-powered personalization tools. "In the past, digital identity was often fragmented across different platforms," says Dr. Chen. "Now, we have tools that allow people to maintain consistent, secure identities across the digital landscape."

The Impact on Personal Expression

The implications of this evolution extend far beyond the tools themselves. In professional networking, for example, people are pioneering new approaches to digital presence. "We're seeing individuals create more authentic professional identities," says career development expert Dr. Lisa Park. "They're developing a holistic view of their digital footprint."

In creative expression, digital tools are enabling new forms of personal branding. "We can now create digital identities that evolve with us," explains digital media expert Dr. Michael Chang. "This is transforming how people think about their online presence."

The Future of Digital Identity

Looking ahead, the potential of evolved digital identity is vast. "We're just beginning to understand what's possible," says Dr. Kim. "As these tools become more sophisticated, we'll see entirely new forms of digital expression emerge."

For individuals like Yuki Tanaka, this evolution represents a fundamental shift in how we think about our digital presence. "It's not about choosing between different online personas," she says. "It's about creating a digital identity that authentically represents who we are." As digital identity continues to evolve, it's clear that the future of online presence will be increasingly personal, secure, and meaningful.`,
    image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Person managing their digital identity on a modern device"
  },
  {
    title: "The Human Side of Digital Identity",
    description: "How technology is helping us create more authentic online connections",
    content: `The transformation of digital identity isn't just about technology—it's about how we're using these tools to create more meaningful and authentic connections in the digital world.

The Social Connection

When Digital Self first launched its community features, it brought together an unlikely mix of users: professionals, creatives, and everyday people seeking more authentic online interactions. "We had to think deeply about how to facilitate genuine connections," recalls Dr. Wong. "It's not just about connecting profiles—it's about creating meaningful relationships."

This human-centered approach has led to innovative features. "We're seeing users form deeper connections through shared interests and experiences," says Dr. Kim. "They might collaborate on projects, share resources, or simply provide support to each other, creating a more authentic digital community."

The Professional Landscape

The evolution of digital identity is transforming how people present themselves professionally. "We're moving beyond the traditional resume model," explains Dr. Chen. "People can now build comprehensive professional identities that showcase their full range of skills and experiences."

Take the case of TechConnect, a professional platform that helps people build authentic digital identities. "Our users are creating professional presences that would be impossible without this technology," says platform director Dr. James Wilson. "But the human element—the authentic representation of who they are—remains central to the process."

The Cultural Shift

This evolution is also changing how we think about online presence. "We're seeing a cultural shift in how people view digital identity," says Dr. Park. "It's no longer just about maintaining separate profiles—it's about creating cohesive digital representations of ourselves."

Educational institutions are adapting to this shift. The Digital Identity Academy, for example, offers programs that help people develop authentic online presences. "Our students learn to think critically about their digital footprint," says school director Dr. Maria Rodriguez. "They understand how to use technology to express their authentic selves."

The Future of Digital Connection

Looking ahead, the possibilities for digital identity are expanding. "We're just beginning to explore what's possible," says Dr. Wong. "As these tools and communities become more sophisticated, we'll see new forms of digital connection that we can't even imagine today."

For the digital community, this represents an exciting frontier. "We're not just adopting new tools," says Dr. Chen. "We're participating in the evolution of how we connect and express ourselves online." As this transformation continues, it's clear that the future of digital identity will be increasingly authentic, meaningful, and human-centered.`,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Team collaborating on digital identity management"
  }
];

const relatedArticles = [
  {
    title: "The Future of Digital Nomadism: Work-Life Integration in 2025",
    date: "February 5, 2024",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/digital-nomadism-future",
    excerpt: "Explore how digital nomadism is evolving beyond location independence."
  },
  {
    title: "Quantum Computing and Creative Industries: The Next Frontier",
    date: "February 10, 2024",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/quantum-computing-creative",
    excerpt: "Discover how quantum computing is revolutionizing creative industries."
  },
  {
    title: "The Renaissance of Digital Art: From AI to Traditional Techniques",
    date: "January 25, 2024",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop",
    slug: "/news/digital-art-renaissance",
    excerpt: "Discover how traditional artists are embracing digital tools and AI."
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
            alt="Person managing their digital identity on a modern device"
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
                  Digital Identity
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>13 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>January 15, 2024</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-light tracking-tighter">
                The Evolution of Digital Identity: Beyond Social Media in 2025
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                Discover how digital identity is evolving beyond social media profiles. From authentic self-expression to secure digital presence, explore the new frontier of online identity.
              </p>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop"
                    alt="Dr. Marcus Chen"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">Dr. Marcus Chen</div>
                    <div className="text-sm text-white/60">Digital Identity Researcher</div>
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
          {["Digital Identity", "Social Media", "Online Presence", "Personal Branding", "Digital Privacy", "Technology"].map((tag) => (
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
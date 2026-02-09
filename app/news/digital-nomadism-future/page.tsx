"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles.module.css';

const articleSections = [
  {
    title: "The Future of Digital Nomadism",
    description: "How technology is reshaping work-life integration in 2024",
    content: `In a co-working space overlooking the beaches of Bali, Sarah Chen adjusts her dual monitors while her team in New York prepares for their morning standup. "Five years ago, this would have been impossible," she says, gesturing to her setup. "Now, I'm running a global team while maintaining the work-life balance I've always wanted."

This scene represents just one example of how digital nomadism is evolving beyond simple location independence. As we move through 2024, professionals are discovering new ways to integrate work and life, enabled by cutting-edge technology and changing workplace cultures.

The New Digital Nomad

The transformation of remote work is being led by professionals who understand both the opportunities and challenges of location-independent work. "We're seeing a fundamental shift in how people approach their careers," explains Dr. James Wilson, director of the Future of Work Institute. "It's not just about working from anywhere—it's about creating a lifestyle that integrates work and personal fulfillment."

Take the case of NomadOS, a platform that's helping digital nomads manage their global work-life. "We're seeing professionals create truly integrated lives," says platform founder Dr. Elena Santos. "They're not just working remotely—they're building careers that adapt to their desired lifestyle."

The Technology Enabling Global Work

The evolution of digital nomadism is being driven by several key technological advances. "We've moved beyond basic video conferencing," explains remote work expert Dr. Sarah Kim. "New technologies are enabling truly seamless global collaboration."

These technologies include advanced virtual reality workspaces, AI-powered productivity tools, and sophisticated digital nomad management platforms. "In the past, remote work was often seen as a compromise," says Dr. Wilson. "Now, we have tools that make distributed work more effective than traditional office environments."

The Impact on Work-Life Integration

The implications of this evolution extend far beyond the tools themselves. In corporate culture, for example, companies are pioneering new approaches to remote work. "We're seeing organizations develop truly global-first strategies," says workplace innovation expert Dr. Lisa Wong. "They're creating cultures that support both productivity and personal well-being."

In the professional landscape, digital tools are enabling new forms of career development. "We can now build careers that transcend geographical boundaries," explains career development expert Dr. Michael Chang. "This is transforming how people think about work and life."

The Future of Work

Looking ahead, the potential of this digital nomadism evolution is vast. "We're just beginning to understand what's possible," says Dr. Kim. "As these tools become more sophisticated, we'll see entirely new forms of work-life integration emerge."

For professionals like Sarah Chen, this evolution represents a fundamental shift in how we think about work. "It's not about choosing between career and lifestyle," she says. "It's about creating a life that integrates both seamlessly." As digital nomadism continues to evolve, it's clear that the future of work will be increasingly flexible, global, and personally fulfilling.`,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Digital nomad working in a modern co-working space"
  },
  {
    title: "The Digital Nomad Ecosystem",
    description: "How communities and technology are supporting the future of remote work",
    content: `The transformation of digital nomadism isn't just about individual professionals—it's about how communities and technology are coming together to support a new way of working and living.

The Rise of Nomad Communities

When NomadOS first launched its community platform, it brought together an unlikely mix of users: remote workers, entrepreneurs, and digital creators. "We had to think deeply about how to build meaningful connections in a distributed world," recalls Dr. Santos. "It's not just about finding a place to work—it's about creating a sense of belonging."

This community-focused approach has led to innovative features. "We're seeing nomads form deep connections across borders," says Dr. Kim. "They might collaborate on projects, share resources, or simply provide support to each other, creating a global network of like-minded professionals."

The Professional Landscape

The evolution of digital nomadism is transforming how professionals work and collaborate. "We're moving beyond the traditional office model," explains Dr. Wilson. "Professionals can now build careers that span multiple countries and cultures."

Take the case of GlobalWork, a professional platform that connects digital nomads with opportunities worldwide. "Our users are creating careers that would be impossible without this technology," says platform director Dr. James Chen. "But the human element—the community and support—remains central to the process."

The Cultural Shift

This evolution is also changing how we think about work and life. "We're seeing a cultural shift in how people view professional success," says Dr. Wong. "It's no longer just about climbing the corporate ladder—it's about creating a fulfilling life that includes meaningful work."

Educational institutions are adapting to this shift. The Global Digital Academy, for example, offers programs that prepare students for location-independent careers. "Our students learn to think globally while maintaining local connections," says school director Dr. Maria Rodriguez. "They understand how to build careers that transcend geographical boundaries."

The Future of Work-Life Integration

Looking ahead, the possibilities for digital nomadism are expanding. "We're just beginning to explore what's possible," says Dr. Santos. "As these tools and communities become more sophisticated, we'll see new forms of work-life integration that we can't even imagine today."

For the global professional community, this represents an exciting frontier. "We're not just adopting new tools," says Dr. Wilson. "We're participating in the evolution of work itself." As this transformation continues, it's clear that the future of work will be increasingly global, flexible, and personally fulfilling.`,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Digital nomads collaborating in a modern workspace"
  }
];

const relatedArticles = [
  {
    title: "The Evolution of Digital Identity: Beyond Social Media in 2025",
    date: "January 15, 2024",
    image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/digital-identity-evolution",
    excerpt: "Discover how digital identity is evolving beyond social media profiles."
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
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop"
            alt="Digital nomad working in a modern co-working space"
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
                  Future of Work
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>12 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>February 5, 2024</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-light tracking-tighter">
                The Future of Digital Nomadism: Work-Life Integration in 2025
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                Discover how digital nomadism is evolving beyond location independence. From global collaboration to work-life integration, explore the new frontier of professional life.
              </p>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div><div className="font-medium">Editor @ fiveroses</div>
                    <div className="text-sm text-white/60">Future of Work Researcher</div>
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
          {["Digital Nomadism", "Future of Work", "Remote Work", "Work-Life Balance", "Global Collaboration", "Professional Development"].map((tag) => (
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
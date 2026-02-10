"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles.module.css';

const articleSections = [
  {
    title: "The Renaissance of Digital Art",
    description: "How traditional artists are embracing digital tools and AI in 2024",
    content: `In a sunlit studio in Florence, Elena Rossi steps back from her canvas, but this isn't a traditional easel—it's a state-of-the-art digital display. "I started as a classical painter," she explains, gesturing to her traditional oil paintings lining the walls. "But when I discovered how digital tools could enhance my work, it opened up entirely new possibilities for artistic expression."

This scene represents just one example of how the art world is experiencing a renaissance, driven by the fusion of traditional techniques and cutting-edge digital technology. As we move through 2024, artists are discovering new ways to blend centuries-old methods with modern tools, creating works that bridge the gap between classical art and digital innovation.

The Traditional Artist's Digital Journey

The transformation of art in the digital age is being led by artists who understand both worlds. "We're seeing a fundamental shift in how artists approach their craft," explains Dr. Marco Bianchi, director of the Digital Arts Research Institute. "It's not about replacing traditional methods—it's about expanding the artist's toolkit."

Take the case of ArtFusion, a pioneering platform that's helping traditional artists embrace digital tools. "We're seeing artists create works that combine the depth of classical techniques with the possibilities of digital media," says platform founder Sofia Martinez. "The result is a new form of artistic expression that honors tradition while embracing innovation."

The Technology Behind the Art

The evolution of digital art is being driven by several key technological advances. "We've moved beyond simple digital painting tools," explains digital art expert Dr. Sarah Kim. "New technologies are enabling truly seamless integration of traditional and digital techniques."

These technologies include advanced AI-assisted creation tools, high-resolution digital canvases, and sophisticated color management systems. "In the past, digital art was often seen as separate from traditional art," says Dr. Bianchi. "Now, we have tools that allow artists to work fluidly between both worlds."

The Impact on Artistic Expression

The implications of this evolution extend far beyond the tools themselves. In education, for example, art schools are pioneering new approaches to teaching. "We're seeing students learn to think critically about both traditional and digital techniques," says educational technology innovator Dr. Lisa Wong. "They're developing a more holistic understanding of artistic expression."

In the art market, digital tools are enabling new forms of creation and distribution. "We can now create works that exist in both physical and digital forms," explains art market expert Dr. James Wilson. "This is transforming how artists connect with audiences and how art is experienced."

The Future of Artistic Creation

Looking ahead, the potential of this digital renaissance is vast. "We're just beginning to understand what's possible," says Dr. Kim. "As these tools become more sophisticated, we'll see entirely new forms of artistic expression emerge."

For artists like Elena Rossi, this evolution represents a fundamental shift in how we think about art. "It's not about choosing between traditional and digital," she says. "It's about using all available tools to express your vision." As the digital art renaissance continues to evolve, it's clear that the future of art will be increasingly fluid, innovative, and accessible.`,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop",
    imageAlt: "Artist working with digital and traditional tools in a modern studio"
  },
  {
    title: "The AI-Enhanced Studio",
    description: "How artificial intelligence is transforming artistic creation while preserving human creativity",
    content: `The transformation of art in the digital age isn't just about tools—it's about how artists are using technology to expand their creative horizons while maintaining the essential human element of artistic expression.

The Creative Partnership

When ArtFusion first launched its AI-assisted creation tools, it brought together an unlikely mix of users: traditional artists, digital creators, and AI researchers. "We had to think deeply about how AI could enhance human creativity without replacing it," recalls Martinez. "It's not about letting the AI create art—it's about using AI to expand what artists can do."

This human-centered approach has led to innovative features. "We're seeing artists use AI to explore new creative possibilities," says Dr. Kim. "They might use it to generate ideas, experiment with styles, or overcome technical limitations, but the artistic vision remains human."

The Professional Landscape

The evolution of digital art is transforming how artists work and collaborate. "We're moving beyond the traditional studio model," explains Dr. Bianchi. "Artists can now work seamlessly across physical and digital spaces, collaborating with others around the world."

Take the case of CreativeHub, a professional platform that connects artists with AI tools and collaborators. "Our users are creating works that would be impossible without this technology," says platform director Michael Chang. "But the human element—the artistic vision and emotional depth—remains central to the process."

The Cultural Shift

This evolution is also changing how we think about art and technology. "We're seeing a cultural shift in how people view digital art," says Dr. Wong. "It's no longer seen as separate from traditional art—it's becoming an integral part of the artistic landscape."

Educational institutions are adapting to this shift. The Florence Digital Arts Academy, for example, offers programs that combine traditional art education with digital tools. "Our students learn to think critically about both traditional and digital techniques," says school director Dr. Elena Santos. "They understand how to use technology to enhance their artistic vision."

The Future of Artistic Innovation

Looking ahead, the possibilities for digital art are expanding. "We're just beginning to explore what's possible," says Martinez. "As these tools become more sophisticated, we'll see new forms of artistic expression that we can't even imagine today."

For the art community, this represents an exciting frontier. "We're not just adopting new tools," says Dr. Bianchi. "We're participating in the evolution of artistic expression itself." As this renaissance continues, it's clear that the future of art will be increasingly rich, diverse, and innovative.`,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    imageAlt: "Artist collaborating with AI tools in a modern studio"
  }
];

const relatedArticles = [
  {
    title: "Quantum Computing and Creative Industries: The Next Frontier",
    date: "February 10, 2024",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/quantum-computing-creative",
    excerpt: "Discover how quantum computing is revolutionizing creative industries."
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
      <section className="relative h-[50vh] md:h-[80vh] w-full overflow-hidden">
        <motion.div
          ref={containerRef}
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 to-black/50 backdrop-blur-sm" />
          <Image
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop"
            alt="Artist working with digital and traditional tools in a modern studio"
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
              className="inline-flex items-center gap-2 text-white/60 hover:text-white active:text-neutral-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to News</span>
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-white/60">
                <span className="px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm">
                  Art & Technology
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>13 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>January 25, 2024</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-tighter">
                The Renaissance of Digital Art: From AI to Traditional Techniques
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                Discover how traditional artists are embracing digital tools and AI in 2024. From classical techniques to cutting-edge technology, explore the new frontier where art meets innovation.
              </p>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop"
                    alt="Dr. Marco Bianchi"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">Dr. Marco Bianchi</div>
                    <div className="text-sm text-white/60">Digital Arts Researcher</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-white/10 active:bg-white/15 rounded-full transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/10 active:bg-white/15 rounded-full transition-colors">
                    <BookmarkPlus className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/10 active:bg-white/15 rounded-full transition-colors">
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
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 rounded-full transition-colors touch-manipulation">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 rounded-full transition-colors touch-manipulation">
              <BookmarkPlus className="w-4 h-4" />
              Save
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 active:bg-white/15 rounded-full transition-colors touch-manipulation">
              <MessageCircle className="w-4 h-4" />
              Comment
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {["Digital Art", "Art & Technology", "AI in Art", "Creative Innovation", "Traditional Art", "Future of Art"].map((tag) => (
            <span key={tag} className={styles.tagItem}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Related Articles Section */}
      <section className="w-full py-12 md:py-24 px-4 md:px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <h2 className={styles.relatedTitle}>Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((article, index) => (
              <Link key={index} href={article.slug} className="group touch-manipulation">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-lg mb-4">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-100"
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
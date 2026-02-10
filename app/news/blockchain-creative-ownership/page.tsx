"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles.module.css';

const articleSections = [
  {
    title: "The Blockchain Revolution in Creative Rights",
    description: "How artists and creators are fighting back against digital piracy in the age of blockchain",
    content: `In a small studio in Berlin, digital artist Maria Chen watches as her latest artwork sells for €50,000. But unlike traditional art sales, this transaction happens entirely on the blockchain, with ownership rights, royalties, and provenance automatically recorded and enforced. "For the first time in my career," she says, "I feel truly in control of my work."

This scene is becoming increasingly common across the creative industries. As digital content becomes easier to copy and distribute, artists and creators have long struggled to protect their work and receive fair compensation. But a quiet revolution is underway, powered by blockchain technology, and it's transforming how we think about creative ownership in the digital age.

The Artist's Dilemma

For decades, digital creators have faced a fundamental challenge: how to protect their work in a world where copying is as simple as pressing Ctrl+C. Traditional copyright systems, designed for physical media, have proven woefully inadequate in the digital landscape. "I've had my work stolen and reposted thousands of times," says Chen. "Each time, it felt like a piece of me was being taken without permission."

Enter blockchain technology. By creating an immutable, transparent ledger of ownership and rights, blockchain offers creators something they've never had before: verifiable proof of ownership and automated enforcement of their rights. "It's like having a digital notary that never sleeps," explains Dr. Sophia Martinez, a technology analyst specializing in creative rights.

The Rise of Smart Contracts

The real game-changer, however, has been the emergence of smart contracts. These self-executing agreements, written in code and stored on the blockchain, have opened up new possibilities for creative rights management. Take the case of independent musician James Rodriguez, who recently released his album as a blockchain-based asset.

"Every time my song is played or used, the smart contract automatically handles the licensing and payment," Rodriguez explains. "I don't need to chase down royalties or worry about unauthorized use. The system handles it all."

This automation is particularly crucial for independent creators who lack the resources to enforce their rights through traditional means. "We're seeing a democratization of creative rights," says Martinez. "Small creators now have access to the same level of protection as major studios."

The Social Impact

The implications extend far beyond individual creators. Across the globe, blockchain is fostering new forms of creative communities and collaboration. In Tokyo, a collective of digital artists has formed a Decentralized Autonomous Organization (DAO) to manage their shared intellectual property. "We're not just protecting our work," says collective member Yuki Tanaka. "We're building a new way of creating and sharing art."

These communities are experimenting with innovative models of ownership and compensation. Some are using blockchain to create fractional ownership of creative works, allowing fans to invest in their favorite artists. Others are developing new forms of collaborative creation, where multiple artists can contribute to a piece while maintaining clear rights and revenue sharing.

The Future of Creative Rights

Looking ahead, the landscape of creative rights is poised for even more dramatic changes. Major platforms are beginning to integrate blockchain-based rights management, while governments are exploring regulatory frameworks for this new paradigm. "We're at a pivotal moment," says Martinez. "The technology exists to create a fairer, more transparent system for creative rights. The question is how we implement it."

For creators like Chen, the future can't come soon enough. "This isn't just about protecting our work," she says. "It's about creating a sustainable ecosystem where creativity can thrive in the digital age." As blockchain technology continues to evolve, it's clear that the way we think about, protect, and value creative work is changing forever.`,
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2944&auto=format&fit=crop",
    imageAlt: "Digital artist working in a modern studio, representing the intersection of creativity and technology"
  },
  {
    title: "The Human Side of Digital Rights",
    description: "Stories from the front lines of the blockchain revolution in creative industries",
    content: `The impact of blockchain on creative rights isn't just about technology—it's about people. Across the creative industries, from music to visual arts, from literature to digital media, real stories are emerging of how this technology is changing lives and careers.

The Music Industry's Transformation

When Sarah Johnson, an independent musician from London, first heard about blockchain-based music rights, she was skeptical. "I'd been burned so many times by streaming platforms and unauthorized use of my music," she says. "I didn't believe anything could change."

That changed when she released her latest album using a blockchain platform. "For the first time, I could see exactly where my music was being used, who was listening, and I was getting paid automatically," Johnson explains. "It's not just about the money—it's about the respect for my work."

The impact extends beyond individual artists. Major labels are taking notice, with several launching blockchain-based rights management systems. "We're seeing a fundamental shift in how the industry operates," says industry analyst Michael Chen. "It's not just about protecting rights anymore—it's about creating new opportunities for artists."

The Art World's Digital Renaissance

In the visual arts, blockchain is enabling a renaissance of digital creativity. Take the case of the Digital Art Collective, a group of artists who have created a blockchain-based platform for digital art. "We're not just selling art," says collective founder David Park. "We're creating a new ecosystem for digital creativity."

Their platform has helped artists like Maria Chen achieve unprecedented success. "I can now create limited editions of my digital art, with each piece uniquely verified on the blockchain," Chen explains. "Collectors know they're getting something authentic, and I maintain control over how my work is used."

The Publishing Revolution

The publishing industry is also undergoing a transformation. Independent author Emma Thompson recently published her novel using a blockchain platform that automatically handles rights and royalties. "The traditional publishing model was broken for most authors," she says. "Blockchain gives us a way to take control of our work and connect directly with readers."

Her platform allows readers to purchase not just the book, but also various rights to use the content—from personal reading to adaptation rights. "It's creating a more transparent and fair system for everyone involved," Thompson explains.

The Road Ahead

As these technologies mature, the creative industries are facing both challenges and opportunities. "There's a learning curve," admits Martinez. "But the potential is enormous. We're not just talking about protecting rights—we're talking about reimagining how creative work is valued and shared."

For creators like Johnson, Chen, and Thompson, the future looks bright. "This isn't just about technology," says Johnson. "It's about creating a world where creativity is properly valued and protected. That's something worth fighting for."

As blockchain technology continues to evolve, these stories of transformation and empowerment are becoming more common. The revolution in creative rights isn't just changing how we protect creative work—it's changing how we think about creativity itself.`,
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2942&auto=format&fit=crop",
    imageAlt: "A diverse group of creators collaborating in a modern workspace, symbolizing the new era of digital rights"
  }
];

const relatedArticles = [
  {
    title: "The Renaissance of Digital Art: From AI to Traditional Techniques",
    date: "January 25, 2024",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop",
    slug: "/news/digital-art-renaissance",
    excerpt: "Discover how traditional artists are embracing digital tools and AI in 2024."
  },
  {
    title: "Quantum Computing and Creative Industries: The Next Frontier",
    date: "February 10, 2024",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/quantum-computing-creative",
    excerpt: "Explore how quantum computing is revolutionizing creative industries in 2025."
  },
  {
    title: "The Evolution of Digital Identity: Beyond Social Media in 2025",
    date: "February 15, 2024",
    image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/digital-identity-evolution",
    excerpt: "Discover how digital identity is evolving beyond social media profiles."
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
            src="https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2944&auto=format&fit=crop"
            alt="Abstract representation of blockchain technology and digital rights"
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
                  Technology & Innovation
                </span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>11 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>February 20, 2024</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-6xl font-light tracking-tighter">
                Blockchain and Creative Ownership: The New Era of Digital Rights
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                Explore how blockchain technology is revolutionizing creative ownership and intellectual property rights in the digital age. From NFTs to smart contracts, discover how artists and creators are leveraging blockchain to protect and monetize their work in unprecedented ways.
              </p>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div><div className="font-medium">Editor @ fiveroses</div>
                    <div className="text-sm text-white/60">Technology Analyst</div>
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
                  // Check if the paragraph is a heading (no ## prefix anymore)
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

      {/* Related Articles */}
      <section className="py-24 px-4 md:px-8 bg-white/5">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-light tracking-tighter mb-12">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((article, index) => (
              <motion.article
                key={article.slug}
                className="group touch-manipulation"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={article.slug} className="block space-y-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-white/60">
                      {article.date}
                    </div>
                    <h3 className="text-xl font-light tracking-tight group-hover:text-white active:text-neutral-200/80 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-white/60 text-sm font-light">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="py-12 px-4 md:px-8 border-t border-white/10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <Tag className="w-5 h-5 text-white/60" />
            <div className="flex flex-wrap gap-2">
              {["Blockchain", "Digital Rights", "NFTs", "Creative Economy"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-white/20 z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </main>
  );
} 
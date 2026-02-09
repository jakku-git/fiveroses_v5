"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import { Clock } from "lucide-react";

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  content: string;
  readTime: number;
  author: {
    name: string;
    image: string;
  };
  date: string;
  tags: string[];
}

const featuredArticle: Article = {
  id: "future-of-digital-marketing",
  slug: "future-of-digital-marketing",
  title: "The Future of Digital Marketing in 2025",
  category: "Marketing",
  image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2940&auto=format&fit=crop",
  content: "Explore the key trends and technologies that will define digital marketing in the coming years. From AI-powered personalization to immersive experiences...",
  readTime: 8,
  author: {
    name: "Editor @ fiveroses",
    image: "",
  },
  date: "June 15, 2023",
  tags: ["Digital Marketing", "AI", "Technology", "Strategy"]
};

export const allArticles: Article[] = [
  {
    id: "blockchain-creative-ownership",
    slug: "blockchain-creative-ownership",
    title: "Blockchain and Creative Ownership: The New Era of Digital Rights",
    category: "Technology & Innovation",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2944&auto=format&fit=crop",
    content: "Explore how blockchain technology is revolutionizing creative ownership and intellectual property rights in the digital age. From NFTs to smart contracts, discover how artists and creators are leveraging blockchain to protect and monetize their work in unprecedented ways.",
    readTime: 11,
    author: {
      name: "Editor @ fiveroses",
      image: "",
    },
    date: "February 20, 2024",
    tags: ["Blockchain", "Digital Rights", "NFTs", "Creative Economy"]
  },
  {
    id: "digital-wellness-psychology",
    slug: "digital-wellness-psychology",
    title: "The Psychology of Digital Wellness: Balancing Technology and Mental Health",
    category: "Health & Technology",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2999&auto=format&fit=crop",
    content: "Explore how digital platforms are adapting to promote mental wellness in 2024. From AI-powered wellness tools to mindful technology use, discover the latest innovations in digital mental health support.",
    readTime: 12,
    author: {
      name: "Editor @ fiveroses",
      image: "",
    },
    date: "January 20, 2024",
    tags: ["Digital Wellness", "Mental Health", "Technology", "Psychology"]
  },
  {
    id: "digital-art-renaissance",
    slug: "digital-art-renaissance",
    title: "The Renaissance of Digital Art: From AI to Traditional Techniques",
    category: "Art & Technology",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop",
    content: "Discover how traditional artists are embracing digital tools and AI in 2024. From the fusion of classical techniques with cutting-edge technology to the evolution of digital art markets, explore the new frontier of artistic expression.",
    readTime: 10,
    author: {
      name: "Editor @ fiveroses",
      image: "",
    },
    date: "January 25, 2024",
    tags: ["Digital Art", "AI", "Creativity", "Innovation"]
  },
  {
    id: "digital-nomadism-future",
    slug: "digital-nomadism-future",
    title: "The Future of Digital Nomadism: Work-Life Integration in 2025",
    category: "Future of Work",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop",
    content: "Explore how digital nomadism is evolving beyond location independence to reshape work-life integration in 2025. From global work hubs to sustainable living practices, discover the new frontier of remote work and community building.",
    readTime: 12,
    author: {
      name: "Editor @ fiveroses",
      image: "",
    },
    date: "February 5, 2024",
    tags: ["Digital Nomadism", "Remote Work", "Future of Work", "Technology"]
  },
  {
    id: "quantum-computing-creative",
    slug: "quantum-computing-creative",
    title: "Quantum Computing and Creative Industries: The Next Frontier",
    category: "Technology & Creativity",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2940&auto=format&fit=crop",
    content: "Discover how quantum computing is revolutionizing creative industries in 2025. From quantum-powered generative art to advanced design optimization, explore the new frontier where technology meets creativity.",
    readTime: 15,
    author: {
      name: "Editor @ fiveroses",
      image: "",
    },
    date: "February 10, 2024",
    tags: ["Quantum Computing", "Creative Technology", "Innovation", "Art"]
  },
  {
    id: "digital-identity-evolution",
    slug: "digital-identity-evolution",
    title: "The Evolution of Digital Identity: Beyond Social Media in 2025",
    category: "Digital Identity",
    image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2940&auto=format&fit=crop",
    content: "Discover how digital identity is evolving beyond social media profiles to encompass privacy, security, and self-sovereignty. From decentralized identity systems to digital reputation management, explore the new frontier of personal digital presence.",
    readTime: 12,
    author: {
      name: "Editor @ fiveroses",
      image: "",
    },
    date: "February 15, 2024",
    tags: ["Digital Identity", "Privacy", "Technology", "Security"]
  },
  {
    id: "future-of-digital-marketing",
    slug: "future-of-digital-marketing",
    title: "The Future of Digital Marketing in 2025",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2940&auto=format&fit=crop",
    content: "Explore the key trends and technologies that will define digital marketing in the coming years. From AI-powered personalization to immersive experiences, discover how leading brands are adapting to the changing digital landscape.",
    readTime: 8,
    author: {
      name: "Sarah Chen",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
    },
    date: "June 15, 2023",
    tags: ["Digital Marketing", "AI", "Technology", "Strategy"]
  },
  {
    id: "ai-content-creation",
    slug: "ai-content-creation",
    title: "How AI is Transforming Content Creation",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2938&auto=format&fit=crop",
    content: "Discover how artificial intelligence is revolutionizing the way we create and distribute content. Learn about the latest tools and techniques that are reshaping content creation across industries.",
    readTime: 6,
    author: {
      name: "Editor @ fiveroses",
      image: "",
    },
    date: "May 28, 2023",
    tags: ["AI", "Content Creation", "Technology", "Innovation"]
  },
  {
    id: "web-design-future",
    slug: "web-design-future",
    title: "The Future of Web Design",
    category: "Design",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2864&auto=format&fit=crop",
    content: "Explore the cutting-edge trends and technologies that are revolutionizing web design. From AI-powered tools to immersive experiences, discover what's shaping the future of web design.",
    readTime: 7,
    author: {
      name: "Editor @ fiveroses",
      image: "",
    },
    date: "March 15, 2023",
    tags: ["Web Design", "UX", "Technology", "Innovation"]
  },
  {
    id: "video-marketing-future",
    slug: "video-marketing-future",
    title: "The Future of Video Marketing: Trends and Strategies for 2025",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2871&auto=format&fit=crop",
    content: "As video content continues to dominate digital marketing, brands must adapt to emerging trends and technologies. From AI-powered personalization to immersive experiences, discover how leading companies are leveraging video marketing to drive engagement and ROI.",
    readTime: 10,
    author: {
      name: "Editor @ fiveroses",
      image: "",
    },
    date: "April 22, 2023",
    tags: ["Video Marketing", "Content Strategy", "Digital Marketing", "Innovation"]
  }
];

export default function NewsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Hero section animations
  const heroOpacity = useTransform(progress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(progress, [0, 0.3], [1, 1.2]);
  const heroY = useTransform(progress, [0, 0.3], [0, -100]);

  // Featured section animations
  const featuredOpacity = useTransform(progress, [0.2, 0.4], [0, 1]);
  const featuredY = useTransform(progress, [0.2, 0.4], [100, 0]);
  const featuredScale = useTransform(progress, [0.2, 0.4], [0.8, 1]);

  // Latest section animations
  const latestOpacity = useTransform(progress, [0.5, 0.7], [0, 1]);
  const latestY = useTransform(progress, [0.5, 0.7], [100, 0]);
  const latestScale = useTransform(progress, [0.5, 0.7], [0.8, 1]);

  // Background parallax effect
  const bgY = useTransform(progress, [0, 1], ['0%', '50%']);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        className="fixed inset-0 z-0 opacity-20"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_var(--tw-gradient-stops))] from-black via-transparent to-black" />
      </motion.div>

      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center"
        style={{ 
          opacity: heroOpacity,
          y: heroY,
          scale: heroScale
        }}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: heroScale }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://pub-d61a91ac755d41e3ab46bfa8c91179ce.r2.dev/heronews.webm" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
        </motion.div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1 
              className="text-4xl md:text-7xl font-light tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Inside the Studio
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              News, insights, and stories from our creative journey
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Articles Section */}
      <motion.section 
        className="relative py-24 px-4 md:px-8"
        style={{ 
          opacity: featuredOpacity,
          y: featuredY,
          scale: featuredScale
        }}
      >
        <div className="w-full">
          <motion.h2 
            className="text-3xl md:text-4xl font-light tracking-tighter mb-16 px-4 md:px-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Featured Stories
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {allArticles
              .filter(article => 
                article.slug === 'blockchain-creative-ownership' ||
                article.slug === 'quantum-computing-creative' ||
                article.slug === 'video-marketing-future'
              )
              .map((article) => (
                <motion.article
                  key={article.id}
                  className={`${styles.articleCard} h-full`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Link href={`/news/${article.slug}`} className="block h-full">
                    <div className={`${styles.cardImageContainer} aspect-[16/9]`}>
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className={styles.cardImage}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                      <div className={styles.cardHoverEffect} />
                    </div>
                    
                    <div className={`${styles.cardContent} p-8`}>
                      <div className={styles.cardMeta}>
                        <span className={styles.cardCategory}>{article.category}</span>
                        <span className={styles.cardReadTime}>
                          <Clock className="w-4 h-4" />
                          {article.readTime} min read
                        </span>
                      </div>

                      <h3 className={`${styles.cardTitle} text-2xl md:text-3xl mt-6 mb-4`}>{article.title}</h3>
                      
                      <p className={`${styles.cardExcerpt} text-base md:text-lg`}>
                        {article.content.split('\n')[0]}
                      </p>

                      <div className={`${styles.cardFooter} mt-8`}>
                        <div className={styles.cardAuthor}>
                          <span className={`${styles.cardAuthorName} text-base`}>{article.author.name}</span>
                        </div>
                        <span className={`${styles.cardDate} text-sm`}>
                          {new Date(article.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
          </div>
        </div>
      </motion.section>

      {/* Latest Articles Section */}
      <motion.section 
        className="relative py-24 px-4 md:px-8 bg-black"
        style={{ 
          opacity: latestOpacity,
          y: latestY,
          scale: latestScale
        }}
      >
        <div className="w-full">
          <motion.h2 
            className="text-3xl md:text-4xl font-light tracking-tighter mb-16 px-4 md:px-8 text-white"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            Latest Updates
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {allArticles.map((article, index) => (
              <motion.article
                key={article.id}
                className={`group relative ${index !== allArticles.length - 1 && index !== allArticles.length - 2 ? 'border-b border-white/[0.08] pb-12 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/[0.08] after:to-transparent' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/news/${article.slug}`} className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-48 aspect-[16/9] md:aspect-square flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between p-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm tracking-wide text-white/50 uppercase">
                        <span className="font-medium">{article.category}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>{article.readTime} min read</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-light tracking-tight text-white group-hover:text-white/80 transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-base text-white/60 font-light leading-relaxed">
                        {article.content.slice(0, 100)}...
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-3 text-sm text-white/40">
                      <span className="font-medium">{article.author.name}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <time>{new Date(article.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</time>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-white/20 z-50"
        style={{ scaleX: progress }}
      />
    </main>
  );
}


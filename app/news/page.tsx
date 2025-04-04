"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import CaseStudyCard from "@/components/ui/case-study-card";

export interface Article {
  id: string;
  title: string;
  category: string;
  image: string;
  logo?: string;
  link?: string;
  type?: "content" | "simple-image";
  content: string;
  readTime: string;
  author: string;
  authorImage: string;
  date: string;
  tags: string[];
}

const featuredArticle: Article = {
  id: "future-of-digital-marketing",
  title: "The Future of Digital Marketing in 2025",
  category: "Marketing",
  image: "https://images.unsplash.com/photo-1675285410608-ddd6bb430b19?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  logo: "https://plus.unsplash.com/premium_photo-1686593923007-218c4db786ca?q=80&w=3095&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  content: "The digital marketing landscape is evolving rapidly. In this article, we explore the key trends and technologies that will shape the industry in 2025...",
  readTime: "5 min read",
  author: "Sarah Johnson",
  authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  date: "June 15, 2023",
  tags: ["Digital Marketing", "Future Trends", "Technology"]
};

export const allArticles: Article[] = [
  {
    id: "ai-content-creation",
    title: "How AI is Transforming Content Creation",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1675285410608-ddd6bb430b19?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    logo: "https://plus.unsplash.com/premium_photo-1686593923007-218c4db786ca?q=80&w=3095&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Artificial Intelligence is revolutionizing the way we create content. From automated writing to personalized recommendations, AI is changing the game...",
    readTime: "4 min read",
    author: "Michael Chen",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1e7220ab79?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "May 28, 2023",
    tags: ["AI", "Content Creation", "Technology"]
  },
  {
    id: "sustainable-branding",
    title: "Building a Sustainable Brand in 2023",
    category: "Business",
    image: "https://images.unsplash.com/photo-1675285410608-ddd6bb430b19?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    logo: "https://plus.unsplash.com/premium_photo-1686593923007-218c4db786ca?q=80&w=3095&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Sustainability is no longer just a trend - it's a business imperative. Learn how to build a brand that resonates with eco-conscious consumers...",
    readTime: "6 min read",
    author: "Emma Wilson",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "May 15, 2023",
    tags: ["Sustainability", "Branding", "Business"]
  },
  {
    id: "video-marketing",
    title: "The Power of Video Marketing",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1675285410608-ddd6bb430b19?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    logo: "https://plus.unsplash.com/premium_photo-1686593923007-218c4db786ca?q=80&w=3095&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Video content continues to dominate the digital landscape. Discover how to leverage video marketing to engage your audience and drive results...",
    readTime: "5 min read",
    author: "David Lee",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "April 22, 2023",
    tags: ["Video Marketing", "Content Strategy", "Digital Marketing"]
  },
  {
    id: "social-media-trends",
    title: "Social Media Trends to Watch",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1675285410608-ddd6bb430b19?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    logo: "https://plus.unsplash.com/premium_photo-1686593923007-218c4db786ca?q=80&w=3095&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Stay ahead of the curve with these emerging social media trends. From new platforms to evolving algorithms, here's what you need to know...",
    readTime: "4 min read",
    author: "Lisa Chen",
    authorImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "April 15, 2023",
    tags: ["Social Media", "Trends", "Marketing"]
  },
  {
    id: "ecommerce-optimization",
    title: "E-commerce Optimization Strategies",
    category: "Business",
    image: "https://images.unsplash.com/photo-1675285410608-ddd6bb430b19?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    logo: "https://plus.unsplash.com/premium_photo-1686593923007-218c4db786ca?q=80&w=3095&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Maximize your e-commerce success with these proven optimization strategies. From conversion rate optimization to customer experience...",
    readTime: "7 min read",
    author: "James Wilson",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1e7220ab79?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "March 28, 2023",
    tags: ["E-commerce", "Optimization", "Business"]
  },
  {
    id: "web-design-future",
    title: "The Future of Web Design",
    category: "Design",
    image: "https://images.unsplash.com/photo-1675285410608-ddd6bb430b19?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    logo: "https://plus.unsplash.com/premium_photo-1686593923007-218c4db786ca?q=80&w=3095&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: "Web design is evolving at a rapid pace. Explore the latest trends and technologies that are shaping the future of digital experiences...",
    readTime: "5 min read",
    author: "Alex Thompson",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "March 15, 2023",
    tags: ["Web Design", "UI/UX", "Technology"]
  }
];

export default function NewsPage() {
  const lenis = useLenis();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section with 3D Text */}
      <section className="relative h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-7xl md:text-9xl font-bold tracking-tighter mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400"
          >
            News & Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto tracking-wide px-4 md:px-0"
          >
            Stay updated with the latest news, insights, and case studies from fiveroses.
          </motion.p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="px-4 md:px-8 py-12 md:py-24">
        <div className="max-w-7xl mx-auto">
          <CaseStudyCard
            title={featuredArticle.title}
            category={featuredArticle.category}
            image={featuredArticle.image}
            link={`/news/${featuredArticle.id}`}
            logo={featuredArticle.logo}
          />
        </div>
      </section>

      {/* News Grid */}
      <section className="px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {allArticles.map((article) => (
              <CaseStudyCard
                key={article.id}
                title={article.title}
                category={article.category}
                image={article.image}
                link={`/news/${article.id}`}
                logo={article.logo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 md:px-8 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Subscribe to Our Newsletter
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-300 mb-8 tracking-wide"
          >
            Stay updated with the latest news, insights, and case studies from fiveroses.
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl focus:border-rose-500/50 focus:outline-none text-white"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-rose-500 text-white rounded-2xl hover:bg-rose-600 transition-colors"
            >
              Subscribe
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}


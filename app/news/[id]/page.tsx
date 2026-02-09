"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { Article, allArticles } from "../page";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  // Convert the URL slug back to the article ID format
  const articleId = params.id.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
  
  const article = allArticles.find((a: Article) => 
    a.id.toLowerCase().replace(/\s+/g, '-') === params.id
  )

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0, 0]);

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-light tracking-tighter">Article not found</h1>
          <Link 
            href="/news" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

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
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>

        <motion.div 
          className="relative z-10 container mx-auto px-4 md:px-8 h-full flex items-end pb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl space-y-6">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to News</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="px-4 py-1.5 bg-rose-500/20 text-rose-400 rounded-full text-sm font-medium tracking-wider">
                {article.category}
              </span>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-500/20">
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{article.author}</p>
                  <p className="text-xs text-neutral-400">{article.date}</p>
                </div>
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
          <div className="prose prose-invert prose-lg max-w-none">
            {article.content.split("\n\n").map((paragraph: string, index: number) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <motion.h2
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mt-12 mb-6"
                  >
                    {paragraph.replace("## ", "")}
                  </motion.h2>
                );
              }
              return (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-neutral-300 leading-relaxed mb-6"
                >
                  {paragraph}
                </motion.p>
              );
            })}
          </div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-neutral-800"
          >
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-medium">Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-neutral-900/50 text-neutral-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
} 
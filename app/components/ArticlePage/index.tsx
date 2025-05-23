'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.css'

interface ArticleSection {
  title: string
  description: string
  content: string
  image: {
    url: string
    alt: string
  }
}

interface RelatedArticle {
  title: string
  date: string
  image: string
  slug: string
  excerpt: string
}

interface ArticlePageProps {
  title: string
  description: string
  author: string
  authorImage: string
  date: string
  readTime: string
  category: string
  heroImage: string
  sections: ArticleSection[]
  relatedArticles: RelatedArticle[]
  tags: string[]
}

export default function ArticlePage({
  title,
  description,
  author,
  authorImage,
  date,
  readTime,
  category,
  heroImage,
  sections,
  relatedArticles,
  tags
}: ArticlePageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Parallax effect for hero image
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1])

  // Content animations
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.2, 0.4], [50, 0])

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, scale: heroScale }}
        >
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
              {category}
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-tighter">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light">
              {description}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Image
                  src={authorImage}
                  alt={author}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>{author}</span>
              </div>
              <span>•</span>
              <span>{date}</span>
              <span>•</span>
              <span>{readTime}</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div 
              className="w-1 h-2 bg-white/50 rounded-full mt-2"
              animate={{ scaleY: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Content Sections */}
      <motion.section 
        className="relative py-24 px-4 md:px-6"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-4xl mx-auto space-y-24">
          {sections.map((section, index) => (
            <motion.article
              key={index}
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-light tracking-tight">
                  {section.title}
                </h2>
                <p className="text-lg text-white/60 font-light">
                  {section.description}
                </p>
              </div>

              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={section.image.url}
                  alt={section.image.alt}
                  fill
                  className="object-cover"
                />
              </div>

              <div 
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* Related Articles */}
      <section className="py-24 px-4 md:px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light tracking-tighter mb-12">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((article, index) => (
              <motion.article
                key={article.slug}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/news/${article.slug}`} className="block space-y-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-white/60">
                      {article.date}
                    </div>
                    <h3 className="text-xl font-light tracking-tight group-hover:text-white/80 transition-colors">
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
      <section className="py-12 px-4 md:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-white/20 z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </main>
  )
} 
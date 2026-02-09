"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles.module.css';

const articleSections = [
  {
    title: "The Digital Wellness Revolution",
    description: "How technology is reshaping our relationship with mental health in the digital age",
    content: `In a quiet corner of a bustling tech startup in San Francisco, Sarah Thompson, a 28-year-old software engineer, takes a deep breath and opens her digital wellness app. "Five years ago, I was on the brink of burnout," she says, scrolling through her daily mindfulness metrics. "Now, this technology helps me maintain my mental health while staying productive in a demanding industry."

Sarah's story is becoming increasingly common in our hyperconnected world. As digital technology becomes more pervasive, the line between our online and offline lives continues to blur, creating new challenges for mental health professionals and technology developers alike. But a new wave of digital wellness solutions is emerging, combining cutting-edge technology with evidence-based psychological practices to help people navigate this complex landscape.

The Digital Mental Health Crisis

The statistics paint a concerning picture. According to the World Health Organization, depression and anxiety disorders have increased by 25% globally since the start of the pandemic, with digital technology playing a significant role in this rise. "We're seeing a perfect storm of factors," explains Dr. Emily Chen, a leading researcher in digital mental health at Stanford University. "Constant connectivity, social media pressure, and the blurring of work-life boundaries are creating unprecedented challenges for mental wellness."

The impact is particularly acute among young professionals like Thompson. "I found myself checking emails at 2 AM, constantly comparing my life to curated social media posts, and feeling guilty for not being 'always on,'" she recalls. "It took a serious anxiety attack to make me realize something needed to change."

The Rise of AI-Powered Wellness

The solution, ironically, is coming from the same technology that contributed to the problem. Artificial intelligence is revolutionizing how we approach mental health in the digital age. Take MindfulAI, a platform developed by a team of psychologists and machine learning experts. "We're using AI to create personalized wellness interventions," says Dr. Chen, who serves as the platform's chief scientific advisor. "The system learns from user behavior patterns to provide timely, contextual support."

The platform's approach is innovative: instead of simply tracking screen time, it analyzes patterns in digital behavior to identify potential stress triggers. "We look at factors like typing speed, app usage patterns, and even the time between messages," explains Dr. Chen. "These subtle indicators can reveal a lot about a person's mental state."

The Human Element in Digital Care

But technology alone isn't the answer. The most successful digital wellness solutions combine AI with human expertise. At the Digital Wellness Institute in London, therapists work alongside AI systems to provide hybrid care. "The AI handles routine monitoring and initial interventions," says Dr. James Wilson, the institute's director. "But human therapists step in when deeper support is needed."

This hybrid approach has shown remarkable results. A recent study published in the Journal of Digital Health found that participants using AI-assisted therapy showed a 40% greater improvement in anxiety symptoms compared to traditional therapy alone. "It's not about replacing human connection," emphasizes Dr. Wilson. "It's about enhancing it with technology."

The Future of Digital Wellness

Looking ahead, the field of digital wellness is poised for significant evolution. "We're moving beyond simple screen time tracking," says Dr. Chen. "The next generation of digital wellness tools will be proactive rather than reactive, using predictive analytics to prevent mental health issues before they arise."

For professionals like Thompson, this evolution can't come soon enough. "I'm excited about the future," she says. "Technology helped create these challenges, but it's also giving us the tools to overcome them." As digital wellness solutions continue to evolve, they're not just changing how we manage mental health—they're redefining our relationship with technology itself.`,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2999&auto=format&fit=crop",
    imageAlt: "A person practicing mindfulness with a digital wellness app, representing the intersection of technology and mental health"
  },
  {
    title: "The Science Behind Digital Wellness",
    description: "How research is shaping the future of mental health technology",
    content: `The intersection of technology and mental health is more than just a trend—it's a rapidly evolving field of scientific research. Across the globe, researchers are working to understand how digital tools can best support mental wellness in our connected world.

The Research Revolution

At the forefront of this research is the Digital Mental Health Lab at Stanford University. "We're seeing a paradigm shift in how we approach mental health," says Dr. Chen. "Traditional methods of therapy and wellness support are being augmented by digital tools that can provide real-time, personalized interventions."

The lab's recent study on AI-assisted therapy, published in Nature Digital Medicine, revealed fascinating insights. "We found that AI systems could identify patterns in user behavior that even experienced therapists might miss," explains Dr. Chen. "For example, subtle changes in typing patterns or app usage could indicate the early stages of anxiety or depression."

The Technology Behind the Science

The technology driving these advances is sophisticated yet accessible. Machine learning algorithms analyze vast amounts of data to identify patterns and predict potential mental health challenges. "It's like having a digital wellness coach that learns and adapts to your specific needs," says Dr. Wilson.

But the technology is only as good as the science behind it. "We're constantly refining our algorithms based on new research," explains Dr. Chen. "Every interaction, every piece of feedback helps us improve the system."

The Impact on Society

The implications of this research extend far beyond individual wellness. Companies are beginning to integrate digital wellness tools into their workplace wellness programs. "We're seeing a cultural shift," says Dr. Wilson. "Mental health is becoming a priority in the workplace, and technology is making it easier to provide support."

This shift is particularly important for younger generations, who have grown up in a digital world. "They're more comfortable with technology-assisted wellness," notes Dr. Chen. "But they also have higher expectations for how these tools should work."

The Road Ahead

As research continues, the future of digital wellness looks increasingly promising. "We're moving toward a more holistic approach," says Dr. Wilson. "It's not just about managing screen time or tracking mood—it's about creating a sustainable relationship with technology that supports overall wellbeing."

For researchers like Dr. Chen, the work is just beginning. "Every day, we're learning more about how technology can support mental health," she says. "The potential is enormous, and we're only scratching the surface."

As digital wellness technology continues to evolve, one thing is clear: the future of mental health support will be increasingly digital, increasingly personalized, and increasingly effective. The challenge now is to ensure these advances benefit everyone, creating a more mentally healthy digital world for all.`,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop",
    imageAlt: "Researchers analyzing digital wellness data in a modern laboratory setting"
  }
];

const relatedArticles = [
  {
    title: "The Future of Digital Marketing in 2025",
    date: "June 15, 2023",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/future-of-digital-marketing",
    excerpt: "Explore the key trends and technologies that will define digital marketing in the coming years."
  },
  {
    title: "How AI is Transforming Content Creation",
    date: "May 28, 2023",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2938&auto=format&fit=crop",
    slug: "/news/ai-content-creation",
    excerpt: "Discover how artificial intelligence is revolutionizing the way we create and distribute content."
  },
  {
    title: "The Evolution of Digital Identity: Beyond Social Media in 2025",
    date: "January 15, 2024",
    image: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2940&auto=format&fit=crop",
    slug: "/news/digital-identity-evolution",
    excerpt: "Explore how digital identity is evolving beyond social media profiles in the coming years."
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
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2999&auto=format&fit=crop"
            alt="Digital wellness and mental health visualization"
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
                Health & Technology
              </span>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4" />
                <span>12 min read</span>
              </div>
            </div>

            <h1 className={styles.heroTitle}>
              The Psychology of Digital Wellness: Balancing Technology and Mental Health
            </h1>

            <p className={styles.heroDescription}>
              Explore how digital platforms are adapting to promote mental wellness in 2024. From AI-powered wellness tools to mindful technology use, discover the latest innovations in digital mental health support.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className={styles.authorName}>editor @ fiveroses</p>
                  <p className={styles.authorDate}>January 20, 2024</p>
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
          {["Digital Wellness", "Mental Health", "Technology", "Psychology", "Innovation", "Digital Health"].map((tag) => (
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
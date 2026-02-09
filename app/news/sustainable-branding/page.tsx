"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const articleSections = [
  {
    title: "Sustainable Branding Strategies",
    description: "How modern sustainable branding is transforming business practices",
    content: `The landscape of sustainable branding has undergone a profound transformation in recent years, evolving from simple environmental initiatives to comprehensive strategies that integrate sustainability into every aspect of business operations. As we navigate this new era of responsible business, understanding the current state of sustainable branding is crucial for creating meaningful, impactful brand strategies.

## The New Brand Paradigm

Modern sustainable branding has moved far beyond its origins as a primarily environmental discipline. Today's sustainable brands are creating sophisticated blends of environmental responsibility, social impact, and business innovation that resonate with increasingly conscious consumers. The most successful sustainable brands are those that understand this evolution and adapt their approach accordingly.

Consider the case of a leading outdoor apparel company that recently implemented a comprehensive sustainable branding transformation. By integrating circular economy principles with transparent supply chain practices, they achieved a 75% increase in brand loyalty and a 50% boost in customer advocacy. Their success wasn't just about reducing environmental impact—it was about creating a brand story that authentically connected with their customers' values.

## Core Principles

The foundation of successful sustainable branding today rests on several key principles that guide the creation of effective brand strategies. These principles have evolved significantly from the early days of green marketing, reflecting our deeper understanding of sustainability and consumer behavior.

Authenticity has emerged as a fundamental principle, with successful sustainable brands focusing on genuine commitment to environmental and social responsibility. This approach goes beyond simple marketing—it's about embedding sustainability into the core of business operations and brand identity.

Transparency has become increasingly crucial, with leading sustainable brands implementing comprehensive reporting and communication practices. These brands are creating open, honest dialogues with their stakeholders about their sustainability journey, including both successes and challenges.

## Brand Strategy

The field of sustainable brand strategy has evolved significantly, with new approaches and methodologies emerging to address the changing needs of consumers and the capabilities of modern business.

One of the most significant trends is the focus on purpose-driven branding—creating brand narratives that authentically connect with broader social and environmental goals. This approach goes beyond simple cause marketing to consider how every aspect of the brand can contribute to positive change.

Stakeholder engagement has become increasingly sophisticated, with sustainable brands creating meaningful partnerships with communities, suppliers, and other stakeholders. The most successful sustainable brands are those that view sustainability as a collaborative journey rather than a solo initiative.

## Implementation

The practical aspects of sustainable branding have evolved dramatically, with new tools and capabilities emerging that enable more sophisticated, impactful brand strategies. From supply chain optimization to circular economy initiatives, these approaches are reshaping how we approach sustainable business.

Supply chain transformation has become increasingly important, with successful sustainable brands implementing comprehensive programs to reduce environmental impact and improve social conditions. For instance, a major food and beverage company recently implemented a sustainable sourcing initiative that reduced their carbon footprint by 40% while improving farmer livelihoods.

Product innovation has evolved to focus on sustainability, with modern brands developing products that minimize environmental impact while maximizing value for customers. This focus on sustainable innovation has become crucial for maintaining competitive advantage in an increasingly conscious market.

## Communication

The approach to sustainable brand communication has evolved dramatically, reflecting changes in consumer expectations, regulatory requirements, and market dynamics. Modern sustainable brands are embracing new approaches to communication that create more engaging, authentic connections with their audiences.

Storytelling has emerged as a powerful approach, with successful sustainable brands using sophisticated narrative techniques to share their sustainability journey. This approach isn't just about reporting metrics—it's about creating compelling stories that inspire and engage stakeholders.

Digital engagement has taken on new importance, with brands using social media and other digital platforms to create transparent, ongoing dialogues about sustainability. The most successful sustainable brands are those that use digital channels to build communities around shared values and goals.

The future of sustainable branding lies in creating authentic, impactful brand strategies that leverage emerging technologies and approaches while maintaining focus on genuine environmental and social responsibility.`,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2813&auto=format&fit=crop",
    imageAlt: "Sustainable branding visualization showing key trends"
  },
  {
    title: "Future of Sustainable Branding",
    description: "Emerging trends and approaches shaping the future of sustainable business",
    content: `As we look toward the future of sustainable branding, several transformative trends are emerging that will redefine how businesses approach environmental and social responsibility. These developments present both exciting opportunities and new challenges for brands navigating the evolving sustainability landscape.

## The Next Wave of Brand Innovation

The future of sustainable branding is being shaped by several groundbreaking innovations that will fundamentally change how we approach business responsibility. From circular economy models to regenerative business practices, these developments are opening up new possibilities for creating impactful, sustainable brands.

Circular economy principles are revolutionizing the business process, with innovative brands creating new approaches to product design, manufacturing, and consumption. For instance, a leading consumer goods company recently implemented a circular business model that achieved 90% material recovery and created new revenue streams through product refurbishment and recycling. The results were impressive: a 60% reduction in environmental impact and a 35% increase in customer loyalty.

## Technology Integration and Evolution

Advanced technologies are reshaping how we approach sustainable branding, with new tools and capabilities emerging that enable more sophisticated, impactful sustainability strategies. These technologies aren't just changing how we operate—they're redefining what's possible in sustainable business.

Blockchain technology is becoming an essential tool for creating transparent, traceable supply chains. Modern sustainable brands are using blockchain to verify and communicate their sustainability claims, from carbon footprint to fair labor practices. This approach goes beyond simple transparency to create truly accountable business operations.

Artificial intelligence is enabling more sophisticated sustainability management, with brands using AI to optimize resource use, predict environmental impact, and identify opportunities for improvement. From energy management to waste reduction, these technologies are helping brands achieve their sustainability goals more effectively.

## Brand Experience in the Future

The field of sustainable brand experience is evolving rapidly, with new approaches and methodologies emerging to address the changing needs of consumers and the capabilities of modern business.

Regenerative business practices are becoming increasingly important, with sustainable brands moving beyond reducing harm to actively improving environmental and social conditions. This includes everything from regenerative agriculture to community investment programs. The most successful sustainable brands will be those that can demonstrate positive impact beyond traditional sustainability metrics.

Collaborative innovation is emerging as a powerful tool for creating more effective sustainability strategies. By working with partners across industries and sectors, brands can develop more comprehensive solutions to complex sustainability challenges.

## Future Considerations and Challenges

As we look ahead, several key considerations will shape the future of sustainable branding:

Climate action will become increasingly important, with brands needing to demonstrate meaningful progress toward carbon reduction and climate resilience. This includes everything from operational changes to advocacy and policy engagement.

Social equity will become essential as consumers and stakeholders demand more inclusive, fair business practices. Sustainable brands will need to ensure their operations and impact benefit all stakeholders, particularly marginalized communities.

Systemic change will continue to evolve, with sustainable brands needing to address root causes of environmental and social challenges rather than just symptoms. This requires moving beyond individual initiatives to drive broader industry and societal transformation.

The future of sustainable branding lies in creating authentic, impactful brand strategies that leverage emerging technologies and approaches while maintaining focus on genuine environmental and social responsibility. Success will depend on understanding these trends and adapting brand approaches accordingly.`,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2813&auto=format&fit=crop",
    imageAlt: "Future of sustainable branding visualization showing emerging patterns"
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
    title: "E-commerce Optimization Strategies",
    date: "March 28, 2023",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2864&auto=format&fit=crop",
    slug: "/news/ecommerce-optimization",
    excerpt: "Discover proven strategies to optimize your e-commerce business for maximum success."
  },
  {
    title: "The Power of Video Marketing",
    date: "April 22, 2023",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2874&auto=format&fit=crop",
    slug: "/news/video-marketing",
    excerpt: "Learn how to leverage video content to engage your audience and drive business growth."
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
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2813&auto=format&fit=crop"
            alt="Sustainable Branding"
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
                Business
              </span>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4" />
                <span>8 min read</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Building a Sustainable Brand in 2023: A Comprehensive Guide
            </h1>

            <p className="text-xl text-neutral-300 font-light">
              Discover how to create and maintain a sustainable brand that resonates with modern consumers. Learn practical strategies for implementing sustainability initiatives while driving business growth and positive environmental impact.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-500/20">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop"
                    alt="Emma Wilson"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Emma Wilson</p>
                  <p className="text-xs text-neutral-400">May 15, 2023</p>
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

      {/* Content Section */}
      <motion.section 
        className="py-16 px-4 md:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none">
            {articleSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mt-12 mb-6">{section.title}</h2>
                <p className="text-xl text-neutral-300 font-light mb-8">{section.description}</p>
                <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-6">
                  {section.content.split("\n\n").map((paragraph, pIndex) => {
                    if (paragraph.startsWith("## ")) {
                      return (
                        <h3 key={pIndex} className="text-2xl font-bold mt-8 mb-4">
                          {paragraph.replace("## ", "")}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith("### ")) {
                      return (
                        <h4 key={pIndex} className="text-xl font-bold mt-6 mb-3">
                          {paragraph.replace("### ", "")}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith("- ")) {
                      return (
                        <ul key={pIndex} className="list-disc list-inside space-y-2">
                          {paragraph.split("\n").map((item, i) => (
                            <li key={i} className="text-neutral-300">
                              {item.replace("- ", "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={pIndex} className="text-neutral-300 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

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
                <h3 className="text-lg font-medium">Tags</h3>
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
              {["Sustainability", "Branding", "Business", "Marketing", "Strategy", "Innovation"].map((tag) => (
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

      {/* Related Articles Section */}
      <section className="w-full py-24 px-4 md:px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-12">Related Articles</h2>
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
                <h3 className="text-xl font-light mb-2 group-hover:text-rose-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-neutral-400 mb-2">{article.excerpt}</p>
                <p className="text-sm text-neutral-500">{article.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 
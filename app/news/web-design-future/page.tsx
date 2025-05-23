"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, BookmarkPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const articleSections = [
  {
    title: "The Evolution of Web Design",
    description: "How modern web design is transforming digital experiences",
    content: `The landscape of web design has undergone a remarkable transformation in recent years, evolving from static pages to dynamic, interactive experiences that engage users on multiple levels. As we navigate this new era of digital design, understanding the current state of web design is crucial for creating effective, engaging digital experiences.

## The New Design Paradigm

Modern web design has moved far beyond its origins as a primarily visual discipline. Today's web design is a sophisticated blend of aesthetics, functionality, and user experience that creates meaningful connections between brands and their audiences. The most successful websites are those that understand this evolution and adapt their approach accordingly.

Consider the case of a leading e-commerce platform that recently underwent a complete redesign. By implementing a user-centered design approach that prioritized accessibility and performance, they saw a 45% increase in user engagement and a 30% reduction in bounce rates. Their success wasn't just about creating a beautiful interface—it was about understanding how modern users interact with digital experiences.

## Design Principles in the Modern Age

The foundation of successful web design today rests on several key principles that guide the creation of effective digital experiences. These principles have evolved significantly from the early days of web design, reflecting our deeper understanding of user behavior and technological capabilities.

User-centered design has emerged as a fundamental principle, with successful websites focusing on understanding and addressing user needs at every step of the design process. This approach goes beyond simple usability—it's about creating experiences that resonate with users on an emotional level.

Accessibility has become a crucial consideration, not just as a legal requirement but as a fundamental aspect of good design. Leading websites are implementing comprehensive accessibility features that ensure their content is available to all users, regardless of their abilities or circumstances.

Performance optimization has taken on new importance in an era where users expect instant access to content. Modern websites must balance rich, engaging experiences with lightning-fast load times and smooth interactions.

## Emerging Technologies and Their Impact

The tools and technologies available to web designers have evolved dramatically, opening up new possibilities for creating engaging digital experiences. From AI-powered design systems to advanced animation frameworks, these technologies are reshaping how we approach web design.

Artificial intelligence is playing an increasingly important role in web design, with AI-powered tools helping designers create more personalized, responsive experiences. For instance, a major news website recently implemented an AI-driven content personalization system that adapts the layout and content presentation based on user behavior. The result? A 60% increase in time spent on site and a 40% boost in content engagement.

Advanced animation and interaction techniques are enabling designers to create more engaging, immersive experiences. Modern websites are using subtle animations and micro-interactions to guide users, provide feedback, and create memorable experiences.

## User Experience Trends

The field of user experience design has evolved significantly, with new approaches and methodologies emerging to address the changing needs of users and the capabilities of modern technology.

One of the most significant trends is the focus on emotional design—creating experiences that connect with users on an emotional level. This approach goes beyond functionality to consider how design elements can evoke specific emotions and create meaningful connections.

Personalization has become increasingly sophisticated, with websites using data and AI to create tailored experiences for individual users. This isn't just about showing relevant content—it's about creating entire experiences that adapt to user preferences and behavior.

## Visual Design Evolution

The visual language of web design has evolved dramatically, reflecting changes in technology, user expectations, and design trends. Modern websites are embracing new approaches to visual design that create more engaging, effective experiences.

Minimalist design has emerged as a powerful approach, with successful websites using clean layouts, ample white space, and focused content to create clear, effective user experiences. This approach isn't just about aesthetics—it's about creating interfaces that help users achieve their goals efficiently.

Typography has taken on new importance, with websites using custom fonts and sophisticated type treatments to create unique, memorable brand experiences. The most successful websites are those that use typography not just for readability, but as a key element of their visual identity.

The future of web design lies in creating intuitive, engaging experiences that leverage emerging technologies while maintaining focus on user needs and accessibility.`,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2864&auto=format&fit=crop",
    imageAlt: "Modern web design visualization showing key trends"
  },
  {
    title: "Future of Web Design",
    description: "Emerging trends and technologies shaping the future of web experiences",
    content: `As we look toward the future of web design, several transformative trends are emerging that will redefine how we create and experience digital content. These developments present both exciting opportunities and new challenges for designers navigating the evolving digital landscape.

## The Next Wave of Design Innovation

The future of web design is being shaped by several groundbreaking innovations that will fundamentally change how we approach digital experiences. From AI-driven design systems to immersive technologies, these developments are opening up new possibilities for creating engaging, effective websites.

Artificial intelligence is revolutionizing the design process, with AI-powered tools enabling designers to create more sophisticated, personalized experiences. For instance, a leading design agency recently implemented an AI-driven design system that can generate and adapt layouts based on user behavior and content requirements. The results were impressive: a 50% reduction in design time and a 35% increase in user engagement.

## Technology Integration and Evolution

Advanced technologies are reshaping how we approach web design, with new tools and capabilities emerging that enable more sophisticated, engaging experiences. These technologies aren't just changing how we design websites—they're redefining what's possible in digital experiences.

Machine learning is becoming an essential tool for creating personalized experiences at scale. Modern websites are using ML algorithms to analyze user behavior, predict preferences, and adapt content and layout accordingly. This approach goes beyond simple personalization to create truly dynamic experiences that evolve with user interaction.

Advanced animation frameworks are enabling designers to create more sophisticated, engaging interactions. From subtle micro-interactions to complex animations, these tools are helping designers create more immersive, memorable experiences.

## User Experience in the Future

The field of user experience design is evolving rapidly, with new approaches and methodologies emerging to address the changing needs of users and the capabilities of modern technology.

Contextual awareness is becoming increasingly important, with websites using data and AI to understand and adapt to user context. This includes everything from device type and location to time of day and user behavior. The most successful websites will be those that can seamlessly adapt to different contexts while maintaining a consistent, engaging experience.

Predictive interactions are emerging as a powerful tool for creating more intuitive, efficient user experiences. By anticipating user needs and preferences, websites can create more streamlined, effective interactions that help users achieve their goals more efficiently.

## Future Considerations and Challenges

As we look ahead, several key considerations will shape the future of web design:

Sustainability in design will become increasingly important, with websites needing to balance rich, engaging experiences with environmental impact. This includes everything from optimizing performance to reducing resource usage.

Privacy-first approaches will become essential as users become more concerned about data protection. Websites will need to find new ways to create personalized experiences while respecting user privacy and data preferences.

Inclusive design practices will continue to evolve, with websites needing to ensure accessibility for all users, regardless of their abilities or circumstances.

The future of web design lies in creating intuitive, engaging experiences that leverage emerging technologies while maintaining focus on user needs and accessibility. Success will depend on understanding these trends and adapting design approaches accordingly.`,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2874&auto=format&fit=crop",
    imageAlt: "Future of user experience visualization showing emerging patterns"
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
    title: "Social Media Trends to Watch",
    date: "April 22, 2023",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2874&auto=format&fit=crop",
    slug: "/news/social-media-trends",
    excerpt: "Stay ahead of the curve with these emerging social media trends that are reshaping digital marketing."
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
            src="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2864&auto=format&fit=crop"
            alt="Future of Web Design"
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
                Web Design
              </span>
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="w-4 h-4" />
                <span>15 min read</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              The Future of Web Design: Trends and Technologies Shaping 2023
            </h1>

            <p className="text-xl text-neutral-300 font-light">
              Explore the cutting-edge trends and technologies that are revolutionizing web design. From AI-powered tools to immersive experiences, discover how the digital landscape is evolving and what it means for designers and developers.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-500/20">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop"
                    alt="Sarah Johnson"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-neutral-400">March 15, 2023</p>
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
              {["Web Design", "Technology", "AI", "UX Design", "Innovation", "Development"].map((tag) => (
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